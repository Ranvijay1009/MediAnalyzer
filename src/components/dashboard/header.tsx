import Link from 'next/link';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { UserNav } from '@/components/dashboard/user-nav';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <Link href="/dashboard" className="hidden items-center gap-2 md:flex">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-semibold">MediSummarizer</span>
        </Link>
      </div>

      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {/* Future search bar can go here */}
        <UserNav />
      </div>
    </header>
  );
}
