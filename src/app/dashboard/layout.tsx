import React, { Suspense } from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Logo } from '@/components/icons';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';
import { Header } from '@/components/dashboard/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="border-b">
              <div className="flex items-center gap-2.5 p-2">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Logo className="h-7 w-7 text-primary" />
                   <div className="flex flex-col">
                    <span className="font-headline text-xl font-semibold leading-tight">MediSummarizer</span>
                  </div>
                </Link>
              </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter>
            {/* Can add footer content here */}
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  );
}
