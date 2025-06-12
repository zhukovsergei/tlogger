'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Title, Container, Loader, Alert, Stack, Badge } from '@mantine/core';
import { IconCalendar, IconEdit } from '@tabler/icons-react';

interface DailyLog {
  id: string;
  logDate: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface DailyLogsResponse {
  _embedded: {
    dailyLogs: DailyLog[];
  };
  _links: any;
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export function DailyLogs() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      console.log('Fetching from API URL:', `${apiUrl}/api/daily-logs?sort=logDate,desc`);
      
      const response = await fetch(`${apiUrl}/api/daily-logs?sort=logDate,desc`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const data: DailyLogsResponse = await response.json();
      setLogs(data._embedded?.dailyLogs || []);
    } catch (err) {
      console.error('Error fetching daily logs:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US');
  };

  if (loading) {
    return (
      <Container size="md" py="xl">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <Loader size="lg" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="md" py="xl">
        <Alert color="red" title="Loading Error">
          {error}
          <br />
          <Text size="sm" mt="xs">
            Make sure the backend API is running on {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}
          </Text>
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="lg" ta="center">
        Daily Logs
      </Title>
      
      {logs.length === 0 ? (
        <Alert color="blue" title="No Records">
          No daily logs found yet.
        </Alert>
      ) : (
        <Stack gap="md">
          {logs.map((log, index) => (
            <Card key={`${log.logDate}-${log.createdAt}-${index}`} shadow="sm" padding="lg" radius="md" withBorder>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconCalendar size={18} />
                  <Text fw={500} size="lg">
                    {formatDate(log.logDate)}
                  </Text>
                </div>
                <Badge variant="light" color="gray" size="sm">
                  {formatDateTime(log.updatedAt)}
                </Badge>
              </div>
              
              <Text size="sm" c="dimmed" mb="sm">
                <IconEdit size={14} style={{ marginRight: '4px' }} />
                Created: {formatDateTime(log.createdAt)}
              </Text>
              
              <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>
                {log.content}
              </Text>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
} 