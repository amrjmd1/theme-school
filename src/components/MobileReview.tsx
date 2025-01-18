import React from "react";
import { DeviceFrameset } from "react-device-frameset";
import Theme from "@/types/Theme";
import { Bell, Home, LineChart, Search, Settings } from "lucide-react";

import "react-device-frameset/styles/marvel-devices.min.css";

interface MobileReviewProps {
  theme: Theme;
}

const MobileDevices = [
  { device: "iPhone X", color: "gold" },
  { device: "Galaxy Note 8", color: "gold" },
] as const;

const MobileReview = ({ theme }: MobileReviewProps) => {
  return (
    <div className="flex flex-grow items-center justify-center">
      {MobileDevices.map(({ device, color }) => (
        <div
          key={device}
          style={{
            transform: "scale(0.8)",
            transformOrigin: "top left",
          }}
        >
          <DeviceFrameset device={device} color={color}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                backgroundColor: theme.colors.light.background,
                fontFamily: theme.typography.sans,
              }}
            >
              <header
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: theme.spacing.md,
                  paddingTop:
                    theme.spacing.md + (device === "iPhone X" ? 30 : 0),
                  backgroundColor: theme.colors.light.card,
                  borderBottom: `${theme.borderWidth.md}px solid ${theme.colors.light.border}`,
                }}
              >
                {/* Logo */}
                <div
                  style={{
                    color: theme.colors.light.primary,
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight_bold,
                    fontFamily: theme.typography.heading,
                  }}
                >
                  Logo
                </div>

                {/* Icons (Search and Notifications) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.md,
                  }}
                >
                  {/* Search Icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      borderRadius: theme.borderRadius.md,
                      borderColor: theme.colors.light.border,
                      borderWidth: theme.borderWidth.sm,
                      cursor: "pointer",
                    }}
                  >
                    <Search size={20} color={theme.colors.light.primary} />
                  </div>

                  {/* Notifications Icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      borderRadius: theme.borderRadius.md,
                      borderColor: theme.colors.light.border,
                      borderWidth: theme.borderWidth.sm,
                      cursor: "pointer",
                    }}
                  >
                    <Bell size={20} color={theme.colors.light.primary} />
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main
                style={{
                  flex: 1,
                  padding: theme.spacing.md,
                  overflowY: "auto", // Allow scrolling if content overflows
                }}
              >
                {/* Card 1: Welcome Message */}
                <div
                  style={{
                    padding: theme.spacing.lg,
                    backgroundColor: theme.colors.light.card,
                    border: `${theme.borderWidth.md}px solid ${theme.colors.light.border}`,
                    borderRadius: theme.borderRadius.md,
                    marginBottom: theme.spacing.md,
                  }}
                >
                  <h2
                    style={{
                      color: theme.colors.light.foreground,
                      fontSize: theme.typography.fontSize.md,
                      fontWeight: theme.typography.fontWeight_bold,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    Welcome Back!
                  </h2>
                  <p
                    style={{
                      color: theme.colors.light.muted,
                      fontSize: theme.typography.fontSize.sm,
                    }}
                  >
                    You have 3 new notifications.
                  </p>
                </div>

                <h2
                  style={{
                    color: theme.colors.light.foreground,
                    fontSize: theme.typography.fontSize.md,
                    fontWeight: theme.typography.fontWeight_bold,
                    marginTop: theme.spacing.md,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  Statistics
                </h2>
                <div
                  className={`flex flex-row`}
                  style={{
                    gap: theme.spacing.md,
                  }}
                >
                  {[
                    { title: "Users", value: "1,234" },
                    { title: "Revenue", value: "$12,345" },
                  ].map(({ title, value }) => (
                    <div
                      key={title}
                      style={{
                        padding: theme.spacing.md,
                        backgroundColor: theme.colors.light.card,
                        border: `${theme.borderWidth.md}px solid ${theme.colors.light.border}`,
                        borderRadius: theme.borderRadius.md,
                        marginBottom: theme.spacing.md,
                        flex: 1,
                      }}
                    >
                      <p
                        style={{
                          color: theme.colors.light.muted,
                          fontSize: theme.typography.fontSize.md,
                        }}
                      >
                        {title}
                      </p>
                      <p
                        style={{
                          color: theme.colors.light.secondary,
                          fontSize: theme.typography.fontSize.lg,
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Card 3: Quick Actions */}
                <div
                  style={{
                    marginTop: theme.spacing.md,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <h2
                    style={{
                      color: theme.colors.light.foreground,
                      fontSize: theme.typography.fontSize.md,
                      fontWeight: theme.typography.fontWeight_bold,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    Quick Actions
                  </h2>
                  <button
                    style={{
                      padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
                      borderRadius: theme.borderRadius.md,
                      backgroundColor: theme.colors.light.primary,
                      color: theme.colors.light.card,
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Add User
                  </button>
                </div>
              </main>

              {/* Bottom Navbar */}
              <nav
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: theme.spacing.md,
                  backgroundColor: theme.colors.light.card,
                  borderTop: `${theme.borderWidth.sm}px solid ${theme.colors.light.border}`,
                }}
              >
                {/* Navbar Items */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: theme.colors.light.primary,
                    fontSize: theme.typography.fontSize.sm,
                    cursor: "pointer",
                    fontWeight: theme.typography.fontWeight_semibold,
                  }}
                >
                  <Home size={20} color={theme.colors.light.primary} />
                  <span>Home</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: theme.colors.light.foreground,
                    fontSize: theme.typography.fontSize.sm,
                    cursor: "pointer",
                  }}
                >
                  <LineChart size={20} color={theme.colors.light.foreground} />
                  <span>Analytics</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: theme.colors.light.foreground,
                    fontSize: theme.typography.fontSize.sm,
                    cursor: "pointer",
                  }}
                >
                  <Settings size={20} color={theme.colors.light.foreground} />
                  <span>Settings</span>
                </div>
              </nav>
            </div>
          </DeviceFrameset>
        </div>
      ))}
    </div>
  );
};

export default MobileReview;
