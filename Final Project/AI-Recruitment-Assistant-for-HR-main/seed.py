"""Seed Supabase with a Software Engineer JD and 5 dummy candidates."""

import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv()

from ai.db import get_client, insert_job_description, insert_candidate_result

JD_TITLE = "Software Engineer"
JD_RAW_TEXT = """We are seeking a talented Software Engineer to join our growing engineering team.
You will design, develop, and maintain scalable web applications and backend services.

Responsibilities:
- Design, build, and maintain RESTful APIs and microservices
- Write clean, testable, and well-documented code
- Collaborate with cross-functional teams including product, design, and QA
- Participate in code reviews and contribute to engineering best practices
- Optimize applications for performance and scalability
- Troubleshoot and debug production issues

Requirements:
- 3+ years of professional software development experience
- Proficiency in Python or JavaScript/TypeScript
- Experience with web frameworks such as FastAPI, Django, Flask, or Express.js
- Strong understanding of SQL and relational databases (PostgreSQL preferred)
- Experience with Git version control and CI/CD pipelines
- Familiarity with cloud platforms (AWS, GCP, or Azure)
- Knowledge of Docker and containerization basics
- Understanding of RESTful API design principles
- Strong problem-solving skills and attention to detail

Nice to Have:
- Experience with React, Vue.js, or other frontend frameworks
- Knowledge of message queues (RabbitMQ, Kafka)
- Familiarity with Kubernetes and orchestration
- Experience with Redis or other caching solutions
- Contributions to open-source projects
- Understanding of agile/scrum methodologies
"""

