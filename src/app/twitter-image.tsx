import { ImageResponse } from "next/og";

export const alt = "Rollin Brummette - Americana Singer-Songwriter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
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
              "radial-gradient(circle at 30% 40%, rgba(200, 150, 62, 0.1) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#C8963E",
              fontFamily: "Georgia, serif",
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            RB
          </div>

          <div
            style={{
              fontSize: 64,
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
              width: 60,
              height: 2,
              background: "#C8963E",
              marginBottom: 16,
              borderRadius: 1,
            }}
          />

          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "#9CA3AF",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Music &bull; Shows &bull; Videos
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
