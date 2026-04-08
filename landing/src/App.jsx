/* ─────────────────────────────────────────────
   Gabriel Fasolim | Portfolio
   Design System: "The Architectural Monolith"
   ───────────────────────────────────────────── */

function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 bg-[#050505] mix-blend-difference">
      <div className="text-xl font-bold tracking-[0.2em] text-white uppercase font-headline">
        GF
      </div>

      <div className="hidden md:flex gap-12">
        <a
          className="font-label text-[10px] uppercase tracking-widest text-white font-bold opacity-100 hover:opacity-100 transition-opacity duration-300"
          href="#work"
        >
          WORK
        </a>
        <a
          className="font-label text-[10px] uppercase tracking-widest text-[#e8e6e0] opacity-60 hover:opacity-100 transition-opacity duration-300"
          href="#about"
        >
          ABOUT
        </a>
        <a
          className="font-label text-[10px] uppercase tracking-widest text-[#e8e6e0] opacity-60 hover:opacity-100 transition-opacity duration-300"
          href="#contact"
        >
          CONTACT
        </a>
      </div>

      <a
        className="font-label text-[10px] uppercase tracking-widest text-white border border-outline-variant/20 px-6 py-2 hover:bg-white hover:text-black transition-all duration-300"
        href="#"
      >
        RESUME
      </a>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center pt-24 pb-12">
      <h1 className="font-headline font-extrabold text-5xl md:text-8xl lg:text-9xl tracking-[0.1em] text-primary mb-8 uppercase">
        GABRIEL FASOLIM
      </h1>

      <p className="font-label text-xs md:text-sm uppercase tracking-[0.3em] text-on-surface-variant mb-12">
        Mid-Level Full-Stack Developer · Fintech &amp; Blockchain
      </p>

      <div className="max-w-2xl mx-auto">
        <p className="text-lg md:text-xl text-on-surface leading-relaxed font-body">
          Architecting high-criticality financial systems with a focus on
          structural integrity and performance. I bridge the gap between complex
          backend logic and seamless frontend experiences.
        </p>
      </div>

      <div className="mt-auto pt-12 flex flex-col items-center gap-4 opacity-40">
        <span className="font-label text-[10px] uppercase tracking-widest">
          Scroll to explore
        </span>
        <span className="material-symbols-outlined animate-bounce">
          arrow_downward
        </span>
      </div>
    </section>
  )
}

