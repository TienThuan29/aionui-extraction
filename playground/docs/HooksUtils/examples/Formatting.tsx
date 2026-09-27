import { Button, Message } from '@arco-design/web-react';
import { copyText, formatByteSize, formatCurrency, formatNumber } from '@aionui/ui';

const locales = ['en-US', 'de-DE', 'vi-VN'];

export default function Example() {
  return (
    <div className='flex flex-col gap-8px text-13px'>
      <table className='border-collapse'>
        <thead>
          <tr className='text-t-secondary text-left'>
            <th className='pr-24px font-500'>locale</th>
            <th className='pr-24px font-500'>formatNumber(1234567.891)</th>
            <th className='pr-24px font-500'>formatCurrency(0.42, &apos;USD&apos;)</th>
            <th className='font-500'>formatByteSize(1572864)</th>
          </tr>
        </thead>
        <tbody className='font-mono'>
          {locales.map((locale) => (
            <tr key={locale}>
              <td className='pr-24px'>{locale}</td>
              <td className='pr-24px'>{formatNumber(1234567.891, locale)}</td>
              <td className='pr-24px'>{formatCurrency(0.42, 'USD', locale)}</td>
              <td>{formatByteSize(1_572_864, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button
          size='small'
          onClick={() =>
            copyText('Hello from copyText').then(
              () => Message.success('Copied'),
              () => Message.error('Copy failed')
            )
          }
        >
          copyText(&apos;Hello from copyText&apos;)
        </Button>
      </div>
    </div>
  );
}
