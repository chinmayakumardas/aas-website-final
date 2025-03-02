


import { ToastContainer } from "react-toastify";
import "./globals.css";
import '@mantine/tiptap/styles.css';
 
 
export const metadata = {
  title: "AAS Information Technology | Innovative IT Solutions",
  description: "AAS Information Technology delivers cutting-edge software solutions, web development, and IT consulting services tailored to drive business success.",
  keywords: "IT solutions, software development, web development, IT consulting, AAS Information Technology",
  author: "AAS Information Technology"
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true"
     
      ><ToastContainer position="top-right" autoClose={3000} hideProgressBar closeButton />
        {children}
      </body>
    </html>
  );
}


