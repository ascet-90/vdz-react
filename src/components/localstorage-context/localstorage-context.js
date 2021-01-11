import React from 'react';

const LocalStorageContext = React.createContext();

const {
	Provider: LocalStorageContextProvider, 
	Consumer: LocalStorageContextConsumer
} = LocalStorageContext;

export {
	LocalStorageContextProvider,
	LocalStorageContextConsumer
};

export default LocalStorageContext;