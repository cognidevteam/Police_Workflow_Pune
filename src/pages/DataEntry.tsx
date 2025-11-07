import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const candidatesData = [
  { slNo: 1, name: "Suresh Patil", rollNo: "110378000000011", gender: "Male", bibNo: "1244" },
  { slNo: 2, name: "Meera Kulkarni", rollNo: "110378000000012", gender: "Female", bibNo: "1245" },
  { slNo: 3, name: "Deepak Joshi", rollNo: "110378000000013", gender: "Male", bibNo: "1246" },
  { slNo: 4, name: "Shruti Desai", rollNo: "110378000000014", gender: "Female", bibNo: "1247" },
  { slNo: 5, name: "Karan Singh", rollNo: "110378000000015", gender: "Male", bibNo: "1248" },
  { slNo: 6, name: "Nikita Pawar", rollNo: "110378000000016", gender: "Female", bibNo: "1249" },
  { slNo: 7, name: "Aditya More", rollNo: "110378000000017", gender: "Male", bibNo: "1250" },
  { slNo: 8, name: "Riya Bhosale", rollNo: "110378000000018", gender: "Female", bibNo: "1251" },
  { slNo: 9, name: "Vishal Kamble", rollNo: "110378000000019", gender: "Male", bibNo: "1252" },
  { slNo: 10, name: "Anita Gaikwad", rollNo: "110378000000020", gender: "Female", bibNo: "1253" },
  { slNo: 11, name: "Raajan Mahanarsimha Yadav", rollNo: "1103780223000020", gender: "Male", bibNo: "1223" },
  { slNo: 12, name: "Nutraajan Abhishek Kumar", rollNo: "110378000000021", gender: "Male", bibNo: "1254" },
  { slNo: 13, name: "Raajhans Verma", rollNo: "110378000000022", gender: "Male", bibNo: "1255" },
  { slNo: 14, name: "Priya Raajput", rollNo: "110378000000023", gender: "Female", bibNo: "1256" },
  { slNo: 15, name: "Abhishek Joshi", rollNo: "110378000000024", gender: "Male", bibNo: "1257" },
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
  const [totalLapses100m, setTotalLapses100m] = useState<Record<number, string>>({});
  
  const [submittedRows, setSubmittedRows] = useState<Record<number, boolean>>({});

  const handleSubmit = (slNo: number, name: string) => {
    setSubmittedRows({ ...submittedRows, [slNo]: true });
    toast.success("✅ Candidate Registered Successfully", {
      description: `${name} has been registered with their data across all events.`,
      className: "glass-card gradient-success text-white animate-slide-in",
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl mb-6">
          <h3 className="text-lg font-semibold">Comprehensive Data Entry</h3>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table >
            <thead className="">
                            {/* Column Headers Row - Simple dark grey */}
              <tr className="bg-gray-700 text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold"></th> {/* Empty for Sl No */}
                <th className="text-left py-3 px-4 text-sm font-semibold"></th> {/* Empty for Name */}
                <th className="text-left py-3 px-4 text-sm font-semibold"></th> {/* Empty for Roll No */}
                <th className="text-left py-3 px-4 text-sm font-semibold"></th> {/* Empty for Gender */}
                <th className="text-left py-3 px-4 text-sm font-semibold"></th> {/* Empty for BIB No */}
                <th colSpan={2} className="text-center py-3 px-4 text-sm font-semibold">1600m Running</th>
                <th colSpan={3} className="text-center  py-3 px-4 text-sm font-semibold">Shot Put</th>
                <th colSpan={2} className="text-center  py-3 px-4 text-sm font-semibold">100m Running</th>
                <th className="text-center py-3 px-4 text-sm font-semibold"></th> {/* Empty for Submit */}
              </tr>
              {/* Event Category Headers Row - Simple dark grey */}
              <tr className="bg-gray-800 text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold rounded-tl-xl">Sl No</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Roll No</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Gender</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">BIB No</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold">Running Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Total Lapse</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">First Attempt</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Second Attempt</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Third Attempt</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Running Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Total Lapse</th>

                <th className="text-center py-3 px-4 text-sm font-semibold rounded-tr-xl">Submit</th>
              </tr>

            </thead>
            <tbody>
              {candidatesData.map((candidate, index) => {
                const isSubmitted = submittedRows[candidate.slNo];
                return (
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
                    <td className="py-3 px-4 text-sm">{candidate.rollNo}</td>
                    <td className="py-3 px-4 text-sm">{candidate.gender}</td>
                    <td className="py-3 px-4 text-sm font-semibold">{candidate.bibNo}</td>
                    
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
                        disabled={isSubmitted}
                        maxLength={8}
                        className={`glass-input w-28 text-center font-mono ${
                          isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
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
                        disabled={isSubmitted}
                        maxLength={2}
                        className={`glass-input w-16 text-center font-mono ${
                          isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </td>
                    
                    {/* Shot Put */}
                    <td className="py-3 px-4">
                      <Textarea
                        placeholder="Enter distance"
                        value={attempt1[candidate.slNo] || ""}
                        onChange={(e) =>
                          setAttempt1({ ...attempt1, [candidate.slNo]: e.target.value })
                        }
                        disabled={isSubmitted}
                        className={`glass-input w-24 min-h-[40px] text-sm ${
                          isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Textarea
                        placeholder="Enter distance"
                        value={attempt2[candidate.slNo] || ""}
                        onChange={(e) =>
                          setAttempt2({ ...attempt2, [candidate.slNo]: e.target.value })
                        }
                        disabled={isSubmitted}
                        className={`glass-input w-24 min-h-[40px] text-sm ${
                          isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Textarea
                        placeholder="Enter distance"
                        value={attempt3[candidate.slNo] || ""}
                        onChange={(e) =>
                          setAttempt3({ ...attempt3, [candidate.slNo]: e.target.value })
                        }
                        disabled={isSubmitted}
                        className={`glass-input w-24 min-h-[40px] text-sm ${
                          isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </td>
                    
                    {/* 100m Running */}
                    <td className="py-3 px-4">
                      <Input
                        type="text"
                        placeholder="00:00:00"
                        value={runningTimes100m[candidate.slNo] || ""}
                        onChange={(e) => {
                          const formatted = formatRunningTime(e.target.value);
                          setRunningTimes100m({ ...runningTimes100m, [candidate.slNo]: formatted });
                        }}
                        disabled={isSubmitted}
                        maxLength={8}
                        className={`glass-input w-28 text-center font-mono ${
                          isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        type="text"
                        placeholder="00"
                        value={totalLapses100m[candidate.slNo] || ""}
                        onChange={(e) => {
                          const formatted = formatTotalLapse(e.target.value);
                          setTotalLapses100m({ ...totalLapses100m, [candidate.slNo]: formatted });
                        }}
                        disabled={isSubmitted}
                        maxLength={2}
                        className={`glass-input w-16 text-center font-mono ${
                          isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                    </td>
                    
                    {/* Submit Action */}
                    <td className="py-3 px-4 text-center">
                      <Button
                        size="sm"
                        onClick={() => handleSubmit(candidate.slNo, candidate.name)}
                        disabled={isSubmitted}
                        className={`px-4 ${
                          isSubmitted
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60 hover:bg-gray-200"
                            : "gradient-success text-white"
                        }`}
                      >
                        {isSubmitted ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Submit
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
