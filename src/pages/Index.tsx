import { DataGrid } from "@/components/DataGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Layout Management
          </h1>
          <p className="text-muted-foreground">
            Manage and view your supply chain formats and dashboard layouts
          </p>
        </div>
        
        <DataGrid />
      </div>
    </div>
  );
};

export default Index;
