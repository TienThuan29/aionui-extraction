import { AionSelect } from '@aionui/ui';

const sizes = ['mini', 'small', 'middle', 'default', 'large'] as const;
const options = [{ label: 'English', value: 'en' }];

export default function Example() {
  return (
    <div className='flex flex-col gap-8px w-200px'>
      {sizes.map((size) => (
        <AionSelect key={size} size={size} options={options} defaultValue='en' prefix={size} />
      ))}
    </div>
  );
}
