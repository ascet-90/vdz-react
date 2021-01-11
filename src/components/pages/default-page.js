import {useState, useEffect} from 'react';
import Sidebar from '../sidebar';
import {withFetchProductsService} from '../hoc-helpers';
import {FormWidget} from '../widgets';
import widgetFormBg from '../../img/sidebar-form-bg.png';

const DefaultPage = ({getCategories, getSubCategories}) => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		getCategories().then(categories => setCategories(categories));
	}, [getCategories]);
	useEffect(() => {
		document.body.classList.add('page-template-default');
		return () => document.body.classList.remove('page-template-default');
	}, []);

	const widgetStyle = {
		backgroundImage: `url(${widgetFormBg})`,
		backgroundPosition: '150% 120%'
	};

	return (
		<div className="main default_page">
			<div className="container">
				<Sidebar categories={categories}>
					<FormWidget style={widgetStyle} title="Закажите расчет стоимости материалов" submitText="Заказать звонок"/>
				</Sidebar>
			</div>			
		</div>
	);
};

const mapMethodsToProps = productsService => {
	return {
		getCategories: productsService.getCategories
	};
};

export default withFetchProductsService(mapMethodsToProps)(DefaultPage);