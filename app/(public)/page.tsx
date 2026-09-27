import Photo, { photos } from "@/components/Photo";
import Link from "next/link";
import type { Metadata } from "next";
import { jurisdictions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mineral development in Southern Africa",
};

const pillars = [
  {
    title: "Exploration & resource development",
    text: "Identifying and evaluating mineral assets using modern geological techniques and data-driven analysis.",
  },
  {
    title: "Responsible mining operations",
    text: "Open-cast mining and beneficiation carried out under safety standards and regulatory compliance.",
  },
  {
    title: "Technology-enabled discovery",
    text: "Geospatial analysis, modelling and field validation to improve the quality of exploration decisions.",
  },
  {
    title: "Environmental & community stewardship",
    text: "Limiting environmental impact and supporting host communities through employment, skills and local participation.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url(/img/hero-spitzkoppe.jpg)" }}
          aria-hidden
        />
        <div className="wrap">
          <span className="eyebrow light">
            Mining &amp; mineral development
          </span>
          <h1 className="display">
            Responsible mineral development in Southern Africa.
          </h1>
          <p className="lede">
            Innocent Resources Corporation Limited advances exploration,
            mining and beneficiation of critical minerals across Namibia,
            Botswana and South Africa.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="btn">
              View projects
            </Link>
            <Link href="/company" className="btn ghost">
              About the company
            </Link>
          </div>
        </div>
      </section>

      {/* Fact strip: only verifiable facts */}
      <section className="facts" aria-label="Company at a glance">
        <div className="wrap">
          <div className="facts-grid">
            <div className="fact">
              <b>3</b>
              <span>Jurisdictions: Namibia, Botswana, South Africa</span>
            </div>
            <div className="fact">
              <b>7</b>
              <span>Commodities in focus, plus precious stones</span>
            </div>
            <div className="fact">
              <b>Sandton</b>
              <span>Head office, South Africa</span>
            </div>
            <div className="fact">
              <b>Exploration to operations</b>
              <span>Stages of the portfolio</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Company profile</span>
            <h2 className="h2">
              A multi-commodity mining company with a disciplined approach.
            </h2>
            <div className="prose">
              <p>
                Innocent Resources Corporation Limited describes itself as an
                international mining and mineral development enterprise. It
                advances projects from exploration through to operational
                deployment, guided by safety, environmental responsibility and
                long-term value for communities and stakeholders.
              </p>
            </div>
            <p style={{ marginTop: 32 }}>
              <Link href="/company" className="link-arrow">
                Read the company overview <span aria-hidden>→</span>
              </Link>
            </p>
          </div>
          <Photo photo={photos.pit} className="reveal" />
        </div>
      </section>

      {/* Focus */}
      <section className="section paper">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">What we do</span>
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              Four areas of focus.
            </h2>
          </div>
          <div className="grid cols-4 reveal">
            {pillars.map((p, i) => (
              <div className="cell" key={p.title}>
                <span className="num">0{i + 1}</span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Portfolio</span>
            <h2 className="h2" style={{ maxWidth: "22ch" }}>
              Three jurisdictions, seven commodities.
            </h2>
            <p className="lede">
              The company is active in Namibia, South Africa and Botswana. Commodities
              in focus are shown for each country.
            </p>
          </div>

          <div className="juris-grid reveal">
            {jurisdictions.map((j) => (
              <article className="juris" key={j.country}>
                <div className="juris-head">
                  <div className="country">{j.country}</div>
                </div>
                <div className="juris-body">
                  <div className="chips" style={{ marginTop: 0 }}>
                    {j.commodities.map((c) => (
                      <span className="chip" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p style={{ marginTop: 32 }} className="reveal">
            <Link href="/projects" className="link-arrow">
              Project status and disclosure <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="section paper">
        <div className="wrap split">
          <Photo photo={photos.kalahari} className="reveal" />
          <div className="reveal">
            <span className="eyebrow">Our approach</span>
            <h2 className="h2">
              From early-stage exploration to potential production.
            </h2>
            <div className="prose">
              <p>
                The company works under governance frameworks, safety standards
                and transparent stakeholder engagement at every stage.
              </p>
            </div>
            <ul className="list-clean">
              <li>
                <span>01</span>Disciplined capital allocation and project
                evaluation
              </li>
              <li>
                <span>02</span>Emphasis on safety, compliance and risk
                management
              </li>
              <li>
                <span>03</span>ESG principles built into operational decisions
              </li>
              <li>
                <span>04</span>Long-term relationships with host communities and
                regulators
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Photo band */}
      <section className="photo-band">
        <img
          src={photos.canyonSunset.src}
          alt={photos.canyonSunset.alt}
          style={{ objectPosition: photos.canyonSunset.position }}
        />
        <div className="photo-band-copy">
          <p>
            Deserts, escarpments and ancient rock: the geography behind the
            company&apos;s exploration and operating footprint.
          </p>
        </div>
      </section>

      {/* Disclosure + CTA */}
      <section className="section dark on-dark">
        <div className="wrap">
          <div className="split wide-left">
            <div className="reveal">
              <span className="eyebrow light">Get in touch</span>
              <h2 className="h2">
                Speak with the team about partnerships or enquiries.
              </h2>
              <div className="hero-actions">
                <Link href="/contact" className="btn">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="notice reveal">
              <strong>A note on disclosure.</strong> This website describes the
              company&apos;s focus and plans. It does not publish mineral
              resource or reserve estimates, production or revenue figures,
              or exploration results.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
