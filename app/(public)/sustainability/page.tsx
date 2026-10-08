import Link from "next/link";
import type { Metadata } from "next";
import Photo, { photos } from "@/components/Photo";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "How Innocent Resources intends to approach environmental, social and governance responsibilities.",
};

const pillars = [
  {
    title: "Environment",
    text: "The company aims to limit environmental disturbance, rehabilitate land progressively as work advances, and manage land and water carefully at every stage of a project.",
  },
  {
    title: "Community",
    text: "The company aims to support host communities through employment, skills development and local participation, and to engage with them openly.",
  },
  {
    title: "Governance & safety",
    text: "The company works to operate within applicable laws and permit conditions, to conduct its business ethically, and to keep people safe on and around its sites.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <section className="page-hero photo-hero hero-sustainability">
        <div className="wrap">
          <span className="eyebrow light">Sustainability</span>
          <h1 className="display">Responsible from the first field visit.</h1>
          <p className="lede">
            Environmental, social and governance considerations are part of how
            the company plans its work, from early exploration onwards.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Our intent</span>
            <h2 className="h2">What we aim to do.</h2>
            <div className="prose">
              <p>
                The statements on this page describe the company&apos;s aims and
                the way it intends to work. They are commitments of intent, not
                measured results.
              </p>
              <p>
                Mining and exploration change land. Our aim is to keep that
                change as small as practical, to leave land in better order than
                we found it, and to share the benefits of our work with the
                communities close to it.
              </p>
            </div>
          </div>
          <Photo photo={photos.kalahari} className="reveal" />
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Three areas</span>
            <h2 className="h2">Environment, community, governance.</h2>
          </div>
          <div className="grid cols-3 reveal">
            {pillars.map((p, i) => (
              <div className="cell" key={p.title}>
                <span className="num">0{i + 1}</span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <p className="notice reveal" style={{ marginTop: 24 }}>
            <strong>Reporting.</strong> This website does not yet publish
            sustainability metrics, audits or certifications. Any such
            information will be added only once it can be verified.
          </p>
        </div>
      </section>

      <section className="section dark on-dark">
        <div className="wrap split wide-left">
          <div className="reveal">
            <span className="eyebrow light">Site safety</span>
            <h2 className="h2">Concerns about safety at a site?</h2>
            <p className="lede">
              Use the emergency and site safety hotline on the contact page.
            </p>
          </div>
          <div className="reveal">
            <Link href="/contact" className="btn">
              Contact details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
