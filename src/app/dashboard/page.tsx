'use client';
import { useSearchParams } from 'next/navigation';
import type { UserRole } from '@/lib/types';
import { users } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Calendar, Users, FileText } from 'lucide-react';

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const role = (searchParams.get('role') as UserRole) || 'patient';
    const user = users[role];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    }

    const patientCards = [
        { title: 'Upcoming Appointments', value: '2', icon: Calendar, description: 'Check your schedule' },
        { title: 'Recent Reports', value: '3', icon: FileText, description: 'View AI summaries' },
    ];

    const doctorCards = [
        { title: 'Pending Appointments', value: '5', icon: Calendar, description: 'Review new requests' },
        { title: 'Total Patients', value: '128', icon: Users, description: 'Manage your patient list' },
    ];

    const adminCards = [
        { title: 'Doctors to Verify', value: '2', icon: Users, description: 'Approve new doctors' },
        { title: 'System Activity', value: 'High', icon: Activity, description: 'Monitor platform health' },
    ];

    const cards = { patient: patientCards, doctor: doctorCards, admin: adminCards }[role];

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}, {user.name.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">Here&apos;s a quick overview of your account.</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cards.map(card => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {card.title}
                            </CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Welcome to MediSummarizer</CardTitle>
                    <CardDescription>Your all-in-one healthcare management platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Use the navigation on the left to manage your appointments, view reports, and more. Our AI-powered tools are here to help you understand your health better and streamline your medical processes. We are committed to providing a secure and intuitive experience.</p>
                </CardContent>
            </Card>
        </div>
    );
}
