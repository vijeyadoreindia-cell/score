import React, { useEffect, useRef } from "react";

export default function SmartThumbnail({ title = "", speaker = "", episodeNumber = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // ── Background ───────────────────────────────────────────
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#1b3a6b");
    grad.addColorStop(1, "#0d2040");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // ── Subtle circle accents ────────────────────────────────
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath(); ctx.arc(W * 0.88, H * 0.12, 100, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(W * 0.05, H * 0.9, 80, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // ── Orange left accent bar ───────────────────────────────
    ctx.fillStyle = "#e07b2a";
    ctx.beginPath();
    ctx.roundRect(20, H * 0.18, 6, H * 0.64, 3);
    ctx.fill();

    // ── "ADORE" watermark top ────────────────────────────────
    ctx.font = "bold 14px Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillText("ADORE", 38, 30);

    // ── Episode badge top-right ──────────────────────────────
    if (episodeNumber) {
      const epText = `EP ${episodeNumber}`;
      ctx.font = "bold 13px Arial, sans-serif";
      const epW = ctx.measureText(epText).width + 20;
      ctx.fillStyle = "#e07b2a";
      ctx.beginPath();
      ctx.roundRect(W - epW - 12, 12, epW, 26, 6);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillText(epText, W - epW - 2, 29);
    }

    // ── Title text ───────────────────────────────────────────
    // Word-wrap
    const maxLineW = W - 80;
    const words = (title || "Untitled").split(" ");
    let lines = [];
    let current = "";
    ctx.font = "bold 22px Arial, sans-serif";
    for (const word of words) {
      const test = current ? current + " " + word : word;
      if (ctx.measureText(test).width > maxLineW && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    lines = lines.slice(0, 3);

    const totalTextH = lines.length * 30;
    const blockStart = speaker
      ? (H - totalTextH - 50) / 2   // leave room below for speaker
      : (H - totalTextH) / 2;

    // Shadow for readability
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 8;

    ctx.font = "bold 22px Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    lines.forEach((line, i) => {
      ctx.fillText(line, 38, blockStart + i * 30);
    });

    // ── Divider ──────────────────────────────────────────────
    ctx.shadowBlur = 0;
    const divY = blockStart + lines.length * 30 + 10;
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(38, divY);
    ctx.lineTo(W - 38, divY);
    ctx.stroke();

    // ── Speaker name ─────────────────────────────────────────
    if (speaker) {
      ctx.shadowColor = "rgba(0,0,0,0.7)";
      ctx.shadowBlur = 6;
      ctx.font = "bold 16px Arial, sans-serif";
      ctx.fillStyle = "#f0a060";   // warm orange-white — clearly visible
      ctx.fillText(`🎤  ${speaker}`, 38, divY + 24);
      ctx.shadowBlur = 0;
    }

    // ── Play button ──────────────────────────────────────────
    const btnX = W - 46;
    const btnY = H - 40;
    ctx.fillStyle = "#e07b2a";
    ctx.beginPath();
    ctx.arc(btnX, btnY, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(btnX - 5, btnY - 7);
    ctx.lineTo(btnX - 5, btnY + 7);
    ctx.lineTo(btnX + 9, btnY);
    ctx.closePath();
    ctx.fill();

  }, [title, speaker, episodeNumber]);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={315}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
