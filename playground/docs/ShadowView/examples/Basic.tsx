import { ShadowView } from '@aionui/ui/markdown';

export default function Example() {
  return (
    <div>
      <style>{'.demo-title { color: red; }'}</style>
      <h4 className='demo-title m-0'>Outside: red from the page CSS</h4>
      <ShadowView>
        <div className='markdown-shadow-body'>
          <h4 className='demo-title'>Inside ShadowView: markdown styles only</h4>
          <p>
            Text, <code>code</code> and <a href='#'>links</a> use the markdown theme.
          </p>
        </div>
      </ShadowView>
    </div>
  );
}
