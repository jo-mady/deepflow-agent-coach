import { Tag } from "@/components/ui/Tag";
import { RISK_STYLES } from "@/constants";
import type { RiskLevel } from "@/types";

export interface RiskBadgeProps {
  risk: RiskLevel;
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  const s = RISK_STYLES[risk];
  return <Tag label={risk} color={s.text} bg={s.bg} padding="2px 7px" />;
}
