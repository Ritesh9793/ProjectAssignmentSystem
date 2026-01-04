# ProjectAssignmentSystem

**ProjectAssignmentSystem** is a web-based application designed to help **college students and teachers manage and automate project allocations** based on student performance and evaluation criteria.

This system enables teachers to assign projects to students, and allows students to view projects assigned to them according to their academic performance and predefined rules.

### Overview 
This project aims to simplify the **project allocation workflow in academic environments**:

- Teachers can input available projects and define criteria for assignment.
- Students can view assigned projects based on their average performance or eligibility.
- The system handles logic for fair distribution and visibility of assignments.

It is built with **separate frontend and backend modules**, ensuring a clean structure and future scalability. :contentReference[oaicite:0]{index=0}

### Problem Statement
In many college departments:

- Assigning final year or term projects manually is time-consuming.
- Students aren’t always aware of what projects they are eligible for.
- Teachers struggle to allocate projects proportionally based on performance metrics.

**This system solves these challenges by:**

- Automating assignment based on performance  
- Providing clear visibility for both teachers and students  
- Offering a modular architecture for enhancements

### Tech Stack 
  | Category         | Technology                             |
  |------------------|----------------------------------------|
  | Frontend         | HTML, CSS, JavaScript                  |
  | Backend          | (Likely Node.js / Express / REST APIs) |
  | Database         | (Depends on implementation)            |
  | Version Control  | Git & GitHub                           |

### Project Structure
ProjectAssignmentSystem/
├── Frontend/ # UI code for students & teachers
├── backEnd/ # Backend API and application logic
├── README.md
└── Other config files

### Core Features

#### Teacher Features
- Create and manage available projects
- Input evaluation criteria for students
- Assign projects based on average performance

#### Student Features
- View assigned projects
- Check eligibility based on performance

#### System Features
- Role-based views for teachers and students
- Performance automatic evaluation logic
- Clean separation of frontend and backend responsibilities

### How to Run (General)

> Replace the commands with exact steps once the actual backend & frontend tech is confirmed.

#### Clone the Repository
git clone https://github.com/Ritesh9793/ProjectAssignmentSystem.git
cd ProjectAssignmentSystem

### Backend
cd backEnd
npm install
npm run dev

### Frontend
cd Frontend
npm install
npm run dev

### Use Cases
- Teachers upload and manage a list of projects
- Students view available and assigned projects
- Automatic assignment based on performance or eligibility

### Benefits
- Reduces manual workload for faculty
- Improves transparency for students
- Modular for feature expansion (grading tools, preferences, dashboards)

### Expected Deliverables
- Working frontend and backend modules
- Stable student-project allocation logic
- Documentation for API and UI workflows

### Future Enhancements
- Add authentication & login (teacher/student roles)
- Integrate database (MySQL / MongoDB / PostgreSQL)
- Add real-time dashboards
- Email or notification integration

### Author 
**Ritesh Guppta**
LinkedIn : https://www.linkedin.com/in/rit3sh-6upta/
### Liscence
Distributed under the terms and conditions chosen by the repository owner.
