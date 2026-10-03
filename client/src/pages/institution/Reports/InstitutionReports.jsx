import { useMemo, useState } from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Download,
  FileBarChart,
  FileText,
  GraduationCap,
  PieChart,
  Plus,
  Printer,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import "./InstitutionReports.css";

const reportGroups = {
  students: [
    {
      id: 1,
      title: "Student List",
      description: "Complete list of students with details.",
      icon: Users,
      color: "blue",
    },
    {
      id: 2,
      title: "Department-wise Report",
      description: "Student distribution by department.",
      icon: BarChart3,
      color: "cyan",
    },
    {
      id: 3,
      title: "Batch-wise Report",
      description: "Students by academic batch.",
      icon: ClipboardList,
      color: "orange",
    },
    {
      id: 4,
      title: "Skill Distribution",
      description: "Overall student skill distribution.",
      icon: PieChart,
      color: "green",
    },
    {
      id: 5,
      title: "Skill Gap Report",
      description: "Identify gaps across student skills.",
      icon: Sparkles,
      color: "violet",
    },
    {
      id: 6,
      title: "Internship Report",
      description: "Internship statistics and records.",
      icon: BriefcaseBusiness,
      color: "orange",
    },
    {
      id: 7,
      title: "Placement Report",
      description: "Placement drive and results.",
      icon: FileBarChart,
      color: "violet",
    },
    {
      id: 8,
      title: "Company Engagement",
      description: "Company collaboration details.",
      icon: Building2,
      color: "blue",
    },
    {
      id: 9,
      title: "Custom Report",
      description: "Create your own report.",
      icon: FileText,
      color: "cyan",
    },
  ],

  skills: [
    {
      id: 10,
      title: "Skill Distribution",
      description: "Overall skill distribution.",
      icon: PieChart,
      color: "green",
    },
    {
      id: 11,
      title: "Skill Gap Report",
      description: "Identify skill gaps across students.",
      icon: Sparkles,
      color: "violet",
    },
    {
      id: 12,
      title: "Department Skill Report",
      description: "Compare skills across departments.",
      icon: BarChart3,
      color: "blue",
    },
    {
      id: 13,
      title: "Industry Demand Report",
      description: "Compare student skills with industry demand.",
      icon: Building2,
      color: "orange",
    },
    {
      id: 14,
      title: "Emerging Skills",
      description: "Track growing and emerging skills.",
      icon: Sparkles,
      color: "cyan",
    },
    {
      id: 15,
      title: "Skill Coverage",
      description: "View skill coverage across programs.",
      icon: GraduationCap,
      color: "green",
    },
  ],

  internships: [
    {
      id: 16,
      title: "Internship Report",
      description: "Internship opportunities and records.",
      icon: BriefcaseBusiness,
      color: "orange",
    },
    {
      id: 17,
      title: "Internship Applications",
      description: "Student internship applications.",
      icon: ClipboardList,
      color: "blue",
    },
    {
      id: 18,
      title: "Internship Outcomes",
      description: "Track internship completion and outcomes.",
      icon: FileBarChart,
      color: "green",
    },
    {
      id: 19,
      title: "Company Internship Report",
      description: "Internships offered by companies.",
      icon: Building2,
      color: "cyan",
    },
    {
      id: 20,
      title: "Internship Trends",
      description: "Analyze internship activity over time.",
      icon: BarChart3,
      color: "violet",
    },
    {
      id: 21,
      title: "Custom Internship Report",
      description: "Create a customized internship report.",
      icon: FileText,
      color: "orange",
    },
  ],

  placements: [
    {
      id: 22,
      title: "Placement Report",
      description: "Placement drives and results.",
      icon: FileBarChart,
      color: "violet",
    },
    {
      id: 23,
      title: "Placement Applications",
      description: "Applications submitted by students.",
      icon: ClipboardList,
      color: "blue",
    },
    {
      id: 24,
      title: "Shortlisted Students",
      description: "Students shortlisted by companies.",
      icon: Users,
      color: "green",
    },
    {
      id: 25,
      title: "Company Placement Report",
      description: "Placement activity by company.",
      icon: Building2,
      color: "cyan",
    },
    {
      id: 26,
      title: "Placement Trends",
      description: "Track placement trends across batches.",
      icon: BarChart3,
      color: "orange",
    },
    {
      id: 27,
      title: "Placement Records",
      description: "Maintain completed placement records.",
      icon: FileText,
      color: "blue",
    },
  ],
};

