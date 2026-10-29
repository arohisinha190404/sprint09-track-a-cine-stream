import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container" style={{ paddingTop: 90, paddingBottom: 90 }}>
      <span className="eyebrow">404 · Scene missing</span>
      <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", marginBottom: 12 }}>
        This movie is off the reel.
      </h1>
      <p style={{ color: "var(--muted)", lineHeight: 1.8, maxWidth: 520 }}>
        We could not find that movie. It may have been removed or the link may
        be incorrect.
      </p>
      <Link className="primary-button" href="/">Return to Cine-Stream</Link>
    </div>
  );
}
