
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Target,
  X,
  Plus,
  Save,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./StudentSkillMapping.css";

/* =========================================================
   SECTION NAVIGATION
========================================================= */

const skillSections = [
  {
    label: "My Skills",
    icon: BarChart3,
    to: "/student/skill-mapping",
  },
  {
    label: "Assessment",
    icon: CheckCircle2,
    to: "/student/skill-mapping/assessment",
  },
  {
    label: "Skill Gap",
    icon: Target,
    to: "/student/skill-mapping/skill-gap",
  },
  {
    label: "Career Goals",
    icon: BriefcaseBusiness,
    to: "/student/skill-mapping/career-goals",
  },
];

/* =========================================================
   INITIAL SKILLS
========================================================= */

const initialSkillCategories = [
  {
    title: "Programming",
    description: "Languages and coding fundamentals",
    skills: ["C++", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Development",
    description: "Tools and development technologies",
    skills: ["React", "Node.js", "Express.js", "Git"],
  },
  {
    title: "Database",
    description: "Database and data management skills",
    skills: ["MongoDB", "SQL"],
  },
];

/* =========================================================
   CAREER OPTIONS
========================================================= */

const careerOptions = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Software Engineer",
  "Data Analyst",
  "Data Scientist",
  "UI/UX Designer",
  "Cyber Security",
];

/* =========================================================
   ASSESSMENT QUESTIONS
========================================================= */

