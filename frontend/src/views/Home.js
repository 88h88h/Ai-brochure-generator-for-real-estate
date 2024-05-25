import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const Home = () => {
  const [inputs, setInputs] = useState({
    brandPositioning: "",
    features: "",
    tone: "Casual",
    length: "Short",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selection, setSelection] = useState("");
  const [regenerateError, setRegenerateError] = useState("");
  const [insertError, setInsertError] = useState("");
  const [insertSuccess, setInsertSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    setInsertSuccess("");
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setInsertSuccess("");
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tone: inputs.tone,
          length: inputs.length,
          features: inputs.features,
          positioning: inputs.brandPositioning,
        }),
      });

      if (!response.ok) {
        throw new Error("Error generating copy");
      }

      const data = await response.json();
      setOutput(data.generatedText);
    } catch (err) {
      setError("Error generating copy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextSelection = () => {
    const selectedText = window.getSelection().toString();
    setSelection(selectedText);
    setInsertSuccess(""); // Reset success message on text selection
  };

  const handleRegenerate = async (option) => {
    if (!selection) {
      setRegenerateError("Please select some text to regenerate.");
      return;
    }
    setLoading(true);
    setRegenerateError("");
    setInsertSuccess(""); // Reset success message on regenerate
    try {
      const response = await fetch("http://localhost:5000/api/regenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completeText: output,
          selectedText: selection,
          option: option,
        }),
      });

      if (!response.ok) {
        throw new Error("Error regenerating copy");
      }

      const data = await response.json();
      setOutput(data.modifiedText);
    } catch (err) {
      setRegenerateError("Error regenerating copy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInsert = async () => {
    setLoading(true);
    setInsertError("");
    setInsertSuccess("");
    try {
      const response = await fetch("http://localhost:5000/api/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tone: inputs.tone,
          length: inputs.length,
          features: inputs.features,
          brandPositioning: inputs.brandPositioning,
          output: output,
        }),
      });

      if (!response.ok) {
        throw new Error("Error inserting copy");
      }

      const data = await response.json();
      setInsertSuccess(data.message);
    } catch (err) {
      setInsertError("Error inserting copy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Real Estate Brochure Generator
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Brand Positioning"
            name="brandPositioning"
            value={inputs.brandPositioning}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Features"
            name="features"
            value={inputs.features}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Tone</InputLabel>
            <Select
              name="tone"
              value={inputs.tone}
              onChange={handleChange}
              label="Tone"
            >
              <MenuItem value="Casual">Casual</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Length</InputLabel>
            <Select
              name="length"
              value={inputs.length}
              onChange={handleChange}
              label="Length"
            >
              <MenuItem value="Short">Short</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Long">Long</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Generate"}
          </Button>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="Generated Output"
            value={output}
            multiline
            rows={10}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            onMouseUp={handleTextSelection}
          />
        </Grid>
        {selection && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Selected Text: {selection}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRegenerate("longer")}
              disabled={loading}
              style={{ marginRight: "10px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Make it Longer"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRegenerate("shorter")}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Make it Shorter"}
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleInsert}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Insert in DB"}
          </Button>
        </Grid>
        {insertError && (
          <Grid item xs={12}>
            <Alert severity="error">{insertError}</Alert>
          </Grid>
        )}
        {insertSuccess && (
          <Grid item xs={12}>
            <Alert severity="success">{insertSuccess}</Alert>
          </Grid>
        )}
        {regenerateError && (
          <Grid item xs={12}>
            <Alert severity="error">{regenerateError}</Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
