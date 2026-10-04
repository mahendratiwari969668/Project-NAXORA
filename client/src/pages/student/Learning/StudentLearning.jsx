import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  Clock3,
  Play,
  Search,
  Target,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import "./StudentLearning.css";
const learningTabs = [
  "Recommendations",
  "Learning Roadmap",
  "Saved Resources",
];

const courses = [
  {
    id: 1,
    title: "Complete JavaScript Course",
    provider: "Programming Fundamentals",
    level: "Beginner",
    duration: "10 hours",
    rating: "4.8",
    category: "JavaScript",
    tone: "blue",
    description:
      "Build a strong foundation in JavaScript and learn the concepts required to create modern interactive web applications.",
    skills: [
      "JavaScript Fundamentals",
      "Variables & Data Types",
      "Functions",
      "Arrays & Objects",
      "DOM Manipulation",
      "Async JavaScript",
    ],
    modules: [
      "JavaScript Fundamentals",
      "Functions and Scope",
      "Arrays and Objects",
      "DOM Manipulation",
      "Events and Forms",
      "Asynchronous JavaScript",
    ],
  },

  {
    id: 2,
    title: "React for Beginners",
    provider: "Frontend Development",
    level: "Beginner",
    duration: "8 hours",
    rating: "4.7",
    category: "React",
    tone: "cyan",
    description:
      "Learn the fundamentals of React and understand how to build reusable, interactive and component-based user interfaces.",
    skills: [
      "React Components",
      "JSX",
      "Props",
      "State",
      "Hooks",
      "React Router",
    ],
    modules: [
      "React Fundamentals",
      "Components and JSX",
      "Props and State",
      "React Hooks",
      "Forms and Events",
      "React Router",
    ],
  },

  {
    id: 3,
    title: "Node.js Complete Guide",
    provider: "Backend Development",
    level: "Intermediate",
    duration: "12 hours",
    rating: "4.8",
    category: "Node.js",
    tone: "green",
    description:
      "Understand Node.js backend development and learn how to build server-side applications and APIs.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Middleware",
      "Authentication",
      "MongoDB",
    ],
    modules: [
      "Node.js Fundamentals",
      "Modules and NPM",
      "Express.js",
      "REST API Development",
      "Authentication",
      "Database Integration",
    ],
  },
]; 

const roadmap = [
  {
    title: "Master JavaScript",
    status: "Completed",
    state: "completed",
  },

  {
    title: "Learn TypeScript",
    status: "In Progress",
    state: "progress",
  },

  {
    title: "Build Projects",
    status: "Not Started",
    state: "upcoming",
  },

  {
    title: "Learn Docker",
    status: "Not Started",
    state: "upcoming",
  },
];

