import "./globals.css";
import Navbar from "../components/Navbar";
import UserProvider from "@/context/UserContext";

export const metadata = {
  title: "AssuExpert",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
