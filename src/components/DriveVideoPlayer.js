import React from "react";
import { getDriveEmbedUrl, getDriveViewUrl } from "../utils/driveUtils";
import "./DriveVideoPlayer.css";

/**
 * DriveVideoPlayer
 * Chrome & Brave block Google Drive iframes via CSP (frame-ancestors policy).
 * Solution: open the video in Google Drive directly in a new tab.
 * We show a branded "click to open" screen instead of a broken iframe.
 */
export default function DriveVideoPlayer({ url, title }) {
  const viewUrl = getDriveViewUrl(url);

  return (
    <div className="dvp-wrapper">
      <div className="dvp-open-screen">
        <div className="dvp-icon">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#3a5a8a" opacity="0.12"/>
            <path d="M10 8l6 4-6 4V8z" fill="#3a5a8a"/>
          </svg>
        </div>
        <p className="dvp-title">{title}</p>
        <p className="dvp-note">
          Google Drive videos open in a new tab for the best playback experience across all browsers.
        </p>
        <a
          href={viewUrl}
          target="_blank"
          rel="noreferrer"
          className="dvp-open-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M10 8l6 4-6 4V8z" fill="white"/>
          </svg>
          Watch on Google Drive
        </a>
        <p className="dvp-sub">Opens in a new tab · No sign-in required</p>
      </div>
    </div>
  );
}
