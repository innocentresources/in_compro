"use client";

import Image from "next/image";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function HomePage() {
  useRevealOnScroll(".reveal");

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title fade-in delay-1">
              Responsible Mineral Development
            </h1>

            <p className="hero-subtitle fade-in delay-2">
              Delivering sustainable extraction and mineral development across
              Southern Africa through disciplined operations, technology, and
              environmental stewardship.
            </p>

            <a href="#" className="btn fade-in delay-3">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="section gray">
        <div className="container">
          <div className="profile-grid">
            {/* Text */}
            <div>
              <span className="section-kicker">Company</span>

              <h2 className="section-title">Company Profile</h2>

              <p className="section-subtitle">
                Innocent Resources Corporation Limited operates across Namibia,
                Botswana, and South Africa, advancing exploration, mining, and
                beneficiation of critical minerals.
              </p>

              <p style={{ marginTop: 16, color: "var(--text-muted)" }}>
                Our operations are guided by disciplined execution,
                environmental responsibility, and long-term value creation
                for communities and stakeholders.
              </p>

              <a
                href="/company"
                className="btn-outline"
                style={{ marginTop: 32 }}
              >
                Learn More About Us
              </a>
            </div>

            {/* Image */}
            <div className="profile-image">
              <Image
                src="/company-profile.jpeg"
                alt="Field mining operations"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus */}
      <section className="section">
        <div className="container">
          <span className="section-kicker reveal delay-1">
            What We Do
          </span>

          <h2 className="section-title reveal delay-2">
            Our Focus
          </h2>

          <p className="section-subtitle reveal delay-3">
            Our activities are centered on disciplined resource development,
            responsible mining operations, and long-term value creation
            across Southern Africa.
          </p>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">
                Exploration & Resource Development
              </h3>
              <p className="focus-text">
                Identification and evaluation of high-potential mineral
                assets using modern geological techniques and data-driven
                analysis.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">
                Responsible Mining Operations
              </h3>
              <p className="focus-text">
                Open-cast mining and beneficiation processes executed with
                strict operational discipline, safety standards, and
                regulatory compliance.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">
                Technology-Enabled Discovery
              </h3>
              <p className="focus-text">
                Integration of advanced exploration technologies, including
                geospatial analysis, modeling, and field validation.
              </p>
            </div>

            <div className="focus-item reveal delay-4">
              <h3 className="focus-title">
                Environmental & Community Stewardship
              </h3>
              <p className="focus-text">
                Commitment to minimizing environmental impact, supporting
                host communities, and aligning operations with long-term
                sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">News & Press Releases</h2>

          <div className="card-grid">
            {[1, 2, 3, 4].map((item) => (
              <div className="card" key={item}>
                <h4>Blog Title</h4>
                <p>
                  Brief summary of the article or press release highlighting
                  operational updates or corporate announcements.
                </p>
                <a href="#" className="btn" style={{ marginTop: 16 }}>
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
