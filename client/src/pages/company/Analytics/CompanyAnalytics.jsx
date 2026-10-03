import { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
  UserRoundCheck,
  X,
} from "lucide-react";

import "./CompanyAnalytics.css";

const monthlyData = [
  { month: "Apr", applications: 170, shortlisted: 92, interviews: 42, selected: 16 },
  { month: "May", applications: 215, shortlisted: 112, interviews: 58, selected: 20 },
  { month: "Jun", applications: 270, shortlisted: 145, interviews: 68, selected: 23 },
  { month: "Jul", applications: 345, shortlisted: 188, interviews: 82, selected: 25 },
  { month: "Aug", applications: 365, shortlisted: 255, interviews: 110, selected: 31 },
  { month: "Sep", applications: 292, shortlisted: 208, interviews: 76, selected: 28 },
];

const skillData = [
  { skill: "JavaScript", percentage: 68 },
  { skill: "React", percentage: 62 },
  { skill: "Python", percentage: 48 },
  { skill: "Node.js", percentage: 42 },
  { skill: "Java", percentage: 36 },
  { skill: "Cloud", percentage: 28 },
  { skill: "Docker", percentage: 24 },
];

const opportunityData = [
  {
    role: "Frontend Developer Intern",
    applications: 420,
    shortlisted: 118,
    interviews: 42,
    selected: 12,
    conversion: "2.9%",
  },
  {
    role: "Backend Developer",
    applications: 318,
    shortlisted: 86,
    interviews: 27,
    selected: 8,
    conversion: "2.5%",
  },
  {
    role: "Full Stack Developer",
    applications: 286,
    shortlisted: 74,
    interviews: 19,
    selected: 5,
    conversion: "1.7%",
  },
  {
    role: "Data Analyst Intern",
    applications: 216,
    shortlisted: 46,
    interviews: 12,
    selected: 3,
    conversion: "1.4%",
  },
];

const skillTrendData = [
  { skill: "JavaScript", current: 68, change: "+8%" },
  { skill: "React", current: 62, change: "+6%" },
  { skill: "Python", current: 48, change: "+11%" },
  { skill: "Node.js", current: 42, change: "+5%" },
  { skill: "Java", current: 36, change: "-2%" },
  { skill: "Cloud", current: 28, change: "+14%" },
  { skill: "Docker", current: 24, change: "+9%" },
];

const periodOptions = [
  "Last 6 Months",
  "Last 3 Months",
  "Last 12 Months",
  "This Year",
];

const reportCards = [
  {
    title: "Recruitment Performance",
    description: "Track applications, shortlisting and hiring conversion.",
    icon: TrendingUp,
    type: "Recruitment",
  },
  {
    title: "Opportunity Performance",
    description: "Compare applications and hiring outcomes by opportunity.",
    icon: BriefcaseBusiness,
    type: "Opportunities",
  },
  {
    title: "Skill Trends",
    description: "Understand the most common skills among applicants.",
    icon: BarChart3,
    type: "Skills",
  },
  {
    title: "College Talent Report",
    description: "Review talent sourced through connected colleges.",
    icon: GraduationCap,
    type: "Colleges",
  },
];

