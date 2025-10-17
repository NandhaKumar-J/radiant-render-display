import { useState, useMemo } from "react";
import { OverviewCard } from "@/components/overview/OverviewCard";
import { InstrumentRowCard } from "@/components/overview/InstrumentRowCard";
import { CounterpartyRowCard } from "@/components/overview/CounterpartyRowCard";
import { AdvancedFilters } from "@/components/overview/AdvancedFilters";
import { Pagination } from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { overviewCardsData, approvedInstruments, rejectedInstruments, counterpartyListData } from "@/data/overviewData";

const Overview = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"instruments" | "counterparty">("instruments");
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState("");
  const [filters, setFilters] = useState({
    filename: "",
    uploadReference: "",
    dateFrom: "",
    dateTo: "",
    instrumentNumber: "",
    amountFrom: "",
    amountTo: "",
    transactionStatus: "all",
  });

  const itemsPerPage = 8;

  const handleCardSelect = (layoutName: string) => {
    setSelectedCard(layoutName);
    setDialogOpen(true);
    setCurrentPage(1);
    setGoToPage("");
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      filename: "",
      uploadReference: "",
      dateFrom: "",
      dateTo: "",
      instrumentNumber: "",
      amountFrom: "",
      amountTo: "",
      transactionStatus: "all",
    });
    setCurrentPage(1);
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPage);
    const data = activeTab === "instruments" 
      ? (instrumentsTab === "approved" ? filteredApprovedInstruments : filteredRejectedInstruments)
      : filteredCounterparties;
    const maxPage = Math.ceil(data.length / itemsPerPage);
    
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPage) {
      setCurrentPage(pageNum);
      setGoToPage("");
    }
  };

  const [instrumentsTab, setInstrumentsTab] = useState<"approved" | "rejected">("approved");

  // Apply filters to instruments
  const filteredApprovedInstruments = useMemo(() => {
    return approvedInstruments.filter((item) => {
      const matchesFilename = filters.filename === "" || item.uploadRef.toLowerCase().includes(filters.filename.toLowerCase());
      const matchesUploadRef = filters.uploadReference === "" || item.uploadRef.toLowerCase().includes(filters.uploadReference.toLowerCase());
      const matchesInstrumentNumber = filters.instrumentNumber === "" || item.instrumentNumber.toLowerCase().includes(filters.instrumentNumber.toLowerCase());
      const matchesStatus = filters.transactionStatus === "all" || item.transactionStatus.toLowerCase() === filters.transactionStatus.toLowerCase();
      
      const uploadDate = new Date(item.uploadDate);
      const matchesDateFrom = filters.dateFrom === "" || uploadDate >= new Date(filters.dateFrom);
      const matchesDateTo = filters.dateTo === "" || uploadDate <= new Date(filters.dateTo);
      
      const amount = parseFloat(item.instrumentAmount.replace(/[$,]/g, ''));
      const matchesAmountFrom = filters.amountFrom === "" || amount >= parseFloat(filters.amountFrom);
      const matchesAmountTo = filters.amountTo === "" || amount <= parseFloat(filters.amountTo);
      
      return matchesFilename && matchesUploadRef && matchesInstrumentNumber && matchesStatus && 
             matchesDateFrom && matchesDateTo && matchesAmountFrom && matchesAmountTo;
    });
  }, [filters]);

  const filteredRejectedInstruments = useMemo(() => {
    return rejectedInstruments.filter((item) => {
      const matchesFilename = filters.filename === "" || item.uploadRef.toLowerCase().includes(filters.filename.toLowerCase());
      const matchesUploadRef = filters.uploadReference === "" || item.uploadRef.toLowerCase().includes(filters.uploadReference.toLowerCase());
      const matchesInstrumentNumber = filters.instrumentNumber === "" || item.instrumentNumber.toLowerCase().includes(filters.instrumentNumber.toLowerCase());
      const matchesStatus = filters.transactionStatus === "all" || item.transactionStatus.toLowerCase() === filters.transactionStatus.toLowerCase();
      
      const uploadDate = new Date(item.uploadDate);
      const matchesDateFrom = filters.dateFrom === "" || uploadDate >= new Date(filters.dateFrom);
      const matchesDateTo = filters.dateTo === "" || uploadDate <= new Date(filters.dateTo);
      
      const amount = parseFloat(item.instrumentAmount.replace(/[$,]/g, ''));
      const matchesAmountFrom = filters.amountFrom === "" || amount >= parseFloat(filters.amountFrom);
      const matchesAmountTo = filters.amountTo === "" || amount <= parseFloat(filters.amountTo);
      
      return matchesFilename && matchesUploadRef && matchesInstrumentNumber && matchesStatus && 
             matchesDateFrom && matchesDateTo && matchesAmountFrom && matchesAmountTo;
    });
  }, [filters]);

  // Apply filters to counterparties
  const filteredCounterparties = useMemo(() => {
    return counterpartyListData.filter((item) => {
      const matchesFilename = filters.filename === "" || item.layoutName.toLowerCase().includes(filters.filename.toLowerCase());
      const matchesUploadRef = filters.uploadReference === "" || item.counterpartyCrn.toLowerCase().includes(filters.uploadReference.toLowerCase());
      
      return matchesFilename && matchesUploadRef;
    });
  }, [filters]);

  const getCurrentPageData = () => {
    const data = activeTab === "instruments" 
      ? (instrumentsTab === "approved" ? filteredApprovedInstruments : filteredRejectedInstruments)
      : filteredCounterparties;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = () => {
    const data = activeTab === "instruments" 
      ? (instrumentsTab === "approved" ? filteredApprovedInstruments : filteredRejectedInstruments)
      : filteredCounterparties;
    return Math.ceil(data.length / itemsPerPage);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Overview</h2>
        <p className="text-muted-foreground">
          Manage and view your supply chain formats and dashboard layouts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {overviewCardsData.map((item) => (
          <OverviewCard 
            key={item.id} 
            {...item} 
            onSelect={() => handleCardSelect(item.layoutName)}
          />
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedCard}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value as "instruments" | "counterparty");
            setCurrentPage(1);
          }} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="instruments">Instruments</TabsTrigger>
              <TabsTrigger value="counterparty">Counterparty List</TabsTrigger>
            </TabsList>

            <TabsContent value="instruments" className="flex-1 flex flex-col space-y-4 overflow-hidden">
              <AdvancedFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />

              <Tabs value={instrumentsTab} onValueChange={(value) => {
                setInstrumentsTab(value as "approved" | "rejected");
                setCurrentPage(1);
              }}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
                
                <TabsContent value="approved" className="flex flex-col gap-3 mt-4 overflow-y-auto max-h-[400px]">
                  {getCurrentPageData().map((item) => (
                    <InstrumentRowCard key={item.id} {...item} />
                  ))}
                  {getCurrentPageData().length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No approved instruments found matching filters.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="rejected" className="flex flex-col gap-3 mt-4 overflow-y-auto max-h-[400px]">
                  {getCurrentPageData().map((item) => (
                    <InstrumentRowCard key={item.id} {...item} />
                  ))}
                  {getCurrentPageData().length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No rejected instruments found matching filters.</p>
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="counterparty" className="flex-1 flex flex-col space-y-4 overflow-hidden">
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px]">
                {getCurrentPageData().map((item) => (
                  <CounterpartyRowCard key={item.id} {...item} />
                ))}
                {getCurrentPageData().length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No counterparties found.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="border-t pt-4 mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Go to page"
                  value={goToPage}
                  onChange={(e) => setGoToPage(e.target.value)}
                  className="w-32"
                  min="1"
                  max={getTotalPages()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleGoToPage();
                    }
                  }}
                />
                <Button onClick={handleGoToPage} variant="outline" size="sm">
                  Go
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Page {currentPage} / {getTotalPages()}
              </div>
            </div>
            {getTotalPages() > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={getTotalPages()}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Overview;
