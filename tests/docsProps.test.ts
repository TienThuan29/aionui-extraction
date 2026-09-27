import { readFileSync } from 'node:fs';
import { generateProps, outputPath } from '../scripts/gen-props';

describe('docs props', () => {
  it('props.generated.json is up to date with the component types (run `bun run docs:props`)', () => {
    // Compare data, not text: the formatter may re-wrap the committed JSON.
    const committed = JSON.parse(readFileSync(outputPath, 'utf8')) as Record<string, unknown>;
    const fresh = generateProps() as Record<string, unknown>;
    const changed = [...new Set([...Object.keys(committed), ...Object.keys(fresh)])].filter(
      (name) => JSON.stringify(committed[name]) !== JSON.stringify(fresh[name])
    );
    expect(changed, 'components whose props changed since the last `bun run docs:props`').toEqual([]);
  }, 120_000);
});
