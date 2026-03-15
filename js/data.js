/* ============================================================
   DevCraft Studio — data.js
   Edit this file to customize all site content.
   ============================================================ */

const SERVICES = [
  {
    icon: '🌐',
    name: 'Web Applications',
    desc: 'Full-stack web apps built with React, Next.js, Vue or plain JS. From landing pages to complex SaaS dashboards with real-time features.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL']
  },
  {
    icon: '📱',
    name: 'Mobile Apps',
    desc: 'Cross-platform iOS & Android apps using React Native or Flutter. Native performance, beautiful UI, deployed to both app stores.',
    tags: ['React Native', 'Flutter', 'Expo', 'Firebase']
  },
  {
    icon: '🤖',
    name: 'AI Integration',
    desc: 'Embed LLMs, image models, or custom ML pipelines into your product. ChatGPT-style interfaces, RAG systems, AI agents and more.',
    tags: ['OpenAI', 'Claude', 'LangChain', 'Pinecone']
  },
  {
    icon: '⚡',
    name: 'APIs & Backend',
    desc: 'Robust REST & GraphQL APIs. Microservices architecture, database design, auth systems, webhooks, and third-party integrations.',
    tags: ['Node.js', 'Python', 'FastAPI', 'GraphQL']
  },
  {
    icon: '☁️',
    name: 'Cloud & DevOps',
    desc: 'CI/CD pipelines, Docker containers, Kubernetes orchestration, AWS/GCP infrastructure-as-code. Zero-downtime deployments.',
    tags: ['AWS', 'GCP', 'Docker', 'Terraform']
  },
  {
    icon: '🎨',
    name: 'UI/UX Design',
    desc: 'Pixel-perfect interfaces designed in Figma. Design systems, component libraries, prototypes, and handoff-ready specs.',
    tags: ['Figma', 'Design Systems', 'Prototyping', 'A/B Testing']
  }
];

const PORTFOLIO = [
  {
    emoji: '🛒',
    color: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)',
    tags: ['E-commerce', 'React', 'Node.js'],
    name: 'ShopMart — Hyperlocal Commerce Platform',
    desc: 'End-to-end grocery delivery platform serving 50 000+ users daily. Real-time inventory, ML-based demand forecasting, multi-vendor support.',
    stats: [
      { val: '50K+', label: 'Daily Users' },
      { val: '99.9%', label: 'Uptime' },
      { val: '3x', label: 'Revenue Growth' }
    ]
  },
  {
    emoji: '🏥',
    color: 'linear-gradient(135deg,#0a1628,#0d2137,#123a5a)',
    tags: ['HealthTech', 'Flutter', 'AI'],
    name: 'MediConnect — Telemedicine App',
    desc: 'HIPAA-compliant telemedicine platform connecting 1 200 doctors with patients. AI-powered symptom checker, instant video consultations.',
    stats: [
      { val: '1.2K', label: 'Doctors' },
      { val: '4.8★', label: 'App Rating' },
      { val: '₹12Cr', label: 'Revenue' }
    ]
  },
  {
    emoji: '📊',
    color: 'linear-gradient(135deg,#1a0533,#2a0a4a,#1e0a38)',
    tags: ['FinTech', 'React', 'Python'],
    name: 'WealthOS — Investment Dashboard',
    desc: 'Real-time portfolio management SaaS for retail investors. Live market data, automated rebalancing, tax harvesting, and AI insights.',
    stats: [
      { val: '₹200Cr', label: 'AUM Tracked' },
      { val: '8K+', label: 'Investors' },
      { val: '2.5s', label: 'Avg Load Time' }
    ]
  },
  {
    emoji: '🎓',
    color: 'linear-gradient(135deg,#0f1923,#1a2a3a,#152233)',
    tags: ['EdTech', 'Next.js', 'AI'],
    name: 'LearnAI — Adaptive Learning Platform',
    desc: 'AI-driven e-learning platform that personalizes content paths for each learner. Live coding sandbox, peer review system, certificates.',
    stats: [
      { val: '25K+', label: 'Students' },
      { val: '340+', label: 'Courses' },
      { val: '91%', label: 'Completion' }
    ]
  },
  {
    emoji: '🚚',
    color: 'linear-gradient(135deg,#0a1a0a,#0d2a0d,#0f200f)',
    tags: ['Logistics', 'React Native', 'Maps'],
    name: 'FreightPilot — Logistics Tracker',
    desc: 'Real-time fleet management and package tracking system for 500+ vehicles. Driver app, route optimization, client portal, IoT integration.',
    stats: [
      { val: '500+', label: 'Vehicles' },
      { val: '18%', label: 'Fuel Saved' },
      { val: '4.9★', label: 'Driver App' }
    ]
  },
  {
    emoji: '🏨',
    color: 'linear-gradient(135deg,#1a1000,#2a1a00,#221300)',
    tags: ['Hospitality', 'Vue.js', 'AI'],
    name: 'StaySync — Hotel Management',
    desc: 'All-in-one PMS for boutique hotels. Dynamic pricing AI, booking engine, housekeeping mobile app, channel manager, revenue analytics.',
    stats: [
      { val: '120+', label: 'Properties' },
      { val: '22%', label: 'RevPAR Lift' },
      { val: '0', label: 'Double Bookings' }
    ]
  }
];

