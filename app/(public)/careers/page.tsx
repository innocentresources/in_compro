import type { Metadata } from "next";
import Photo, { photos } from "@/components/Photo";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Working with Innocent Resources Corporation Limited.",
};

const disciplines = [
  {
    title: "Geology & exploration",
    text: "Geologists, geophysicists and surveyors involved in identifying and evaluating mineral prospects.",
  },
  {
    title: "Mining & operations",
    text: "Mining engineers and site personnel for open-cast mining and beneficiation.",
  },
  {
    title: "Environment & safety",
    text: "Environmental, health and safety specialists supporting compliant, careful operations.",
  },
  {
    title: "Corporate",
    text: "Finance, compliance, procurement, risk and administration.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow light">Careers</span>
          <h1 className="display">Work with a growing mineral company.</h1>
          <p className="lede">
            Innocent Resources is interested in hearing from people who value
            safety, accountability and technical care.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">How to apply</span>
            <h2 className="h2">No open roles are listed at present.</h2>
            <div className="prose">
              <p>
                We do not currently advertise vacancies on this site. If your
                background fits one of the areas below, you are welcome to send
                a short introduction and your CV. Applications are reviewed as
                needs arise.
              </p>
            </div>
            <p style={{ marginTop: 32 }}>
              <a href={`mailto:${contact.email}`} className="btn">
                Email the head office
              </a>
            </p>
          </div>
          <Photo photo={photos.pit} className="reveal" />
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Disciplines</span>
            <h2 className="h2">Areas of interest.</h2>
            <p className="lede">
              Students and recent graduates in these fields are also welcome to
              get in touch.
            </p>
          </div>
          <div className="grid cols-4 reveal">
            {disciplines.map((d, i) => (
              <div className="cell" key={d.title}>
                <span className="num">0{i + 1}</span>
                <h3 className="h3">{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
