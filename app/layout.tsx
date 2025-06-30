import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import '@arco-design/web-react/dist/css/arco.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "陈平安的网站",
  description: "我叫陈平安，唯有一剑，可搬山，倒海，降妖，镇魔，敕神，摘星，断江，摧城，开天！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} flex flex-col min-h-screen text-white`}>
        {/* 背景图轮播 */}
        <div className="bg-image"></div>
        <div className="bg-image"></div>
        <div className="bg-image"></div>
        <div className="bg-image"></div>
        <div className="bg-image"></div>
        
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8 z-10 relative">
          <div className="pt-20">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