const assessmentQuestions = {
  "C++": [
    {
      question: "Which keyword is used to define a class in C++?",
      options: ["object", "class", "struct", "define"],
      answer: "class",
    },
    {
      question: "Which symbol is used to access a member through an object?",
      options: ["->", ".", "::", "#"],
      answer: ".",
    },
    {
      question: "Which concept allows the same function name with different parameters?",
      options: [
        "Inheritance",
        "Encapsulation",
        "Function Overloading",
        "Abstraction",
      ],
      answer: "Function Overloading",
    },
    {
      question: "Which data structure follows LIFO?",
      options: ["Queue", "Stack", "Array", "Tree"],
      answer: "Stack",
    },
    {
      question: "Which operator is used for dynamic memory allocation?",
      options: ["malloc", "new", "alloc", "create"],
      answer: "new",
    },
  ],

  JavaScript: [
    {
      question: "Which keyword declares a block-scoped variable?",
      options: ["var", "let", "define", "constant"],
      answer: "let",
    },
    {
      question: "Which method converts JSON text into a JavaScript object?",
      options: [
        "JSON.parse()",
        "JSON.object()",
        "JSON.convert()",
        "JSON.read()",
      ],
      answer: "JSON.parse()",
    },
    {
      question: "Which symbol is commonly used for strict equality?",
      options: ["=", "==", "===", "!="],
      answer: "===",
    },
    {
      question: "Which method adds an element to the end of an array?",
      options: ["push()", "add()", "append()", "insert()"],
      answer: "push()",
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Document Order Model",
        "Digital Object Model",
      ],
      answer: "Document Object Model",
    },
  ],

  HTML: [
    {
      question: "Which tag is used for the largest heading?",
      options: ["<heading>", "<h6>", "<h1>", "<head>"],
      answer: "<h1>",
    },
    {
      question: "Which attribute is used to provide alternative text for an image?",
      options: ["title", "alt", "src", "text"],
      answer: "alt",
    },
    {
      question: "Which tag creates a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: "<a>",
    },
    {
      question: "Which tag is used to create an unordered list?",
      options: ["<ol>", "<li>", "<ul>", "<list>"],
      answer: "<ul>",
    },
    {
      question: "Which HTML element is used to create a form?",
      options: ["<input>", "<form>", "<fieldset>", "<data>"],
      answer: "<form>",
    },
  ],

  CSS: [
    {
      question: "Which property changes text color?",
      options: ["font-color", "text-color", "color", "foreground"],
      answer: "color",
    },
    {
      question: "Which CSS layout system is designed for one-dimensional layouts?",
      options: ["Grid", "Flexbox", "Float", "Position"],
      answer: "Flexbox",
    },
    {
      question: "Which property controls the space inside an element?",
      options: ["margin", "padding", "spacing", "inside"],
      answer: "padding",
    },
    {
      question: "Which selector targets an element with a specific class?",
      options: ["#class", ".class", "@class", "*class"],
      answer: ".class",
    },
    {
      question: "Which property changes the background color?",
      options: [
        "background-color",
        "bg-color",
        "background",
        "color-background",
      ],
      answer: "background-color",
    },
  ],

  React: [
    {
      question: "What is React primarily used for?",
      options: [
        "Database management",
        "Building user interfaces",
        "Operating systems",
        "Network configuration",
      ],
      answer: "Building user interfaces",
    },
    {
      question: "Which hook is commonly used for component state?",
      options: ["useData", "useState", "useValue", "useComponent"],
      answer: "useState",
    },
    {
      question: "Which syntax is commonly used to write UI inside JavaScript?",
      options: ["JSX", "XMLJS", "HTMLJS", "ReactHTML"],
      answer: "JSX",
    },
    {
      question: "Which hook is commonly used for side effects?",
      options: ["useEffect", "useSide", "useAction", "useEvent"],
      answer: "useEffect",
    },
    {
      question: "React components normally return what?",
      options: [
        "SQL",
        "UI elements",
        "Database records",
        "Server routes",
      ],
      answer: "UI elements",
    },
  ],

  "Node.js": [
    {
      question: "Node.js is built on which JavaScript engine?",
      options: ["SpiderMonkey", "V8", "Chakra", "JavaScriptCore"],
      answer: "V8",
    },
    {
      question: "Which command initializes a Node.js project?",
      options: ["node start", "npm init", "npm create", "node init"],
      answer: "npm init",
    },
    {
      question: "Which module is commonly used to create an HTTP server?",
      options: ["http", "server", "web", "request"],
      answer: "http",
    },
    {
      question: "What is npm?",
      options: [
        "Node Package Manager",
        "Node Programming Module",
        "New Project Manager",
        "Network Package Module",
      ],
      answer: "Node Package Manager",
    },
    {
      question: "Which file commonly stores Node.js project dependencies?",
      options: [
        "node.config",
        "package.json",
        "project.json",
        "dependencies.json",
      ],
      answer: "package.json",
    },
  ],

  "Express.js": [
    {
      question: "Express.js is commonly used with which runtime?",
      options: ["Python", "Node.js", "Java", "PHP"],
      answer: "Node.js",
    },
    {
      question: "Which method is commonly used to define a GET route?",
      options: ["app.get()", "app.fetch()", "app.routeGet()", "app.read()"],
      answer: "app.get()",
    },
    {
      question: "What is middleware in Express?",
      options: [
        "A database",
        "A function in the request-response cycle",
        "A CSS library",
        "A frontend component",
      ],
      answer: "A function in the request-response cycle",
    },
    {
      question: "Which object contains incoming request data?",
      options: ["req", "res", "app", "server"],
      answer: "req",
    },
    {
      question: "Which object is commonly used to send a response?",
      options: ["req", "res", "send", "responseData"],
      answer: "res",
    },
  ],

  Git: [
    {
      question: "Which command creates a new Git repository?",
      options: ["git create", "git init", "git new", "git start"],
      answer: "git init",
    },
    {
      question: "Which command downloads a remote repository?",
      options: ["git download", "git clone", "git pullall", "git copy"],
      answer: "git clone",
    },
    {
      question: "Which command records changes in the local repository?",
      options: ["git save", "git commit", "git record", "git push"],
      answer: "git commit",
    },
    {
      question: "Which command sends local commits to a remote repository?",
      options: ["git send", "git upload", "git push", "git publish"],
      answer: "git push",
    },
    {
      question: "Which command shows the current Git status?",
      options: ["git check", "git status", "git state", "git info"],
      answer: "git status",
    },
  ],

  MongoDB: [
    {
      question: "MongoDB is what type of database?",
      options: [
        "Relational",
        "Document-oriented NoSQL",
        "Graph",
        "Key-only",
      ],
      answer: "Document-oriented NoSQL",
    },
    {
      question: "What format is commonly associated with MongoDB documents?",
      options: ["HTML", "JSON-like BSON", "CSV", "XML only"],
      answer: "JSON-like BSON",
    },
    {
      question: "Which command is commonly used to display databases in MongoDB shell?",
      options: ["show dbs", "list dbs", "db list", "show databases only"],
      answer: "show dbs",
    },
    {
      question: "MongoDB stores data primarily as what?",
      options: ["Rows", "Documents", "Tables", "Cells"],
      answer: "Documents",
    },
    {
      question: "What is the default port of MongoDB?",
      options: ["3000", "3306", "27017", "8080"],
      answer: "27017",
    },
  ],

  SQL: [
    {
      question: "Which SQL command retrieves data?",
      options: ["GET", "SELECT", "FETCH", "READ"],
      answer: "SELECT",
    },
    {
      question: "Which command adds a new row?",
      options: ["ADD", "INSERT", "CREATE ROW", "APPEND"],
      answer: "INSERT",
    },
    {
      question: "Which clause filters records?",
      options: ["FILTER", "WHERE", "CHECK", "HAVING ONLY"],
      answer: "WHERE",
    },
    {
      question: "Which command modifies existing records?",
      options: ["CHANGE", "UPDATE", "MODIFY", "EDIT"],
      answer: "UPDATE",
    },
    {
      question: "Which command removes records?",
      options: ["REMOVE", "DELETE", "DROP ROW", "CLEAR"],
      answer: "DELETE",
    },
  ],
};


