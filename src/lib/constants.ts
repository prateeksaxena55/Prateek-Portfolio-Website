export const SITE = {
  name: "Prateek Saxena",
  title: "AI Engineer · Dallas, TX",
  email: "prateeksaxena330@gmail.com",
  location: "Dallas, TX",
};

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const RESUME_URL = "/prateek-saxena-resume.pdf";

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/prateek-saxena-14331895/",
};

export const VOICE_AGENT_PHONE = "+17432263633";
export const PERSONAL_PHONE = "+19452334708";

export const HERO = {
  eyebrow: "AI ENGINEER · 7+ YEARS · OPEN TO ROLES & RELOCATION",
  name: "Prateek Saxena",
  tagline: "Building LLM-powered AI products.",
  sub: "AI Engineer and Machine Learning Engineer based in Dallas, Texas — open to relocation. 7+ years across marketing analytics, analytics engineering, and business data systems. I turn business workflows, customer data, and internal knowledge into usable AI products.",
  stack: ["FastAPI", "React", "LangChain", "OpenAI", "Python", "SQL"],
};

export const EXPERIENCE = [
  {
    id: "growith",
    index: "01",
    dateRange: "May 2023 — Present",
    role: "AI Engineer",
    company: "Growith",
    location: "Dallas, TX",
    summary:
      "Shipping production LLM systems — Corrective RAG, multi-agent SQL copilots, voice agents, and ML churn intelligence — for franchise operators and multi-brand retail clients.",
    isCurrent: true,
  },
  {
    id: "rapid-punching",
    index: "02",
    dateRange: "Jan 2020 — Jul 2022",
    role: "Analytics Engineer",
    company: "Rapid Punching",
    location: "India",
    summary:
      "Rebuilt revenue reporting in SQL and Power BI, designed modular transformation workflows, and shipped sales forecasting models across order, customer, and campaign data.",
    isCurrent: false,
  },
  {
    id: "web-ignito",
    index: "03",
    dateRange: "Jan 2018 — Nov 2019",
    role: "Data Analyst",
    company: "Web Ignito",
    location: "India",
    summary:
      "Analyzed marketing, sales, and customer data for agency clients across eCommerce, SaaS, and local service — tracking CAC, ROAS, and funnel performance.",
    isCurrent: false,
  },
];

export const EDUCATION = [
  {
    id: "ut-dallas",
    index: "01",
    dateRange: "Aug 2022 — May 2024",
    degree: "Master of Science, Marketing",
    institution: "The University of Texas at Dallas",
    location: "Dallas, TX",
    summary:
      "Focused on Customer Analytics, Predictive Modeling, and Advanced Web Analytics. GPA 3.97.",
    highlight: "GPA 3.97" as string | null,
  },
  {
    id: "vit-pune",
    index: "02",
    dateRange: "2014 — 2018",
    degree: "Bachelor of Technology, Chemical Engineering",
    institution: "Vishwakarma Institute of Technology",
    location: "Pune, India",
    summary:
      "Engineering foundation — strong quantitative training that later shaped my move into analytics and AI engineering.",
    highlight: null as string | null,
  },
];

export const GROWITH_OVERVIEW =
  "Joined Growith to build production LLM systems for a 10+ brand ecosystem serving franchise operators and multi-brand retail clients. Shipped four end-to-end AI products spanning corrective RAG, multi-agent SQL agents, conversational voice agents, and ML-driven churn intelligence — each replacing manual workflows and reducing operational load by 40–67%.";

