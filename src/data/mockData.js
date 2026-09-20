export const INITIAL_HERO_SLIDES = [
  {
    id: 'slide-1',
    type: 'event',
    tag: 'Patel Hall Tradition',
    title: 'Patel Hall Illumination & Rangoli Showcase',
    headline: 'Diwali Illumination Chata & Tradition',
    datetime: 'Diwali Eve • Patel Hall Main Quadrangle',
    location: 'Patel Hall, IIT Kharagpur',
    speaker: 'Organized by Patel Hall Students & Alumni Batch',
    brandLogo: 'PATEL HALL • IIT KHARAGPUR',
    badge: 'Hall Heritage',
    bannerPill: 'Tradition & Unity',
    promoFooter: 'Annual Illumination celebration & Grand Alumni reunion',
    promoFooterHighlight: 'Patelian Spirit • Lux Et Veritas Vincant',
    termsText: '*All Patelians & Alumni warmly invited',
    coverImage: '/patel_illu.jpg'
  },
  {
    id: 'slide-2',
    type: 'event',
    tag: 'Hall Event & General Championship',
    title: 'Janmashtami Dahi Handi & Patel Hall Spirit',
    headline: 'Annual Dahi Handi Celebration & Pyramid',
    datetime: 'Patel Hall Front Lawn • Annual Tradition',
    location: 'Patel Hall Quadrangle, IIT KGP',
    speaker: 'Board of Governors & Hall Council',
    brandLogo: 'PATEL HALL TRADITION',
    badge: 'Hall Champion',
    bannerPill: 'Community & Brotherhood',
    promoFooter: 'Fostering lifelong batch brotherhood and active student-alumni network',
    promoFooterHighlight: 'Annual Hall Meet',
    termsText: '*Open to all boarders, alumni, and faculty advisors',
    coverImage: '/patel_dahi_handi.jpg'
  },
  {
    id: 'slide-3',
    type: 'event',
    tag: 'Active Alumni AMA',
    title: 'Alumni AMA: Staff Engineer & Tech Lead Tracks',
    headline: 'Interactive Live Session with Senior Patelians',
    datetime: 'Thursday, Oct 12, 2026 • 6:30 PM IST',
    location: 'Virtual Dome Hall (Room Alpha)',
    speaker: 'Aarav Mehta (\'21) & Rohan Deshmukh (\'20)',
    brandLogo: 'STRIPE & UBER ALUMNI',
    badge: '128 Registered',
    bannerPill: 'Placement Network',
    promoFooter: 'Real-world system design interviews & direct placement referral guidance',
    promoFooterHighlight: 'Open for all batches',
    termsText: '*Registered students get early room access',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'slide-4',
    type: 'success',
    tag: 'Placement Milestone',
    title: 'Senior Product Designer at Stripe (Alumni Referral)',
    headline: 'Sanya Gupta (Batch \'25) Endorsed by Aarav Mehta (\'21)',
    datetime: 'Endorsed Sept 12, 2026',
    location: 'Stripe Product Org (Bengaluru HQ)',
    speaker: 'Referral by Aarav Mehta (\'21)',
    brandLogo: 'PATEL ALUMNI REFERRAL NETWORK',
    badge: '9.5 / 10 Score',
    bannerPill: 'Verified Placement',
    promoFooter: 'Cleared internal hiring bar via Patel Hall review network',
    promoFooterHighlight: 'Batch of \'25',
    termsText: '*Direct referral fast-track',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    type: 'hall_event',
    tag: 'Hall Event',
    title: 'Autumn 2026 Patel Alumni-Student Placement Summit',
    datetime: 'Oct 15, 2026 • 5:00 PM IST',
    location: 'Patel Hall Common Room & Livestream',
    description: 'Keynote sessions on distributed systems, ML infrastructure at scale, and portfolio reviews with Patel Hall alumni from Stripe, Uber, and Google.'
  },
  {
    id: 'ann-2',
    type: 'notice',
    tag: 'Placement Directorate Notice',
    title: 'Resume Verification & 4-Slot Studio Refresh Window',
    datetime: 'Active until Oct 30, 2026',
    location: 'Patel Hall Career Directorate',
    description: 'Students are encouraged to maintain all 4 specialized CV profiles (Frontend, Systems, AI/ML, and Core SWE) with up-to-date repo links and work ethic statements.'
  }
];

