import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Arnav Gupta — Hardware & Embedded Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#05050f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Aurora top-left */}
        <div
          style={{
            position: "absolute",
            top: -150,
            left: -150,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(16,185,129,0.28) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Aurora top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -200,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(5,150,105,0.18) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
          <p style={{ color: "#34d399", fontSize: 22, margin: 0, marginBottom: 18, fontFamily: "monospace", letterSpacing: "0.12em" }}>
            // portfolio
          </p>

          <h1 style={{ color: "white", fontSize: 100, fontWeight: 800, margin: 0, lineHeight: 1, letterSpacing: "-2px" }}>
            Arnav Gupta
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 28,
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 100,
              padding: "10px 22px",
              width: "fit-content",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
            <p style={{ color: "#4ade80", fontSize: 22, margin: 0 }}>
              Hardware Design Engineering Intern @ Geoanalysis Engineering
            </p>
          </div>

          <p style={{ color: "#71717a", fontSize: 24, margin: 0, marginTop: 20 }}>
            Third-Year Mechatronics &amp; Robotics Engineering · University of Alberta
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 36 }}>
            {["PCB Design", "Embedded Systems", "UAARG", "ARVP", "Altium"].map((tag) => (
              <div
                key={tag}
                style={{
                  border: "1px solid rgba(16,185,129,0.3)",
                  background: "rgba(16,185,129,0.08)",
                  borderRadius: 8,
                  padding: "8px 18px",
                  color: "#34d399",
                  fontSize: 20,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
