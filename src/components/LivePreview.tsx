import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Sun,
  Moon,
  Plus,
  AlertCircleIcon,
  Gauge,
  ChartScatter,
  Users,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Theme from "@/types/Theme";

interface LivePreviewProps {
  theme: Theme;
  isDarkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
}

export function LivePreview({
  theme,
  isDarkMode,
  onToggleDarkMode,
}: LivePreviewProps) {
  const { typography, spacing, borderRadius, borderWidth } = theme;
  const colors = isDarkMode ? theme.colors.dark : theme.colors.light;

  const containerStyle = {
    backgroundColor: colors.background,
    color: colors.foreground,
    fontFamily: typography.sans,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight_normal,
    lineHeight: typography.lineHeight_normal,
  };

  const navbarStyle = {
    backgroundColor: colors.card,
    color: colors.foreground,
    padding: `${spacing.sm}px ${spacing.lg}px`,
    borderBottom: `${borderWidth.md}px solid ${colors.border}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: typography.heading,
  };

  const sidebarStyle = {
    backgroundColor: colors.card,
    color: colors.foreground,
    borderRight: `${borderWidth.md}px solid ${colors.border}`,
    width: "16rem",
    height: "100%",
  };

  const cardStyle = {
    backgroundColor: colors.card,
    color: colors.cardForeground,
    borderColor: colors.border,
    borderWidth: `${borderWidth.lg}px`,
    borderRadius: `${borderRadius.md}px`,
    padding: `${spacing.sm}px`,
    boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
  };

  const buttonStyle = {
    margin: 0,
    backgroundColor: colors.primary,
    border: "none",
    color: colors.background,
    borderRadius: `${borderRadius.sm}px`,
    padding: `${spacing.sm}px ${spacing.lg}px`,
    display: "flex",
    alignItems: "center",
    gap: spacing.sm + "px",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
  };

  const hoverStyle = {
    backgroundColor: colors.secondary,
    transform: "translateY(-1px)",
    boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)`,
  };

  return (
    <div style={containerStyle} className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <aside
        style={sidebarStyle}
        className="flex flex-col space-y-4 justify-between"
      >
        <div>
          <h2
            style={{
              color: colors.primary,
              fontWeight: typography.fontWeight_bold,
              textAlign: "center",
              padding: `${spacing.md}px`,
              fontFamily: typography.heading,
              fontSize: typography.fontSize.lg,
            }}
          >
            LOGO
          </h2>

          <nav
            style={{
              padding: `${spacing["2xl"]}px 0`,
            }}
          >
            {[
              { icon: Gauge, text: "Overview", isActive: true },
              { icon: ChartScatter, text: "Analytics" },
              { icon: Users, text: "Users" },
              { icon: User, text: "Profile" },
              { icon: Settings, text: "Settings" },
            ].map((item, index) => (
              <div
                key={index}
                className="w-full flex items-center hover:opacity-55"
                style={{
                  padding: `${spacing.sm}px ${spacing.lg}px`,
                  borderRight: `${item.isActive ? borderWidth.xl : 0}px solid ${
                    colors.accent
                  }`,
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <item.icon
                  size={18}
                  color={colors[item.isActive ? "primary" : "muted"]}
                />
                <span
                  style={{
                    marginLeft: spacing.lg + "px",
                    color: colors[item.isActive ? "primary" : "muted"],
                    fontWeight:
                      typography[
                        `fontWeight_${item.isActive ? "bold" : "normal"}`
                      ],
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </nav>
        </div>
        <div style={{ padding: `${spacing["2xl"]}px 0` }}>
          <div
            className="w-full flex items-center hover:opacity-55"
            style={{
              padding: `${spacing.sm}px ${spacing.lg}px`,
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            <LogOut size={18} color={colors.muted} />
            <span
              style={{
                marginLeft: spacing.lg + "px",
                color: colors.muted,
                fontWeight: typography.fontWeight_normal,
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col relative">
        {/* Floating Alert Icon */}
        <div
          style={{
            position: "absolute",
            bottom: spacing.md + "px",
            right: spacing.lg + "px",
            backgroundColor: colors.card,
            borderRadius: borderRadius.xl + "px",
            padding: spacing.sm + "px",
            border: `${borderWidth.md}px solid ${colors.border}`,
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
          }}
          className="hover:scale-105"
        >
          <AlertCircleIcon color={colors.secondary} />
        </div>

        {/* Navbar */}
        <div style={navbarStyle}>
          <h1 style={{ color: colors.primary, fontWeight: "bold" }}>
            Welcome Back!
          </h1>
          <div className="flex items-center">
            <div style={{ margin: `0 ${spacing.sm}px` }}>
              <Input
                placeholder="Search..."
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.muted,
                  color: colors.foreground,
                  borderRadius: `${borderRadius.sm}px`,
                  fontFamily: typography.sans,
                  borderWidth: `${borderWidth.sm}px`,
                }}
              />
            </div>

            <div className="flex items-center">
              <Sun
                style={{ color: isDarkMode ? colors.muted : colors.primary }}
              />
              <Switch
                checked={isDarkMode}
                onCheckedChange={onToggleDarkMode}
                style={{
                  backgroundColor: isDarkMode ? colors.primary : colors.muted,
                  margin: `0 ${spacing.sm}px`,
                }}
              />
              <Moon
                style={{ color: isDarkMode ? colors.primary : colors.muted }}
              />
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div
          className="flex flex-wrap"
          style={{
            padding: `${spacing.xl}px ${spacing["2xl"]}px 0`,
            gap: spacing.lg + "px",
          }}
        >
          {[
            { title: "Total Revenue", value: "$12,345" },
            { title: "Users", value: "$12,345" },
            { title: "Orders", value: "$12,345" },
          ].map((item, index) => (
            <Card
              key={index}
              style={cardStyle}
              className="flex-1 min-w-[12rem] hover:scale-105 transition-transform"
            >
              <CardHeader className="p-0 m-0">
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent
                className="p-0 m-0"
                style={{
                  padding: `${spacing.md}px ${spacing.lg}px 0`,
                }}
              >
                <span>+20% this month</span>
                <h3
                  style={{
                    fontSize: typography.fontSize.xl,
                    color: colors.secondary,
                    fontWeight: typography.fontWeight_bold,
                  }}
                >
                  {item.value}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Transactions */}
        <div
          style={{
            padding: `${spacing.xl}px ${spacing["2xl"]}px 0`,
          }}
        >
          <Card style={cardStyle}>
            <CardHeader className="flex flex-row justify-between p-0">
              <CardTitle className="m-0 p-0">Recent Transactions</CardTitle>
              <Button
                style={buttonStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, hoverStyle);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyle);
                }}
              >
                <Plus />
                New Transactions
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left">
                <thead
                  style={{
                    lineHeight: typography.lineHeight_tight,
                  }}
                >
                  <tr>
                    <th style={{ fontWeight: typography.fontWeight_bold }}>
                      Name
                    </th>
                    <th style={{ fontWeight: typography.fontWeight_bold }}>
                      Amount
                    </th>
                    <th style={{ fontWeight: typography.fontWeight_bold }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    lineHeight: typography.lineHeight_relaxed,
                  }}
                >
                  <tr>
                    <td>John Doe</td>
                    <td>$500</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>$300</td>
                    <td>Pending</td>
                  </tr>
                  <tr>
                    <td>Sam Wilson</td>
                    <td>$700</td>
                    <td>Completed</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
