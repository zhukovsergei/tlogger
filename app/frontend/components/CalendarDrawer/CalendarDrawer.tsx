'use client';
import { Drawer, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export function CalendarDrawer() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleDateChange = (value: string | string[] | [string | null, string | null] | null) => {
    if (typeof value === 'string') {
      setSelected(value);
      const formatted = dayjs(value).format('YYYY-MM-DD');
      router.push(`/view/${formatted}`);
    } else {
      setSelected(null);
    }
  };

  return (
    <>
      <Drawer
        position="left"
        size="md"
        opened={opened}
        onClose={close}
        title="Choose a date"
        withOverlay={false}
      >
        <DatePicker value={selected} onChange={handleDateChange} locale="en" />
      </Drawer>
      {!opened && (
        <Button onClick={open} style={{ position: 'fixed', left: 24, top: 24, zIndex: 1000 }}>
          Calendar
        </Button>
      )}
    </>
  );
}