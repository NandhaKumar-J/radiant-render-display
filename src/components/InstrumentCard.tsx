import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye } from "lucide-react";

interface InstrumentCardProps {
  id: string;
  anchorCrn: string;
  limitNode: string;
  availableAmount: string;
  totalAmountRequest: string;
  loanDueDate: string;
  showSelect?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  onView?: () => void;
}

export const InstrumentCard = ({
  id,
  anchorCrn,
  limitNode,
  availableAmount,
  totalAmountRequest,
  loanDueDate,
  showSelect = false,
  selected = false,
  onSelectChange,
  onView,
}: InstrumentCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {showSelect && (
          <Checkbox
            checked={selected}
            onCheckedChange={onSelectChange}
            className="mt-1"
          />
        )}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Anchor CRN</p>
            <p className="text-sm font-medium">{anchorCrn}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Limit Node</p>
            <p className="text-sm font-medium">{limitNode}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Available Amount</p>
            <p className="text-sm font-medium text-green-600">{availableAmount}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Request</p>
            <p className="text-sm font-medium">{totalAmountRequest}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Loan Due Date</p>
            <p className="text-sm font-medium">{loanDueDate}</p>
          </div>
        </div>
        {!showSelect && (
          <Button variant="outline" size="sm" onClick={onView}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        )}
      </div>
    </Card>
  );
};
