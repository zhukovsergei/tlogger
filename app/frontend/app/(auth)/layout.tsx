'use client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Loader, Center } from '@mantine/core';
import { useAuthStore } from '../../store/authStore';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    checkAuth();
    setIsReady(true);
    if (!localStorage.getItem('token')) {
      router.replace('/login');
    }
  }, [router, checkAuth]);

  if (!isReady) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}