export const GROWITH_PROJECTS = [
  {
    index: 1,
    category: "CORRECTIVE RAG",
    title: "Multi-Brand Knowledge Support Agent",
    problem:
      "Sales and support teams across 10+ brands needed accurate, source-backed answers — but inconsistent retrieval was creating clarification tickets and escalations.",
    approach:
      "Built a Corrective RAG agent ingesting product docs, pricing rules, FAQs, support playbooks, and vertical-specific content from AWS S3 into a searchable AI knowledge layer. Designed a LangGraph retrieval pipeline with semantic search, metadata filtering, query rewriting, document relevance grading, and fallback retrieval to correct weak retrieval before generating grounded answers. Deployed as a FastAPI service with Docker on AWS.",
    metrics: [
      { value: "−42%", label: "clarification tickets" },
      { value: "−56%", label: "support escalations" },
    ],
    stack: [
      "LangGraph",
      "PostgreSQL + pgvector",
      "FastAPI",
      "Docker",
      "AWS S3",
    ],
  },
  {
    index: 2,
    category: "MULTI-AGENT SYSTEM",
    title: "Multi-Agent AI Business Analyst Copilot",
    problem:
      "Franchise operators needed validated SQL answers and executive-ready insights from natural-language questions — without analyst bottlenecks or hallucinated conclusions.",
    approach:
      "Built a multi-agent copilot orchestrating intent classification, schema selection, SQL generation, data quality validation, metric computation, insight synthesis, and response verification — all traced through LangSmith for debugging and observability. Added long-term memory using PostgreSQL conversation history and vector-based semantic retrieval to preserve franchise-specific KPI definitions, prior analysis patterns, and stakeholder preferences.",
    metrics: [
      { value: "−64%", label: "manual reporting workload" },
      { value: "−47%", label: "ad-hoc analyst requests" },
    ],
    stack: ["LangGraph", "LangSmith", "PostgreSQL", "pgvector", "Python", "SQL"],
    clients: ["Chicken Express", "Teriyaki Madness", "Donatos Pizza"],
  },
  {
    index: 3,
    category: "VOICE AI",
    title: "Tool-Calling AI Voice Agent Platform",
    problem:
      "Restaurant, retail, and service businesses were losing leads from missed inbound calls — and front-desk staff were overloaded with routine inquiries.",
    approach:
      "Designed an AI receptionist with speech-to-text, LLM reasoning, function calling, and structured outputs. Integrated with CRM, calendar, and order-management APIs to handle bookings, qualify leads, place order inquiries, and trigger SMS follow-ups. Built human-escalation logic, call transcript storage, and post-call summaries to convert unstructured phone conversations into trackable business actions.",
    metrics: [
      { value: "−67%", label: "missed-call leakage" },
      { value: "−39%", label: "front-desk follow-up" },
    ],
    stack: [
      "LLM Function Calling",
      "Speech-to-Text",
      "Structured Outputs",
      "CRM APIs",
      "FastAPI",
    ],
  },
  {
    index: 4,
    category: "ML & PREDICTIVE",
    title: "Customer Segmentation & Churn Intelligence Platform",
    problem:
      "Retention teams were targeting customers reactively — by the time someone churned, it was too late to act.",
    approach:
      "Built end-to-end ML pipelines classifying customers into high-value, at-risk, low-value, lapsed, repeat, and win-back segments. Engineered features in SQL using RFM analysis, cohort behavior, purchase frequency, recency, and AOV. Trained logistic regression and tree-based churn scoring models alongside clustering, with FastAPI endpoints serving predictions to a React dashboard for targeted win-back campaigns and personalized offers.",
    metrics: [
      { value: "+37%", label: "at-risk identification" },
      { value: "−51%", label: "manual segmentation work" },
    ],
    stack: [
      "Scikit-learn",
      "Pandas",
      "RFM Analysis",
      "FastAPI",
      "React",
      "PostgreSQL",
    ],
  },
];

export const RAPID_PUNCHING_CONTENT = {
  overview:
    "Owned analytics engineering at Rapid Punching — rebuilding revenue reporting from the ground up, designing modular SQL transformation workflows, and shipping product-level sales forecasting models. Worked across sales, retention, marketing, and merchandising data to give leadership accurate visibility and reduce manual data prep across teams.",
  achievements: [
    "Rebuilt revenue reporting in SQL and Power BI to separate gross sales, discounts, refunds, shipping, taxes, and net revenue — giving leadership accurate weekly performance views and surfacing margin leakage from high-discount products and refund-heavy SKUs.",
    "Designed modular SQL transformation workflows across raw order, customer, product, refund, and campaign data — cutting repeated manual Excel data prep by nearly 30%.",
    "Built Python and pandas-based data quality checks to flag duplicate orders, missing customer IDs, SKU mismatches, refund inconsistencies, and broken UTM parameters before reports refreshed — measurably improving trust in Power BI dashboards used for revenue and ROAS reviews.",
    "Analyzed first-to-second purchase drop-off, recency, frequency, AOV, and repeat purchase behavior to help marketing build practical segments for lapsed buyers, high-value customers, and discount-sensitive shoppers.",
    "Created product-level sales forecasting models in Python using historical orders, seasonality, recent sales velocity, and promotional periods — improving demand visibility for fast-moving SKUs and helping merchandising reduce overstock and stockout blind spots during campaigns.",
  ],
  stack: ["SQL", "Python", "Pandas", "Power BI", "Excel"],
};

