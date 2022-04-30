import react from "React"; 

interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({children}: LayoutProps) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default Layout;