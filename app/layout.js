import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-judul',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-teks',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'AvocAI – Klasifikasi Alpukat Otomatis',
    template: '%s | AvocAI',
  },
  description: 'Platform klasifikasi kematangan alpukat berbasis AI yang membantu petani dan bisnis agritech meningkatkan efisiensi panen dan distribusi.',
  keywords: ['alpukat', 'klasifikasi', 'AI', 'agritech', 'machine learning'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}