import { AionSelect } from '@aionui/ui';

export default function Example() {
  return (
    <AionSelect className='w-360px' mode='multiple' placeholder='Pick tools' defaultValue={['read', 'search']}>
      <AionSelect.OptGroup label='Files'>
        <AionSelect.Option value='read'>Read file</AionSelect.Option>
        <AionSelect.Option value='write'>Write file</AionSelect.Option>
      </AionSelect.OptGroup>
      <AionSelect.OptGroup label='Web'>
        <AionSelect.Option value='search'>Web search</AionSelect.Option>
        <AionSelect.Option value='fetch'>Fetch URL</AionSelect.Option>
      </AionSelect.OptGroup>
    </AionSelect>
  );
}
