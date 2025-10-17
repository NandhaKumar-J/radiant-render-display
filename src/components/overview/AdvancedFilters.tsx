import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface AdvancedFiltersProps {
  filters: {
    filename: string;
    uploadReference: string;
    dateFrom: string;
    dateTo: string;
    instrumentNumber: string;
    amountFrom: string;
    amountTo: string;
    transactionStatus: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
}

export const AdvancedFilters = ({ filters, onFilterChange, onReset }: AdvancedFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-card border border-border/40 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {isExpanded && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filename">Filename</Label>
              <Input
                id="filename"
                value={filters.filename}
                onChange={(e) => onFilterChange("filename", e.target.value)}
                placeholder="Enter filename..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uploadReference">Upload Reference</Label>
              <Input
                id="uploadReference"
                value={filters.uploadReference}
                onChange={(e) => onFilterChange("uploadReference", e.target.value)}
                placeholder="Enter upload ref..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFrom">Date From</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFilterChange("dateFrom", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTo">Date To</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => onFilterChange("dateTo", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instrumentNumber">Invoice/Instrument Number</Label>
              <Input
                id="instrumentNumber"
                value={filters.instrumentNumber}
                onChange={(e) => onFilterChange("instrumentNumber", e.target.value)}
                placeholder="Enter instrument number..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amountFrom">Invoice Amount From</Label>
              <Input
                id="amountFrom"
                type="number"
                value={filters.amountFrom}
                onChange={(e) => onFilterChange("amountFrom", e.target.value)}
                placeholder="Min amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amountTo">Invoice Amount To</Label>
              <Input
                id="amountTo"
                type="number"
                value={filters.amountTo}
                onChange={(e) => onFilterChange("amountTo", e.target.value)}
                placeholder="Max amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionStatus">Transaction Status</Label>
              <Select value={filters.transactionStatus} onValueChange={(value) => onFilterChange("transactionStatus", value)}>
                <SelectTrigger id="transactionStatus">
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="lapsed">Lapsed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="aborted">Aborted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onReset} size="sm">
              Reset Filters
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
