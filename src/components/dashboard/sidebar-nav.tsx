'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import type { UserRole } from '@/lib/types';
import { useUser } from '@/firebase';
import {
  Users,
  Calendar,
  LayoutGrid,
  FileText,
  ShieldCheck,
} from 'lucide-react';

const patientNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'My Reports', href: '/dashboard/reports', icon: FileText },
];

const doctorNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Patients', href: '#', icon: Users },
];

const adminNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'Doctor Verification', href: '/dashboard/verification', icon: ShieldCheck },
  { name: 'Manage Users', href: '#', icon: Users },
];

const navItems: Record<UserRole, { name: string; href: string; icon: React.ElementType }[]> = {
    patient: patientNav,
    doctor: doctorNav,
    admin: adminNav,
};


export function SidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, loading } = useUser();

  if (loading || !user) {
    return null; // Or a skeleton loader
  }

  const { role } = user;
  const currentNav = navItems[role];

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  return (
    <SidebarMenu>
      {currentNav.map((item) => (
        <SidebarMenuItem key={item.name}>
          <Link href={`${item.href}?${createQueryString('role', role)}`} passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.name}
            >
              <item.icon />
              <span>{item.name}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
