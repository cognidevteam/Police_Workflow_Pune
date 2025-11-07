import { useState } from "react";
import { Download, Search } from "lucide-react";
import CandidateDetailsCard from "@/components/CandidateDetailsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { generateDocumentVerificationPDFHTML, printPDF } from "@/utils/pdfGenerator";

const dummyCandidates = [
  { name: "SHUBHAM SUNIL MANKAR", rollNo: "110378000000001", fatherName: "SUNIL MANKAR", motherName: "SUNITA MANKAR", phone: "9763677201", caste: "EWS", gender: "Male", dob: "24-02-2000" },
  { name: "RAJESH KUMAR SHARMA", rollNo: "110378000000002", fatherName: "KUMAR SHARMA", motherName: "RADHA SHARMA", phone: "9876543210", caste: "OPEN", gender: "Male", dob: "15-06-1998" },
  { name: "PRIYA PATEL", rollNo: "110378000000003", fatherName: "RAMESH PATEL", motherName: "SITA PATEL", phone: "9123456789", caste: "OBC", gender: "Female", dob: "10-09-1999" },
];

const certificates = [
  { name: "Caste Certificate", date: "2023-05-12", hasIt: "yes" },
  { name: "Non Creamy Layer", date: "2023-06-08", hasIt: "no" },
  { name: "Earthquake Certificate", date: "2023-03-22", hasIt: "yes" },
  { name: "Are you eligible for Naxalite Exemption?", date: "2023-04-15", hasIt: "no" },
  { name: "Project Affected Certificate", date: "2023-07-01", hasIt: "yes" },
  { name: "Homeguard Certificate", date: "2023-02-18", hasIt: "yes" },
  { name: "Ex-Serviceman Dependent", date: "2023-01-30", hasIt: "no" },
  { name: "Ex-Serviceman Discharge Certificate", date: "2023-08-10", hasIt: "yes" },
  { name: "Sportsman", date: "2023-09-05", hasIt: "no" },
  { name: "Child of Police", date: "2023-05-25", hasIt: "yes" },
  { name: "Part-Time Employee", date: "2023-04-12", hasIt: "no" },
  { name: "Orphan", date: "2023-06-20", hasIt: "yes" },
  { name: "NCC", date: "2023-03-08", hasIt: "yes" },
  { name: "Domicile", date: "2023-07-17", hasIt: "no" },
];

const BasicDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(dummyCandidates[0]);
  const [candidateStatus, setCandidateStatus] = useState("accept");

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

  const handleSubmit = () => {
    // Generate and auto-download PDF using selected candidate
    const candidateData = {
      applicationId: selectedCandidate.rollNo,
      name: selectedCandidate.name,
      fatherName: selectedCandidate.fatherName,
      motherName: selectedCandidate.motherName,
      caste: selectedCandidate.caste,
      dob: selectedCandidate.dob,
      mobile: selectedCandidate.phone,
      gender: selectedCandidate.gender
    };

    const pdfHTML = generateDocumentVerificationPDFHTML(candidateData);
    printPDF(pdfHTML, `Document_Verification_${selectedCandidate.rollNo}.pdf`);
    
    toast.success("Document verification submitted! PDF is being generated...");
  };

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
        <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-6 py-3 rounded-xl mb-6">
          <h3 className="text-lg font-semibold">Document Details</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                <th className="text-left py-3 px-4 text-sm font-semibold rounded-tl-xl">Certificate Particulars</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Certificate Issue Date</th>
                <th className="text-center py-3 px-4 text-sm font-semibold rounded-tr-xl">Certificate [Yes/No]</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert, index) => (
                <tr
                  key={cert.name}
                  className={`border-b border-white/20 ${
                    index % 2 === 0 ? "bg-white/30" : "bg-sky-50/30"
                  } hover:bg-white/50 transition-colors`}
                >
                  <td className="py-3 px-4 text-sm">{cert.name}</td>
                  <td className="py-3 px-4">
                    <Input 
                      type="date" 
                      defaultValue={cert.date}
                      className="glass-input max-w-xs mx-auto" 
                    />
                  </td>
                  <td className="py-3 px-4">
                    <RadioGroup defaultValue={cert.hasIt} className="flex justify-center gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`${cert.name}-yes`} />
                        <Label htmlFor={`${cert.name}-yes`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${cert.name}-no`} />
                        <Label htmlFor={`${cert.name}-no`}>No</Label>
                      </div>
                    </RadioGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="text"
                value={selectedCandidate.phone}
                readOnly
                className="glass-input bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="parallel">REVISED PARALLEL RESERVATION?</Label>
              <Input id="parallel" type="text" className="glass-input" />
            </div>
            <div>
              <Label htmlFor="category">REVISED APPLICATION CATEGORY?</Label>
              <Select>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="obc">OBC</SelectItem>
                  <SelectItem value="sc">SC</SelectItem>
                  <SelectItem value="st">ST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="qualification">Qualification?</Label>
              <Select>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="10th">10th Pass</SelectItem>
                  <SelectItem value="12th">12th Pass</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Candidate Status</Label>
            <RadioGroup value={candidateStatus} onValueChange={setCandidateStatus} className="flex gap-6 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accept" id="accept" />
                <Label htmlFor="accept">Accept</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reject" id="reject" />
                <Label htmlFor="reject">Reject</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea id="remarks" className="glass-input h-24" placeholder="Enter remarks..." />
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full mt-6 gradient-success text-white font-semibold">
          <Download className="w-4 h-4 mr-2" />
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default BasicDetails;
