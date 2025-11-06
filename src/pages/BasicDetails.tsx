import { useState } from "react";
import { Download } from "lucide-react";
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

const certificates = [
  "Caste Certificate",
  "Non Creamy Layer",
  "Earthquake Certificate",
  "Are you eligible for Naxalite Exemption?",
  "Project Affected Certificate",
  "Homeguard Certificate",
  "Ex-Serviceman Dependent",
  "Ex-Serviceman Discharge Certificate",
  "Sportsman",
  "Child of Police",
  "Part-Time Employee",
  "Orphan",
  "NCC",
  "Domicile",
];

const BasicDetails = () => {
  const [candidateStatus, setCandidateStatus] = useState("accept");

  const handleSubmit = () => {
    // Generate and auto-download PDF
    const candidateData = {
      applicationId: "110378000000001",
      name: "SHUBHAM SUNIL MANKAR",
      fatherName: "SUNIL MANKAR",
      caste: "EWS",
      dob: "24-02-2000",
      mobile: "9763677201"
    };

    const pdfHTML = generateDocumentVerificationPDFHTML(candidateData);
    printPDF(pdfHTML, "Document_Verification_Form.pdf");
    
    toast.success("Document verification submitted! PDF is being generated...");
  };

  return (
    <div className="space-y-6">
      <CandidateDetailsCard />

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
                  key={cert}
                  className={`border-b border-white/20 ${
                    index % 2 === 0 ? "bg-white/30" : "bg-sky-50/30"
                  } hover:bg-white/50 transition-colors`}
                >
                  <td className="py-3 px-4 text-sm">{cert}</td>
                  <td className="py-3 px-4">
                    <Input type="date" className="glass-input max-w-xs mx-auto" />
                  </td>
                  <td className="py-3 px-4">
                    <RadioGroup defaultValue="yes" className="flex justify-center gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`${cert}-yes`} />
                        <Label htmlFor={`${cert}-yes`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${cert}-no`} />
                        <Label htmlFor={`${cert}-no`}>No</Label>
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
                value="9763677201"
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
