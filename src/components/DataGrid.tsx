import { useState, useMemo } from "react";
import { DataCard } from "./DataCard";
import { SearchBar } from "./SearchBar";
import { FilterSelect } from "./FilterSelect";
import { Pagination } from "./Pagination";

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
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "2", 
    layoutName: "Supply Chain Format 6",
    limitNode: "456788/IVD",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "3",
    layoutName: "Supply Chain Format 5",
    limitNode: "4",
    instruments: "Instruments", 
    counterpartyList: "CounterpartyList",
  },
  {
    id: "4",
    layoutName: "DASHBOARD TESTING1",
    limitNode: "6500073_10/WCDL",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList", 
  },
  {
    id: "5",
    layoutName: "Reliance SCF3",
    limitNode: "6500073_10/WCDL",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "6",
    layoutName: "Supply Chain Format 7", 
    limitNode: "GHTY/YUUU",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "7",
    layoutName: "SCF 6 BUNCHING WITH TENOR FIELD",
    limitNode: "6500073_10/WCDL",
    instruments: "Instruments", 
    counterpartyList: "CounterpartyList",
  },
  {
    id: "8",
    layoutName: "SCF 7 DASHBOARD",
    limitNode: "6500073_10/WCDL", 
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "9",
    layoutName: "SCF 3 Layout Demo",
    limitNode: "",
    instruments: "Instruments",
    counterpartyList: "CounterpartyList",
  },
  {
    id: "10",
    layoutName: "Supply Chain Format 7",
    limitNode: "",
    instruments: "Instruments", 
    counterpartyList: "CounterpartyList",
  },
];

export const DataGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
          <DataCard key={item.id} {...item} />
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
    </div>
  );
};