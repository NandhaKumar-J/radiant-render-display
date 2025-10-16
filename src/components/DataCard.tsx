import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Users } from "lucide-react";

interface DataCardProps {
  layoutName: string;
  limitNode: string;
  outstandingBalance?: string;
  availableBalance?: string;
  instruments: string;
  counterpartyList: string;
  onInstrumentsClick?: () => void;
  onCounterpartyClick?: () => void;
  showCounterparty?: boolean;
}

export const DataCard = ({
  layoutName,
  limitNode,
  outstandingBalance,
  availableBalance,
  instruments,
  counterpartyList,
  onInstrumentsClick,
  onCounterpartyClick,
  showCounterparty = true,
}: DataCardProps) => {
  return (
    <Card className="group bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-0">
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
            {limitNode}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {(outstandingBalance || availableBalance) && (
          <div className="grid grid-cols-2 gap-4">
            {outstandingBalance && (
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-lg p-3">
                <p className="text-xs font-medium text-accent uppercase tracking-wide">
                  Outstanding
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {outstandingBalance}
                </p>
              </div>
            )}
            {availableBalance && (
              <div className="bg-gradient-to-br from-success/5 to-success/10 border border-success/20 rounded-lg p-3">
                <p className="text-xs font-medium text-success uppercase tracking-wide">
                  Available
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {availableBalance}
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onInstrumentsClick}
            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <FileText className="w-4 h-4 mr-1" />
            {instruments}
          </Button>
          {showCounterparty && (
            <Button
              variant="outline" 
              size="sm"
              onClick={onCounterpartyClick}
              className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <Users className="w-4 h-4 mr-1" />
              {counterpartyList}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};