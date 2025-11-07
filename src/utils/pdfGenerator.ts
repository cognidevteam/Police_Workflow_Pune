// Utility functions for PDF generation using browser print

export const generateBarcode = (text: string) => {
  // Simple barcode representation
  return `||||| |||| ||| |||| ||||| || ||| |||| |||||`;
};

export const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString('en-GB').split('/').join('-');
  const time = now.toLocaleTimeString('en-GB', { hour12: false });
  return { date, time };
};

export const printPDF = (htmlContent: string, filename: string) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups to download the PDF');
    return;
  }

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load then print
  printWindow.onload = () => {
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      // Don't close automatically - let user close after printing
    }, 250);
  };
};

export const generateComprehensiveBatchPDFHTML = (
  batchNumber: string,
  candidates: Array<{
    slNo: number;
    name: string;
    rollNo: string;
    gender: string;
    chestNo: string;
    bibNo: string;
  }>
) => {
  const { date, time } = getCurrentDateTime();
  const barcode = generateBarcode(batchNumber);

  const candidateRows = candidates.map(candidate => `
    <tr>
      <td>${candidate.slNo}</td>
      <td class="photo-cell"></td>
      <td>${candidate.rollNo}</td>
      <td style="text-align: left; padding-left: 8px;">${candidate.name}</td>
      <td>${candidate.gender}</td>
      <td>${candidate.chestNo}</td>
      <td>${candidate.bibNo}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Comprehensive Batch PDF - All Events</title>
  <style>
    @media print {
      @page { 
        margin: 1cm;
        size: A4 landscape;
      }
      body { margin: 0; }
    }
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
      margin-top: 50px;
      position: relative;
    }
    .header h1 {
      margin: 5px 0;
      font-size: 16px;
      font-weight: bold;
    }
    .header h2 {
      margin: 5px 0;
      font-size: 14px;
    }
    .header h3 {
      margin: 5px 0;
      font-size: 12px;
    }
    .barcode {
      position: absolute;
      right: 0;
      top: -45px;
      font-family: 'Courier New', monospace;
      font-size: 9px;
      letter-spacing: -1px;
      line-height: 1;
      white-space: nowrap;
    }
    .batch-info {
      margin: 15px 0;
      font-size: 12px;
    }
    .batch-info p {
      margin: 5px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 10px;
    }
    th, td {
      border: 1px solid #000;
      padding: 6px 4px;
      text-align: center;
    }
    .event-header {
      background-color: #d3d3d3;
      font-weight: bold;
      font-size: 11px;
      text-align: center;
    }
    .column-header {
      background-color: #e8e8e8;
      font-weight: bold;
      font-size: 10px;
      text-align: center;
      vertical-align: middle;
    }
    .photo-cell {
      width: 60px;
      height: 60px;
      background: #f5f5f5;
    }
    .signatures {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
    }
    .signature-block {
      width: 45%;
    }
    .signature-block p {
      margin: 5px 0;
      font-size: 11px;
      font-weight: bold;
    }
    .signature-line {
      border-top: 1px solid #000;
      margin-top: 40px;
      padding-top: 5px;
    }
    .footer-section {
      margin-top: 30px;
      font-size: 11px;
    }
    .footer-section p {
      margin: 5px 0;
      font-weight: bold;
    }
    @media print {
      .header {
        margin-top: 50px;
      }
      .barcode {
        top: -45px;
        font-size: 8px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="barcode">${barcode}</div>
    <h1>OFFICE OF THE COMMISSIONER OF POLICE</h1>
    <h2>PUNE CITY</h2>
    <h3>PRISON CONSTABLE(WEST REGION) RECRUITMENT 22-23</h3>
    <h3>Physical Endurance & Measurement Test (PE&MT) of various posts on requirement basis in Prison Constable Recruitment</h3>
    <h2>DETAILS LIST</h2>
  </div>

  <div class="batch-info">
    <p><strong>Batch No. :</strong> ${batchNumber}</p>
    <p><strong>Total Candidates :</strong> ${candidates.length}</p>
  </div>

  <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 11px;">
    <p>Generated Date : ${date} ${time}</p>
    <p>Downloaded Date : ${date} ${time}</p>
  </div>

  <table>
    <thead>
      <tr class="event-header">
        <th rowspan="2">Sl. No.</th>
        <th rowspan="2">Photo</th>
        <th rowspan="2">Roll No.</th>
        <th rowspan="2">Name</th>
        <th rowspan="2">Gender</th>
        <th rowspan="2">Chest No</th>
        <th rowspan="2">Bib Number</th>
        <th colspan="2">1600m Running</th>
        <th colspan="3">Shot Put</th>
        <th colspan="2">100m Running</th>
      </tr>
      <tr class="column-header">
        <th>Running Time</th>
        <th>Total Lapse</th>
        <th>1st Attempt</th>
        <th>2nd Attempt</th>
        <th>3rd Attempt</th>
        <th>Running Time</th>
        <th>Total Lapse</th>
      </tr>
    </thead>
    <tbody>
      ${candidateRows}
    </tbody>
  </table>

  <div class="signatures">
    <div class="signature-block">
      <p>Details Incharge Name</p>
      <p>Designation</p>
      <div class="signature-line">Signature</div>
    </div>
    <div class="signature-block">
      <p>Event Incharge Name</p>
      <p>Designation</p>
      <div class="signature-line">Signature</div>
    </div>
  </div>

  <div class="footer-section">
    <p>Counter Number: __________</p>
    <p>Detail Number: __________</p>
  </div>
</body>
</html>
  `;
};

export const generateBatchPDFHTML = (
  batchType: 'running' | 'shotput',
  eventName: string,
  candidates: Array<{
    slNo: number;
    name: string;
    rollNo: string;
    gender?: string;
    bibNo: string;
  }>
) => {
  const { date, time } = getCurrentDateTime();
  const barcode = generateBarcode('041101');

  const runningHeaders = `
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Sl. No.</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Photo</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Roll No.</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Name</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Category</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Gender</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Chest No</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Bib Number</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Running Time</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Total Lapse</th>
  `;

  const shotputHeaders = `
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Sl No</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Candidate Name</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Roll No</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold;">1st Attempt</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold;">2nd Attempt</th>
    <th style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold;">3rd Attempt</th>
  `;

  const runningRows = candidates.map(candidate => `
    <tr>
      <td style="border: 1px solid #000; padding: 8px;">${candidate.slNo}</td>
      <td style="border: 1px solid #000; padding: 8px; width: 80px; height: 80px; background: #f0f0f0;"></td>
      <td style="border: 1px solid #000; padding: 8px;">${candidate.rollNo}</td>
      <td style="border: 1px solid #000; padding: 8px;">${candidate.name}</td>
      <td style="border: 1px solid #000; padding: 8px;">EWS</td>
      <td style="border: 1px solid #000; padding: 8px;">${candidate.gender || 'Male'}</td>
      <td style="border: 1px solid #000; padding: 8px;">40072</td>
      <td style="border: 1px solid #000; padding: 8px;">${candidate.bibNo}</td>
      <td style="border: 1px solid #000; padding: 8px;"></td>
      <td style="border: 1px solid #000; padding: 8px;"></td>
    </tr>
  `).join('');

  const shotputRows = candidates.map(candidate => `
    <tr>
      <td style="border: 1px solid #000; padding: 8px;">${candidate.slNo}</td>
      <td style="border: 1px solid #000; padding: 8px;">${candidate.name}</td>
      <td style="border: 1px solid #000; padding: 8px;">${candidate.rollNo}</td>
      <td style="border: 1px solid #000; padding: 8px; text-align: center;"></td>
      <td style="border: 1px solid #000; padding: 8px; text-align: center;"></td>
      <td style="border: 1px solid #000; padding: 8px; text-align: center;"></td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Batch PDF - ${eventName}</title>
      <style>
        @media print {
          @page { margin: 1cm; }
          body { margin: 0; }
        }
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          position: relative;
          padding-top: 50px;
        }
        .header h1 {
          margin: 5px 0;
          font-size: 18px;
          font-weight: bold;
        }
        .header h2 {
          margin: 5px 0;
          font-size: 16px;
        }
        .header h3 {
          margin: 5px 0;
          font-size: 14px;
        }
        .barcode {
            position: absolute;
  right: 0;
  top: 0;
  font-family: 'Courier New', monospace;
  font-size: 9px;
  letter-spacing: -1px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
        }
        .batch-info {
          margin: 20px 0;
          font-size: 14px;
        }
        .batch-info p {
          margin: 5px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 12px;
        }
        .signatures {
          margin-top: 60px;
          display: flex;
          justify-content: space-between;
        }
        .signature-block {
          width: 45%;
        }
        .signature-block p {
          margin: 5px 0;
          font-size: 12px;
          font-weight: bold;
        }
        .signature-line {
          border-top: 1px solid #000;
          margin-top: 40px;
          padding-top: 5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="barcode">${barcode}</div>
        <h1>OFFICE OF THE COMMISSIONER OF POLICE</h1>
        <h2>PUNE CITY</h2>
        <h3>PRISON CONSTABLE(WEST REGION) RECRUITMENT 22-23</h3>
        <h3>Physical Endurance & Measurement Test (PE&MT) of various posts on requirement basis in Prison Constable Recruitment</h3>
        <h2>DETAILS LIST</h2>
      </div>

      <div class="batch-info">
        <p><strong>Batch No. :</strong> 041101</p>
        <p><strong>Total Candidates :</strong> ${candidates.length}</p>
      </div>

      <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 12px;">
        <p>Generated Date : ${date} ${time}</p>
        <p>Downloaded Date : ${date} ${time}</p>
      </div>

      <table>
        <thead>
          <tr>
            ${batchType === 'running' ? runningHeaders : shotputHeaders}
          </tr>
        </thead>
        <tbody>
          ${batchType === 'running' ? runningRows : shotputRows}
        </tbody>
      </table>

      <div class="signatures">
        <div class="signature-block">
          <p>Details Incharge Name</p>
          <p>Designation</p>
          <div class="signature-line">Signature</div>
        </div>
        <div class="signature-block">
          <p>Event Incharge Name</p>
          <p>Designation</p>
          <div class="signature-line">Signature</div>
        </div>
      </div>

      <div style="margin-top: 40px; font-size: 12px;">
        <p><strong>Counter Number</strong></p>
        <p><strong>Detail Number</strong></p>
      </div>
    </body>
    </html>
  `;
};

export const generatePSTReportPDFHTML = (reportData: {
  height: string;
  chestNormal: string;
  chestExpanded: string;
  chestDiff: string;
  passed: boolean;
  candidateName: string;
  rollNo: string;
}) => {
  const { date, time } = getCurrentDateTime();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>PST Report</title>
      <style>
        @media print {
          @page { margin: 1cm; }
          body { margin: 0; }
        }
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 5px 0;
          font-size: 18px;
          font-weight: bold;
        }
        .header h2 {
          margin: 5px 0;
          font-size: 16px;
        }
        .status {
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          border-radius: 10px;
          ${reportData.passed ? 'background-color: #d4edda; border: 2px solid #28a745;' : 'background-color: #f8d7da; border: 2px solid #dc3545;'}
        }
        .status h2 {
          margin: 0;
          font-size: 24px;
          ${reportData.passed ? 'color: #155724;' : 'color: #721c24;'}
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #000;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f0f0f0;
          font-weight: bold;
        }
        .pass {
          color: #28a745;
          font-weight: bold;
        }
        .fail {
          color: #dc3545;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>OFFICE OF THE COMMISSIONER OF POLICE</h1>
        <h2>PUNE CITY</h2>
        <h2>PRISON CONSTABLE(WEST REGION) RECRUITMENT 22-23</h2>
        <h2>Physical Standard Test (PST) Report</h2>
        <p>Generated: ${date} ${time}</p>
      </div>

      <table>
        <tr>
          <th>Candidate Name</th>
          <td>${reportData.candidateName}</td>
        </tr>
        <tr>
          <th>Roll Number</th>
          <td>${reportData.rollNo}</td>
        </tr>
      </table>

      <div class="status">
        <h2>Result: ${reportData.passed ? 'PASSED' : 'FAILED'}</h2>
      </div>

      <h3>Test Results</h3>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Requirement</th>
            <th>Actual Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Height</td>
            <td>≥ 162.5 cm</td>
            <td>${reportData.height} cm</td>
            <td class="${parseFloat(reportData.height) >= 162.5 ? 'pass' : 'fail'}">${parseFloat(reportData.height) >= 162.5 ? '✓ PASS' : '✗ FAIL'}</td>
          </tr>
          <tr>
            <td>Chest (Normal)</td>
            <td>≥ 79 cm</td>
            <td>${reportData.chestNormal} cm</td>
            <td class="${parseFloat(reportData.chestNormal) >= 79 ? 'pass' : 'fail'}">${parseFloat(reportData.chestNormal) >= 79 ? '✓ PASS' : '✗ FAIL'}</td>
          </tr>
          <tr>
            <td>Chest (Expanded)</td>
            <td>-</td>
            <td>${reportData.chestExpanded} cm</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Chest Difference</td>
            <td>≥ 5 cm</td>
            <td>${reportData.chestDiff} cm</td>
            <td class="${parseFloat(reportData.chestDiff) >= 5 ? 'pass' : 'fail'}">${parseFloat(reportData.chestDiff) >= 5 ? '✓ PASS' : '✗ FAIL'}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 60px;">
        <p><strong>Verified By: ___________________</strong></p>
        <p><strong>Date: ___________________</strong></p>
      </div>
    </body>
    </html>
  `;
};

export const generateDocumentVerificationPDFHTML = (candidateData: {
  applicationId: string;
  name: string;
  fatherName: string;
  motherName: string;
  caste: string;
  dob: string;
  mobile: string;
  gender: string;
}) => {
  const { date, time } = getCurrentDateTime();

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Document Verification Form</title>
      <style>
        @media print {
          @page { margin: 1cm; }
          body { margin: 0; }
        }
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 900px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 5px 0;
          font-size: 16px;
          font-weight: bold;
        }
        .header h2 {
          margin: 5px 0;
          font-size: 14px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
          font-size: 11px;
        }
        th, td {
          border: 1px solid #000;
          padding: 6px;
          text-align: left;
        }
        th {
          background-color: #f0f0f0;
          font-weight: bold;
        }
        .signatures {
          margin-top: 40px;
        }
        .signature-row {
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>OFFICE OF THE COMMISSIONER OF POLICE, PUNE CITY</h1>
        <h2>PRISON CONSTABLE(WEST REGION) RECRUITMENT 22-23</h2>
        <h2>DOCUMENT VERIFICATION FORM DATA</h2>
        <p>Exam Date ${date}</p>
      </div>

      <p><strong>Table No. : 0</strong></p>

      <table>
        <tbody>
          <tr>
            <td style="width: 30px;"><strong>1</strong></td>
            <td style="width: 250px;"><strong>APPLICATION ID NO.</strong></td>
            <td>${candidateData.applicationId}</td>
          </tr>
          <tr>
            <td><strong>2</strong></td>
            <td><strong>CANDIDATES NAME</strong></td>
            <td>${candidateData.name}</td>
          </tr>
          <tr>
            <td><strong>3</strong></td>
            <td><strong>FATHERS NAME</strong></td>
            <td>${candidateData.fatherName}</td>
          </tr>
          <tr>
            <td><strong>4</strong></td>
            <td><strong>MOTHERS NAME</strong></td>
            <td>${candidateData.motherName}</td>
          </tr>
          <tr>
            <td><strong>5</strong></td>
            <td><strong>GENDER</strong></td>
            <td>${candidateData.gender}</td>
          </tr>
          <tr>
            <td><strong>6</strong></td>
            <td><strong>CASTE/APPLICATION CATEGORY</strong></td>
            <td>${candidateData.caste}</td>
          </tr>
          <tr>
            <td><strong>7</strong></td>
            <td><strong>MOBILE NUMBER</strong></td>
            <td>${candidateData.mobile}</td>
          </tr>
        </tbody>
      </table>

      <h3>CERTIFICATE PARTICULARS</h3>

      <table>
        <thead>
          <tr>
            <th style="width: 30px;"></th>
            <th>PARTICULARS</th>
            <th style="width: 150px;">ORIGINAL DATA SUBMITTED</th>
            <th style="width: 150px;">CERTIFICATE (YES/NO)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>12</td><td>CASTE CERTIFICATE</td><td></td><td>YES</td></tr>
          <tr><td>13</td><td>NON-CREAMY LAYER</td><td></td><td></td></tr>
          <tr><td>14</td><td>EARTHQUAKE CERTIFICATE</td><td>NO</td><td>NO</td></tr>
          <tr><td>24</td><td>Domicile</td><td></td><td></td></tr>
        </tbody>
      </table>

      <div class="signatures">
        <h3>Checked/Verified By</h3>
        <div class="signature-row">
          <p>Full Name(Designation) : document verification 2 ()</p>
          <p>Signature : _________________</p>
        </div>
        <div class="signature-row">
          <p>Full Name(Designation) : ()</p>
          <p>Signature : _________________</p>
        </div>
      </div>

      <div style="margin-top: 30px;">
        <h3>Remarks:</h3>
        <div style="border: 1px solid #000; min-height: 60px; padding: 10px;"></div>
      </div>

      <div style="margin-top: 30px;">
        <p><strong>Candidate Signature</strong></p>
        <div style="border-top: 1px solid #000; width: 200px; margin-top: 40px;"></div>
      </div>
    </body>
    </html>
  `;
};

// Generate dummy candidate data
const generateDummyCandidates = (count: number, status: 'qualified' | 'disqualified') => {
  const indianNames = [
    "SHUBHAM SUNIL MANKAR", "RAHUL KUMAR SHARMA", "PRIYA PATEL", "AMIT SINGH",
    "SNEHA GUPTA", "VIKRAM RAO", "POOJA DESAI", "RAJESH KUMAR", "KAVITA MEHTA",
    "SURESH REDDY", "ANITA JOSHI", "MANOJ VERMA", "DEEPA NAIR", "ARUN PILLAI",
    "RITU AGARWAL", "SANDEEP YADAV", "NEHA KAPOOR", "KIRAN BHAT", "MOHIT SAXENA",
    "SWATI KULKARNI", "AJAY MISHRA", "REKHA SINHA"
  ];

  return Array.from({ length: count }, (_, i) => ({
    slNo: i + 1,
    applicationId: `11037800${String(i + 1).padStart(5, '0')}`,
    name: indianNames[i % indianNames.length],
    chestNo: 40072 + i,
    shotputMarks: status === 'qualified' ? (12 + Math.floor(Math.random() * 4)).toFixed(2) : (5 + Math.floor(Math.random() * 3)).toFixed(2),
    runningMarks: status === 'qualified' ? (8 + Math.floor(Math.random() * 3)).toFixed(2) : (3 + Math.floor(Math.random() * 2)).toFixed(2),
    runningHundredMarks: status === 'qualified' ? (8 + Math.floor(Math.random() * 3)).toFixed(2) : (2 + Math.floor(Math.random() * 3)).toFixed(2),
    totalMarks: status === 'qualified' ? (28 + Math.floor(Math.random() * 8)) : (10 + Math.floor(Math.random() * 10))
  }));
};

export const generateQualifiedPDFHTML = () => {
  const { date } = getCurrentDateTime();
  const candidates = generateDummyCandidates(20, 'qualified');

  const candidateRows = candidates.map(candidate => `
    <tr>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.slNo}</td>
      <td style="border: 1px solid #000; padding: 6px;">${candidate.applicationId}</td>
      <td style="border: 1px solid #000; padding: 6px;">${candidate.name}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.chestNo}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.shotputMarks}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.runningMarks}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.runningHundredMarks}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center; font-weight: bold;">${candidate.totalMarks}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Qualified Candidates Report</title>
      <style>
        @media print {
          @page { margin: 1cm; }
          body { margin: 0; }
        }
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 5px 0;
          font-size: 16px;
          font-weight: bold;
        }
        .header h2 {
          margin: 5px 0;
          font-size: 14px;
        }
        .header h3 {
          margin: 5px 0;
          font-size: 13px;
        }
        .logo {
          text-align: center;
          margin-bottom: 15px;
        }
        .exam-date {
          text-align: right;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
          font-size: 11px;
        }
        th {
          border: 1px solid #000;
          padding: 8px;
          text-align: center;
          font-weight: bold;
          background-color: #e8e8e8;
        }
        .signatures {
          margin-top: 60px;
          display: flex;
          justify-content: space-around;
        }
        .signature-block {
          text-align: center;
        }
        .signature-block p {
          margin: 5px 0;
          font-size: 11px;
          font-weight: bold;
        }
        .signature-line {
          border-top: 1px solid #000;
          margin-top: 50px;
          padding-top: 5px;
          width: 200px;
        }
      </style>
    </head>
    <body>
      <div class="logo">
        <p style="font-size: 14px; font-weight: bold;">🏛️ पुणे पुलिस  🏛️</p>
      </div>

      <div class="header">
        <h1>OFFICE OF THE COMMISSIONER OF POLICE</h1>
        <h1>PUNE CITY</h1>
        <h2>PRISON CONSTABLE(WEST REGION) RECRUITMENT 22-23</h2>
        <h3>Physical Endurance & Measurement Test (PE&MT) of various posts on requirement basis in Prison Constable Recruitment</h3>
        <h2 style="margin-top: 10px;">Qualified</h2>
      </div>

      <div class="exam-date">Exam Date: ${date}</div>

      <h3 style="font-size: 13px; margin: 15px 0;">Candidate Details</h3>

      <table>
        <thead>
          <tr>
            <th style="width: 40px;">Sl_No</th>
            <th style="width: 120px;">Application Id</th>
            <th>Name</th>
            <th style="width: 80px;">Chest No.</th>
            <th style="width: 90px;">Shotput Marks</th>
            <th style="width: 90px;">Running Marks</th>
            <th style="width: 110px;">Running Hundred Marks</th>
            <th style="width: 90px;">Total Marks</th>
          </tr>
        </thead>
        <tbody>
          ${candidateRows}
        </tbody>
      </table>

      <div class="signatures">
        <div class="signature-block">
          <p>SIGNATURE OF MEMBER 1</p>
          <div class="signature-line"></div>
        </div>
        <div class="signature-block">
          <p>SIGNATURE OF MEMBER 2</p>
          <div class="signature-line"></div>
        </div>
        <div class="signature-block">
          <p>SIGNATURE OF MEMBER 3</p>
          <div class="signature-line"></div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateDisqualifiedPDFHTML = () => {
  const { date } = getCurrentDateTime();
  const candidates = generateDummyCandidates(20, 'disqualified');

  const candidateRows = candidates.map(candidate => `
    <tr>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.slNo}</td>
      <td style="border: 1px solid #000; padding: 6px;">${candidate.applicationId}</td>
      <td style="border: 1px solid #000; padding: 6px;">${candidate.name}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.chestNo}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.shotputMarks}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.runningMarks}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center;">${candidate.runningHundredMarks}</td>
      <td style="border: 1px solid #000; padding: 6px; text-align: center; font-weight: bold;">${candidate.totalMarks}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Disqualified Candidates Report</title>
      <style>
        @media print {
          @page { margin: 1cm; }
          body { margin: 0; }
        }
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 5px 0;
          font-size: 16px;
          font-weight: bold;
        }
        .header h2 {
          margin: 5px 0;
          font-size: 14px;
        }
        .header h3 {
          margin: 5px 0;
          font-size: 13px;
        }
        .logo {
          text-align: center;
          margin-bottom: 15px;
        }
        .exam-date {
          text-align: right;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
          font-size: 11px;
        }
        th {
          border: 1px solid #000;
          padding: 8px;
          text-align: center;
          font-weight: bold;
          background-color: #e8e8e8;
        }
        .signatures {
          margin-top: 60px;
          display: flex;
          justify-content: space-around;
        }
        .signature-block {
          text-align: center;
        }
        .signature-block p {
          margin: 5px 0;
          font-size: 11px;
          font-weight: bold;
        }
        .signature-line {
          border-top: 1px solid #000;
          margin-top: 50px;
          padding-top: 5px;
          width: 200px;
        }
      </style>
    </head>
    <body>
      <div class="logo">
        <p style="font-size: 14px; font-weight: bold;">🏛️ पुणे पुलिस  🏛️</p>
      </div>

      <div class="header">
        <h1>OFFICE OF THE COMMISSIONER OF POLICE</h1>
        <h1>PUNE CITY</h1>
        <h2>PRISON CONSTABLE(WEST REGION) RECRUITMENT 22-23</h2>
        <h3>Physical Endurance & Measurement Test (PE&MT) of various posts on requirement basis in Prison Constable Recruitment</h3>
        <h2 style="margin-top: 10px; color: #cc0000;">Disqualified</h2>
      </div>

      <div class="exam-date">Exam Date: ${date}</div>

      <h3 style="font-size: 13px; margin: 15px 0;">Candidate Details</h3>

      <table>
        <thead>
          <tr>
            <th style="width: 40px;">Sl_No</th>
            <th style="width: 120px;">Application Id</th>
            <th>Name</th>
            <th style="width: 80px;">Chest No.</th>
            <th style="width: 90px;">Shotput Marks</th>
            <th style="width: 90px;">Running Marks</th>
            <th style="width: 110px;">Running Hundred Marks</th>
            <th style="width: 90px;">Total Marks</th>
          </tr>
        </thead>
        <tbody>
          ${candidateRows}
        </tbody>
      </table>

      <div class="signatures">
        <div class="signature-block">
          <p>SIGNATURE OF MEMBER 1</p>
          <div class="signature-line"></div>
        </div>
        <div class="signature-block">
          <p>SIGNATURE OF MEMBER 2</p>
          <div class="signature-line"></div>
        </div>
        <div class="signature-block">
          <p>SIGNATURE OF MEMBER 3</p>
          <div class="signature-line"></div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateAnnualReportPDFHTML = () => {
  const { date } = getCurrentDateTime();

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Recruitment Summary</title>
      <style>
        @media print {
          @page { margin: 1cm; }
          body { margin: 0; }
        }
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 5px 0;
          font-size: 15px;
          font-weight: bold;
        }
        .header h2 {
          margin: 5px 0;
          font-size: 13px;
        }
        .header h3 {
          margin: 5px 0;
          font-size: 12px;
        }
        .logo {
          text-align: center;
          margin-bottom: 15px;
        }
        .venue-info {
          text-align: center;
          margin: 20px 0;
          font-size: 12px;
          font-weight: bold;
        }
        .exam-info {
          text-align: center;
          margin: 10px 0;
          font-size: 12px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 12px;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        th {
          font-weight: bold;
          background-color: #f0f0f0;
        }
        .total-col {
          text-align: center;
          font-weight: bold;
        }
        .section-header {
          background-color: #e8e8e8;
          font-weight: bold;
        }
        .remarks-row {
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="logo">
        <p style="font-size: 14px; font-weight: bold;">🏛️ पुणे पुलिस  🏛️</p>
      </div>

      <div class="header">
        <h1>OFFICE OF THE COMMISSIONER OF POLICE</h1>
        <h1>PUNE CITY</h1>
        <h2>PRISON CONSTABLE(WEST REGION) RECRUITMENT 22-23 (For Driver P.C.)</h2>
        <h3>Physical Endurance & Measurement Test (PE&MT) of various posts on requirement basis in Police Department</h3>
        <h2 style="margin-top: 10px;">Recruitment Summary</h2>
      </div>

      <div class="venue-info">
        Venue Name : Police Head Quarter, Opp. Rahul Cinema, Shivajinagar, Pune-411016
      </div>

      <div class="exam-info">
        <strong>Exam Date : ${date}</strong><br>
        <strong>Scheduled Candidates for the Day : 500</strong>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 80px;">Sl. No.</th>
            <th>Description</th>
            <th style="width: 100px;" class="total-col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="total-col">1</td>
            <td>Total Number of Candidates Appeared for the Day</td>
            <td class="total-col">487</td>
          </tr>
          <tr>
            <td class="total-col">2</td>
            <td>Total Number of Candidates Absent for the Day</td>
            <td class="total-col">13</td>
          </tr>
          <tr>
            <td class="total-col">3</td>
            <td>Total Number of Candidates Qualified for the Day</td>
            <td class="total-col">342</td>
          </tr>
          <tr>
            <td class="total-col">4</td>
            <td>Total Number of Candidates Disqualified for the Day</td>
            <td class="total-col">145</td>
          </tr>
          <tr>
            <td class="total-col section-header">5</td>
            <td class="section-header">Height and Chest</td>
            <td class="section-header"></td>
          </tr>
          <tr>
            <td class="total-col">5.1</td>
            <td style="padding-left: 20px;">Qualified</td>
            <td class="total-col">342</td>
          </tr>
          <tr>
            <td class="total-col">5.2</td>
            <td style="padding-left: 20px;">Disqualified</td>
            <td class="total-col">89</td>
          </tr>
          <tr>
            <td class="total-col">5.3</td>
            <td style="padding-left: 20px;">Chest Disqualified</td>
            <td class="total-col">28</td>
          </tr>
          <tr>
            <td class="total-col">5.4</td>
            <td style="padding-left: 20px;">Height Disqualified</td>
            <td class="total-col">61</td>
          </tr>
          <tr>
            <td class="total-col section-header">6</td>
            <td class="section-header">Document Verification</td>
            <td class="section-header"></td>
          </tr>
          <tr>
            <td class="total-col">6.1</td>
            <td style="padding-left: 20px;">Qualified</td>
            <td class="total-col">320</td>
          </tr>
          <tr>
            <td class="total-col">6.2</td>
            <td style="padding-left: 20px;">Disqualified</td>
            <td class="total-col">22</td>
          </tr>
          <tr>
            <td class="total-col">7</td>
            <td>Total Number of Candidates Qualified for Physical Test</td>
            <td class="total-col">320</td>
          </tr>
          <tr>
            <td class="total-col">8</td>
            <td>Total Number of Candidates Qualified for Physical Test having marks greater than equal to 25</td>
            <td class="total-col">278</td>
          </tr>
          <tr>
            <td class="total-col">9</td>
            <td class="remarks-row">Remarks</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 40px; font-size: 11px;">
        <p><strong>Note:</strong> This is an auto-generated summary report for the recruitment process.</p>
      </div>
    </body>
    </html>
  `;
};
