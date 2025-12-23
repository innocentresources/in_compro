export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Company */}
        <div>
          <h4 className="footer-title">Innocent Resources</h4>
          <p className="footer-text">
            Responsible mineral development across Southern Africa, committed
            to environmental stewardship, community partnership, and long-term
            value creation.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Company</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Opportunities</a></li>
            <li><a href="#">Insights</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="footer-title">Contact</h4>
          <p className="footer-text">
            101 Katherine Street<br />
            Sandton, South Africa
          </p>
          <p className="footer-text">
            Safety Hotline:<br />
            <strong>+27 79 919 0205</strong>
          </p>
          <p className="footer-text">
            Email:<br />
            <strong>Info@InnocentResources.com</strong>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Innocent Resources Corporation Limited. All
        rights reserved.
      </div>
    </footer>
  );
}
