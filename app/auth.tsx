import React, { createContext, useState, useContext } from 'react';

interface AuthContextProps {
    currentUser: any;
    setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
}

interface AuthProviderProps {
    user: any;
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);


export const AuthProvider: React.FC<AuthProviderProps> = ({ user, children }) => {
    const [currentUser, setCurrentUser] = useState(user);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

