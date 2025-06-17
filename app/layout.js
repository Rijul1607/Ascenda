// import { Inter} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/next';

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ascenda",
  description: "AI CAREER GENARATOR",
  icons:{
    icon:[
      {
        url:'ResumX.png',
        
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme:[ shadesOfPurple]}}>
    <html lang="en" suppressHydrationWarning>
    <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
             <Header/>
            <main className="min-h-screen">{children}</main>
            <Toaster richColors/>
            

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with Rijul <a
  href="https://github.com/Rijul1607"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block text-black-800 hover:text-gray-600"
  style={{ width: '24px', height: '24px' }}
  aria-label="GitHub"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-full h-full mt-1 ml-1"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.26 1.87 1.26 1.08 1.86 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.49 11.49 0 016 0c2.3-1.55 3.31-1.23 3.31-1.23.66 1.65.24 2.87.12 3.17.77.85 1.24 1.93 1.24 3.25 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.69.83.57A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
</a> </p>
              </div>
            </footer>
          </ThemeProvider>
          <Analytics />
        
      </body>
    </html>
    </ClerkProvider>
  );
}
