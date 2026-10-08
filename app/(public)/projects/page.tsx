import Link from "next/link";
import type { Metadata } from "next";
import { jurisdictions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The company's portfolio by jurisdiction, with a clear statement of what is and is not yet published.",
};

const published = [
  "Jurisdictions of activity",
  "Commodities of interest",
];

const notPublished = [
  "Mineral resource or reserve estimates",
  "Drilling, sampling or assay results",
  "Production volumes or revenue",
  "Licence, permit or approval status",
  "Named project partners or joint ventures",
];

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero photo-hero hero-projects">
        <div className="wrap">
          <span className="eyebrow light">Projects</span>
          <h1 className="display">Portfolio across three jurisdictions.</h1>
          <p className="lede">
            An overview of where the company is active and what it is
            targeting. Figures and results are shown only where the company has
            published them.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Portfolio</span>
            <h2 className="h2">By jurisdiction.</h2>
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
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Disclosure</span>
            <h2 className="h2">What is and is not published.</h2>
            <p className="lede">
              Plans and confirmed results are different things. This page
              separates them so readers know what the company has and has not
              disclosed.
            </p>
          </div>
          <div className="grid cols-2 reveal">
            <div className="cell">
              <span className="num">Described on this site</span>
              <ul className="list-clean" style={{ marginTop: 16 }}>
                {published.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="cell">
              <span className="num">Not published on this site</span>
              <ul className="list-clean" style={{ marginTop: 16 }}>
                {notPublished.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark on-dark">
        <div className="wrap split wide-left">
          <div className="reveal">
            <span className="eyebrow light">Enquiries</span>
            <h2 className="h2">
              Interested in a project or partnership discussion?
            </h2>
          </div>
          <div className="reveal">
            <Link href="/contact" className="btn">
              Contact the team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
