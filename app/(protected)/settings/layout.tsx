
interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="bg-black w-full">


            {children}

        </div>
    );
}

export default ProtectedLayout;