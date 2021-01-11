import {useState, useEffect, useMemo, useRef} from 'react';
import Sidebar from '../sidebar';
import {FormWidget} from '../widgets';
import {withFetchProductsService} from '../hoc-helpers';
import {Link, useHistory, useLocation} from 'react-router-dom';
import productArrow from '../../img/product-arrow.png';
import {number_format} from '../../helper-functions';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Loader from '../loader';
import SpecialOffers from '../special-offers';
import CatalogDescription from '../catalog/catalog-description';
import MapContainer from '../map-container';
import Calculate from '../calculate';
import widgetFormBg from '../../img/sidebar-form-bg.png';
import PropTypes from 'prop-types';
import Breadcrumbs from '../breadcrumbs';

const CatalogArchive = ({getSubCategories, getCategories, getCategoryBySlug, getAllProducts, postForm, match, onOrderModalToggle}) => {
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState({});
	const [subCategories, setSubCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [selectOptions, setSelectOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState('');
	const [loading, setLoading] = useState(false);
	const formRef = useRef(null);
	const [formSent, setFormSent] = useState(false);
	const mounted = useRef(true);
	const [categoryFound, setCategoryFound] = useState(true);
	const history = useHistory();
	const {search} = useLocation();
	const [subCategoriesLoaded, setSubCategoriesLoaded] = useState(false);

	const optionsDomkomplekt = useMemo(() => [
		{value: "orderby=date&order=desc", label: "Дата: по убыванию"},
		{value: "orderby=date&order=asc", label: "Дата: по возрастанию"},
		{value: "orderby=price&order=desc", label: "Цена: по убыванию"},
		{value: "orderby=price&order=asc", label: "Цена: по возрастанию"},
		{value: "orderby=area&order=desc", label: "Площадь: по убыванию"},
		{value: "orderby=area&order=asc", label: "Площадь: по возрастанию"}
	], []);
	const optionsDoska = useMemo(() => [
		{value: "orderby=date&order=desc", label: "Дата: по убыванию"},
		{value: "orderby=date&order=asc", label: "Дата: по возрастанию"},
		{value: "orderby=price&order=desc", label: "Цена: по убыванию"},
		{value: "orderby=price&order=asc", label: "Цена: по возрастанию"}
	], []);

	useEffect(() => {		
		return () => mounted.current = false;
	}, []);

	useEffect(() => {		
		if(category.type === 'doska')	{
			setSelectOptions(optionsDoska);
		} else if(category.type === 'domkomplekt') {
			setSelectOptions(optionsDomkomplekt);			
		}		
	}, [category, optionsDomkomplekt, optionsDoska]);

	useEffect(() => {
		if(search) {
			setSelectedOption(search.replace(/^\?/, ''));
		} else
			setSelectedOption('');
	}, [search]);

	useEffect(() => {
		let cancelled = false;
		getCategories().then(categories => {
			if(!cancelled) setCategories(categories);
		});		
		async function populateData() {
			const category = await getCategoryBySlug(match.params.slug);
			if(category.id && !cancelled) {
				document.title = category.name;
				setCategoryFound(true);
				setCategory(category);
				const subCategories = await getSubCategories(category.id);
				if(!cancelled) {
					setSubCategories(subCategories);
					setSubCategoriesLoaded(true);
				}
			} else if (!category.id) {
				setCategoryFound(false);
			}
		};			
		populateData();
		return () => {
			cancelled = true;
			setLoading(false);
			setCategoryFound(true);
			setProducts([]);
			setSubCategoriesLoaded(false);
		};
	}, [getCategories, getCategoryBySlug, getSubCategories, match.params.slug, getAllProducts]);

	const useProducts = (selectedOption, subCategoriesLoaded) => {	
		useEffect(() => {
			let cancelled = false;
			if(subCategoriesLoaded) {
				const categoriesIds = subCategories.map(cat => cat.id);
				setLoading(true);
				getAllProducts([category.id, ...categoriesIds], selectedOption).then(products => {
					setLoading(false);
					if(!cancelled) {
						setProducts(products);
						cancelled = true;
					}
				});
			}			
			return () => cancelled = true;
		}, [selectedOption, subCategoriesLoaded]);
	};

	useProducts(selectedOption, subCategoriesLoaded);

	const handleChange = e => {
		setSelectedOption(e.target.value);
		history.push(`?${e.target.value}`);
	};

	const renderSubcategories = subCategories => {
		return (
			<div className="catalog_list d-flex">
				{subCategories.map(subCategory => {
					return (
						<div key={subCategory.id} id={subCategory.id} className="product">
							<Link to={subCategory.link}>
								<div className="product_title d-flex">
									<span>{subCategory.name}</span>
									<div className="product_link d-flex">
										<img alt="product-arrow" src={productArrow}/>
									</div>
								</div>
								<div className="product_thumb d-flex">
									{subCategory.thumbnail && <img alt="" src={subCategory.thumbnail}/>}
								</div>								
							</Link>
						</div>
					);
				})}
			</div>			
		);
	};

	const renderProducts = products => {		
		return (
			<div className="similar_products">
				<div className="products_sort_wrap d-flex">
					<div className="products_sort d-flex">
						<span>Сортировка</span>
						<FormControl className="sort_dropdown">
							<InputLabel id="choose-products-label">Выбрать</InputLabel>
			        <Select
			          labelId="choose-products-label"
			          id="choose-products"
			          value={selectedOption}
			          onChange={handleChange}>
			          {selectOptions.map((option) => (
			            <MenuItem key={option.label} value={option.value} >
			              {option.label}
			            </MenuItem>
			          ))}
			        </Select>
		        </FormControl>		        
					</div>
				</div>
				{loading && <Loader/>}
				{!loading &&
					<div className="similar_products_list d-flex">		
						{products.map(product => {
							return (
								<div className="similar_product d-flex" key={product.id}id={product.id}>
									<div className="thumb">
										<Link to={product.link}>
											{product.thumbnail && <img alt="" src={product.thumbnail}/>}
											<span className="price">{product.price ? number_format(product.price, 0, '.', ' ') : 0} руб.</span>
										</Link>
									</div>
									<div className="title">
										<Link to={product.link}>
											{product.name}
										</Link>
									</div>
									<Link className="more" to={product.link}>Подробнее</Link>
								</div>
							);
						})}					
					</div>
				}
			</div>
		);
	};

	const onSubmit = e => {
		setFormSent(false);				
		const formData = new FormData(formRef.current);
		postForm(formData).then(data => {
			if(data.status === 'ok' && mounted.current) {
				setFormSent(true);
			}
		});
	};

	const widgetStyle = {
		backgroundImage: `url(${widgetFormBg})`,
		backgroundPosition: '150% 120%'
	};

	return (
		<div className="main catalog_archive_page">
			<div className="container">
				<Breadcrumbs category={category}/>
				<div className="catalog_archive_wrap d-flex">
					<Sidebar categories={categories}>
						<FormWidget style={widgetStyle} title="Закажите расчет стоимости материалов" submitText="Заказать звонок"/>
					</Sidebar>
					<div className="content">
						{
							!categoryFound && <h1 className="catalog_archive_title">Не удалось найти данную категорию товара</h1>
						}
						<h1 className="catalog_archive_title">{category.name}</h1>
						{subCategories.length > 0 && renderSubcategories(subCategories)}			
						{loading && products.length === 0 && <Loader/>}
						{products.length > 0 && renderProducts(products)}
					</div>
				</div>
			</div>
			<SpecialOffers/>
			<CatalogDescription catalog={category}/>
			<Calculate ref={formRef} onSubmit={onSubmit} formSent={formSent}/>
			<MapContainer onModalToggle={onOrderModalToggle}/>
		</div>
	);
};

const mapMethodsToProps = productsService => {
	return {
		getCategories: productsService.getCategories,
		getSubCategories: productsService.getSubCategoriesForCategory,
		getCategoryBySlug: productsService.getCategoryBySlug,
		getAllProducts: productsService.getAllProductsForCategories,
		postForm: productsService.postForm
	};
};

CatalogArchive.propTypes = {
	getSubCategories: PropTypes.func.isRequired,
	getCategories: PropTypes.func.isRequired,
	getCategoryBySlug: PropTypes.func.isRequired,
	getAllProducts: PropTypes.func.isRequired,
	postForm: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			slug: PropTypes.string
		})
	}).isRequired,
	onOrderModalToggle: PropTypes.func.isRequired
};

export default withFetchProductsService(mapMethodsToProps)(CatalogArchive);