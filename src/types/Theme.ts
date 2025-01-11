export interface Typography {
  sans: string;
  heading: string;
  fontSize: Record<string, number>;
  fontWeight_light: string;
  fontWeight_normal: string;
  fontWeight_semibold: string;
  fontWeight_bold: string;
  lineHeight_normal: string;
  lineHeight_relaxed: string;
  lineHeight_tight: string;
}

export interface Colors {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export default interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
  borderWidth: Record<string, number>;
}