function Editorial() {
  return (
    <section className="py-32 overflow-hidden">
      {/* FINTECH */}
      <div className="relative mb-40">
        <h2 className="bleed-text font-headline font-extrabold tracking-tighter text-surface-container-highest/20 whitespace-nowrap -ml-20">
          FINTECH
        </h2>
        <div className="max-w-md ml-auto mr-12 -mt-12 md:-mt-24 relative z-10">
          <p className="text-on-surface-variant leading-relaxed">
            Designing transaction systems where latency and precision are
            non-negotiable. Building the future of digital assets.
          </p>
        </div>
      </div>

      {/* BLOCKCHAIN */}
      <div className="relative mb-40">
        <h2 className="bleed-text font-headline font-extrabold tracking-tighter text-surface-container-highest/20 whitespace-nowrap text-right -mr-20">
          BLOCKCHAIN
        </h2>
        <div className="max-w-md mr-auto ml-12 -mt-12 md:-mt-24 relative z-10">
          <p className="text-on-surface-variant leading-relaxed">
            Smart contract integration and decentralized architecture.
            Navigating the complexities of distributed ledgers.
          </p>
        </div>
      </div>

      {/* IOT */}
      <div className="relative">
        <h2 className="bleed-text font-headline font-extrabold tracking-tighter text-surface-container-highest/20 whitespace-nowrap -ml-20">
          INTERNET OF THINGS
        </h2>
        <div className="max-w-md ml-auto mr-12 -mt-12 md:-mt-24 relative z-10">
          <p className="text-on-surface-variant leading-relaxed">
            Connecting the physical and digital worlds through robust real-time
            data processing and device management.
          </p>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const items = [
    { value: '4+ Years',  label: 'Experience' },
    { value: '4 Companies', label: 'Global Reach' },
    { value: '3x Award',  label: 'PUCPR Winner' },
    { value: 'Best TCC',  label: 'Recognition' },
    { value: 'Honors',    label: 'Graduate' },
  ]

  return (
    <section className="py-24 border-y border-outline-variant/10 bg-surface-container-lowest/50">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-12 text-center">
        {items.map(({ value, label }, i) => (
          <div
            key={label}
            className={`flex flex-col gap-2${i === 4 ? ' col-span-2 md:col-span-1' : ''}`}
          >
            <span className="font-headline text-3xl font-bold">{value}</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const jobs = [
    {
      period: '2023 — PRESENT',
      company: 'Quantum Tech Ventures',
      role: 'Senior Full-Stack Engineer',
      description:
        'Leading the development of high-throughput trading platforms. Implementing microservices architecture for real-time order matching and portfolio management.',
    },
    {
      period: '2021 — 2023',
      company: 'Radioenge',
      role: 'Junior Developer / Intern',
      description:
        'Engineered IoT gateway interfaces and real-time monitoring dashboards. Streamlined sensor data ingestion pipelines using NestJS and MQTT.',
    },
    {
      period: '2020 — 2021',
      company: 'Hardness Sistemas',
      role: 'Full-Stack Developer',
      description:
        'Contributed to the development of enterprise resource planning tools, focusing on financial modules and reporting systems using .NET/C#.',
    },
  ]

  return (
    <section className="py-48 px-6 max-w-5xl mx-auto" id="work">
      <div className="mb-24">
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant block mb-4">
          CURRICULUM
        </span>
        <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter">
          EXPERIENCE
        </h2>
      </div>

      <div className="space-y-32">
        {jobs.map(({ period, company, role, description }) => (
          <div key={company} className="grid md:grid-cols-3 gap-8 group">
            <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant pt-2">
              {period}
            </div>
            <div className="md:col-span-2">
              <h3 className="font-headline text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-500">
                {company}
              </h3>
              <p className="font-label text-[11px] text-primary-container uppercase tracking-widest mb-6">
                {role}
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function WhyMe() {
  const items = [
    {
      title: 'Systems Thinking',
      body: "I don't just write code; I design systems. I consider how every component interacts within the larger architecture to ensure scalability and maintainability.",
    },
    {
      title: 'Financial Domain Knowledge',
      body: 'Deep understanding of ledger systems, transaction integrity, and compliance requirements in the Fintech sector.',
    },
    {
      title: 'Delivery Focus',
      body: 'Proven track record of meeting critical deadlines in high-pressure environments while maintaining code quality and system stability.',
    },
    {
      title: 'Full Ownership',
      body: 'Taking responsibility for the entire lifecycle of a feature—from initial requirement gathering to deployment and post-launch monitoring.',
    },
  ]

  return (
    <section className="py-48 bg-surface-container-low/30">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-headline text-4xl font-bold mb-16 tracking-tight">
          WHY WORK WITH ME
        </h2>

        <div className="border-t border-outline-variant/20">
          {items.map(({ title, body }) => (
            <details key={title} className="group border-b border-outline-variant/20 py-8">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-headline text-2xl">{title}</span>
                <span className="material-symbols-outlined group-open:rotate-90 transition-transform duration-300">
                  arrow_outward
                </span>
              </summary>
              <div className="mt-6 text-on-surface-variant max-w-2xl">{body}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const categories = [
    {
      title: 'FRONTEND',
      skills: ['Vue.js', 'React', 'Angular', 'Tailwind CSS', 'TypeScript'],
    },
    {
      title: 'BACKEND',
      skills: ['NestJS', '.NET / C#', 'Node.js', 'GraphQL'],
    },
    {
      title: 'INFRA & OPS',
      skills: ['PostgreSQL', 'Docker', 'Git', 'AWS'],
    },
  ]

  return (
    <section className="py-48 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-24">
        {categories.map(({ title, skills }) => (
          <div key={title}>
            <h3 className="font-label text-[10px] uppercase tracking-widest text-primary mb-12">
              {title}
            </h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 border border-outline-variant/20 font-label text-[11px] uppercase tracking-wider"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Achievements() {
  const items = [
    {
      title: 'Academic Honors & Best TCC',
      body: 'Awarded for exceptional performance and the most outstanding final graduation project at PUCPR.',
    },
    {
      title: 'ICHILD',
      body: 'Architected the core system for a child welfare monitoring platform during a dedicated hackathon.',
    },
    {
      title: 'Agenda Hub',
      body: 'Developed a comprehensive scheduling engine used by multiple business units within an educational ecosystem.',
    },
    {
      title: 'Teaching Assistant',
      body: 'Mentored junior students in Algorithms and Data Structures, fostering a culture of technical excellence.',
    },
  ]

  return (
    <section className="py-48 px-6 bg-surface-container-lowest">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="font-headline text-4xl font-bold mb-16 text-center tracking-tight">
          ACHIEVEMENTS
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/20 border border-outline-variant/20">
          {items.map(({ title, body }) => (
            <div
              key={title}
              className="bg-background p-12 hover:bg-surface-container-low transition-colors duration-500"
            >
              <h4 className="font-headline text-xl font-bold mb-4">{title}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  const entries = [
    {
      school: 'FAE Business School',
      degree: 'Postgrad in Financial Markets',
      location: 'CURITIBA, BR',
    },
    {
      school: 'PUCPR',
      degree: "Bachelor's in Information Systems",
      location: 'CURITIBA, BR',
    },
  ]

  return (
    <section className="py-48 px-6 max-w-5xl mx-auto" id="about">
      <h2 className="font-headline text-4xl font-bold mb-16 tracking-tight">
        ACADEMIC PATH
      </h2>

      <div className="space-y-16">
        {entries.map(({ school, degree, location }) => (
          <div
            key={school}
            className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-8"
          >
            <div>
              <h3 className="font-headline text-2xl font-bold">{school}</h3>
              <p className="text-on-surface-variant">{degree}</p>
            </div>
            <span className="font-label text-[10px] uppercase tracking-widest text-primary-container">
              {location}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  const links = [
    { label: 'EMAIL',    href: 'mailto:contact@fasolim.dev' },
    { label: 'PHONE',    href: '#' },
    { label: 'LOCATION', href: '#' },
    { label: 'LINKEDIN', href: '#' },
    { label: 'GITHUB',   href: '#' },
  ]

  return (
    <footer
      className="bg-[#050505] w-full px-6 md:px-12 py-20 flex flex-col md:flex-row justify-between items-start gap-12 border-t border-[#474747]/20"
      id="contact"
    >
      <div className="flex flex-col gap-6">
        <div className="text-lg font-bold text-white font-headline uppercase tracking-widest">
          GABRIEL FASOLIM
        </div>
        <p className="font-label text-[10px] uppercase tracking-widest text-[#e8e6e0]">
          © 2026 GF . ALL RIGHTS RESERVED.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {links.map(({ label, href }) => (
          <a
            key={label}
            className="font-label text-[10px] uppercase tracking-widest text-[#e8e6e0] opacity-60 hover:opacity-100 transition-opacity duration-300"
            href={href}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="font-body selection:bg-primary-container selection:text-on-primary-container">
      <Nav />
      <Hero />
      <Editorial />
      <Stats />
      <Experience />
      <WhyMe />
      <Skills />
      <Achievements />
      <Education />
      <Footer />
    </div>
  )
}
