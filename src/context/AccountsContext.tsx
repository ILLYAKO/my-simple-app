import { createContext, useContext, useState } from "react";

type AccountsContextType = {
    accounts: any;
    setAccounts: React.Dispatch<React.SetStateAction<any>>;
};


const AccountsContext = createContext<AccountsContextType | null>(null);


export function AccountsProvider({ children }: { children: React.ReactNode }) {
    const [accounts, setAccounts] = useState<any>(null);

    return (
        <AccountsContext.Provider value={{ accounts, setAccounts }}>
            {children}
        </AccountsContext.Provider>
    );
}



export function useAccounts() {
    const context = useContext(AccountsContext);

    if (!context) {
        throw new Error("useAccounts must be used inside AccountsProvider");
    }

    return context;
}
