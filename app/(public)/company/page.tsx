import Photo, { photos } from "@/components/Photo";
import Link from "next/link";
import type { Metadata } from "next";
import { jurisdictions } from "@/lib/site";

const jurisPhotos = {
  Namibia: photos.namibiaDunes,
  "South Africa": photos.southAfricaCanyon,
  Botswana: photos.botswanaSky,
} as const;

export const metadata: Metadata = {
  title: "Company overview",
  description:
    "Who Innocent Resources Corporation Limited is, where it operates and what it is working toward.",
};

const objectives = [
  {
    title: "Clean mining practices",
    text: "Environmentally responsible mining methods with progressive rehabilitation and reduced impact.",
  },
  {
    title: "Technology-enabled exploration",
    text: "Advanced digital tools and analytics to improve discovery accuracy and decision-making.",
  },
  {
    title: "Environmental stewardship",
    text: "High standards of land, water and ecosystem protection across all projects.",
  },
  {
    title: "Local economic development",
    text: "Support for host communities through employment, skills development and local participation.",
  },
  {
    title: "Stable global supply",
    text: "Transparent and reliable supply lines for critical minerals in global markets.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <section
        className="page-hero photo-hero"
        style={{ "--hero-img": `url(${photos.duneCurve.src})` } as React.CSSProperties}
      >
        <div className="wrap">
          <span className="eyebrow light">Company</span>
          <h1 className="display">
            An international mineral development company.
          </h1>
          <p className="lede">
            Innocent Resources Corporation Limited focuses on responsible
            extraction, disciplined operations and long-term resource
            stewardship across Southern Africa.
          </p>
        </div>
      </section>

      {/* Who we are */}
      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Who we are</span>
            <h2 className="h2">
              Projects advanced from exploration through to operations.
            </h2>
            <div className="prose">
              <p>
                Innocent Resources Corporation Limited operates across Southern
                Africa, advancing projects from exploration through operational
                deployment. Its activities combine modern technologies,
                environmental safeguards and governance frameworks.
              </p>
              <p>
                The company aims to deliver reliable mineral supply chains
                while complying with regional regulations and contributing to
                sustainable economic development in the regions where it works.
              </p>
            </div>
          </div>
          <Photo photo={photos.pit} className="reveal" />
        </div>
      </section>

      {/* Mission / vision / values */}
      <section className="section paper">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Purpose</span>
            <h2 className="h2">Mission, vision and values.</h2>
          </div>
          <div className="grid cols-3 reveal">
            <div className="cell">
              <span className="num">Mission</span>
              <p style={{ color: "var(--text)", fontSize: "1.05rem" }}>
                To deliver responsible mineral development through disciplined
                operations that balance economic value with environmental and
                social integrity.
              </p>
            </div>
            <div className="cell">
              <span className="num">Vision</span>
              <p style={{ color: "var(--text)", fontSize: "1.05rem" }}>
                To become a leading African mineral enterprise recognised for
                sustainable extraction, technological innovation and long-term
                regional impact.
              </p>
            </div>
            <div className="cell">
              <span className="num">Values</span>
              <p style={{ color: "var(--text)", fontSize: "1.05rem" }}>
                Integrity, stewardship, innovation, community partnership and
                safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Geography */}
      <section className="section">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Where we work</span>
            <h2 className="h2">Geographic focus.</h2>
            <p className="lede">
              The company&apos;s activities are concentrated in three
              jurisdictions in Southern Africa.
            </p>
          </div>
          <div className="juris-grid reveal">
            {jurisdictions.map((j) => (
              <article className="juris" key={j.country}>
                <div className="juris-photo">
                  <img
                    src={jurisPhotos[j.country as keyof typeof jurisPhotos].src}
                    alt={jurisPhotos[j.country as keyof typeof jurisPhotos].alt}
                    style={{
                      objectPosition:
                        jurisPhotos[j.country as keyof typeof jurisPhotos].position,
                    }}
                  />
                </div>
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

      {/* Objectives */}
      <section className="section dark on-dark">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow light">Strategy</span>
            <h2 className="h2">Strategic objectives.</h2>
          </div>
          <div className="grid cols-3 reveal">
            {objectives.map((o, i) => (
              <div className="cell" key={o.title}>
                <span className="num">0{i + 1}</span>
                <h3 className="h3">{o.title}</h3>
                <p>{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Contact</span>
            <h2 className="h2">Speak with the company.</h2>
            <div className="prose">
              <p>
                For general enquiries, partnerships or operational matters,
                contact the head office in Sandton.
              </p>
            </div>
            <p style={{ marginTop: 32 }}>
              <Link href="/contact" className="btn outline">
                Contact details
              </Link>
            </p>
          </div>
          <Photo photo={photos.kalahari} className="reveal" />
        </div>
      </section>
    </>
  );
}