function buildLinePath(data, key, width, height, padding, maxValue) {
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  return data
    .map((item, index) => {
      const x =
        padding.left +
        (index * chartWidth) / Math.max(data.length - 1, 1);

      const y =
        padding.top +
        chartHeight -
        (item[key] / maxValue) * chartHeight;

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildPoints(data, key, width, height, padding, maxValue) {
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  return data.map((item, index) => ({
    x:
      padding.left +
      (index * chartWidth) / Math.max(data.length - 1, 1),
    y:
      padding.top +
      chartHeight -
      (item[key] / maxValue) * chartHeight,
  }));
}

export default function CompanyAnalytics() {
  const [activeTab, setActiveTab] = useState("Recruitment Analytics");
  const [period, setPeriod] = useState("Last 6 Months");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [activeReport, setActiveReport] = useState(null);
  const periodRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (periodRef.current && !periodRef.current.contains(event.target)) {
        setPeriodOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const visibleMonthlyData = useMemo(() => {
    if (period === "Last 3 Months") {
      return monthlyData.slice(-3);
    }

    return monthlyData;
  }, [period]);

  const totalApplications = visibleMonthlyData.reduce(
    (sum, item) => sum + item.applications,
    0
  );

  const latestMonth = visibleMonthlyData[visibleMonthlyData.length - 1];

  const maxValue = Math.max(400, ...visibleMonthlyData.map((item) => item.applications));
  const chartWidth = 760;
  const chartHeight = 300;
  const padding = {
    top: 24,
    right: 20,
    bottom: 45,
    left: 45,
  };

  const chartLines = useMemo(
    () => [
      {
        key: "applications",
        label: "Applications",
        className: "applications",
      },
      {
        key: "shortlisted",
        label: "Shortlisted",
        className: "shortlisted",
      },
      {
        key: "interviews",
        label: "Interviews",
        className: "interviews",
      },
      {
        key: "selected",
        label: "Selected",
        className: "selected",
      },
    ],
    []
  );

  return (
    <div className="company-analytics-page">
      <header className="company-analytics-header">
        <div>
          <span className="company-analytics-eyebrow">
            <BarChart3 size={15} />
            Company Intelligence
          </span>

          <h1>Analytics & Reports</h1>

          <p>
            Understand recruitment performance, talent trends and hiring
            outcomes.
          </p>
        </div>

        <div className="company-analytics-header-actions">
          <div
            className={`company-analytics-select-wrap ${
              periodOpen ? "open" : ""
            }`}
            ref={periodRef}
          >
            <CalendarDays size={16} />

            <button
              type="button"
              className="company-analytics-select-trigger"
              aria-expanded={periodOpen}
              onClick={() => setPeriodOpen((open) => !open)}
            >
              <span>{period}</span>
              <ChevronDown size={15} />
            </button>

            {periodOpen && (
              <div className="company-analytics-period-menu">
                {periodOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={option === period ? "active" : ""}
                    onClick={() => {
                      setPeriod(option);
                      setPeriodOpen(false);
                    }}
                  >
                    <span>{option}</span>
                    {option === period && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="company-analytics-export-btn"
            onClick={() => {
              const rows = [
                ["Metric", "Value"],
                ["Period", period],
                ["Total Applications", totalApplications],
                ["Shortlisted", "324"],
                ["Interviews", "86"],
                ["Selected", "28"],
                [],
                ["Skill", "Applicant Share"],
                ...skillData.map((item) => [item.skill, `${item.percentage}%`]),
              ];

              const csv = rows
                .map((row) =>
                  row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(",")
                )
                .join("\n");

              const blob = new Blob([csv], {
                type: "text/csv;charset=utf-8;",
              });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `nexora-analytics-${period
                .toLowerCase()
                .replace(/\s+/g, "-")}.csv`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }}
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </header>

      <div className="company-analytics-tabs">
        {[
          "Recruitment Analytics",
          "Opportunity-wise",
          "Skill Trends",
          "Reports",
        ].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Recruitment Analytics" && (
        <>
          <section className="company-analytics-kpis">
            <div className="company-analytics-kpi-card blue">
              <div className="company-analytics-kpi-icon">
                <Users size={20} />
              </div>

              <div className="company-analytics-kpi-content">
                <span>Total Applications</span>
                <strong>1,240</strong>
                <small className="positive">
                  <TrendingUp size={13} />
                  18% from previous period
                </small>
              </div>
            </div>

            <div className="company-analytics-kpi-card green">
              <div className="company-analytics-kpi-icon">
                <UserRoundCheck size={20} />
              </div>

              <div className="company-analytics-kpi-content">
                <span>Shortlisted</span>
                <strong>324</strong>
                <small className="positive">
                  <TrendingUp size={13} />
                  12% from previous period
                </small>
              </div>
            </div>

            <div className="company-analytics-kpi-card orange">
              <div className="company-analytics-kpi-icon">
                <CalendarDays size={20} />
              </div>

              <div className="company-analytics-kpi-content">
                <span>Interviews</span>
                <strong>86</strong>
                <small className="positive">
                  <TrendingUp size={13} />
                  9% from previous period
                </small>
              </div>
            </div>

            <div className="company-analytics-kpi-card violet">
              <div className="company-analytics-kpi-icon">
                <BriefcaseBusiness size={20} />
              </div>

              <div className="company-analytics-kpi-content">
                <span>Selected</span>
                <strong>28</strong>
                <small className="positive">
                  <TrendingUp size={13} />
                  5% from previous period
                </small>
              </div>
            </div>
          </section>

          <section className="company-analytics-main-grid">
            <div className="company-analytics-panel company-analytics-chart-panel">
              <div className="company-analytics-panel-header">
                <div>
                  <h2>Applications Trend</h2>
                  <p>Recruitment activity over the selected period.</p>
                </div>

                <span className="company-analytics-period-label">
                  {period}
                </span>
              </div>

              <div className="company-analytics-chart">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Applications trend chart"
                >
                  {[0, 100, 200, 300, 400].map((value) => {
                    const chartHeightInner =
                      chartHeight - padding.top - padding.bottom;

                    const y =
                      padding.top +
                      chartHeightInner -
                      (value / maxValue) * chartHeightInner;

                    return (
                      <g key={value}>
                        <line
                          x1={padding.left}
                          x2={chartWidth - padding.right}
                          y1={y}
                          y2={y}
                          className="company-analytics-grid-line"
                        />

                        <text
                          x={padding.left - 10}
                          y={y + 4}
                          textAnchor="end"
                          className="company-analytics-axis-label"
                        >
                          {value}
                        </text>
                      </g>
                    );
                  })}

                  {visibleMonthlyData.map((item, index) => {
                    const chartWidthInner =
                      chartWidth - padding.left - padding.right;

                    const x =
                      padding.left +
                      (index * chartWidthInner) /
                        Math.max(visibleMonthlyData.length - 1, 1);

                    return (
                      <text
                        key={item.month}
                        x={x}
                        y={chartHeight - 15}
                        textAnchor="middle"
                        className="company-analytics-axis-label"
                      >
                        {item.month}
                      </text>
                    );
                  })}

                  {chartLines.map((line) => {
                    const points = buildPoints(
                      visibleMonthlyData,
                      line.key,
                      chartWidth,
                      chartHeight,
                      padding,
                      maxValue
                    );

                    return (
                      <g key={line.key}>
                        <path
                          d={buildLinePath(
                            visibleMonthlyData,
                            line.key,
                            chartWidth,
                            chartHeight,
                            padding,
                            maxValue
                          )}
                          className={`company-analytics-line ${line.className}`}
                          fill="none"
                        />

                        {points.map((point, index) => (
                          <circle
                            key={`${line.key}-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            className={`company-analytics-point ${line.className}`}
                          />
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="company-analytics-chart-legend">
                {chartLines.map((line) => (
                  <span key={line.key}>
                    <i className={line.className} />
                    {line.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="company-analytics-panel company-analytics-skills-panel">
              <div className="company-analytics-panel-header">
                <div>
                  <h2>Top Skills in Applicants</h2>
                  <p>Most frequently represented skills.</p>
                </div>
              </div>

              <div className="company-analytics-skills">
                {skillData.map((item) => (
                  <div className="company-analytics-skill-row" key={item.skill}>
                    <div className="company-analytics-skill-top">
                      <span>{item.skill}</span>
                      <strong>{item.percentage}%</strong>
                    </div>

                    <div className="company-analytics-skill-track">
                      <span
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="company-analytics-bottom-grid">
            <div className="company-analytics-panel">
              <div className="company-analytics-panel-header">
                <div>
                  <h2>Hiring Conversion</h2>
                  <p>Candidate movement through the hiring funnel.</p>
                </div>
              </div>

              <div className="company-analytics-conversion">
                <div>
                  <span>Applications</span>
                  <strong>1,240</strong>
                  <small>100%</small>
                </div>

                <div>
                  <span>Shortlisted</span>
                  <strong>324</strong>
                  <small>26.1%</small>
                </div>

                <div>
                  <span>Interviewed</span>
                  <strong>86</strong>
                  <small>6.9%</small>
                </div>

                <div>
                  <span>Selected</span>
                  <strong>28</strong>
                  <small>2.3%</small>
                </div>
              </div>
            </div>

            <div className="company-analytics-panel">
              <div className="company-analytics-panel-header">
                <div>
                  <h2>Latest Recruitment Activity</h2>
                  <p>Current period summary.</p>
                </div>
              </div>

              <div className="company-analytics-activity">
                <div>
                  <Users size={18} />
                  <span>
                    New applications
                    <strong>{latestMonth.applications}</strong>
                  </span>
                </div>

                <div>
                  <UserRoundCheck size={18} />
                  <span>
                    Candidates shortlisted
                    <strong>{latestMonth.shortlisted}</strong>
                  </span>
                </div>

                <div>
                  <CalendarDays size={18} />
                  <span>
                    Interviews conducted
                    <strong>{latestMonth.interviews}</strong>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="company-analytics-data-note">
            <BarChart3 size={16} />
            <span>
              Analytics shown here are based on the current company workspace
              data. More detailed insights will become available as recruitment
              activity grows.
            </span>
          </div>
        </>
      )}

      {activeTab === "Opportunity-wise" && (
        <section className="company-analytics-opportunity-section">
          <div className="company-analytics-section-heading">
            <div>
              <span className="company-analytics-section-eyebrow">
                <BriefcaseBusiness size={15} />
                Opportunity performance
              </span>
              <h2>Opportunity-wise Analytics</h2>
              <p>
                Compare candidate movement and hiring outcomes across your
                active opportunities.
              </p>
            </div>
          </div>

          <div className="company-analytics-opportunity-grid">
            {opportunityData.map((item) => (
              <article
                className="company-analytics-opportunity-card"
                key={item.role}
              >
                <div className="company-analytics-opportunity-title">
                  <div className="company-analytics-report-icon">
                    <BriefcaseBusiness size={18} />
                  </div>
                  <div>
                    <h3>{item.role}</h3>
                    <span>{item.applications} applications</span>
                  </div>
                </div>

                <div className="company-analytics-opportunity-metrics">
                  <div>
                    <span>Shortlisted</span>
                    <strong>{item.shortlisted}</strong>
                  </div>
                  <div>
                    <span>Interviews</span>
                    <strong>{item.interviews}</strong>
                  </div>
                  <div>
                    <span>Selected</span>
                    <strong>{item.selected}</strong>
                  </div>
                  <div>
                    <span>Selection rate</span>
                    <strong>{item.conversion}</strong>
                  </div>
                </div>

                <div className="company-analytics-opportunity-bar">
                  <span
                    style={{
                      width: `${Math.min(
                        100,
                        (item.selected / item.applications) * 100 * 8
                      )}%`,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "Skill Trends" && (
        <section className="company-analytics-skill-trends-section">
          <div className="company-analytics-section-heading">
            <div>
              <span className="company-analytics-section-eyebrow">
                <BarChart3 size={15} />
                Talent skill intelligence
              </span>
              <h2>Skill Trends</h2>
              <p>
                See which skills are most represented and how their applicant
                share is changing.
              </p>
            </div>
          </div>

          <div className="company-analytics-skill-trends-grid">
            <div className="company-analytics-panel">
              <div className="company-analytics-panel-header">
                <div>
                  <h2>Most Represented Skills</h2>
                  <p>Applicant share by skill.</p>
                </div>
              </div>

              <div className="company-analytics-skills">
                {skillTrendData.map((item) => (
                  <div className="company-analytics-skill-row" key={item.skill}>
                    <div className="company-analytics-skill-top">
                      <span>{item.skill}</span>
                      <strong>{item.current}%</strong>
                    </div>

                    <div className="company-analytics-skill-track">
                      <span style={{ width: `${item.current}%` }} />
                    </div>

                    <div className="company-analytics-skill-change">
                      <span>vs previous period</span>
                      <strong
                        className={
                          item.change.startsWith("-") ? "negative" : "positive"
                        }
                      >
                        {item.change}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="company-analytics-panel company-analytics-insight-panel">
              <div className="company-analytics-panel-header">
                <div>
                  <h2>Skill Insights</h2>
                  <p>Useful signals from current applicant data.</p>
                </div>
              </div>

              <div className="company-analytics-insight-list">
                <div>
                  <span className="company-analytics-insight-icon blue">
                    <TrendingUp size={16} />
                  </span>
                  <div>
                    <strong>Fastest growth</strong>
                    <p>Cloud is up 14% from the previous period.</p>
                  </div>
                </div>

                <div>
                  <span className="company-analytics-insight-icon green">
                    <Users size={16} />
                  </span>
                  <div>
                    <strong>Strongest representation</strong>
                    <p>JavaScript appears in 68% of applicant profiles.</p>
                  </div>
                </div>

                <div>
                  <span className="company-analytics-insight-icon violet">
                    <BriefcaseBusiness size={16} />
                  </span>
                  <div>
                    <strong>Hiring signal</strong>
                    <p>
                      Full Stack and Backend roles show consistent technical
                      skill coverage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "Reports" && (
        <section className="company-analytics-reports">
          <div className="company-analytics-reports-header">
            <div>
              <h2>Reports</h2>
              <p>Generate structured recruitment reports for your company.</p>
            </div>
          </div>

          <div className="company-analytics-report-grid">
            {reportCards.map((report) => {
              const Icon = report.icon;

              return (
                <div
                  className="company-analytics-report-card"
                  key={report.title}
                >
                  <div className="company-analytics-report-icon">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3>{report.title}</h3>
                    <p>{report.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveReport(report)}
                  >
                    <FileText size={15} />
                    View Report
                    <ChevronRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {activeReport && (
        <div
          className="company-analytics-report-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveReport(null);
            }
          }}
        >
          <div
            className="company-analytics-report-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeReport.title} report`}
          >
            <div className="company-analytics-report-modal-header">
              <div>
                <span className="company-analytics-section-eyebrow">
                  <FileText size={14} />
                  Generated report
                </span>
                <h2>{activeReport.title}</h2>
                <p>{activeReport.description}</p>
              </div>

              <button
                type="button"
                className="company-analytics-modal-close"
                onClick={() => setActiveReport(null)}
                aria-label="Close report"
              >
                <X size={17} />
              </button>
            </div>

            <div className="company-analytics-report-summary">
              <div>
                <span>Period</span>
                <strong>{period}</strong>
              </div>
              <div>
                <span>Applications</span>
                <strong>{totalApplications.toLocaleString()}</strong>
              </div>
              <div>
                <span>Shortlisted</span>
                <strong>324</strong>
              </div>
              <div>
                <span>Selected</span>
                <strong>28</strong>
              </div>
            </div>

            <div className="company-analytics-report-modal-body">
              <h3>Report overview</h3>
              {activeReport.type === "Recruitment" && (
                <p>
                  Recruitment activity currently tracks {totalApplications}{" "}
                  applications, 324 shortlisted candidates, 86 interviews and
                  28 selections for the selected period.
                </p>
              )}
              {activeReport.type === "Opportunities" && (
                <p>
                  Opportunity performance can be reviewed using the
                  Opportunity-wise tab, including application volume,
                  shortlisting, interviews and selection conversion.
                </p>
              )}
              {activeReport.type === "Skills" && (
                <p>
                  Skill analysis highlights JavaScript, React, Python and
                  Node.js as the most represented technical skills in the
                  current applicant dataset.
                </p>
              )}
              {activeReport.type === "Colleges" && (
                <p>
                  College talent reporting can be used to review applicants
                  sourced through connected academic institutions.
                </p>
              )}
            </div>

            <div className="company-analytics-report-modal-footer">
              <button
                type="button"
                className="company-analytics-modal-secondary"
                onClick={() => setActiveReport(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="company-analytics-modal-primary"
                onClick={() => {
                  setActiveReport(null);
                  const rows = [
                    ["Report", activeReport.title],
                    ["Period", period],
                    ["Applications", totalApplications],
                    ["Shortlisted", 324],
                    ["Interviews", 86],
                    ["Selected", 28],
                  ];
                  const csv = rows
                    .map((row) =>
                      row
                        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                        .join(",")
                    )
                    .join("\n");
                  const blob = new Blob([csv], {
                    type: "text/csv;charset=utf-8;",
                  });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `${activeReport.type.toLowerCase()}-report.csv`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
              >
                <Download size={15} />
                Export This Report
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="company-analytics-footer-stat">
        <span>
          Total applications tracked
          <strong>{totalApplications.toLocaleString()}</strong>
        </span>

        <span>
          Current period
          <strong>{period}</strong>
        </span>
      </div>
    </div>
  );
}