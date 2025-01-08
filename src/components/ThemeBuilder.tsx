import { useState } from "react";
import { FileTree } from "./FileTree";
import { CodePreview } from "./CodePreview";

interface Theme {
  colors: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  typography: {
    sans: string;
    heading: string;
    fontSize: string;
    fontWeight_light: string;
    fontWeight_normal: string;
    fontWeight_semibold: string;
    fontWeight_bold: string;
    lineHeight_normal: string;
    lineHeight_relaxed: string;
    lineHeight_tight: string;
  };
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
  borderWidth: Record<string, number>;
}

interface ThemeBuilderProps {
  theme: Theme;
}

export default function ThemeBuilder({ theme }: ThemeBuilderProps) {
  const [selectedFile, setSelectedFile] = useState("tailwind.config.ts");

  const generateThemeProviderCode = (): Record<string, string> => {
    return {
      "tailwind.config.ts": `module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      background:{
        light: "${theme.colors.light.background}",
        dark: "${theme.colors.dark.background}",
      },
      foreground:{
        light: "${theme.colors.light.foreground}", 
        dark: "${theme.colors.dark.foreground}"
      },
      primary:{
        light: "${theme.colors.light.primary}",
        dark: "${theme.colors.dark.primary}"
      },
      secondary:{
        light: "${theme.colors.light.secondary}",
        dark: "${theme.colors.dark.secondary}"
      },
      accent:{
        light: "${theme.colors.light.accent}",
        dark: "${theme.colors.dark.accent}"
      },
      muted:{
        light: "${theme.colors.light.muted}",
        dark: "${theme.colors.dark.muted}"
      },
      card:{
        light: "${theme.colors.light.card}",
        dark: "${theme.colors.dark.card}"
      },
      cardForeground:{
        light: "${theme.colors.light.cardForeground}",
        dark: "${theme.colors.dark.cardForeground}"
      },
      border:{
        light: "${theme.colors.light.border}",
        dark: "${theme.colors.dark.border}"
      }
      },
      fontFamily: {
        sans: ["${theme.typography.sans}", "sans-serif"],
        heading: ["${theme.typography.heading}", "sans-serif"],
      },
      fontWeight: {
        light: ${theme.typography.fontWeight_light},
        normal: ${theme.typography.fontWeight_normal},
        semibold: ${theme.typography.fontWeight_semibold},
        bold: ${theme.typography.fontWeight_bold},
      },
      lineHeight: {
        normal: "${theme.typography.lineHeight_normal}",
        relaxed: "${theme.typography.lineHeight_relaxed}",
        tight: "${theme.typography.lineHeight_tight}",
      },
      spacing: {
        sm: "${theme.spacing.sm}px",
        md: "${theme.spacing.md}px",
        lg: "${theme.spacing.lg}px",
        xl: "${theme.spacing.xl}px",
        "2xl": "${theme.spacing["2xl"]}px",
      },
      borderRadius: {
        sm: "${theme.borderRadius.sm}px",
        md: "${theme.borderRadius.md}px",
        lg: "${theme.borderRadius.lg}px",
        xl: "${theme.borderRadius.xl}px",
      },
      borderWidth: {
        sm: "${theme.borderWidth.sm}px",
        md: "${theme.borderWidth.md}px",
        lg: "${theme.borderWidth.lg}px",
        xl: "${theme.borderWidth.xl}px",
      },
    },
  },
  plugins: [],
};`,
      "page.tsx": `import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <ThemeToggle />
    </div>
  );
}`,
      "layout.tsx": `import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata = {
  title: 'Next.js Theme Toggle',
  description: 'A theme toggle implementation for Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}`,
      "globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
      "ThemeToggle.tsx": `"use client";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeToggle must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border dark:border-dark-border border-light-border dark:text-dark-foreground text-light-foreground px-lg py-md"
    >
      {theme === "light" && "Light Mode"}
      {theme === "dark" && "Dark Mode"}
      {theme === "system" && "System Mode"}
    </button>
  );
};

export default ThemeToggle;
`,
      "ThemeContext.tsx": `'use client';

import React, { createContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with the saved theme or system preference
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && savedTheme !== 'system') return savedTheme;

    // Detect system preference for 'system' mode
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isSystemDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const applyTheme = (currentTheme: Theme) => {
    const root = document.documentElement;
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (currentTheme === 'dark' || (currentTheme === 'system' && isSystemDark)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (theme === 'system') {
      const systemThemeChangeListener = () => {
        applyTheme('system');
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', systemThemeChangeListener);

      // Cleanup listener on unmount
      return () => {
        mediaQuery.removeEventListener('change', systemThemeChangeListener);
      };
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};`,
    };
  };

  const filesContent = generateThemeProviderCode();

  return (
    <div className="flex bg-[#1e272e]">
      <aside className="w-1/5 p-4 border-r border-gray-900">
        <div>
          <FileTree
            files={[
              {
                name: "Your App",
                type: "folder",
                children: [
                  {
                    name: "src",
                    type: "folder",
                    children: [
                      {
                        name: "app",
                        type: "folder",
                        children: [
                          { name: "globals.css", type: "file" },
                          { name: "layout.tsx", type: "file" },
                          { name: "page.tsx", type: "file" },
                        ],
                      },
                      {
                        name: "components",
                        type: "folder",
                        children: [{ name: "ThemeToggle.tsx", type: "file" }],
                      },
                      {
                        name: "context",
                        type: "folder",
                        children: [{ name: "ThemeContext.tsx", type: "file" }],
                      },
                    ],
                  },
                  { name: "tailwind.config.ts", type: "file" },
                ],
              },
            ]}
            onSelect={setSelectedFile}
          />
        </div>
      </aside>
      <div className="w-4/5 p-0 m-0 h-[calc(100vh-12rem)]">
        <CodePreview
          fileName={selectedFile}
          code={filesContent[selectedFile]}
        />
      </div>
    </div>
  );
}
