import { useState } from "react";
import { FileTree } from "./FileTree";
import { CodePreview } from "./CodePreview";

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

interface ThemeBuilderProps {
  theme: Theme;
  isDarkMode: boolean;
}

export default function ThemeBuilder({ theme, isDarkMode }: ThemeBuilderProps) {
  const [selectedFile, setSelectedFile] = useState("layout.tsx");

  const generateThemeProviderCode = (): Record<string, string> => {
    return {
      "ThemeContext.tsx": `import { createContext } from 'react';
  
  export const ThemeContext = createContext(null);`,
      "useTheme.tsx": `import { useContext } from 'react';
  import { ThemeContext } from './ThemeContext';
  
  export function useTheme() {
    return useContext(ThemeContext);
  }`,
      "ThemeProvider.tsx": `import { ThemeContext } from './ThemeContext';
  import { useState } from 'react';
  
  export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(${isDarkMode});
  
    const theme = {
      colors: ${JSON.stringify(theme.colors, null, 4)},
      typography: ${JSON.stringify(theme.typography, null, 4)},
      spacing: ${JSON.stringify(theme.spacing, null, 4)},
      borderRadius: ${JSON.stringify(theme.borderRadius, null, 4)},
    };
  
    const getCurrentColors = () => (isDarkMode ? theme.colors.dark : theme.colors.light);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    const value = {
      ...theme,
      colors: getCurrentColors(),
      isDarkMode,
      toggleDarkMode,
    };
  
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
  }`,
      "layout.tsx": 
`import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

export default function App() {
  const { isDarkMode, toggleDarkMode, colors, typography } = useTheme();

  return (
    <ThemeProvider>
      <div
        style={{
          backgroundColor: colors.background,
          color: colors.foreground,
          fontFamily: typography.fontFamily,
          fontSize: typography.fontSize,
          lineHeight: typography.lineHeight,
        }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Theme Builder</h1>
          <p className="mt-4">You are in {isDarkMode ? "Dark Mode" : "Light Mode"}</p>
          <button
            onClick={toggleDarkMode}
            style={{
              backgroundColor: colors.primary,
              color: colors.cardForeground,
            }}
            className="px-4 py-2 mt-4 rounded"
          >
            Toggle Mode
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}`,
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
                name: "app",
                type: "folder",
                children: [
                  {
                    name: "ThemeProvider",
                    type: "folder",
                    children: [
                      { name: "ThemeContext.tsx", type: "file" },
                      { name: "useTheme.tsx", type: "file" },
                      { name: "ThemeProvider.tsx", type: "file" },
                    ],
                  },
                  { name: "layout.tsx", type: "file" },
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
        code={filesContent[selectedFile]} />
      </div>
    </div>
  );
}
