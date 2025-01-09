import { Badge } from "@/components/ui/badge";

interface Theme {
  colors: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  typography: Record<string, string>;
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
  borderWidth: Record<string, number>;
}

interface DesignSystemSectionProps {
  theme: Theme;
}

export function DesignSystemSection({ theme }: DesignSystemSectionProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 gap-6">
      {/* Colors Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Colors</h2>
        <div className="space-y-4">
          {Object.entries(theme.colors.light).map(([key]) => (
            <div key={key} className="flex flex-col gap-2">
              <span className="font-medium">{key}</span>
              <div className="flex gap-4">
                {/* Light Mode Color */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ backgroundColor: theme.colors.light[key] }}
                  />
                  <div className="flex flex-col">
                    <Badge variant="outline">Light</Badge>
                    <span className="text-sm text-muted-foreground">
                      {theme.colors.light[key]}
                    </span>
                  </div>
                </div>
                {/* Dark Mode Color */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ backgroundColor: theme.colors.dark[key] }}
                  />
                  <div className="flex flex-col">
                    <Badge variant="outline">Dark</Badge>
                    <span className="text-sm text-muted-foreground">
                      {theme.colors.dark[key]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Typography</h2>
        <div className="space-y-4">
          {Object.entries(theme.typography).map(([key, value]) => {
            // Skip lineHeight entries for now (handled separately)
            if (key.startsWith("lineHeight") || key.startsWith("fontWeight"))
              return null;

            return (
              <div key={key} className="flex flex-col gap-2">
                <span className="font-medium">{key}</span>
                <span
                  style={{
                    fontFamily:
                      key === "sans" || key === "heading" ? value : "inherit",
                    fontSize:
                      key === "fontSize" ? value : theme.typography.fontSize,
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                </span>
                <span className="text-sm text-muted-foreground">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-4">Font Weight</h2>
        <div className="space-y-4">
          {Object.entries(theme.typography)
            .filter(([key]) => key.startsWith("fontWeight"))
            .map(([key, value]) => {
              const name = key.replace("fontWeight_", ""); // Remove "fontWeight_" prefix
              return (
                <div key={key} className="flex flex-col gap-2">
                  <span className="font-medium">{name}</span>
                  <div className="flex items-center gap-4">
                    {/* Text with applied font weight */}
                    <span
                      style={{
                        fontFamily: theme.typography.sans,
                        fontSize: theme.typography.fontSize,
                        fontWeight: value,
                      }}
                    >
                      The quick brown fox jumps over the lazy dog.
                    </span>
                    {/* Font weight value */}
                    <span className="text-sm text-muted-foreground">
                      {value}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* Line Height Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Line Height</h2>
        <div className="space-y-6">
          {Object.entries(theme.typography)
            .filter(([key]) => key.startsWith("lineHeight"))
            .map(([key, value]) => {
              const name = key.replace("lineHeight_", "");
              return (
                <div key={key} className="flex flex-col gap-2">
                  <span className="font-medium">{name}</span>
                  <div className="flex items-stretch gap-2">
                    <div>
                      <span
                        className="z-10 block"
                        style={{
                          fontFamily: theme.typography.sans,

                          lineHeight: value,
                          textDecoration: "underline",
                          textDecorationColor: "#bdc3c7",
                        }}
                      >
                        The quick brown fox jumps over the lazy dog.
                      </span>
                      <div className="flex">
                        <span
                          //   className="z-10 block border-r-2 border-green-700 pe-1"
                          style={{
                            fontFamily: theme.typography.sans,
                            lineHeight: value,
                            textDecoration: "underline",
                            textDecorationColor: "#bdc3c7",
                            // backgroundColor: "#f1c40f",
                          }}
                        >
                          The quick brown fox jumps over the lazy dog.
                        </span>
                        <div className="bg-green-300 w-[1px]"></div>
                      </div>
                    </div>
                    <div className="flex px-2 items-end">
                      <span
                        style={{
                          fontFamily: theme.typography.sans,
                          lineHeight: value,
                        }}
                      >
                        {value}px
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Spacing Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Spacing</h2>
        <div className="space-y-4">
          {Object.entries(theme.spacing).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2">
              <span className="font-medium">{key}</span>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-secondary rounded-lg border-r-[1px] border-[#2ecc7170]" />
                <div
                  style={{
                    width: value + "px",
                    height: "1px",
                    backgroundColor: "#2ecc7170",
                  }}
                />
                <div className="w-8 h-8 bg-secondary rounded-lg border-x-[1px] border-[#2ecc7170]" />
                <div
                  style={{
                    width: value + "px",
                    height: "1px",
                    backgroundColor: "#2ecc7170",
                  }}
                />
                <div className="w-8 h-8 bg-secondary rounded-lg border-l-[1px] border-[#2ecc7170]" />
              </div>
              <span className="text-sm text-muted-foreground">{value}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border Radius Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Border Radius</h2>
        <div className="space-y-4">
          {Object.entries(theme.borderRadius).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2">
              <span className="font-medium">{key}</span>
              <div
                className="w-20 h-20 bg-primary"
                style={{ borderRadius: `${value}px` }}
              />
              <span className="text-sm text-muted-foreground">{value}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border Width Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Border Width</h2>
        <div className="space-y-4">
          {Object.entries(theme.borderWidth).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2">
              <span className="font-medium">{key}</span>
              <div
                className="w-20 h-20 bg-card border"
                style={{ borderWidth: `${value}px` }}
              />
              <span className="text-sm text-muted-foreground">{value}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
