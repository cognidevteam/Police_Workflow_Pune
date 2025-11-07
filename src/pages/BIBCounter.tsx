import { useState } from "react";
import { Search } from "lucide-react";
import CandidateDetailsCard from "@/components/CandidateDetailsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { generateComprehensiveBatchPDFHTML, printPDF } from "@/utils/pdfGenerator";

const dummyCandidates = [
  { slNo: 1, name: "SHUBHAM SUNIL MANKAR", rollNo: "110378000000001", gender: "Male", chestNo: "40072", bibNo: "1234" },
  { slNo: 2, name: "RAJESH KUMAR SHARMA", rollNo: "110378000000002", gender: "Male", chestNo: "40073", bibNo: "1235" },
  { slNo: 3, name: "PRIYA PATEL", rollNo: "110378000000003", gender: "Female", chestNo: "40074", bibNo: "1236" },
  { slNo: 4, name: "AMIT SINGH", rollNo: "110378000000004", gender: "Male", chestNo: "40075", bibNo: "1237" },
  { slNo: 5, name: "SNEHA GUPTA", rollNo: "110378000000005", gender: "Female", chestNo: "40076", bibNo: "1238" },
  { slNo: 6, name: "VIKRAM RAO", rollNo: "110378000000006", gender: "Male", chestNo: "40077", bibNo: "1239" },
  { slNo: 7, name: "POOJA DESAI", rollNo: "110378000000007", gender: "Female", chestNo: "40078", bibNo: "1240" },
  { slNo: 8, name: "RAJESH KUMAR", rollNo: "110378000000008", gender: "Male", chestNo: "40079", bibNo: "1241" },
  { slNo: 9, name: "KAVITA MEHTA", rollNo: "110378000000009", gender: "Female", chestNo: "40080", bibNo: "1242" },
  { slNo: 10, name: "SURESH REDDY", rollNo: "110378000000010", gender: "Male", chestNo: "40081", bibNo: "1243" },
  { slNo: 11, name: "ANITA JOSHI", rollNo: "110378000000011", gender: "Female", chestNo: "40082", bibNo: "1244" },
  { slNo: 12, name: "MANOJ VERMA", rollNo: "110378000000012", gender: "Male", chestNo: "40083", bibNo: "1245" },
  { slNo: 13, name: "DEEPA NAIR", rollNo: "110378000000013", gender: "Female", chestNo: "40084", bibNo: "1246" },
  { slNo: 14, name: "ARUN PILLAI", rollNo: "110378000000014", gender: "Male", chestNo: "40085", bibNo: "1247" },
  { slNo: 15, name: "RITU AGARWAL", rollNo: "110378000000015", gender: "Female", chestNo: "40086", bibNo: "1248" },
  { slNo: 16, name: "SANDEEP YADAV", rollNo: "110378000000016", gender: "Male", chestNo: "40087", bibNo: "1249" },
  { slNo: 17, name: "NEHA KAPOOR", rollNo: "110378000000017", gender: "Female", chestNo: "40088", bibNo: "1250" },
  { slNo: 18, name: "KIRAN BHAT", rollNo: "110378000000018", gender: "Male", chestNo: "40089", bibNo: "1251" },
  { slNo: 19, name: "MOHIT SAXENA", rollNo: "110378000000019", gender: "Male", chestNo: "40090", bibNo: "1252" },
  { slNo: 20, name: "SWATI KULKARNI", rollNo: "110378000000020", gender: "Female", chestNo: "40091", bibNo: "1253" },
];

const BIBCounter = () => {
  const [batchNumber, setBatchNumber] = useState("");
  const [status, setStatus] = useState("");
  const [totalCandidates, setTotalCandidates] = useState<number | null>(null);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearch = () => {
    if (!batchNumber) {
      toast.error("Please enter a batch number");
      return;
    }
    
    setSearchClicked(true);
    setTotalCandidates(20);
    setStatus("Active");
    toast.success(`Batch ${batchNumber} loaded successfully`);
  };

  const handleGeneratePDF = () => {
    if (!searchClicked) {
      toast.error("Please search for a batch first!");
      return;
    }

    const pdfHTML = generateComprehensiveBatchPDFHTML(batchNumber, dummyCandidates);
    printPDF(pdfHTML, `Comprehensive_Batch_${batchNumber}.pdf`);
    toast.success("Opening comprehensive batch PDF...");
  };

  return (
    <div className="space-y-6">
      <CandidateDetailsCard />

      <div className="glass-card p-6">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl mb-6">
          <h3 className="text-lg font-semibold">BIB Counter</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="batchNumber">Batch Number</Label>
              <Input
                id="batchNumber"
                placeholder="Enter Batch Number"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="glass-input"
              />
            </div>
            
            <div>
              <Label>Status</Label>
              <div className="glass-input h-10 flex items-center px-3 bg-muted text-foreground">
                {status || "--"}
              </div>
            </div>

            <div>
              <Label>Total Candidates</Label>
              <div className="glass-input h-10 flex items-center px-3 bg-muted text-foreground font-semibold">
                {totalCandidates !== null ? totalCandidates : "--"}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>

            {searchClicked && (
              <Button 
                onClick={handleGeneratePDF}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              >
                Generate PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BIBCounter;
