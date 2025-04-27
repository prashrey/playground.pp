// app/layout.js
import "./globals.css";
import "./page.css";

import { GameProvider } from "@/context/GameContext";

export const metadata = {
  title: "Mine to Fly",
  description: "Dig your way to freedom!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
