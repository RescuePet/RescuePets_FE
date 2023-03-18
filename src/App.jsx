import React from 'react';
import Router from './router/router';
import Reset from './style/Reset';
import { ThemeProvider } from "styled-components";
import {
  FlexCenter, FlexColumn, FlexRow, BorderRadius,
  Title_700_18, Button_700_16, Body_700_14, Body_500_16,
  Body_500_14, Body_400_14, Body_400_14_16, Body_400_12, Body_300_10,
} from './style/theme';

const App = () => {
  const theme = {
    FlexCenter, FlexColumn, FlexRow, BorderRadius,
    Title_700_18, Button_700_16, Body_700_14, Body_500_16,
    Body_500_14, Body_400_14, Body_400_14_16, Body_400_12, Body_300_10,
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
