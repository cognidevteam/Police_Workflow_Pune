import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const candidatesData = [
  { slNo: 1, name: "Suresh Patil", rollNo: "110378000000011", gender: "Male", chestNo: "40072", bibNo: "1244" },
  { slNo: 2, name: "Meera Kulkarni", rollNo: "110378000000012", gender: "Female", chestNo: "40073", bibNo: "1245" },
  { slNo: 3, name: "Deepak Joshi", rollNo: "110378000000013", gender: "Male", chestNo: "40074", bibNo: "1246" },
  { slNo: 4, name: "Shruti Desai", rollNo: "110378000000014", gender: "Female", chestNo: "40075", bibNo: "1247" },
  { slNo: 5, name: "Karan Singh", rollNo: "110378000000015", gender: "Male", chestNo: "40076", bibNo: "1248" },
  { slNo: 6, name: "Nikita Pawar", rollNo: "110378000000016", gender: "Female", chestNo: "40077", bibNo: "1249" },
  { slNo: 7, name: "Aditya More", rollNo: "110378000000017", gender: "Male", chestNo: "40078", bibNo: "1250" },
  { slNo: 8, name: "Riya Bhosale", rollNo: "110378000000018", gender: "Female", chestNo: "40079", bibNo: "1251" },
  { slNo: 9, name: "Vishal Kamble", rollNo: "110378000000019", gender: "Male", chestNo: "40080", bibNo: "1252" },
  { slNo: 10, name: "Anita Gaikwad", rollNo: "110378000000020", gender: "Female", chestNo: "40081", bibNo: "1253" },
  { slNo: 11, name: "Raajan Mahanarsimha Yadav", rollNo: "1103780223000020", gender: "Male", chestNo: "40082", bibNo: "1223" },
  { slNo: 12, name: "Nutraajan Abhishek Kumar", rollNo: "110378000000021", gender: "Male", chestNo: "40083", bibNo: "1254" },
  { slNo: 13, name: "Raajhans Verma", rollNo: "110378000000022", gender: "Male", chestNo: "40084", bibNo: "1255" },
  { slNo: 14, name: "Priya Raajput", rollNo: "110378000000023", gender: "Female", chestNo: "40085", bibNo: "1256" },
  { slNo: 15, name: "Abhishek Joshi", rollNo: "110378000000024", gender: "Male", chestNo: "40086", bibNo: "1257" },
];

