import { useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
  Upload,
  UserRound,
  X,
  Eye,
  Edit3,
  Trash2,
  Save,
  FileSpreadsheet,
} from "lucide-react";

import "./InstitutionStudents.css";

const initialStudents = [
  {
    id: 1,
    name: "Rahul Sharma",
    rollNo: "23BCA001",
    department: "BCA",
    batch: "2026",
    status: "Active",
    profile: 88,
  },
  {
    id: 2,
    name: "Priya Singh",
    rollNo: "23BCA002",
    department: "BCA",
    batch: "2026",
    status: "Active",
    profile: 76,
  },
  {
    id: 3,
    name: "Aman Kumar",
    rollNo: "23BCA003",
    department: "BCA",
    batch: "2026",
    status: "Active",
    profile: 92,
  },
  {
    id: 4,
    name: "Sneha Verma",
    rollNo: "23BBA001",
    department: "BBA",
    batch: "2026",
    status: "Active",
    profile: 60,
  },
  {
    id: 5,
    name: "Aditya Gupta",
    rollNo: "23BCA004",
    department: "BCA",
    batch: "2026",
    status: "Inactive",
    profile: 49,
  },
  {
    id: 6,
    name: "Neha Yadav",
    rollNo: "23BCA005",
    department: "BCA",
    batch: "2027",
    status: "Active",
    profile: 60,
  },
  {
    id: 7,
    name: "Vikash Tiwari",
    rollNo: "23BCA006",
    department: "BCA",
    batch: "2027",
    status: "Active",
    profile: 70,
  },
  {
    id: 8,
    name: "Anjali Patel",
    rollNo: "23BBA002",
    department: "BBA",
    batch: "2027",
    status: "Active",
    profile: 82,
  },
  {
    id: 9,
    name: "Rohit Kumar",
    rollNo: "23BCA007",
    department: "BCA",
    batch: "2027",
    status: "Active",
    profile: 60,
  },
  {
    id: 10,
    name: "Karan Mishra",
    rollNo: "23BCA008",
    department: "BCA",
    batch: "2027",
    status: "Active",
    profile: 75,
  },
];

const departments = [
  "All Departments",
  "BCA",
  "BBA",
];

const batches = [
  "All Batches",
  "2026",
  "2027",
];

const statuses = [
  "All Status",
  "Active",
  "Inactive",
];

const STUDENTS_PER_PAGE = 5;

const getStoredStudents = () => {
  try {
    const storedStudents = localStorage.getItem(
      "nexora-institution-students"
    );

    if (storedStudents) {
      const parsedStudents = JSON.parse(storedStudents);

      if (Array.isArray(parsedStudents)) {
        return parsedStudents;
      }
    }
  } catch (error) {
    console.error("Failed to load students:", error);
  }

  return initialStudents;
};

