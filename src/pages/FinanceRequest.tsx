import { useState, useMemo } from "react";
import { FilterSelect } from "@/components/FilterSelect";
import { InstrumentCard } from "@/components/InstrumentCard";
import { InstrumentDetailDialog } from "@/components/InstrumentDetailDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  return Array.from({ length: 100 }, (_, i) => ({
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
  const formats = ['pdf', 'excel', 'pdf', 'excel', 'pdf'];
  return Array.from({ length: 5 }, (_, i) => ({
    id: `file-${i + 1}`,
    filename: `document_${i + 1}.${formats[i]}`,
    uploadedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    dueDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    instrumentDetails: `Supporting document for instrument processing - Document ${i + 1}`,
    format: formats[i],
  }));
};

const FinanceRequest = () => {
  const [roleType, setRoleType] = useState<"counterparty" | "customer">("counterparty");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [currentTab, setCurrentTab] = useState<Instrument["status"]>("approved");
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPageInput, setGoToPageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [fileFormat, setFileFormat] = useState<string>("all");
  const { toast } = useToast();
  
  const itemsPerPage = 10;

  const instruments = useMemo(() => generateSampleInstruments(), []);
  const sampleFiles = useMemo(() => generateSampleFiles(), []);

  const roleOptions = [
    { value: "counterparty", label: "Counterparty" },
    { value: "customer", label: "Customer" },
  ];

  const getInstrumentsByStatus = (status: Instrument["status"]) => {
    let filtered = instruments.filter((inst) => inst.status === status);
    
    // Apply search filters
    if (searchTerm) {
      filtered = filtered.filter((inst) => 
        inst.anchorCrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.limitNode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filtered = filtered.filter((inst) => new Date(inst.loanDueDate) >= fromDate);
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      filtered = filtered.filter((inst) => new Date(inst.loanDueDate) <= toDate);
    }
    
    return filtered;
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
    if (currentTab !== "myPending") {
      toast({
        title: "Invalid Action",
        description: "Finance requests can only be made from My Pending tab.",
        variant: "destructive",
      });
      return;
    }
    
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
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleGoToPage = () => {
    const page = parseInt(goToPageInput);
    const totalPages = Math.ceil(getInstrumentsByStatus(currentTab).length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setGoToPageInput("");
    } else {
      toast({
        title: "Invalid Page",
        description: `Please enter a page number between 1 and ${totalPages}.`,
        variant: "destructive",
      });
    }
  };
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value as Instrument["status"]);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleViewInstrument = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setDialogOpen(true);
  };

  const renderInstruments = (status: Instrument["status"]) => {
    const statusInstruments = getInstrumentsByStatus(status);
    const totalPages = Math.ceil(statusInstruments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedInstruments = statusInstruments.slice(startIndex, endIndex);
    
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          {paginatedInstruments.map((inst) => (
            <InstrumentCard
              key={inst.id}
              id={inst.id}
              anchorCrn={inst.anchorCrn}
              limitNode={inst.limitNode}
              availableAmount={inst.availableAmount}
              totalAmountRequest={inst.totalAmountRequest}
              loanDueDate={inst.loanDueDate}
              showSelect={roleType === "counterparty" && status === "myPending"}
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
        
        {statusInstruments.length > 0 && (
          <div className="flex items-center justify-between gap-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Page"
                value={goToPageInput}
                onChange={(e) => setGoToPageInput(e.target.value)}
                className="w-20"
                min={1}
                max={totalPages}
              />
              <Button onClick={handleGoToPage} variant="outline" size="sm">
                Go
              </Button>
            </div>
          </div>
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
          {roleType === "counterparty" && selectedIds.size > 0 && currentTab === "myPending" && (
            <Button onClick={handleRequestFinance}>
              Request Finance ({selectedIds.size})
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by CRN, Limit Node, Reference..."
        />
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          placeholder="From Date"
          className="bg-background/50 border-border/50"
        />
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          placeholder="To Date"
          className="bg-background/50 border-border/50"
        />
        <Select value={fileFormat} onValueChange={setFileFormat}>
          <SelectTrigger className="bg-background/50 border-border/50">
            <SelectValue placeholder="File Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Formats</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="excel">Excel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="approved" className="w-full" onValueChange={handleTabChange}>
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
