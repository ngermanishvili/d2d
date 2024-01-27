interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  return <div className="">{children}</div>;
};

export default ProtectedLayout;
