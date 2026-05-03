import React, { useEffect, useRef } from "react";

/**
 * SmartThumbnail
 * Generates a branded canvas thumbnail using title + speaker name.
 * No external image loading — works 100% in all browsers.
 */
export default function SmartThumbnail({ title = "", speaker = "", tag = "", episodeNumber = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#1e3a5f");
    grad.addColorStop(0.6, "#2b4f82");
    grad.addColorStop(1, "#1a2f50");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Decorative circles
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath(); ctx.arc(W * 0.85, H * 0.15, 90, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(W * 0.1, H * 0.85, 70, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 0.04;
    ctx.beginPath(); ctx.arc(W * 0.5, H * 0.5, 140, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Orange accent bar (left)
    const barH = H * 0.55;
    const barY = (H - barH) / 2;
    ctx.fillStyle = "#e07b2a";
    ctx.beginPath();
    ctx.roundRect(22, barY, 5, barH, 3);
    ctx.fill();

    // ADORE label top-left
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = "bold 13px Arial, sans-serif";
    ctx.fillText("ADORE", 36, 32);

    // Episode badge top-right
    if (episodeNumber) {
      const epText = `EP ${episodeNumber}`;
      ctx.font = "bold 12px Arial, sans-serif";
      const epW = ctx.measureText(epText).width + 18;
      ctx.fillStyle = "#e07b2a";
      ctx.beginPath();
      ctx.roundRect(W - epW - 14, 14, epW, 24, 5);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillText(epText, W - epW - 5, 30);
    }

    // Tag
    if (tag) {
      ctx.font = "12px Arial, sans-serif";
      ctx.fillStyle = "rgba(224,123,42,0.85)";
      ctx.fillText(tag.toUpperCase(), 36, H * 0.38);
    }

    // Title
    ctx.fillStyle = "#ffffff";
    const titleFontSize = title.length > 30 ? 18 : title.length > 20 ? 20 : 22;
    ctx.font = `bold ${titleFontSize}px Georgia, serif`;
    const maxW = W - 80;
    const words = title.split(" ");
    let lines = [];
    let current = "";
    for (const word of words) {
      const test = current ? current + " " + word : word;
      if (ctx.measureText(test).width > maxW && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    lines = lines.slice(0, 3);

    const titleY = tag ? H * 0.47 : H * 0.44;
    const lineH = titleFontSize + 6;
    lines.forEach((line, i) => {
      ctx.fillText(line, 36, titleY + i * lineH);
    });

    // Divider
    const divY = titleY + lines.length * lineH + 12;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(36, divY);
    ctx.lineTo(W - 36, divY);
    ctx.stroke();

    // Speaker
    if (speaker) {
      ctx.font = "14px Arial, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.fillText(`🎤  ${speaker}`, 36, divY + 22);
    }

    // Play button bottom-right
    const btnX = W - 56;
    const btnY = H - 52;
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "#e07b2a";
    ctx.beginPath();
    ctx.arc(btnX, btnY, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(btnX - 6, btnY - 8);
    ctx.lineTo(btnX - 6, btnY + 8);
    ctx.lineTo(btnX + 10, btnY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

  }, [title, speaker, tag, episodeNumber]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={225}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
