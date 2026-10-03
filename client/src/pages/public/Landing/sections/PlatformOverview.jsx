import { BarChart3, BriefcaseBusiness, GraduationCap, Network } from 'lucide-react';
const items = [
  ['Student skill mapping','Build a profile around skills, evidence, goals and gaps.',GraduationCap],
  ['Institution intelligence','Understand student capability, gaps and industry demand.',BarChart3],
  ['Industry opportunities','Create structured internships, jobs and hiring workflows.',BriefcaseBusiness],
  ['Collaboration layer','Connect training, projects, partnerships and placement activity.',Network],
];
export default function PlatformOverview(){return <section id="platform" className="section capabilities"><div className="container"><div className="narrow-heading"><div className="eyebrow">ONE PLATFORM</div><h2>Built around the complete talent journey.</h2><p>Each workspace has a focused role while sharing the information needed to move from capability to opportunity.</p></div><div className="feature-grid">{items.map(([title,text,Icon])=><article className="feature-card" key={title}><div className="icon-box"><Icon size={20}/></div><h3>{title}</h3><p>{text}</p><a href="#how-it-works">See how it works →</a></article>)}</div></div></section>}
