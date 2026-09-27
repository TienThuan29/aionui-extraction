import { Button } from '@arco-design/web-react';
import { AppLoader } from '@aionui/ui';
import { useState } from 'react';

export default function Example() {
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <Button type='primary' onClick={load}>
        Show loader
      </Button>
      {loading && (
        <div className='fixed inset-0 z-1000 bg-1'>
          <AppLoader />
        </div>
      )}
    </>
  );
}
