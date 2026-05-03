/**
 * Robust Google Drive URL utilities
 * Handles all Drive URL formats and browser compatibility
 */

export function extractDriveId(url) {
  if (!url || typeof url !== "string") return null;
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]{10,})/,
    /[?&]id=([a-zA-Z0-9_-]{10,})/,
    /\/d\/([a-zA-Z0-9_-]{10,})/,
    /open\?id=([a-zA-Z0-9_-]{10,})/,
    /uc\?.*id=([a-zA-Z0-9_-]{10,})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match && match[1]) return match[1];
  }
  return null;
}

export function getDriveEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("drive.google.com/file/d/") && url.includes("/preview")) return url;
  const id = extractDriveId(url);
  if (id) return `https://drive.google.com/file/d/${id}/preview`;
  return url;
}

export function getDriveThumbnailUrls(url) {
  const id = extractDriveId(url);
  if (!id) return [];
  return [
    `https://drive.google.com/thumbnail?id=${id}&sz=w640-h360`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w400`,
    `https://lh3.googleusercontent.com/d/${id}=w640-h360`,
    `https://drive.google.com/uc?export=view&id=${id}`,
  ];
}

export function getDriveThumbnailUrl(url) {
  const urls = getDriveThumbnailUrls(url);
  return urls[0] || null;
}

export function getDriveViewUrl(url) {
  const id = extractDriveId(url);
  if (id) return `https://drive.google.com/file/d/${id}/view`;
  return url;
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}
