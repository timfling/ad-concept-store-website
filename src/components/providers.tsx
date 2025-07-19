'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import CursorProvider from '@/cursor/Provider';
import StyledComponentsRegistry from '@/lib/registry';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <CursorProvider>
          {children}
        </CursorProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
} 