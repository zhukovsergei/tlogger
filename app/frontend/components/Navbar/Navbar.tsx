import { Group, Container, Anchor, Box } from '@mantine/core';
import Link from 'next/link';

export default function Navbar() {
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
          <Anchor component={Link} href="/login" size="md" underline="hover">
            Login
          </Anchor>
        </Group>
      </Container>
    </Box>
  );
} 