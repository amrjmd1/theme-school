import Theme from "@/types/Theme";
import FileNode from "@/types/FileNode";

export const reactnativeFileTree: FileNode[] = [
  {
    name: "reactnative_app",
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
              { name: "App.tsx", type: "file" },
              { name: "HomeScreen.tsx", type: "file" },
            ],
          },
          {
            name: "components",
            type: "folder",
            children: [
              { name: "ThemeToggle.tsx", type: "file" },
              { name: "ThemedButton.tsx", type: "file" },
            ],
          },
          {
            name: "context",
            type: "folder",
            children: [{ name: "ThemeContext.tsx", type: "file" }],
          },
          {
            name: "types",
            type: "folder",
            children: [{ name: "theme.ts", type: "file" }],
          },
        ],
      },
      { name: "README.md", type: "file" },
    ],
  },
];

export const reactnativeCode = (theme: Theme): Record<string, string> => {
  return {
    "theme.ts": `export interface Colors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  card: string;
  cardForeground: string;
  border: string;
}

export interface Typography {
  heading: string;
  sans: string;
  fontSize: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontWeight: {
  light: string;
  normal: string;
  semibold: string;
  bold: string;
  };
  lineHeight: {
  normal: number;
  relaxed: number;
  tight: number;
  };
}

export interface Spacing {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface BorderWidth {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  borderWidth: BorderWidth;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}`,
    "ThemeContext.tsx": `import React, { createContext, useState, ReactNode } from 'react';
import { Theme, Colors } from '../types/theme';

const themeConfig: Theme = {
  colors: {
    light: {
      background: "${theme.colors.light.background}",
      foreground: "${theme.colors.light.foreground}",
      primary: "${theme.colors.light.primary}",
      secondary: "${theme.colors.light.secondary}",
      accent: "${theme.colors.light.accent}",
      muted: "${theme.colors.light.muted}",
      card: "${theme.colors.light.card}",
      cardForeground: "${theme.colors.light.cardForeground}",
      border: "${theme.colors.light.border}",
    },
    dark: {
      background: "${theme.colors.dark.background}",
      foreground: "${theme.colors.dark.foreground}",
      primary: "${theme.colors.dark.primary}",
      secondary: "${theme.colors.dark.secondary}",
      accent: "${theme.colors.dark.accent}",
      muted: "${theme.colors.dark.muted}",
      card: "${theme.colors.dark.card}",
      cardForeground: "${theme.colors.dark.cardForeground}",
      border: "${theme.colors.dark.border}",
    },
  },
  typography: {
    heading: "${theme.typography.heading}",
    sans: "${theme.typography.sans}",
    fontSize: {
      sm: ${theme.typography.fontSize.sm},
      md: ${theme.typography.fontSize.md}, 
      lg: ${theme.typography.fontSize.lg},
      xl: ${theme.typography.fontSize.xl},
    },
    fontWeight: {
    light: "${theme.typography.fontWeight_light}",
    normal: "${theme.typography.fontWeight_normal}",
    semibold: "${theme.typography.fontWeight_semibold}",
    bold: "${theme.typography.fontWeight_bold}",
    },
    lineHeight: {
    normal: ${theme.typography.lineHeight_normal},
    relaxed: ${theme.typography.lineHeight_relaxed},
    tight: ${theme.typography.lineHeight_tight},
    },
  },
  spacing: {
    sm: ${theme.spacing.sm},
    md: ${theme.spacing.md},
    lg: ${theme.spacing.lg},
    xl: ${theme.spacing.xl},
    "2xl": ${theme.spacing["2xl"]},
  },
  borderRadius: {
    sm: ${theme.borderRadius.sm},
    md: ${theme.borderRadius.md},
    lg: ${theme.borderRadius.lg},
    xl: ${theme.borderRadius.xl},
  },
  borderWidth: {
    sm: ${theme.borderWidth.sm},
    md: ${theme.borderWidth.md},
    lg: ${theme.borderWidth.lg},
    xl: ${theme.borderWidth.xl},
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme: Theme = {
    ...themeConfig,
    colors: isDarkMode ? themeConfig.colors.dark : themeConfig.colors.light,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};`,
    "App.tsx": `import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import HomeScreen from './HomeScreen';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;`,
    "HomeScreen.tsx": `// src/app/HomeScreen.tsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import ThemedButton from '../components/ThemedButton';

const HomeScreen: React.FC = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    return null; // Handle case where theme is not available
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    },
    text: {
      color: theme.colors.foreground,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, Themed World!</Text>
      <ThemeToggle />
      <ThemedButton title="Click Me" onPress={() => alert('Button Pressed!')} />
    </View>
  );
};

export default HomeScreen;`,
    "ThemeToggle.tsx": `// src/components/ThemeToggle.tsx
import React, { useContext } from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    return null; // Handle case where theme is not available
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    text: {
      color: theme.colors.foreground,
      marginRight: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dark Mode</Text>
      <Switch
        value={theme.isDarkMode}
        onValueChange={theme.toggleTheme}
        thumbColor={theme.colors.primary}
        trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
      />
    </View>
  );
};

export default ThemeToggle;`,
    "ThemedButton.tsx": `// src/components/ThemedButton.tsx
import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress }) => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    return null; // Handle case where theme is not available
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme.colors.card,
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;`,
  };
};
