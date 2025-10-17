import { useState, useMemo } from "react";
import { FilterSelect } from "@/components/FilterSelect";
import { InstrumentCard } from "@/components/InstrumentCard";
import { InstrumentDetailDialog } from "@/components/InstrumentDetailDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Instrument {
  id: string;
  anchorCrn: string;
  limitNode: string;
  availableAmount: string;
  limitNode2: string;
  availableAmount2: string;
  totalAmountRequest: string;
  loanDueDate: string;
  remarks: string;
  status: "approved" | "myPending" | "pendingAuth" | "returned" | "rejected";
}

const generateSampleInstruments = (): Instrument[] => {
  const statuses: Instrument["status"][] = ["approved", "myPending", "pendingAuth", "returned", "rejected"];
  return Array.from({ length: 25 }, (_, i) => ({
    id: `inst-${i + 1}`,
    anchorCrn: `CRN${Math.floor(Math.random() * 900000) + 100000}`,
    limitNode: `${Math.floor(Math.random() * 900000) + 100000}/LN${i + 1}`,
    availableAmount: `$${(Math.random() * 500000 + 100000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    limitNode2: `${Math.floor(Math.random() * 900000) + 100000}/LN2`,
    availableAmount2: `$${(Math.random() * 300000 + 50000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    totalAmountRequest: `$${(Math.random() * 200000 + 50000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    loanDueDate: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    remarks: `Instrument ${i + 1} remarks and notes`,
    status: statuses[i % statuses.length],
  }));
};

const generateSampleFiles = () => {
  return Array.from({ length: 3 }, (_, i) => ({
    id: `file-${i + 1}`,
    filename: `document_${i + 1}.pdf`,
    uploadedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    dueDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    instrumentDetails: `Supporting document for instrument processing - Document ${i + 1}`,
  }));
};

const FinanceRequest = () => {
  const [roleType, setRoleType] = useState<"counterparty" | "customer">("counterparty");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const { toast } = useToast();

  const instruments = useMemo(() => generateSampleInstruments(), []);
  const sampleFiles = useMemo(() => generateSampleFiles(), []);

  const roleOptions = [
    { value: "counterparty", label: "Counterparty" },
    { value: "customer", label: "Customer" },
  ];

  const getInstrumentsByStatus = (status: Instrument["status"]) => {
    return instruments.filter((inst) => inst.status === status);
  };

  const handleSelectChange = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedIds);
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleRequestFinance = () => {
    if (selectedIds.size === 0) {
      toast({
        title: "No instruments selected",
        description: "Please select at least one instrument to request finance.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Finance Request Submitted",
      description: `Successfully submitted finance request for ${selectedIds.size} instrument(s).`,
    });
    setSelectedIds(new Set());
  };

  const handleViewInstrument = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setDialogOpen(true);
  };

  const renderInstruments = (status: Instrument["status"]) => {
    const statusInstruments = getInstrumentsByStatus(status);
    
    return (
      <div className="space-y-3">
        {statusInstruments.map((inst) => (
          <InstrumentCard
            key={inst.id}
            id={inst.id}
            anchorCrn={inst.anchorCrn}
            limitNode={inst.limitNode}
            availableAmount={inst.availableAmount}
            totalAmountRequest={inst.totalAmountRequest}
            loanDueDate={inst.loanDueDate}
            showSelect={roleType === "counterparty"}
            selected={selectedIds.has(inst.id)}
            onSelectChange={(selected) => handleSelectChange(inst.id, selected)}
            onView={() => handleViewInstrument(inst)}
          />
        ))}
        {statusInstruments.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No instruments found in this category.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Finance Request</h2>
          <p className="text-muted-foreground">
            Manage and request finance for instruments
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <FilterSelect
            value={roleType}
            onChange={(value) => {
              setRoleType(value as "counterparty" | "customer");
              setSelectedIds(new Set());
            }}
            options={roleOptions}
          />
          {roleType === "counterparty" && selectedIds.size > 0 && (
            <Button onClick={handleRequestFinance}>
              Request Finance ({selectedIds.size})
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="approved" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="myPending">My Pending</TabsTrigger>
          <TabsTrigger value="pendingAuth">Pending Authorization</TabsTrigger>
          <TabsTrigger value="returned">Returned</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="approved" className="mt-6">
          {renderInstruments("approved")}
        </TabsContent>
        <TabsContent value="myPending" className="mt-6">
          {renderInstruments("myPending")}
        </TabsContent>
        <TabsContent value="pendingAuth" className="mt-6">
          {renderInstruments("pendingAuth")}
        </TabsContent>
        <TabsContent value="returned" className="mt-6">
          {renderInstruments("returned")}
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          {renderInstruments("rejected")}
        </TabsContent>
      </Tabs>

      <InstrumentDetailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        instrument={selectedInstrument}
        files={sampleFiles}
      />
    </div>
  );
};

export default FinanceRequest;
