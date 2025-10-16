import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Users } from "lucide-react";

interface RowCardProps {
  layoutName: string;
  limitNode: string;
  outstandingBalance?: string;
  availableBalance?: string;
  instruments: string;
  counterpartyList: string;
}

export const RowCard = ({
  layoutName,
  limitNode,
  outstandingBalance,
  availableBalance,
  instruments,
  counterpartyList,
}: RowCardProps) => {
  return (
    <div className="group bg-gradient-card border border-border/40 rounded-lg p-4 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-base text-card-foreground truncate">
              {layoutName}
            </h4>
            <Badge variant="secondary" className="bg-success/10 text-success border border-success/20 shrink-0">
              Active
            </Badge>
          </div>
          {limitNode && (
            <p className="text-muted-foreground text-sm font-medium">
              {limitNode}
            </p>
          )}
        </div>

        {(outstandingBalance || availableBalance) && (
          <div className="flex gap-4 shrink-0">
            {outstandingBalance && (
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-lg px-4 py-2">
                <p className="text-xs font-medium text-accent uppercase tracking-wide">
                  Outstanding
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5 whitespace-nowrap">
                  {outstandingBalance}
                </p>
              </div>
            )}
            {availableBalance && (
              <div className="bg-gradient-to-br from-success/5 to-success/10 border border-success/20 rounded-lg px-4 py-2">
                <p className="text-xs font-medium text-success uppercase tracking-wide">
                  Available
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5 whitespace-nowrap">
                  {availableBalance}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <FileText className="w-4 h-4 mr-1" />
            {instruments}
          </Button>
          <Button
            variant="outline" 
            size="sm"
            className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <Users className="w-4 h-4 mr-1" />
            {counterpartyList}
          </Button>
        </div>
      </div>
    </div>
  );
};
