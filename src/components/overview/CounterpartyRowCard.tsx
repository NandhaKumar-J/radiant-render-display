import { Badge } from "@/components/ui/badge";
import { CounterpartyData } from "@/data/overviewData";

interface CounterpartyRowCardProps extends CounterpartyData {}

export const CounterpartyRowCard = ({
  layoutName,
  counterpartyCrn,
  nameOfCountry,
  counterpartyCode,
  limitNode,
  outstandingBalance,
  availableBalance,
}: CounterpartyRowCardProps) => {
  return (
    <div className="group bg-gradient-card border border-border/40 rounded-lg p-4 hover:shadow-card-hover transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Column 1 */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Layout Name</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{layoutName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Counterparty CRN</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{counterpartyCrn}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Country</p>
            <Badge variant="outline" className="mt-0.5">
              {nameOfCountry}
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Counterparty Code</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{counterpartyCode}</p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Limit Node</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{limitNode}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Outstanding Balance</p>
            <p className="text-sm font-semibold text-accent mt-0.5">{outstandingBalance}</p>
          </div>
        </div>

        {/* Column 4 */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Available Balance</p>
            <p className="text-sm font-semibold text-success mt-0.5">{availableBalance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
