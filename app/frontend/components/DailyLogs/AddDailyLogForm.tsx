'use client';

import { useForm } from '@mantine/form';
import { Card, Button, Textarea } from '@mantine/core';

interface AddDailyLogFormProps {
  onAdd: (values: { content: string }) => void;
  isSubmitting: boolean;
}

export function AddDailyLogForm({ onAdd, isSubmitting }: AddDailyLogFormProps) {
  const form = useForm({
    initialValues: {
      content: '',
    },
    validate: {
      content: (value) => (value.length < 1 ? 'Content is required' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    onAdd(values);
    form.reset();
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          placeholder="What did you do today?"
          label="New Daily Log"
          minRows={3}
          disabled={isSubmitting}
          {...form.getInputProps('content')}
        />
        <Button type="submit" mt="md" fullWidth loading={isSubmitting}>
          Add Log
        </Button>
      </form>
    </Card>
  );
} 