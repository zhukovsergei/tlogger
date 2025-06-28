import { DailyLogs } from '@/components/DailyLogs';

export default async function ViewByDatePage({ params }: { params: { date: string } }) {
  return <DailyLogs date={params.date} />;
} 