import { Badge } from "@/components/ui/badge";
import Theme from "@/types/Theme";

interface DesignSystemSectionProps {
  theme: Theme;
}

export function DesignSystemSection({ theme }: DesignSystemSectionProps) {
  const headingStyle = { fontFamily: theme.typography.heading };
  return (
    <div
      className="flex flex-col h-full overflow-y-auto p-4 gap-6"
      style={{
        fontFamily: theme.typography.sans,
      }}
    >
      {/* Colors Section */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>
          Colors
        </h2>
        <div className="p-4 pb-0">
          {Object.entries(theme.colors.light).map(([key]) => (
            <div key={key} className="flex flex-col gap-2 mb-4">
              <span className="font-medium capitalize">{key}</span>
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
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>
          Typography
        </h2>
        <div className="p-4 pb-0">
          {Object.entries({
            heading: theme.typography.heading,
            sans: theme.typography.sans,
          }).map(([key, value]) => {
            return (
              <div
                key={key}
                className="flex flex-col gap-2 m-6"
                style={{ fontFamily: value }}
              >
                <span className="font-medium">Font Family of {key}</span>
                <span
                  style={{
                    fontSize:
                      theme.typography.fontSize[
                        key === "heading" ? "xl" : "lg"
                      ] + "px",
                  }}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>
          Font Size
        </h2>
        <div className="p-4">
          {Object.entries(theme.typography.fontSize).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium capitalize">{key}</span>
                <span className="text-sm">{value}px</span>
              </div>
              <div className="pb-5">
                <span
                  style={{
                    fontFamily: theme.typography.sans,
                    fontSize: value + "px",
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>
          Font Weight
        </h2>
        <div className="p-4">
          {Object.entries(theme.typography)
            .filter(([key]) => key.startsWith("fontWeight"))
            .map(([key, value]) => {
              const name = key.replace("fontWeight_", ""); // Remove "fontWeight_" prefix
              return (
                <div key={key} className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-medium capitalize">
                      {name}
                    </span>
                    <span className="text-sm">{value}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Text with applied font weight */}
                    <span
                      style={{
                        fontFamily: theme.typography.sans,
                        // fontSize: theme.typography.fontSize,
                        fontWeight: value,
                      }}
                    >
                      The quick brown fox jumps over the lazy dog.
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* Line Height Section */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>
          Line Height
        </h2>
        <div className="p-4 pb-0">
          {Object.entries(theme.typography)
            .filter(([key]) => key.startsWith("lineHeight"))
            .map(([key, value]) => {
              const name = key.replace("lineHeight_", "");
              return (
                <div key={key} className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-medium capitalize">
                      {name}
                    </span>
                    <span className="text-sm">{value}</span>
                  </div>
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
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Spacing Section */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>
          Spacing
        </h2>
        <div className="p-4 pb-0">
          {Object.entries(theme.spacing).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2 m-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium capitalize">{key}</span>
                <span className="text-sm">{value}px</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-secondary rounded-lg border-r-[1px] border-[#2ecc7170] border-dashed" />
                <div
                  style={{
                    width: value + "px",
                    height: "1px",
                    backgroundColor: "#2ecc7170",
                  }}
                />
                <div className="w-8 h-8 bg-secondary rounded-lg border-x-[1px] border-[#2ecc7170] border-dashed" />
                <div
                  style={{
                    width: value + "px",
                    height: "1px",
                    backgroundColor: "#2ecc7170",
                  }}
                />
                <div className="w-8 h-8 bg-secondary rounded-lg border-l-[1px] border-[#2ecc7170] border-dashed" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Border Radius Section */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>
          Border Radius
        </h2>
        <div className="p-4 pb-0">
          {Object.entries(theme.borderRadius).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium capitalize">{key}</span>
                <span className="text-sm">{value}px</span>
              </div>
              <div
                className="w-20 h-20 border-dashed"
                style={{
                  borderRadius: `${value}px`,
                  borderWidth: `${theme.borderWidth.md}px`,
                  borderColor: theme.colors.light.secondary,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Border Width Section */}
      <div>
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>
          Border Width
        </h2>
        <div className="p-4 pb-0">
          {Object.entries(theme.borderWidth).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium capitalize">{key}</span>
                <span className="text-sm">{value}px</span>
              </div>
              <div
                className="w-20 h-20 bg-card border"
                style={{
                  borderWidth: `${value}px`,
                  borderColor: theme.colors.light.border,
                  borderRadius: theme.borderRadius.lg,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
