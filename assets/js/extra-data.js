/* ============================================================
   EXTRA DATA — loaded after the main PORTFOLIO object.
   Edit here to change: the Albion HR case study, the per-project
   detail popups and the reviews. Nothing else needs touching.
   ============================================================ */
(function () {
  var D = window.PORTFOLIO;
  if (!D) return;

  /* ---------------------------------------------------------
     1. FEATURED CASE STUDY — Albion Workforce (HR demo video)
     Every fact below is taken from what the demo itself shows.
     --------------------------------------------------------- */
  D.spotlight = {
    id: "albion",
    kicker: "PRODUCT CASE STUDY · HR TECH",
    title: "Albion Workforce",
    tagline: "An HR and sales platform where AI agents do the work and people make the calls.",
    summary:
      "Recruiting, onboarding, UK payroll through to HMRC, and a sales pipeline, run by twelve supervised agents including Muse by Meta. Every financial step needs a human sign-off and leaves an audit trail.",
    byline: "Designed and built by Ajanta Luhana",
    video: { src: "assets/videos/albion-hr.mp4", poster: "assets/videos/albion-hr.jpg", label: "Albion Workforce demo video" },
    metrics: [
      { n: 12, s: "", l: "agents on shift 24/7" },
      { n: 126, s: "", l: "employees on payroll" },
      { n: 312, s: " h", l: "admin time saved weekly" },
      { n: 100, s: "%", l: "financial actions signed off" }
    ],
    chips: ["Muse by Meta", "Agent orchestration", "UK PAYE / NI / RTI", "UK GDPR audit trail", "Human-in-the-loop", "Meta Ads + WhatsApp"],
    /* t = start time in seconds inside albion-hr.mp4 (matches the on-screen "SCENE n / 10" captions) */
    chapters: [
      { t: 0,  title: "Overview",            text: "An HR and sales platform where AI agents do the work and people make the calls." },
      { t: 5,  title: "Command Centre",      text: "Albion Workforce runs HR and sales with twelve AI agents. Humans only decide what matters." },
      { t: 12, title: "Recruiting",          text: "The Recruiting Agent scores CVs against the job spec and books interviews on its own." },
      { t: 19, title: "Offer approval",      text: "It reaches offer stage and asks the People Director to approve. No offer leaves without a human." },
      { t: 26, title: "Onboarding",          text: "The Onboarding Agent runs Right to Work checks, orders kit and creates accounts. UK GDPR audit trail on every change." },
      { t: 33, title: "Attendance & compliance", text: "The Attendance and Compliance agents watch shifts, leave and the 48-hour working week limit." },
      { t: 40, title: "Payroll",             text: "The Payroll Agent calculates PAYE, National Insurance and pension for 126 people in seconds." },
      { t: 47, title: "HMRC sign-off",       text: "Before anything goes to HMRC, a person approves. The agent submits the FPS and stores the receipt." },
      { t: 54, title: "Sales pipeline",      text: "The Sales Agent qualifies leads, drafts proposals and chases quotes while the team sleeps." },
      { t: 61, title: "Employee dashboard",  text: "Every employee gets their own dashboard: payslip, leave, hours and an assistant. Leave is approved in seconds." },
      { t: 68, title: "Agent control",       text: "Twelve agents, including Meta ads, a WhatsApp concierge and Muse by Meta for reasoning. Each has a dial: Suggest, Ask first or Autonomous." }
    ],
    principles: [
      { k: "01", h: "Agents do the work", p: "Twelve supervised agents handle recruiting, onboarding, attendance, payroll, sales, compliance, expenses and more, around the clock." },
      { k: "02", h: "People make the calls", p: "A “Needs your decision” queue puts every contract change, offer and payroll run in front of a human to approve or decline." },
      { k: "03", h: "Everything leaves a trail", p: "A live agent-activity feed, a UK GDPR audit trail on every change, and stored receipts for every submission." }
    ],
    modules: [
      { h: "Command Centre", p: "Headcount, open roles, open pipeline and hours saved at a glance, with today’s attendance and the approvals waiting on you." },
      { h: "Recruitment", p: "A hiring board (Applied → Screened → Interview → Offer) with an AI-fit score on every candidate." },
      { h: "People", p: "Searchable employee directory across six UK offices with roles, teams, contract type and start dates." },
      { h: "Payroll", p: "A five-step monthly run — collect hours, PAYE and NI, pension, validate, submit RTI — approved by a person before it reaches HMRC." },
      { h: "Sales pipeline", p: "Lead → Qualified → Proposal → Won board in GBP, with the Sales Agent qualifying leads and drafting proposals." },
      { h: "Employee self-service", p: "Payslip, annual leave, weekly hours, tasks and an “Ask Albion” assistant on WhatsApp for every employee." },
      { h: "Agents", p: "Every agent shows what it is doing now, its monthly task count, and a Suggest / Ask first / Autonomous dial." }
    ],
    agents: ["Recruiting", "Onboarding", "Attendance", "Payroll", "Sales", "Compliance", "Meta Social Hiring", "WhatsApp Concierge", "Expenses", "IT Helpdesk"],
    integrations: [
      { h: "Muse by Meta", p: "Used as the reasoning model (concept integration)." },
      { h: "Meta Ads", p: "Posts roles to Facebook and Instagram, tunes ad spend and routes applicants." },
      { h: "WhatsApp Business", p: "A concierge agent answers staff and candidate questions." },
      { h: "HMRC (RTI / FPS)", p: "Payroll submissions prepared by the agent and released only after sign-off." }
    ],
    disclaimer:
      "Concept demo. Muse is a Meta AI model and this is a concept integration. Albion Workforce Ltd and all people, clients, photos and figures are invented sample data."
  };

  /* The spotlight also counts as a project in the totals; the grid skips it. */
  D.projects.unshift({
    spotlight: true,
    title: "Albion Workforce — AI-Agent HR & Sales Platform",
    category: "AI Agents",
    description: D.spotlight.summary,
    technologies: D.spotlight.chips
  });

  /* ---------------------------------------------------------
     2. PROJECT DETAILS — shown in the "Details" popup.
     Key = text before the " — " in the project title.
     Everything restates facts already in each project description.
     --------------------------------------------------------- */
  D.projectDetails = {
    "Lightweight Quadcopter UAV": {
      tagline: "A final-year thesis UAV prototype, from Simulink model to flying firmware.",
      facts: [["Type", "Bachelor of Engineering thesis"], ["Institution", "MUET Jamshoro"], ["Supervisor", "Dr. Fahim Aziz Umrani"], ["Recognition", "Funded by Ignite · Shortlisted NGIRI 2022–23"]],
      highlights: [
        "250 mm carbon-fibre frame with an APM 2.8 flight controller, u-blox 7 GPS, 433 MHz telemetry and a 1.5 GHz video link",
        "Flight-dynamics model and PID control for altitude, roll, pitch and yaw built in MATLAB/Simulink",
        "Model converted to C firmware and run on Arduino IDE",
        "Tested for simulated hovering and position response, roll-pitch-yaw response to control inputs, and live video transmission",
        "Aimed at aerial surveillance, real-time monitoring, site surveying, agriculture, environmental inspection and emergency response"
      ]
    },
    "DroneVision AI": {
      tagline: "From raw aerial video to risk-scored incidents a human can act on.",
      facts: [["Domain", "Computer vision · Geospatial"], ["Quality", "88 backend tests (per repository README)"], ["Safety rule", "HIGH / CRITICAL incidents always need operator review"], ["Runs without", "A physical drone (recorded video + simulated GPS)"]],
      highlights: [
        "Detects and tracks objects, reasons over time and space, scores risk and routes incidents to human review",
        "Live operations dashboard streamed over WebSocket",
        "Zone drawing directly on the video frame",
        "Tool-grounded AI assistant with an automatic rules-engine fallback",
        "PDF, JSON and CSV report export"
      ]
    },
    "AgentOS": {
      tagline: "Turns a plain-language goal into a verified, evidence-backed report.",
      facts: [["Orchestration", "LangGraph multi-agent workflow"], ["Models", "Local Ollama"], ["Retrieval", "Hybrid vector + full-text on pgvector"], ["Control", "Human approval of the plan"]],
      highlights: [
        "Six cooperating roles: Planner, Analyst, Researcher, Verifier, Reflector and Reporter",
        "Sandboxed Docker execution of generated Python",
        "Live Server-Sent Events streaming and long-term memory",
        "Reproducible evaluation pipeline"
      ]
    },
    "Ajanta AI": {
      tagline: "A recruiter-facing chatbot that answers from a curated knowledge base, safely.",
      facts: [["LLM provider", "Groq-hosted models"], ["Retrieval", "BM25 over a curated knowledge base"], ["Streaming", "Server-Sent Events"], ["Hardening", "Prompt-injection guardrails · per-IP rate limiting"]],
      highlights: [
        "Answers questions about experience, projects and skills",
        "Multi-round tool-calling agent",
        "FastAPI backend with Docker support",
        "Automated test suite (pytest)"
      ]
    },
    "IELTSMate": {
      tagline: "A full-stack IELTS prep platform with AI writing feedback and personalised plans.",
      facts: [["Frontend", "Next.js · React · TypeScript · Tailwind CSS"], ["Backend", "FastAPI with a configurable AI-provider layer"], ["Data & auth", "Supabase"], ["Deployment", "Docker Compose"]],
      highlights: [
        "AI-assisted writing feedback and speaking practice",
        "Reading and listening practice with level assessment",
        "Personalised study plans and progress tracking",
        "AI provider can be local Ollama or a cloud model"
      ]
    },
    "VisionEye": {
      tagline: "Draw a zone on any video and count what moves through it.",
      facts: [["Model", "Ultralytics YOLOv10"], ["Stack", "Flask · OpenCV · NumPy"], ["Delivery", "Desktop script and browser web app"], ["Output", "Annotated video + zone-wise summaries"]],
      highlights: [
        "Upload surveillance or traffic video and define custom polygon zones",
        "Detects and counts vehicles and persons inside each zone",
        "Annotated output video with bounding boxes, labels, zone overlays and frame details"
      ]
    },
    "Metavystic HRMIS": {
      tagline: "End-to-end HR management with self-hosted GenAI for documents and approvals.",
      facts: [["Role", "AI Engineer · Metavystic"], ["Backend", "Django · JavaScript"], ["AI layer", "Ollama · LangChain · RAG"], ["Access", "Role-based access control"]],
      highlights: [
        "Covers the full employee lifecycle: recruitment, onboarding, workforce administration, attendance, performance, asset allocation and offboarding",
        "Centralised data, configurable workflows and real-time reporting",
        "Self-hosted GenAI and RAG automation for HR documents and approval workflows"
      ]
    },
    "AgentAutopsy": {
      tagline: "Forensic debugging for AI agents, with evidence behind every claim.",
      facts: [["Quality", "93 tests (backend + SDK, per repository README)"], ["Backend", "FastAPI · SQLAlchemy · PostgreSQL · Celery"], ["Dashboard", "Next.js · TypeScript · Three.js"], ["Privacy", "Secrets and PII redacted before storage"]],
      highlights: [
        "Ingests agent execution traces and rebuilds them as an event graph",
        "Detects failures, ranks root causes with evidence and tests counterfactual fixes",
        "Every root-cause claim carries evidence event IDs and a confidence score",
        "2D and 3D causal graph, timeline, inspector and report"
      ]
    },
    "AgentOps AI .NET": {
      tagline: "A local-first agent platform where tools are approved, not assumed.",
      facts: [["Status", "In development · Milestone 1 complete"], ["Backend", "ASP.NET Core (.NET 10) · EF Core"], ["Data & models", "PostgreSQL + pgvector · Ollama"], ["Verification", "CI and 17 passing unit tests"]],
      highlights: [
        "A business goal is planned by a local model, validated, then executed only through approved registered tools",
        "Returns a traceable report",
        "Milestone 1: Clean Architecture scaffold, health endpoints, EF Core migration, CI",
        "Planned next: agents, RAG and approvals"
      ]
    }
  };

  /* ---------------------------------------------------------
     3. REVIEWS
     Add real attribution when you have it, per review:
       name: "Full Name", role: "Job title, Company", url: "https://linkedin.com/…"
     Anything you fill in is shown automatically.
     --------------------------------------------------------- */
  D.reviewGroups = [
    { id: "ai",  tab: "AI & LLM",          label: "AI Engineering & LLM Development",     ico: "AI" },
    { id: "hr",  tab: "HRMS & Automation", label: "HRMS & Business Process Automation",   ico: "HR" },
    { id: "api", tab: "Backend & APIs",    label: "Backend Development & API Integration", ico: "BE" },
    { id: "da",  tab: "Data & ML",         label: "Data Analytics & Machine Learning",    ico: "DA" },
    { id: "cv",  tab: "Vision & Research", label: "Computer Vision & Technical Projects", ico: "CV" }
  ];

  D.reviews = [
    { g: "ai",  title: "AI-Powered Business Automation", text: "Ajanta did an excellent job developing an AI-powered automation solution for our business. Her ability to understand complex requirements and translate them into practical AI solutions was impressive." },
    { g: "ai",  title: "RAG-Based Knowledge Assistant", text: "Working with Ajanta was a great experience. She developed a Retrieval-Augmented Generation (RAG) system that made accessing and retrieving information from internal documents significantly easier." },
    { g: "ai",  title: "Custom AI Chatbot", text: "Ajanta demonstrated excellent technical expertise while developing our custom AI chatbot. The solution was well-structured, responsive, and aligned with our business requirements." },
    { g: "ai",  title: "LLM Integration", text: "Her knowledge of Large Language Models and API integration helped us implement an intelligent solution for our workflow. She maintained professional communication throughout the project." },
    { g: "ai",  title: "AI Agent Development", text: "Ajanta has a strong understanding of AI agent architecture. She approached our requirements systematically and delivered an automation solution that simplified several repetitive business processes." },
    { g: "ai",  title: "Local LLM Deployment", text: "Excellent work on implementing a locally hosted LLM solution. Ajanta understood our requirements regarding data privacy, deployment, and performance optimization." },

    { g: "hr",  title: "HRMS Development", text: "Ajanta contributed significantly to our HR management system. Her understanding of HR workflows, backend development, and automation helped us improve our internal processes." },
    { g: "hr",  title: "Employee Management Automation", text: "She developed an efficient employee management solution that simplified employee records, attendance tracking, and administrative operations. Highly recommended for business automation projects." },
    { g: "hr",  title: "Recruitment Workflow Automation", text: "Ajanta demonstrated excellent problem-solving skills while developing our recruitment automation workflow. Her technical knowledge helped streamline several manual recruitment activities." },
    { g: "hr",  title: "HR Policy Assistant", text: "Ajanta built an intelligent HR policy assistant that made it easier for employees to access organizational policies and receive relevant information without manual assistance." },

    { g: "api", title: "FastAPI Backend Development", text: "Ajanta delivered a well-organized backend solution using FastAPI. Her approach to API architecture, database integration, and application structure was professional and efficient." },
    { g: "api", title: "Database & API Integration", text: "Very satisfied with Ajanta's work. She handled database integration and API development with attention to detail and ensured that the application components worked together smoothly." },
    { g: "api", title: "Docker & Deployment", text: "Ajanta helped us containerize our application using Docker and improve our deployment workflow. She has a practical understanding of backend infrastructure and application deployment." },

    { g: "da",  title: "Business Data Analytics", text: "Ajanta transformed our raw business data into meaningful insights. Her analytical approach and ability to identify useful patterns helped us better understand our operational performance." },
    { g: "da",  title: "Data Visualization & Reporting", text: "Excellent experience working with Ajanta. She developed structured reports and visualizations that made complex business information easier to understand and interpret." },
    { g: "da",  title: "Machine Learning Implementation", text: "Ajanta demonstrated solid knowledge of machine learning concepts and their practical implementation. She was systematic in understanding the problem, preparing the data, and developing the solution." },

    { g: "cv",  title: "Computer Vision Solution", text: "Ajanta showed strong technical understanding while working on our computer vision requirements. Her approach to problem-solving, testing, and optimizing the solution was impressive." },
    { g: "cv",  title: "AI Research & Technical Development", text: "Ajanta is technically capable, detail-oriented, and passionate about emerging technologies. Her ability to work across AI, automation, backend systems, and data analytics makes her a valuable technical contributor." }
  ];
})();
