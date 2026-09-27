import { AionSteps } from '@aionui/ui';

export default function Example() {
  return (
    <AionSteps current={2} direction='vertical'>
      <AionSteps.Step title='Connect a provider' description='Add an API key in Settings.' />
      <AionSteps.Step title='Create an assistant' description='Pick a model and a system prompt.' />
      <AionSteps.Step title='Start chatting' description='Open a new conversation.' />
    </AionSteps>
  );
}
