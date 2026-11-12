import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Braces, Check, ChevronDown, Code2,
  Download, ExternalLink, Github, GraduationCap, Mail, MapPin, Menu,
  Moon, Sun, X, Linkedin, Sparkles, Terminal, GitBranch,
} from 'lucide-react'
import { profile } from './profile'

type Repo = { id: number; name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number }
const sections = ['About', 'Skills', 'Education', 'Projects', 'GitHub', 'Contact']

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [repos, setRepos] = useState<Repo[]>([])
  const [repoError, setRepoError] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!profile.githubUsername) return
    fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`)
      .then((response) => {
        if (!response.ok) throw new Error('GitHub profile unavailable')
        return response.json() as Promise<Repo[]>
      })
      .then((data) => setRepos(data.filter((repo) => !repo.name.startsWith('.')).slice(0, 6)))
      .catch(() => setRepoError(true))
  }, [])

  const nav = (mobile = false) => sections.map((section) => (
    <a key={section} href={`#${section.toLowerCase()}`} onClick={() => mobile && setMenuOpen(false)}>{section}</a>
  ))

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Chamindu Aloka home"><span className="brand-mark">c<span>.</span></span><span>chamindu<span className="brand-light">.dev</span></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{nav()}</nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title="Switch theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} aria-label="Mobile navigation">{nav(true)}</motion.nav>}</AnimatePresence>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}><span className="status-dot" /> AVAILABLE FOR IT INTERNSHIPS <span className="eyebrow-line" /></motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .08 }}>Building a future<br />in <span className="gradient-text">software.</span></motion.h1>
            <motion.p className="hero-lede" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .18 }}>I’m <strong>Chamindu Aloka</strong>, an IT undergraduate at SLIIT in Matara, Sri Lanka. Curious by nature, focused on what’s next.</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .28 }}>
              <a className="button-primary" href="#projects">Explore my work <ArrowRight size={16} /></a>
              <a className="button-quiet" href="#about">A little about me <ArrowDown size={15} /></a>
            </motion.div>
            <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}><span><MapPin size={14} /> Matara, Sri Lanka</span><i /><span><GraduationCap size={15} /> IT Undergraduate · SLIIT</span></motion.div>
          </div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .18 }}>
            <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
            <div className="portrait-card">
              <div className="portrait-top"><span className="mono">PROFILE / 001</span><span className="live-mark"><span /> OPEN TO OPPORTUNITY</span></div>
              <div className="portrait-art" aria-label="Profile monogram for Chamindu Aloka">
                <div className="portrait-glow" /><div className="portrait-silhouette"><div className="portrait-head" /><div className="portrait-neck" /><div className="portrait-body" /></div>
                <div className="monogram">CA</div><span className="portrait-cross cross-one">+</span><span className="portrait-cross cross-two">+</span>
              </div>
              <div className="portrait-bottom"><div><span className="mono muted">CURRENTLY</span><strong>Learning. Building. Growing.</strong></div><span className="corner-arrow"><ArrowUpRight size={17} /></span></div>
            </div>
            <div className="float-chip chip-code"><Code2 size={15} /><span>curiosity<span className="chip-punct">.build()</span></span></div>
            <div className="float-chip chip-location"><span className="tiny-dot" /> <span>Based in Sri Lanka</span></div>
          </motion.div>
          <a className="scroll-note" href="#about"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="intro-strip"><div className="intro-inner"><span className="mono intro-label">A QUICK INTRO</span><p>At the beginning of a career is a great place to be: <em>open, curious, and ready to make things.</em></p><ArrowDown size={17} /></div></section>

        <section className="content-section section-wrap" id="about">
          <SectionHeader number="01" title="A bit about me" kicker="BEHIND THE SCREEN" />
          <div className="about-grid"><div className="about-lead"><h3>Early in my journey.<br /><span>Intentional about the path.</span></h3></div><div className="about-text"><p>I’m an IT undergraduate at SLIIT, based in Matara. I completed an IT Diploma at ESOFT during 2025–2026, and I’m working toward a career in software development.</p><p>I’m looking for an internship where I can learn from a team, contribute with care, and turn classroom knowledge into useful software.</p><a className="text-link" href="#contact">Get to know me <ArrowRight size={15} /></a></div></div>
          <div className="about-facts"><Fact icon={<MapPin />} label="LOCATION" value="Matara, Sri Lanka" /><Fact icon={<GraduationCap />} label="CURRENTLY" value="IT Undergraduate · SLIIT" /><Fact icon={<Sparkles />} label="LOOKING FOR" value="Software / IT Internship" /></div>
        </section>

        <section className="content-section section-wrap" id="skills">
          <SectionHeader number="02" title="Technical toolkit" kicker="SKILLS & TECHNOLOGIES" />
          <div className="empty-panel skills-empty"><div className="empty-icon"><Braces size={22} /></div><div><h3>Skills, with the right context.</h3><p>Technology and proficiency levels will be added here once confirmed, so recruiters can see an honest picture of what I can demonstrate.</p></div><span className="mono pending-label">DETAILS PENDING</span></div>
        </section>

        <section className="content-section section-wrap" id="education">
          <SectionHeader number="03" title="Education" kicker="THE LEARNING SO FAR" />
          <div className="education-list">
            <div className="education-row"><div className="edu-icon"><GraduationCap size={19} /></div><div className="edu-main"><span className="mono edu-type">UNDERGRADUATE STUDIES</span><h3>Sri Lanka Institute of Information Technology</h3><p>IT Undergraduate</p></div><span className="edu-status"><i /> CURRENT</span></div>
            <div className="education-row"><div className="edu-icon edu-icon-muted"><Terminal size={18} /></div><div className="edu-main"><span className="mono edu-type">DIPLOMA</span><h3>ESOFT</h3><p>IT Diploma</p></div><span className="edu-date">2025 — 2026</span></div>
          </div>
        </section>

        <section className="content-section section-wrap" id="projects">
          <SectionHeader number="04" title="Selected work" kicker="PROJECTS & EXPERIMENTS" aside="REPOSITORIES WILL APPEAR WHEN CONNECTED" />
          <div className="project-empty"><div className="project-empty-top"><span className="mono">THE WORK IS TAKING SHAPE</span><span className="project-spark"><GitBranch size={18} /></span></div><h3>Every good portfolio starts<br />with the first commit.</h3><p>Projects will be featured here when they’re ready to share. No placeholders, just work worth showing.</p><a href="#contact" className="text-link">Let’s talk about building together <ArrowRight size={15} /></a><div className="project-grid-lines" /></div>
        </section>

        <section className="content-section github-section" id="github"><div className="section-wrap"><SectionHeader number="05" title="GitHub activity" kicker="OPEN SOURCE & CODE" aside={profile.githubUsername ? `@${profile.githubUsername}` : 'PROFILE LINK PENDING'} />
          {repos.length > 0 ? <div className="repo-grid">{repos.map((repo) => <a className="repo-card" key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"><div className="repo-card-top"><Github size={18} /><ArrowUpRight size={16} /></div><h3>{repo.name}</h3><p>{repo.description || 'No description provided.'}</p><div className="repo-meta"><span>{repo.language || 'Code'}</span><span>★ {repo.stargazers_count}</span></div></a>)}</div> : <div className="empty-panel github-empty"><div className="github-mark"><Github size={22} /></div><div><h3>{repoError ? 'Could not load repositories.' : 'A window into the work.'}</h3><p>{repoError ? 'The GitHub profile could not be reached. Try again later.' : 'Connect a GitHub profile to show public repositories and recent work here.'}</p></div>{profile.githubUsername && <a className="icon-link" href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer" aria-label="GitHub profile"><ExternalLink size={17} /></a>}</div>}
          <div className="social-pending"><span className="mono">GITHUB PROFILE</span>{profile.githubUsername ? <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer">@{profile.githubUsername} <ExternalLink size={13} /></a> : <span>Link to be added</span>}</div>
        </div></section>

        <section className="content-section section-wrap extra-section" id="certifications"><SectionHeader number="06" title="Certifications" kicker="CREDENTIALS" /><div className="cert-note"><span className="cert-icon"><Check size={17} /></span><p>Verified certifications will be listed here as they’re earned.</p></div></section>

        <section className="content-section section-wrap extra-section" id="linkedin"><SectionHeader number="07" title="Let’s connect" kicker="LINKEDIN PROFILE" /><div className="social-pending linkedin-pending"><span className="mono"><Linkedin size={15} /> LINKEDIN</span>{profile.linkedinUrl ? <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">View LinkedIn profile <ExternalLink size={14} /></a> : <span>Profile link to be added</span>}</div></section>

        <section className="resume-band"><div className="section-wrap resume-inner"><div><span className="mono">RESUME / CV</span><h2>A concise view of<br />my journey so far.</h2></div>{profile.resumePath ? <a className="button-primary" href={profile.resumePath} download>Download CV <Download size={16} /></a> : <span className="resume-pending">CV available soon</span>}</div></section>

        <section className="contact-section section-wrap" id="contact"><div className="contact-orb" /><SectionHeader number="08" title="Open to what’s next." kicker="CONTACT" /><div className="contact-content"><div><h2>Have an opportunity<br />or an idea?</h2><p>I’d be glad to hear from you. Let’s start a conversation.</p></div><div className="contact-actions">{profile.email ? <a className="button-primary" href={`mailto:${profile.email}`}>Say hello <Mail size={16} /></a> : <span className="contact-pending"><Mail size={16} /> Email address to be added</span>}{profile.linkedinUrl && <a className="button-secondary" href={profile.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={14} /></a>}</div></div></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">c<span>.</span></span><span>chamindu<span className="brand-light">.dev</span></span></a><span className="footer-copy">Designed with intention. © {new Date().getFullYear()} Chamindu Aloka</span><a className="back-top" href="#home">Back to top <ChevronDown size={14} /></a></footer>
    </div>
  )
}

function SectionHeader({ number, title, kicker, aside }: { number: string; title: string; kicker: string; aside?: string }) {
  return <div className="section-heading"><div className="section-heading-left"><span className="section-number mono">{number}</span><div><span className="mono section-kicker">{kicker}</span><h2>{title}</h2></div></div>{aside && <span className="mono section-aside">{aside}</span>}</div>
}
function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="fact"><span className="fact-icon">{icon}</span><div><span className="mono">{label}</span><strong>{value}</strong></div></div>
}

export default App

