"use client";

import Image from "next/image";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function CompanyPage() {
  useRevealOnScroll(".reveal");

  return (
    <>
      {/* Page Header */}
      <section className="section gray">
        <div className="container">
          <span className="section-kicker">Company</span>
          <h1 className="section-title">
            Innocent Resources Corporation Limited
          </h1>
          <p className="section-subtitle">
            An international mining and mineral development enterprise focused
            on responsible extraction, disciplined operations, and long-term
            resource stewardship across Southern Africa.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section">
        <div className="container profile-grid">
          <div>
            <h2 className="section-title reveal">Who We Are?</h2>
            <p className="section-subtitle reveal delay-1">
              Innocent Resources Corporation Limited operates across Southern Africa, 
              advancing projects from exploration through operational deployment. 
              Our activities integrate modern technologies, environmental safeguards, 
              and strong governance frameworks.
            </p>
            <p className="reveal delay-2" style={{ color: "var(--text-muted)" }}>
              The company focuses on delivering reliable mineral supply chains
              while maintaining strict compliance with regional regulations and
              contributing to sustainable economic development in host regions.
            </p>
          </div>

          <div className="profile-image reveal delay-3">
            <Image
              src="/company-profile.jpeg"
              alt="Mining operations in Southern Africa"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="section gray">
        <div className="container">
          <h2 className="section-title reveal">Mission, Vision & Values</h2>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Mission</h3>
              <p className="focus-text">
                Deliver responsible mineral development through disciplined
                operations that balance economic value with environmental and
                social integrity.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">Vision</h3>
              <p className="focus-text">
                To become a leading African mineral enterprise recognized for
                sustainable extraction, technological innovation, and long-term
                regional impact.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Values</h3>
              <p className="focus-text">
                Integrity, stewardship, innovation, community partnership, and
                safety guide every aspect of our operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Focus */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Geographic Focus</h2>
          <p className="section-subtitle reveal delay-1">
            Our operations and exploration activities are concentrated in
            resource-rich jurisdictions across Southern Africa.
          </p>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Namibia</h3>
              <p className="focus-text">
                Lithium, copper, and gold exploration and development.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">South Africa</h3>
              <p className="focus-text">
                Chrome, platinum, and titanium operations.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Botswana</h3>
              <p className="focus-text">
                Diamonds and precious stone assets.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Key Strengths */}
        <section className="section gray">
          <div className="container">
            <h2 className="section-title reveal">Key Strengths</h2>

            <div className="focus-grid">
              <div className="focus-item reveal delay-1">
                <h3 className="focus-title">Diversified Jurisdictions</h3>
                <p className="focus-text">
                  Access to resource-rich and stable mining jurisdictions across
                  Southern Africa.
                </p>
              </div>

              <div className="focus-item reveal delay-2">
                <h3 className="focus-title">Multi-Commodity Portfolio</h3>
                <p className="focus-text">
                  Balanced exposure to critical minerals, metals, and gemstones across
                  multiple asset classes.
                </p>
              </div>

              <div className="focus-item reveal delay-3">
                <h3 className="focus-title">Advanced Exploration Technology</h3>
                <p className="focus-text">
                  Integration of modern exploration tools and data-driven geological
                  modeling.
                </p>
              </div>

              <div className="focus-item reveal delay-4">
                <h3 className="focus-title">Operational Efficiency</h3>
                <p className="focus-text">
                  Proven execution across open-cast mining and beneficiation processes.
                </p>
              </div>

              <div className="focus-item reveal delay-4">
                <h3 className="focus-title">Strong Compliance Discipline</h3>
                <p className="focus-text">
                  Alignment with environmental, social, and regulatory standards across
                  all operating regions.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Strategic Objectives */}
        <section className="section">
          <div className="container">
            <h2 className="section-title reveal">Strategic Objectives</h2>

            <div className="focus-grid">
              <div className="focus-item reveal delay-1">
                <h3 className="focus-title">Clean Mining Practices</h3>
                <p className="focus-text">
                  Pursue environmentally responsible mining methods with progressive
                  rehabilitation and reduced impact.
                </p>
              </div>

              <div className="focus-item reveal delay-2">
                <h3 className="focus-title">Technology-Enabled Exploration</h3>
                <p className="focus-text">
                  Deploy advanced digital tools and analytics to improve discovery
                  accuracy and decision-making.
                </p>
              </div>

              <div className="focus-item reveal delay-3">
                <h3 className="focus-title">Environmental Stewardship</h3>
                <p className="focus-text">
                  Maintain high standards of land, water, and ecosystem protection
                  across all projects.
                </p>
              </div>

              <div className="focus-item reveal delay-4">
                <h3 className="focus-title">Local Economic Development</h3>
                <p className="focus-text">
                  Support host communities through employment, skills development, and
                  local participation.
                </p>
              </div>

              <div className="focus-item reveal delay-4">
                <h3 className="focus-title">Stable Global Supply</h3>
                <p className="focus-text">
                  Establish transparent and reliable supply lines for critical minerals
                  in global markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="section gray">
            <div className="container">
              <h2 className="section-title reveal">Contact Us</h2>
    
              <p className="section-subtitle reveal delay-1">
                For general inquiries, partnerships, or operational matters, please
                contact us through the details below.
              </p>
    
              <div className="reveal delay-2" style={{ lineHeight: 1.8 }}>
                <p>
                  <strong>Office Address:</strong><br />
                  101 Katherine Street, Sandton, South Africa
                </p>
    
                <p style={{ marginTop: 16 }}>
                  <strong>General Inquiries:</strong><br />
                  Info@InnocentResources.com
                </p>
    
                <p style={{ marginTop: 16 }}>
                  <strong>Emergency & Site Safety Hotline:</strong><br />
                  +27 79 919 0205
                </p>
              </div>
            </div>
        </section>

    </>
  );
}
