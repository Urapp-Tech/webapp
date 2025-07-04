import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Page404 from './pages/404/404';
import { store } from './redux/store';

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
    MuiPopper: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
    MuiDialog: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
    MuiModal: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={Page404}>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);
