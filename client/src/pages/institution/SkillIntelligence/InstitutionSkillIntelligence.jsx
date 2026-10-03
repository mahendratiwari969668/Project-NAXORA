import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  ChevronDown,
  CircleAlert,
  Code2,
  Database,
  Layers3,
  PieChart,
  TrendingUp,
} from "lucide-react";

import "./InstitutionSkillIntelligence.css";

const skills = [
  {
    name: "JavaScript",
    students: "1,420",
    percentage: 62,
    color: "blue",
  },
  {
    name: "Python",
    students: "1,180",
    percentage: 54,
    color: "violet",
  },
  {
    name: "Java",
    students: "920",
    percentage: 48,
    color: "orange",
  },
  {
    name: "React",
    students: "680",
    percentage: 39,
    color: "green",
  },
  {
    name: "Node.js",
    students: "430",
    percentage: 27,
    color: "red",
  },
  {
    name: "Cloud",
    students: "210",
    percentage: 21,
    color: "yellow",
  },
  {
    name: "Docker",
    students: "180",
    percentage: 17,
    color: "cyan",
  },
  {
    name: "TypeScript",
    students: "160",
    percentage: 15,
    color: "purple",
  },
  {
    name: "Data Analytics",
    students: "140",
    percentage: 13,
    color: "pink",
  },
  {
    name: "Cybersecurity",
    students: "120",
    percentage: 11,
    color: "lime",
  },
];

const distribution = [
  {
    name: "JavaScript",
    percentage: 62,
    color: "#2563eb",
  },
  {
    name: "Python",
    percentage: 54,
    color: "#7c3aed",
  },
  {
    name: "Java",
    percentage: 48,
    color: "#f97316",
  },
  {
    name: "React",
    percentage: 39,
    color: "#16a34a",
  },
  {
    name: "Others",
    percentage: 32,
    color: "#f5b942",
  },
];

const trendingSkills = [
  {
    name: "Cloud Computing",
    growth: "40%",
    direction: "up",
    icon: Layers3,
    color: "blue",
  },
  {
    name: "Data Analytics",
    growth: "32%",
    direction: "up",
    icon: BarChart3,
    color: "violet",
  },
  {
    name: "DevOps",
    growth: "20%",
    direction: "down",
    icon: Database,
    color: "red",
  },
  {
    name: "TypeScript",
    growth: "26%",
    direction: "up",
    icon: Code2,
    color: "green",
  },
];

const departments = [
  "All Departments",
  "BCA",
  "BBA",
  "MCA",
  "B.Tech",
];

const academicYears = [
  "2025-26",
  "2026-27",
  "2027-28",
];

const tabs = [
  "Skill Overview",
  "Skill Gaps",
  "Department Analysis",
  "Industry Demand",
];

const skillGaps = [
  {
    skill: "Cloud Computing",
    available: "210",
    required: "480",
    gap: "270",
    severity: "High",
  },
  {
    skill: "Data Analytics",
    available: "140",
    required: "310",
    gap: "170",
    severity: "High",
  },
  {
    skill: "Cybersecurity",
    available: "120",
    required: "250",
    gap: "130",
    severity: "Medium",
  },
  {
    skill: "DevOps",
    available: "95",
    required: "190",
    gap: "95",
    severity: "Medium",
  },
];

const departmentAnalysis = [
  {
    department: "BCA",
    students: "1,180",
    topSkill: "JavaScript",
    profileCoverage: "78%",
  },
  {
    department: "BBA",
    students: "620",
    topSkill: "Data Analytics",
    profileCoverage: "64%",
  },
  {
    department: "MCA",
    students: "410",
    topSkill: "Python",
    profileCoverage: "84%",
  },
  {
    department: "B.Tech",
    students: "270",
    topSkill: "Java",
    profileCoverage: "81%",
  },
];

