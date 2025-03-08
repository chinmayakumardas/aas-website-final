import { ToastContainer } from "react-toastify";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import "./globals.css";
import '@mantine/tiptap/styles.css';
 
 
export const metadata = {
  title: "AAS Information Technology | Innovative IT Solutions",
  description: "AAS Information Technology delivers cutting-edge software solutions, web development, and IT consulting services tailored to drive business success.",
  keywords: "IT solutions, software development, web development, IT consulting, AAS Information Technology",
  author: "AAS Information Technology",
  icons: {
    icon: "/assets/favicon.ico", // Path to your favicon
  },
  
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <MantineProvider>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeButton />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
