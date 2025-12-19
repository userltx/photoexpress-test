import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});


const poppins = Poppins({ 
  weight: ['400','600','700'], 
  subsets: ['latin'], 
  variable: '--font-logo' 
});

export const metadata: Metadata = {
  title: "PhotoExpress",
  description: "Тестовая галерея",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
