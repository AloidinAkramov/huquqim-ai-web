// Backend (Huquqim.Domain) bilan mos tiplar

export enum CaseType {
  Unknown = 0,
  Consumer = 1,
  Labor = 2,
  Administrative = 3,
  Rent = 4,
  Civil = 5,
  RequiresLawyer = 99,
}

export enum CaseStatus {
  Triage = 0,
  Explained = 1,
  DocumentDrafting = 2,
  DocumentReady = 3,
  Preparing = 4,
  Closed = 5,
  ReferredToLawyer = 6,
}

export enum DocumentType {
  Claim = 0,
  Pretension = 1,
  Complaint = 2,
  Objection = 3,
  Explanatory = 4,
  Appeal = 5,
}

export enum MessageRole {
  User = 0,
  Assistant = 1,
  System = 2,
}

export enum SubscriptionTier {
  Free = 0,
  OneTime = 1,
  Monthly = 2,
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt?: string;
  isPremium: boolean;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: User;
}

export interface Case {
  id: number;
  title: string;
  description?: string;
  type: CaseType;
  status: CaseStatus;
  responsibleAuthority?: string;
  deadline?: string;
  createdAt: string;
  documentCount: number;
}

export interface Message {
  id: number;
  role: MessageRole;
  content: string;
  sources: string[];
  createdAt: string;
}

export interface Conversation {
  id: number;
  caseId: number;
  title?: string;
  createdAt: string;
  messages: Message[];
}

export interface SendMessageResponse {
  conversationId: number;
  reply: Message;
  disclaimer: string;
}

export interface TemplateField {
  key: string;
  label: string;
  required: boolean;
  placeholder?: string;
}

export interface Template {
  id: number;
  type: DocumentType;
  caseType: CaseType;
  name: string;
  description?: string;
  fields: TemplateField[];
}

export interface Document {
  id: number;
  caseId: number;
  type: DocumentType;
  title: string;
  content: string;
  createdAt: string;
}

export interface PagedList<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

export interface TriageCategory {
  name: string;
  percent: number;
}

export interface TriageResult {
  categories: TriageCategory[];
  recommendLawyer: boolean;
  lawyerReason?: string;
  summary?: string;
}

// --- Ko'rsatish uchun yorliqlar (o'zbek tilida) ---

export const caseTypeLabels: Record<CaseType, string> = {
  [CaseType.Unknown]: "Aniqlanmoqda",
  [CaseType.Consumer]: "Iste'molchi nizosi",
  [CaseType.Labor]: "Mehnat nizosi",
  [CaseType.Administrative]: "Ma'muriy ish",
  [CaseType.Rent]: "Ijara nizosi",
  [CaseType.Civil]: "Fuqarolik nizosi",
  [CaseType.RequiresLawyer]: "Yurist talab qiladi",
};

export const caseStatusLabels: Record<CaseStatus, string> = {
  [CaseStatus.Triage]: "Aniqlanmoqda",
  [CaseStatus.Explained]: "Tushuntirildi",
  [CaseStatus.DocumentDrafting]: "Hujjat tayyorlanmoqda",
  [CaseStatus.DocumentReady]: "Hujjat tayyor",
  [CaseStatus.Preparing]: "Sudga tayyorgarlik",
  [CaseStatus.Closed]: "Yopilgan",
  [CaseStatus.ReferredToLawyer]: "Yuristga yo'naltirilgan",
};