const parseCSVLine = (line) => {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (
        insideQuotes &&
        line[index + 1] === '"'
      ) {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (
      character === "," &&
      !insideQuotes
    ) {
      values.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }

  values.push(current.trim());

  return values;
};

export default function InstitutionStudents() {
  const [students, setStudents] = useState(
    getStoredStudents
  );

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(
    "All Departments"
  );
  const [batch, setBatch] = useState("All Batches");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const [isStudentModalOpen, setIsStudentModalOpen] =
    useState(false);

  const [modalMode, setModalMode] = useState("add");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [openActionId, setOpenActionId] =
    useState(null);

  const [studentForm, setStudentForm] = useState({
    name: "",
    rollNo: "",
    department: "BCA",
    batch: "2026",
    status: "Active",
    profile: 0,
  });

  const fileInputRef = useRef(null);

  const saveStudents = (updatedStudents) => {
    setStudents(updatedStudents);

    try {
      localStorage.setItem(
        "nexora-institution-students",
        JSON.stringify(updatedStudents)
      );
    } catch (error) {
      console.error("Failed to save students:", error);
    }
  };

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.rollNo.toLowerCase().includes(query) ||
        student.department.toLowerCase().includes(query);

      const matchesDepartment =
        department === "All Departments" ||
        student.department === department;

      const matchesBatch =
        batch === "All Batches" ||
        student.batch === batch;

      const matchesStatus =
        status === "All Status" ||
        student.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesBatch &&
        matchesStatus
      );
    });
  }, [
    students,
    search,
    department,
    batch,
    status,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length /
        STUDENTS_PER_PAGE
    )
  );

  const paginatedStudents = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      STUDENTS_PER_PAGE;

    return filteredStudents.slice(
      startIndex,
      startIndex + STUDENTS_PER_PAGE
    );
  }, [filteredStudents, currentPage]);

  const handleFilterChange = (
    setter,
    value
  ) => {
    setter(value);
    setCurrentPage(1);
  };

  const resetStudentForm = () => {
    setStudentForm({
      name: "",
      rollNo: "",
      department: "BCA",
      batch: "2026",
      status: "Active",
      profile: 0,
    });
  };

  const handleAddStudent = () => {
    resetStudentForm();
    setSelectedStudent(null);
    setModalMode("add");
    setIsStudentModalOpen(true);
    setOpenActionId(null);
  };

  const handleEditStudent = (student) => {
    setStudentForm({
      name: student.name,
      rollNo: student.rollNo,
      department: student.department,
      batch: student.batch,
      status: student.status,
      profile: student.profile,
    });

    setSelectedStudent(student);
    setModalMode("edit");
    setIsStudentModalOpen(true);
    setOpenActionId(null);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setModalMode("view");
    setIsStudentModalOpen(true);
    setOpenActionId(null);
  };

  const handleCloseModal = () => {
    setIsStudentModalOpen(false);
    setSelectedStudent(null);
    setModalMode("add");
    resetStudentForm();
  };

  const handleFormChange = (
    field,
    value
  ) => {
    setStudentForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSaveStudent = (event) => {
    event.preventDefault();

    const trimmedName =
      studentForm.name.trim();

    const trimmedRollNo =
      studentForm.rollNo.trim();

    if (!trimmedName || !trimmedRollNo) {
      window.alert(
        "Please enter student name and roll number."
      );
      return;
    }

    const duplicateRollNo = students.some(
      (student) =>
        student.rollNo.toLowerCase() ===
          trimmedRollNo.toLowerCase() &&
        student.id !== selectedStudent?.id
    );

    if (duplicateRollNo) {
      window.alert(
        "A student with this roll number already exists."
      );
      return;
    }

    if (modalMode === "edit" && selectedStudent) {
      const updatedStudents = students.map(
        (student) =>
          student.id === selectedStudent.id
            ? {
                ...student,
                name: trimmedName,
                rollNo: trimmedRollNo,
                department:
                  studentForm.department,
                batch: studentForm.batch,
                status: studentForm.status,
                profile: Number(
                  studentForm.profile
                ),
              }
            : student
      );

      saveStudents(updatedStudents);
    } else {
      const newStudent = {
        id: Date.now(),
        name: trimmedName,
        rollNo: trimmedRollNo,
        department:
          studentForm.department,
        batch: studentForm.batch,
        status: studentForm.status,
        profile: Number(
          studentForm.profile
        ),
      };

      saveStudents([
        ...students,
        newStudent,
      ]);
    }

    setCurrentPage(1);
    handleCloseModal();
  };

  const handleDeleteStudent = (student) => {
    const confirmed = window.confirm(
      `Delete ${student.name} from the student list?`
    );

    if (!confirmed) {
      return;
    }

    const updatedStudents =
      students.filter(
        (item) =>
          item.id !== student.id
      );

    saveStudents(updatedStudents);
    setOpenActionId(null);

    const newTotalPages = Math.max(
      1,
      Math.ceil(
        updatedStudents.filter(
          (item) => {
            const query =
              search.trim().toLowerCase();

            const matchesSearch =
              !query ||
              item.name
                .toLowerCase()
                .includes(query) ||
              item.rollNo
                .toLowerCase()
                .includes(query) ||
              item.department
                .toLowerCase()
                .includes(query);

            const matchesDepartment =
              department ===
                "All Departments" ||
              item.department ===
                department;

            const matchesBatch =
              batch === "All Batches" ||
              item.batch === batch;

            const matchesStatus =
              status === "All Status" ||
              item.status === status;

            return (
              matchesSearch &&
              matchesDepartment &&
              matchesBatch &&
              matchesStatus
            );
          }
        ).length /
          STUDENTS_PER_PAGE
      )
    );

    setCurrentPage((page) =>
      Math.min(page, newTotalPages)
    );
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportStudents = async (
    event
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const csvText = await file.text();

      const lines = csvText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length < 2) {
        window.alert(
          "The CSV file does not contain any student records."
        );
        event.target.value = "";
        return;
      }

      const headers = parseCSVLine(
        lines[0]
      ).map((header) =>
        header
          .toLowerCase()
          .replace(/\s+/g, "")
      );

      const importedStudents = [];

      for (
        let index = 1;
        index < lines.length;
        index += 1
      ) {
        const values = parseCSVLine(
          lines[index]
        );

        const row = {};

        headers.forEach(
          (header, headerIndex) => {
            row[header] =
              values[headerIndex] || "";
          }
        );

        const name =
          row.name ||
          row.studentname ||
          "";

        const rollNo =
          row.rollno ||
          row.rollnumber ||
          row.registrationno ||
          "";

        if (
          !name.trim() ||
          !rollNo.trim()
        ) {
          continue;
        }

        const existingStudent =
          students.find(
            (student) =>
              student.rollNo.toLowerCase() ===
              rollNo
                .trim()
                .toLowerCase()
          );

        if (existingStudent) {
          continue;
        }

        const profileValue = Number(
          row.profile || 0
        );

        importedStudents.push({
          id:
            Date.now() +
            index +
            Math.floor(
              Math.random() * 1000
            ),
          name: name.trim(),
          rollNo: rollNo.trim(),
          department:
            row.department?.trim() ||
            "BCA",
          batch:
            row.batch?.trim() ||
            "2026",
          status:
            row.status?.trim() ===
            "Inactive"
              ? "Inactive"
              : "Active",
          profile:
            Number.isNaN(profileValue)
              ? 0
              : Math.min(
                  100,
                  Math.max(
                    0,
                    profileValue
                  )
                ),
        });
      }

      if (importedStudents.length === 0) {
        window.alert(
          "No new valid students were found in the CSV file."
        );
        event.target.value = "";
        return;
      }

      saveStudents([
        ...students,
        ...importedStudents,
      ]);

      setSearch("");
      setDepartment(
        "All Departments"
      );
      setBatch("All Batches");
      setStatus("All Status");
      setCurrentPage(1);

      window.alert(
        `${importedStudents.length} student${
          importedStudents.length > 1
            ? "s"
            : ""
        } imported successfully.`
      );
    } catch (error) {
      console.error(
        "CSV import failed:",
        error
      );

      window.alert(
        "Unable to import the CSV file. Please check its format."
      );
    }

    event.target.value = "";
  };

  const getProfileClass = (profile) => {
    if (profile >= 80) {
      return "high";
    }

    if (profile >= 60) {
      return "medium";
    }

    return "low";
  };

  return (
    <div className="institution-students-page">
      {/* =========================
          PAGE HEADER
      ========================== */}

      <section className="institution-students-header">
        <div>
          <p className="institution-students-eyebrow">
            STUDENT MANAGEMENT
          </p>

          <h1>Students</h1>

          <p>
            Manage and view students connected
            with your institution.
          </p>
        </div>

        <div className="institution-students-actions">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleImportStudents}
            style={{ display: "none" }}
          />

          <button
            type="button"
            className="institution-students-secondary-button"
            onClick={handleImportClick}
          >
            <Upload size={17} />
            Import Students
          </button>

          <button
            type="button"
            className="institution-students-primary-button"
            onClick={handleAddStudent}
          >
            <Plus size={17} />
            Add Student
          </button>
        </div>
      </section>

      {/* =========================
          FILTER BAR
      ========================== */}

      <section className="institution-students-toolbar">
        <div className="institution-students-filter">
          <SlidersHorizontal size={16} />

          <select
            value={department}
            onChange={(e) =>
              handleFilterChange(
                setDepartment,
                e.target.value
              )
            }
          >
            {departments.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <ChevronDown size={15} />
        </div>

        <div className="institution-students-filter">
          <select
            value={batch}
            onChange={(e) =>
              handleFilterChange(
                setBatch,
                e.target.value
              )
            }
          >
            {batches.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <ChevronDown size={15} />
        </div>

        <div className="institution-students-filter">
          <select
            value={status}
            onChange={(e) =>
              handleFilterChange(
                setStatus,
                e.target.value
              )
            }
          >
            {statuses.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <ChevronDown size={15} />
        </div>

        <div className="institution-students-search">
          <Search size={17} />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, roll no, email..."
          />
        </div>
      </section>

      {/* =========================
          TABLE
      ========================== */}

      <section className="institution-students-table-card">
        <div className="institution-students-table-wrapper">
          <table className="institution-students-table">
            <thead>
              <tr>
                <th className="student-number-column">
                  #
                </th>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Department</th>
                <th>Batch</th>
                <th>Status</th>
                <th>Profile</th>
                <th className="student-action-column"></th>
              </tr>
            </thead>

            <tbody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map(
                  (student, index) => (
                    <tr
                      key={student.id}
                      className="institution-student-row"
                      onClick={() => handleViewStudent(student)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();
                          handleViewStudent(student);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${student.name}'s student details`}
                    >
                      <td className="student-number">
                        {(currentPage - 1) *
                          STUDENTS_PER_PAGE +
                          index +
                          1}
                      </td>

                      <td>
                        <div className="student-name-cell">
                          <div className="student-avatar">
                            {student.name.charAt(
                              0
                            )}
                          </div>

                          <div>
                            <strong>
                              {student.name}
                            </strong>

                            <span>
                              Student profile
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="student-roll">
                          {student.rollNo}
                        </span>
                      </td>

                      <td>
                        <span className="student-department">
                          {student.department}
                        </span>
                      </td>

                      <td>
                        {student.batch}
                      </td>

                      <td>
                        <span
                          className={`student-status ${student.status.toLowerCase()}`}
                        >
                          <span className="student-status-dot" />
                          {student.status}
                        </span>
                      </td>

                      <td>
                        <div className="student-profile-cell">
                          <div className="student-profile-track">
                            <div
                              className={`student-profile-value ${getProfileClass(
                                student.profile
                              )}`}
                              style={{
                                width: `${student.profile}%`,
                              }}
                            />
                          </div>

                          <span>
                            {student.profile}%
                          </span>
                        </div>
                      </td>

                      <td
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <div
                          className="student-action-wrapper"
                          style={{
                            position: "relative",
                          }}
                        >
                          <button
                            type="button"
                            className="student-more-button"
                            aria-label={`Actions for ${student.name}`}
                            onClick={() =>
                              setOpenActionId(
                                (current) =>
                                  current ===
                                  student.id
                                    ? null
                                    : student.id
                              )
                            }
                          >
                            <MoreVertical
                              size={17}
                            />
                          </button>

                          {openActionId ===
                            student.id && (
                            <div
                              className="student-action-menu"
                              style={{
                                position:
                                  "absolute",
                                right: 0,
                                top:
                                  "calc(100% + 6px)",
                                zIndex: 20,
                                minWidth:
                                  "170px",
                                padding:
                                  "6px",
                                borderRadius:
                                  "10px",
                                background:
                                  "var(--institution-surface, #111d31)",
                                border:
                                  "1px solid rgba(148, 163, 184, 0.18)",
                                boxShadow:
                                  "0 16px 40px rgba(0, 0, 0, 0.28)",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  handleViewStudent(
                                    student
                                  )
                                }
                                style={{
                                  width: "100%",
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap: "9px",
                                  border: 0,
                                  background:
                                    "transparent",
                                  padding:
                                    "9px 10px",
                                  color:
                                    "inherit",
                                  cursor:
                                    "pointer",
                                  textAlign:
                                    "left",
                                }}
                              >
                                <Eye
                                  size={15}
                                />
                                View Student
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleEditStudent(
                                    student
                                  )
                                }
                                style={{
                                  width: "100%",
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap: "9px",
                                  border: 0,
                                  background:
                                    "transparent",
                                  padding:
                                    "9px 10px",
                                  color:
                                    "inherit",
                                  cursor:
                                    "pointer",
                                  textAlign:
                                    "left",
                                }}
                              >
                                <Edit3
                                  size={15}
                                />
                                Edit Student
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteStudent(
                                    student
                                  )
                                }
                                style={{
                                  width: "100%",
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap: "9px",
                                  border: 0,
                                  background:
                                    "transparent",
                                  padding:
                                    "9px 10px",
                                  color:
                                    "#f87171",
                                  cursor:
                                    "pointer",
                                  textAlign:
                                    "left",
                                }}
                              >
                                <Trash2
                                  size={15}
                                />
                                Delete Student
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="institution-students-empty"
                  >
                    <div>
                      <UserRound size={22} />

                      <strong>
                        No students found
                      </strong>

                      <span>
                        Try changing your search
                        or filters.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =========================
            PAGINATION
        ========================== */}

        <div className="institution-students-pagination">
          <span>
            Showing{" "}
            <strong>
              {filteredStudents.length}
            </strong>{" "}
            students
          </span>

          <div className="student-pagination-controls">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(
                    totalPages,
                    page + 1
                  )
                )
              }
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          STUDENT MODAL
      ========================== */}

      {isStudentModalOpen && (
        <div
          className="institution-student-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              handleCloseModal();
            }
          }}
        >
          <div className="institution-student-modal">
            <div className="institution-student-modal-header">
              <div>
                <span>
                  {modalMode === "add"
                    ? "ADD STUDENT"
                    : modalMode === "edit"
                    ? "EDIT STUDENT"
                    : "STUDENT DETAILS"}
                </span>

                <h2>
                  {modalMode === "add"
                    ? "Add Student"
                    : modalMode === "edit"
                    ? "Edit Student"
                    : selectedStudent?.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            {modalMode === "view" &&
            selectedStudent ? (
              <div className="institution-student-details">
                <div className="institution-student-detail-avatar">
                  {selectedStudent.name.charAt(
                    0
                  )}
                </div>

                <div className="institution-student-detail-grid">
                  <div>
                    <span>Name</span>
                    <strong>
                      {selectedStudent.name}
                    </strong>
                  </div>

                  <div>
                    <span>Roll Number</span>
                    <strong>
                      {selectedStudent.rollNo}
                    </strong>
                  </div>

                  <div>
                    <span>Department</span>
                    <strong>
                      {selectedStudent.department}
                    </strong>
                  </div>

                  <div>
                    <span>Batch</span>
                    <strong>
                      {selectedStudent.batch}
                    </strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong>
                      {selectedStudent.status}
                    </strong>
                  </div>

                  <div>
                    <span>Profile Completion</span>
                    <strong>
                      {selectedStudent.profile}%
                    </strong>
                  </div>
                </div>

                <div className="institution-student-modal-footer">
                  <button
                    type="button"
                    className="institution-student-cancel-button"
                    onClick={() =>
                      handleEditStudent(
                        selectedStudent
                      )
                    }
                  >
                    <Edit3 size={16} />
                    Edit Student
                  </button>

                  <button
                    type="button"
                    className="institution-student-primary-modal-button"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSaveStudent}
                className="institution-student-form"
              >
                <div className="institution-student-form-grid">
                  <div className="institution-student-form-group full">
                    <label htmlFor="student-name">
                      Student Name
                    </label>

                    <input
                      id="student-name"
                      type="text"
                      value={studentForm.name}
                      onChange={(event) =>
                        handleFormChange(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Enter student name"
                      required
                    />
                  </div>

                  <div className="institution-student-form-group">
                    <label htmlFor="student-roll">
                      Roll Number
                    </label>

                    <input
                      id="student-roll"
                      type="text"
                      value={
                        studentForm.rollNo
                      }
                      onChange={(event) =>
                        handleFormChange(
                          "rollNo",
                          event.target.value
                        )
                      }
                      placeholder="e.g. 23BCA001"
                      required
                    />
                  </div>

                  <div className="institution-student-form-group">
                    <label htmlFor="student-department">
                      Department
                    </label>

                    <select
                      id="student-department"
                      value={
                        studentForm.department
                      }
                      onChange={(event) =>
                        handleFormChange(
                          "department",
                          event.target.value
                        )
                      }
                    >
                      <option value="BCA">
                        BCA
                      </option>
                      <option value="BBA">
                        BBA
                      </option>
                    </select>
                  </div>

                  <div className="institution-student-form-group">
                    <label htmlFor="student-batch">
                      Batch
                    </label>

                    <select
                      id="student-batch"
                      value={studentForm.batch}
                      onChange={(event) =>
                        handleFormChange(
                          "batch",
                          event.target.value
                        )
                      }
                    >
                      <option value="2026">
                        2026
                      </option>
                      <option value="2027">
                        2027
                      </option>
                    </select>
                  </div>

                  <div className="institution-student-form-group">
                    <label htmlFor="student-status">
                      Status
                    </label>

                    <select
                      id="student-status"
                      value={
                        studentForm.status
                      }
                      onChange={(event) =>
                        handleFormChange(
                          "status",
                          event.target.value
                        )
                      }
                    >
                      <option value="Active">
                        Active
                      </option>
                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>

                  <div className="institution-student-form-group full">
                    <label htmlFor="student-profile">
                      Profile Completion
                    </label>

                    <input
                      id="student-profile"
                      type="number"
                      min="0"
                      max="100"
                      value={
                        studentForm.profile
                      }
                      onChange={(event) =>
                        handleFormChange(
                          "profile",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="institution-student-modal-footer">
                  <button
                    type="button"
                    className="institution-student-cancel-button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="institution-student-primary-modal-button"
                  >
                    <Save size={16} />

                    {modalMode === "edit"
                      ? "Save Changes"
                      : "Add Student"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================
          IMPORT FORMAT NOTE
      ========================== */}

      <div
        style={{
          display: "none",
        }}
      >
        <FileSpreadsheet size={16} />
      </div>
    </div>
  );
}