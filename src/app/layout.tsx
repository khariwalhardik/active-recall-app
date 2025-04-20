// app/layout.tsx or app/layout.js
import './globals.css'
import { LearningProvider } from './context/LearningContext';
export const metadata = {
  title: 'Active Recall App',
  description: 'Practice active recall effectively!',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LearningProvider>
          {children}
        </LearningProvider>
      </body>
    </html>
  );
}