CANDIDATES = [
    {
        "candidate_name": "Emily Zhang",
        "email": "emily.zhang@email.com",
        "resume_text": """Emily Zhang
Software Engineer | emily.zhang@email.com

EDUCATION
Bachelor of Science in Computer Science
University of Washington, Seattle — Graduated 2020
GPA: 3.7/4.0

EXPERIENCE
Software Engineer — TechFlow Inc., Seattle, WA (Jan 2021 – Present)
- Designed and built RESTful APIs using Python and FastAPI serving 50K+ daily requests
- Developed microservices architecture reducing system latency by 35%
- Implemented CI/CD pipelines using GitHub Actions and Docker for automated deployments
- Wrote comprehensive unit and integration tests achieving 90% code coverage
- Collaborated with product team to deliver features on agile 2-week sprints

Junior Developer — WebNova Solutions, Seattle, WA (Jun 2020 – Dec 2020)
- Built internal dashboards using React and TypeScript
- Maintained PostgreSQL databases and wrote complex SQL queries
- Participated in daily standups and code reviews

SKILLS
Python, FastAPI, Django, JavaScript, TypeScript, React, PostgreSQL, Docker,
AWS (EC2, S3, Lambda), Git, GitHub Actions, Redis, REST API Design, SQL

PROJECTS
- E-commerce Platform: Full-stack app with FastAPI backend, React frontend, PostgreSQL DB
- Task Scheduler: Distributed job scheduler using Redis and Python
""",
        "summary": "Motivated software engineer with 4+ years of experience building scalable backend services and APIs. Strong in Python/FastAPI with solid cloud and DevOps skills.",
        "education": "B.S. Computer Science, University of Washington, 2020",
        "experience_years": 4.2,
        "matching_skills": ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "Git", "CI/CD", "REST API Design", "React", "Redis"],
        "missing_skills": ["Kubernetes", "Message Queues"],
        "extra_skills": ["GitHub Actions", "SQL", "TypeScript"],
        "score": 82,
        "recommendation": "Hire",
        "justification": "Strong match with excellent Python/FastAPI experience, solid cloud skills, and relevant project work. Minor gaps in Kubernetes and message queues which are nice-to-haves.",
        "technical_questions": [
            "How would you design a rate limiter for the API you built at TechFlow?",
            "Explain the trade-offs between microservices and monolithic architecture for a startup.",
            "How do you handle database migrations in a production environment?",
            "Describe your approach to debugging a slow API endpoint."
        ],
        "hr_questions": [
            "Tell me about a time you had to push back on a product requirement. How did you handle it?",
            "How do you stay current with new technologies?",
            "Describe your ideal work environment."
        ],
        "career_summary": "Emily has progressed from a junior developer to a mid-level engineer with strong backend expertise. She has consistently taken on more responsibility and shows leadership potential.",
        "technical_depth": ["Python ecosystem", "FastAPI/Django", "PostgreSQL optimization", "AWS cloud services", "Docker containerization"],
        "key_achievements": ["Reduced API latency by 35% through microservices redesign", "Achieved 90% test coverage across 3 services", "Built CI/CD pipeline adopted by entire engineering team"],
        "career_trajectory": ["Junior Developer → Software Engineer", "Targeting Senior Engineer role within 1-2 years", "Strong path toward Tech Lead"],
        "ai_strengths": ["Strong Python/backend expertise", "Excellent API design skills", "Proactive about testing and quality", "Good collaboration and communication"],
        "ai_weaknesses": ["Limited Kubernetes experience", "No direct experience with message queues like Kafka"],
        "cultural_fit": "Strong — collaborative team player who values code quality and continuous learning.",
        "growth_potential": "High — demonstrated ability to grow quickly and take on architectural responsibilities.",
    },
    {
        "candidate_name": "Marcus Johnson",
        "email": "marcus.j@email.com",
        "resume_text": """Marcus Johnson
Full Stack Developer | marcus.j@email.com

EDUCATION
Bachelor of Arts in Information Technology
Georgia State University, Atlanta — Graduated 2019

EXPERIENCE
Full Stack Developer — BrightPath Digital, Atlanta, GA (Mar 2021 – Present)
- Develop and maintain web applications using Node.js and Express
- Build responsive frontends with React and Material UI
- Manage MySQL databases and write stored procedures
- Deploy applications on AWS EC2 instances
- Participate in bi-weekly sprint planning and retrospectives

Web Developer — CreativeHub Agency, Atlanta, GA (Aug 2019 – Feb 2021)
- Built client websites using HTML, CSS, JavaScript, and WordPress
- Integrated third-party APIs (payment gateways, social media)
- Maintained hosting environments and domain configurations

SKILLS
JavaScript, Node.js, Express.js, React, MySQL, AWS EC2, HTML/CSS, Git,
REST APIs, MongoDB, WordPress, PHP, Agile/Scrum

PROJECTS
- Restaurant Booking System: MERN stack app with real-time table availability
- Portfolio CMS: Custom content management system for small businesses
""",
        "summary": "Full stack developer with 4+ years of experience primarily in JavaScript/Node.js ecosystem. Solid frontend skills with React. Seeking to expand backend depth.",
        "education": "B.A. Information Technology, Georgia State University, 2019",
        "experience_years": 4.5,
        "matching_skills": ["JavaScript", "React", "REST APIs", "AWS", "Git", "Docker"],
        "missing_skills": ["Python", "PostgreSQL", "FastAPI/Django", "CI/CD", "Kubernetes", "Redis"],
        "extra_skills": ["Node.js", "Express.js", "MongoDB", "MySQL", "PHP", "WordPress"],
        "score": 55,
        "recommendation": "Interview",
        "justification": "Strong JavaScript/Node.js skills but lacks Python experience which is a key requirement. Good general engineering fundamentals but would need ramp-up time on the backend stack.",
        "technical_questions": [
            "How would you migrate an Express.js API to FastAPI? What are the key differences?",
            "Explain the CAP theorem and how it applies to database selection.",
            "How do you handle authentication in your React applications?",
            "What strategies do you use for optimizing MySQL query performance?"
        ],
        "hr_questions": [
            "What motivated you to apply for this role specifically?",
            "How do you approach learning an entirely new technology stack?",
            "Tell me about a challenging bug you recently fixed."
        ],
        "career_summary": "Marcus is a capable full stack developer with strong JavaScript skills. He's looking to broaden his backend expertise beyond Node.js into Python ecosystems.",
        "technical_depth": ["JavaScript/Node.js", "React frontend", "MySQL database design", "REST API development"],
        "key_achievements": ["Built real-time booking system handling 500+ concurrent users", "Reduced page load times by 40% through optimization"],
        "career_trajectory": ["Web Developer → Full Stack Developer", "Aiming to become a well-rounded backend engineer"],
        "ai_strengths": ["Strong JavaScript ecosystem knowledge", "Good frontend development skills", "Experience with agile methodologies"],
        "ai_weaknesses": ["No Python experience", "Limited cloud infrastructure knowledge beyond basic EC2", "No PostgreSQL experience"],
        "cultural_fit": "Good — team-oriented with experience in agency environments requiring adaptability.",
        "growth_potential": "Moderate — motivated to learn but would need significant ramp-up on Python/backend stack.",
    },
    {
        "candidate_name": "Priya Sharma",
        "email": "priya.sharma@email.com",
        "resume_text": """Priya Sharma
Backend Software Engineer | priya.sharma@email.com

EDUCATION
Master of Science in Computer Science
Indian Institute of Technology, Delhi — Graduated 2019
Bachelor of Technology in Computer Engineering
NIT Trichy — Graduated 2017

EXPERIENCE
Software Engineer — DataPulse Analytics, Bangalore (Feb 2021 – Present)
- Built data processing pipelines using Python and Apache Airflow
- Developed RESTful APIs with Django REST Framework for analytics dashboard
- Designed PostgreSQL schemas handling 10M+ records with optimized queries
- Implemented caching layer using Redis reducing response times by 50%
- Set up Docker-based development environments for team of 8 engineers

Software Engineer Intern → Junior Developer — CloudMatrix, Bangalore (Jul 2019 – Jan 2021)
- Developed internal tools using Python and Flask
- Wrote SQL queries for data reporting and analytics
- Automated deployment scripts using Bash and GitHub Actions
- Created REST APIs for mobile app backend

SKILLS
Python, Django, Flask, Django REST Framework, PostgreSQL, Redis, SQL,
Docker, Git, GitHub Actions, Apache Airflow, Linux, Bash, REST API Design,
JavaScript (basic), AWS (S3, EC2)

PROJECTS
- Log Analyzer: Python tool for parsing and analyzing server logs with web dashboard
- Distributed Task Queue: Celery-based task queue with Redis broker
""",
        "summary": "Backend-focused software engineer with 4+ years of Python development experience. Strong in database design, API development, and data pipelines. Master's degree in CS from IIT Delhi.",
        "education": "M.S. Computer Science, IIT Delhi, 2019; B.Tech Computer Engineering, NIT Trichy, 2017",
        "experience_years": 4.8,
        "matching_skills": ["Python", "Django", "PostgreSQL", "Redis", "Docker", "AWS", "Git", "CI/CD", "REST API Design", "Linux"],
        "missing_skills": ["FastAPI", "React/Frontend frameworks", "Kubernetes", "Message Queues"],
        "extra_skills": ["Django REST Framework", "Apache Airflow", "Bash", "Flask"],
        "score": 75,
        "recommendation": "Hire",
        "justification": "Strong Python backend engineer with excellent database and infrastructure skills. Django experience translates well to FastAPI. Minor gaps in frontend and container orchestration.",
        "technical_questions": [
            "How did you optimize PostgreSQL queries for 10M+ records? Walk me through your approach.",
            "Explain how Apache Airflow handles task dependencies and failure recovery.",
            "How would you design a caching strategy for a read-heavy application?",
            "What are the differences between Django and FastAPI? When would you choose one over the other?"
        ],
        "hr_questions": [
            "How do you handle working with remote teams across time zones?",
            "Tell me about a time you had to debug a production issue under pressure.",
            "What interests you about this role compared to your current position?"
        ],
        "career_summary": "Priya has strong backend engineering foundations with excellent Python and database skills. She's looking for broader engineering challenges beyond data pipelines.",
        "technical_depth": ["Python backend development", "PostgreSQL database design", "Redis caching strategies", "Data pipeline architecture", "Docker environments"],
        "key_achievements": ["Improved API response times by 50% with Redis caching", "Designed schema supporting 10M+ records with sub-second queries", "Built Docker environments adopted by entire engineering team"],
        "career_trajectory": ["Junior Developer → Software Engineer", "Targeting Senior Backend Engineer role", "Potential path to Staff Engineer"],
        "ai_strengths": ["Deep Python expertise", "Excellent database design and optimization", "Strong systems thinking", "Good documentation habits"],
        "ai_weaknesses": ["Limited frontend framework experience", "No Kubernetes/orchestration experience", "Primarily backend-focused"],
        "cultural_fit": "Strong — methodical engineer who values clean code and thorough documentation.",
        "growth_potential": "High — strong technical foundation with clear growth trajectory toward senior roles.",
    },
    {
        "candidate_name": "Tyler Rodriguez",
        "email": "tyler.r@email.com",
        "resume_text": """Tyler Rodriguez
Junior Software Developer | tyler.r@email.com

EDUCATION
Bachelor of Science in Software Engineering
Arizona State University, Tempe — Graduated 2022
Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development

EXPERIENCE
Junior Software Developer — StartUp Labs, Phoenix, AZ (Aug 2022 – Present)
- Assist in building and maintaining a SaaS platform using Python and Flask
- Write unit tests and help maintain test coverage above 75%
- Fix bugs and implement small features under senior developer guidance
- Participate in code reviews to learn best practices
- Document API endpoints using Swagger/OpenAPI

Software Engineering Intern — Digital Wave, Phoenix, AZ (May 2022 – Jul 2022)
- Built internal admin dashboard using React and Python Flask
- Wrote SQL queries for data extraction and reporting
- Assisted with AWS S3 file management and Lambda function deployment

SKILLS
Python, Flask, JavaScript, React (basic), HTML/CSS, PostgreSQL, SQL,
Git, AWS (S3, Lambda), Docker (basic), REST APIs, Agile, Jira

PROJECTS
- Student Budget Tracker: Flask app with PostgreSQL for personal finance management
- Weather Dashboard: React frontend consuming OpenWeatherMap API
""",
        "summary": "Junior software developer with 2 years of professional experience. Eager to learn and grow. Solid academic foundation with growing practical skills in Python and web development.",
        "education": "B.S. Software Engineering, Arizona State University, 2022",
        "experience_years": 2.0,
        "matching_skills": ["Python", "Flask", "PostgreSQL", "SQL", "Git", "REST APIs", "Docker"],
        "missing_skills": ["FastAPI/Django", "CI/CD", "Kubernetes", "Redis", "Advanced AWS"],
        "extra_skills": ["React", "AWS S3", "AWS Lambda", "Flask", "Swagger"],
        "score": 48,
        "recommendation": "Interview",
        "justification": "Junior developer with potential but limited professional experience. Has foundational Python and database skills but would need significant mentorship and ramp-up time. Worth interviewing for growth potential.",
        "technical_questions": [
            "How would you improve the test coverage of a legacy Flask application?",
            "Explain the difference between SQL joins with a practical example.",
            "How does garbage collection work in Python?",
            "What would you do differently if rebuilding your student budget tracker today?"
        ],
        "hr_questions": [
            "How do you handle feedback during code reviews?",
            "Describe a time you struggled with a technical concept. How did you overcome it?",
            "Where do you see yourself in 3 years?"
        ],
        "career_summary": "Tyler is a junior developer still building foundational skills. He shows initiative and eagerness to learn but needs more experience with production systems and advanced concepts.",
        "technical_depth": ["Python basics", "Flask web framework", "SQL fundamentals", "Basic AWS services"],
        "key_achievements": ["Maintained 75%+ test coverage for team codebase", "Built admin dashboard used by internal operations team"],
        "career_trajectory": ["Junior Developer → Mid-level Developer (target)", "Needs mentorship and structured growth plan"],
        "ai_strengths": ["Eager to learn and grow", "Good foundational Python skills", "Willing to write tests and documentation"],
        "ai_weaknesses": ["Limited production experience", "Basic understanding of DevOps/CI-CD", "No experience with advanced frameworks", "Limited cloud infrastructure knowledge"],
        "cultural_fit": "Good — humble, coachable, and team-oriented. Would benefit from strong mentorship.",
        "growth_potential": "Moderate — shows promise but needs 1-2 more years of experience to be independently productive.",
    },
    {
        "candidate_name": "Sarah Mitchell",
        "email": "sarah.mitchell@email.com",
        "resume_text": """Sarah Mitchell
Software Engineer | sarah.mitchell@email.com

EDUCATION
Bachelor of Science in Computer Science
University of Michigan, Ann Arbor — Graduated 2020
Minor in Mathematics

EXPERIENCE
Software Engineer — NexGen Software, Austin, TX (Jun 2021 – Present)
- Build and maintain backend services using Python and Django
- Develop RESTful APIs consumed by mobile and web clients
- Write complex PostgreSQL queries and optimize database performance
- Implement automated testing achieving 85% coverage
- Use Docker for local development and deployment
- Contribute to technical documentation and runbooks

Software Engineer — LogicTree Inc., Austin, TX (Jul 2020 – May 2021)
- Developed Python scripts for data processing and ETL pipelines
- Built internal tools using Flask and Jinja2 templates
- Managed MySQL databases and performed data migrations
- Assisted with AWS EC2 and S3 configuration

SKILLS
Python, Django, Flask, PostgreSQL, MySQL, SQL, Docker, Git, AWS (EC2, S3),
REST APIs, JavaScript, HTML/CSS, Linux, pytest, Bash, Agile/Scrum

PROJECTS
- Recipe Sharing Platform: Django app with user auth, recipe CRUD, and search functionality
- Expense Splitter: Python CLI tool for splitting bills among groups
- Open Source: Contributed documentation fixes to a popular Django REST framework plugin
""",
        "summary": "Software engineer with 4 years of experience in Python backend development. Strong database skills with Django and PostgreSQL. Active open-source contributor with good communication skills.",
        "education": "B.S. Computer Science, University of Michigan, 2020",
        "experience_years": 4.0,
        "matching_skills": ["Python", "Django", "PostgreSQL", "Docker", "AWS", "Git", "REST APIs", "Linux"],
        "missing_skills": ["FastAPI", "React/Frontend", "CI/CD pipelines", "Kubernetes", "Redis"],
        "extra_skills": ["Flask", "MySQL", "Bash", "pytest"],
        "score": 68,
        "recommendation": "Interview",
        "justification": "Solid Python/Django engineer with good database skills. Missing some nice-to-haves like FastAPI, CI/CD, and frontend experience. Good communicator with open-source involvement. Worth interviewing to assess growth trajectory.",
        "technical_questions": [
            "How do you approach database migration strategies in Django for zero-downtime deployments?",
            "Describe your testing philosophy. How do you decide what to test?",
            "How would you design an API versioning strategy?",
            "What performance bottlenecks have you encountered with Django ORM and how did you address them?"
        ],
        "hr_questions": [
            "What motivated you to contribute to open source?",
            "How do you prioritize technical debt versus new features?",
            "Tell me about a project you're most proud of and why."
        ],
        "career_summary": "Sarah is a dependable backend engineer with solid Django and PostgreSQL skills. She has good fundamentals and is looking for a role with more technical challenge and growth.",
        "technical_depth": ["Python/Django backend", "PostgreSQL database optimization", "AWS cloud basics", "Testing with pytest"],
        "key_achievements": ["Achieved 85% test coverage across 3 Django services", "Open-source contributor to Django REST framework", "Built ETL pipelines processing 1M+ records daily"],
        "career_trajectory": ["Junior → Software Engineer", "Targeting Senior Engineer role", "Good potential for tech lead path"],
        "ai_strengths": ["Strong Python/Django expertise", "Good database optimization skills", "Open-source contributor shows initiative", "Good technical documentation"],
        "ai_weaknesses": ["No FastAPI experience", "Limited frontend skills", "No CI/CD pipeline design experience", "Basic AWS knowledge only"],
        "cultural_fit": "Strong — collaborative, documentation-minded, and community-oriented through open-source work.",
        "growth_potential": "Moderate to High — solid foundation with clear upward trajectory. Could accelerate with exposure to modern tooling.",
    },
]

