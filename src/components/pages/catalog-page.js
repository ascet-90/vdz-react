import {useState, useEffect, useRef} from 'react';
import Catalog from '../catalog';
import {withFetchProductsService} from '../hoc-helpers';
import SpecialOffers from '../special-offers';
import Pilomaterials from '../pilomaterials';
import Calculate from '../calculate';
import MapContainer from '../map-container';
import PropTypes from 'prop-types';
import Breadcrumbs from '../breadcrumbs';

const CatalogPage = ({getCategories, postForm, onOrderModalToggle}) => {
	const [categories, setCategories] = useState([]);
	const mounted = useRef(true);
	const formRef = useRef(null);
	const [formSent, setFormSent] = useState(false);

	useEffect(() => {
		return () => mounted.current = false;
	}, []);

	useEffect(() => {		
		getCategories().then(categories => {
			if(mounted.current) setCategories(categories);
		});
	}, [getCategories]);

	const onSubmit = e => {
		setFormSent(false);				
		const formData = new FormData(formRef.current);
		postForm(formData).then(data => {
			if(data.status === 'ok' && mounted.current) {
				setFormSent(true);
			}
		});
	};

	return (
		<div className="main catalog_archive">
			<div className="container">
				<Breadcrumbs/>
			</div>
			<Catalog categories={categories}/>
			<SpecialOffers />
			<Pilomaterials />
			<Calculate ref={formRef} onSubmit={onSubmit} formSent={formSent}/>
			<MapContainer onModalToggle={onOrderModalToggle}/>
		</div>
	);
};

CatalogPage.propTypes = {
	getCategories: PropTypes.func.isRequired,
	postForm: PropTypes.func.isRequired,
	onOrderModalToggle: PropTypes.func
};

const mapMethodsToProps = productsService => {
	return {
		getCategories: productsService.getCategories,
		postForm: productsService.postForm
	};
};

export default withFetchProductsService(mapMethodsToProps)(CatalogPage);