export default function Footer() {
    return <footer id="about" className="site-footer">
        <div className="container">
            <div className="footer-grid">
                <div>
                    <div className="brand">
                        <span className="brand-mark small">N</span>NEXORA</div>
                    <p>Connecting Talent and Skills, Academia & Industry.</p></div>
                <div>
                    <strong>Platform</strong>
                    <a href="#platform">Overview</a>
                    <a href="#students">Students</a>
                    <a href="#institutions">Institutions</a>
                    <a href="#companies">Companies</a>
                </div>
                <div>
                    <strong>Product</strong>
                    <a href="#how-it-works">How it works</a>
                    <a href="#students">Skill mapping</a>
                    <a href="#companies">Opportunities</a>
                </div>
                <div>
                    <strong>Access</strong>
                    <a href="/auth/role-selection">Login</a>
                    <a href="/auth/role-selection">Register</a>
                </div>
            </div>
            <div className="footer-bottom"><span>© 2026 NEXORA</span>
                <span>Connecting Talent and Skills, Academia & Industry</span></div></div>
    </footer>
}
