import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "AssuExpert",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