export const INITIAL_STUDENT_RESUMES = [
  {
    id: 'cv-1',
    slotNumber: 1,
    title: 'UI/UX & Frontend Architecture Resume',
    badge: 'Primary Design Profile',
    fileName: 'Sanya_Gupta_Product_Design_CV.pdf',
    fileSize: '1.8 MB',
    lastUpdated: '2 days ago',
    aboutStatement: 'Product Designer and Frontend Engineer specializing in accessible design systems, multi-tiered design tokens, and high-performance React component libraries.',
    workEthics: 'High attention to micro-interactions, pixel precision, clear documentation, and cross-functional user empathy.',
    repoLinks: [
      { label: 'GitHub Profile', url: 'https://github.com/sanyag-design' },
      { label: 'Design Tokens Engine (Repo)', url: 'https://github.com/sanyag-design/unidome-tokens' }
    ],
    attachments: [
      { label: 'Behance Portfolio', url: 'https://behance.net/sanyagupta-ux' },
      { label: 'Live Showcase Demo', url: 'https://sanyagupta.design' }
    ]
  },
  {
    id: 'cv-2',
    slotNumber: 2,
    title: 'Distributed Systems & Go Backend Resume',
    badge: 'Systems Profile',
    fileName: 'Sanya_Gupta_Backend_Go_CV.pdf',
    fileSize: '2.1 MB',
    lastUpdated: '5 days ago',
    aboutStatement: 'Backend Engineer focused on high-throughput microservices, distributed key-value stores, Raft consensus implementations, and Kafka event streaming.',
    workEthics: 'Strict test-driven development, benchmark-driven optimization, zero-downtime deployment mindset.',
    repoLinks: [
      { label: 'Distributed KV Raft Engine', url: 'https://github.com/sanyag-design/raft-kv-go' },
      { label: 'High Concurrency Pipeline', url: 'https://github.com/sanyag-design/event-bus-go' }
    ],
    attachments: [
      { label: 'Benchmark Performance Whitepaper', url: 'https://cdn.unidome.edu/benchmarks-raft.pdf' }
    ]
  },
  {
    id: 'cv-3',
    slotNumber: 3,
    title: 'AI / ML & Multimodal Research Resume',
    badge: 'Research Profile',
    fileName: 'Sanya_Gupta_DeepLearning_CV.pdf',
    fileSize: '2.4 MB',
    lastUpdated: '1 week ago',
    aboutStatement: 'Applied Deep Learning researcher with publications on transformer attention compression and multimodal reasoning architectures.',
    workEthics: 'Rigorous empirical reproducibility, thorough ablation studies, and clean mathematical formulation.',
    repoLinks: [
      { label: 'Transformer Attention Compression', url: 'https://github.com/sanyag-design/fast-transformer' }
    ],
    attachments: [
      { label: 'NeurIPS Workshop Paper PDF', url: 'https://arxiv.org/abs/2609.12345' }
    ]
  },
  {
    id: 'cv-4',
    slotNumber: 4,
    title: 'General Full-Stack & DevOps Engineering Resume',
    badge: 'General SWE Profile',
    fileName: 'Sanya_Gupta_FullStack_SWE_CV.pdf',
    fileSize: '1.9 MB',
    lastUpdated: '2 weeks ago',
    aboutStatement: 'Full-stack generalist with end-to-end capabilities spanning TypeScript, Next.js, Docker, Kubernetes, CI/CD automation, and cloud deployments.',
    workEthics: 'Reliable ownership, rapid prototyping, clean code hygiene, and pragmatic architecture.',
    repoLinks: [
      { label: 'UniDome Monorepo Template', url: 'https://github.com/sanyag-design/unidome-core' }
    ],
    attachments: [
      { label: 'Personal Tech Blog & Case Studies', url: 'https://sanyagupta.dev/blog' }
    ]
  }
];

