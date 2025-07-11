'use client';

import { Group, Container, Anchor, Box, Button } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log(token);
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <Box component="nav" style={{ borderBottom: '1px solid #eee', marginBottom: 32 }}>
      <Container size="lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
        <Anchor component={Link} href="/" size="lg" underline="never">
          Tlogger
        </Anchor>
        <Group>
          <Anchor component={Link} href="/dashboard" size="md" underline="hover">
            Dashboard
          </Anchor>
          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button component={Link} href="/login" variant="outline" size="sm">
              Login
            </Button>
          )}
        </Group>
      </Container>
    </Box>
  );
} 