import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: {
    default: "Cine-Stream | Discover your next favorite movie",
    template: "%s | Cine-Stream",
  },
  description:
    "Explore popular movies, discover new stories, and build your movie watchlist with Cine-Stream.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <footer className="site-footer">
            Cine-Stream · A Sprint 09 learning project powered by TMDB data.
          </footer>
        </div>
      </body>
    </html>
  );
}