export const INITIAL_OPPORTUNITIES = [
  {
    id: 'opp-1',
    title: 'Senior Product Designer',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    type: 'Full-time Job',
    alumName: 'Aarav Mehta',
    alumBatch: 'Patel Hall Class of \'21',
    alumProfile: 'Lead Product Designer at Stripe',
    alumAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Bengaluru / Hybrid',
    salary: '₹28L - ₹36L + Equity',
    tags: ['UI/UX Design', 'Design Systems', 'Figma', 'Prototyping'],
    batchEligibility: '2025 & 2026 Batch',
    preferredPoc: 'Direct Chat on Patel Portal',
    description: 'Looking for a passionate Product Designer with strong systems thinking to scale checkout experiences. Direct review and private proceeding.',
    postedDate: '2 hours ago',
    applicantsCount: 2,
    status: 'Active'
  },
  {
    id: 'opp-2',
    title: 'Software Engineer II (Backend / Go)',
    company: 'Uber',
    companyLogo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=120&auto=format&fit=crop&q=80',
    type: 'Full-time Job',
    alumName: 'Rohan Deshmukh',
    alumBatch: 'Patel Hall Class of \'20',
    alumProfile: 'Staff Backend Engineer at Uber',
    alumAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Hyderabad / Remote',
    salary: '₹32L - ₹42L',
    tags: ['Golang', 'Distributed Systems', 'Microservices', 'Kafka'],
    batchEligibility: '2024 & 2025 Batch',
    preferredPoc: 'Direct Chat on Patel Portal',
    description: 'Platform Team looking for engineers experienced in high-throughput microservices and distributed storage.',
    postedDate: '1 day ago',
    applicantsCount: 1,
    status: 'Active'
  },
  {
    id: 'opp-3',
    title: 'AI / ML Research Intern',
    company: 'Google DeepMind',
    companyLogo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=120&auto=format&fit=crop&q=80',
    type: 'Internship (6 Months)',
    alumName: 'Dr. Priya Sharma',
    alumBatch: 'Patel Hall Class of \'19 Ph.D.',
    alumProfile: 'Research Scientist at DeepMind',
    alumAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    location: 'Bengaluru',
    salary: '₹1.2L / month stipend',
    tags: ['PyTorch', 'LLMs', 'Reinforcement Learning', 'NLP'],
    batchEligibility: '2026 Batch',
    preferredPoc: 'Direct Chat on Patel Portal',
    description: 'Join our multimodal intelligence team working on next-gen reasoning models. Strong math foundation required.',
    postedDate: '3 days ago',
    applicantsCount: 1,
    status: 'Active'
  },
  {
    id: 'opp-4',
    title: 'Associate Product Manager',
    company: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80',
    type: 'Referral Spot',
    alumName: 'Karan Verma',
    alumBatch: 'Patel Hall Class of \'22',
    alumProfile: 'Senior PM at Razorpay',
    alumAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    location: 'Bengaluru',
    salary: '₹22L - ₹26L',
    tags: ['Product Analytics', 'FinTech', 'User Research', 'SQL'],
    batchEligibility: '2025 Batch',
    preferredPoc: 'Direct Chat on Patel Portal',
    description: 'Seeking proactive APMs to own merchant onboarding flows. Great growth ecosystem for recent grads!',
    postedDate: '4 days ago',
    applicantsCount: 0,
    status: 'Closed'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-101',
    opportunityId: 'opp-1',
    selectedResumeId: 'cv-1',
    selectedResumeTitle: 'UI/UX & Frontend Architecture Resume',
    jobTitle: 'Senior Product Designer',
    company: 'Stripe',
    studentName: 'Sanya Gupta',
    studentRoll: '2021CSB1042',
    studentEmail: 'sanya.g@kgpian.iitkgp.ac.in',
    studentMajor: 'Computer Science & Design',
    studentBatch: 'Batch of \'25 (Patel Hall Room D-304)',
    studentCpa: '9.2 / 10.0',
    alumName: 'Aarav Mehta',
    appliedDate: 'Sept 16, 2026',
    status: 'Accepted and Proceeded',
    decisionType: 'accepted',
    privateNotificationSent: true,
    note: 'I redesigned the Patel Hall placement portal and formulated a multi-tiered token architecture for design systems. Highly aligned with Stripe Checkout precision.',
    cvFileName: 'Sanya_Gupta_Product_Design_CV.pdf',
    cvFileSize: '1.8 MB',
    cvUrl: '#',
    scoreOutOf10: 9.5,
    whatStoodOut: 'Figma component systems demonstrate top 1% design thinking. Design system tokens are exceptionally organized with complete responsive auto-layout implementations.',
    tipsAndSuggestions: 'For upcoming leadership interactions, prepare detailed walkthroughs on how your redesign reduced task drop-off rates.',
    feedbackShortcutsUsed: ['⚡ Strong Technical Stack', '🎯 Outstanding Portfolio', '✅ Strongly Recommended']
  },
  {
    id: 'app-102',
    opportunityId: 'opp-2',
    selectedResumeId: 'cv-2',
    selectedResumeTitle: 'Distributed Systems & Go Backend Resume',
    jobTitle: 'Software Engineer II (Backend / Go)',
    company: 'Uber',
    studentName: 'Vikramaditya Rao',
    studentRoll: '2022CSB1108',
    studentEmail: 'vikram.r@kgpian.iitkgp.ac.in',
    studentMajor: 'Computer Science & Engineering',
    studentBatch: 'Batch of \'26 (Patel Hall Room B-112)',
    studentCpa: '8.9 / 10.0',
    alumName: 'Rohan Deshmukh',
    appliedDate: 'Sept 17, 2026',
    status: 'Pending Review',
    decisionType: null,
    privateNotificationSent: false,
    note: 'Built a distributed key-value store in Go during my 3rd year systems project. Solved Raft leader election issues.',
    cvFileName: 'Vikram_Rao_Backend_Go_CV.pdf',
    cvFileSize: '2.1 MB',
    cvUrl: '#',
    scoreOutOf10: null,
    whatStoodOut: '',
    tipsAndSuggestions: '',
    feedbackShortcutsUsed: []
  },
  {
    id: 'app-103',
    opportunityId: 'opp-3',
    selectedResumeId: 'cv-3',
    selectedResumeTitle: 'AI / ML & Multimodal Research Resume',
    jobTitle: 'AI / ML Research Intern',
    company: 'Google DeepMind',
    studentName: 'David Chen',
    studentRoll: '2022EEB1045',
    studentEmail: 'david.chen@kgpian.iitkgp.ac.in',
    studentMajor: 'Electrical & Computer Science',
    studentBatch: 'Batch of \'26 (Patel Hall Room C-201)',
    studentCpa: '9.4 / 10.0',
    alumName: 'Dr. Priya Sharma',
    appliedDate: 'Sept 18, 2026',
    status: 'Feedback Provided',
    decisionType: 'feedback_only',
    privateNotificationSent: true,
    note: 'Published a paper on transformer attention compression at NeurIPS workshop. Looking to scale to multimodal benchmarks.',
    cvFileName: 'David_Chen_DeepLearning_CV.pdf',
    cvFileSize: '2.8 MB',
    cvUrl: '#',
    scoreOutOf10: 8.0,
    whatStoodOut: 'Strong research foundation and exceptional mathematics background. Attention compression equations are well documented.',
    tipsAndSuggestions: 'Add concrete PyTorch profiling metrics (FLOPs saved, VRAM reduction on A100s) on your CV project section to strengthen industrial research applications.',
    feedbackShortcutsUsed: ['📈 High Academic Consistency', '🛠️ Excellent Project Complexity', '💡 Great Technical Clarity']
  }
];

