import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Addis Eats | Ethiopian Food Ordering",
    template: "%s | Addis Eats",
  },
  description: "Discover Ethiopian dishes and order your favorites with Addis Eats.",
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="grid ">
        <Header/>
         {children}
         <Footer/>
      </body>
    </html>
  );
}
