'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { User, Shield, Stethoscope } from 'lucide-react';

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="flex items-center gap-2 mb-8">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">MediSummarizer</h1>
        </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>Please select your role to continue.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Link href="/login?role=patient" passHref>
            <Button variant="outline" className="w-full justify-start gap-4 p-6 text-lg">
                <User className="h-6 w-6" />
                <span>I am a Patient</span>
            </Button>
          </Link>
          <Link href="/login?role=doctor" passHref>
            <Button variant="outline" className="w-full justify-start gap-4 p-6 text-lg">
                <Stethoscope className="h-6 w-6" />
                <span>I am a Doctor</span>
            </Button>
          </Link>
          <Link href="/login?role=admin" passHref>
            <Button variant="outline" className="w-full justify-start gap-4 p-6 text-lg">
                <Shield className="h-6 w-6" />
                <span>I am an Admin</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
