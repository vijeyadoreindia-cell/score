import React, { useState } from "react";

/**
 * SmartThumbnail
 * Only loads an image if a custom thumbnail URL was explicitly provided by the admin.
 * For video Drive links we never attempt auto-thumbnails (Drive returns player screenshots).
 * Shows a clean branded placeholder with play icon otherwise.
 */
export default function SmartThumbnail({ customThumbUrl, alt, placeholder, showPlayIcon = false }) {
  const [failed, setFailed] = useState(false);

  if (customThumbUrl && !failed) {
    return (
      <img
        src={customThumbUrl}
        alt={alt || "thumbnail"}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={() => setFailed(true)}
      />
    );
  }

  if (placeholder) return placeholder;

  // Default branded placeholder
  return (
    <div className="thumb-placeholder">
      <svg width="52" height="52" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <path d="M10 8l6 4-6 4V8z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    </div>
  );
}
