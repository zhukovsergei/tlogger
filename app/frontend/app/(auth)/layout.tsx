'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Loader, Center } from '@mantine/core';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    } else {
      router.replace('/login');
    }
    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    );
  }

  if (!isAuth) {
    return null;
  }

  return <>{children}</>;
}