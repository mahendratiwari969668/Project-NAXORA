import { Link, useParams } from 'react-router-dom';
export default function RolePlaceholder() {
    const { role } = useParams();
    const label = role?.charAt(0).toUpperCase() + role?.slice(1);
    return <main className="auth-page">
        <div className="auth-shell auth-placeholder">
            <a className="brand" href="/">
                <span className="brand-mark">
                    N
                </span>
                NEXORA
            </a>
            <div className="icon-box">
                <span style={{ fontWeight: 700 }}>
                    N
                </span>
            </div>
            <div className="eyebrow">FOUNDATION</div>
            <h2>{label} authentication</h2>
            <p>The role-specific login and registration form is the next authentication step. The role selection flow is now wired so the landing page does not dead-end.</p><Link className="button button-primary" to="/auth/role-selection">Choose another role</Link><Link className="back-link" to="/">Back to home</Link></div></main>
}
