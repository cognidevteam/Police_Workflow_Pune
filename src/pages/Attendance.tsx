import { useState } from "react";
import { Search, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const dummyCandidates = [
  { name: "SHUBHAM SUNIL MANKAR", rollNo: "110378000000001", fatherName: "SUNIL MANKAR", motherName: "SUNITA MANKAR", phone: "9763677201", caste: "EWS", gender: "Male", dob: "24-02-2000" },
  { name: "RAJESH KUMAR SHARMA", rollNo: "110378000000002", fatherName: "KUMAR SHARMA", motherName: "RADHA SHARMA", phone: "9876543210", caste: "OPEN", gender: "Male", dob: "15-06-1998" },
  { name: "PRIYA PATEL", rollNo: "110378000000003", fatherName: "RAMESH PATEL", motherName: "SITA PATEL", phone: "9123456789", caste: "OBC", gender: "Female", dob: "10-09-1999" },
];

const Attendance = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(dummyCandidates[0]);
  const [showScanner, setShowScanner] = useState(false);

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
  const [scanningHand, setScanningHand] = useState<"left" | "right" | null>(null);
  const [leftThumbScanned, setLeftThumbScanned] = useState(false);
  const [rightThumbScanned, setRightThumbScanned] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleScan = (hand: "left" | "right") => {
    setScanningHand(hand);
    setShowScanner(true);
    setIsCapturing(true);
    
    setTimeout(() => {
      setIsCapturing(false);
      setTimeout(() => {
        setShowScanner(false);
        if (hand === "left") {
          setLeftThumbScanned(true);
        } else {
          setRightThumbScanned(true);
        }
        toast.success(`${hand === "left" ? "Left" : "Right"} thumb scanned successfully!`);
      }, 500);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!leftThumbScanned || !rightThumbScanned) {
      toast.error("Please scan both thumbs before submitting");
      return;
    }

    toast.success("Attendance taken successfully!");
    
    setTimeout(() => {
      navigate("/dashboard/pst");
    }, 1500);
  };

  const allScanned = leftThumbScanned && rightThumbScanned;

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
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Biometrics</h3>
          <div className="flex gap-2 text-sm">
            <span>Action</span>
            <span>|</span>
            <span>View</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4 border-2 border-white/30">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Left Hand</Label>
                  {leftThumbScanned && (
                    <span className="text-green-600 font-semibold text-sm">✓ Scanned</span>
                  )}
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Thumb</span>
                  <Button
                    onClick={() => handleScan("left")}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    disabled={leftThumbScanned}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {leftThumbScanned ? "Scanned" : "Scan Now"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 border-2 border-white/30">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Right Hand</Label>
                  {rightThumbScanned && (
                    <span className="text-green-600 font-semibold text-sm">✓ Scanned</span>
                  )}
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Thumb</span>
                  <Button
                    onClick={() => handleScan("right")}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    disabled={rightThumbScanned}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {rightThumbScanned ? "Scanned" : "Scan Now"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {allScanned && (
            <Button
              onClick={handleSubmit}
              className="w-full gradient-success text-white font-semibold text-lg py-6"
            >
              SUBMIT ATTENDANCE
            </Button>
          )}
        </div>
      </div>

      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-blue-500 shadow-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-center text-xl">
              {scanningHand === "left" ? "Left" : "Right"} Hand Thumb Scan
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="relative">
              <div className="w-48 h-48 bg-black rounded-lg flex items-center justify-center overflow-hidden border-4 border-blue-400">
                {isCapturing ? (
                  <div className="space-y-2 text-center">
                    <Camera className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
                    <p className="text-blue-300 font-semibold animate-pulse">Capturing...</p>
                  </div>
                ) : (
                  <div className="text-green-400 text-center">
                    <div className="text-6xl mb-2">✓</div>
                    <p className="font-semibold">Captured!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Attendance;