export const DEMO_USERS = {
  student: {
    name: 'Sanya Gupta',
    email: 'sanya.g@kgpian.iitkgp.ac.in',
    role: 'Student',
    rollNumber: '2021CSB1042',
    hall: 'Patel Hall of Residence',
    roomNumber: 'D-304',
    department: 'Computer Science & Design',
    batch: 'Batch of 2025',
    cpa: '9.2 / 10.0',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  alumni: {
    name: 'Aarav Mehta',
    email: 'aarav.mehta@stripe.com',
    role: 'Alumni',
    rollNumber: '17CS10022',
    hall: 'Patel Hall of Residence',
    batch: 'Patel Hall Class of 2021',
    profileTitle: 'Lead Product Designer at Stripe',
    company: 'Stripe',
    domeId: 'PATEL-ALUM-8819',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
};

export const FEEDBACK_SHORTCUTS = [
  '⚡ Strong Technical Stack',
  '🎯 Outstanding Portfolio',
  '⚠️ Needs System Design Depth',
  '✅ Strongly Recommended',
  '💡 Great Technical Clarity',
  '🛠️ Excellent Project Complexity',
  '📈 High Academic Consistency',
  '🔍 Highly Analytical Mindset',
  '📝 Refine CV Metrics & Impact'
];

export const INITIAL_CHAT_THREADS = [
  {
    id: 'thread-1',
    ticketId: 'app-101',
    title: 'Stripe - Senior Product Designer Proposal',
    participants: ['Sanya Gupta (Student)', 'Aarav Mehta (ALUM)'],
    messages: [
      {
        id: 'm1',
        senderRole: 'Student',
        senderName: 'Sanya Gupta',
        text: 'Hello Aarav sir, thank you for reviewing my application and Figma architecture!',
        time: '14:35'
      },
      {
        id: 'm2',
        senderRole: 'ALUM',
        senderName: 'Aarav Mehta',
        text: 'Hey Sanya! Your application has been accepted to proceed privately. Score: 9.5/10. I have initiated the next stage proposal with the Stripe team.',
        time: '15:10'
      }
    ]
  },
  {
    id: 'thread-3',
    ticketId: 'app-103',
    title: 'Google DeepMind - Research CV Feedback',
    participants: ['David Chen (Student)', 'Dr. Priya Sharma (ALUM)'],
    messages: [
      {
        id: 'm10',
        senderRole: 'ALUM',
        senderName: 'Dr. Priya Sharma',
        text: 'Hi David, I have reviewed your CV and scored it 8.0/10 with detailed improvement tips on adding GPU profiling metrics. Check your feedback report in the dashboard!',
        time: '16:00'
      }
    ]
  }
];

export const INITIAL_ALUM_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New Student CV Submitted for Review',
    description: 'Vikramaditya Rao (Room B-112) applied for Backend Engineer II (Uber)',
    time: '2 hours ago',
    read: false,
    appId: 'app-102'
  },
  {
    id: 'notif-2',
    title: 'Patel Hall Illumination Meet Reminder',
    description: 'Patel Hall Illumination & Alumni Reunion starts this weekend',
    time: '1 day ago',
    read: false
  }
];

