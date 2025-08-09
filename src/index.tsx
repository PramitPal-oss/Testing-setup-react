import { createRoot } from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App';
import './index.css';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <MantineProvider>
      <App />
      <Toaster position='top-center' reverseOrder={false} />
    </MantineProvider>
  </Provider>
);
