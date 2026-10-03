import { AlertCircle, Building2, GraduationCap, Check } from 'lucide-react';
export default function Problem() {
  const cards = [
    { icon: GraduationCap, title: 'Students have fragmented evidence', text: 'Skills, projects, certificates and applications often live in disconnected places.', points: ['Unified skill profile', 'Evidence from projects and credentials', 'Clear skill-gap visibility'] },
    { icon: Building2, title: 'Institutions lack live skill intelligence', text: 'Placement teams need a clearer view of student capabilities and industry demand.', points: ['Department-level insights', 'Industry demand from platform data', 'Placement and internship tracking'] },
    { icon: AlertCircle, title: 'Companies need relevant talent', text: 'Recruiters spend time filtering profiles that do not clearly show role-relevant skills.', points: ['Structured opportunities', 'Explainable candidate matching', 'Hiring pipeline visibility'] },
  ];
  return <section className="section problem-section"><div className="container"><div className="narrow-heading"><div className="eyebrow">THE GAP</div><h2>Three sides of the same talent problem.</h2><p>NEXORA creates a shared workflow where skills, academic development and industry opportunities can connect.</p></div><div className="problem-grid">{cards.map(({icon: Icon, title, text, points}) => <article key={title}><div className="icon-box"><Icon size={20}/></div><h3>{title}</h3><p>{text}</p><ul>{points.map(point => <li key={point}><Check size={15}/>{point}</li>)}</ul></article>)}</div></div></section>;
}
