export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=./ca/" />
      <p style={{ padding: "2rem", textAlign: "center" }}>
        Redirigint-te a la versió en català…{" "}
        <a href="./ca/" style={{ color: "#0A0A0A", textDecoration: "underline" }}>
          Continua →
        </a>
      </p>
    </>
  );
}
