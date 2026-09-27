import type { Metadata } from "next";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details and enquiry form for Innocent Resources.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow light">Contact</span>
          <h1 className="display">Get in touch.</h1>
          <p className="lede">
            For general enquiries, partnerships or operational matters, write
            to the head office or use the form below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact-grid">
          <div className="reveal">
            <span className="eyebrow">Head office</span>
            <dl className="contact-list">
              <div>
                <dt>Address</dt>
                <dd>{contact.address}</dd>
              </div>
              <div>
                <dt>General enquiries</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>Emergency &amp; site safety hotline</dt>
                <dd>
                  <a href={`tel:${contact.hotlineTel}`}>{contact.hotline}</a>
                </dd>
              </div>
            </dl>
          </div>

          <form
            className="form reveal"
            action="https://api.web3forms.com/submit"
            method="POST"
          >
            <input
              type="hidden"
              name="access_key"
              value="c33b4d90-0349-42b1-9309-4c41d7ef5def"
            />
            <input type="hidden" name="subject" value="New website enquiry" />
            <input type="hidden" name="from_name" value="Website contact form" />
            <input
              type="checkbox"
              name="botcheck"
              className="hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />

            <label>
              Name
              <input
                className="field"
                type="text"
                name="name"
                required
                autoComplete="name"
              />
            </label>
            <label>
              Email
              <input
                className="field"
                type="email"
                name="email"
                required
                autoComplete="email"
              />
            </label>
            <label>
              Message
              <textarea className="field" name="message" required />
            </label>
            <button type="submit" className="btn">
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
