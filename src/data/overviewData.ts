export interface InstrumentData {
  id: string;
  uploadRef: string;
  uploadDate: string;
  instrumentNumber: string;
  instrumentDate: string;
  instrumentAmount: string;
  instrumentDueDate: string;
  loanMaturityDate: string;
  counterpartyCode: string;
  transactionReferenceId: string;
  transactionStatus: string;
  transactionRemarks: string;
}

export interface CounterpartyData {
  id: string;
  layoutName: string;
  counterpartyCrn: string;
  nameOfCountry: string;
  counterpartyCode: string;
  limitNode: string;
  outstandingBalance: string;
  availableBalance: string;
}

export interface OverviewCardData {
  id: string;
  layoutName: string;
  limitNode: string;
  outstandingBalance: string;
  availableBalance: string;
}

// Sample overview cards
export const overviewCardsData: OverviewCardData[] = [
  {
    id: "1",
    layoutName: "Supply Chain Format 6",
    limitNode: "456788/IVD",
    outstandingBalance: "$2,450,000",
    availableBalance: "$1,550,000",
  },
  {
    id: "2", 
    layoutName: "Supply Chain Format 6",
    limitNode: "456788/IVD",
    outstandingBalance: "$3,200,000",
    availableBalance: "$800,000",
  },
  {
    id: "3",
    layoutName: "Supply Chain Format 5",
    limitNode: "4",
    outstandingBalance: "$875,000",
    availableBalance: "$4,125,000",
  },
  {
    id: "4",
    layoutName: "DASHBOARD TESTING1",
    limitNode: "6500073_10/WCDL",
    outstandingBalance: "$1,650,000",
    availableBalance: "$2,350,000",
  },
  {
    id: "5",
    layoutName: "Reliance SCF3",
    limitNode: "6500073_10/WCDL",
    outstandingBalance: "$5,200,000",
    availableBalance: "$800,000",
  },
  {
    id: "6",
    layoutName: "Supply Chain Format 7", 
    limitNode: "GHTY/YUUU",
    outstandingBalance: "$950,000",
    availableBalance: "$3,050,000",
  },
  {
    id: "7",
    layoutName: "SCF 6 BUNCHING WITH TENOR FIELD",
    limitNode: "6500073_10/WCDL",
    outstandingBalance: "$3,750,000",
    availableBalance: "$1,250,000",
  },
  {
    id: "8",
    layoutName: "SCF 7 DASHBOARD",
    limitNode: "6500073_10/WCDL",
    outstandingBalance: "$2,100,000",
    availableBalance: "$2,900,000",
  },
  {
    id: "9",
    layoutName: "SCF 3 Layout Demo",
    limitNode: "",
    outstandingBalance: "$1,320,000",
    availableBalance: "$3,680,000",
  },
  {
    id: "10",
    layoutName: "Supply Chain Format 7",
    limitNode: "",
    outstandingBalance: "$4,200,000",
    availableBalance: "$800,000",
  },
];

// Generate sample instruments data
const statuses = ["lapsed", "rejected", "failed", "aborted", "completed", "pending"];
const counterpartyCodes = ["CP001", "CP002", "CP003", "CP004", "CP005"];

export const generateInstrumentsData = (count: number, status: "approved" | "rejected"): InstrumentData[] => {
  return Array.from({ length: count }, (_, i) => {
    const uploadDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const instrumentDate = new Date(uploadDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    const dueDate = new Date(instrumentDate.getTime() + (Math.random() * 90 + 30) * 24 * 60 * 60 * 1000);
    const maturityDate = new Date(dueDate.getTime() + Math.random() * 60 * 24 * 60 * 60 * 1000);
    
    return {
      id: `${status}-inst-${i + 1}`,
      uploadRef: `UPL-${status.toUpperCase()}-${String(i + 1).padStart(5, '0')}`,
      uploadDate: uploadDate.toISOString().split('T')[0],
      instrumentNumber: `INS-${Math.floor(Math.random() * 900000) + 100000}`,
      instrumentDate: instrumentDate.toISOString().split('T')[0],
      instrumentAmount: `$${(Math.random() * 500000 + 50000).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      instrumentDueDate: dueDate.toISOString().split('T')[0],
      loanMaturityDate: maturityDate.toISOString().split('T')[0],
      counterpartyCode: counterpartyCodes[Math.floor(Math.random() * counterpartyCodes.length)],
      transactionReferenceId: `TXN-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      transactionStatus: statuses[Math.floor(Math.random() * statuses.length)],
      transactionRemarks: `Transaction ${status === "approved" ? "processed successfully" : "needs review"} - ${i + 1}`,
    };
  });
};

// Generate approved and rejected instruments
export const approvedInstruments = generateInstrumentsData(25, "approved");
export const rejectedInstruments = generateInstrumentsData(20, "rejected");

// Generate sample counterparty data
export const counterpartyListData: CounterpartyData[] = Array.from({ length: 30 }, (_, i) => ({
  id: `cp-${i + 1}`,
  layoutName: `Counterparty Layout ${i + 1}`,
  counterpartyCrn: `CRN-${String(i + 1).padStart(6, '0')}`,
  nameOfCountry: ["USA", "UK", "Germany", "France", "Japan", "Singapore", "UAE", "India"][Math.floor(Math.random() * 8)],
  counterpartyCode: `CP${String(i + 1).padStart(3, '0')}`,
  limitNode: `${Math.floor(Math.random() * 900000) + 100000}/LMT`,
  outstandingBalance: `$${(Math.random() * 3000000 + 500000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
  availableBalance: `$${(Math.random() * 2000000 + 500000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
}));
