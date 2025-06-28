'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Title, Container, Loader, Alert, Stack, Badge, Button } from '@mantine/core';
import { IconCalendar, IconEdit } from '@tabler/icons-react';
import { DateUtils } from '@/utils/date';
import { AddDailyLogForm } from './AddDailyLogForm';
import { v4 as uuidv4 } from 'uuid';

interface DailyLogsProps {
  date?: string;
}

interface DailyLog {
  id: string;
  logDate: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  pending?: boolean;
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

export function DailyLogs({ date }: DailyLogsProps) {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, [date]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      let logDate = date;
      if (!logDate) {
        logDate = DateUtils.getCurrentDate();
      }
      const response = await fetch(`${apiUrl}/api/daily-logs/search/findByLogDate?logDate=${logDate}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      const data: DailyLogsResponse = await response.json();
      const fetchedLogs = (data._embedded?.dailyLogs || []).sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setLogs(fetchedLogs);
    } catch (err) {
      console.error('Error fetching daily logs:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLog = async (values: { content: string }) => {
    setIsSubmitting(true);
    const id = uuidv4();
    const now = new Date().toISOString();
    const logDate = date || DateUtils.getCurrentDate();

    const newLog: DailyLog = {
      id,
      logDate,
      content: values.content,
      createdAt: now,
      updatedAt: now,
      pending: true,
    };

    setLogs((prev) => [...prev, newLog]);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/daily-logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: newLog.id,
          logDate: newLog.logDate,
          content: newLog.content,
          createdAt: newLog.createdAt,
          updatedAt: newLog.updatedAt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      const savedLog = await response.json();
      setLogs((prev) => prev.map((log) => (log.id === id ? { ...savedLog, pending: false } : log)));
    } catch (err) {
      console.error('Error adding daily log:', err);
      // If server fails, remove the optimistic UI update
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/daily-logs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      alert('Error');
    }
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
            Load error
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

      <Stack gap="md">
        <AddDailyLogForm onAdd={handleAddLog} isSubmitting={isSubmitting} />
        {logs.map((log) => (
          <Card
            key={log.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ opacity: log.pending ? 0.6 : 1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconCalendar size={18} />
                <Text fw={500} size="lg">
                  {DateUtils.formatDate(log.logDate)}
                </Text>
              </div>
              <Badge variant="light" color="gray" size="sm">
                {DateUtils.formatDateTime(log.updatedAt)}
              </Badge>
            </div>

            <Text size="sm" c="dimmed" mb="sm">
              <IconEdit size={14} style={{ marginRight: '4px' }} />
              Created: {DateUtils.formatDateTime(log.createdAt)}
            </Text>

            <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>
              {log.content}
            </Text>
            <Button
              color="red"
              mt="md"
              size="compact"
              style={{ width: 'auto', alignSelf: 'flex-end' }}
              onClick={() => handleDelete(log.id)}
              disabled={log.pending}
            >
              Remove
            </Button>
          </Card>
        ))}
      </Stack>
    </Container>
  );
} 