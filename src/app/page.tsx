"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "@/components/ColorPicker";
import { Typography } from "@/components/Typography";
import { Spacing } from "@/components/Spacing";
import { BorderRadius } from "@/components/BorderRadius";
import { LivePreview } from "@/components/LivePreview";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Code, Eye } from "lucide-react";
import Footer from "@/components/Footer";
import ThemeBuilder from "@/components/ThemeBuilder";
import Header from "@/components/Header";
import { BorderWidth } from "@/components/borderWidth";

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

export default function ThemeBuilderx() {
  const [theme, setTheme] = useState<Theme>({
    colors: {
      light: {
        background: "#F4F4F5",
        foreground: "#1A202C",
        primary: "#2563EB",
        secondary: "#4F46E5",
        accent: "#D97706",
        muted: "#9CA3AF",
        card: "#FFFFFF",
        cardForeground: "#2D3748",
        border: "#E2E8F0",
      },
      dark: {
        background: "#121212",
        foreground: "#E2E8F0",
        primary: "#3B82F6",
        secondary: "#7C3AED",
        accent: "#FBBF24",
        muted: "#6B7280",
        card: "#1E293B",
        cardForeground: "#F8FAFC",
        border: "#374151",
      },
    },
    typography: {
      sans: "SF Pro",
      heading: "Georgia",
      fontSize: "16px",
      fontWeight_light: "300",
      fontWeight_normal: "400",
      fontWeight_semibold: "600",
      fontWeight_bold: "700",
      lineHeight_normal: "1.5",
      lineHeight_relaxed: "1.75",
      lineHeight_tight: "1.25",
    },
    spacing: {
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      "2xl": 40,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
    },
    borderWidth: {
      sm: 0.3,
      md: 0.5,
      lg: 0.9,
      xl: 2.4,
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
    <div className={`min-h-screen  bg-gray-100 text-black`}>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-8 p-8">
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
              <div>
                <h2 className="text-2xl font-bold mb-4">Border Width</h2>
                <BorderWidth
                  borderWidth={theme.borderWidth}
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
              <CardContent className="p-0 h-full">
                <LivePreview
                  theme={theme}
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={setIsDarkMode}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code" className="mt-4">
            <Card className="h-[calc(100vh-15rem)] overflow-hidden">
              <ThemeBuilder theme={theme} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
