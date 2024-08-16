import "./style.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="page">
          {children}
      </body>
    </html>
  );
}
