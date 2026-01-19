'use client';

import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';

import { Logo } from '@/components/icons';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';
import { Header } from '@/components/dashboard/header';
import { useUser } from '@/firebase';

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
    }

    return <>{children}</>;
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <AuthGuard>
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
      </AuthGuard>
    </Suspense>
  );
}
