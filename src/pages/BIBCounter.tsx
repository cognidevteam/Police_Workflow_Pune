import { useState } from "react";
import { Search, Eye } from "lucide-react";
import CandidateDetailsCard from "@/components/CandidateDetailsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { generateBatchPDFHTML, printPDF } from "@/utils/pdfGenerator";

const candidates = [
  { slNo: 1, name: "Rajesh Kumar Singh", rollNo: "110378000000001", bibNo: "1234", gender: "Male" },
  { slNo: 2, name: "Priya Sharma", rollNo: "110378000000002", bibNo: "1235", gender: "Female" },
  { slNo: 3, name: "Amit Patel", rollNo: "110378000000003", bibNo: "1236", gender: "Male" },
  { slNo: 4, name: "Sneha Deshmukh", rollNo: "110378000000004", bibNo: "1237", gender: "Female" },
  { slNo: 5, name: "Vijay Jadhav", rollNo: "110378000000005", bibNo: "1238", gender: "Male" },
  { slNo: 6, name: "Pooja Mehta", rollNo: "110378000000006", bibNo: "1239", gender: "Female" },
  { slNo: 7, name: "Arjun Reddy", rollNo: "110378000000007", bibNo: "1240", gender: "Male" },
  { slNo: 8, name: "Kavita Rao", rollNo: "110378000000008", bibNo: "1241", gender: "Female" },
  { slNo: 9, name: "Rahul Gupta", rollNo: "110378000000009", bibNo: "1242", gender: "Male" },
  { slNo: 10, name: "Anjali Verma", rollNo: "110378000000010", bibNo: "1243", gender: "Female" },
];

const BIBCounter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [showDownload, setShowDownload] = useState(false);

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.rollNo.includes(searchTerm)
  );

  const handleGeneratePDF = () => {
    if (!selectedBatch) {
      toast.error("Please select a batch type first!");
      return;
    }
    setShowDownload(true);
    toast.success("PDF generated successfully! Click Download to save.");
  };

  const handleDownloadPDF = () => {
    if (!selectedBatch) return;

    const batchType = selectedBatch === "shotput" ? "shotput" : "running";
    const eventName = selectedBatch === "1600m" ? "1600m Running" : 
                     selectedBatch === "100m" ? "100m Running" : 
                     "Shot Put";

    const pdfHTML = generateBatchPDFHTML(batchType, eventName, filteredCandidates);
    printPDF(pdfHTML, `Batch_${eventName.replace(/\s+/g, '_')}.pdf`);
    toast.success("Opening PDF for download...");
  };

  return (
    <div className="space-y-6">
      <CandidateDetailsCard />

      <div className="glass-card p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Enter Roll Number or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="glass-input w-[250px]">
              <SelectValue placeholder="Select Batch Type" />
            </SelectTrigger>
            <SelectContent className="glass-card bg-white/95 backdrop-blur-xl">
              <SelectItem value="1600m">1600m Running</SelectItem>
              <SelectItem value="100m">100m Running</SelectItem>
              <SelectItem value="shotput">Shot Put</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleGeneratePDF} 
            className="gradient-hero text-white"
            disabled={!selectedBatch}
          >
            Generate PDF
          </Button>

          {showDownload && (
            <Button onClick={handleDownloadPDF} className="gradient-success text-white">
              Download PDF
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold rounded-tl-xl">Sl No</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Roll No</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">BIB No</th>
                <th className="text-center py-3 px-4 text-sm font-semibold rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate, index) => (
                <tr
                  key={candidate.slNo}
                  className={`border-b border-white/20 ${
                    index % 2 === 0 ? "bg-white/30" : "bg-sky-50/30"
                  } hover:bg-white/50 transition-colors`}
                >
                  <td className="py-3 px-4 text-sm">{candidate.slNo}</td>
                  <td className="py-3 px-4 text-sm font-medium">{candidate.name}</td>
                  <td className="py-3 px-4 text-sm">{candidate.rollNo}</td>
                  <td className="py-3 px-4 text-sm font-semibold">{candidate.bibNo}</td>
                  <td className="py-3 px-4 text-center">
                    <Button size="sm" className="gradient-hero text-white px-4">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BIBCounter;
