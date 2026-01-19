'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-2">
                <Logo className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">MediSummarizer</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Your AI-powered healthcare assistant
            </p>
          </div>
           <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Enter your email below to login to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email-signin">Email</Label>
                      <Input
                        id="email-signin"
                        type="email"
                        placeholder="m@example.com"
                        required
                        defaultValue="jane.doe@example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password-signin">Password</Label>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input id="password-signin" type="password" required defaultValue="password" />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sign-up">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Enter your information to create an account.</CardDescription>
                </CardHeader>
                <CardContent>
                   <form onSubmit={handleLogin} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Jane Doe" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input
                        id="email-signup"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password-signup">Password</Label>
                      <Input id="password-signup" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Create account
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
