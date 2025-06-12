import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { DailyLogs } from '../components/DailyLogs';

export default function HomePage() {
  return (
    <>
      <DailyLogs />
      <ColorSchemeToggle />
    </>
  );
}
