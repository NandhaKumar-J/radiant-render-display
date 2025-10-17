import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { FileText, Calendar } from "lucide-react";

interface FileData {
  id: string;
  filename: string;
  uploadedDate: string;
  dueDate: string;
  instrumentDetails: string;
}

interface InstrumentDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instrument: {
    anchorCrn: string;
    limitNode: string;
    availableAmount: string;
    limitNode2: string;
    availableAmount2: string;
    totalAmountRequest: string;
    loanDueDate: string;
    remarks: string;
  } | null;
  files: FileData[];
}

export const InstrumentDetailDialog = ({
  open,
  onOpenChange,
  instrument,
  files,
}: InstrumentDetailDialogProps) => {
  if (!instrument) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Instrument Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instrument Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Anchor CRN</p>
              <p className="text-base font-medium">{instrument.anchorCrn}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Limit Node</p>
              <p className="text-base font-medium">{instrument.limitNode}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Available Amount</p>
              <p className="text-base font-medium text-green-600">
                {instrument.availableAmount}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Limit Node 2</p>
              <p className="text-base font-medium">{instrument.limitNode2}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Available Amount 2</p>
              <p className="text-base font-medium text-green-600">
                {instrument.availableAmount2}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Amount Request</p>
              <p className="text-base font-medium">{instrument.totalAmountRequest}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Loan Due Date</p>
              <p className="text-base font-medium">{instrument.loanDueDate}</p>
            </div>
            <div className="space-y-2 col-span-2">
              <p className="text-sm text-muted-foreground">Remarks</p>
              <p className="text-base font-medium">{instrument.remarks}</p>
            </div>
          </div>

          {/* Files Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Attached Files</h3>
            <div className="grid gap-3">
              {files.map((file) => (
                <Card key={file.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <FileText className="h-8 w-8 text-primary mt-1" />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Filename</p>
                        <p className="text-sm font-medium">{file.filename}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          Uploaded Date
                        </p>
                        <p className="text-sm font-medium">{file.uploadedDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          Due Date
                        </p>
                        <p className="text-sm font-medium">{file.dueDate}</p>
                      </div>
                      <div className="col-span-full">
                        <p className="text-xs text-muted-foreground mb-1">Instrument Details</p>
                        <p className="text-sm">{file.instrumentDetails}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
