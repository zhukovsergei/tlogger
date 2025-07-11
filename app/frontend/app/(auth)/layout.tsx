'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

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
    // Можно вернуть лоадер, чтобы не было белого экрана
    return null; 
  }

  if (!isAuth) {
    // Редирект уже в процессе, ничего не рендерим
    return null;
  }

  return <>{children}</>;
}