const tabs = [
  {
    id: "students",
    label: "Student Reports",
  },
  {
    id: "skills",
    label: "Skill Reports",
  },
  {
    id: "internships",
    label: "Internship Reports",
  },
  {
    id: "placements",
    label: "Placement Reports",
  },
];

export default function InstitutionReports() {
  const [activeTab, setActiveTab] = useState("students");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Reports");
  const [isCustomReportOpen, setIsCustomReportOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const currentReports = reportGroups[activeTab];

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return currentReports.filter((report) => {
      const matchesSearch =
        !query ||
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Reports" ||
        report.title.includes(category);

      return matchesSearch && matchesCategory;
    });
  }, [activeTab, search, category, currentReports]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearch("");
    setCategory("All Reports");
  };

  return (
    <div className="institution-reports-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="institution-reports-header">

        <div>
          <p className="institution-reports-eyebrow">
            ANALYTICS & RECORDS
          </p>

          <h1>Reports</h1>

          <p>
            Generate and download reports for analysis
            and record keeping.
          </p>
        </div>

        <button
          type="button"
          className="institution-custom-report-button"
          onClick={() => setIsCustomReportOpen(true)}
        >
          <Plus size={16} />
          Custom Report
        </button>

      </section>


      {/* =================================================
          TABS
      ================================================= */}

      <nav className="institution-reports-tabs">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={
              activeTab === tab.id
                ? "active"
                : ""
            }
            onClick={() =>
              handleTabChange(tab.id)
            }
          >
            {tab.label}
          </button>
        ))}

      </nav>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <section className="institution-reports-toolbar">

        <div className="institution-reports-search">

          <Search size={16} />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search reports..."
          />

        </div>


        <div className="institution-report-filter">

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="All Reports">
              All Reports
            </option>

            <option value="Student">
              Student
            </option>

            <option value="Skill">
              Skill
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Placement">
              Placement
            </option>

            <option value="Company">
              Company
            </option>
          </select>

          <ChevronDown size={14} />

        </div>

      </section>


      {/* =================================================
          REPORT GRID
      ================================================= */}

      <section className="institution-report-grid">

        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onGenerate={setSelectedReport}
            />
          ))
        ) : (
          <div className="institution-report-empty">

            <FileBarChart size={28} />

            <strong>
              No reports found
            </strong>

            <span>
              Try changing your search or filter.
            </span>

          </div>
        )}

      </section>


      {/* =================================================
          REPORT INFO
      ================================================= */}

      <section className="institution-report-info">

        <div className="institution-report-info-icon">
          <CalendarDays size={19} />
        </div>

        <div>
          <strong>
            Reports are generated from your
            institution data
          </strong>

          <span>
            Once backend data is connected, generated
            reports will reflect live students, skills,
            internships and placement records.
          </span>
        </div>

      </section>

      {isCustomReportOpen && (
        <CustomReportModal
          activeTab={activeTab}
          onClose={() => setIsCustomReportOpen(false)}
        />
      )}

      {selectedReport && (
        <GeneratedReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

    </div>
  );
}


/* =========================================================
   REPORT CARD
========================================================= */

function ReportCard({ report, onGenerate }) {
  const Icon = report.icon;

  return (
    <article className="institution-report-card">

      <div
        className={`institution-report-icon ${report.color}`}
      >
        <Icon size={20} />
      </div>


      <div className="institution-report-card-content">

        <h2>{report.title}</h2>

        <p>
          {report.description}
        </p>

      </div>


      <button
        type="button"
        className="institution-generate-report"
        onClick={() => onGenerate(report)}
      >
        Generate Report
      </button>

    </article>
  );
}

/* =========================================================
   CUSTOM REPORT MODAL
========================================================= */

