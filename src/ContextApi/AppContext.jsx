import { createContext, useState } from 'react';
import React from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [bookStateAppContext, setBookStateAppContext] = useState([]);

    return (
        <AppContext.Provider
            value={{ bookStateAppContext, setBookStateAppContext }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
