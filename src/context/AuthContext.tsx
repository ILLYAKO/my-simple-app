import { createContext, useContext, useState } from "react";

type AuthContextType = {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useIsAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useIsAuth must be used inside AuthProvider");
    }
    return context;
}
