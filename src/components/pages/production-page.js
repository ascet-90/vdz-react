import {useState, useEffect, useRef} from 'react';
import Sidebar from '../sidebar';
import {withFetchProductsService} from '../hoc-helpers';
import {Banner, FormWidget} from '../widgets';
import bannerImg from '../../img/banner-1.png';
import Loader from '../loader';
import PhotoGallery from '../photo-gallery';
import videoImg from '../../img/video-1.png';
import ModalVideo from 'react-modal-video';
import MapContainer from '../map-container';
import widgetFormBg from '../../img/sidebar-form-bg.png';
import PropTypes from 'prop-types';
import Breadcrumbs from '../breadcrumbs';

const ProductionPage = ({getCategories, getGalleryPhotos, onOrderModalToggle}) => {
	const [categories, setCategories] = useState([]);		
	const [galleryPhotos, setGalleryPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [openedVideo, setOpenedVideo] = useState(false);
	const mounted = useRef(true);

	useEffect(() => {
		return () => mounted.current = false;
	}, []);

	const videos = [
		{
			videoId: "1iixR-c9sYw",
			videoThumbnail: videoImg
		},
		{
			videoId: "3sDNV_J82rw",
			videoThumbnail: videoImg
		}
	];

	useEffect(() => {
		getCategories().then(categories => {
			if(mounted.current) setCategories(categories);
		});
	}, [getCategories]);
	useEffect(() => {
		setLoading(true);
		getGalleryPhotos().then(gallery => {
			if(mounted.current) {
				setLoading(false);
				setGalleryPhotos(gallery);
			}			
		});
	}, [getGalleryPhotos]);

	const onVideoOpen = (e, videoId) => {
  	e.preventDefault();
  	document.body.style.overflowY = 'hidden';
  	setOpenedVideo(videoId);
  };

  const renderVideos = videos => {
  	return videos.map(({videoId, videoThumbnail}) => {
  		return (
  			<div className="video_wrap" key={videoId}>
					<div className="video_link">
						<ModalVideo channel="youtube" autoplay videoId={videoId} isOpen={openedVideo === videoId} onClose={() => {
							document.body.style.overflowY = 'auto';
							setOpenedVideo(false);
						}}/>
						<a href={`https://www.youtube.com/embed/${videoId}`} onClick={e => onVideoOpen(e, videoId)}><img alt="about-video-bg" src={videoThumbnail}/></a>
					</div>
				</div>
  		);
  	});
  };

  const widgetStyle = {
		backgroundImage: `url(${widgetFormBg})`,
		backgroundPosition: '150% 120%'
	};

	return (
		<div className="main production_page">
			<div className="container">
				<Breadcrumbs/>						
				<div className="catalog_single_wrap d-flex">
					<Sidebar categories={categories}>
						<Banner imageURL={bannerImg}/>
						<FormWidget style={widgetStyle} title="Закажите расчет стоимости материалов" submitText="Заказать звонок"/>
					</Sidebar>
					<div className="content">	
						<h1 className="section_title">Наше производство</h1>
						<div className="description">
							<p>Важными составляющими при возведении и ремонте зданий являются пиломатериалы. 
							Древесина – наиболее натуральный, экологически безопасный материал, при правильной подготовке рассчитанный на длительный срок службы. 
							Зная об этом, специалисты Воскресенского деревообрабатывающего завода осуществляют полный контроль над процессом ее заготовки. 
							Наши пиломатериалы от производителя – богатый ассортимент всевозможных товарных позиций. Здесь легко купить пиломатериалы для любой строительной задачи: 
							брус, доска, блок-хаус, фанера, OSB, вагонка, домокомплекты, двери, оконные рамы.</p>
						</div>		
						<div className="media_block">
							<div className="videos d-flex">
								{renderVideos(videos)}
							</div>
							{!loading && 
								<PhotoGallery photos={galleryPhotos}/>
				      }
				      {loading && <Loader/>}
			      </div>
					</div>
				</div>
			</div>
			<section className="production_text_wrap">
				<div className="container">
					<div className="section_title">Заголовок</div>
					<div className="production_text">
						<p>Важными составляющими при возведении и ремонте зданий являются пиломатериалы. 
							Древесина – наиболее натуральный, экологически безопасный материал, при правильной подготовке рассчитанный на длительный срок службы. 
							Зная об этом, специалисты Воскресенского деревообрабатывающего завода осуществляют полный контроль над процессом ее заготовки. 
							Наши пиломатериалы от производителя – богатый ассортимент всевозможных товарных позиций. Здесь легко купить пиломатериалы для любой строительной задачи: 
							брус, доска, блок-хаус, фанера, OSB, вагонка, домокомплекты, двери, оконные рамы.</p>
					</div>
				</div>		
			</section>
			<MapContainer onModalToggle={onOrderModalToggle}/>
		</div>
	);
};

const mapMethodsToProps = productsService => {
	return {
		getCategories: productsService.getCategories,
		getGalleryPhotos: productsService.getProductionPageGallery
	};
};

ProductionPage.propTypes = {
	getCategories: PropTypes.func.isRequired,
	getGalleryPhotos: PropTypes.func.isRequired,
	onOrderModalToggle: PropTypes.func.isRequired
};

export default withFetchProductsService(mapMethodsToProps)(ProductionPage);