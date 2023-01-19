import { createContext, useState, useContext } from "react";
import React from 'react'
type Props = {
    children: JSX.Element;
}

interface DataContextType {
    isIncommingOrder: boolean;
    setIsIncommingOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

let DataContext = createContext<DataContextType>({} as DataContextType);

export function DataContextProvider({ children }: Props) {
    const [isIncommingOrder, setIsIncommingOrder] = useState(true);

    let value = { isIncommingOrder, setIsIncommingOrder };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export function useDataContext() {
    return useContext(DataContext);
}