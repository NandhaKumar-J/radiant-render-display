import { DataGrid } from "@/components/DataGrid";

const Overview = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Overview</h2>
        <p className="text-muted-foreground">
          Manage and view your supply chain formats and dashboard layouts
        </p>
      </div>
      <DataGrid />
    </div>
  );
};

export default Overview;
