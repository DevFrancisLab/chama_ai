import { Button } from "@/components/ui/button";
import { Plus, DollarSign, FileText, Bell } from "lucide-react";

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-card/50 rounded-xl p-6 border border-border/30 shadow-soft">
      <Button className="h-auto py-4 flex flex-col gap-2 bg-gradient-to-br from-primary to-primary-dark hover:shadow-soft transition-all">
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Contribution</span>
      </Button>
      
      <Button className="h-auto py-4 flex flex-col gap-2 bg-gradient-to-br from-secondary to-secondary-light hover:shadow-soft transition-all text-white">
        <DollarSign className="w-5 h-5" />
        <span className="font-medium">Issue Loan</span>
      </Button>
      
      <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-colors">
        <FileText className="w-5 h-5" />
        <span className="font-medium">View Report</span>
      </Button>
      
      <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-2 border-accent/30 hover:border-accent hover:bg-accent/5 transition-colors">
        <Bell className="w-5 h-5" />
        <span className="font-medium">Send Reminder</span>
      </Button>
    </div>
  );
}
