import { useState, useRef, useEffect } from "react";
import YouTube, { type YouTubeProps, type YouTubePlayer } from "react-youtube";
import type { SoundContent } from "../../types/board";
import "./SoundPlayer.css";

interface SoundPlayerProps {
  content: SoundContent;
  onRevealAnswer?: () => void;
  showMarkButton?: boolean;
  onMark?: (e: React.MouseEvent) => void;
}

/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
function extractVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);

    // Format: youtube.com/watch?v=VIDEO_ID
    if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.searchParams.has("v")
    ) {
      return urlObj.searchParams.get("v");
    }

    // Format: youtu.be/VIDEO_ID
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    }

    // Format: youtube.com/embed/VIDEO_ID
    if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.pathname.startsWith("/embed/")
    ) {
      return urlObj.pathname.split("/")[2];
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * SoundPlayer Component
 * Plays YouTube videos with start and end timestamp controls
 * Uses react-youtube library with manual play button and auto-stop at end time
 */
export default function SoundPlayer({
  content,
  onRevealAnswer,
  showMarkButton,
  onMark,
}: SoundPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const checkIntervalRef = useRef<number | null>(null);

  const videoId = extractVideoId(content.url);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, []);

  // YouTube player options - hide player
  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      start: content.start,
      end: content.end,
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  // Handle player ready
  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
  };

  // Handle state change - detect play/pause
  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // YouTube Player States:
    // -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    const playerState = event.data;

    if (playerState === 1) {
      // Playing
      setIsPlaying(true);
      startTimeCheck();
    } else {
      // Any other state (paused, ended, buffering) - allow replay
      setIsPlaying(false);
      stopTimeCheck();
    }
  };

  // Handle player error
  const onError: YouTubeProps["onError"] = () => {
    setError("Failed to load YouTube video. Please check the URL.");
    setIsPlaying(false);
  };

  // Start checking current time to stop at end timestamp
  const startTimeCheck = () => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    checkIntervalRef.current = window.setInterval(() => {
      if (playerRef.current) {
        playerRef.current.getCurrentTime().then((currentTime: number) => {
          if (currentTime >= content.end) {
            playerRef.current?.pauseVideo();
            // Optionally seek back to start for replay
            playerRef.current?.seekTo(content.start, true);
            stopTimeCheck();
          }
        });
      }
    }, 100); // Check every 100ms for smooth stopping
  };

  // Stop time checking
  const stopTimeCheck = () => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
  };

  // Manual play button handler
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering cell click
    if (playerRef.current) {
      playerRef.current.seekTo(content.start, true);
      playerRef.current.playVideo();
    }
  };

  // Manual reveal button handler
  const handleRevealClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering cell click
    onRevealAnswer?.();
  };

  // Manual mark button handler
  const handleMarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering cell click
    onMark?.(e);
  };

  // Error state
  if (!videoId) {
    return (
      <div className="sound-player-error">
        <div className="error-icon">⚠️</div>
        <div className="error-message">Invalid YouTube URL</div>
        <div className="error-details">{content.url}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sound-player-error">
        <div className="error-icon">⚠️</div>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="sound-player">
      <div className="youtube-container" style={{ display: "none" }}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          onError={onError}
          className="youtube-player"
        />
      </div>

      <div className="player-controls">
        <button
          className="play-button"
          onClick={handlePlayClick}
          disabled={isPlaying}
        >
          {isPlaying ? "▶ Playing..." : "▶ Play Clip"}
        </button>
        {onRevealAnswer && (
          <button className="reveal-button" onClick={handleRevealClick}>
            Reveal Answer
          </button>
        )}
        {showMarkButton && (
          <button className="mark-button" onClick={handleMarkClick}>
            Mark as Used
          </button>
        )}
        <div className="timestamp-info">
          {content.start}s - {content.end}s
        </div>
      </div>
    </div>
  );
}
