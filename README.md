
# 🩺 Health Tracker

A responsive, modular web application that helps users track daily health metrics like steps, calories, and sleep hours. Built using modern web technologies and RESTful microservices with Spring Boot.

---

## 🚀 Project Objectives

- Allow users to register, log in, and track their health.
- Store and analyze daily health metrics (steps, sleep, calories).
- Deliver personalized health insights via microservices.
- Apply Agile, Git, and DevOps principles in a team project.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript, jQuery
- **Backend**: Java 21, Spring Boot, REST APIs, JPA
- **Database**: Oracle, SQL, PL/SQL
- **Tools**: Git, GitHub, VS Code, IntelliJ, Jira, Postman
- **DevOps & QA**: Shell Scripting, Log4J, SONAR, Python, JaCoCo

---

## 📁 Project Structure

```
online-health-tracker/
├── frontend/         # UI files (HTML, CSS, JS)
├── scripts/          # Shell scripts for automation
├── docs/             # Documentation (Git guide, API docs)
├── qa/               # Test plans, validation checklists
├── src/              # Java backend (Sprint 2–3)
└── README.md         # You are here
```

---

## 📦 Git Commands Used in Sprint 1

### 🔹 Initialize & Connect
```bash
git init                                 # Initialize local Git repo
git remote add origin <repo-url>        # Add remote GitHub repo
git clone <repo-url>                    # Clone repo to local machine
```

### 🔹 Branching
```bash
git checkout -b develop                  # Create 'develop' branch from main
git checkout -b feature/ui-login        # Create feature branch from develop
git branch                               # List all local branches
```

### 🔹 Add & Commit
```bash
git status                               # Show changed files
git add .                                # Stage all files
git commit -m "feat: added login form"   # Commit with message
```

### 🔹 Push & Pull
```bash
git push origin develop                  # Push 'develop' to GitHub
git push origin feature/ui-login        # Push feature branch
git pull origin develop                  # Pull updates from remote
```

### 🔹 Merge Feature Branch
```bash
git checkout develop                     # Switch to develop branch
git merge feature/ui-login               # Merge feature into develop
```

### 🔹 Pull Request on GitHub
- Go to **Pull Requests** tab
- Click **“New Pull Request”**
- Base: `develop` ← Compare: your `feature/*` branch
- Add title + description
- Click **“Create Pull Request”** → **Merge**

---

## ✍️ Commit Message Format

| Prefix    | Purpose                         | Example                           |
|-----------|----------------------------------|------------------------------------|
| `feat:`   | New feature                      | `feat: added login form`           |
| `fix:`    | Bug fix                          | `fix: corrected calorie input bug` |
| `chore:`  | Maintenance/setup                | `chore: updated .gitignore`        |
| `docs:`   | Documentation changes            | `docs: added Git usage guide`      |

---

## 📥 How to Contribute (Team Flow)

1. Clone the repo to your system
2. Create your own **feature branch** from `develop`
3. Make changes in your directory (UI, JS, scripts, etc.)
4. Add, commit, push your changes
5. Open a Pull Request to merge into `develop`

---

## 👥 Team Members

| Member | Name                | Role                   | Task Description                            |
| ------ | ------------------- | ---------------------- | ------------------------------------------- |
| 1      | Rohit Maji          | Scrum Master           | Jira board, daily standups                  |
| 2      | Jahnavi Pemula      | Frontend Developer     | Login and registration UI (HTML, Bootstrap) |
| 3      | Rohit Mohanty       | UI Validator           | JS/jQuery form validation                   |
| 4      | P Siddharth Krishna | Git Lead               | Git setup, branching, documentation         |
| 5      | Omm Susekhar Pani   | Shell Script Developer | Auto-backup script for frontend code        |
| 6      | Rahul Kesari        | QA Tester              | UI/validation checklist                     |


---

## 📘 Documentation

- 🔹 [`docs/GIT_GUIDE.md`](docs/GIT_GUIDE.md) — full Git instructions for the team
- 🔹 UI Flow Diagram (coming soon)
- 🔹 API Specification (Sprint 3)

---

## ✅ License

This project is created for academic learning purposes as part of a multi-sprint team assignment.

---

🛠 Maintained by: `Team - Online Health Tracker`  
🔗 GitHub Repository: [your-repo-link-here](https://github.com/RohitMohanty14/online-health-tracker)
