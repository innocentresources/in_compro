"use client";

export default function ContactPage() {
  return (
    <main>
      {/* Section */}
      <section className="section">
        <div className="container">
          {/* Header */}
          <span className="section-kicker">Contact</span>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">
            Have a question, project idea, or collaboration in mind?  
            Fill out the form below and we’ll get back to you shortly.
          </p>

          {/* Form Wrapper */}
          <div style={{ maxWidth: "640px", marginTop: "48px" }}>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="card"
            >
              {/* REQUIRED: Web3Forms access key */}
              <input
                type="hidden"
                name="access_key"
                value="c33b4d90-0349-42b1-9309-4c41d7ef5def"
              />

              <input
                type="hidden"
                name="subject"
                value="New Contact Message"
              />
              <input type="hidden" name="from_name" value="Website Contact" />

              {/* Name */}
              <div style={{ marginBottom: "16px" }}>
                <label className="footer-text">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "16px" }}>
                <label className="footer-text">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: "24px" }}>
                <label className="footer-text">Message</label>
                <textarea
                  name="message"
                  required
                  placeholder="Write your message here..."
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Button */}
              <button type="submit" className="btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  outline: "none",
  marginTop: "6px",
};
