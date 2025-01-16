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
import { Code, Frame, Laptop, Smartphone } from "lucide-react";
import Footer from "@/components/Footer";
import ThemeBuilder from "@/components/ThemeBuilder";
import Header from "@/components/Header";
import { BorderWidth } from "@/components/borderWidth";
import { DesignSystemSection } from "@/components/DesignSystemPreview";
import Theme from "@/types/Theme";
import MobileReview from "@/components/MobileReview";

export default function ThemeBuilderx() {
  const [theme, setTheme] = useState<Theme>({
    colors: {
      light: {
        background: "#F0F2F5", // Facebook's light background
        foreground: "#1C1E21", // Facebook's dark text color
        primary: "#1877F2", // Facebook's primary blue
        secondary: "#42B72A", // Facebook's green (used for buttons like "Create Post")
        accent: "#F0F2F5", // Light gray for accents
        muted: "#606770", // Muted text color
        card: "#FFFFFF", // White for cards
        cardForeground: "#1C1E21", // Dark text for cards
        border: "#DDDFE2", // Light gray for borders
      },
      dark: {
        background: "#18191A", // Facebook's dark background
        foreground: "#E4E6EB", // Light text for dark mode
        primary: "#1877F2", // Same primary blue
        secondary: "#42B72A", // Same green
        accent: "#242526", // Dark gray for accents
        muted: "#B0B3B8", // Muted text in dark mode
        card: "#242526", // Dark gray for cards
        cardForeground: "#E4E6EB", // Light text for cards
        border: "#3A3B3C", // Darker gray for borders
      },
    },
    typography: {
      heading: "Helvetica",
      sans: "Helvetica",
      fontSize: { sm: 8, md: 12, lg: 16, xl: 24 },
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
  const [activeTab, setActiveTab] = useState("DesignSystem");

  const updateTheme = (
    section: string,
    mode: "light" | "dark" | undefined,
    key: string,
    value: string | number,
    deepKey?: string
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
        if (key === "fontSize")
          return {
            ...prevTheme,
            [section]: {
              ...prevTheme[section as keyof Theme],
              fontSize: {
                ...prevTheme.typography.fontSize,
                [deepKey || ""]: value,
              },
            },
          };
        return {
          ...prevTheme,
          [section]: {
            ...prevTheme[section as keyof Theme],
            [key]: value,
          },
        };
      }
      return prevTheme;
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
        <Tabs defaultValue="DesignSystem" onValueChange={setActiveTab}>
          <div className="flex items-center space-x-2 justify-between">
            <TabsList className="g">
              {[
                { value: "DesignSystem", name: "Design System", icon: Frame },
                { value: "web_preview", name: "Web Preview", icon: Laptop },
                {
                  value: "mo_preview",
                  name: "Mobile Preview",
                  icon: Smartphone,
                },
                { value: "code", name: "Code", icon: Code },
              ].map((tab) => (
                <TabsTrigger value={tab.value} key={tab.name}>
                  <tab.icon className="h-4 w-4" />
                  {tab.value === activeTab && (
                    <span className="ms-2">{tab.name}</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value="DesignSystem" className="mt-4">
            <Card className="h-[calc(100vh-15rem)] overflow-hidden">
              <CardContent className="p-0 h-full">
                <DesignSystemSection theme={theme} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="web_preview" className="mt-4">
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
          <TabsContent value="mo_preview" className="mt-4">
            <Card className="h-[calc(100vh-15rem)] overflow-hidden bg-transparent border-none shadow-none">
              <CardContent className="p-0 h-full">
                <MobileReview theme={theme} />
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
