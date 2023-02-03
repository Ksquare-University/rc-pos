import { createContext, useState, useContext, useEffect } from 'react';
import React from 'react';
import socket from '../utils/socket';

type Props = {
  children: JSX.Element;
};

interface DataContextType {
  isIncommingOrder: boolean;
  setIsIncommingOrder: React.Dispatch<React.SetStateAction<boolean>>;
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  restaurantId: number;
  setRestaurantId: React.Dispatch<React.SetStateAction<number>>;
  ordersList: {}[];
  setOrdersList: React.Dispatch<React.SetStateAction<{}[]>>;
}

let DataContext = createContext<DataContextType>({} as DataContextType);

export function DataContextProvider({ children }: Props) {

  // State variables
  const [isIncommingOrder, setIsIncommingOrder] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [restaurantId, setRestaurantId] = useState(0);
  const [ordersList, setOrdersList] = useState([{}]);

  // Hook to manage the web socket that listen if there is an incomming order
  useEffect(() => {
    socket.on('incommingOrder', () => {
      setIsIncommingOrder(true);

    });
  }, [socket]);

  // Values that will be availables in the context
  let value = {
    isIncommingOrder,
    setIsIncommingOrder,
    userToken,
    setUserToken,
    restaurantId,
    setRestaurantId,
    ordersList,
    setOrdersList,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Custom hook to use the data of the context
export function useDataContext() {
  return useContext(DataContext);
}
