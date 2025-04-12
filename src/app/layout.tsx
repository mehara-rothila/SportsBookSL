import './globals.css';
import type { Metadata } from 'next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'SportsBookSL - Sports Facility Booking Platform',
  description: 'Book sports facilities, equipment, and trainers across Sri Lanka',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
<html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
              <body className="font-sans h-full" suppressHydrationWarning>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </body>
        </html>
      );
}