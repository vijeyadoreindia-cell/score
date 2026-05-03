import React, { useState } from "react";
import { getDriveThumbnailUrls } from "../utils/driveUtils";

/**
 * SmartThumbnail — tries each Drive thumbnail URL in order.
 * If all fail, shows a styled placeholder.
 * This handles Brave/Chrome differences and Drive sharing permission issues.
 */
export default function SmartThumbnail({ videoUrl, customThumbUrl, alt, placeholder }) {
  const candidates = customThumbUrl
    ? [customThumbUrl, ...getDriveThumbnailUrls(videoUrl)]
    : getDriveThumbnailUrls(videoUrl);

  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed || candidates.length === 0) {
    return (
      <div className="thumb-placeholder">
        {placeholder || (
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" opacity="0.4"/>
            <path d="M10 8l6 4-6 4V8z" fill="white" opacity="0.6"/>
          </svg>
        )}
      </div>
    );
  }

  return (
    <img
      src={candidates[idx]}
      alt={alt || "thumbnail"}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      onError={() => {
        if (idx + 1 < candidates.length) {
          setIdx(idx + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
