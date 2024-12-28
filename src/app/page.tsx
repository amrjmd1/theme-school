"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "./components/ColorPicker";
import { Typography } from "./components/Typography";
import { Spacing } from "./components/Spacing";
import { BorderRadius } from "./components/BorderRadius";
import { LivePreview } from "./components/LivePreview";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Code, Eye } from "lucide-react";
import Footer from "./components/Footer";
import ThemeBuilder from "./components/ThemeBuilder";

interface Theme {
  colors: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  };
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
}

export default function ThemeBuilderx() {
  const [theme, setTheme] = useState<Theme>({
    colors: {
      light: {
        background: "#F4F4F5", // Neutral soft background
        foreground: "#1A202C", // Rich dark for primary text
        primary: "#2563EB", // Vibrant professional blue for actions
        secondary: "#4F46E5", // Deep purple for emphasis
        accent: "#D97706", // Warm gold for highlights
        muted: "#9CA3AF", // Neutral muted gray
        card: "#FFFFFF", // Clean white for cards
        cardForeground: "#2D3748", // Soft dark text on cards
        border: "#E2E8F0", // Subtle light border
      },
      dark: {
        background: "#121212", // Near-black for modern dark UI
        foreground: "#E2E8F0", // Soft light for text
        primary: "#3B82F6", // Bright blue for contrast in dark mode
        secondary: "#7C3AED", // Purple for depth and elegance
        accent: "#FBBF24", // Golden amber for highlights
        muted: "#6B7280", // Soft muted gray
        card: "#1E293B", // Dark slate for card backgrounds
        cardForeground: "#F8FAFC", // Light text for card content
        border: "#374151", // Subtle dark border
      },
    },
    typography: {
      fontFamily: "SF Pro, sans-serif",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    spacing: {
      small: 0.5,
      medium: 1,
      large: 2,
    },
    borderRadius: {
      small: 0.25,
      medium: 0.5,
      large: 1,
    },
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const updateTheme = (
    section: string,
    mode: "light" | "dark" | undefined,
    key: string,
    value: string | number
  ) => {
    setTheme((prevTheme) => {
      if (section === "colors" && mode) {
        // Updating colors with mode
        return {
          ...prevTheme,
          colors: {
            ...prevTheme.colors,
            [mode]: {
              ...prevTheme.colors[mode],
              [key]: value,
            },
          },
        };
      } else if (section !== "colors") {
        // Updating other sections
        return {
          ...prevTheme,
          [section]: {
            ...prevTheme[section as keyof Theme],
            [key]: value,
          },
        };
      }
      return prevTheme; // No changes
    });
  };

  return (
    <div className={`min-h-screen p-8 bg-gray-100 text-black`}>
      <h1 className="text-3xl font-bold text-center mb-8">
        Next.js Theme Builder
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-8">
        <Card className="h-[calc(100vh-12rem)] overflow-hidden">
          <ScrollArea className="h-full">
            <CardContent className="p-6 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Colors</h2>
                <ColorPicker colors={theme.colors} updateTheme={updateTheme} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Typography</h2>
                <Typography
                  typography={theme.typography}
                  updateTheme={updateTheme}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Spacing</h2>
                <Spacing spacing={theme.spacing} updateTheme={updateTheme} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Border Radius</h2>
                <BorderRadius
                  borderRadius={theme.borderRadius}
                  updateTheme={updateTheme}
                />
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
        <Tabs defaultValue="preview">
          <div className="flex items-center space-x-2 justify-between">
            <TabsList className="g">
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 me-2" /> Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code className="h-4 w-4 me-2" /> Code
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="preview" className="mt-4">
            <Card className="h-[calc(100vh-15rem)] overflow-hidden">
              {/* <ScrollArea className="h-full"> */}
                <CardContent className="p-0 h-full">
                  <LivePreview
                    theme={theme}
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={setIsDarkMode}
                  />
                </CardContent>
              {/* </ScrollArea> */}
            </Card>
          </TabsContent>
          <TabsContent value="code" className="mt-4">
            {/* <CodePreview theme={theme} isDarkMode={isDarkMode} /> */}
            <Card className="h-[calc(100vh-15rem)] overflow-hidden">
              {/* <CodePreview theme={theme} isDarkMode={isDarkMode} /> */}
              <ThemeBuilder theme={theme} isDarkMode={isDarkMode} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
