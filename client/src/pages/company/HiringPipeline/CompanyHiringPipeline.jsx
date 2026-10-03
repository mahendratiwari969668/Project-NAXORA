import { useMemo, useState } from "react";
import {
  ChevronDown,
  MoreVertical,
  UserRound,
} from "lucide-react";

import "./CompanyHiringPipeline.css";

const initialCandidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    education: "BCA",
    year: "2027",
    stage: "Applied",
  },
  {
    id: 2,
    name: "Priya Singh",
    education: "B.Tech",
    year: "2025",
    stage: "Applied",
  },
  {
    id: 3,
    name: "Neha Yadav",
    education: "B.Tech",
    year: "2026",
    stage: "Applied",
  },
  {
    id: 4,
    name: "Aman Kumar",
    education: "BCA",
    year: "2027",
    stage: "Applied",
  },
  {
    id: 5,
    name: "Karan Mishra",
    education: "BCA",
    year: "2027",
    stage: "Under Review",
  },
  {
    id: 6,
    name: "Sneha Verma",
    education: "B.Tech",
    year: "2026",
    stage: "Under Review",
  },
  {
    id: 7,
    name: "Rohit Kumar",
    education: "BCA",
    year: "2027",
    stage: "Under Review",
  },
  {
    id: 8,
    name: "Vikash Tiwari",
    education: "BCA",
    year: "2027",
    stage: "Under Review",
  },
  {
    id: 9,
    name: "Aditya Gupta",
    education: "BCA",
    year: "2027",
    stage: "Shortlisted",
  },
  {
    id: 10,
    name: "Anjali Patel",
    education: "BCA",
    year: "2007",
    stage: "Shortlisted",
  },
  {
    id: 11,
    name: "Raj Mehta",
    education: "BCA",
    year: "2027",
    stage: "Shortlisted",
  },
  {
    id: 12,
    name: "Simran Kaur",
    education: "BCA",
    year: "2006",
    stage: "Shortlisted",
  },
  {
    id: 13,
    name: "Rahul Sharma",
    education: "BCA",
    year: "2027",
    stage: "Interview",
  },
  {
    id: 14,
    name: "Priya Singh",
    education: "B.Tech",
    year: "2006",
    stage: "Interview",
  },
  {
    id: 15,
    name: "Aman Kumar",
    education: "BCA",
    year: "2027",
    stage: "Interview",
  },
  {
    id: 16,
    name: "Neha Yadav",
    education: "B.Tech",
    year: "2006",
    stage: "Interview",
  },
  {
    id: 17,
    name: "Karan Mishra",
    education: "BCA",
    year: "2027",
    stage: "Selected",
  },
  {
    id: 18,
    name: "Sneha Verma",
    education: "MCA",
    year: "2006",
    stage: "Selected",
  },
  {
    id: 19,
    name: "Vikash Tiwari",
    education: "BCA",
    year: "2027",
    stage: "Selected",
  },
];

const stages = [
  {
    key: "Applied",
    label: "Applied",
    color: "blue",
  },
  {
    key: "Under Review",
    label: "Under Review",
    color: "cyan",
  },
  {
    key: "Shortlisted",
    label: "Shortlisted",
    color: "purple",
  },
  {
    key: "Interview",
    label: "Interview",
    color: "orange",
  },
  {
    key: "Selected",
    label: "Selected",
    color: "green",
  },
];

const stageLimits = {
  Applied: 4,
  "Under Review": 4,
  Shortlisted: 4,
  Interview: 4,
  Selected: 4,
};
const opportunityOptions = [
  "Frontend Developer Intern",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst Intern",
  "DevOps Engineer",
];

