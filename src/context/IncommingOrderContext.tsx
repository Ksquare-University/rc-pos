import { createContext, useState, useContext, useEffect } from "react";
import React from 'react';
import socket from '../utils/socket';

type Props = {
    children: JSX.Element;
}

interface DataContextType {
    isIncommingOrder: boolean;
    setIsIncommingOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

let DataContext = createContext<DataContextType>({} as DataContextType);

export function DataContextProvider({ children }: Props) {
    const [isIncommingOrder, setIsIncommingOrder] = useState(false);
    const [mins, setMinutes] = useState(0);
    const [secs, setSeconds] = useState(10);

    useEffect(() => {
        socket.on("incommingOrder", (data) => {
            setIsIncommingOrder(true);
            console.log(data);

            let sampleInterval = setInterval(() => {
                if (secs > 0) {
                    setSeconds(secs - 1);
                }
                if (secs === 0) {
                    if (mins === 0) {
                        clearInterval(sampleInterval);
                    } else {
                        setMinutes(mins - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);



            return () => {
                clearInterval(sampleInterval);
            };
        })
    }, [socket]);


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