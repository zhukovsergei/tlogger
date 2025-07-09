import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import React from 'react';
import { theme } from '@/theme';
import { MantineProvider, AppShell, AppShellHeader, AppShellMain, Container, Group, Anchor } from '@mantine/core';
import Link from 'next/link';

export const metadata = {
  title: 'Tlogger',
  description: 'Track your daily logs easily and securely.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
          <AppShell header={{ height: 60 }} padding="md">
            <AppShellHeader>
              <Container size="lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
                <Anchor component={Link} href="/" size="lg" underline="never">
                  Tlogger
                </Anchor>
                <Group>
                  <Anchor component={Link} href="/login" size="md" underline="hover">
                    Login
                  </Anchor>
                </Group>
              </Container>
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
