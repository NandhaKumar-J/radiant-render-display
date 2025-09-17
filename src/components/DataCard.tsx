import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Users } from "lucide-react";

interface DataCardProps {
  layoutName: string;
  limitNode: string;
  outstandingBalance?: string;
  availableBalance?: string;
  instruments: string;
  counterpartyList: string;
}

export const DataCard = ({
  layoutName,
  limitNode,
  outstandingBalance,
  availableBalance,
  instruments,
  counterpartyList,
}: DataCardProps) => {
  return (
    <Card className="group bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
            {layoutName}
          </h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
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
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Outstanding
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {outstandingBalance}
                </p>
              </div>
            )}
            {availableBalance && (
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
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
            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <FileText className="w-4 h-4 mr-1" />
            {instruments}
          </Button>
          <Button
            variant="outline" 
            size="sm"
            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <Users className="w-4 h-4 mr-1" />
            {counterpartyList}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};