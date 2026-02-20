import { ImageResponse } from "next/og";

export const alt = "Rollin Brummette - Americana Singer-Songwriter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #1A1A1A 0%, #0D0D0D 50%, #1E3A0F 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(200, 150, 62, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(45, 80, 22, 0.12) 0%, transparent 40%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          <div
            style={{
              width: 80,
              height: 3,
              background: "#C8963E",
              marginBottom: 32,
              borderRadius: 2,
            }}
          />

          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#C8963E",
              fontFamily: "Georgia, serif",
              letterSpacing: "8px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Official Website
          </div>

          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#FAF7F2",
              fontFamily: "Georgia, serif",
              letterSpacing: "-1px",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            Rollin Brummette
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "#9CA3AF",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Americana Singer-Songwriter
          </div>

          <div
            style={{
              width: 80,
              height: 3,
              background: "#C8963E",
              marginTop: 32,
              borderRadius: 2,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: "#6B7280",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "2px",
            }}
          >
            rollinbrummette.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
