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
  { name: "SHUBHAM SUNIL MANKAR", rollNo: "110371", gender: "Male" },
  { name: "RAJESH KUMAR SHARMA", rollNo: "1103782", gender: "Male" },
  { name: "PRIYA PATEL", rollNo: "1103783", gender: "Female" },
  { name: "AMIT SINGH", rollNo: "1103784", gender: "Male" },
  { name: "SNEHA VERMA", rollNo: "1103785", gender: "Female" },
  { name: "RAHUL GUPTA", rollNo: "1103786", gender: "Male" },
  { name: "POOJA DESHPANDE", rollNo: "1103787", gender: "Female" },
  { name: "VIKAS MORE", rollNo: "1103788", gender: "Male" },
  { name: "ANJALI KULKARNI", rollNo: "1103789", gender: "Female" },
  { name: "KARTIK YADAV", rollNo: "11037810", gender: "Male" },
  { name: "NEHA JOSHI", rollNo: "11037811", gender: "Female" },
  { name: "ARJUN PATIL", rollNo: "11037812", gender: "Male" },
  // Extended to 12 for more entries
];

const detailedCandidates = [
  { 
    name: "SHUBHAM SUNIL MANKAR", 
    rollNo: "1103781", 
    fatherName: "SUNIL MANKAR", 
    motherName: "SUNITA MANKAR", 
    phone: "9763677201", 
    caste: "EWS", 
    gender: "Male", 
    dob: "24-02-2000" 
  },
  { 
    name: "RAJESH KUMAR SHARMA", 
    rollNo: "1103782", 
    fatherName: "KUMAR SHARMA", 
    motherName: "RADHA SHARMA", 
    phone: "9876543210", 
    caste: "OPEN", 
    gender: "Male", 
    dob: "15-06-1998" 
  },
  { 
    name: "PRIYA PATIL", 
    rollNo: "1103783", 
    fatherName: "RAMESH PATIL", 
    motherName: "SITA PATIL", 
    phone: "9123456789", 
    caste: "OBC", 
    gender: "Female", 
    dob: "10-09-1999" 
  },
  // Add more detailed entries as needed, matching the list above
  { 
    name: "AMIT SINGH", 
    rollNo: "1103784", 
    fatherName: "RAJ SINGH", 
    motherName: "MEERA SINGH", 
    phone: "9988776655", 
    caste: "OPEN", 
    gender: "Male", 
    dob: "05-03-1999" 
  },
  { 
    name: "SNEHA VERMA", 
    rollNo: "1103785", 
    fatherName: "ANIL VERMA", 
    motherName: "KAVITA VERMA", 
    phone: "8899001122", 
    caste: "OBC", 
    gender: "Female", 
    dob: "12-11-2000" 
  },
  { 
    name: "RAHUL GUPTA", 
    rollNo: "1103786", 
    fatherName: "MAHESH GUPTA", 
    motherName: "POONAM GUPTA", 
    phone: "7744556677", 
    caste: "EWS", 
    gender: "Male", 
    dob: "20-07-1998" 
  },
  { 
    name: "POOJA DESHPANDE", 
    rollNo: "1103787", 
    fatherName: "VIJAY DESHPANDE", 
    motherName: "LATA DESHPANDE", 
    phone: "6655443388", 
    caste: "OPEN", 
    gender: "Female", 
    dob: "18-04-1999" 
  },
  { 
    name: "VIKAS MORE", 
    rollNo: "1103788", 
    fatherName: "SANTOSH MORE", 
    motherName: "ANITA MORE", 
    phone: "5566778899", 
    caste: "OBC", 
    gender: "Male", 
    dob: "30-12-2000" 
  },
  { 
    name: "ANJALI KULKARNI", 
    rollNo: "1103789", 
    fatherName: "ROHIT KULKARNI", 
    motherName: "PRANALI KULKARNI", 
    phone: "4477889900", 
    caste: "OPEN", 
    gender: "Female", 
    dob: "08-08-1998" 
  },
  { 
    name: "KARTIK YADAV", 
    rollNo: "110378000000010", 
    fatherName: "SURESH YADAV", 
    motherName: "REKHA YADAV", 
    phone: "3388990011", 
    caste: "OBC", 
    gender: "Male", 
    dob: "22-01-1999" 
  },
  { 
    name: "NEHA JOSHI", 
    rollNo: "110378000000011", 
    fatherName: "NARENDRA JOSHI", 
    motherName: "SUNITA JOSHI", 
    phone: "2299001122", 
    caste: "EWS", 
    gender: "Female", 
    dob: "14-05-2000" 
  },
  { 
    name: "ARJUN PATIL", 
    rollNo: "110378000000012", 
    fatherName: "DINESH PATIL", 
    motherName: "VIDYA PATIL", 
    phone: "1100112233", 
    caste: "OPEN", 
    gender: "Male", 
    dob: "27-10-1999" 
  },
];

const Attendance = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAttendanceView, setShowAttendanceView] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // Biometrics states
  const [scanningHand, setScanningHand] = useState<"left" | "right" | null>(null);
  const [leftThumbScanned, setLeftThumbScanned] = useState(false);
  const [rightThumbScanned, setRightThumbScanned] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Filtered candidates for list
  const filteredCandidates = dummyCandidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.rollNo.includes(searchTerm)
  );

  const handleSearch = () => {
    if (!searchTerm) {
      toast.error("Please enter a Roll Number or Name");
      return;
    }
    
    const found = dummyCandidates.find(
      (c) =>
        c.rollNo.includes(searchTerm) || c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (found) {
      const detailed = detailedCandidates.find(dc => dc.rollNo === found.rollNo);
      setSelectedCandidate(detailed || found);
      setShowAttendanceView(true);
      toast.success(`Candidate found: ${found.name}`);
    } else {
      toast.error("Candidate not found");
    }
  };

  const handleSelectCandidate = (candidate) => {
    const detailed = detailedCandidates.find(dc => dc.rollNo === candidate.rollNo);
    setSelectedCandidate(detailed || candidate);
    setShowAttendanceView(true);
    toast.success(`Selected: ${candidate.name}`);
  };

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

  const resetToList = () => {
    setShowAttendanceView(false);
    setSelectedCandidate(null);
    setLeftThumbScanned(false);
    setRightThumbScanned(false);
    setSearchTerm("");
  };

  const allScanned = leftThumbScanned && rightThumbScanned;

  if (!showAttendanceView) {
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

        {/* Candidates List */}
        <div className="glass-card p-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl mb-6">
            <h3 className="text-lg font-semibold">Candidates List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="text-left py-3 px-4 text-sm font-semibold rounded-tl-xl">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Roll No</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Gender</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate, index) => (
                  <tr
                    key={candidate.rollNo}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-slate-50/50" : "bg-gray-50/50"
                    } hover:bg-slate-100/50 transition-colors`}
                  >
                    <td className="py-3 px-4 text-sm font-medium">{candidate.name}</td>
                    <td className="py-3 px-4 text-sm">{candidate.rollNo}</td>
                    <td className="py-3 px-4 text-sm">{candidate.gender}</td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        onClick={() => handleSelectCandidate(candidate)}
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                      >
                        Take Attendance
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCandidates.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No candidates found. Try a different search term.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Attendance View
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={resetToList}
          className="border-gray-300 text-gray-600"
        >
          ← Back to List
        </Button>
        <h2 className="text-xl font-semibold">Attendance for {selectedCandidate?.name}</h2>
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
