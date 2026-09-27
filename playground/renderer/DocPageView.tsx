import { Button, Message, Table, Tooltip } from '@arco-design/web-react';
import { Code, Copy } from '@icon-park/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { copyText, useUi } from '@aionui/ui';
import { componentDocs, type LoadedExample, type LoadedPage, type PropDoc } from '../docs/registry';
import type { DocSnippet } from '../docs/types';

// Card and code borders: a step stronger than --border-base, which is too faint to separate cards.
const BORDER = 'border-solid border-[var(--bg-3)]';

const copy = (text: string) =>
  copyText(text).then(
    () => Message.success('Copied'),
    () => Message.error('Copy failed')
  );

/** Renders `code` spans (from JSDoc, descriptions and notes) as inline code. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((part, i) =>
        part.length > 2 && part.startsWith('`') && part.endsWith('`') ? (
          <code key={i} className='font-mono text-[0.92em] px-4px py-1px rounded-4px bg-2'>
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
}

function CodeView({ code, language = 'tsx' }: { code: string; language?: DocSnippet['language'] }) {
  const { theme } = useUi();
  return (
    <SyntaxHighlighter
      language={language}
      style={theme === 'dark' ? oneDark : oneLight}
      customStyle={{ margin: 0, borderRadius: 0, fontSize: 13, background: 'var(--bg-2)' }}
      codeTagProps={{ style: { fontFamily: 'var(--font-mono)' } }}
    >
      {code.trimEnd()}
    </SyntaxHighlighter>
  );
}

function CopyButton({ text, label = 'Copy code' }: { text: string; label?: string }) {
  return (
    <Tooltip content={label}>
      <Button type='text' size='small' aria-label={label} icon={<Copy />} onClick={() => void copy(text)} />
    </Tooltip>
  );
}

/** Code with a copy button in the corner (the import statement, snippets). */
function InlineCode({ code, language = 'tsx' }: { code: string; language?: DocSnippet['language'] }) {
  return (
    <div className={`relative border rounded-8px overflow-hidden ${BORDER}`}>
      <CodeView code={code} language={language} />
      <div className='absolute top-6px right-6px'>
        <CopyButton text={code} />
      </div>
    </div>
  );
}

function ExampleCard({ example, isMobile }: { example: LoadedExample; isMobile: boolean }) {
  const [showCode, setShowCode] = useState(false);
  const { Component } = example;
  const anchor = example.id.split('/')[1];
  return (
    <section id={anchor} className={`border rounded-12px overflow-hidden mb-24px scroll-mt-16px ${BORDER}`}>
      <div className='p-24px'>
        <div className={isMobile ? 'max-w-390px mx-auto' : ''}>
          <Component />
        </div>
      </div>
      <div className={`px-16px py-12px border-t ${BORDER}`}>
        <div className='text-14px font-600'>{example.title}</div>
        {example.description && (
          <div className='text-13px text-t-secondary mt-4px'>
            <RichText text={example.description} />
          </div>
        )}
      </div>
      <div className='flex justify-end gap-4px px-8px py-4px border-t border-dashed border-[var(--bg-3)]'>
        <Tooltip content={showCode ? 'Hide code' : 'Show code'}>
          <Button
            type='text'
            size='small'
            aria-label={showCode ? 'Hide code' : 'Show code'}
            icon={<Code />}
            onClick={() => setShowCode((v) => !v)}
          />
        </Tooltip>
        <CopyButton text={example.source} />
      </div>
      {showCode && (
        <div className={`border-t ${BORDER}`}>
          <CodeView code={example.source} />
        </div>
      )}
    </section>
  );
}