// Format running time as HH:MM:SS (6 digits total)
const formatRunningTime = (value: string): string => {
  const digits = value.replace(/\D/g, ''); // Remove all non-digits
  
  if (digits.length === 0) return '';
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}:${digits.slice(4, 6)}`; // HH:MM:SS
};

// Format total lapse as 2 digits only
const formatTotalLapse = (value: string): string => {
  const digits = value.replace(/\D/g, ''); // Remove all non-digits
  return digits.slice(0, 2); // Maximum 2 digits
};

// Format shot put attempt as numeric with decimal (max 2 digits before ., 1 after)
const formatAttempt = (value: string): string => {
  let cleaned = value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) cleaned = parts[0] + '.' + parts.slice(1).join('');
  if (parts[0].length > 2) parts[0] = parts[0].slice(0, 2);
  if (parts[1] && parts[1].length > 1) parts[1] = parts[1].slice(0, 1);
  return parts.join('.');
};

const DataEntry = () => {
  // States for 1600m Running
  const [runningTimes1600, setRunningTimes1600] = useState<Record<number, string>>({});
  const [totalLapses1600, setTotalLapses1600] = useState<Record<number, string>>({});
  
  // States for Shot Put
  const [attempt1, setAttempt1] = useState<Record<number, string>>({});
  const [attempt2, setAttempt2] = useState<Record<number, string>>({});
  const [attempt3, setAttempt3] = useState<Record<number, string>>({});
  
  // States for 100m Running
  const [runningTimes100m, setRunningTimes100m] = useState<Record<number, string>>({});
  
  // States for Marks (preview-only)
  const [marks1600, setMarks1600] = useState<Record<number, number>>({});
  const [marksShotPut, setMarksShotPut] = useState<Record<number, number>>({});
  const [marks100m, setMarks100m] = useState<Record<number, number>>({});
  
  // Control states
  const [showViewPreview, setShowViewPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    // Simple validation: check if any data entered
    const hasData = Object.values(runningTimes1600).some(val => val) || 
                    Object.values(attempt1).some(val => val) || 
                    Object.values(runningTimes100m).some(val => val);
    if (!hasData) {
      toast.error("Please enter some data before submitting.");
      return;
    }
    setShowViewPreview(true);
    setShowModal(true);
    toast.success("✅ Data Submitted Successfully", {
      description: "Preview modal opened. You can view or regenerate the preview.",
    });
  };

  const handleViewPreview = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Generate Dummy Data
  const generateDummyData = () => {
    const newRunningTimes1600: Record<number, string> = {};
    const newTotalLapses1600: Record<number, string> = {};
    const newAttempt1: Record<number, string> = {};
    const newAttempt2: Record<number, string> = {};
    const newAttempt3: Record<number, string> = {};
    const newRunningTimes100m: Record<number, string> = {};
    const newMarks1600: Record<number, number> = {};
    const newMarksShotPut: Record<number, number> = {};
    const newMarks100m: Record<number, number> = {};

    candidatesData.forEach((candidate) => {
      const slNo = candidate.slNo;
      
      // 1600m Running: Random time 04:00:00 to 07:00:00 approx
      const digits1600 = Math.floor(Math.random() * 300000) + 400000; // 400000-699999 for 04-06 mins
      newRunningTimes1600[slNo] = formatRunningTime(digits1600.toString());
      newTotalLapses1600[slNo] = formatTotalLapse((Math.floor(Math.random() * 99) + 1).toString());
      newMarks1600[slNo] = Math.floor(Math.random() * 100) + 1;
      
      // Shot Put: Random attempts 7.0 to 12.9
      const baseDist = Math.floor(Math.random() * 6) + 7; // 7-12
      const decimal1 = Math.floor(Math.random() * 10);
      const decimal2 = Math.floor(Math.random() * 10);
      const decimal3 = Math.floor(Math.random() * 10);
      newAttempt1[slNo] = `${baseDist}.${decimal1}`;
      newAttempt2[slNo] = `${baseDist + Math.floor(Math.random() * 3) - 1}.${decimal2}`; // Vary slightly
      newAttempt3[slNo] = `${baseDist + Math.floor(Math.random() * 2) - 1}.${decimal3}`;
      newMarksShotPut[slNo] = Math.floor(Math.random() * 100) + 1;
      
      // 100m Running: Random time 00:10:00 to 00:15:00 approx
      const digits100m = Math.floor(Math.random() * 50000) + 100000; // 10000-14999 seconds, but formatted to 00:10:00+
      newRunningTimes100m[slNo] = formatRunningTime(digits100m.toString());
      newMarks100m[slNo] = Math.floor(Math.random() * 100) + 1;
    });

    setRunningTimes1600(newRunningTimes1600);
    setTotalLapses1600(newTotalLapses1600);
    setAttempt1(newAttempt1);
    setAttempt2(newAttempt2);
    setAttempt3(newAttempt3);
    setRunningTimes100m(newRunningTimes100m);
    setMarks1600(newMarks1600);
    setMarksShotPut(newMarksShotPut);
    setMarks100m(newMarks100m);

    setShowViewPreview(true);
    setShowModal(true);
    toast.success("✅ Dummy Data Generated", {
      description: "Random data populated and preview opened.",
    });
  };

  // Collect all data for preview
  const getPreviewData = () => {
    return candidatesData.map(candidate => {
      const slNo = candidate.slNo;
      const att1 = parseFloat(attempt1[slNo] || '0');
      const att2 = parseFloat(attempt2[slNo] || '0');
      const att3 = parseFloat(attempt3[slNo] || '0');
      const highest = Math.max(att1, att2, att3);
      return {
        slNo,
        name: candidate.name,
        chestNo: candidate.chestNo,
        runningTime1600: runningTimes1600[slNo] || '',
        totalLapse1600: totalLapses1600[slNo] || '',
        marks1600: marks1600[slNo] || '',
        attempt1: attempt1[slNo] || '',
        attempt2: attempt2[slNo] || '',
        attempt3: attempt3[slNo] || '',
        highest,
        marksShotPut: marksShotPut[slNo] || '',
        runningTime100m: runningTimes100m[slNo] || '',
        marks100m: marks100m[slNo] || '',
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl mb-6">
          <h3 className="text-lg font-semibold">Comprehensive Data Entry</h3>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full">
            <thead>
              {/* Event Category Headers Row - Simple dark grey */}
              <tr className="bg-gray-800 text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold rounded-tl-xl">Sl No</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Chest No</th>
                <th colSpan={2} className="text-center py-3 px-4 text-sm font-semibold">1600m Running</th>
                <th colSpan={3} className="text-center py-3 px-4 text-sm font-semibold">Shot Put</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">100m Running</th>
              </tr>
              {/* Column Headers Row - Simple dark grey */}
              <tr className="bg-gray-700 text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold"></th> {/* Empty for Sl No */}
                <th className="text-left py-3 px-4 text-sm font-semibold"></th> {/* Empty for Name */}
                <th className="text-left py-3 px-4 text-sm font-semibold"></th> {/* Empty for Chest No */}
                <th className="text-left py-3 px-4 text-sm font-semibold">Running Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Total Lapse</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">1st Attempt</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">2nd Attempt</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">3rd Attempt</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Running Time</th>
              </tr>
            </thead>
            <tbody>
              {candidatesData.map((candidate, index) => (
                <tr
                  key={candidate.slNo}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-slate-50/50" : "bg-gray-50/50"
                  } hover:bg-slate-100/50 transition-colors`}
                >
                  <td className="py-3 px-4 text-sm">{candidate.slNo}</td>
                  <td className="py-3 px-4 text-sm font-medium" style={{ textAlign: "left", paddingLeft: "8px" }}>
                    {candidate.name}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold">{candidate.chestNo}</td>
                  
                  {/* 1600m Running */}
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      placeholder="00:00:00"
                      value={runningTimes1600[candidate.slNo] || ""}
                      onChange={(e) => {
                        const formatted = formatRunningTime(e.target.value);
                        setRunningTimes1600({ ...runningTimes1600, [candidate.slNo]: formatted });
                      }}
                      maxLength={8}
                      className="glass-input w-28 text-center font-mono"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      placeholder="00"
                      value={totalLapses1600[candidate.slNo] || ""}
                      onChange={(e) => {
                        const formatted = formatTotalLapse(e.target.value);
                        setTotalLapses1600({ ...totalLapses1600, [candidate.slNo]: formatted });
                      }}
                      maxLength={2}
                      className="glass-input w-16 text-center font-mono"
                    />
                  </td>
                  
                  {/* Shot Put - Short Input fields */}
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      placeholder="0.0"
                      value={attempt1[candidate.slNo] || ""}
                      onChange={(e) => {
                        const formatted = formatAttempt(e.target.value);
                        setAttempt1({ ...attempt1, [candidate.slNo]: formatted });
                      }}
                      maxLength={4}
                      className="glass-input w-16 text-center font-mono"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      placeholder="0.0"
                      value={attempt2[candidate.slNo] || ""}
                      onChange={(e) => {
                        const formatted = formatAttempt(e.target.value);
                        setAttempt2({ ...attempt2, [candidate.slNo]: formatted });
                      }}
                      maxLength={4}
                      className="glass-input w-16 text-center font-mono"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      placeholder="0.0"
                      value={attempt3[candidate.slNo] || ""}
                      onChange={(e) => {
                        const formatted = formatAttempt(e.target.value);
                        setAttempt3({ ...attempt3, [candidate.slNo]: formatted });
                      }}
                      maxLength={4}
                      className="glass-input w-16 text-center font-mono"
                    />
                  </td>
                  
                  {/* 100m Running - Only Running Time */}
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      placeholder="00:00:00"
                      value={runningTimes100m[candidate.slNo] || ""}
                      onChange={(e) => {
                        const formatted = formatRunningTime(e.target.value);
                        setRunningTimes100m({ ...runningTimes100m, [candidate.slNo]: formatted });
                      }}
                      maxLength={8}
                      className="glass-input w-28 text-center font-mono"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button Section */}
        <div className="flex flex-col space-y-2 mt-6 items-end">
          <Button
            onClick={handleSubmit}
            className="w-[10em] gradient-success text-white"
          >
            Submit
          </Button>
          <Button
            onClick={generateDummyData}
            className="w-[15em] gradient-success text-white "
          >
            Generate Dummy Data
          </Button>
          {showViewPreview && (
            <Button
              variant="outline"
              onClick={handleViewPreview}
              className="w-[10em] border-primary text-primary"
            >
              View Preview
            </Button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Data Entry Preview</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-300 py-2 px-4 text-left">Sl No</th>
                  <th className="border border-gray-300 py-2 px-4 text-left">Name</th>
                  <th className="border border-gray-300 py-2 px-4 text-left">Chest No</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">1600m Running Time</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">1600m Total Lapse</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">1600m Marks</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">Shot Put 1st Attempt</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">Shot Put 2nd Attempt</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">Shot Put 3rd Attempt</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">Highest Attempt</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">Shot Put Marks</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">100m Running Time</th>
                  <th className="border border-gray-300 py-2 px-4 text-center">100m Marks</th>
                </tr>
              </thead>
              <tbody>
                {getPreviewData().map((row) => (
                  <tr key={row.slNo} className="border-b border-gray-300">
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.slNo}</td>
                    <td className="border border-gray-300 py-2 px-4 text-left">{row.name}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.chestNo}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.runningTime1600}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.totalLapse1600}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.marks1600}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.attempt1}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.attempt2}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.attempt3}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.highest.toFixed(1)}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.marksShotPut}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.runningTime100m}</td>
                    <td className="border border-gray-300 py-2 px-4 text-center">{row.marks100m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DialogClose asChild>
            <Button variant="outline" className="mt-4 w-full" onClick={closeModal}>
              <X className="w-4 h-4 mr-2" />
              Close Preview
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataEntry;
