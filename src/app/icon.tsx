import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D0D0D",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#C8963E",
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          R
        </div>
      </div>
    ),
    { ...size }
  );
}
