import React, { useState } from "react";
import { getDriveEmbedUrl, getDriveViewUrl } from "../utils/driveUtils";
import "./DriveVideoPlayer.css";

/**
 * DriveVideoPlayer
 * - Embeds Drive video via /preview iframe
 * - Detects if iframe was blocked (Brave shields) and shows a fallback open-in-Drive button
 */
export default function DriveVideoPlayer({ url, title }) {
  const embedUrl = getDriveEmbedUrl(url);
  const viewUrl = getDriveViewUrl(url);
  const [blocked, setBlocked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!embedUrl) return null;

  return (
    <div className="dvp-wrapper">
      {!loaded && !blocked && (
        <div className="dvp-loading">
          <div className="dvp-spinner" />
          <p>Loading video…</p>
        </div>
      )}

      {!blocked && (
        <iframe
          src={embedUrl}
          title={title || "Video"}
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
          onLoad={() => setLoaded(true)}
          onError={() => setBlocked(true)}
          style={{ display: loaded ? "block" : "none" }}
          className="dvp-iframe"
        />
      )}

      {blocked && (
        <div className="dvp-blocked">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.724v6.552a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="#3a5a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>Video blocked by browser shields</p>
          <span>If you're using Brave, disable shields for this site</span>
          <a href={viewUrl} target="_blank" rel="noreferrer" className="dvp-open-btn">
            ▶ Open in Google Drive
          </a>
        </div>
      )}

      {/* Always show fallback link */}
      {loaded && (
        <div className="dvp-fallback-bar">
          <a href={viewUrl} target="_blank" rel="noreferrer">
            🔗 Open in Google Drive
          </a>
          <span className="dvp-brave-note">Brave users: disable shields if video doesn't play</span>
        </div>
      )}
    </div>
  );
}