function CustomReportModal({ activeTab, onClose }) {
  const [reportName, setReportName] = useState("");
  const [source, setSource] = useState(
    activeTab === "students"
      ? "Student Reports"
      : activeTab === "skills"
      ? "Skill Reports"
      : activeTab === "internships"
      ? "Internship Reports"
      : "Placement Reports"
  );
  const [format, setFormat] = useState("HTML");
  const [selectedFields, setSelectedFields] = useState([
    "Report Summary",
    "Generated Date",
    "Source Category",
  ]);

  const fields = [
    "Report Summary",
    "Generated Date",
    "Source Category",
    "Institution Overview",
    "Student Statistics",
    "Skill Statistics",
    "Internship Statistics",
    "Placement Statistics",
    "Company Engagement",
  ];

  const toggleField = (field) => {
    setSelectedFields((current) =>
      current.includes(field)
        ? current.filter((item) => item !== field)
        : [...current, field]
    );
  };

  const handleGenerate = () => {
    const finalName =
      reportName.trim() || "NEXORA Custom Report";

    downloadReport({
      title: finalName,
      description:
        "Custom report configuration generated from the NEXORA Institution Reports module.",
      source,
      format,
      fields: selectedFields,
    });

    onClose();
  };

  return (
    <div
      className="institution-report-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="institution-report-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="custom-report-title"
      >
        <header className="institution-report-modal-header">
          <div>
            <span>CUSTOM REPORT BUILDER</span>
            <h2 id="custom-report-title">Create Custom Report</h2>
            <p>
              Choose the report source, output format and information to
              include.
            </p>
          </div>

          <button
            type="button"
            className="institution-report-modal-close"
            onClick={onClose}
            aria-label="Close custom report"
          >
            <X size={18} />
          </button>
        </header>

        <div className="institution-report-modal-body">

          <label className="institution-report-form-field">
            <span>Report Name</span>
            <input
              type="text"
              value={reportName}
              onChange={(event) => setReportName(event.target.value)}
              placeholder="e.g. 2026 Placement Overview"
            />
          </label>

          <div className="institution-report-form-grid">

            <label className="institution-report-form-field">
              <span>Source</span>
              <select
                value={source}
                onChange={(event) => setSource(event.target.value)}
              >
                <option>Student Reports</option>
                <option>Skill Reports</option>
                <option>Internship Reports</option>
                <option>Placement Reports</option>
              </select>
            </label>

            <label className="institution-report-form-field">
              <span>Format</span>
              <select
                value={format}
                onChange={(event) => setFormat(event.target.value)}
              >
                <option>HTML</option>
                <option>CSV</option>
                <option>JSON</option>
              </select>
            </label>

          </div>

          <div className="institution-report-fields">
            <div className="institution-report-fields-header">
              <div>
                <strong>Include in report</strong>
                <span>
                  {selectedFields.length} field
                  {selectedFields.length === 1 ? "" : "s"} selected
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFields([...fields])}
              >
                Select all
              </button>
            </div>

            <div className="institution-report-field-list">
              {fields.map((field) => {
                const checked = selectedFields.includes(field);

                return (
                  <button
                    type="button"
                    key={field}
                    className={`institution-report-field-option ${
                      checked ? "selected" : ""
                    }`}
                    onClick={() => toggleField(field)}
                  >
                    <span className="institution-report-check">
                      {checked && <Check size={13} />}
                    </span>
                    {field}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        <footer className="institution-report-modal-footer">
          <button
            type="button"
            className="institution-report-secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="institution-report-primary-button"
            disabled={selectedFields.length === 0}
            onClick={handleGenerate}
          >
            <Download size={14} />
            Generate & Download
          </button>
        </footer>
      </section>
    </div>
  );
}


/* =========================================================
   GENERATED REPORT MODAL
========================================================= */

function GeneratedReportModal({ report, onClose }) {
  const handleDownload = () => {
    downloadReport({
      title: report.title,
      description: report.description,
      source: "NEXORA Institution Reports",
      format: "HTML",
      fields: [
        "Report Summary",
        "Generated Date",
        "Source Category",
      ],
    });
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=900,height=700");

    if (!printWindow) {
      return;
    }

    const generatedDate = new Date().toLocaleString();

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${escapeHtml(report.title)}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #172033;
            }
            h1 {
              margin-bottom: 8px;
            }
            .meta {
              color: #64748b;
              margin-bottom: 24px;
            }
            .box {
              border: 1px solid #dbe3ee;
              border-radius: 10px;
              padding: 18px;
              margin-top: 18px;
            }
          </style>
        </head>
        <body>
          <h1>${escapeHtml(report.title)}</h1>
          <div class="meta">
            Generated: ${escapeHtml(generatedDate)}
          </div>
          <p>${escapeHtml(report.description)}</p>
          <div class="box">
            <strong>Data source</strong>
            <p>
              NEXORA Institution Reports. Live institution data will be
              supplied here after backend/API integration.
            </p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div
      className="institution-report-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="institution-report-modal institution-generated-report-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="generated-report-title"
      >
        <header className="institution-report-modal-header">
          <div>
            <span>REPORT READY</span>
            <h2 id="generated-report-title">{report.title}</h2>
            <p>{report.description}</p>
          </div>

          <button
            type="button"
            className="institution-report-modal-close"
            onClick={onClose}
            aria-label="Close generated report"
          >
            <X size={18} />
          </button>
        </header>

        <div className="institution-generated-report-preview">
          <div className="institution-generated-report-preview-icon">
            <FileBarChart size={28} />
          </div>

          <strong>{report.title}</strong>

          <span>
            Report generated in the frontend preview layer.
          </span>

          <small>
            Current page does not have backend/live report data yet, so
            this preview contains the report definition and metadata.
          </small>
        </div>

        <footer className="institution-report-modal-footer">
          <button
            type="button"
            className="institution-report-secondary-button"
            onClick={handlePrint}
          >
            <Printer size={14} />
            Print / Save PDF
          </button>

          <button
            type="button"
            className="institution-report-primary-button"
            onClick={handleDownload}
          >
            <Download size={14} />
            Download Report
          </button>
        </footer>
      </section>
    </div>
  );
}


/* =========================================================
   REPORT DOWNLOAD HELPERS
========================================================= */

function downloadReport({
  title,
  description,
  source,
  format,
  fields,
}) {
  const safeTitle = title.trim() || "NEXORA Report";
  const timestamp = new Date().toLocaleString();

  if (format === "JSON") {
    const data = {
      reportTitle: safeTitle,
      description,
      source,
      generatedAt: timestamp,
      includedFields: fields,
      dataStatus:
        "Frontend report template. Connect backend APIs for live institution data.",
    };

    triggerDownload(
      JSON.stringify(data, null, 2),
      `${toFileName(safeTitle)}.json`,
      "application/json;charset=utf-8"
    );

    return;
  }

  if (format === "CSV") {
    const rows = [
      ["Report Title", safeTitle],
      ["Description", description],
      ["Source", source],
      ["Generated At", timestamp],
      ["Included Fields", fields.join(", ")],
      [
        "Data Status",
        "Frontend report template - backend data pending",
      ],
    ];

    const csv = rows
      .map((row) => row.map(csvEscape).join(","))
      .join("\\n");

    triggerDownload(
      csv,
      `${toFileName(safeTitle)}.csv`,
      "text/csv;charset=utf-8"
    );

    return;
  }

  const html = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(safeTitle)}</title>
  <style>
    body {
      margin: 0;
      padding: 40px;
      font-family: Arial, sans-serif;
      color: #172033;
      background: #ffffff;
    }
    main {
      max-width: 900px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 8px;
    }
    .meta {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .card {
      border: 1px solid #dbe3ee;
      border-radius: 12px;
      padding: 20px;
      margin-top: 16px;
    }
    li {
      margin: 7px 0;
    }
  </style>
</head>
<body>
  <main>
    <h1>${escapeHtml(safeTitle)}</h1>
    <div class="meta">
      Generated by NEXORA Institution Reports on ${escapeHtml(timestamp)}
    </div>

    <p>${escapeHtml(description)}</p>

    <div class="card">
      <strong>Source</strong>
      <p>${escapeHtml(source)}</p>
    </div>

    <div class="card">
      <strong>Included Fields</strong>
      <ul>
        ${fields
          .map((field) => `<li>${escapeHtml(field)}</li>`)
          .join("")}
      </ul>
    </div>

    <div class="card">
      <strong>Data Status</strong>
      <p>
        This is a frontend report template. Live institution data will be
        supplied after backend/API integration.
      </p>
    </div>
  </main>
</body>
</html>
  `.trim();

  triggerDownload(
    html,
    `${toFileName(safeTitle)}.html`,
    "text/html;charset=utf-8"
  );
}

function triggerDownload(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function csvEscape(value) {
  const text = String(value ?? "");

  if (/[",\\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function toFileName(value) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70) || "nexora-report"
  );
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
