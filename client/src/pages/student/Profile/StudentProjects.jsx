import { useState } from "react";

import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  FolderKanban,
  Plus,
  Sparkles,
  X,
  Save,
  Trash2,
} from "lucide-react";

import "./StudentProjects.css";

const initialProjects = [
  {
    id: 1,
    title: "NEXORA",
    description:
      "A platform connecting students, institutions and industry through skills, opportunities and career-focused collaboration.",
    status: "In Progress",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "",
    live: "",
  },
  {
    id: 2,
    title: "FocusFlow",
    description:
      "A student productivity platform for tracking study sessions, subject-wise progress and personal learning goals.",
    status: "Completed",
    technologies: ["React", "Express", "MongoDB"],
    github: "",
    live: "",
  },
];

const initialFormData = {
  title: "",
  description: "",
  status: "In Progress",
  technologies: "",
  github: "",
  live: "",
};

export default function StudentProjects() {
  const [projects, setProjects] = useState(initialProjects);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [editingProjectId, setEditingProjectId] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  const [error, setError] = useState("");

  const openAddForm = () => {
    setEditingProjectId(null);

    setFormData({
      ...initialFormData,
    });

    setError("");

    setIsFormOpen(true);
  };

  const openEditForm = (project) => {
    setEditingProjectId(project.id);

    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      technologies: project.technologies.join(", "),
      github: project.github || "",
      live: project.live || "",
    });

    setError("");

    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingProjectId(null);

    setFormData({
      ...initialFormData,
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

    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title) {
      setError("Please enter a project title.");
      return;
    }

    if (!description) {
      setError("Please enter a project description.");
      return;
    }

    const technologies = formData.technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    if (technologies.length === 0) {
      setError("Please add at least one technology.");
      return;
    }

    if (editingProjectId !== null) {
      setProjects((previousProjects) =>
        previousProjects.map((project) =>
          project.id === editingProjectId
            ? {
                ...project,
                title,
                description,
                status: formData.status,
                technologies,
                github: formData.github.trim(),
                live: formData.live.trim(),
              }
            : project
        )
      );
    } else {
      const newProject = {
        id: Date.now(),
        title,
        description,
        status: formData.status,
        technologies,
        github: formData.github.trim(),
        live: formData.live.trim(),
      };

      setProjects((previousProjects) => [
        ...previousProjects,
        newProject,
      ]);
    }

    closeForm();
  };

  const handleDelete = () => {
    if (editingProjectId === null) {
      return;
    }

    setProjects((previousProjects) =>
      previousProjects.filter(
        (project) => project.id !== editingProjectId
      )
    );

    closeForm();
  };

  const openProjectLink = (url) => {
    if (!url || url === "#") {
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  return (
    <div className="student-projects-page">
      <main className="student-projects-main">
        {/* PAGE HEADER */}
        <section className="projects-page-header">
          <div>
            <span className="projects-page-eyebrow">
              PROFILE
            </span>

            <h1>Projects</h1>

            <p>
              Showcase the projects you have built, contributed
              to and learned from.
            </p>
          </div>

          <button
            type="button"
            className="projects-add-button"
            onClick={openAddForm}
          >
            <Plus size={18} />
            Add Project
          </button>
        </section>

        {/* PROJECT SUMMARY */}
        <section className="projects-summary-card">
          <div className="projects-summary-icon">
            <FolderKanban size={27} />
          </div>

          <div className="projects-summary-content">
            <span>PROJECT PORTFOLIO</span>

            <h2>Show what you have built</h2>

            <p>
              Add academic, personal and professional projects
              to demonstrate your practical skills and experience.
            </p>
          </div>

          <div className="projects-summary-badge">
            <Sparkles size={16} />

            {totalProjects} Projects
          </div>
        </section>

        {/* PROJECT LIST */}
        <section className="projects-list-card">
          <div className="projects-list-header">
            <div>
              <span>YOUR PROJECTS</span>

              <h2>Project Portfolio</h2>

              <p>
                Your selected projects and practical work.
              </p>
            </div>

            <button
              type="button"
              className="projects-outline-button"
              onClick={openAddForm}
            >
              <Plus size={17} />
              Add Project
            </button>
          </div>

          {/* PROJECT GRID */}
          <div className="projects-grid">
            {projects.length > 0 ? (
              projects.map((project) => (
                <article
                  className="project-card"
                  key={project.id}
                >
                  <div className="project-card-top">
                    <div className="project-icon">
                      <Code2 size={22} />
                    </div>

                    <span
                      className={`project-status ${
                        project.status === "Completed"
                          ? "completed"
                          : "progress"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3>{project.title}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  {/* TECHNOLOGIES */}
                  <div className="project-technologies">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="project-tech"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="project-actions">
                    {project.github ? (
                      <button
                        type="button"
                        className="project-link"
                        onClick={() =>
                          openProjectLink(project.github)
                        }
                      >
                        <ExternalLink size={16} />
                        GitHub
                      </button>
                    ) : (
                      <span className="project-link disabled">
                        <ExternalLink size={16} />
                        GitHub
                      </span>
                    )}

                    {project.live ? (
                      <button
                        type="button"
                        className="project-link primary"
                        onClick={() =>
                          openProjectLink(project.live)
                        }
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </button>
                    ) : (
                      <span className="project-link primary disabled">
                        <ExternalLink size={16} />
                        Live Demo
                      </span>
                    )}

                    <button
                      type="button"
                      className="project-arrow-button"
                      aria-label={`Edit ${project.title}`}
                      title={`Edit ${project.title}`}
                      onClick={() => openEditForm(project)}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="projects-empty-state">
                <div className="projects-empty-icon">
                  <FolderKanban size={25} />
                </div>

                <h3>No projects added yet</h3>

                <p>
                  Add your first project to start building your
                  portfolio.
                </p>

                <button
                  type="button"
                  className="projects-outline-button"
                  onClick={openAddForm}
                >
                  <Plus size={17} />
                  Add Project
                </button>
              </div>
            )}
          </div>
        </section>

        {/* PROJECT STATS */}
        <section className="projects-mini-stats">
          <div>
            <span>Total Projects</span>
            <strong>{totalProjects}</strong>
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedProjects}</strong>
          </div>

          <div>
            <span>In Progress</span>
            <strong>
              {totalProjects - completedProjects}
            </strong>
          </div>
        </section>

        {/* ADD PROJECT PROMPT */}
        <section className="projects-add-card">
          <div className="projects-add-icon">
            <Plus size={23} />
          </div>

          <div className="projects-add-content">
            <span>BUILD YOUR PORTFOLIO</span>

            <h2>Have another project?</h2>

            <p>
              Add your next project and show recruiters what
              you can build in the real world.
            </p>
          </div>

          <button
            type="button"
            className="projects-add-secondary"
            onClick={openAddForm}
          >
            Add Project
          </button>
        </section>
      </main>

      {/* =====================================================
          ADD / EDIT PROJECT MODAL
          ===================================================== */}
      {isFormOpen && (
        <div
          className="projects-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeForm();
            }
          }}
        >
          <div
            className="projects-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            {/* MODAL HEADER */}
            <div className="projects-modal-header">
              <div>
                <span>
                  {editingProjectId !== null
                    ? "EDIT PROJECT"
                    : "PROJECT PORTFOLIO"}
                </span>

                <h2 id="project-modal-title">
                  {editingProjectId !== null
                    ? "Edit project"
                    : "Add a new project"}
                </h2>
              </div>

              <button
                type="button"
                className="projects-modal-close"
                onClick={closeForm}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            {/* FORM */}
            <form
              className="projects-modal-form"
              onSubmit={handleSubmit}
            >
              <div className="projects-form-grid">
                {/* TITLE */}
                <div className="projects-form-field full">
                  <label htmlFor="project-title">
                    Project Name
                  </label>

                  <input
                    id="project-title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. NEXORA"
                    autoFocus
                  />
                </div>

                {/* STATUS */}
                <div className="projects-form-field">
                  <label htmlFor="project-status">
                    Status
                  </label>

                  <select
                    id="project-status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>

                {/* TECHNOLOGIES */}
                <div className="projects-form-field">
                  <label htmlFor="project-technologies">
                    Technologies
                  </label>

                  <input
                    id="project-technologies"
                    name="technologies"
                    type="text"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="projects-form-field full">
                  <label htmlFor="project-description">
                    Description
                  </label>

                  <textarea
                    id="project-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what you built..."
                    rows="4"
                  />
                </div>

                {/* GITHUB */}
                <div className="projects-form-field">
                  <label htmlFor="project-github">
                    GitHub URL
                  </label>

                  <input
                    id="project-github"
                    name="github"
                    type="url"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                  />
                </div>

                {/* LIVE */}
                <div className="projects-form-field">
                  <label htmlFor="project-live">
                    Live Demo URL
                  </label>

                  <input
                    id="project-live"
                    name="live"
                    type="url"
                    value={formData.live}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {error && (
                <p className="projects-form-error">
                  {error}
                </p>
              )}

              {/* ACTIONS */}
              <div className="projects-modal-actions">
                {editingProjectId !== null && (
                  <button
                    type="button"
                    className="projects-delete-button"
                    onClick={handleDelete}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )}

                <div className="projects-modal-right-actions">
                  <button
                    type="button"
                    className="projects-cancel-button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="projects-save-button"
                  >
                    <Save size={16} />

                    {editingProjectId !== null
                      ? "Save Changes"
                      : "Add Project"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}