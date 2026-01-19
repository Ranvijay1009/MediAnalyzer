'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense, useEffect } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Logo } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import type { User, UserRole } from "@/lib/types";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const role = (searchParams.get('role') as UserRole) || 'patient';
  const [signUpRole, setSignUpRole] = useState<UserRole>(role);

  useEffect(() => {
    setSignUpRole(role);
  }, [role]);

  const handleError = (title: string, description: string) => {
    setLoading(false);
    toast({
      variant: 'destructive',
      title: title,
      description: description,
    });
  };
  
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const storedUserRaw = localStorage.getItem('mock_user_' + email);
    if (storedUserRaw) {
        const storedUser = JSON.parse(storedUserRaw);
        if (storedUser.password === password) {
            if (storedUser.role === role) {
                localStorage.setItem('mockUser', JSON.stringify({
                    name: storedUser.name,
                    email: storedUser.email,
                    role: storedUser.role
                }));
                router.push('/dashboard');
            } else {
                handleError('Role Mismatch', `You are trying to log in as a ${role}, but this account is a ${storedUser.role}.`);
            }
        } else {
            handleError('Authentication Failed', 'Incorrect password.');
        }
    } else {
        handleError('Authentication Failed', 'No account found with this email. Please sign up.');
    }
    setLoading(false);
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const storedUserRaw = localStorage.getItem('mock_user_' + email);
    if (storedUserRaw) {
        handleError('Sign-up Failed', 'An account with this email already exists. Please sign in.');
        return;
    }

    const newUser = { name, email, password, role: signUpRole };
    localStorage.setItem('mock_user_' + email, JSON.stringify(newUser));
    localStorage.setItem('mockUser', JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarUrl: `https://picsum.photos/seed/${newUser.email}/100/100`
    }));
    
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/" className="flex justify-center items-center gap-2">
                <Logo className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">MediSummarizer</h1>
            </Link>
            <p className="text-balance text-muted-foreground">
              Welcome User
            </p>
          </div>
           <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <Card className="border-0 shadow-none">
                <CardContent className="pt-6">
                  <form onSubmit={handleSignIn} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email-signin">Email</Label>
                      <Input
                        id="email-signin"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password-signin">Password</Label>
                      </div>
                      <Input id="password-signin" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sign-up">
              <Card className="border-0 shadow-none">
                <CardContent className="pt-6">
                   <form onSubmit={handleSignUp} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Jane Doe" required value={name} onChange={(e) => setName(e.target.value)} disabled={loading}/>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input
                        id="email-signup"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password-signup">Password</Label>
                      <Input id="password-signup" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
                    </div>
                     <div className="grid gap-2">
                        <Label>Role</Label>
                        <RadioGroup value={signUpRole} onValueChange={(value) => setSignUpRole(value as UserRole)} className="flex gap-4 pt-1">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="patient" id="r1" />
                                <Label htmlFor="r1">Patient</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="doctor" id="r2" />
                                <Label htmlFor="r2">Doctor</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="admin" id="r3" />
                                <Label htmlFor="r3">Admin</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create account'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="https://picsum.photos/seed/loginbg/1920/1080"
          alt="Image"
          width="1920"
          height="1080"
          data-ai-hint="hospital hallway"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/50 backdrop-blur-sm rounded-lg">
          <blockquote className="text-white text-lg">
            &ldquo;This platform has revolutionized how I interact with my health records. The AI summaries are a game-changer, making complex reports easy to understand.&rdquo;
          </blockquote>
          <p className="text-white/80 mt-2">- Satisfied Patient</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPageContent />
        </Suspense>
    )
}
