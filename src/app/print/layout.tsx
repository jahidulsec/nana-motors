import "./style.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="page">
          {children}
      </div>
    </>
  );
}