const industryDemand = [
  {
    role: "Full Stack Developer",
    demand: "High",
    skills: "JavaScript, React, Node.js",
    students: "430",
  },
  {
    role: "Data Analyst",
    demand: "High",
    skills: "Python, SQL, Data Analytics",
    students: "260",
  },
  {
    role: "Cloud Engineer",
    demand: "Growing",
    skills: "Cloud, Docker, DevOps",
    students: "150",
  },
  {
    role: "Cybersecurity Analyst",
    demand: "Growing",
    skills: "Cybersecurity, Python, Linux",
    students: "120",
  },
];

export default function InstitutionSkillIntelligence() {
  const [activeTab, setActiveTab] = useState("Skill Overview");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedYear, setSelectedYear] = useState("2025-26");

  const filteredDepartmentAnalysis = useMemo(() => {
    if (selectedDepartment === "All Departments") {
      return departmentAnalysis;
    }

    return departmentAnalysis.filter(
      (item) => item.department === selectedDepartment
    );
  }, [selectedDepartment]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const renderSkillOverview = () => (
    <section className="institution-skill-overview">
      <div className="institution-skill-panel institution-skill-table-panel">
        <div className="institution-skill-panel-header">
          <div>
            <h2>Skill Overview</h2>
            <p>
              Distribution of skills among your students.
            </p>
          </div>
          <BarChart3 size={19} />
        </div>

        <div className="institution-skill-table">
          <div className="institution-skill-table-head">
            <span>Skill</span>
            <span>No. of Students</span>
            <span>Percentage</span>
          </div>

          {skills.map((skill) => (
            <div
              className="institution-skill-row"
              key={skill.name}
            >
              <div className="institution-skill-name">
                <span className="institution-skill-dot" />
                {skill.name}
              </div>

              <span className="institution-skill-students">
                {skill.students}
              </span>

              <div className="institution-skill-percentage">
                <div className="institution-skill-bar">
                  <div
                    className={`skill-bar-fill ${skill.color}`}
                    style={{
                      width: `${skill.percentage}%`,
                    }}
                  />
                </div>

                <span>{skill.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="institution-skill-side">
        <div className="institution-skill-panel">
          <div className="institution-skill-panel-header">
            <div>
              <h2>Student Skill Distribution</h2>
            </div>
            <PieChart size={19} />
          </div>

          <div className="institution-donut-section">
            <div
              className="institution-donut"
              aria-label="Student skill distribution"
            >
              <div className="institution-donut-inner">
                <strong>2,480</strong>
                <span>Students</span>
              </div>
            </div>

            <div className="institution-donut-legend">
              {distribution.map((item) => (
                <div
                  className="institution-donut-item"
                  key={item.name}
                >
                  <span
                    className="institution-donut-color"
                    style={{
                      background: item.color,
                    }}
                  />
                  <span className="institution-donut-name">
                    {item.name}
                  </span>
                  <strong>{item.percentage}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="institution-skill-panel institution-trending-panel">
          <div className="institution-skill-panel-header">
            <div>
              <h2>Trending Skills</h2>
              <p>Last 3 months</p>
            </div>
            <TrendingUp size={19} />
          </div>

          <div className="institution-trending-list">
            {trendingSkills.map((skill) => {
              const Icon = skill.icon;

              return (
                <div
                  className="institution-trending-item"
                  key={skill.name}
                >
                  <div
                    className={`institution-trending-icon ${skill.color}`}
                  >
                    <Icon size={16} />
                  </div>

                  <span>{skill.name}</span>

                  <div
                    className={`institution-trending-growth ${skill.direction}`}
                  >
                    {skill.direction === "up" ? (
                      <ArrowUp size={13} />
                    ) : (
                      <ArrowDown size={13} />
                    )}
                    {skill.growth}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  const renderSkillGaps = () => (
    <section className="institution-skill-tab-panel">
      <div className="institution-skill-panel">
        <div className="institution-skill-panel-header">
          <div>
            <h2>Skill Gaps</h2>
            <p>
              Compare currently available skills with expected industry
              requirements.
            </p>
          </div>
          <CircleAlert size={19} />
        </div>

        <div className="institution-analysis-table">
          <div className="institution-analysis-head">
            <span>Skill</span>
            <span>Available</span>
            <span>Required</span>
            <span>Gap</span>
            <span>Priority</span>
          </div>

          {skillGaps.map((item) => (
            <div
              className="institution-analysis-row"
              key={item.skill}
            >
              <strong>{item.skill}</strong>
              <span>{item.available}</span>
              <span>{item.required}</span>
              <span>{item.gap}</span>
              <span
                className={`institution-analysis-badge ${item.severity.toLowerCase()}`}
              >
                {item.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderDepartmentAnalysis = () => (
    <section className="institution-skill-tab-panel">
      <div className="institution-skill-panel">
        <div className="institution-skill-panel-header">
          <div>
            <h2>Department Analysis</h2>
            <p>
              Compare student skill coverage across departments.
            </p>
          </div>
          <BarChart3 size={19} />
        </div>

        <div className="institution-analysis-table">
          <div className="institution-analysis-head department-head">
            <span>Department</span>
            <span>Students</span>
            <span>Top Skill</span>
            <span>Profile Coverage</span>
          </div>

          {filteredDepartmentAnalysis.map((item) => (
            <div
              className="institution-analysis-row department-row"
              key={item.department}
            >
              <strong>{item.department}</strong>
              <span>{item.students}</span>
              <span>{item.topSkill}</span>
              <span className="institution-analysis-coverage">
                {item.profileCoverage}
              </span>
            </div>
          ))}

          {filteredDepartmentAnalysis.length === 0 && (
            <div className="institution-analysis-empty">
              No department data available for this selection.
            </div>
          )}
        </div>
      </div>
    </section>
  );

  const renderIndustryDemand = () => (
    <section className="institution-skill-tab-panel">
      <div className="institution-skill-panel">
        <div className="institution-skill-panel-header">
          <div>
            <h2>Industry Demand</h2>
            <p>
              Current opportunity areas based on connected industry
              requirements.
            </p>
          </div>
          <TrendingUp size={19} />
        </div>

        <div className="institution-analysis-table">
          <div className="institution-analysis-head industry-head">
            <span>Role</span>
            <span>Demand</span>
            <span>Required Skills</span>
            <span>Matching Students</span>
          </div>

          {industryDemand.map((item) => (
            <div
              className="institution-analysis-row industry-row"
              key={item.role}
            >
              <strong>{item.role}</strong>

              <span
                className={`institution-analysis-badge ${item.demand === "High" ? "high" : "medium"}`}
              >
                {item.demand}
              </span>

              <span>{item.skills}</span>
              <span>{item.students}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="institution-skill-page">
      <section className="institution-skill-header">
        <div>
          <p className="institution-skill-eyebrow">
            SKILL INTELLIGENCE
          </p>

          <h1>Skill Intelligence</h1>

          <p>
            Understand the skills available across your student
            ecosystem and identify emerging demand.
          </p>
        </div>

        <div className="institution-skill-filters">
          <label className="institution-skill-filter">
            <select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              aria-label="Select department"
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <ChevronDown size={15} />
          </label>

          <label className="institution-skill-filter">
            <select
              value={selectedYear}
              onChange={handleYearChange}
              aria-label="Select academic year"
            >
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown size={15} />
          </label>
        </div>
      </section>

      <nav
        className="institution-skill-tabs"
        aria-label="Skill intelligence sections"
      >
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => handleTabChange(tab)}
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="institution-skill-tab-content">
        {activeTab === "Skill Overview" && renderSkillOverview()}
        {activeTab === "Skill Gaps" && renderSkillGaps()}
        {activeTab === "Department Analysis" &&
          renderDepartmentAnalysis()}
        {activeTab === "Industry Demand" && renderIndustryDemand()}
      </div>

      <section className="institution-skill-info">
        <div className="institution-skill-info-icon">
          <CircleAlert size={18} />
        </div>

        <div>
          <strong>Skill intelligence is data-driven</strong>

          <p>
            These insights will be generated from student profiles,
            resumes, projects, certifications and verified skill
            information once connected to the institution backend.
            Current values are frontend demo data.
          </p>
        </div>
      </section>
    </div>
  );
}
