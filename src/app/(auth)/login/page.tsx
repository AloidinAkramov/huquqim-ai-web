"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api";
import { AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Demo hisob — bir bosishda kirish uchun (premium faol)
const DEMO_EMAIL = "admin@huquqim.ai";
const DEMO_PASSWORD = "admin123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(em: string, pw: string) {
    setError(null);
    try {
      await authApi.login({ email: em, password: pw });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kirishda xatolik.");
      throw err;
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      /* error ko'rsatildi */
    } finally {
      setLoading(false);
    }
  }

  async function demoLogin() {
    setDemoLoading(true);
    try {
      await login(DEMO_EMAIL, DEMO_PASSWORD);
    } catch {
      /* error ko'rsatildi */
    } finally {
      setDemoLoading(false);
    }
  }

  return (
    <Card className="p-7 sm:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Hisobga kirish</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Davom etish uchun email va parolingizni kiriting.
      </p>

      {/* Demo bilan bir bosishda kirish */}
      <Button
        type="button"
        variant="primary"
        className="mt-5 w-full"
        loading={demoLoading}
        onClick={demoLogin}
      >
        <Sparkles className="size-4" /> Demo bilan kirish (premium)
      </Button>
      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        yoki o&apos;z hisobingiz bilan
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="email@misol.uz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          type="password"
          label="Parol"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          Kirish
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Hisobingiz yo&apos;qmi?{" "}
        <Link href="/register" className="font-medium text-brand-600 hover:underline">
          Ro&apos;yxatdan o&apos;ting
        </Link>
      </p>
    </Card>
  );
}