export default function CompanyHiringPipeline() {
  const [candidates, setCandidates] = useState(
    initialCandidates
  );

  const [selectedOpportunity, setSelectedOpportunity] =
    useState("Frontend Developer Intern");

  const [openOpportunityMenu, setOpenOpportunityMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const stageData = useMemo(() => {
    return stages.map((stage) => ({
      ...stage,
      candidates: candidates.filter(
        (candidate) =>
          candidate.stage === stage.key
      ),
    }));
  }, [candidates]);

  const totalApplications = candidates.length;

  const reviewCount = candidates.filter(
    (candidate) =>
      candidate.stage === "Under Review"
  ).length;

  const shortlistedCount = candidates.filter(
    (candidate) =>
      candidate.stage === "Shortlisted"
  ).length;

  const interviewCount = candidates.filter(
    (candidate) =>
      candidate.stage === "Interview"
  ).length;

  const selectedCount = candidates.filter(
    (candidate) =>
      candidate.stage === "Selected"
  ).length;

  const moveCandidate = (candidateId, newStage) => {
    setCandidates((current) =>
      current.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              stage: newStage,
            }
          : candidate
      )
    );

    setOpenMenu(null);
  };

  return (
    <main
      className="company-pipeline-page"
      onClick={() => {
        setOpenMenu(null);
        setOpenOpportunityMenu(false);
      }}
    >
      {/* HEADER */}
      <div className="company-pipeline-header">
        <div>
          <p className="company-pipeline-eyebrow">
            HIRING MANAGEMENT
          </p>

          <h1>Hiring Pipeline</h1>

          <p>
            Track candidates through every stage of your
            hiring process.
          </p>
        </div>

        {/* OPPORTUNITY SELECTOR */}
        <div
          className={`company-pipeline-opportunity ${
            openOpportunityMenu ? "is-open" : ""
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="company-pipeline-opportunity-trigger"
            onClick={() =>
              setOpenOpportunityMenu((open) => !open)
            }
            aria-haspopup="listbox"
            aria-expanded={openOpportunityMenu}
          >
            <span>{selectedOpportunity}</span>
            <ChevronDown
              size={15}
              className={
                openOpportunityMenu
                  ? "company-pipeline-opportunity-chevron open"
                  : "company-pipeline-opportunity-chevron"
              }
            />
          </button>

          {openOpportunityMenu && (
            <div
              className="company-pipeline-opportunity-menu"
              role="listbox"
              aria-label="Select opportunity"
            >
              {opportunityOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selectedOpportunity === option}
                  className={
                    selectedOpportunity === option ? "active" : ""
                  }
                  onClick={() => {
                    setSelectedOpportunity(option);
                    setOpenOpportunityMenu(false);
                  }}
                >
                  <span>{option}</span>
                  {selectedOpportunity === option && (
                    <span className="company-pipeline-opportunity-check">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* STATS */}
      <section className="company-pipeline-stats">
        <PipelineStat
          icon="applications"
          value={totalApplications}
          label="Total Applications"
        />

        <PipelineStat
          icon="review"
          value={reviewCount}
          label="In Review"
        />

        <PipelineStat
          icon="shortlisted"
          value={shortlistedCount}
          label="Shortlisted"
        />

        <PipelineStat
          icon="interview"
          value={interviewCount}
          label="Interviews"
        />

        <PipelineStat
          icon="selected"
          value={selectedCount}
          label="Selected"
        />
      </section>

      {/* PIPELINE BOARD */}
      <section className="company-pipeline-board">
        {stageData.map((stage) => {
          const visibleCandidates =
            stage.candidates.slice(
              0,
              stageLimits[stage.key]
            );

          const remaining =
            stage.candidates.length -
            visibleCandidates.length;

          return (
            <div
              key={stage.key}
              className={`company-pipeline-column ${stage.color}`}
            >
              {/* COLUMN HEADER */}
              <div className="company-pipeline-column-header">
                <div className="company-pipeline-column-title">
                  <span
                    className="company-pipeline-column-dot"
                  />

                  <strong>{stage.label}</strong>

                  <span className="company-pipeline-count">
                    {stage.candidates.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="company-pipeline-column-menu"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <MoreVertical size={15} />
                </button>
              </div>

              {/* CANDIDATES */}
              <div className="company-pipeline-candidates">
                {visibleCandidates.map(
                  (candidate) => (
                    <CandidatePipelineCard
                      key={candidate.id}
                      candidate={candidate}
                      stages={stages}
                      openMenu={openMenu}
                      setOpenMenu={setOpenMenu}
                      moveCandidate={
                        moveCandidate
                      }
                    />
                  )
                )}

                {stage.candidates.length === 0 && (
                  <div className="company-pipeline-empty-column">
                    No candidates
                  </div>
                )}
              </div>

              {/* MORE */}
              {remaining > 0 && (
                <button
                  type="button"
                  className="company-pipeline-more"
                >
                  +{remaining} more
                </button>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}

function PipelineStat({
  icon,
  value,
  label,
}) {
  return (
    <div
      className={`company-pipeline-stat ${icon}`}
    >
      <div className="company-pipeline-stat-icon">
        {icon === "applications" && "▣"}
        {icon === "review" && "▤"}
        {icon === "shortlisted" && "◉"}
        {icon === "interview" && "◷"}
        {icon === "selected" && "✓"}
      </div>

      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function CandidatePipelineCard({
  candidate,
  stages,
  openMenu,
  setOpenMenu,
  moveCandidate,
}) {
  const menuOpen =
    openMenu === candidate.id;

  return (
    <article className="company-pipeline-candidate">
      <div
        className={`company-pipeline-avatar avatar-${candidate.id % 5}`}
      >
        <UserRound size={15} />
      </div>

      <div className="company-pipeline-candidate-info">
        <strong>{candidate.name}</strong>

        <span>
          {candidate.education} •{" "}
          {candidate.year}
        </span>
      </div>

      <div className="company-pipeline-card-actions">
        <button
          type="button"
          className={`company-pipeline-card-menu ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label={`Actions for ${candidate.name}`}
          aria-expanded={menuOpen}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setOpenMenu(
              menuOpen ? null : candidate.id
            );
          }}
        >
          <MoreVertical size={14} />
        </button>

        {menuOpen && (
          <div
            className="company-pipeline-move-menu"
            role="menu"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <span>Move to</span>

            {stages
              .filter(
                (stage) =>
                  stage.key !== candidate.stage
              )
              .map((stage) => (
                <button
                  key={stage.key}
                  type="button"
                  onClick={() =>
                    moveCandidate(
                      candidate.id,
                      stage.key
                    )
                  }
                >
                  {stage.label}
                </button>
              ))}
          </div>
        )}
      </div>
    </article>
  );
}