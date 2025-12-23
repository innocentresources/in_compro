"use client";

import Image from "next/image";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function SustainabilityPage() {
  useRevealOnScroll(".reveal");

  return (
    <>
      {/* Page Header */}
      <section className="section gray">
        <div className="container">
          <span className="section-kicker">Sustainability</span>
          <h1 className="section-title">
            Responsible & Sustainable Operations
          </h1>
          <p className="section-subtitle">
            Our sustainability framework integrates environmental stewardship,
            social responsibility, and disciplined governance across all
            operations and development activities.
          </p>
        </div>
      </section>

      {/* Image Divider 1 */}
      <section>
          <div className="full-bleed-image reveal">
            <Image
              src="/sustainability01.jpg"
              alt="Mining operations integrated with surrounding environment"
              fill
              sizes="100vw"
              priority
            />
          </div>
        </section>


      {/* Sustainability Overview */}
      <section className="section gray">
        <div className="container">
          <h2 className="section-title reveal">Sustainability Overview</h2>

          <p className="section-subtitle reveal delay-1">
            Innocent Resources Corporation Limited is committed to minimizing
            environmental impact, supporting host communities, and maintaining
            transparent governance throughout the lifecycle of our mining and
            mineral development projects.
          </p>

          <p className="reveal delay-2" style={{ color: "var(--text-muted)" }}>
            Sustainability considerations are embedded into project planning,
            operational decision-making, and long-term strategy to ensure
            responsible resource development aligned with international
            expectations.
          </p>
        </div>
      </section>

      {/* ESG Commitments */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">ESG Commitments</h2>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Environmental</h3>
              <p className="focus-text">
                Minimized ecological disturbance, progressive rehabilitation,
                responsible water and land management, and reduced carbon
                intensity across operations.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">Social</h3>
              <p className="focus-text">
                Respect for local communities, responsible employment practices,
                transparent engagement, and contribution to local economic
                development.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Governance</h3>
              <p className="focus-text">
                Disciplined governance structures ensuring accountability,
                regulatory compliance, ethical conduct, and operational
                traceability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Stewardship */}
      <section className="section gray">
        <div className="container">
          <h2 className="section-title reveal">Environmental Stewardship</h2>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Impact Management</h3>
              <p className="focus-text">
                Identification, monitoring, and mitigation of environmental
                impacts throughout the project lifecycle.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">Rehabilitation</h3>
              <p className="focus-text">
                Progressive rehabilitation practices aimed at restoring land
                and ecosystems post-mining.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Resource Efficiency</h3>
              <p className="focus-text">
                Efficient use of energy, water, and materials to reduce waste
                and environmental footprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
      <div className="full-bleed-image reveal">
        <Image
          src="/sustainability02.jpg"
          alt="Mining operations integrated with surrounding environment"
          fill
          sizes="100vw"
          priority
        />
      </div>
    </section>


      {/* Community Engagement */}
      <section className="section gray">
        <div className="container">
          <h2 className="section-title reveal">Community Engagement</h2>

          <p className="section-subtitle reveal delay-1">
            Our operations are guided by established community-relations
            frameworks that prioritize transparency, respect, and long-term
            partnership.
          </p>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Local Employment</h3>
              <p className="focus-text">
                Responsible employment structures that prioritize local hiring
                and skills development.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">Community Development</h3>
              <p className="focus-text">
                Participation in initiatives that support social and economic
                development within host communities.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Cultural & Environmental Respect</h3>
              <p className="focus-text">
                Respect for cultural heritage, land use practices, and local
                environmental considerations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Safety */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Governance & Safety</h2>

          <div className="focus-grid">
            <div className="focus-item reveal delay-1">
              <h3 className="focus-title">Regulatory Compliance</h3>
              <p className="focus-text">
                Full compliance with applicable laws, permits, and regulatory
                requirements across all jurisdictions.
              </p>
            </div>

            <div className="focus-item reveal delay-2">
              <h3 className="focus-title">Ethical Supply Chains</h3>
              <p className="focus-text">
                Responsible procurement and supply chain practices aligned
                with ethical sourcing expectations.
              </p>
            </div>

            <div className="focus-item reveal delay-3">
              <h3 className="focus-title">Safety Standards</h3>
              <p className="focus-text">
                Non-negotiable safety standards designed to protect workers,
                contractors, and surrounding communities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
