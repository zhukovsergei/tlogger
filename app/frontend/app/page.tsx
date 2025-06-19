'use client';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { DailyLogs } from '@/components/DailyLogs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dayjs from 'dayjs';


export default function HomePage() {

  return (
    <>
      <DailyLogs />
      {/*<ColorSchemeToggle />*/}
    </>
  );
}
