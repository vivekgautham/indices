import { Box, Tooltip } from "@mui/material";
import { APP_NAME, APP_VERSION, BUILD_DATE } from "../../constants/version";

interface AppVersionBadgeProps {
  compact?: boolean;
}

export default function AppVersionBadge({
  compact: _compact = false,
}: AppVersionBadgeProps) {
  const formattedBuildDate = BUILD_DATE.slice(0, 10);

  return (
    <Tooltip
      title={
        <Box sx={{ p: 0.5 }}>
          <Box sx={{ fontWeight: 700, fontSize: "0.75rem" }}>
            {APP_NAME} v{APP_VERSION}
          </Box>
          <Box
            sx={{
              color: "text.secondary",
              fontSize: "0.68rem",
              mt: 0.25,
            }}
          >
            Build: {formattedBuildDate}
          </Box>
        </Box>
      }
      arrow
      placement="bottom-end"
    >
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          color: "text.secondary",
          opacity: 0.8,
          transition: "all 0.2s ease-in-out",
          px: 1,
          py: 0.35,
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
          backgroundColor: "var(--indices-subtle-bg, rgba(30, 41, 59, 0.35))",
          backdropFilter: "blur(8px)",
          fontSize: "0.74rem",
          fontWeight: 600,
          cursor: "default",
          userSelect: "none",
          "&:hover": {
            opacity: 1,
            color: "primary.light",
            borderColor: "primary.main",
            backgroundColor:
              "var(--indices-card-hover-bg, rgba(99, 102, 241, 0.1))",
          },
        }}
      >
        v{APP_VERSION}
      </Box>
    </Tooltip>
  );
}
