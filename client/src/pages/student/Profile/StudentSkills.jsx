import { useState } from "react";
import {
  BarChart3,
  Code2,
  Database,
  Globe,
  Layers3,
  Plus,
  Sparkles,
  Wrench,
  X,
  Save,
  Trash2,
} from "lucide-react";

import "./StudentSkills.css";

const initialSkillGroups = [
  {
    title: "Programming",
    description: "Languages and coding fundamentals",
    icon: Code2,
    skills: ["C++", "JavaScript"],
  },
  {
    title: "Web Development",
    description: "Frontend and backend technologies",
    icon: Globe,
    skills: ["HTML", "CSS", "React", "Node.js"],
  },
  {
    title: "Database",
    description: "Data storage and database technologies",
    icon: Database,
    skills: ["MongoDB", "SQL"],
  },
  {
    title: "Tools & Technologies",
    description: "Development tools and workflow",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code"],
  },
];

const categoryOptions = [
  "Programming",
  "Web Development",
  "Database",
  "Tools & Technologies",
];

export default function StudentSkills() {
  const [skillGroups, setSkillGroups] = useState(initialSkillGroups);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    skill: "",
    category: "Programming",
  });

  const [error, setError] = useState("");

  const openSkillForm = () => {
    setFormData({
      skill: "",
      category: "Programming",
    });

    setError("");
    setIsFormOpen(true);
  };

  const closeSkillForm = () => {
    setFormData({
      skill: "",
      category: "Programming",
    });

    setError("");
    setIsFormOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const skillName = formData.skill.trim();

    if (!skillName) {
      setError("Please enter a skill.");
      return;
    }

    const selectedGroup = skillGroups.find(
      (group) => group.title === formData.category
    );

    if (!selectedGroup) {
      setError("Please select a valid category.");
      return;
    }

    const alreadyExists = skillGroups.some((group) =>
      group.skills.some(
        (skill) => skill.toLowerCase() === skillName.toLowerCase()
      )
    );

    if (alreadyExists) {
      setError("This skill is already added.");
      return;
    }

    setSkillGroups((previousGroups) =>
      previousGroups.map((group) =>
        group.title === formData.category
          ? {
              ...group,
              skills: [...group.skills, skillName],
            }
          : group
      )
    );

    closeSkillForm();
  };

  const handleDeleteSkill = (groupTitle, skillToDelete) => {
    setSkillGroups((previousGroups) =>
      previousGroups.map((group) =>
        group.title === groupTitle
          ? {
              ...group,
              skills: group.skills.filter(
                (skill) => skill !== skillToDelete
              ),
            }
          : group
      )
    );
  };

  const totalSkills = skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0
  );

  return (
    <div className="student-skills-page">
      <main className="student-skills-main">
        {/* PAGE HEADER */}
        <section className="skills-page-header">
          <div>
            <span className="skills-page-eyebrow">PROFILE</span>

            <h1>Skills</h1>

            <p>
              Add and manage your technical skills, tools and
              technologies.
            </p>
          </div>

          <button
            type="button"
            className="skills-add-button"
            onClick={openSkillForm}
          >
            <Plus size={18} />
            Add Skill
          </button>
        </section>

        {/* SKILL OVERVIEW */}
        <section className="skills-overview-card">
          <div className="skills-overview-icon">
            <BarChart3 size={27} />
          </div>

          <div className="skills-overview-content">
            <span>YOUR SKILL PROFILE</span>

            <h2>Showcase what you can do</h2>

            <p>
              Keep your skills updated to help institutions and
              companies understand your technical strengths and
              areas of expertise.
            </p>
          </div>

          <div className="skills-overview-status">
            <Sparkles size={17} />
            {totalSkills} Skills
          </div>
        </section>

        {/* SKILL CONTENT */}
        <section className="skills-content-card">
          <div className="skills-content-header">
            <div>
              <span>TECHNICAL SKILLS</span>

              <h2>Your Skills</h2>

              <p>
                Organize your skills by category for a clearer
                profile.
              </p>
            </div>

            <button
              type="button"
              className="skills-outline-button"
              onClick={openSkillForm}
            >
              <Plus size={17} />
              Add Skill
            </button>
          </div>

          {/* SKILL GROUPS */}
          <div className="skills-group-grid">
            {skillGroups.map(
              ({ title, description, icon: Icon, skills }) => (
                <article
                  className="skills-group-card"
                  key={title}
                >
                  <div className="skills-group-top">
                    <div className="skills-group-icon">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3>{title}</h3>

                      <p>{description}</p>
                    </div>
                  </div>

                  <div className="skills-list">
                    {skills.map((skill) => (
                      <div
                        className="skill-item"
                        key={skill}
                      >
                        <span>{skill}</span>

                        <button
                          type="button"
                          className="skill-remove-button"
                          aria-label={`Remove ${skill}`}
                          title={`Remove ${skill}`}
                          onClick={() =>
                            handleDeleteSkill(title, skill)
                          }
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        {/* SKILL DEVELOPMENT */}
        <section className="skills-development-card">
          <div className="skills-development-icon">
            <Layers3 size={25} />
          </div>

          <div className="skills-development-content">
            <span>KEEP BUILDING</span>

            <h2>Grow your skill profile</h2>

            <p>
              Add more technologies, tools and professional skills
              as you learn and work on new projects.
            </p>
          </div>

          <button
            type="button"
            className="skills-development-button"
            onClick={openSkillForm}
          >
            <Plus size={17} />
            Add Skill
          </button>
        </section>
      </main>

      {/* =====================================================
          ADD SKILL MODAL
          ===================================================== */}
      {isFormOpen && (
        <div
          className="skills-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSkillForm();
            }
          }}
        >
          <div
            className="skills-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-skill-title"
          >
            <div className="skills-modal-header">
              <div>
                <span>SKILL PROFILE</span>
                <h2 id="add-skill-title">Add a new skill</h2>
              </div>

              <button
                type="button"
                className="skills-modal-close"
                onClick={closeSkillForm}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <form
              className="skills-modal-form"
              onSubmit={handleSubmit}
            >
              <div className="skills-form-field">
                <label htmlFor="skill-category">
                  Category
                </label>

                <select
                  id="skill-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categoryOptions.map((category) => (
                    <option
                      value={category}
                      key={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="skills-form-field">
                <label htmlFor="skill-name">
                  Skill Name
                </label>

                <input
                  id="skill-name"
                  name="skill"
                  type="text"
                  value={formData.skill}
                  onChange={handleChange}
                  placeholder="e.g. TypeScript"
                  autoFocus
                />
              </div>

              {error && (
                <p className="skills-form-error">
                  {error}
                </p>
              )}

              <div className="skills-modal-actions">
                <button
                  type="button"
                  className="skills-cancel-button"
                  onClick={closeSkillForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="skills-save-button"
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