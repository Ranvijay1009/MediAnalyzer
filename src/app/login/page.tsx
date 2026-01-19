'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense, useEffect } from 'react';

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';

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
  const auth = useAuth();
  const firestore = useFirestore();
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

  const handleAuthError = (error: any) => {
    setLoading(false);
    toast({
      variant: 'destructive',
      title: 'Authentication Failed',
      description: error.message || 'An unknown error occurred.',
    });
  };

  const createOrUpdateUserInFirestore = async (firebaseUser: FirebaseUser, name?: string, newRole?: UserRole): Promise<User> => {
    const userDocRef = doc(firestore, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // User exists, return profile
      return { id: userDoc.id, uid: firebaseUser.uid, ...userDoc.data() } as User;
    } else {
      // New user, create profile
      const newUserProfile: Omit<User, 'id'> = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        name: name || firebaseUser.displayName || 'New User',
        role: newRole || 'patient', // default role
        avatarUrl: firebaseUser.photoURL || `https://picsum.photos/seed/${firebaseUser.uid}/100/100`,
      };
      await setDoc(userDocRef, newUserProfile);
      return { ...newUserProfile, id: userDocRef.id } as User;
    }
  }


  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(firestore, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userProfile = { id: userDoc.id, ...userDoc.data() } as User;
        if (userProfile.role !== role) {
            auth.signOut();
            toast({
                variant: 'destructive',
                title: 'Role Mismatch',
                description: `You are trying to log in as a ${role}, but this account is a ${userProfile.role}.`,
            });
            setLoading(false);
        } else {
            setLoading(false);
            router.push('/dashboard');
        }
      } else {
          auth.signOut();
          handleAuthError({ message: 'No account found with this email. Please sign up.' });
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createOrUpdateUserInFirestore(userCredential.user, name, signUpRole);
      setLoading(false);
      router.push('/dashboard');
    } catch (error: any) {
       if (error.code === 'auth/email-already-in-use') {
        handleAuthError({ message: 'An account with this email already exists. Please sign in.' });
      } else {
        handleAuthError(error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const userDocRef = doc(firestore, 'users', result.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userProfile = { id: userDoc.id, ...userDoc.data() } as User;
            if (userProfile.role !== role) {
                auth.signOut();
                toast({
                    variant: 'destructive',
                    title: 'Role Mismatch',
                    description: `You are trying to log in as a ${role}, but this account is a ${userProfile.role}.`,
                });
                setLoading(false);
            } else {
                setLoading(false);
                router.push('/dashboard');
            }
        } else {
            await createOrUpdateUserInFirestore(result.user, result.user.displayName || 'New User', role);
            setLoading(false);
            router.push('/dashboard');
        }
    } catch (error) {
        handleAuthError(error);
    }
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
                    <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading} type="button">
                      Sign in with Google
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