export default function StudentLearning() {
  const [activeTab, setActiveTab] =
    useState("Recommendations");

  const [search, setSearch] = useState("");

  const [savedCourses, setSavedCourses] = useState([]);

  const { resourceId } = useParams();

  const navigate = useNavigate();

  if (resourceId) {
    const course = courses.find(
      (item) => String(item.id) === String(resourceId)
    );

    if (!course) {
      return (
        <div className="student-learning-page">
          <main className="learning-main">
            <button
              type="button"
              className="learning-details-back"
              onClick={() =>
                navigate("/student/learning")
              }
            >
              <ArrowLeft size={17} />
              Back to Learning
            </button>

            <section className="learning-details-not-found">
              <div className="learning-details-not-found-icon">
                <BookOpen size={25} />
              </div>

              <h2>Learning resource not found</h2>

              <p>
                The learning resource you are looking for
                could not be found.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/student/learning")
                }
              >
                Back to Learning
              </button>
            </section>
          </main>
        </div>
      );
    }

    return (
      <div className="student-learning-page">
        <main className="learning-main">


          <button
            type="button"
            className="learning-details-back"
            onClick={() =>
              navigate("/student/learning")
            }
          >
            <ArrowLeft size={17} />
            Back to Learning
          </button>

          <section className="learning-details-card">

            {/* HEADER */}

            <div className="learning-details-header">

              <div
                className={`learning-details-icon ${course.tone}`}
              >
                <BookOpen size={30} />
              </div>

              <div className="learning-details-heading">

                <span className="learning-details-level">
                  {course.level}
                </span>

                <h1>{course.title}</h1>

                <p>{course.provider}</p>

                <div className="learning-details-meta">

                  <span>
                    <Clock3 size={15} />
                    {course.duration}
                  </span>

                  <span>
                    <span className="learning-star">
                      ★
                    </span>
                    {course.rating}
                  </span>

                  <span>
                    {course.category}
                  </span>

                </div>
              </div>

            </div>

            {/* DESCRIPTION */}

            <section className="learning-details-section">

              <span className="learning-details-eyebrow">
                ABOUT THIS RESOURCE
              </span>

              <h2>What you'll learn</h2>

              <p className="learning-details-description">
                {course.description}
              </p>

            </section>

            {/* SKILLS */}

            <section className="learning-details-section">

              <span className="learning-details-eyebrow">
                SKILLS COVERED
              </span>

              <h2>Key skills</h2>

              <div className="learning-details-skills">

                {course.skills.map((skill) => (
                  <span key={skill}>
                    <Check size={14} />
                    {skill}
                  </span>
                ))}

              </div>

            </section>

            {/* MODULES */}

            <section className="learning-details-section">

              <span className="learning-details-eyebrow">
                COURSE CONTENT
              </span>

              <h2>Learning modules</h2>

              <div className="learning-modules">

                {course.modules.map(
                  (module, index) => (
                    <div
                      className="learning-module"
                      key={module}
                    >
                      <div className="learning-module-number">
                        {index + 1}
                      </div>

                      <div>
                        <strong>
                          {module}
                        </strong>

                        <span>
                          Learning module
                        </span>
                      </div>

                      <ArrowRight size={17} />
                    </div>
                  )
                )}

              </div>

            </section>

            {/* START CTA */}

            <section className="learning-start-card">

              <div className="learning-start-icon">
                <Play size={21} />
              </div>

              <div>
                <span>READY TO START?</span>

                <h3>
                  Begin your learning journey
                </h3>

                <p>
                  Start exploring this resource and
                  build your skills step by step.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Learning session will be connected to the backend later."
                  )
                }
              >
                <Play size={16} />
                Start Learning
              </button>

            </section>

          </section>
        </main>
      </div>
    );
  }


  const visibleCourses = courses.filter((course) => {
    const value = search.toLowerCase().trim();

    return (
      !value ||
      course.title
        .toLowerCase()
        .includes(value) ||
      course.category
        .toLowerCase()
        .includes(value) ||
      course.provider
        .toLowerCase()
        .includes(value)
    );
  });


  const toggleSaved = (id) => {
    setSavedCourses((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };


  return (
    <div className="student-learning-page">
      <main className="learning-main">


        <section className="learning-heading">

          <div>

            <span className="learning-eyebrow">
              LEARNING HUB
            </span>

            <h1>Learning</h1>

            <p>
              Enhance your skills with personalized learning
              recommendations and a clear roadmap.
            </p>

          </div>

          <div className="learning-heading-status">
            <BookOpen size={17} />
            Learning workspace
          </div>

        </section>
        <div className="learning-search-wrapper">

          <div className="learning-search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search learning resources..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

        </div>


        <section className="learning-tabs-card">

          <div className="learning-tabs">

            {learningTabs.map((tab) => (
              <button
                type="button"
                key={tab}
                className={
                  activeTab === tab
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab(tab)
                }
              >
                {tab}
              </button>
            ))}

          </div>

        </section>


        {activeTab === "Recommendations" && (
          <section className="learning-recommendations">

            <section className="learning-section-heading">

              <div>

                <span>
                  PERSONALIZED LEARNING
                </span>

                <h2>
                  Recommended for You
                </h2>

              </div>

              <button type="button">
                View All
                <ArrowRight size={16} />
              </button>

            </section>

            <section className="learning-course-grid">

              {visibleCourses.map((course) => (
                <article
                  className="learning-course-card"
                  key={course.id}
                >

                  <div
                    className={`learning-course-icon ${course.tone}`}
                  >
                    <BookOpen size={22} />
                  </div>

                  <button
                    type="button"
                    className={`learning-save ${
                      savedCourses.includes(course.id)
                        ? "saved"
                        : ""
                    }`}
                    onClick={() =>
                      toggleSaved(course.id)
                    }
                    aria-label="Save resource"
                  >
                    <Bookmark
                      size={17}
                      fill={
                        savedCourses.includes(
                          course.id
                        )
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                  <div className="learning-course-content">

                    <span className="learning-course-level">
                      {course.level}
                    </span>

                    <h3>{course.title}</h3>

                    <p>{course.provider}</p>

                    <div className="learning-course-meta">

                      <span>
                        <span className="learning-star">
                          ★
                        </span>

                        {course.rating}
                      </span>

                      <span>
                        <Clock3 size={14} />
                        {course.duration}
                      </span>

                    </div>

                    <Link
                      to={`/student/learning/${course.id}`}
                      className="learning-course-button"
                    >
                      <Play size={15} />
                      Start Learning
                    </Link>

                  </div>

                </article>
              ))}

            </section>

            {visibleCourses.length === 0 && (
              <div className="learning-empty-state">

                <Search size={25} />

                <h3>
                  No learning resources found
                </h3>

                <p>
                  Try searching for another skill or course.
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </button>

              </div>
            )}

          </section>
        )}

        {(activeTab === "Learning Roadmap" ||
          activeTab === "Recommendations") && (
          <section className="learning-roadmap-section">

            <div className="learning-section-heading">

              <div>

                <span>
                  YOUR LEARNING ROADMAP
                </span>

                <h2>
                  Your Learning Roadmap
                </h2>

                <p>
                  Based on your current career direction:
                  <strong>
                    {" "}
                    Full Stack Developer
                  </strong>
                </p>

              </div>

              <Target size={23} />

            </div>

            <div className="learning-roadmap">

              {roadmap.map((item, index) => (
                <div
                  className={`roadmap-step ${item.state}`}
                  key={item.title}
                >

                  <div className="roadmap-step-top">

                    <div className="roadmap-dot">

                      {item.state === "completed" ? (
                        <Check size={15} />
                      ) : (
                        index + 1
                      )}

                    </div>

                    {index < roadmap.length - 1 && (
                      <div
                        className={`roadmap-line ${
                          roadmap[index + 1].state !==
                          "upcoming"
                            ? "filled"
                            : ""
                        }`}
                      />
                    )}

                  </div>

                  <h3>{item.title}</h3>

                  <span
                    className={`roadmap-status ${item.state}`}
                  >
                    {item.status}
                  </span>

                </div>
              ))}

            </div>

          </section>
        )}

        {activeTab === "Saved Resources" && (
          <section className="learning-saved-section">

            <div className="learning-section-heading">

              <div>

                <span>
                  SAVED RESOURCES
                </span>

                <h2>
                  Your Saved Resources
                </h2>

                <p>
                  Keep useful learning resources here for
                  quick access later.
                </p>

              </div>

              <Bookmark size={23} />

            </div>

            {courses.filter((course) =>
              savedCourses.includes(course.id)
            ).length > 0 ? (
              <div className="learning-course-grid">

                {courses
                  .filter((course) =>
                    savedCourses.includes(course.id)
                  )
                  .map((course) => (
                    <article
                      className="learning-course-card"
                      key={course.id}
                    >

                      <div
                        className={`learning-course-icon ${course.tone}`}
                      >
                        <BookOpen size={22} />
                      </div>

                      <div className="learning-course-content">

                        <span className="learning-course-level">
                          {course.level}
                        </span>

                        <h3>{course.title}</h3>

                        <p>{course.provider}</p>

                        <div className="learning-course-meta">

                          <span>
                            <span className="learning-star">
                              ★
                            </span>

                            {course.rating}
                          </span>

                          <span>
                            <Clock3 size={14} />
                            {course.duration}
                          </span>

                        </div>

                        <Link
                          to={`/student/learning/${course.id}`}
                          className="learning-course-button"
                        >
                          <Play size={15} />
                          Start Learning
                        </Link>

                      </div>

                    </article>
                  ))}

              </div>
            ) : (
              <div className="learning-empty-state">

                <Bookmark size={25} />

                <h3>
                  No saved resources yet
                </h3>

                <p>
                  Save useful courses and resources to find
                  them here later.
                </p>

              </div>
            )}

          </section>
        )}


        <section className="learning-bottom-card">

          <div className="learning-bottom-icon">
            <Bookmark size={21} />
          </div>

          <div>

            <span>
              KEEP LEARNING
            </span>

            <h3>
              Build skills that move you forward
            </h3>

            <p>
              Save useful resources and keep your learning
              roadmap aligned with your career goals.
            </p>

          </div>

          <Link to="/student/skill-mapping">
            View Skill Mapping
            <ArrowRight size={16} />
          </Link>

        </section>

      </main>
    </div>
  );
}