const propColumns = [
  {
    title: 'Property',
    dataIndex: 'name',
    width: 190,
    render: (_: unknown, prop: PropDoc) => (
      <code className='text-13px font-mono'>
        {prop.name}
        {prop.required && <span className='text-danger ml-2px'>*</span>}
      </code>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    render: (description?: string) => (
      <span style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
        {description ? <RichText text={description} /> : '—'}
      </span>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 280,
    render: (type: string) => (
      // Wrap at spaces first (the Arco cell sets break-all); split only a token wider than the column.
      <code className='text-12px font-mono text-t-secondary' style={{ wordBreak: 'normal', overflowWrap: 'anywhere' }}>
        {type}
      </code>
    ),
  },
  {
    title: 'Default',
    dataIndex: 'default',
    width: 110,
    render: (value?: string) => (value ? <code className='text-12px font-mono'>{value}</code> : '—'),
  },
];

function PropsTable({ name }: { name: string }) {
  const doc = componentDocs[name];
  if (!doc) return <div className='text-13px text-t-secondary'>No props data for {name}.</div>;
  return (
    <>
      {doc.props.length > 0 ? (
        <Table rowKey='name' columns={propColumns} data={doc.props} pagination={false} border={false} size='small' />
      ) : (
        <div className='text-13px text-t-secondary'>No props of its own.</div>
      )}
      {doc.inherits.length > 0 && (
        <div className='text-13px text-t-secondary mt-8px'>
          Also accepts all props of <RichText text={doc.inherits.map((owner) => `\`${owner}\``).join(', ')} />.
        </div>
      )}
    </>
  );
}

function Heading({ children, level = 2, mono = false }: { children: React.ReactNode; level?: 2 | 3; mono?: boolean }) {
  return level === 2 ? (
    <h2 className='text-20px font-600 mt-40px mb-16px'>{children}</h2>
  ) : (
    <h3 className={`text-16px font-600 mt-24px mb-8px ${mono ? 'font-mono' : ''}`}>{children}</h3>
  );
}

export function DocPageView({ page, example }: { page: LoadedPage; example?: string }) {
  const { isMobile } = useUi();
  const components = page.components ?? [];

  // Deep link: #/<page>?example=<file> scrolls to that example once rendered.
  useEffect(() => {
    if (example) document.getElementById(example)?.scrollIntoView({ block: 'start' });
  }, [page.id, example]);

  return (
    // No ligatures: `=>` must read as typed, not as an arrow glyph.
    <article className='max-w-1040px mx-auto pb-80px' style={{ fontVariantLigatures: 'none' }}>
      <div className='text-12px text-t-secondary uppercase tracking-wide'>{page.group}</div>
      <h1 className='text-30px font-700 mt-4px mb-12px'>{page.title}</h1>
      <p className='text-15px text-t-secondary leading-24px m-0'>
        <RichText text={page.description} />
      </p>

      {components.length > 0 && (
        <div className='mt-20px'>
          <InlineCode code={`import { ${components.join(', ')} } from '${page.importFrom ?? '@aionui/ui'}';`} />
        </div>
      )}

      {page.loadedExamples.length > 0 && (
        <>
          <Heading>Examples</Heading>
          {page.loadedExamples.map((loaded) => (
            <ExampleCard key={loaded.id} example={loaded} isMobile={isMobile} />
          ))}
        </>
      )}

      {page.snippets?.map((snippet) => (
        <div key={snippet.title}>
          <Heading level={3}>{snippet.title}</Heading>
          {snippet.description && (
            <p className='text-14px text-t-secondary mt-0'>
              <RichText text={snippet.description} />
            </p>
          )}
          <InlineCode code={snippet.code} language={snippet.language} />
        </div>
      ))}

      {components.length > 0 && (
        <>
          <Heading>API</Heading>
          {components.map((name) => (
            <div key={name}>
              <Heading level={3} mono>
                {name}
              </Heading>
              <PropsTable name={name} />
            </div>
          ))}
        </>
      )}

      {page.notes && page.notes.length > 0 && (
        <>
          <Heading>Notes</Heading>
          <ul className='text-14px leading-24px pl-20px m-0'>
            {page.notes.map((note) => (
              <li key={note}>
                <RichText text={note} />
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
