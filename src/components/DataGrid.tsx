import { useState, useMemo } from "react";
import { DataCard } from "./DataCard";
import { RowCard } from "./RowCard";
import { SearchBar } from "./SearchBar";
import { FilterSelect } from "./FilterSelect";
import { Pagination } from "./Pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataItem {
  id: string;
  layoutName: string;
  limitNode: string;
  outstandingBalance?: string;
  availableBalance?: string;
  instruments: string;
  counterpartyList: string;
}

const sampleData: DataItem[] = [
  {
    id: "1",
    layoutName: "Supply Chain Format 6",
    limitNode: "456788/IVD",
    outstandingBalance: "$2,450,000",
    availableBalance: "$1,550,000",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "2", 
    layoutName: "Supply Chain Format 6",
    limitNode: "456788/IVD",
    outstandingBalance: "$3,200,000",
    availableBalance: "$800,000",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "3",
    layoutName: "Supply Chain Format 5",
    limitNode: "4",
    outstandingBalance: "$875,000",
    availableBalance: "$4,125,000",
    instruments: "Instruments", 
    counterpartyList: "CounterpartyList",
  },
  {
    id: "4",
    layoutName: "DASHBOARD TESTING1",
    limitNode: "6500073_10/WCDL",
    outstandingBalance: "$1,650,000",
    availableBalance: "$2,350,000",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList", 
  },
  {
    id: "5",
    layoutName: "Reliance SCF3",
    limitNode: "6500073_10/WCDL",
    outstandingBalance: "$5,200,000",
    availableBalance: "$800,000",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "6",
    layoutName: "Supply Chain Format 7", 
    limitNode: "GHTY/YUUU",
    outstandingBalance: "$950,000",
    availableBalance: "$3,050,000",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "7",
    layoutName: "SCF 6 BUNCHING WITH TENOR FIELD",
    limitNode: "6500073_10/WCDL",
    outstandingBalance: "$3,750,000",
    availableBalance: "$1,250,000",
    instruments: "Instruments", 
    counterpartyList: "CounterpartyList",
  },
  {
    id: "8",
    layoutName: "SCF 7 DASHBOARD",
    limitNode: "6500073_10/WCDL",
    outstandingBalance: "$2,100,000",
    availableBalance: "$2,900,000",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "9",
    layoutName: "SCF 3 Layout Demo",
    limitNode: "",
    outstandingBalance: "$1,320,000",
    availableBalance: "$3,680,000",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "10",
    layoutName: "Supply Chain Format 7",
    limitNode: "",
    outstandingBalance: "$4,200,000",
    availableBalance: "$800,000",
    instruments: "Instruments", 
    counterpartyList: "CounterpartyList",
  },
];

export const DataGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"instruments" | "counterparty">("instruments");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const itemsPerPage = 6;

  const handleInstrumentsClick = (layoutName: string) => {
    setSelectedItem(layoutName);
    setDialogType("instruments");
    setDialogOpen(true);
  };

  const handleCounterpartyClick = (layoutName: string) => {
    setSelectedItem(layoutName);
    setDialogType("counterparty");
    setDialogOpen(true);
  };

  // Sample data for approved instruments
  const approvedData = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: `approved-${i + 1}`,
      layoutName: `Approved Instrument ${i + 1}`,
      limitNode: `${Math.floor(Math.random() * 900000) + 100000}/APR`,
      outstandingBalance: `$${(Math.random() * 3000000 + 500000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      availableBalance: `$${(Math.random() * 2000000 + 500000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      instruments: "Details",
      counterpartyList: "Info",
    }));
  }, []);

  // Sample data for rejected instruments
  const rejectedData = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: `rejected-${i + 1}`,
      layoutName: `Rejected Instrument ${i + 1}`,
      limitNode: `${Math.floor(Math.random() * 900000) + 100000}/REJ`,
      outstandingBalance: `$${(Math.random() * 3000000 + 500000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      availableBalance: `$${(Math.random() * 2000000 + 500000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      instruments: "Details",
      counterpartyList: "Info",
    }));
  }, []);

  // Sample data for counterparty dialog
  const counterpartyData = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: `counterparty-${i + 1}`,
      layoutName: `Counterparty ${i + 1}`,
      limitNode: `${Math.floor(Math.random() * 900000) + 100000}/CPT`,
      outstandingBalance: `$${(Math.random() * 3000000 + 500000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      availableBalance: `$${(Math.random() * 2000000 + 500000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      instruments: "Details",
      counterpartyList: "Info",
    }));
  }, []);

  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      const matchesSearch = item.layoutName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.limitNode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = selectedFilter === "all" || 
                           (selectedFilter === "scf" && item.layoutName.toLowerCase().includes("supply chain")) ||
                           (selectedFilter === "dashboard" && item.layoutName.toLowerCase().includes("dashboard")) ||
                           (selectedFilter === "reliance" && item.layoutName.toLowerCase().includes("reliance"));
      
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const filterOptions = [
    { value: "all", label: "All Layouts" },
    { value: "scf", label: "Supply Chain" },
    { value: "dashboard", label: "Dashboard" },
    { value: "reliance", label: "Reliance" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search layouts..."
          />
          <FilterSelect
            value={selectedFilter}
            onChange={setSelectedFilter}
            options={filterOptions}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} records
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedData.map((item) => (
            <DataCard 
              key={item.id} 
              {...item} 
              onInstrumentsClick={() => handleInstrumentsClick(item.layoutName)}
              onCounterpartyClick={() => handleCounterpartyClick(item.layoutName)}
            />
          ))}
      </div>

      {paginatedData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No layouts found matching your criteria.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {dialogType === "instruments" ? "Instruments" : "Counterparty List"} - {selectedItem}
            </DialogTitle>
          </DialogHeader>
          
          {dialogType === "instruments" ? (
            <Tabs defaultValue="approved" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="approved" className="flex flex-col gap-3 mt-4">
                {approvedData.map((item) => (
                  <RowCard key={item.id} {...item} />
                ))}
              </TabsContent>
              <TabsContent value="rejected" className="flex flex-col gap-3 mt-4">
                {rejectedData.map((item) => (
                  <RowCard key={item.id} {...item} />
                ))}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {counterpartyData.map((item) => (
                <RowCard key={item.id} {...item} />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};