import { ArrowRight, Building2, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">ACADEMIA × INDUSTRY</div>
          <h1>Turn student skills into <span>real opportunities.</span></h1>
          <p>NEXORA connects students, institutions and companies through skill mapping, internships, placements and structured industry collaboration.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/auth/role-selection">Get started <ArrowRight size={16} /></Link>
            <a className="button button-secondary" href="#platform">Explore the platform</a>
          </div>
          <div className="audience-row">
            <div><GraduationCap size={18} /><strong>Students</strong><span>Build evidence-backed skill profiles</span></div>
            <div><Building2 size={18} /><strong>Institutions</strong><span>See skill gaps and placement intelligence</span></div>
            <div><Users size={18} /><strong>Companies</strong><span>Discover and evaluate relevant talent</span></div>
          </div>
        </div>
        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard-preview" aria-label="NEXORA product preview">
      <aside className="preview-sidebar">
        <div className="preview-logo"><span className="brand-mark small">N</span></div>
        {['Overview', 'Skill Mapping', 'Opportunities', 'Applications', 'Learning'].map((item, index) => (
          <div className={`preview-nav ${index === 1 ? 'active' : ''}`} key={item}><span className="preview-dot" />{item}</div>
        ))}
      </aside>
      <div className="preview-main">
        <div className="preview-top"><div className="search-box">Search skills, roles, opportunities</div><div className="avatar">MT</div></div>
        <div className="preview-heading"><div><span>Student workspace</span><h3>Skill profile</h3></div><button className="mini-button">View profile</button></div>
        <div className="stat-grid">
          <div className="stat-card"><strong>18</strong><span>Verified skills</span></div>
          <div className="stat-card"><strong>07</strong><span>Skill gaps</span></div>
          <div className="stat-card"><strong>12</strong><span>Matches</span></div>
          <div className="stat-card"><strong>04</strong><span>Applications</span></div>
        </div>
        <div className="preview-grid">
          <div className="panel"><div className="panel-head"><strong>Relevant opportunities</strong><span>View all</span></div>
            {[['Frontend Developer Intern','React · JavaScript'],['Software Engineer Intern','Node.js · MongoDB'],['Web Development Trainee','HTML · CSS · JS']].map(([title, skills]) => <div className="opportunity" key={title}><div className="company-icon">C</div><div><strong>{title}</strong><span>{skills}</span></div><span>›</span></div>)}
          </div>
          <div className="panel match"><div className="panel-head"><strong>Skill alignment</strong><span>Explain</span></div><div className="match-ring"><div><strong>78%</strong><span>aligned</span></div></div><p>Your profile matches the role through React, JavaScript and project evidence. Node.js is a current gap.</p></div>
        </div>
      </div>
    </div>
  );
}
