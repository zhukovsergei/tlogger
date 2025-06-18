'use client';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { DailyLogs } from '@/components/DailyLogs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dayjs from 'dayjs';

const DatePicker = dynamic(
  () => import('@mantine/dates').then(mod => mod.DatePicker),
  { ssr: false }
);

export default function HomePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

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
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <DatePicker type="default" value={selected} onChange={handleDateChange} locale="en" />
      </div>
      <DailyLogs />
      <ColorSchemeToggle />
    </>
  );
}
