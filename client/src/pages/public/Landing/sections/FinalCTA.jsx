import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function FinalCTA(){return <section className="cta-section"><div className="container"><div className="cta-inner"><div><div className="eyebrow">NEXORA</div><h2>Connect skills to the opportunities that need them.</h2><p>Start with the workspace that fits your role.</p></div><Link className="button button-light" to="/auth/role-selection">Get started <ArrowRight size={16}/></Link></div></div></section>}
