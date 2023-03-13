import React from 'react';
import Router from './router/router';
import Reset from './style/Reset';
import { ThemeProvider } from "styled-components";
import { FlexCenter, FlexColumn, FlexRow } from './style/theme';

const App = () => {
  const theme = {
    FlexCenter, FlexColumn, FlexRow
  }
  return (
    <>
      <Reset />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
