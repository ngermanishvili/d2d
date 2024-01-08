

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-black ">
            {children}
        </div>
    );
}

export default ProtectedLayout;