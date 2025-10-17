import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OverviewCardProps {
  layoutName: string;
  limitNode: string;
  outstandingBalance: string;
  availableBalance: string;
  onSelect?: () => void;
}

export const OverviewCard = ({
  layoutName,
  limitNode,
  outstandingBalance,
  availableBalance,
  onSelect,
}: OverviewCardProps) => {
  return (
    <Card 
      className="group bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-0 cursor-pointer"
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
            {layoutName}
          </h3>
          <Badge variant="secondary" className="bg-success/10 text-success border border-success/20">
            Active
          </Badge>
        </div>
        {limitNode && (
          <p className="text-muted-foreground text-sm font-medium mt-1">
            Limit Node: {limitNode}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-lg p-3">
            <p className="text-xs font-medium text-accent uppercase tracking-wide">
              Outstanding
            </p>
            <p className="text-sm font-semibold text-foreground mt-1">
              {outstandingBalance}
            </p>
          </div>
          <div className="bg-gradient-to-br from-success/5 to-success/10 border border-success/20 rounded-lg p-3">
            <p className="text-xs font-medium text-success uppercase tracking-wide">
              Available
            </p>
            <p className="text-sm font-semibold text-foreground mt-1">
              {availableBalance}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
