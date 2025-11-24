import { useState, useEffect } from "react";
import type { SoundContent } from "../../types/board";
import "./SoundInput.css";

interface SoundInputProps {
  value: SoundContent;
  onChange: (value: SoundContent) => void;
}

/**
 * SoundInput component - YouTube URL and timestamp inputs
 * Validates YouTube URL format and numeric timestamps
 */
export default function SoundInput({
  value,
  onChange,
}: SoundInputProps) {
  const [urlError, setUrlError] = useState<string>("");
  const [startError, setStartError] = useState<string>("");
  const [endError, setEndError] = useState<string>("");

  /**
   * Validate YouTube URL format
   * Accepts: youtube.com/watch?v=..., youtu.be/..., m.youtube.com/watch?v=...
   */
  const validateYouTubeUrl = (url: string): boolean => {
    if (!url) return true; // Empty is valid (not required yet)

    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/youtu\.be\/[\w-]+/,
      /^https?:\/\/m\.youtube\.com\/watch\?v=[\w-]+/,
    ];

    return patterns.some((pattern) => pattern.test(url));
  };

  /**
   * Validate timestamp is a non-negative number
   */
  const validateTimestamp = (value: number): boolean => {
    return !isNaN(value) && value >= 0;
  };

  /**
   * Handle URL change with validation
   */
  const handleUrlChange = (url: string) => {
    if (url && !validateYouTubeUrl(url)) {
      setUrlError("Invalid YouTube URL format");
    } else {
      setUrlError("");
    }
    onChange({ ...value, url });
  };

  /**
   * Handle start timestamp change with validation
   */
  const handleStartChange = (start: number) => {
    if (!validateTimestamp(start)) {
      setStartError("Must be a non-negative number");
    } else if (value.end > 0 && start >= value.end) {
      setStartError("Start must be before end");
    } else {
      setStartError("");
    }
    onChange({ ...value, start });
  };

  /**
   * Handle end timestamp change with validation
   */
  const handleEndChange = (end: number) => {
    if (!validateTimestamp(end)) {
      setEndError("Must be a non-negative number");
    } else if (end > 0 && end <= value.start) {
      setEndError("End must be after start");
    } else {
      setEndError("");
    }
    onChange({ ...value, end });
  };

  // Cross-validate start and end times when either changes
  useEffect(() => {
    if (value.start >= 0 && value.end > 0) {
      if (value.start >= value.end) {
        setStartError("Start must be before end");
        setEndError("End must be after start");
      } else {
        if (startError === "Start must be before end") setStartError("");
        if (endError === "End must be after start") setEndError("");
      }
    }
  }, [value.start, value.end]);

  return (
    <div className="sound-input">
      <div className="sound-input-field">
        <label htmlFor="youtube-url" className="sound-input-label">
          YouTube URL
        </label>
        <input
          id="youtube-url"
          type="text"
          className={`sound-input-text ${urlError ? "error" : ""}`}
          value={value.url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
        />
        {urlError && <span className="sound-input-error">{urlError}</span>}
      </div>

      <div className="sound-input-timestamps">
        <div className="sound-input-field">
          <label htmlFor="start-time" className="sound-input-label">
            Start (seconds)
          </label>
          <input
            id="start-time"
            type="number"
            className={`sound-input-number ${startError ? "error" : ""}`}
            value={value.start}
            onChange={(e) => handleStartChange(Number(e.target.value))}
            placeholder="0"
            min="0"
            step="1"
          />
          {startError && (
            <span className="sound-input-error">{startError}</span>
          )}
        </div>

        <div className="sound-input-field">
          <label htmlFor="end-time" className="sound-input-label">
            End (seconds)
          </label>
          <input
            id="end-time"
            type="number"
            className={`sound-input-number ${endError ? "error" : ""}`}
            value={value.end}
            onChange={(e) => handleEndChange(Number(e.target.value))}
            placeholder="0"
            min="0"
            step="1"
          />
          {endError && <span className="sound-input-error">{endError}</span>}
        </div>
      </div>
    </div>
  );
}
