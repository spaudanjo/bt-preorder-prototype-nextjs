import react from "React"; 

interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({children}: LayoutProps) => {
    return (
        <div>
            <h1>Hello Next.js</h1>
            {children}
        </div>
    );
}

export default Layout;