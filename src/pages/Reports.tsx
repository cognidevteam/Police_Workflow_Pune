import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  generateQualifiedPDFHTML, 
  generateDisqualifiedPDFHTML, 
  generateAnnualReportPDFHTML, 
  printPDF 
} from "@/utils/pdfGenerator";

type ReportType = "qualified" | "disqualified" | "annual" | "";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>("");
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleGeneratePDF = () => {
    if (!selectedReport) {
      toast.error("Please select a report type");
      return;
    }

    let htmlContent = "";
    let filename = "";

    switch (selectedReport) {
      case "qualified":
        htmlContent = generateQualifiedPDFHTML();
        filename = "Qualified_Candidates_Report.pdf";
        break;
      case "disqualified":
        htmlContent = generateDisqualifiedPDFHTML();
        filename = "Disqualified_Candidates_Report.pdf";
        break;
      case "annual":
        htmlContent = generateAnnualReportPDFHTML();
        filename = "Annual_Recruitment_Summary.pdf";
        break;
    }

    printPDF(htmlContent, filename);
    setPdfGenerated(true);
    toast.success("PDF generated successfully!");
  };

  const handleDownloadAgain = () => {
    handleGeneratePDF();
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="glass-card p-8">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-4 rounded-2xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Welcome, Admin
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitor and generate comprehensive reports for candidate performance, 
              qualifications, and recruitment summaries. Select a report type below to begin.
            </p>
          </div>
        </div>
      </Card>

      {/* Report Generation Card */}
      <Card className="glass-card p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-2">Generate Reports</h2>
            <p className="text-muted-foreground">
              Choose a PDF structure and generate detailed reports instantly
            </p>
          </div>

          <div className="space-y-4 max-w-md">
            <Select value={selectedReport} onValueChange={(value) => {
              setSelectedReport(value as ReportType);
              setPdfGenerated(false);
            }}>
              <SelectTrigger className="glass-input h-12">
                <SelectValue placeholder="Select PDF Structure" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-xl">
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="disqualified">Disqualified</SelectItem>
                <SelectItem value="annual">Summary Report</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleGeneratePDF}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold"
              disabled={!selectedReport}
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate PDF
            </Button>

            {pdfGenerated && (
              <Button 
                onClick={handleDownloadAgain}
                variant="outline"
                className="w-full h-12 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold animate-fade-in"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Again
              </Button>
            )}
          </div>

          {selectedReport && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl animate-fade-in">
              <p className="text-sm text-purple-900">
                <strong>Selected Report:</strong> {
                  selectedReport === "qualified" ? "Qualified Candidates Report" :
                  selectedReport === "disqualified" ? "Disqualified Candidates Report" :
                  "Annual Recruitment Summary"
                }
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Reports;
