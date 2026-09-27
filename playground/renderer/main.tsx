import '@arco-design/web-react/dist/css/arco.css';
// Import CSS explicitly, as consumers do with dist/styles.css: `sideEffects` lets bundlers drop a bare `import '../../src'`.
import 'virtual:uno.css';
import '../../src/styles/index.css';
import '../../src/styles/arco-theme.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root')!).render(<App />);
