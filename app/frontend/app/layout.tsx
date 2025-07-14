'use client';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { theme } from '@/theme';
import { MantineProvider, AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const checkAuth = typeof window !== 'undefined' ? useAuthStore((state) => state.checkAuth) : undefined;

  useEffect(() => {
    if (checkAuth) checkAuth();
  }, [checkAuth]);

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
