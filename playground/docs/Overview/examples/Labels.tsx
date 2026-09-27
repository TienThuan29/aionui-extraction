import { CollapsibleContent, UiProvider } from '@aionui/ui';

export default function Example() {
  return (
    <UiProvider labels={{ expandMore: 'Mehr anzeigen', collapse: 'Einklappen' }}>
      <CollapsibleContent maxHeight={60}>
        <div className='text-13px leading-22px'>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i}>Zeile {i + 1}: lange Werkzeugausgabe, die hinter einem Verlauf eingeklappt wird.</div>
          ))}
        </div>
      </CollapsibleContent>
    </UiProvider>
  );
}
