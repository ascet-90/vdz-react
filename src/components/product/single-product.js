import {useState, useEffect, useRef} from 'react';
import {withFetchProductsService} from '../hoc-helpers';
import SingleProductDoska from './single-product-doska';
import SingleProductDomkomplekt from './single-product-domkomplekt';
import Sidebar from '../sidebar';
import {FormWidget, Banner} from '../widgets';
import bannerImg from '../../img/banner-1.png';
import PropTypes from 'prop-types';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.min.css';
import Calculate from '../calculate';
import SpecialOffers from '../special-offers';
import MapContainer from '../map-container';
import Loader from '../loader';
import DescriptionGallery from './description-gallery';
import SimilarProducts from './similar-products';
import widgetFormBg from '../../img/sidebar-form-bg.png';
import Breadcrumbs from '../breadcrumbs';
 
const SingleProduct = ({match, getCategories, getProduct, getSimilarProducts, postForm, onOrderModalToggle}) => {
	const [categories, setCategories] = useState([]);	
	const [product, setProduct] = useState({});
	const [similarProducts, setSimilarProducts] = useState([]);
	const [isVideoOpen, setVideoOpen] = useState(false);	
	const formRef = useRef(null);
	const [formSent, setFormSent] = useState(false);
	const mounted = useRef(true);
	const [isSimilarLoading, setSimilarLoading] = useState(false);
	const [productFound, setProductFound] = useState(true);

	useEffect(() => {
		getCategories().then(categories => {
			if(mounted.current) setCategories(categories);			
		});
	}, [getCategories]);
	useEffect(() => {
		let cancelled = false;
		async function getData() {
			const prod = await getProduct(match.params.slug);
			if(prod.id && !cancelled) {
				setProduct(prod);
				document.title = prod.name;
				setSimilarLoading(true);
				const products = await getSimilarProducts(prod.id);
				if(!cancelled) {
					setSimilarProducts(products);
					setSimilarLoading(false);
				}
			} else if(!prod.id) {
				setProductFound(false);
			}
		};
		getData();
		return () => {
			setProductFound(true);
			cancelled = true;
		}
	}, [match.params.slug, getProduct, getSimilarProducts]);
	useEffect(() => {
		return () => mounted.current = false;
	}, []);

	const onVideoOpen = e => {
  	e.preventDefault();
  	document.body.style.overflowY = 'hidden';
  	setVideoOpen(true);
  };   

  const onSubmit = e => {
		setFormSent(false);				
		const formData = new FormData(formRef.current);
		setTimeout(() => {
			postForm(formData).then(data => {
			if(data.status === 'ok' && mounted.current) {
				setFormSent(true);
			}
		});
		}, 2000);
	};

	const {product_type} = product;

	const widgetStyle = {
		backgroundImage: `url(${widgetFormBg})`,
		backgroundPosition: '150% 120%'
	};

	return (		
		<div className={`main catalog_single_page ${product_type}`}>
			<div className="container">
				<Breadcrumbs product={product}/>
				<div className="catalog_single_wrap d-flex">
					<Sidebar categories={categories}>
						<FormWidget style={widgetStyle} title="Закажите расчет стоимости материалов" submitText="Заказать звонок"/>
						<Banner imageURL={bannerImg}/>
					</Sidebar>
					<div className="content">
						{
							!productFound && <h1 className="catalog_single_title not_found">Не удалось найти данный продукт</h1>
						}
						{
							product_type === 'doska' ? <SingleProductDoska product={product}/> : 
							(product_type === 'domkomplekt' ? <SingleProductDomkomplekt product={product}/> : null)
						}						
						<div className="media_block d-flex">
							{product.video_id && 
								<div className="video_wrap">
									<div className="video_link">
										<ModalVideo channel="youtube" autoplay videoId={product.video_id} isOpen={isVideoOpen} onClose={() => {
											document.body.style.overflowY = 'auto';
											setVideoOpen(false);
										}}/>
										<a href={`https://www.youtube.com/embed/${product.video_id}`} onClick={onVideoOpen}><img alt="video-preview" src={product.video_preview}/></a>
									</div>
								</div>
							}		
							<div className="media_gallery d-flex">
								{
									product.description_gallery && <DescriptionGallery gallery={product.description_gallery}/>
								}
							</div>		
						</div>
						{
							(similarProducts.length > 0 && !isSimilarLoading) && <SimilarProducts products={similarProducts}/>
						}
						{	isSimilarLoading && <Loader/>	}
					</div>
				</div>
			</div>			
			{product_type === 'doska' && <SpecialOffers/>}
			<Calculate ref={formRef} onSubmit={onSubmit} formSent={formSent}/>
			<MapContainer onModalToggle={onOrderModalToggle}/>
		</div>
	);
};

const mapMethodsToProps = productsService => {
	return {
		getCategories: productsService.getCategories,
		getProduct: productsService.getProduct,
		postForm: productsService.postForm,
		getSimilarProducts: productsService.getSimilarProducts
	};
};	

SingleProduct.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			slug: PropTypes.string
		})
	}).isRequired,
	getCategories: PropTypes.func.isRequired,
	getProduct: PropTypes.func.isRequired,
	postForm: PropTypes.func.isRequired,
	onOrderModalToggle: PropTypes.func.isRequired
};

export default withFetchProductsService(mapMethodsToProps)(SingleProduct);