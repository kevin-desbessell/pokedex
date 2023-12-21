import './App.css';
import { ThemeTogglerButton } from './components/theme-toggler-button';
import { ThemeProvider } from './context/theme-context';
import { AppRoutes } from './pages/routes';
import { createGlobalStyle } from 'styled-components';

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <ThemeTogglerButton />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    text-decoration: none;
    color: black;
  }
`

export default App;
