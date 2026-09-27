import { ProviderLogo, ThemedLogo } from '@aionui/ui';

const colorLogo =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='%23f97316'/><path d='M7 12h10M12 7v10' stroke='white' stroke-width='2'/></svg>";

export default function Example() {
  return (
    <div className='flex items-center gap-24px text-13px'>
      <span className='flex items-center gap-8px'>
        <ThemedLogo src={colorLogo} alt='Acme' className='w-32px h-32px' />
        ThemedLogo
      </span>
      <span className='flex items-center gap-8px'>
        <ProviderLogo logo={colorLogo} name='Acme' size={24} />
        ProviderLogo
      </span>
      <span className='flex items-center gap-8px'>
        <ProviderLogo logo={null} name='Custom provider' size={24} />
        No logo
      </span>
      <span className='flex items-center gap-8px'>
        <ThemedLogo src='' alt='' fallback={<span className='text-20px'>🤖</span>} />
        Custom fallback
      </span>
    </div>
  );
}
