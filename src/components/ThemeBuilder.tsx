import { useState } from "react";
import { FileTree } from "./FileTree";
import { CodePreview } from "./CodePreview";
import Theme from "@/types/Theme";

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
      fontSize: {
        sm: "${theme.typography.fontSize.sm}px",
        md: "${theme.typography.fontSize.md}px",
        lg: "${theme.typography.fontSize.lg}px",
        xl: "${theme.typography.fontSize.xl}px",
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
      "README.md": `# Tailwind CSS Configuration Guide

This guide explains how to use the custom Tailwind CSS configuration in your project. It includes custom colors, fonts, spacing, border radius, and border width, with support for light and dark modes.

---

## Colors

### Background
- Light: <::>bg-background-light<::>
- Dark: <::>dark:bg-background-dark<::>

### Foreground (Text)
- Light: <::>text-foreground-light<::>
- Dark: <::>dark:text-foreground-dark<::>

### Primary
- Light: <::>bg-primary-light<::>, <::>text-primary-light<::>
- Dark: <::>dark:bg-primary-dark<::>, <::>dark:text-primary-dark<::>

### Secondary
- Light: <::>bg-secondary-light<::>, <::>text-secondary-light<::>
- Dark: <::>dark:bg-secondary-dark<::>, <::>dark:text-secondary-dark<::>

### Accent
- Light: <::>bg-accent-light<::>, <::>text-accent-light<::>
- Dark: <::>dark:bg-accent-dark<::>, <::>dark:text-accent-dark<::>

### Muted
- Light: <::>bg-muted-light<::>, <::>text-muted-light<::>
- Dark: <::>dark:bg-muted-dark<::>, <::>dark:text-muted-dark<::>

### Card
- Light: <::>bg-card-light<::>, <::>text-card-light<::>
- Dark: <::>dark:bg-card-dark<::>, <::>dark:text-card-dark<::>

### Card Foreground
- Light: <::>bg-cardForeground-light<::>, <::>text-cardForeground-light<::>
- Dark: <::>dark:bg-cardForeground-dark<::>, <::>dark:text-cardForeground-dark<::>

### Border
- Light: <::>border-border-light<::>
- Dark: <::>dark:border-border-dark<::>

---

## Fonts

### Font Family
- Sans: <::>font-sans<::>
- Heading: <::>font-heading<::>

### Font Size
- Small: <::>text-sm<::> (8px)
- Medium: <::>text-md<::> (12px)
- Large: <::>text-lg<::> (16px)
- Extra Large: <::>text-xl<::> (24px)

### Font Weight
- Light: <::>font-light<::> (300)
- Normal: <::>font-normal<::> (400)
- Semibold: <::>font-semibold<::> (600)
- Bold: <::>font-bold<::> (700)

### Line Height
- Normal: <::>leading-normal<::> (1.5)
- Relaxed: <::>leading-relaxed<::> (1.75)
- Tight: <::>leading-tight<::> (1.25)

---

## Spacing

### Padding and Margin
- Small: <::>p-sm<::>, <::>m-sm<::> (8px)
- Medium: <::>p-md<::>, <::>m-md<::> (16px)
- Large: <::>p-lg<::>, <::>m-lg<::> (24px)
- Extra Large: <::>p-xl<::>, <::>m-xl<::> (32px)
- 2X Large: <::>p-2xl<::>, <::>m-2xl<::> (40px)

### Gap
- Small: <::>gap-sm<::> (8px)
- Medium: <::>gap-md<::> (16px)
- Large: <::>gap-lg<::> (24px)
- Extra Large: <::>gap-xl<::> (32px)
- 2X Large: <::>gap-2xl<::> (40px)

---

## Border Radius

- Small: <::>rounded-sm<::> (4px)
- Medium: <::>rounded-md<::> (8px)
- Large: <::>rounded-lg<::> (16px)
- Extra Large: <::>rounded-xl<::> (24px)

---

## Border Width

- Small: <::>border-sm<::> (0.3px)
- Medium: <::>border-md<::> (0.5px)
- Large: <::>border-lg<::> (0.9px)
- Extra Large: <::>border-xl<::> (2.4px)

---

## Dark Mode

Enable dark mode by adding the <::>dark<::> class to your HTML element:

<::>html
<html class="dark">
  <!-- Your content -->
</html>
<::>

### Example Usage
<::>html
<div class="bg-background-light dark:bg-background-dark">
  <p class="text-foreground-light dark:text-foreground-dark">Hello, world!</p>
</div>
<::>

---

## Conclusion

Use the provided classes to apply custom styles in your project. Refer to the [Tailwind CSS documentation](https://tailwindcss.com/docs) for more details.`.replaceAll('<::>', '`'),
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
                  { name: "README.md", type: "file" },
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
