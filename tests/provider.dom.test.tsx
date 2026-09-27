import { render, screen } from '@testing-library/react';
import { UiProvider, defaultLabels, useUi } from '../src';

const Probe = () => {
  const { labels, isMobile, fontScale, theme } = useUi();
  return <span data-testid='probe'>{[labels.cancel, labels.confirm, isMobile, fontScale, theme].join('|')}</span>;
};

describe('UiProvider', () => {
  it('works without a provider (English defaults, desktop, scale 1, light)', () => {
    render(<Probe />);
    expect(screen.getByTestId('probe').textContent).toBe('Cancel|Confirm|false|1|light');
  });

  it('merges partial labels and lets the inner provider override the outer one', () => {
    render(
      <UiProvider labels={{ cancel: 'Abbrechen' }} theme='dark' fontScale={1.2}>
        <UiProvider labels={{ confirm: 'OK' }} isMobile>
          <Probe />
        </UiProvider>
      </UiProvider>
    );
    expect(screen.getByTestId('probe').textContent).toBe('Abbrechen|OK|true|1.2|dark');
  });

  it('keeps parameterized labels as functions', () => {
    expect(defaultLabels.viewMoreLines(3)).toBe('View More (3 lines)');
  });
});
