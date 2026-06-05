import { Badge } from "@/components/ui/badge";
import { CaseStatus, caseStatusLabels, CaseType, caseTypeLabels } from "@/lib/types";

const statusTone: Record<CaseStatus, "brand" | "neutral" | "success" | "warning" | "danger"> = {
  [CaseStatus.Triage]: "warning",
  [CaseStatus.Explained]: "brand",
  [CaseStatus.DocumentDrafting]: "brand",
  [CaseStatus.DocumentReady]: "success",
  [CaseStatus.Preparing]: "brand",
  [CaseStatus.Closed]: "neutral",
  [CaseStatus.ReferredToLawyer]: "danger",
};

export function CaseStatusBadge({ status }: { status: CaseStatus }) {
  return (
    <Badge tone={statusTone[status]} dot>
      {caseStatusLabels[status]}
    </Badge>
  );
}

export function CaseTypeBadge({ type }: { type: CaseType }) {
  if (type === CaseType.Unknown) return null;
  return <Badge tone="neutral">{caseTypeLabels[type]}</Badge>;
}
