import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Sun, Moon, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface LivePreviewProps {
  theme: {
    colors: {
      light: Record<string, string>;
      dark: Record<string, string>;
    };
    typography: Record<string, string>;
    spacing: Record<string, number>;
    borderRadius: Record<string, number>;
  };
  isDarkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
}

export function LivePreview({
  theme,
  isDarkMode,
  onToggleDarkMode,
}: LivePreviewProps) {
  const { typography, spacing, borderRadius } = theme;
  const colors = isDarkMode ? theme.colors.dark : theme.colors.light;

  const containerStyle = {
    backgroundColor: colors.background,
    color: colors.foreground,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,
    lineHeight: typography.lineHeight,
  };

  const navbarStyle = {
    backgroundColor: colors.card,
    color: colors.foreground,
    padding: `${spacing.small}rem ${spacing.medium}rem`,
    borderBottom: `1px solid ${colors.border}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const sidebarStyle = {
    backgroundColor: colors.card,
    color: colors.foreground,
    borderRight: `1px solid ${colors.border}`,
    padding: `${spacing.small}rem`,
    width: "16rem",
    height: "100%",
  };

  const cardStyle = {
    backgroundColor: colors.card,
    color: colors.cardForeground,
    borderColor: colors.border,
    borderRadius: `${borderRadius.medium}rem`,
    padding: `${spacing.small}rem`,
  };

  const buttonStyle = {
    margin:0,
    backgroundColor: "transparent",
    border: `.3px solid ${colors.primary}`,
    color: colors.primary,
    borderRadius: `${borderRadius.small}rem`,
    padding: `${spacing.small}rem ${spacing.medium}rem`,
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease-in-out",
    fontSize:typography.fontSize
  };

  const hoverStyle = {
    backgroundColor: colors.primary,
    color: colors.background,
  };

  return (
    <div style={containerStyle} className="flex h-full overflow-hidden">
      <aside
        style={sidebarStyle}
        className="flex flex-col space-y-4 justify-between"
      >
        <div>
          <h2
            style={{
              color: colors.accent,
              fontSize: typography.fontSize,
              fontWeight: "bold",
              textAlign: "center",
              padding: `${spacing.small}rem`,
            }}
          >
            LOGO
          </h2>

          <nav className="space-y-2">
            <Button variant="ghost" className="w-full">
              Overview
            </Button>
            <Button variant="ghost" className="w-full">
              Analytics
            </Button>
            <Button variant="ghost" className="w-full">
              Settings
            </Button>
            <Button variant="ghost" className="w-full">
              Profile
            </Button>
          </nav>
        </div>
        <Button variant="ghost">Logout</Button>
      </aside>

      <div className="flex-grow flex flex-col">
        <div style={navbarStyle} className="shadow-sm">
          <h1 style={{ color: colors.primary, fontWeight: "bold" }}>
            Welcome Back!
          </h1>
          <div className="flex items-center">
            <div style={{ margin: `0 ${spacing.small}rem` }}>
              <Input
                placeholder="Search..."
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.muted,
                  color: colors.foreground,
                  borderRadius: `${borderRadius.small}rem`,
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
                  margin: `0 ${spacing.small}rem`,
                }}
              />
              <Moon
                style={{ color: isDarkMode ? colors.primary : colors.muted }}
              />
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap"
          style={{
            padding: `${spacing.medium}rem ${spacing.large}rem 0`,
          }}
        >
          {/* Statistics Cards */}
          <Card style={cardStyle} className="flex-1">
            <CardHeader className="p-0 m-0">
              <CardTitle>Users</CardTitle>
              <CardDescription>+20% this month</CardDescription>
            </CardHeader>
            <CardContent className="p-0 m-0">
              <h3
                style={{ fontSize: typography.fontSize, color: colors.accent }}
              >
                1,245
              </h3>
            </CardContent>
          </Card>

          <Card
            style={{ ...cardStyle, margin: `0rem ${spacing.medium}rem` }}
            className="flex-1 min-w-[12rem]"
          >
            <CardHeader className="p-0 m-0">
              <CardTitle>Revenue</CardTitle>
              <CardDescription>+15% this month</CardDescription>
            </CardHeader>
            <CardContent className="p-0 m-0">
              <h3
                style={{ fontSize: typography.fontSize, color: colors.accent }}
              >
                $12,345
              </h3>
            </CardContent>
          </Card>

          <Card style={cardStyle} className="flex-1 min-w-[12rem]">
            <CardHeader className="p-0 m-0">
              <CardTitle>Orders</CardTitle>
              <CardDescription>+10% this month</CardDescription>
            </CardHeader>
            <CardContent className="p-0 m-0">
              <h3
                style={{ fontSize: typography.fontSize, color: colors.accent }}
              >
                567
              </h3>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <div
          style={{
            padding: `${spacing.medium}rem ${spacing.large}rem`,
          }}
        >
          <Card style={cardStyle}>
            <CardHeader className="flex flex-row justify-between p-0">
              <CardTitle className="m-0 p-0">
                Recent Transactions
              </CardTitle>
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
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
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
