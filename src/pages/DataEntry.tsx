import { useState } from "react";
import { Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

type BatchType = "1600m" | "100m" | "shotput" | "";

const DataEntry = () => {
  const [batchNumber, setBatchNumber] = useState("");
  const [batchType, setBatchType] = useState<BatchType>("");
  const [runningTimes, setRunningTimes] = useState<Record<number, string>>({});
  const [totalLapses, setTotalLapses] = useState<Record<number, string>>({});
  const [attempt1, setAttempt1] = useState<Record<number, string>>({});
  const [attempt2, setAttempt2] = useState<Record<number, string>>({});
  const [attempt3, setAttempt3] = useState<Record<number, string>>({});
  const [submittedRows, setSubmittedRows] = useState<Record<number, boolean>>({});

  const handleSubmit = (slNo: number, name: string) => {
    setSubmittedRows({ ...submittedRows, [slNo]: true });
    toast.success("✅ Candidate Registered Successfully", {
      description: `${name} has been registered with their timing data.`,
      className: "glass-card gradient-success text-white animate-slide-in",
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Enter Batch Number"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              className="glass-input flex-1"
            />
            <Button className="gradient-hero text-white">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Select value={batchType} onValueChange={(value) => {
              setBatchType(value as BatchType);
              setSubmittedRows({});
            }}>
              <SelectTrigger className="glass-input w-full md:w-64">
                <SelectValue placeholder="Select Batch Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1600m">1600m Running</SelectItem>
                <SelectItem value="100m">100m Running</SelectItem>
                <SelectItem value="shotput">Shot Put</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl mb-6">
          <h3 className="text-lg font-semibold">Data Entry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold rounded-tl-xl">Sl No</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">
                  {batchType === "shotput" ? "Candidate Name" : "Name"}
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Roll No</th>
                {batchType === "shotput" ? (
                  <>
                    <th className="text-left py-3 px-4 text-sm font-semibold">1st Attempt</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">2nd Attempt</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">3rd Attempt</th>
                  </>
                ) : (
                  <>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Gender</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">BIB No</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Running Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Total Lapse</th>
                  </>
                )}
                <th className="text-center py-3 px-4 text-sm font-semibold rounded-tr-xl">Action</th>
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
                    <td className="py-3 px-4 text-sm font-medium">{candidate.name}</td>
                    <td className="py-3 px-4 text-sm">{candidate.rollNo}</td>
                    {batchType === "shotput" ? (
                      <>
                        <td className="py-3 px-4">
                          <Textarea
                            placeholder="Enter distance"
                            value={attempt1[candidate.slNo] || ""}
                            onChange={(e) =>
                              setAttempt1({ ...attempt1, [candidate.slNo]: e.target.value })
                            }
                            disabled={isSubmitted}
                            className={`glass-input w-32 min-h-[60px] ${
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
                            className={`glass-input w-32 min-h-[60px] ${
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
                            className={`glass-input w-32 min-h-[60px] ${
                              isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4 text-sm">{candidate.gender}</td>
                        <td className="py-3 px-4 text-sm font-semibold">{candidate.bibNo}</td>
                        <td className="py-3 px-4">
                          <Input
                            type="text"
                            placeholder="00:00:00"
                            value={runningTimes[candidate.slNo] || ""}
                            onChange={(e) =>
                              setRunningTimes({ ...runningTimes, [candidate.slNo]: e.target.value })
                            }
                            disabled={isSubmitted}
                            className={`glass-input w-28 ${
                              isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="text"
                            placeholder="00:00:00"
                            value={totalLapses[candidate.slNo] || ""}
                            onChange={(e) =>
                              setTotalLapses({ ...totalLapses, [candidate.slNo]: e.target.value })
                            }
                            disabled={isSubmitted}
                            className={`glass-input w-28 ${
                              isSubmitted ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                          />
                        </td>
                      </>
                    )}
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
