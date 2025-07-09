import { Button, Container, Title, Text } from '@mantine/core';
import Link from 'next/link';

export default function Welcome() {
  return (
    <Container size="xs" style={{ textAlign: 'center', marginTop: 80 }}>
      <Title order={1}>Welcome to Tlogger!</Title>
      <Text mt="md">Track your daily logs easily and securely.</Text>
      <Button component={Link} href="/login" mt="xl">
        Login
      </Button>
    </Container>
  );
}
