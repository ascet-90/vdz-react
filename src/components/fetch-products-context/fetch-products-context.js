import React from 'react';

const FetchProductsContext = React.createContext();

const {
	Provider: FetchProductsContextProvider, 
	Consumer: FetchProductsContextConsumer
} = FetchProductsContext;

export {
	FetchProductsContextProvider,
	FetchProductsContextConsumer
};

export default FetchProductsContext;