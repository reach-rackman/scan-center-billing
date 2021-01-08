import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import palette from './theme/palette';
import Home from './modules/home';

function App() {
  const theme = createMuiTheme({ palette });
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
