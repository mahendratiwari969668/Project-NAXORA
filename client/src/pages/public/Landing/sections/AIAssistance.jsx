import { Bot, FileSearch, Lightbulb, ShieldCheck } from 'lucide-react';
const items = [
    [
        'Resume & skill analysis', 'Extract useful profile signals for review instead of manual entry.', FileSearch], ['Opportunity assistance', 'Help explain relevant skills, gaps and role requirements.', Lightbulb], ['Career guidance', 'Suggest learning directions from the student’s stated goals and profile.', Bot],
    ['Human review stays central', 'AI assists. It does not become the source of truth for hiring or institutional decisions.', ShieldCheck]
];
export default function AIAssistance() {
    return <section className="section capabilities">
        <div className="container">
            <div className="narrow-heading">
                <div className="eyebrow">AI, USED CAREFULLY</div>
                <h2>Useful assistance without handing over the decision.</h2>
                <p>AI features sit behind the platform’s deterministic data and always leave room for review, correction and human judgment.</p>
            </div>
            <div className="feature-grid">{items.map(([title, text, Icon]) => <article className="feature-card" key={title}>
                <div className="icon-box"><Icon size={20} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
            </article>)}</div>
        </div>
    </section>
}
