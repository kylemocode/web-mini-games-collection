import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from 'styled-components';
import { ReactNode } from 'react';

import theme from '@/themes';

const GlobalStyle = createGlobalStyle`
    body {}
`;

interface IProps {
  children: ReactNode;
}

const DynamicTheme = ({ children }: IProps) => {
  return (
    <ThemeProvider theme={theme as unknown as DefaultTheme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  );
};

export default DynamicTheme;
