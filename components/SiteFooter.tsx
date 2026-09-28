import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 20 }}>
              <Image src="/logo.svg" alt="" width={46} height={46} />
              <span className="brand-text">
                <strong style={{ color: "#fff" }}>Innocent Resources</strong>
                <span>Corporation Limited</span>
              </span>
            </div>
            <p style={{ maxWidth: "40ch" }}>
              Mining and mineral development in Namibia, Botswana and South
              Africa.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/company">Company</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/sustainability">Sustainability</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Head office</h4>
            <ul>
              <li>101 Katherine Street, Sandton, South Africa</li>
              <li>
                <a href="mailto:Info@InnocentResources.com">
                  Info@InnocentResources.com
                </a>
              </li>
              <li>
                Site safety hotline:{" "}
                <a href="tel:+27799190205">+27 79 919 0205</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>
            © {new Date().getFullYear()} Innocent Resources Corporation Limited.
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