const PLANS = [
  {
    name: 'Starter',
    price: '₹75,000',
    raw: 75000,
    period: 'One-time · 4–6 week delivery',
    featured: false,
    badge: null,
    features: [
      'Up to 10 screens / pages',
      'Responsive web or mobile app',
      'Basic admin dashboard',
      'REST API integration',
      '30-day post-launch support',
      'Source code ownership',
      { text: 'AI features', no: true },
      { text: 'Dedicated project manager', no: true }
    ]
  },
  {
    name: 'Growth',
    price: '₹2,50,000',
    raw: 250000,
    period: 'One-time · 8–12 week delivery',
    featured: true,
    badge: 'Most Popular',
    features: [
      'Unlimited screens',
      'Web + mobile app',
      'Custom CMS & admin panel',
      'Third-party API integrations',
      'AI feature integration',
      'Payment gateway (Razorpay/Stripe)',
      '90-day post-launch support',
      'Dedicated project manager'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    raw: null,
    period: 'Scoped · Ongoing engagement',
    featured: false,
    badge: null,
    features: [
      'Full product team (3–8 devs)',
      'Architecture consulting',
      'Microservices & cloud infra',
      'ML / AI pipeline development',
      'Security audits & penetration test',
      'SLA-backed uptime guarantee',
      '12-month support retainer',
      'CTO-level advisory'
    ]
  }
];

const TESTIMONIALS = [
  {
    stars: 5,
    text: 'DevCraft delivered our fintech MVP in just 9 weeks — ahead of schedule. The code quality is impeccable, and the AI features blew our investors away during the demo.',
    avatar: '👨‍💼',
    name: 'Rahul Mehra',
    role: 'CEO, WealthOS'
  },
  {
    stars: 5,
    text: "We'd been burned by agencies before, but DevCraft was different. They pushed back when our requirements were vague, and the final product far exceeded expectations.",
    avatar: '👩‍💻',
    name: 'Priya Sharma',
    role: 'CTO, MediConnect'
  },
  {
    stars: 5,
    text: 'The team refactored our legacy monolith into microservices without a single hour of downtime. Absolutely stellar DevOps and backend work.',
    avatar: '👨‍🔬',
    name: 'Ankit Joshi',
    role: 'VP Engineering, FreightPilot'
  },
  {
    stars: 5,
    text: 'ARIA, their AI onboarding agent, gave us a proposal in under 10 minutes. The whole engagement has been smooth, transparent, and results-driven.',
    avatar: '👩‍🎨',
    name: 'Sneha Patil',
    role: 'Founder, LearnAI'
  },
  {
    stars: 5,
    text: 'They shipped a React Native app for iOS and Android simultaneously, pixel-perfect against our Figma files. 4.8-star rating on first launch.',
    avatar: '👨‍🚀',
    name: 'Deepak Reddy',
    role: 'Product Lead, ShopMart'
  },
  {
    stars: 5,
    text: 'Transparent pricing, daily standups, and zero scope creep. DevCraft is how software agencies should operate. We\'ve signed for our third project already.',
    avatar: '👩‍💼',
    name: 'Kavita Nair',
    role: 'COO, StaySync'
  }
];

const CONTACT_INFO = [
  { icon: '📧', label: 'Email', value: 'hello@devcraft.studio' },
  { icon: '📱', label: 'Phone / WhatsApp', value: '+91 98765 43210' },
  { icon: '📍', label: 'Location', value: 'Koramangala, Bangalore — 560034' },
  { icon: '⏰', label: 'Working Hours', value: 'Mon–Sat · 9 AM – 7 PM IST' }
];

const TECH_TICKER = [
  'React', 'Next.js', 'Vue', 'TypeScript', 'Node.js',
  'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis',
  'AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
  'React Native', 'Flutter', 'Expo', 'Firebase', 'Supabase',
  'OpenAI', 'Claude', 'LangChain', 'Pinecone', 'Tailwind',
  'Figma', 'GraphQL', 'Stripe', 'Razorpay', 'Prisma'
];

const AGENT_STEPS = [
  { key: 'name',        label: 'Your Name',     question: "Hi! 👋 I'm ARIA, your AI project advisor at DevCraft Studio. I'll help create a custom proposal in just a few questions.\n\nFirst — what's your name?" },
  { key: 'company',     label: 'Company',        question: "Nice to meet you, {name}! 🙌\n\nWhat company or project are you building for?" },
  { key: 'type',        label: 'Project Type',   question: "What type of project are you looking to build?",
    options: ['Web Application', 'Mobile App', 'AI / ML Product', 'SaaS Platform', 'E-commerce', 'Other'] },
  { key: 'description', label: 'Description',    question: "Tell me more about what you're building. What problem does it solve, and who are the users?" },
  { key: 'features',    label: 'Key Features',   question: "What are the 3–5 must-have features for your MVP?",
    hint: 'e.g. "User auth, dashboard, payment gateway, notifications"' },
  { key: 'budget',      label: 'Budget',         question: "What's your approximate budget range?",
    options: ['Under ₹1L', '₹1L – ₹5L', '₹5L – ₹20L', '₹20L – ₹50L', '₹50L+', 'Let\'s Discuss'] },
  { key: 'timeline',    label: 'Timeline',       question: "What's your desired launch timeline?",
    options: ['ASAP (< 4 weeks)', '1–2 months', '2–4 months', '4–6 months', 'Flexible'] },
  { key: 'email',       label: 'Email',          question: "Almost done! 🎉 What email should we send your proposal to?" }
];

// ── Utility helpers ──────────────────────────────────────────

function formatINR(n) {
  if (!n && n !== 0) return '—';
  return '₹' + Number(n).toLocaleString('en-IN');
}

function todayStr() {
  const d = new Date();
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}

function invoiceNum() {
  return 'INV-' + Date.now().toString().slice(-8);
}

function estimateFromBudget(budgetStr) {
  const map = {
    'Under ₹1L':          { base: 75000,   gst: 13500 },
    '₹1L – ₹5L':         { base: 250000,  gst: 45000 },
    '₹5L – ₹20L':        { base: 800000,  gst: 144000 },
    '₹20L – ₹50L':       { base: 3000000, gst: 540000 },
    '₹50L+':              { base: 5000000, gst: 900000 },
    "Let's Discuss":      { base: 250000,  gst: 45000 }
  };
  return map[budgetStr] || { base: 250000, gst: 45000 };
}
