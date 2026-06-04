// Mock layer — backend ulanmagunicha Vercel'da demo ma'lumot bilan ishlaydi.
import {
  AuthResponse,
  Case,
  CaseStatus,
  CaseType,
  Conversation,
  Document,
  DocumentType,
  MessageRole,
  SendMessageResponse,
  SubscriptionTier,
  Template,
} from "./types";

const now = () => new Date().toISOString();

export const mockUser = {
  id: 1,
  fullName: "Demo Foydalanuvchi",
  email: "demo@huquqim.ai",
  subscriptionTier: SubscriptionTier.Free,
  isPremium: false,
};

export function getMockUser() {
  return { ...mockUser };
}

/** DEMO: mock foydalanuvchini premium qiladi. */
export function setMockPremium(tier: number) {
  mockUser.subscriptionTier = tier === 2 ? SubscriptionTier.Monthly : SubscriptionTier.OneTime;
  mockUser.isPremium = true;
}

export const mockAuth: AuthResponse = {
  token: "mock-token",
  expiresAt: new Date(Date.now() + 7 * 864e5).toISOString(),
  user: mockUser,
};

export const mockCases: Case[] = [
  {
    id: 1,
    title: "Do'kon buzuq telefon sotdi, pulni qaytarmayapti",
    description: "Yangi telefon oldim, 3 kunda buzildi. Do'kon almashtirishdan bosh tortyapti.",
    type: CaseType.Consumer,
    status: CaseStatus.DocumentReady,
    responsibleAuthority: "Iste'molchilar huquqlarini himoya qilish agentligi",
    deadline: new Date(Date.now() + 12 * 864e5).toISOString(),
    createdAt: new Date(Date.now() - 2 * 864e5).toISOString(),
    documentCount: 1,
  },
  {
    id: 2,
    title: "Ish haqi 2 oydan beri to'lanmayapti",
    type: CaseType.Labor,
    status: CaseStatus.Explained,
    createdAt: new Date(Date.now() - 5 * 864e5).toISOString(),
    documentCount: 0,
  },
];

const demoReply = `Tushundim, vaziyatingiz aniq. Sizning holatingizda **iste'molchi huquqlari** ishga tushadi.

"Iste'molchilar huquqlarini himoya qilish to'g'risida"gi qonunning **13-moddasiga** ko'ra, sifatsiz tovar sotilgan bo'lsa, siz quyidagilardan birini talab qilishga haqlisiz:

1. Tovarni **almashtirish**
2. To'langan **pulni qaytarib olish**
3. Kamchilikni **bepul tuzatish**

Birinchi qadam — do'konga rasmiy **pretenziya (talabnoma)** yozish. Men sizga uni tayyorlashda yordam beraman.

Keling, boshlaymiz: telefon qachon va qancha pulga sotib olingan edi?`;

export const mockConversation: Conversation = {
  id: 1,
  caseId: 1,
  title: "Iste'molchi nizosi",
  createdAt: now(),
  messages: [
    {
      id: 1,
      role: MessageRole.User,
      content: "Do'kondan telefon oldim, 3 kunda buzildi, almashtirishdan bosh tortishyapti.",
      sources: [],
      createdAt: now(),
    },
    {
      id: 2,
      role: MessageRole.Assistant,
      content: demoReply,
      sources: ["Iste'molchilar qonuni 13-modda", "Fuqarolik kodeksi 15-modda"],
      createdAt: now(),
    },
  ],
};

// Demo limit hisoblagichi (bepul: 2 AI javobi)
let mockAiReplyCount = 0;
export const FREE_MESSAGE_LIMIT = 2;

export function mockReachedFreeLimit(): boolean {
  return !mockUser.isPremium && mockAiReplyCount >= FREE_MESSAGE_LIMIT;
}

export function mockSendMessage(content: string): SendMessageResponse {
  mockAiReplyCount += 1;
  return {
    conversationId: 1,
    reply: {
      id: Date.now(),
      role: MessageRole.Assistant,
      content: `**Demo rejim:** Sizning xabaringiz qabul qilindi — "${content.slice(0, 60)}${
        content.length > 60 ? "…" : ""
      }".

Haqiqiy AI javoblari uchun backend (Claude API + bilim bazasi) ulanishi kerak. Hozir bu namuna javob.

Sizning holatingizga tegishli qonun: **Iste'molchilar qonuni 13-modda** — sifatsiz tovar uchun pulni qaytarish yoki almashtirish huquqi.`,
      sources: ["Iste'molchilar qonuni 13-modda"],
      createdAt: now(),
    },
    disclaimer: "Bu umumiy ma'lumot. Murakkab holatda malakali yuristga murojaat qiling.",
  };
}

export function mockTriage() {
  return {
    categories: [
      { name: "Iste'molchi", percent: 85 },
      { name: "Fuqarolik", percent: 12 },
      { name: "Ma'muriy", percent: 3 },
    ],
    recommendLawyer: false,
    summary: "Bu iste'molchi nizosi. Oddiy huquqiy yordam yetarli.",
  };
}

export const mockTemplates: Template[] = [
  {
    id: 1,
    type: DocumentType.Pretension,
    caseType: CaseType.Consumer,
    name: "Iste'molchi pretenziyasi (talabnoma)",
    description: "Do'kon yoki sotuvchiga rasmiy talabnoma. Sudga murojaatdan oldingi bosqich.",
    fields: [
      { key: "sotuvchi", label: "Sotuvchi (do'kon) nomi", required: true, placeholder: 'MChJ "..."' },
      { key: "fio", label: "Sizning F.I.O.", required: true },
      { key: "tovar", label: "Tovar nomi", required: true },
      { key: "summa", label: "To'langan summa (so'm)", required: true },
      { key: "talab", label: "Talabingiz", required: true, placeholder: "Pulni qaytarish" },
    ],
  },
  {
    id: 2,
    type: DocumentType.Claim,
    caseType: CaseType.Consumer,
    name: "Da'vo arizasi (iste'molchi)",
    description: "Sudga beriladigan da'vo arizasi namunasi.",
    fields: [
      { key: "sud", label: "Sud nomi", required: true },
      { key: "fio", label: "Sizning F.I.O.", required: true },
      { key: "talab", label: "Da'vo talabi", required: true },
    ],
  },
];

export const mockDocuments: Document[] = [
  {
    id: 1,
    caseId: 1,
    type: DocumentType.Pretension,
    title: "Iste'molchi pretenziyasi (talabnoma)",
    content: `MChJ "TechStore" ga

Demo Foydalanuvchi dan

PRETENZIYA (TALABNOMA)

01.05.2026 sanasida men Sizning do'koningizdan "Smartphone X" tovarini
3 500 000 so'mga sotib oldim. Biroq 3 kun ichida tovar ishdan chiqdi.

"Iste'molchilar huquqlarini himoya qilish to'g'risida"gi qonunning
13-moddasiga muvofiq, to'langan pulni qaytarib olishni TALAB QILAMAN.

Sana: ____________        Imzo: ____________`,
    createdAt: new Date(Date.now() - 864e5).toISOString(),
  },
];
