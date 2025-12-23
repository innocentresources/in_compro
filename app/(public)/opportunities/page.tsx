"use client";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import Image from "next/image";

export default function OpportunitiesPage() {
  useRevealOnScroll(".reveal");

  return (
    <>
      {/* Hero Image */}
      <section>
        <div className="full-bleed-image reveal">
          <Image
            src="/career.jpg"
            alt="Mining operations integrated with surrounding environment"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* Page Header */}
      <section className="section gray">
        <div className="container">
          <span className="section-kicker">Opportunities</span>
          <h1 className="section-title">
            Investment & Career Opportunities
          </h1>
          <p className="section-subtitle">
            Engage with Innocent Resources Corporation Limited through long-term
            investment, strategic collaboration, or professional career
            development across Southern Africa.
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">
            Who This Is For
          </h2>

          <p className="section-subtitle reveal delay-1">
            Our opportunities are designed for individuals and organizations
            seeking disciplined growth, operational integrity, and long-term
            value creation in the mining and mineral development sector.
          </p>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Investors & Capital Partners</h3>
              <p className="focus-text">
                Institutions and private investors seeking exposure to
                responsibly managed mineral assets with long-term development
                horizons.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">Industry & Strategic Partners</h3>
              <p className="focus-text">
                Organizations operating across mining, processing, logistics,
                technology, and infrastructure value chains.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Professionals & Graduates</h3>
              <p className="focus-text">
                Individuals seeking structured, ethical, and technically
                rigorous careers within a growing mineral enterprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Opportunities */}
      <section className="section gray">
        <div className="container">
          <h2 className="section-title reveal">
            Investor Opportunities
          </h2>

          <p className="section-subtitle reveal delay-1">
            We pursue capital partnerships that align with disciplined project
            development, transparent governance, and long-term value creation.
          </p>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Project-Level Investment</h3>
              <p className="focus-text">
                Participation in exploration and development initiatives across
                lithium, base metals, precious metals, and gemstones.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">Strategic Partnerships</h3>
              <p className="focus-text">
                Collaboration across mining operations, beneficiation,
                infrastructure, and technology deployment.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Joint Venture Structures</h3>
              <p className="focus-text">
                Long-term joint ventures structured around shared risk,
                disciplined execution, and regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">
            Career Opportunities
          </h2>

          <p className="section-subtitle reveal delay-1">
            Our people are central to our success. We seek professionals who
            value safety, accountability, and technical excellence.
          </p>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Mining & Operations</h3>
              <p className="focus-text">
                Site-based roles supporting open-cast mining, processing,
                production management, and operational support.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">Engineering & Technical</h3>
              <p className="focus-text">
                Positions in geology, mining engineering, environmental
                management, surveying, and technical services.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Corporate & Governance</h3>
              <p className="focus-text">
                Roles in finance, compliance, procurement, risk management, and
                corporate administration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training */}
      <section className="section gray">
        <div className="container">
          <h2 className="section-title reveal">
            Training & Development
          </h2>

          <p className="section-subtitle reveal delay-1">
            We invest in skills development to support safe operations,
            regulatory compliance, and long-term professional growth.
          </p>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Graduate Development</h3>
              <p className="focus-text">
                Structured entry-level pathways for graduates seeking practical
                exposure in mining and mineral development.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">Student Internships</h3>
              <p className="focus-text">
                Short-term placements for students in geology, engineering, and
                related technical disciplines.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Ongoing Training</h3>
              <p className="focus-text">
                Continuous learning focused on safety standards, certification,
                and operational best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Process */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">
            How to Engage
          </h2>

          <p className="section-subtitle reveal delay-1">
            All investment inquiries, partnership discussions, and career
            applications are managed through a structured review process to
            ensure alignment and compliance.
          </p>

          <a href="/contact" className="btn reveal delay-2">
            Contact Our Team
          </a>
        </div>
      </section>
    </>
  );
}
