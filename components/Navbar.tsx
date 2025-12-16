import Image from "next/image";

export default function Navbar() {
  return (
    <header className="header">
      <div className="container header-inner">
        {/* Logo + Name */}
        <div className="logo-group">
          <Image
            src="/logo.svg"
            alt="Innocent Resources Logo"
            width={100}
            height={100}
            priority
          />
          <span className="logo-text">Innocent Resources</span>
        </div>

        <nav className="nav">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Company</a>
          <a href="#" className="nav-link">Sustainability</a>
          <a href="#" className="nav-link">Opportunities</a>
          <a href="#" className="nav-link">Insights</a>
        </nav>

      </div>
    </header>
  );
}
