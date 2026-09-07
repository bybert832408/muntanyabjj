import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body className="bg-offwhite text-ink antialiased">{children}</body>
    </html>
  );
}
