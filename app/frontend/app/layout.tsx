import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import React from 'react';
import { theme } from '@/theme';
import { MantineProvider, AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';

export const metadata = {
  title: 'Tlogger',
  description: 'Track your daily logs easily and securely.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
          <AppShell header={{ height: 60 }} padding="md">
            <AppShellHeader>
              <Navbar />
            </AppShellHeader>
            <AppShellMain>
              {children}
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
