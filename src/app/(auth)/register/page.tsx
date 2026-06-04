"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authApi, IS_MOCK } from "@/lib/api";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", phoneNumber: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber || undefined,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ro'yxatdan o'tishda xatolik.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-7 sm:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Ro&apos;yxatdan o&apos;tish</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">Bepul hisob yarating va boshlang.</p>

      {IS_MOCK && (
        <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
          Demo rejim: ma&apos;lumotlar saqlanmaydi, faqat ko&apos;rsatish uchun.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <Input
          id="fullName"
          label="F.I.O."
          placeholder="Familiya Ism"
          value={form.fullName}
          onChange={set("fullName")}
          required
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="email@misol.uz"
          value={form.email}
          onChange={set("email")}
          required
        />
        <Input
          id="phoneNumber"
          label="Telefon (ixtiyoriy)"
          placeholder="+998901234567"
          value={form.phoneNumber}
          onChange={set("phoneNumber")}
        />
        <Input
          id="password"
          type="password"
          label="Parol"
          placeholder="Kamida 8 ta belgi"
          value={form.password}
          onChange={set("password")}
          minLength={8}
          required
        />

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          Ro&apos;yxatdan o&apos;tish
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Hisobingiz bormi?{" "}
        <Link href="/login" className="font-medium text-brand-600 hover:underline">
          Kirish
        </Link>
      </p>
    </Card>
  );
}
