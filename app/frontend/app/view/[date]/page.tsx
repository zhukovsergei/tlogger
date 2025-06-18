import { DailyLogs } from '@/components/DailyLogs';

export default function ViewByDatePage({ params }: { params: { date: string } }) {
  return <DailyLogs date={params.date} />;
} 