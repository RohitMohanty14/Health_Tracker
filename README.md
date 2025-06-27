
# Online Health Tracker

A responsive, modular web application to help users track daily health metrics like steps, calories, and sleep hours. Built using modern web technologies and RESTful microservices with Spring Boot.

---

## Project Objectives

- Register/login users and track health metrics
- Store and analyze daily data (steps, sleep, calories)
- Deliver insights using Spring Boot microservices
- Apply Agile and Git-based team collaboration

---

## Tech Stack

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript, jQuery
- **Backend**: Java 21, Spring Boot, REST APIs, JPA
- **Database**: Oracle, SQL, PL/SQL
- **Tools**: Git, GitHub, VS Code, IntelliJ, Jira, Postman
- **DevOps/QA**: Shell Scripting, Log4J, SONAR, Python, JaCoCo

---

## Git Workflow (Single Branch - `develop` only)

### Cloning the Repository

```bash
git clone https://github.com/RohitMohanty14/Health_Tracker.git
cd Health_Tracker
```

### Working on Your Task

```bash
git checkout develop
# Make changes only in your assigned folder
```

### Committing and Pushing

```bash
git add .
git commit -m "feat: added login page"
git pull origin develop
git push origin develop
```

---

## Team Members

| Member | Name                | Role                   | Task Description                            |
|--------|---------------------|------------------------|---------------------------------------------|
| 1      | Rohit Maji          | Scrum Master           | Jira board, daily standups                  |
| 2      | Pemula Jahnavi      | Frontend Developer     | Login and registration UI                   |
| 3      | Rohit Mohanty       | UI Validator           | JS/jQuery form validation                   |
| 4      | P Siddharth Krishna | Git Lead               | Git setup, branching, documentation         |
| 5      | Omm Susekhar Pani   | Shell Script Developer | Auto-backup script for frontend code        |
| 6      | Rahul Kesari        | QA Tester              | UI/validation checklist                     |

---

## Sprint 2: Core Java, SQL Integration & Logging

### Feature Scope

- Java 21 records & JDBC integration
- Oracle DB schema creation
- Logging with Log4J & SLF4J
- DB insert validations and log testing
- Automated log cleanup (shell script)

---

### Sprint 2 User Stories & Tasks

| Member | Name                | Role              | Sprint 2 Task                                             |
|--------|---------------------|-------------------|-----------------------------------------------------------|
| 1      | Rohit Mohanty       | Java Developer    | Defined `User` and `HealthEntry` records using Java 21    |
| 2      | P Siddharth Krishna | Backend Developer | Wrote JDBC code to insert user and health data into DB    |
| 3      | Rohit Maji          | Data Engineer     | Wrote SQL queries to calculate weekly health averages      |
| 4      | Omm Susekhar Pani   | Logging Engineer  | Integrated Log4J and SLF4J for login and DB insert logs    |
| 5      | Rahul Kesari        | QA Tester         | Validated DB inserts and tested logging with errors        |
| 6      | Pemula Jahnavi      | DevOps Trainee    | Created shell script to clean logs older than 7 days       |

---

## Sprint 2 Deliverables

- Java classes with input validation
- JDBC utilities for Oracle DB
- SQL schema: `users`, `health_logs`, `goals`
- Logging configuration using Log4J2 and SLF4J
- Shell script to auto-clean logs
- Test report and sample data for QA

---

## Documentation

- `docs/GIT_GUIDE.md` — Git instructions
- API documentation — To be added in Sprint 3

---

## License

This project is for academic learning under team-based Agile sprint development.

Maintained by: Team – Online Health Tracker  
Repo: [Health_Tracker](https://github.com/RohitMohanty14/Health_Tracker)
