'use client';
import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container } from '@mantine/core';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle login
  };

  return (
    <Container size="xs" style={{ marginTop: 80 }}>
      <Paper p="xl" shadow="sm">
        <Title order={2} align="center" mb="md">Login</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            mb="md"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            mb="md"
          />
          <Button type="submit" fullWidth mt="md">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
} 