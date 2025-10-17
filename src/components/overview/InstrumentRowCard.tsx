import { Badge } from "@/components/ui/badge";
import { InstrumentData } from "@/data/overviewData";

interface InstrumentRowCardProps extends InstrumentData {}

export const InstrumentRowCard = ({
  uploadRef,
  uploadDate,
  instrumentNumber,
  instrumentDate,
  instrumentAmount,
  instrumentDueDate,
  loanMaturityDate,
  counterpartyCode,
  transactionReferenceId,
  transactionStatus,
  transactionRemarks,
}: InstrumentRowCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "lapsed":
      case "rejected":
      case "failed":
      case "aborted":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="group bg-gradient-card border border-border/40 rounded-lg p-4 hover:shadow-card-hover transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Column 1 */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Upload Reference</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{uploadRef}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Upload Date</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{uploadDate}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Instrument Number</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{instrumentNumber}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Instrument Date</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{instrumentDate}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Instrument Amount</p>
            <p className="text-sm font-semibold text-primary mt-0.5">{instrumentAmount}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Instrument Due Date</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{instrumentDueDate}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Loan Maturity Date</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{loanMaturityDate}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Counterparty Code</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{counterpartyCode}</p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Transaction Reference ID</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{transactionReferenceId}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Transaction Status</p>
            <Badge className={`${getStatusColor(transactionStatus)} border mt-0.5`}>
              {transactionStatus}
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Transaction Remarks</p>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{transactionRemarks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
