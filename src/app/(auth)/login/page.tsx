"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authApi, IS_MOCK } from "@/lib/api";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kirishda xatolik.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-7 sm:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Hisobga kirish</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Davom etish uchun email va parolingizni kiriting.
      </p>

      {IS_MOCK && (
        <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
          Demo rejim: istalgan email/parol bilan kiring.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
