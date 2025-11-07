import { useState } from "react";
import { Edit, CheckCircle, XCircle, Search, Download } from "lucide-react";
import CandidateDetailsCard from "@/components/CandidateDetailsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { generatePSTReportPDFHTML, printPDF } from "@/utils/pdfGenerator";

const dummyCandidates = [
  { name: "SHUBHAM SUNIL MANKAR", rollNo: "110378000000001", fatherName: "SUNIL MANKAR", motherName: "SUNITA MANKAR", phone: "9763677201", caste: "EWS", gender: "Male", dob: "24-02-2000" },
  { name: "RAJESH KUMAR SHARMA", rollNo: "110378000000002", fatherName: "KUMAR SHARMA", motherName: "RADHA SHARMA", phone: "9876543210", caste: "OPEN", gender: "Male", dob: "15-06-1998" },
  { name: "PRIYA PATEL", rollNo: "110378000000003", fatherName: "RAMESH PATEL", motherName: "SITA PATEL", phone: "9123456789", caste: "OBC", gender: "Female", dob: "10-09-1999" },
];

const PSTEntry = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(dummyCandidates[0]);
  const [showModal, setShowModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [height, setHeight] = useState("");
  const [chestNormal, setChestNormal] = useState("");
  const [chestExpanded, setChestExpanded] = useState("");
  const [pstData, setPstData] = useState({ height: "--", chestNormal: "--", chestExpanded: "--" });
  const [passed, setPassed] = useState(false);
  const [errors, setErrors] = useState({ height: "", chestNormal: "", chestDiff: "" });
  const [pstSubmitted, setPstSubmitted] = useState(false);

  const handleSearch = () => {
    if (!searchTerm) {
      toast.error("Please enter a Roll Number or Name");
      return;
    }
    
    const found = dummyCandidates.find(
      c => c.rollNo.includes(searchTerm) || c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (found) {
      setSelectedCandidate(found);
      toast.success(`Candidate found: ${found.name}`);
    } else {
      toast.error("Candidate not found");
    }
  };

  const handleCheckHeight = () => {
    const heightValue = parseFloat(height);
    if (heightValue < 162.5) {
      setErrors(prev => ({ ...prev, height: "Height must be at least 162.5 cm" }));
    } else {
      setErrors(prev => ({ ...prev, height: "" }));
    }
  };

  const validateChestNormal = (value: string) => {
    const chestValue = parseFloat(value);
    if (chestValue < 79) {
      setErrors(prev => ({ ...prev, chestNormal: "Chest (Normal) must be at least 79 cm" }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, chestNormal: "" }));
      return true;
    }
  };

  const calculateChestDiff = () => {
    if (chestNormal && chestExpanded) {
      const diff = parseFloat(chestExpanded) - parseFloat(chestNormal);
      if (diff < 5) {
        setErrors(prev => ({ ...prev, chestDiff: "Chest difference must be at least 5 cm" }));
        return diff;
      } else {
        setErrors(prev => ({ ...prev, chestDiff: "" }));
        return diff;
      }
    }
    return 0;
  };

  const handleSubmit = () => {
    if (!height || !chestNormal || !chestExpanded) {
      toast.error("Please fill all PST measurements");
      return;
    }

    const heightValue = parseFloat(height);
    const chestNormalValue = parseFloat(chestNormal);
    const chestDiff = calculateChestDiff();

    if (isNaN(heightValue) || isNaN(chestNormalValue) || isNaN(chestDiff)) {
      toast.error("Please enter valid numeric values");
      return;
    }

    const heightPass = heightValue >= 162.5;
    const chestPass = chestNormalValue >= 79;
    const diffPass = chestDiff >= 5;

    setPassed(heightPass && chestPass && diffPass);
    setPstData({
      height: height,
      chestNormal: chestNormal,
      chestExpanded: chestExpanded,
    });
    setPstSubmitted(true);
    setShowModal(false);
    setShowResult(true);
  };

  const handleDownloadReport = () => {
    const reportData = {
      height: pstData.height,
      chestNormal: pstData.chestNormal,
      chestExpanded: pstData.chestExpanded,
      chestDiff: (parseFloat(pstData.chestExpanded) - parseFloat(pstData.chestNormal)).toFixed(2),
      passed: passed,
      candidateName: selectedCandidate.name,
      rollNo: selectedCandidate.rollNo
    };
    const pdfHTML = generatePSTReportPDFHTML(reportData);
    printPDF(pdfHTML, `PST_Report_${selectedCandidate.rollNo}.pdf`);
  };

  const chestDiff = chestNormal && chestExpanded ? parseFloat(chestExpanded) - parseFloat(chestNormal) : 0;

  return (
    <div className="space-y-6">
      <div className="glass-card p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Enter Roll Number or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="glass-input pl-10"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <CandidateDetailsCard 
        name={selectedCandidate.name}
        rollNumber={selectedCandidate.rollNo}
        applicationNumber={selectedCandidate.rollNo}
        fatherName={selectedCandidate.fatherName}
        motherName={selectedCandidate.motherName}
        phone={selectedCandidate.phone}
        caste={selectedCandidate.caste}
        gender={selectedCandidate.gender}
        dob={selectedCandidate.dob}
      />

      <div className="glass-card p-6">
        <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl mb-6">
          <h3 className="text-lg font-semibold">Physical Standard Test Data (PST)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/30">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">TYPE</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">VALUE</th>
                
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/20 hover:bg-white/30 transition-colors">
                <td className="py-4 px-4 text-sm">Height in Centimeters (cm)</td>
                <td className="py-4 px-4 text-sm font-semibold">{pstData.height}</td>
                
              </tr>
              <tr className="border-b border-white/20 hover:bg-white/30 transition-colors">
                <td className="py-4 px-4 text-sm">Chest (Normal) in Centimeters (cm)</td>
                <td className="py-4 px-4 text-sm font-semibold">{pstData.chestNormal}</td>
                
              </tr>
              <tr className="hover:bg-white/30 transition-colors">
                <td className="py-4 px-4 text-sm">Chest (Expand) in Centimeters (cm)</td>
                <td className="py-4 px-4 text-sm font-semibold">{pstData.chestExpanded}</td>
                
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            onClick={() => setShowModal(true)}
            variant="outline"
            className="glass-button"
          >
            <Edit className="w-4 h-4 mr-2" />
            Manual PST
          </Button>
          {pstSubmitted && (
            <Button 
              onClick={() => setShowResult(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90"
            >
              View Report
            </Button>
          )}
        </div>
      </div>

      {/* PST Entry Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-xl max-w-lg">
          <DialogHeader>
            <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 -mt-6 -mx-6 rounded-t-xl">
              <DialogTitle>PST Entry</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="height">Height</Label>
              <div className="flex gap-2">
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="glass-input"
                  placeholder="Enter height in cm"
                />
                <Button onClick={handleCheckHeight} className="gradient-success text-white">
                  Check Height
                </Button>
              </div>
              {errors.height && <p className="text-destructive text-sm mt-1">{errors.height}</p>}
            </div>

            <div>
              <Label htmlFor="chestNormal">Chest Normal</Label>
              <Input
                id="chestNormal"
                type="number"
                value={chestNormal}
                onChange={(e) => {
                  setChestNormal(e.target.value);
                  validateChestNormal(e.target.value);
                }}
                className="glass-input"
                placeholder="Enter Chest Normal"
              />
              {errors.chestNormal && <p className="text-destructive text-sm mt-1">{errors.chestNormal}</p>}
            </div>

            <div>
              <Label htmlFor="chestExpanded">Chest Expanded</Label>
              <Input
                id="chestExpanded"
                type="number"
                value={chestExpanded}
                onChange={(e) => {
                  setChestExpanded(e.target.value);
                  calculateChestDiff();
                }}
                className="glass-input"
                placeholder="Enter Chest Expanded"
              />
            </div>

            <div>
              <Label>Chest Difference in Centimeters (cm)</Label>
              <Input
                type="text"
                value={chestDiff > 0 ? chestDiff.toFixed(2) : ""}
                readOnly
                className={`glass-input ${chestDiff >= 5 ? "border-success" : chestDiff > 0 ? "border-destructive" : ""}`}
                placeholder="Chest Difference in Centimeters (cm)"
              />
              {errors.chestDiff && <p className="text-destructive text-sm mt-1">{errors.chestDiff}</p>}
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white"
            >
              SUBMIT PST DATA
            </Button>

            <Button
              onClick={() => setShowModal(false)}
              variant="outline"
              className="w-full glass-button"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Result Modal */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className={`max-w-md ${passed ? "bg-green-50" : "bg-red-50"} backdrop-blur-2xl border-2 ${passed ? "border-green-300" : "border-red-300"} shadow-xl`}>
          <div className="text-center space-y-4">
            {passed ? (
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            ) : (
              <XCircle className="w-16 h-16 text-red-600 mx-auto" />
            )}
            <h3 className={`text-2xl font-bold ${passed ? "text-green-700" : "text-red-700"}`}>
              Candidate has {passed ? "PASSED" : "FAILED"}
            </h3>
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span>Height ≥ 162.5 cm:</span>
                <span className={parseFloat(pstData.height) >= 162.5 ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                  {parseFloat(pstData.height) >= 162.5 ? "✓" : "✗"} {pstData.height} cm
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Chest (Normal) ≥ 79 cm:</span>
                <span className={parseFloat(pstData.chestNormal) >= 79 ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                  {parseFloat(pstData.chestNormal) >= 79 ? "✓" : "✗"} {pstData.chestNormal} cm
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Chest Diff ≥ 5 cm:</span>
                <span className={chestDiff >= 5 ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                  {chestDiff >= 5 ? "✓" : "✗"} {chestDiff.toFixed(2)} cm
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownloadReport} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button onClick={() => setShowResult(false)} variant="outline" className="flex-1 glass-button">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PSTEntry;
