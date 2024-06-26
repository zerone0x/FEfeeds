export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout bg-[#BEFAF8] flex h-screen justify-between flex-1">
      <main>{children}</main>
    </div>
  );
}
