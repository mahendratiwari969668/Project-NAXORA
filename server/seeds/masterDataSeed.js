import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import University from "../models/University.js";
import Institution from "../models/Institution.js";
import Department from "../models/Department.js";
import Course from "../models/Course.js";

const academicSeedData = [
  {
    name: "Dr. A.P.J. Abdul Kalam Technical University",
    code: "AKTU",
    state: "Uttar Pradesh",
    city: "Lucknow",
    type: "State",
    institutions: [
      {
        name: "Institute of Engineering and Technology (IET)",
        code: "IET-LKO",
        city: "Lucknow",
        state: "Uttar Pradesh",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.Tech in Computer Science & Engineering", code: "BTECH-CSE", degree: "B.Tech", durationYears: 4 },
              { name: "M.Tech in Software Engineering", code: "MTECH-SE", degree: "M.Tech", durationYears: 2 },
            ],
          },
          {
            name: "Information Technology",
            code: "IT",
            courses: [
              { name: "B.Tech in Information Technology", code: "BTECH-IT", degree: "B.Tech", durationYears: 4 },
            ],
          },
          {
            name: "Electronics & Communication Engineering",
            code: "ECE",
            courses: [
              { name: "B.Tech in Electronics & Communication Engineering", code: "BTECH-ECE", degree: "B.Tech", durationYears: 4 },
            ],
          },
          {
            name: "Mechanical Engineering",
            code: "ME",
            courses: [
              { name: "B.Tech in Mechanical Engineering", code: "BTECH-ME", degree: "B.Tech", durationYears: 4 },
            ],
          },
        ],
      },
      {
        name: "Ajay Kumar Garg Engineering College (AKGEC)",
        code: "AKGEC",
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.Tech in Computer Science & Engineering", code: "BTECH-CSE", degree: "B.Tech", durationYears: 4 },
              { name: "B.Tech in Artificial Intelligence & Machine Learning", code: "BTECH-AIML", degree: "B.Tech", durationYears: 4 },
            ],
          },
          {
            name: "Information Technology",
            code: "IT",
            courses: [
              { name: "B.Tech in Information Technology", code: "BTECH-IT", degree: "B.Tech", durationYears: 4 },
            ],
          },
          {
            name: "Master of Computer Applications",
            code: "MCA",
            courses: [
              { name: "Master of Computer Applications (MCA)", code: "MCA-DEG", degree: "MCA", durationYears: 2 },
            ],
          },
        ],
      },
      {
        name: "JSS Academy of Technical Education",
        code: "JSSATE",
        city: "Noida",
        state: "Uttar Pradesh",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.Tech in Computer Science & Engineering", code: "BTECH-CSE", degree: "B.Tech", durationYears: 4 },
            ],
          },
          {
            name: "Electrical & Electronics Engineering",
            code: "EEE",
            courses: [
              { name: "B.Tech in Electrical & Electronics Engineering", code: "BTECH-EEE", degree: "B.Tech", durationYears: 4 },
            ],
          },
        ],
      },
      {
        name: "Galgotias College of Engineering and Technology",
        code: "GCET",
        city: "Greater Noida",
        state: "Uttar Pradesh",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.Tech in Computer Science & Engineering", code: "BTECH-CSE", degree: "B.Tech", durationYears: 4 },
              { name: "B.Tech in Data Science", code: "BTECH-DS", degree: "B.Tech", durationYears: 4 },
            ],
          },
          {
            name: "Information Technology",
            code: "IT",
            courses: [
              { name: "B.Tech in Information Technology", code: "BTECH-IT", degree: "B.Tech", durationYears: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Visvesvaraya Technological University",
    code: "VTU",
    state: "Karnataka",
    city: "Belagavi",
    type: "State",
    institutions: [
      {
        name: "R.V. College of Engineering (RVCE)",
        code: "RVCE",
        city: "Bengaluru",
        state: "Karnataka",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.E. in Computer Science & Engineering", code: "BE-CSE", degree: "B.E.", durationYears: 4 },
              { name: "M.Tech in Computer Science", code: "MTECH-CS", degree: "M.Tech", durationYears: 2 },
            ],
          },
          {
            name: "Information Science & Engineering",
            code: "ISE",
            courses: [
              { name: "B.E. in Information Science & Engineering", code: "BE-ISE", degree: "B.E.", durationYears: 4 },
            ],
          },
          {
            name: "Electronics & Communication Engineering",
            code: "ECE",
            courses: [
              { name: "B.E. in Electronics & Communication Engineering", code: "BE-ECE", degree: "B.E.", durationYears: 4 },
            ],
          },
        ],
      },
      {
        name: "B.M.S. College of Engineering (BMSCE)",
        code: "BMSCE",
        city: "Bengaluru",
        state: "Karnataka",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.E. in Computer Science & Engineering", code: "BE-CSE", degree: "B.E.", durationYears: 4 },
            ],
          },
          {
            name: "Information Science & Engineering",
            code: "ISE",
            courses: [
              { name: "B.E. in Information Science & Engineering", code: "BE-ISE", degree: "B.E.", durationYears: 4 },
            ],
          },
        ],
      },
      {
        name: "M.S. Ramaiah Institute of Technology (MSRIT)",
        code: "MSRIT",
        city: "Bengaluru",
        state: "Karnataka",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.E. in Computer Science & Engineering", code: "BE-CSE", degree: "B.E.", durationYears: 4 },
              { name: "B.E. in Artificial Intelligence & Machine Learning", code: "BE-AIML", degree: "B.E.", durationYears: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "University of Delhi",
    code: "DU",
    state: "Delhi",
    city: "New Delhi",
    type: "Central",
    institutions: [
      {
        name: "Faculty of Technology, University of Delhi",
        code: "DU-FOT",
        city: "New Delhi",
        state: "Delhi",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.Tech in Computer Science & Engineering", code: "BTECH-CSE", degree: "B.Tech", durationYears: 4 },
            ],
          },
          {
            name: "Electrical Engineering",
            code: "EE",
            courses: [
              { name: "B.Tech in Electrical Engineering", code: "BTECH-EE", degree: "B.Tech", durationYears: 4 },
            ],
          },
        ],
      },
      {
        name: "Hansraj College",
        code: "DU-HRC",
        city: "New Delhi",
        state: "Delhi",
        departments: [
          {
            name: "Department of Computer Science",
            code: "CS",
            courses: [
              { name: "B.Sc (Hons) in Computer Science", code: "BSC-CS", degree: "B.Sc", durationYears: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Savitribai Phule Pune University",
    code: "SPPU",
    state: "Maharashtra",
    city: "Pune",
    type: "State",
    institutions: [
      {
        name: "College of Engineering Pune (COEP)",
        code: "COEP",
        city: "Pune",
        state: "Maharashtra",
        departments: [
          {
            name: "Computer Engineering",
            code: "CE",
            courses: [
              { name: "B.Tech in Computer Engineering", code: "BTECH-CE", degree: "B.Tech", durationYears: 4 },
              { name: "M.Tech in Data Science", code: "MTECH-DS", degree: "M.Tech", durationYears: 2 },
            ],
          },
          {
            name: "Electronics & Telecommunication Engineering",
            code: "ENTC",
            courses: [
              { name: "B.Tech in Electronics & Telecommunication", code: "BTECH-ENTC", degree: "B.Tech", durationYears: 4 },
            ],
          },
        ],
      },
      {
        name: "Pune Institute of Computer Technology (PICT)",
        code: "PICT",
        city: "Pune",
        state: "Maharashtra",
        departments: [
          {
            name: "Computer Engineering",
            code: "CE",
            courses: [
              { name: "B.E. in Computer Engineering", code: "BE-CE", degree: "B.E.", durationYears: 4 },
              { name: "B.E. in Artificial Intelligence & Data Science", code: "BE-AIDS", degree: "B.E.", durationYears: 4 },
            ],
          },
          {
            name: "Information Technology",
            code: "IT",
            courses: [
              { name: "B.E. in Information Technology", code: "BE-IT", degree: "B.E.", durationYears: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Anna University",
    code: "ANNA",
    state: "Tamil Nadu",
    city: "Chennai",
    type: "State",
    institutions: [
      {
        name: "College of Engineering, Guindy (CEG)",
        code: "CEG",
        city: "Chennai",
        state: "Tamil Nadu",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.E. in Computer Science & Engineering", code: "BE-CSE", degree: "B.E.", durationYears: 4 },
              { name: "M.E. in Computer Science & Engineering", code: "ME-CSE", degree: "M.E.", durationYears: 2 },
            ],
          },
          {
            name: "Information Technology",
            code: "IT",
            courses: [
              { name: "B.Tech in Information Technology", code: "BTECH-IT", degree: "B.Tech", durationYears: 4 },
            ],
          },
        ],
      },
      {
        name: "Madras Institute of Technology (MIT)",
        code: "MIT-CH",
        city: "Chennai",
        state: "Tamil Nadu",
        departments: [
          {
            name: "Information Technology",
            code: "IT",
            courses: [
              { name: "B.Tech in Information Technology", code: "BTECH-IT", degree: "B.Tech", durationYears: 4 },
            ],
          },
          {
            name: "Computer Technology",
            code: "CT",
            courses: [
              { name: "B.E. in Computer Science & Engineering", code: "BE-CSE", degree: "B.E.", durationYears: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Jawaharlal Nehru Technological University",
    code: "JNTUH",
    state: "Telangana",
    city: "Hyderabad",
    type: "State",
    institutions: [
      {
        name: "JNTUH College of Engineering Hyderabad",
        code: "JNTUH-CEH",
        city: "Hyderabad",
        state: "Telangana",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.Tech in Computer Science & Engineering", code: "BTECH-CSE", degree: "B.Tech", durationYears: 4 },
              { name: "B.Tech in Cyber Security", code: "BTECH-CS", degree: "B.Tech", durationYears: 4 },
            ],
          },
          {
            name: "Information Technology",
            code: "IT",
            courses: [
              { name: "B.Tech in Information Technology", code: "BTECH-IT", degree: "B.Tech", durationYears: 4 },
            ],
          },
        ],
      },
      {
        name: "Chaitanya Bharathi Institute of Technology (CBIT)",
        code: "CBIT",
        city: "Hyderabad",
        state: "Telangana",
        departments: [
          {
            name: "Computer Science & Engineering",
            code: "CSE",
            courses: [
              { name: "B.Tech in Computer Science & Engineering", code: "BTECH-CSE", degree: "B.Tech", durationYears: 4 },
              { name: "B.Tech in AI & ML", code: "BTECH-AIML", degree: "B.Tech", durationYears: 4 },
            ],
          },
        ],
      },
    ],
  },
];

export const seedMasterData = async () => {
  console.log("Seeding academic master data...");

  let universityCount = 0;
  let institutionCount = 0;
  let departmentCount = 0;
  let courseCount = 0;

  for (const uniData of academicSeedData) {
    let university = await University.findOne({ code: uniData.code });
    if (!university) {
      university = await University.create({
        name: uniData.name,
        code: uniData.code,
        state: uniData.state,
        city: uniData.city,
        type: uniData.type,
      });
      universityCount++;
    }

    for (const instData of uniData.institutions) {
      let institution = await Institution.findOne({
        university: university._id,
        code: instData.code,
      });

      if (!institution) {
        institution = await Institution.create({
          name: instData.name,
          code: instData.code,
          university: university._id,
          city: instData.city,
          state: instData.state,
        });
        institutionCount++;
      }

      for (const deptData of instData.departments) {
        let department = await Department.findOne({
          institution: institution._id,
          code: deptData.code,
        });

        if (!department) {
          department = await Department.create({
            name: deptData.name,
            code: deptData.code,
            institution: institution._id,
          });
          departmentCount++;
        }

        for (const courseData of deptData.courses) {
          let course = await Course.findOne({
            department: department._id,
            code: courseData.code,
          });

          if (!course) {
            course = await Course.create({
              name: courseData.name,
              code: courseData.code,
              degree: courseData.degree,
              department: department._id,
              institution: institution._id,
              durationYears: courseData.durationYears,
            });
            courseCount++;
          }
        }
      }
    }
  }

  console.log(
    `Academic master data seeded: +${universityCount} universities, +${institutionCount} institutions, +${departmentCount} departments, +${courseCount} courses.`
  );
};

export const seedMasterDataIfNeeded = async () => {
  try {
    const count = await University.countDocuments();
    if (count === 0) {
      console.log("Master data empty. Auto-seeding initial academic hierarchy...");
      await seedMasterData();
    }
  } catch (error) {
    console.error("Auto-seeding check failed:", error.message);
  }
};

const runStandalone = async () => {
  try {
    await connectDB();
    await seedMasterData();
    console.log("Master data seed script completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seed script failed:", err);
    process.exit(1);
  }
};

if (process.argv[1]?.endsWith("masterDataSeed.js")) {
  runStandalone();
}
