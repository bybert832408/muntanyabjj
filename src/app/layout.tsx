import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body className="bg-mbjj-black text-white antialiased">{children}</body>
    </html>
  );
}
