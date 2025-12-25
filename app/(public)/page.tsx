"use client";

import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function HomePage() {
  useRevealOnScroll(".reveal");

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

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

      {/* Our Approach */}
      <section className="section gray">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div className="reveal">
              <span className="section-kicker">
                Our Approach
              </span>

              <h2 className="section-title">
                Disciplined, Responsible Resource Development
              </h2>

              <p className="section-subtitle mt-4">
                We apply a structured, long-term approach to mineral exploration
                and development, balancing technical rigor with environmental
                and social responsibility.
              </p>

              <p style={{ marginTop: 16, color: "var(--text-muted)" }}>
                From early-stage exploration through to potential production,
                our teams operate under clear governance frameworks, strict
                safety standards, and a commitment to transparent stakeholder
                engagement.
              </p>

              <ul style={{ marginTop: 24 }} className="focus-list">
                <li>Disciplined capital allocation and project evaluation</li>
                <li>Strong emphasis on safety, compliance, and risk management</li>
                <li>Integration of ESG principles into operational decision-making</li>
                <li>Long-term partnerships with host communities and regulators</li>
              </ul>
            </div>

            {/* Image */}
            <div className="reveal delay-1">
              <div className="relative w-full h-[420px] rounded-lg overflow-hidden">
                <Image
                  src="/our_approach.jpeg"
                  alt="Operational planning and field execution"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
