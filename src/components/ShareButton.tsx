import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IosShareIcon from "@mui/icons-material/IosShare";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  SxProps,
  Theme,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";

export interface ShareItem {
  title: string;
  text?: string;
  path?: string; // relative route e.g. "/index/sp-500" or "/?provider=sp"
  url?: string; // explicit full URL override
}

export interface ShareButtonProps {
  item: ShareItem;
  label?: string;
  variant?: "button" | "icon" | "outlined" | "contained";
  size?: "small" | "medium";
  color?: string; // custom accent color hex
  tooltip?: string;
  sx?: SxProps<Theme>;
}

/**
 * Copies arbitrary text to the clipboard with browser fallback.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      console.warn("navigator.clipboard.writeText failed, using fallback:", e);
    }
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);
    return successful;
  } catch (err) {
    console.error("Fallback clipboard copy failed:", err);
    return false;
  }
}

/**
 * Resolves full shareable URL respecting HashRouter and GitHub Pages basePath.
 */
export function resolveFullUrl(path?: string, explicitUrl?: string): string {
  if (explicitUrl) return explicitUrl;
  if (!path) return window.location.href;

  const origin = window.location.origin;
  const pathname = window.location.pathname.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${origin}${pathname}/#${cleanPath}`;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  item,
  label = "Share",
  variant = "outlined",
  size = "small",
  color,
  tooltip,
  sx,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isOpen = Boolean(anchorEl);
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const fullUrl = resolveFullUrl(item.path, item.url);
    const success = await copyTextToClipboard(fullUrl);
    if (success) {
      setCopied(true);
      setSnackbarMessage("Link copied to clipboard!");
      setSnackbarOpen(true);
      setTimeout(() => setCopied(false), 2000);
    }
    handleClose();
  };

  const handleNativeShare = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const fullUrl = resolveFullUrl(item.path, item.url);
    if (canNativeShare) {
      try {
        await navigator.share({
          title: item.title,
          text: item.text,
          url: fullUrl,
        });
      } catch (err: unknown) {
        if (
          err &&
          typeof err === "object" &&
          "name" in err &&
          err.name !== "AbortError"
        ) {
          await copyTextToClipboard(fullUrl);
          setSnackbarMessage("Link copied to clipboard!");
          setSnackbarOpen(true);
        }
      }
    }
    handleClose();
  };

  const handleShareX = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const fullUrl = resolveFullUrl(item.path, item.url);
    const shareText = item.text ? `${item.title} - ${item.text}` : item.title;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(fullUrl)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    handleClose();
  };

  const handleShareLinkedIn = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const fullUrl = resolveFullUrl(item.path, item.url);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      fullUrl,
    )}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    handleClose();
  };

  const handleShareWhatsApp = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const fullUrl = resolveFullUrl(item.path, item.url);
    const shareText = `${item.title}\n${fullUrl}`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText,
    )}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    handleClose();
  };

  const renderTriggerButton = () => {
    if (variant === "icon") {
      const buttonNode = (
        <IconButton
          size={size}
          onClick={handleOpen}
          aria-label={tooltip || label}
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : undefined}
          sx={{
            color: color || "text.secondary",
            border:
              "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(8px)",
            p: size === "small" ? 0.6 : 1,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              color: "#ffffff",
              backgroundColor: color ? `${color}25` : "rgba(99, 102, 241, 0.2)",
              borderColor: color || "primary.light",
              transform: "scale(1.08)",
            },
            ...sx,
          }}
        >
          <ShareIcon sx={{ fontSize: size === "small" ? 14 : 18 }} />
        </IconButton>
      );

      if (tooltip) {
        return (
          <Tooltip title={tooltip} arrow placement="top">
            {buttonNode}
          </Tooltip>
        );
      }
      return buttonNode;
    }

    const muiVariant = variant === "contained" ? "contained" : "outlined";

    const buttonNode = (
      <Button
        variant={muiVariant}
        size={size}
        onClick={handleOpen}
        startIcon={<ShareIcon sx={{ fontSize: size === "small" ? 14 : 16 }} />}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        sx={{
          borderRadius: 2,
          fontWeight: 700,
          fontSize: size === "small" ? "0.78rem" : "0.85rem",
          borderColor: color
            ? `${color}66`
            : "var(--indices-border, rgba(255, 255, 255, 0.15))",
          color: color || "text.primary",
          backgroundColor: color ? `${color}10` : "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(8px)",
          px: size === "small" ? 1.5 : 2,
          py: size === "small" ? 0.5 : 0.75,
          textTransform: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: color || "primary.light",
            backgroundColor: color ? `${color}22` : "rgba(99, 102, 241, 0.15)",
            color: color || "#ffffff",
          },
          ...sx,
        }}
      >
        {label}
      </Button>
    );

    if (tooltip) {
      return (
        <Tooltip title={tooltip} arrow placement="top">
          {buttonNode}
        </Tooltip>
      );
    }
    return buttonNode;
  };

  return (
    <>
      {renderTriggerButton()}

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2.75,
              minWidth: 210,
              backgroundColor: "var(--indices-card-bg, rgba(15, 23, 42, 0.95))",
              backdropFilter: "blur(20px)",
              border:
                "1px solid var(--indices-border, rgba(255, 255, 255, 0.12))",
              boxShadow:
                "0 16px 40px rgba(0, 0, 0, 0.45), 0 0 20px rgba(99, 102, 241, 0.15)",
              p: 0.5,
              "& .MuiMenuItem-root": {
                py: 1,
                px: 1.5,
                fontSize: "0.84rem",
                fontWeight: 600,
                borderRadius: 1.75,
                my: 0.2,
                transition: "all 0.16s ease",
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: "#ffffff",
                },
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleCopy}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            {copied ? (
              <CheckIcon sx={{ fontSize: 18, color: "success.main" }} />
            ) : (
              <ContentCopyIcon sx={{ fontSize: 18 }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={copied ? "Link Copied!" : "Copy Link"}
            primaryTypographyProps={{
              fontWeight: 700,
              color: copied ? "success.main" : "text.primary",
            }}
          />
        </MenuItem>

        {canNativeShare && (
          <MenuItem onClick={handleNativeShare}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <IosShareIcon sx={{ fontSize: 18, color: "primary.light" }} />
            </ListItemIcon>
            <ListItemText primary="Share via Device..." />
          </MenuItem>
        )}

        <Divider sx={{ my: 0.5, borderColor: "rgba(255, 255, 255, 0.08)" }} />

        <Box sx={{ px: 1.5, py: 0.5 }}>
          <Box
            component="span"
            sx={{
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "text.secondary",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Social Channels
          </Box>
        </Box>

        <MenuItem onClick={handleShareX}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <XIcon sx={{ fontSize: 17 }} />
          </ListItemIcon>
          <ListItemText primary="Share on X (Twitter)" />
        </MenuItem>

        <MenuItem onClick={handleShareLinkedIn}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <LinkedInIcon sx={{ fontSize: 19, color: "#0a66c2" }} />
          </ListItemIcon>
          <ListItemText primary="Share on LinkedIn" />
        </MenuItem>

        <MenuItem onClick={handleShareWhatsApp}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <WhatsAppIcon sx={{ fontSize: 19, color: "#25d366" }} />
          </ListItemIcon>
          <ListItemText primary="Share on WhatsApp" />
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          icon={<CheckIcon sx={{ fontSize: 20 }} />}
          sx={{
            borderRadius: 2.5,
            fontWeight: 700,
            fontSize: "0.85rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareButton;