export const INITIAL_ADMIN_USERS = [
  { id: 'usr-1', name: 'Prof. S. R. Kulkarni', role: 'Warden, Patel Hall', email: 'warden.patel@iitkgp.ac.in', status: 'Primary Admin' },
  { id: 'usr-2', name: 'Dr. Meera Iyer', role: 'Alumni Placement Coordinator', email: 'alumni.patel@iitkgp.ac.in', status: 'Admin' }
];

export const INITIAL_REFERRAL_REQUESTS = [
  {
    id: 'req-201',
    studentName: 'Sanya Gupta',
    studentRoll: '2021CSB1042',
    studentEmail: 'sanya.g@kgpian.iitkgp.ac.in',
    targetCompany: 'Atlassian',
    targetRole: 'Frontend Engineer (Grad 2026)',
    jobUrl: 'https://atlassian.com/careers/fe-grad-2026',
    externalPocName: 'Rajesh Nair',
    externalPocPhone: '+91 98765 43210',
    externalPocDesignation: 'Engineering Manager at Atlassian (Patel Hall Batch of 2018)',
    status: 'Pending Admin Verification',
    submittedAt: '2026-09-14 11:20',
    notes: 'Rajesh sir agreed to refer on LinkedIn, submitting POC to Admin to add official Dome ticket.'
  }
];

export const INITIAL_FEEDBACK_NETWORK_RECORDS = [
  {
    id: 'fn-1',
    studentName: 'Sanya Gupta',
    studentRoll: '2021CSB1042',
    studentEmail: 'sanya.g@kgpian.iitkgp.ac.in',
    company: 'Stripe',
    jobTitle: 'Senior Product Designer',
    alumName: 'Aarav Mehta',
    alumBatch: 'Patel Hall Class of \'21',
    decision: 'Accepted and Proceeded',
    scoreOutOf10: 9.5,
    feedbackText: 'Outstanding design portfolio. Figma component systems demonstrate top 1% design thinking.',
    tips: 'For upcoming leadership interactions, prepare detailed walkthroughs on how your redesign reduced task drop-off rates.',
    shortcuts: ['⚡ Strong Technical Stack', '🎯 Outstanding Portfolio', '✅ Strongly Recommended'],
    timestamp: '2026-09-16 16:20'
  }
];
