import React, { useState } from "react";

/**
 * SmartThumbnail
 * - If a custom thumbnail URL is provided (manually uploaded image in Drive), try it.
 * - For video Drive links, we do NOT auto-generate thumbnails because Drive returns
 *   a screenshot of the video player UI — not a clean image.
 * - Falls back to a styled placeholder icon.
 */
export default function SmartThumbnail({ videoUrl, customThumbUrl, alt, placeholder }) {
  const [failed, setFailed] = useState(false);

  // Only attempt to load if there's an explicit custom thumbnail URL
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

  // No custom thumb or it failed — show placeholder
  return placeholder || (
    <div className="thumb-placeholder">
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" opacity="0.4"/>
        <path d="M10 8l6 4-6 4V8z" fill="white" opacity="0.6"/>
      </svg>
    </div>
  );
}
