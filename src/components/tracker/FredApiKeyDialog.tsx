import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyIcon from "@mui/icons-material/Key";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getCustomFredApiKey,
  setStoredFredApiKey,
} from "../../api/fredApi";

export interface FredApiKeyDialogProps {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export const FredApiKeyDialog: React.FC<FredApiKeyDialogProps> = ({
  open,
  onClose,
  onSaved,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setApiKey(getCustomFredApiKey());
      setSavedSuccess(false);
    }
  }, [open]);

  const handleSave = () => {
    setStoredFredApiKey(apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      onSaved?.();
      onClose();
    }, 600);
  };

  const handleClear = () => {
    setStoredFredApiKey("");
    setApiKey("");
    setSavedSuccess(false);
    onSaved?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          backgroundColor: "var(--indices-card-bg, #1e293b)",
          border: "1px solid var(--indices-border, rgba(255, 255, 255, 0.12))",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, display: "flex", alignItems: "center", gap: 1 }}>
        <KeyIcon sx={{ color: "primary.main" }} />
        <Typography variant="h6" component="span" sx={{ fontWeight: 800 }}>
          FRED® API Settings
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2, lineHeight: 1.6 }}>
          The Benchmark Tracker comes pre-loaded with comprehensive historical and real-time
          series from the <strong>Federal Reserve Bank of St. Louis</strong>. An API key is{" "}
          <strong>completely optional</strong>, but entering your personal 32-character FRED key
          enables direct, high-rate-limit live observation queries.
        </Typography>

        <Alert severity="info" sx={{ mb: 2.5, borderRadius: 2 }}>
          {apiKey
            ? "Your custom FRED API key is active and saved locally in your browser's storage."
            : "Built-in FRED API access is active. Entering a custom key is optional."}
        </Alert>

        <TextField
          fullWidth
          label="FRED API Key (32-character hex)"
          variant="outlined"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="e.g. abcdef0123456789abcdef0123456789"
          type={showKey ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowKey(!showKey)} edge="end" size="small">
                  {showKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {savedSuccess && (
          <Alert
            icon={<CheckCircleIcon fontSize="inherit" />}
            severity="success"
            sx={{ mb: 2, borderRadius: 2 }}
          >
            FRED API Key saved successfully!
          </Alert>
        )}

        <Box sx={{ mt: 1 }}>
          <Button
            href="https://fred.stlouisfed.org/docs/api/api_key.html"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Get a free FRED API Key from St. Louis Fed
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        {apiKey && (
          <Button onClick={handleClear} color="error" sx={{ mr: "auto" }}>
            Remove Key
          </Button>
        )}
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary" sx={{ fontWeight: 700 }}>
          Save Key
        </Button>
      </DialogActions>
    </Dialog>
  );
};