/* =========================================================
   FALLBACK QUESTIONS
========================================================= */

const fallbackQuestions = [
  {
    question: "How would you rate your understanding of this skill?",
    options: [
      "Beginner",
      "Basic",
      "Intermediate",
      "Advanced",
    ],
    answer: "Intermediate",
  },
  {
    question: "How often do you use this skill?",
    options: [
      "Rarely",
      "Sometimes",
      "Frequently",
      "Every day",
    ],
    answer: "Frequently",
  },
  {
    question: "Can you build a small project using this skill?",
    options: [
      "Not yet",
      "With help",
      "Yes, independently",
      "Yes, advanced projects",
    ],
    answer: "Yes, independently",
  },
  {
    question: "How comfortable are you debugging problems?",
    options: [
      "Not comfortable",
      "Somewhat comfortable",
      "Comfortable",
      "Very comfortable",
    ],
    answer: "Comfortable",
  },
  {
    question: "How would you describe your overall level?",
    options: [
      "Beginner",
      "Basic",
      "Intermediate",
      "Advanced",
    ],
    answer: "Intermediate",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function StudentSkillMapping() {
  const location = useLocation();

  const [skillCategories, setSkillCategories] = useState(
    initialSkillCategories
  );

  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("Programming");
  const [skillError, setSkillError] = useState("");

  const [careerGoal, setCareerGoal] = useState("");

  /* =======================================================
     ASSESSMENT STATE
  ======================================================= */

  const [selectedAssessmentSkill, setSelectedAssessmentSkill] =
    useState("");

  const [assessmentStarted, setAssessmentStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [assessmentCompleted, setAssessmentCompleted] =
    useState(false);

  const [assessmentScore, setAssessmentScore] = useState(0);

  const currentPath = location.pathname;

  const isMySkills = currentPath === "/student/skill-mapping";

  const isAssessment =
    currentPath === "/student/skill-mapping/assessment";

  const isSkillGap =
    currentPath === "/student/skill-mapping/skill-gap";

  const isCareerGoals =
    currentPath === "/student/skill-mapping/career-goals";

  /* =======================================================
     SKILL FUNCTIONS
  ======================================================= */

  const openAddSkill = () => {
    setSkillName("");
    setSkillCategory("Programming");
    setSkillError("");
    setIsAddSkillOpen(true);
  };

  const closeAddSkill = () => {
    setIsAddSkillOpen(false);
    setSkillName("");
    setSkillError("");
  };

  const handleAddSkill = (event) => {
    event.preventDefault();

    const trimmedSkill = skillName.trim();

    if (!trimmedSkill) {
      setSkillError("Please enter a skill.");
      return;
    }

    const alreadyExists = skillCategories.some((category) =>
      category.skills.some(
        (skill) =>
          skill.toLowerCase() === trimmedSkill.toLowerCase()
      )
    );

    if (alreadyExists) {
      setSkillError("This skill is already in your profile.");
      return;
    }

    setSkillCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.title === skillCategory
          ? {
              ...category,
              skills: [...category.skills, trimmedSkill],
            }
          : category
      )
    );

    closeAddSkill();
  };

  const handleRemoveSkill = (categoryTitle, skillToRemove) => {
    setSkillCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.title === categoryTitle
          ? {
              ...category,
              skills: category.skills.filter(
                (skill) => skill !== skillToRemove
              ),
            }
          : category
      )
    );
  };

  const totalSkills = skillCategories.reduce(
    (total, category) => total + category.skills.length,
    0
  );

  /* =======================================================
     ASSESSMENT FUNCTIONS
  ======================================================= */

  const getQuestionsForSkill = (skill) => {
    return assessmentQuestions[skill] || fallbackQuestions;
  };

  const currentAssessmentQuestions = getQuestionsForSkill(
    selectedAssessmentSkill
  );

  const currentAssessmentQuestion =
    currentAssessmentQuestions[currentQuestion];

  const startAssessment = (skill) => {
    setSelectedAssessmentSkill(skill);
    setAssessmentStarted(true);
    setAssessmentCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setAssessmentScore(0);
  };

  const selectAnswer = (answer) => {
    setSelectedAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion]: answer,
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < currentAssessmentQuestions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const submitAssessment = () => {
    let score = 0;

    currentAssessmentQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        score++;
      }
    });

    setAssessmentScore(score);
    setAssessmentCompleted(true);
  };

  const resetAssessment = () => {
    setSelectedAssessmentSkill("");
    setAssessmentStarted(false);
    setAssessmentCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setAssessmentScore(0);
  };

  const getAssessmentPercentage = () => {
    if (!currentAssessmentQuestions.length) return 0;

    return Math.round(
      (assessmentScore / currentAssessmentQuestions.length) * 100
    );
  };

  const getAssessmentLevel = () => {
    const percentage = getAssessmentPercentage();

    if (percentage >= 80) return "Advanced";
    if (percentage >= 60) return "Intermediate";
    if (percentage >= 40) return "Basic";

    return "Beginner";
  };

  /* =======================================================
     SECTION NAVIGATION
  ======================================================= */

  const renderSectionNavigation = () => (
    <aside className="skill-section-navigation">
      <div className="skill-section-nav-title">
        SKILL MAPPING
      </div>

      <nav>
        {skillSections.map(({ label, icon: Icon, to }) => {
          const active = currentPath === to;

          return (
            <Link
              key={label}
              to={to}
              className={`skill-section-nav-item ${
                active ? "active" : ""
              }`}
            >
              <Icon size={18} />

              <span>{label}</span>

              {active && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      <div className="skill-sidebar-tip">
        <div className="skill-tip-icon">
          <Lightbulb size={18} />
        </div>

        <strong>Build your skill profile</strong>

        <p>
          Keep your skills updated to get more relevant
          opportunities and learning recommendations.
        </p>
      </div>
    </aside>
  );

  /* =======================================================
     MY SKILLS
  ======================================================= */

  const renderMySkills = () => (
    <>
      <article className="skill-content-card">
        <div className="skill-card-header">
          <div>
            <span>MY SKILLS</span>

            <h2>Current Skills</h2>

            <p>
              Your technical and professional skills will appear
              here.
            </p>
          </div>

          <button
            type="button"
            className="skill-outline-button"
            onClick={openAddSkill}
          >
            <Plus size={16} />
            Add Skill
          </button>
        </div>

        <div className="skill-category-grid">
          {skillCategories.map((category) => (
            <div
              className="skill-category-card"
              key={category.title}
            >
              <div className="skill-category-icon">
                <BarChart3 size={20} />
              </div>

              <div className="skill-category-heading">
                <h3>{category.title}</h3>

                <p>{category.description}</p>
              </div>

              <div className="skill-tags">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag-with-remove"
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveSkill(
                          category.title,
                          skill
                        )
                      }
                      aria-label={`Remove ${skill}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="skill-assessment-card">
        <div className="skill-assessment-icon">
          <CheckCircle2 size={25} />
        </div>

        <div className="skill-assessment-content">
          <span>SKILL ASSESSMENT</span>

          <h2>Measure your current skill level</h2>

          <p>
            Take skill assessments to understand your current
            level and create stronger evidence for your profile.
          </p>
        </div>

        <Link
          to="/student/skill-mapping/assessment"
          className="skill-secondary-action"
        >
          Start Assessment
          <ArrowRight size={17} />
        </Link>
      </article>

      <article className="skill-gap-card">
        <div className="skill-gap-header">
          <div>
            <span>SKILL GAP</span>

            <h2>What should you learn next?</h2>

            <p>
              Compare your current skills with the skills
              required for your target career direction.
            </p>
          </div>

          <Target size={25} />
        </div>

        <div className="skill-gap-empty">
          <Target size={23} />

          <div>
            <strong>
              Complete your skill profile first
            </strong>

            <p>
              Your skill-gap analysis will appear here once
              your skills and career goals are added.
            </p>
          </div>
        </div>
      </article>
    </>
  );

  /* =======================================================
     ASSESSMENT SELECTION
  ======================================================= */

  const renderAssessmentSelection = () => (
    <article className="skill-content-card skill-feature-page">
      <div className="skill-feature-icon assessment-feature-icon">
        <CheckCircle2 size={28} />
      </div>

      <span>SKILL ASSESSMENT</span>

      <h2>Measure your current skill level.</h2>

      <p>
        Select one of your skills and take a short five-question
        assessment. Your result will give you an indicative
        proficiency level.
      </p>

      <div className="skill-assessment-options">
        {skillCategories.flatMap((category) =>
          category.skills.slice(0, 4).map((skill) => (
            <button
              type="button"
              key={skill}
              className="skill-assessment-option"
              onClick={() => startAssessment(skill)}
            >
              <span>{skill}</span>

              <ArrowRight size={15} />
            </button>
          ))
        )}
      </div>

      <div className="skill-info-box">
        <CheckCircle2 size={20} />

        <div>
          <strong>How it works</strong>

          <p>
            Choose a skill, answer five questions and get your
            score instantly. Results are currently stored only
            for this session.
          </p>
        </div>
      </div>
    </article>
  );

  /* =======================================================
     ACTIVE ASSESSMENT
  ======================================================= */

  const renderActiveAssessment = () => {
    const selectedAnswer = selectedAnswers[currentQuestion];

    const progress =
      ((currentQuestion + 1) /
        currentAssessmentQuestions.length) *
      100;

    return (
      <article className="skill-content-card skill-assessment-workspace">
        <div className="assessment-workspace-header">
          <button
            type="button"
            className="assessment-back-button"
            onClick={resetAssessment}
          >
            <ArrowLeft size={16} />
            Change Skill
          </button>

          <div className="assessment-skill-label">
            <span>ASSESSING</span>
            <strong>{selectedAssessmentSkill}</strong>
          </div>
        </div>

        <div className="assessment-progress-wrapper">
          <div className="assessment-progress-info">
            <span>
              Question {currentQuestion + 1} of{" "}
              {currentAssessmentQuestions.length}
            </span>

            <span>{Math.round(progress)}%</span>
          </div>

          <div className="assessment-progress-track">
            <div
              className="assessment-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="assessment-question">
          <span className="assessment-question-number">
            QUESTION {currentQuestion + 1}
          </span>

          <h2>
            {currentAssessmentQuestion.question}
          </h2>
        </div>

        <div className="assessment-answer-list">
          {currentAssessmentQuestion.options.map(
            (option, index) => {
              const isSelected = selectedAnswer === option;

              return (
                <button
                  type="button"
                  key={option}
                  className={`assessment-answer ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => selectAnswer(option)}
                >
                  <span className="assessment-answer-number">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="assessment-answer-text">
                    {option}
                  </span>

                  {isSelected && (
                    <CheckCircle2
                      size={19}
                      className="assessment-answer-check"
                    />
                  )}
                </button>
              );
            }
          )}
        </div>

        <div className="assessment-navigation">
          <button
            type="button"
            className="assessment-previous-button"
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          {currentQuestion <
          currentAssessmentQuestions.length - 1 ? (
            <button
              type="button"
              className="assessment-next-button"
              onClick={goToNextQuestion}
              disabled={!selectedAnswer}
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="assessment-submit-button"
              onClick={submitAssessment}
              disabled={!selectedAnswer}
            >
              Submit Assessment
              <CheckCircle2 size={17} />
            </button>
          )}
        </div>
      </article>
    );
  };

  /* =======================================================
     ASSESSMENT RESULT
  ======================================================= */

  const renderAssessmentResult = () => {
    const percentage = getAssessmentPercentage();
    const level = getAssessmentLevel();

    return (
      <article className="skill-content-card assessment-result-card">
        <div className="assessment-result-icon">
          <Trophy size={32} />
        </div>

        <span>ASSESSMENT COMPLETE</span>

        <h2>Your {selectedAssessmentSkill} assessment result</h2>

        <p>
          You completed all five questions. Here is your
          current assessment result.
        </p>

        <div className="assessment-result-score">
          <strong>{percentage}%</strong>

          <span>
            {assessmentScore} /{" "}
            {currentAssessmentQuestions.length} correct
          </span>
        </div>

        <div className="assessment-result-level">
          <span>INDICATIVE LEVEL</span>

          <strong>{level}</strong>
        </div>

        <div className="skill-info-box">
          <CheckCircle2 size={20} />

          <div>
            <strong>What this means</strong>

            <p>
              This is a frontend assessment result for your
              current session. Once the backend is connected,
              NEXORA can store assessment history and connect
              results with your skill profile.
            </p>
          </div>
        </div>

        <div className="assessment-result-actions">
          <button
            type="button"
            className="assessment-retake-button"
            onClick={() =>
              startAssessment(selectedAssessmentSkill)
            }
          >
            <RotateCcw size={16} />
            Retake Assessment
          </button>

          <Link
            to="/student/skill-mapping"
            className="skill-primary-action"
          >
            Back to My Skills
            <ArrowRight size={17} />
          </Link>
        </div>
      </article>
    );
  };

  /* =======================================================
     ASSESSMENT PAGE
  ======================================================= */

  const renderAssessment = () => {
    if (assessmentCompleted) {
      return renderAssessmentResult();
    }

    if (assessmentStarted) {
      return renderActiveAssessment();
    }

    return renderAssessmentSelection();
  };

  /* =======================================================
     SKILL GAP
  ======================================================= */

  const renderSkillGap = () => (
    <article className="skill-content-card skill-feature-page">
      <div className="skill-feature-icon skill-gap-feature-icon">
        <Target size={28} />
      </div>

      <span>SKILL GAP</span>

      <h2>Identify what you should learn next.</h2>

      <p>
        NEXORA can compare your current skills with the skills
        required for your selected career direction.
      </p>

      <div className="skill-gap-summary">
        <div>
          <strong>{totalSkills}</strong>
          <span>Current Skills</span>
        </div>

        <div>
          <strong>
            {careerGoal ? careerGoal : "Not selected"}
          </strong>

          <span>Career Direction</span>
        </div>
      </div>

      <div className="skill-info-box">
        <Target size={20} />

        <div>
          <strong>Skill-gap analysis</strong>

          <p>
            Once a career goal is selected, required skills
            and learning priorities can be shown here.
          </p>
        </div>
      </div>

      <Link
        to="/student/skill-mapping/career-goals"
        className="skill-primary-action"
      >
        Select Career Goal
        <ArrowRight size={17} />
      </Link>
    </article>
  );

  /* =======================================================
     CAREER GOALS
  ======================================================= */

  const renderCareerGoals = () => (
    <article className="skill-content-card skill-feature-page">
      <div className="skill-feature-icon career-feature-icon">
        <BriefcaseBusiness size={28} />
      </div>

      <span>CAREER GOALS</span>

      <h2>Choose your target career direction.</h2>

      <p>
        Your career goal helps NEXORA understand which skills,
        opportunities and learning resources are relevant to
        you.
      </p>

      <div className="career-goal-form">
        <label htmlFor="career-goal">
          Target Career
        </label>

        <select
          id="career-goal"
          value={careerGoal}
          onChange={(event) =>
            setCareerGoal(event.target.value)
          }
        >
          <option value="">
            Select a career goal
          </option>

          {careerOptions.map((career) => (
            <option key={career} value={career}>
              {career}
            </option>
          ))}
        </select>
      </div>

      {careerGoal && (
        <div className="skill-info-box">
          <CheckCircle2 size={20} />

          <div>
            <strong>Career goal selected</strong>

            <p>
              Your current target is{" "}
              <strong>{careerGoal}</strong>. Skill-gap
              analysis can now use this direction.
            </p>
          </div>
        </div>
      )}
    </article>
  );

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="skill-mapping-page">
      <main className="skill-mapping-main">
        <section className="skill-page-heading">
          <div>
            <span className="skill-page-eyebrow">
              SKILL INTELLIGENCE
            </span>

            <h1>Skill Mapping</h1>

            <p>
              Understand your current skills, identify gaps and
              build a clearer path toward your career goals.
            </p>
          </div>

          <div className="skill-heading-status">
            <BarChart3 size={17} />
            Skill workspace
          </div>
        </section>

        <section className="skill-mapping-layout">
          {renderSectionNavigation()}

          <div className="skill-information-area">
            {isMySkills && (
              <>
                <article className="skill-overview-card">
                  <div className="skill-overview-content">
                    <span>YOUR SKILL PROFILE</span>

                    <h2>
                      Turn your skills into a career direction.
                    </h2>

                    <p>
                      Add the technologies, tools and professional
                      skills you know. NEXORA will use this
                      profile to help you understand your
                      strengths and identify areas for improvement.
                    </p>

                    <Link
                      to="/student/profile"
                      className="skill-primary-action"
                    >
                      Update Profile
                      <ArrowRight size={17} />
                    </Link>
                  </div>

                  <div className="skill-overview-visual">
                    <div className="skill-visual-ring">
                      <BarChart3 size={34} />
                    </div>

                    <span>SKILL PROFILE</span>

                    <strong>
                      {totalSkills} Skills Added
                    </strong>
                  </div>
                </article>

                {renderMySkills()}
              </>
            )}

            {isAssessment && renderAssessment()}

            {isSkillGap && renderSkillGap()}

            {isCareerGoals && renderCareerGoals()}
          </div>
        </section>
      </main>

      {/* =====================================================
          ADD SKILL MODAL
      ====================================================== */}

      {isAddSkillOpen && (
        <div
          className="skill-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAddSkill();
            }
          }}
        >
          <div className="skill-modal">
            <div className="skill-modal-header">
              <div>
                <span>SKILL PROFILE</span>

                <h2>Add a Skill</h2>
              </div>

              <button
                type="button"
                className="skill-modal-close"
                onClick={closeAddSkill}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSkill}>
              <div className="skill-form-field">
                <label htmlFor="skill-name">
                  Skill Name
                </label>

                <input
                  id="skill-name"
                  type="text"
                  value={skillName}
                  onChange={(event) => {
                    setSkillName(event.target.value);
                    setSkillError("");
                  }}
                  placeholder="e.g. Python"
                  autoFocus
                />
              </div>

              <div className="skill-form-field">
                <label htmlFor="skill-category">
                  Category
                </label>

                <select
                  id="skill-category"
                  value={skillCategory}
                  onChange={(event) =>
                    setSkillCategory(event.target.value)
                  }
                >
                  {skillCategories.map((category) => (
                    <option
                      key={category.title}
                      value={category.title}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              {skillError && (
                <p className="skill-form-error">
                  {skillError}
                </p>
              )}

              <div className="skill-modal-actions">
                <button
                  type="button"
                  className="skill-cancel-button"
                  onClick={closeAddSkill}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="skill-save-button"
                >
                  <Save size={16} />
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

