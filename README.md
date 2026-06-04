<div align="center">

# ⚖️ Huquqim.AI — Web

### Advokati yo'q fuqarolar uchun sun'iy intellekt huquqiy yordamchisi

O'zbekiston fuqarolariga kichik sud ishlarida yordam beruvchi AI-platformaning **frontend** qismi.
Toza, ishonchli, mobil-birinchi interfeys — Lex.uz uslubidagi dizaynda.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)](https://vercel.com/)

[Backend repo](https://github.com/AloidinAkramov/huquqim-ai-backend) · [🌐 Jonli demo](https://frontend-mu-lilac-so8jhtnqsj.vercel.app)

</div>

---

## 📋 Loyiha haqida

**Huquqim.AI** — advokat yollay olmaydigan oddiy fuqarolar uchun huquqiy AI-yordamchi. Ushbu repo platformaning **veb interfeysi** — foydalanuvchi muammosini yozadi, AI bilan suhbatlashadi, hujjat tayyorlaydi.

> ⚠️ Bu xizmat advokat yoki yuristni **almashtirmaydi** — faqat huquqiy ma'lumot va yordam beruvchi vositadir.

---

## ✨ Asosiy sahifalar

| Sahifa | Tavsif |
|--------|--------|
| 🏠 **Landing** | Hero, imkoniyatlar, narxlar, disklaymer |
| 🔐 **Auth** | Ro'yxatdan o'tish / kirish |
| 📊 **Dashboard** | Ishlar ro'yxati, yangi ish ochish |
| 💬 **Chat** | AI suhbat — toifa foizlari, RAG manbalari, advokat tavsiyasi |
| 📄 **Hujjatlar** | 51+ shablon — to'ldirish va `.docx` yuklab olish |

---

## 🎨 Asosiy funksiyalar

- ✅ **AI chat interfeysi** — markdown, "yozmoqda" animatsiyasi, RAG manbalar
- ✅ **Triage paneli** — muammo toifalari foiz barlar bilan
- ✅ **Advokat tavsiyasi** — jiddiy ishda Telegram tugmasi
- ✅ **Hujjat yuklab olish** — shablon to'ldirib `.docx` (Word) olish
- ✅ **Premium / paywall** — bepul daraja cheklovi, upgrade oqimi
- ✅ **Mock rejim** — backendsiz ham demo ishlaydi

---

## 🛠️ Texnologiyalar

| Komponent | Texnologiya |
|-----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19 + TypeScript |
| **Stillar** | Tailwind CSS 4 |
| **Ikonkalar** | Lucide React |
| **Deploy** | Vercel |

---

## 🚀 Ishga tushirish

```bash
# 1. Klonlash
git clone https://github.com/AloidinAkramov/huquqim-ai-web.git
cd huquqim-ai-web

# 2. Paketlar
npm install

# 3. Sozlama (ixtiyoriy — bo'sh bo'lsa mock demo ishlaydi)
cp .env.example .env.local
# .env.local:  NEXT_PUBLIC_API_URL=https://your-backend-url

# 4. Dev server
npm run dev
# http://localhost:3000
```

### Muhit o'zgaruvchisi

| O'zgaruvchi | Tavsif |
|-------------|--------|
| `NEXT_PUBLIC_API_URL` | Backend manzili. Bo'sh bo'lsa — **mock demo** rejim ishlaydi |

---

## 🎨 Dizayn

Lex.uz (O'zbekiston qonunchilik portali) uslubida — **rasmiy davlat ko'ki** (`#0064A9`), toza oq fon, professional tipografiya. Fuqaro uchun tanish va ishonchli.

---

## 📁 Loyiha tuzilishi

```
src/
├── app/
│   ├── page.tsx              # Landing
│   ├── (auth)/               # Register, Login
│   └── dashboard/            # Ishlar, chat, hujjatlar
├── components/
│   ├── ui/                   # Button, Card, Input, Badge...
│   ├── triage-panel.tsx      # Toifa foizlari + Telegram
│   └── upgrade-modal.tsx     # Premium paywall
└── lib/
    ├── api.ts                # API client + mock layer
    └── types.ts              # Backend bilan mos tiplar
```

---

## 📜 Litsenziya

MIT — erkin foydalanish mumkin.

---

<div align="center">

**Huquqim.AI** · O'zbekiston fuqarolari uchun · 2026

</div>
