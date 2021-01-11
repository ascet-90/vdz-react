import FetchProductsContext from '../fetch-products-context';
import {useContext} from 'react';

const withFetchProductsService = mapMethodsToProps => Component => {
	return props => {
		const productsService = useContext(FetchProductsContext);
		const serviceProps = mapMethodsToProps(productsService);
		return (
			<Component {...props} {...serviceProps}/>
		);
	}
};

export default withFetchProductsService;