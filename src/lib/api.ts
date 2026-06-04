// API client. NEXT_PUBLIC_API_URL bo'lsa real backendga ulanadi,
// bo'lmasa mock layer ishlaydi (Vercel demo).

import * as mock from "./mock";
import {
  AuthResponse,
  Case,
  CaseType,
  Conversation,
  Document,
  PagedList,
  SendMessageResponse,
  Template,
  TriageResult,
  User,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
export const IS_MOCK = !API_URL;

const TOKEN_KEY = "huquqim_token";

export const auth = {
  getToken: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
  setToken: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
  isAuthed: () => typeof window !== "undefined" && !!localStorage.getItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Xato premium (402) talab qilishidanmi — paywall ko'rsatish uchun. */
export function isPaymentRequired(err: unknown): boolean {
  return err instanceof ApiError && err.status === 402;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = auth.getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = "Xatolik yuz berdi.";
    try {
      const body = await res.json();
      message = body?.errors?.description || body?.title || message;
    } catch {
      /* ignore */
    }
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

// --- Auth ---

export const authApi = {
  async register(data: { fullName: string; email: string; password: string; phoneNumber?: string }) {
    if (IS_MOCK) {
      await delay();
      auth.setToken(mock.mockAuth.token);
      return { ...mock.mockAuth, user: { ...mock.mockUser, fullName: data.fullName, email: data.email } };
    }
    const r = await request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    auth.setToken(r.token);
    return r;
  },

  async login(data: { email: string; password: string }) {
    if (IS_MOCK) {
      await delay();
      auth.setToken(mock.mockAuth.token);
      return { ...mock.mockAuth, user: { ...mock.mockUser, email: data.email } };
    }
    const r = await request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    auth.setToken(r.token);
    return r;
  },

  async me() {
    if (IS_MOCK) return mock.getMockUser();
    return request<User>("/api/auth/me");
  },

  /** Tarif sotib olish (DEMO: darrov premium qiladi). tier: 1=bir martalik, 2=oylik. */
  async upgrade(tier: number) {
    if (IS_MOCK) {
      await delay();
      mock.setMockPremium(tier);
      return mock.getMockUser();
    }
    return request<User>("/api/auth/upgrade", {
      method: "POST",
      body: JSON.stringify({ tier }),
    });
  },
};

// --- Cases ---

export const casesApi = {
  async list() {
    if (IS_MOCK) {
      await delay(400);
      return { items: mock.mockCases, totalCount: mock.mockCases.length, pageIndex: 1, pageSize: 10, totalPages: 1 } as PagedList<Case>;
    }
    return request<PagedList<Case>>("/api/cases");
  },

  async get(id: number) {
    if (IS_MOCK) {
      await delay(300);
      return mock.mockCases.find((c) => c.id === id) ?? mock.mockCases[0];
    }
    return request<Case>(`/api/cases/${id}`);
  },

  async create(description: string) {
    if (IS_MOCK) {
      await delay();
      const c: Case = {
        id: Date.now(),
        title: description.slice(0, 60),
        description,
        type: 0,
        status: 0,
        createdAt: new Date().toISOString(),
        documentCount: 0,
      };
      mock.mockCases.unshift(c);
      return c;
    }
    return request<Case>("/api/cases", {
      method: "POST",
      body: JSON.stringify({ description }),
    });
  },

  /** Ishni toifalarga ajratish (triage) — foizlar bilan. */
  async triage(caseId: number) {
    if (IS_MOCK) {
      await delay(1200);
      return mock.mockTriage();
    }
    return request<TriageResult>(`/api/cases/${caseId}/triage`, { method: "POST" });
  },

  /** Saqlangan triage natijasini olish (bo'lsa). */
  async getTriage(caseId: number) {
    if (IS_MOCK) {
      await delay(200);
      return null as TriageResult | null;
    }
    return request<TriageResult | null>(`/api/cases/${caseId}/triage`);
  },
};

// --- Conversation / Chat ---

export const chatApi = {
  async getConversation(caseId: number) {
    if (IS_MOCK) {
      await delay(400);
      return mock.mockConversation;
    }
    return request<Conversation>(`/api/cases/${caseId}/conversation`);
  },

  async sendMessage(caseId: number, content: string) {
    if (IS_MOCK) {
      if (mock.mockReachedFreeLimit())
        throw new ApiError(402, "Bepul tarifda dastlabki tushuntirish berildi. Premium tarifni tanlang.");
      await delay(900);
      return mock.mockSendMessage(content);
    }
    return request<SendMessageResponse>(`/api/cases/${caseId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
};

// --- Documents ---

export const documentsApi = {
  async templates(caseType?: CaseType) {
    if (IS_MOCK) {
      await delay(300);
      return mock.mockTemplates;
    }
    const q = caseType !== undefined ? `?caseType=${caseType}` : "";
    return request<Template[]>(`/api/documents/templates${q}`);
  },

  async byCase(caseId: number) {
    if (IS_MOCK) {
      await delay(300);
      return mock.mockDocuments.filter((d) => d.caseId === caseId);
    }
    return request<Document[]>(`/api/cases/${caseId}/documents`);
  },

  async generate(caseId: number, templateId: number, values: Record<string, string>) {
    if (IS_MOCK) {
      if (!mock.mockUser.isPremium)
        throw new ApiError(402, "Hujjat tayyorlash premium tarif uchun.");
      await delay(800);
      return mock.mockDocuments[0];
    }
    return request<Document>(`/api/cases/${caseId}/documents`, {
      method: "POST",
      body: JSON.stringify({ templateId, values }),
    });
  },

  /** Hujjatni .docx (Word) fayl sifatida yuklab oladi. */
  async downloadDocx(doc: Document) {
    if (IS_MOCK) {
      // Mock: matnni .txt sifatida yuklaymiz (backend ulanmaganda)
      triggerDownload(new Blob([doc.content], { type: "text/plain;charset=utf-8" }), `${doc.title}.txt`);
      return;
    }
    const token = auth.getToken();
    const res = await fetch(`${API_URL}/api/documents/${doc.id}/download`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new ApiError(res.status, "Yuklab olishda xatolik.");
    const blob = await res.blob();
    triggerDownload(blob, `${doc.title}.docx`);
  },

  /** Shablonni to'ldirib to'g'ridan .docx yuklab oladi (ish ochmasdan). */
  async fillAndDownload(template: Template, values: Record<string, string>) {
    if (IS_MOCK) {
      if (!mock.mockUser.isPremium) throw new ApiError(402, "Hujjat yuklab olish premium uchun.");
      let text = template.name + "\n\n";
      // Oddiy mock: maydonlarni matnga qo'shamiz
      for (const f of template.fields) text += `${f.label}: ${values[f.key] ?? ""}\n`;
      triggerDownload(new Blob([text], { type: "text/plain;charset=utf-8" }), `${template.name}.txt`);
      return;
    }
    const token = auth.getToken();
    const res = await fetch(`${API_URL}/api/documents/fill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ templateId: template.id, values }),
    });
    if (!res.ok) {
      let msg = "Yuklab olishda xatolik.";
      try {
        const b = await res.json();
        msg = b?.errors?.description || msg;
      } catch {
        /* ignore */
      }
      throw new ApiError(res.status, msg);
    }
    const blob = await res.blob();
    triggerDownload(blob, `${template.name}.docx`);
  },
};

/** Brauzerда faylni yuklab olishni boshlaydi. */
function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
