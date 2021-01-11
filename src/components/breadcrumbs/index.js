import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {withFetchProductsService} from '../hoc-helpers';

const Breadcrumbs = ({getCategoryById, getProductCategories, category, product}) => {
	const {pathname} = useLocation();
	const [catBreadcrumbs, setCatBreadcrumbs] = useState([]);
	const [productCategories, setProductCategories] = useState([]);

	const paths = [
		{to: "/production", name: "Производство"},
		{to: "/catalog", name: "Каталог"},
		{to: "/payment-delivery", name: "Оплата и доставка"},
		{to: "/credit", name: "Кредит"},
		{to: "/construction", name: "Строительство"},
		{to: "/contacts", name: "Контакты"},
		{to: "/cart", name: "Корзина"},
		{to: "/privacy-policy", name: "Политика конфиденциальности"}
	];

	useEffect(() => {
		let cancelled = false;
		if(category){
			let parentCatId = category.parent_id;
			async function getParentCategories() {
				const catBreadcrumbsNew = [];
				while(parentCatId) {					
					const cat = await getCategoryById(parentCatId);		
					catBreadcrumbsNew.push(<Link key={cat.id} to={cat.slug}> » {cat.name}</Link>);
					parentCatId = cat.parent_id;
				}
				if(!cancelled) {
					setCatBreadcrumbs(catBreadcrumbs => {						
						return catBreadcrumbsNew.reverse();
					});
				}
			};	
			getParentCategories();
		}
		return () => {
			cancelled = true;
			setCatBreadcrumbs([]);
		};
	}, [category, getCategoryById]);

	useEffect(() => {
		let cancelled = false;		
		if(product && product.id){
			async function getProdCategories() {
				const categories = await getProductCategories(product.id); 
				let parentCatId = categories[0].parent_id;			
				const prodCategoriesNew = [<Link key={categories[0].id} to={categories[0].link}> » {categories[0].name}</Link>];
				while(parentCatId) {
					const cat = await getCategoryById(parentCatId);		
					prodCategoriesNew.push(<Link key={cat.id} to={cat.link}> » {cat.name}</Link>);				
					parentCatId = cat.parent_id;
				}	
				if(!cancelled) {
					setProductCategories(prodCategories => {						
						return prodCategoriesNew.reverse();
					});
				}				
			};
			getProdCategories();		
		}
		return () => {
			cancelled = true;
			setProductCategories([]);
		};
	}, [product, getProductCategories, getCategoryById]);

	const currentPath = paths.find(path => path.to === pathname);

	if(pathname !== '/') {
		return (			
			<div className="breadcrumbs">
				<Link to="/"><span>Главная</span></Link>	
				{currentPath && <span> » {currentPath.name}</span>}
				{(!currentPath && category) && (
					<span>
						{catBreadcrumbs}
						<span> » {category.name}</span>						
					</span>	
				)}
				{(!currentPath && product) && (
					<span>
						{productCategories}
						<span> » {product.name}</span>
					</span>
				)}
			</div>
		);
	}
	return null;	
};

const mapMethodsToProps = productsService => {
	return {
		getCategoryById: productsService.getCategoryById,
		getProductCategories: productsService.getProductCategories
	};
};

export default withFetchProductsService(mapMethodsToProps)(Breadcrumbs);