def main():
    print("Seeding Supabase...")

    jd = insert_job_description(title=JD_TITLE, raw_text=JD_RAW_TEXT)
    jd_id = jd.get("id")
    if not jd_id:
        print("ERROR: Failed to insert job description.")
        return
    print(f"Inserted job description: {JD_TITLE} (id={jd_id})")

    for c in CANDIDATES:
        row = insert_candidate_result(
            jd_id=jd_id,
            candidate_name=c["candidate_name"],
            resume_text=c["resume_text"],
            summary=c["summary"],
            education=c["education"],
            experience_years=c["experience_years"],
            matching_skills=c["matching_skills"],
            missing_skills=c["missing_skills"],
            extra_skills=c["extra_skills"],
            score=c["score"],
            recommendation=c["recommendation"],
            justification=c["justification"],
            technical_questions=c["technical_questions"],
            hr_questions=c["hr_questions"],
            email=c["email"],
            status="Sourced",
            career_summary=c["career_summary"],
            technical_depth=c["technical_depth"],
            key_achievements=c["key_achievements"],
            career_trajectory=c["career_trajectory"],
            ai_strengths=c["ai_strengths"],
            ai_weaknesses=c["ai_weaknesses"],
            cultural_fit=c["cultural_fit"],
            growth_potential=c["growth_potential"],
        )
        print(f"  Inserted candidate: {c['candidate_name']} (score={c['score']}, id={row.get('id', '?')})")

    print(f"\nDone! Seeded 1 JD + {len(CANDIDATES)} candidates.")


if __name__ == "__main__":
    main()
