import { ShimmerText } from '@aionui/ui';

export default function Example() {
  return (
    <div className='flex flex-col gap-8px text-14px'>
      <ShimmerText duration={1}>Fast (1s)</ShimmerText>
      <ShimmerText duration={6} pauseOnHover>
        Slow (6s), pauses on hover
      </ShimmerText>
    </div>
  );
}