export const WEB_IGNITO_CONTENT = {
  overview:
    "Started my career analyzing marketing, sales, and customer data for agency clients across eCommerce, SaaS, and local service industries. Built recurring Power BI dashboards from multi-source datasets and delivered weekly data-backed recommendations that helped clients improve lead quality, optimize budget allocation, and make faster marketing decisions.",
  achievements: [
    "Tracked CAC, ROAS, conversion rates, lead quality, funnel drop-offs, and customer acquisition trends using SQL, Excel, and Power BI across eCommerce, SaaS, and local service clients.",
    "Built recurring Power BI dashboards and cleaned multi-source datasets from Google Analytics, Meta Ads, Google Ads, CRM exports, and website forms — reducing manual reporting effort by 38% and improving visibility into campaign performance, channel efficiency, and customer journey bottlenecks.",
    "Delivered weekly data-backed recommendations on budget allocation, landing page performance, audience targeting, and offer strategy — helping clients identify underperforming campaigns and improve lead quality.",
  ],
  stack: ["SQL", "Power BI", "Excel", "Google Analytics", "Meta Ads"],
};

export const CONTACT_INTRO = {
  heading: "Let's Connect",
  sub: "Whether you're hiring, building, or just curious — I'd love to hear from you.",
};

const LINKEDIN_URL = "https://www.linkedin.com/in/prateek-saxena-14331895/";
const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=prateeksaxena330@gmail.com";

export const CONTACT_CARDS = [
  {
    id: "hire",
    icon: "Briefcase",
    title: "Hire Me",
    description:
      "Looking for an AI Engineer or ML Engineer? Let's talk about your next role.",
    eyebrow: "OPEN TO OPPORTUNITIES",
    actions: [
      { type: "linkedin", url: LINKEDIN_URL },
      { type: "email", url: GMAIL_COMPOSE_URL },
    ],
  },
  {
    id: "hello",
    icon: "MessageCircle",
    title: "Say Hello",
    description:
      "Just want to chat about AI, engineering, or marketing analytics? I'm always up for a good conversation.",
    eyebrow: "DROP ME A LINE",
    actions: [
      { type: "email", url: GMAIL_COMPOSE_URL },
      { type: "linkedin", url: LINKEDIN_URL },
    ],
  },
];

export const SKILLS = [
  {
    number: "01",
    category: "Languages",
    items: ["Python", "TypeScript", "SQL", "JavaScript"],
  },
  {
    number: "02",
    category: "GenAI & LLM",
    items: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "Multi-Agent Systems",
      "Tool Calling",
      "Structured Outputs",
      "Long-Term Memory",
      "Prompt Engineering",
    ],
  },
  {
    number: "03",
    category: "RAG",
    items: [
      "Corrective RAG",
      "Self-RAG",
      "Embeddings",
      "Vector Databases",
      "pgvector",
      "Semantic Search",
      "Metadata Filtering",
      "Retrieval Evaluation",
    ],
  },
  {
    number: "04",
    category: "Machine Learning",
    items: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Churn Prediction",
      "Customer Segmentation",
      "Time Series Forecasting",
      "Classification",
      "Clustering",
    ],
  },
  {
    number: "05",
    category: "Backend & Data",
    items: [
      "FastAPI",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "SQL Server",
      "ETL Pipelines",
      "Star Schema",
    ],
  },
  {
    number: "06",
    category: "Cloud & Ops",
    items: ["AWS S3", "AWS EC2", "Docker", "Git", "CI/CD", "Logging & Monitoring"],
  },
];
