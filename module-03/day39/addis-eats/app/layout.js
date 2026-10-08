import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Header />
        {children}
        <Footer />
        </Providers>
      </body>
    </html>
  );
}