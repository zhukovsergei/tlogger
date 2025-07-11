'use client';
import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Alert } from '@mantine/core';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" style={{ marginTop: 80 }}>
      <Paper p="xl" shadow="sm">
        <Title order={2} mb="md">Login</Title>
        {error && <Alert color="red" mb="md">{error}</Alert>}
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
          <Button type="submit" fullWidth mt="md" loading={loading}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
} 