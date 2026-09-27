import type { DocPage } from '../types';

const page: DocPage = {
  title: 'Icons',
  group: 'Icons',
  order: 1,
  description:
    'Icon helpers: ForkBranchIcon (a glyph icon-park lacks), ThemedLogo and ProviderLogo for brand logos that follow the theme, and IconParkHOC for icon-park defaults.',
  components: ['ForkBranchIcon', 'ThemedLogo', 'ProviderLogo'],
  examples: [
    {
      file: 'ForkBranch',
      title: 'ForkBranchIcon',
      description: 'Sizes and colors; it inherits `currentColor` by default.',
    },
    {
      file: 'Logos',
      title: 'ThemedLogo and ProviderLogo',
      description: 'A color logo renders as an image; without a logo ProviderLogo shows the cloud fallback.',
    },
    {
      file: 'IconPark',
      title: 'IconParkHOC',
      description: 'Wraps an icon-park icon with the AionUi defaults: 16px, stroke width 3, secondary color.',
    },
  ],
  snippets: [
    {
      title: 'Tintable SVG logos',
      description:
        'A served `.svg` whose markup uses `currentColor` is painted through a CSS mask, so it takes the surrounding text color and stays visible in dark mode. Detection fetches the file once per URL; `data:` and `blob:` sources always render as a plain image.',
      code: `// /logos/acme.svg: <svg …><path fill="currentColor" …/></svg>
<span className='text-t-primary'>
  <ThemedLogo src='/logos/acme.svg' alt='Acme' className='w-24px h-24px' />
</span>`,
    },
  ],
  notes: [
    'Inside this package, `import { X } from "@icon-park/react"` is rewritten at build time to the lazy form of IconParkHOC (`lazyIconParkHOC`), so every icon gets these defaults.',
    '`isTintableLogoCandidate(src)` and `detectTintableLogo(src)` expose the detection ThemedLogo uses.',
  ],
};

export default page;
