'use client';

import { Group, Container, Anchor, Box, Button } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';

export default function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <Box component="nav" style={{ borderBottom: '1px solid #eee', marginBottom: 32 }}>
      <Container size="lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
        <Anchor component={Link} href="/" size="lg" underline="never">
          Tlogger
        </Anchor>
        <Group>
          {isAuthenticated && (
            <Anchor component={Link} href="/dashboard" size="md" underline="hover">
              Dashboard
            </Anchor>
          )}
          {isAuthenticated ? (
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