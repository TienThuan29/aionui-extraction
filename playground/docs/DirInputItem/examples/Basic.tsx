import { Form } from '@arco-design/web-react';
import { DirInputItem } from '@aionui/ui';

const paths = ['/Users/me/projects/aionui', '/Users/me/projects/docs', '/tmp'];

// Stands in for a native directory dialog.
const pickDirectory = async (current: string) => paths[(paths.indexOf(current) + 1) % paths.length];

export default function Example() {
  return (
    <Form layout='vertical' className='w-420px' initialValues={{ workDir: paths[0] }}>
      <DirInputItem label='Work directory' field='workDir' browseLabel='Change directory' onBrowse={pickDirectory} />
      <DirInputItem label='Cache directory' field='cacheDir' browseLabel='Choose directory' onBrowse={pickDirectory} />
    </Form>
  );
}
