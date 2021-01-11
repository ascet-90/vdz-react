import {withFetchProductsService} from '../hoc-helpers';
import {useState, useEffect, useRef} from 'react';
import mouse from '../../img/mouse.png';
import frontVideo from '../../videos/front-video.mp4';
import catalogBg from '../../img/catalog-bg.png';
import aboutVideoBg from '../../img/about-video-bg.png';
import certificate from '../../img/certificate.png';
import sendOrderBg from '../../img/send-order-bg.png';
import sendOrderTextBg from '../../img/send-order-bg-1.png';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.min.css';
import SpecialOffers from '../special-offers';
import Catalog from '../catalog';
import {Modal} from '../modals';
import Pilomaterials from '../pilomaterials';
import Advantages from '../advantages';
import MapContainer from '../map-container';
import PropTypes from 'prop-types';

const HomePage = ({getCategories, onOrderModalToggle}) => {
	const [isVideoOpen, setVideoOpen] = useState(false);
	const [categories, setCategories] = useState([]);
	const [showModalCalculate, setShowModalCalculate] = useState(false);
	const mounted = useRef(true);

	useEffect(() => {
		return () => mounted.current = false;
	}, []);

	useEffect(() => {		
		getCategories().then(categories => {
			if(mounted.current) setCategories(categories);
		});
	}, [getCategories]);

  const onVideoOpen = e => {
  	e.preventDefault();
  	document.body.style.overflowY = 'hidden';
  	setVideoOpen(true);
  };
  const onModalToggle = () => setShowModalCalculate(show => !show);

  const certificates = [
  	{
  		id: 1,
  		text: 'Все Строительные Материалы Прошли Контроль Качества и Сертифицированы',
  		image: certificate
  	},
  	{
  		id: 2,
  		text: 'Все Строительные Материалы Прошли Контроль Качества и Сертифицированы',
  		image: certificate
  	}
  ]; 

	return (
		<div className="main front_page">
			<section className="top_section">
				<div className="top_section_bg">
					<div className="container">
						<div className="scroll_down d-flex">
							<span>Листайте вниз</span>
							<span className="border"></span>
							<img alt="mouse" src={mouse}/>						
						</div>
					</div>				
					<video id="front-video" autoPlay={true} loop={true} muted={true}>
						<source type="video/mp4" src={frontVideo}/>
					</video>			
				</div>
				<div className="container">
					<div className="title_wrap">
						<h1 className="top_section_title">Деревообрабатывающий завод полного цикла</h1>
						<div className="top_section_subtitle">От лесозаготовки до производства и строительства жилых домов</div>
					</div>				
				</div>			
			</section>
			<section className="about_company">
				<div className="container">
					<div className="title_bg">О компании</div>
					<div className="about_company_wrap d-flex">
						<div className="video_wrap">
							<div className="video_link">
								<ModalVideo channel="youtube" autoplay videoId="1iixR-c9sYw" isOpen={isVideoOpen} onClose={() => {
									document.body.style.overflowY = 'auto';
									setVideoOpen(false);
								}}/>
								<a href="https://www.youtube.com/embed/1iixR-c9sYw" onClick={onVideoOpen}><img alt="about-video-bg" src={aboutVideoBg}/></a>
							</div>
							<span className="video_text">Посмотрите видео о нашей компании</span>
						</div>
						<div className="about_company_text_wrap">
							<h2 className="section_title">О компании</h2>
							<div className="text">Важными составляющими при возведении и ремонте зданий являются пиломатериалы. Древесина – наиболее натуральный, экологически безопасный материал, при правильной подготовке рассчитанный на длительный срок службы. Зная об этом, специалисты Воскресенского деревообрабатывающего завода осуществляют полный контроль над процессом ее заготовки. Наши пиломатериалы от производителя – богатый ассортимент всевозможных товарных позиций. Здесь легко купить пиломатериалы для любой строительной задачи: брус, доска, блок-хаус, фанера, OSB, вагонка, домокомплекты, двери, оконные рамы.</div>
						</div>
					</div>				
				</div>
			</section>
			<SpecialOffers/>
			<Catalog bgImage={catalogBg} bgTitle={"Каталог"} categories={categories}>
				<div className="certificates d-flex">
					{certificates.map(certificate => {
						return (
							<div className="cert_item d-flex" key={certificate.id}>
								{certificate.image && <img alt="certificate" src={certificate.image}/>}
								<div className="cert_text"><p>{certificate.text}</p></div>
							</div>
						);
					})}				
				</div>
			</Catalog>
			<section className="send_order">
				<div className="send_order_bg">
					<img alt="send-order-bg" src={sendOrderBg}/>
				</div>
				<div className="container">
					<div className="send_order_content" style={{backgroundImage: `url(${sendOrderTextBg})`}}>
						<h2 className="section_title">Отправьте заявку на расчет стоимости</h2>
						<div className="send_order_text">
							Наш менеджер свяжется с вами в ближайшее время для уточнения деталей заказа
						</div>
						<button className="order_call" onClick={onModalToggle}>Заказать звонок</button>
						<Modal 
							id="modalCalculate"
							formTitle="Заказать расчет" 
							formSubtitle="Закажите расчет стоимости материалов" 
							submitText="Заказать расчет" 
							show={showModalCalculate} 
							onShowToggle={onModalToggle}/>
					</div>
				</div>
			</section>
			<Pilomaterials/>
			<Advantages/>
			<MapContainer onModalToggle={onOrderModalToggle}/>
		</div>
	);
};

const mapMethodsToProps = productsService => {
	return {
		getCategories: productsService.getCategories
	};
};

HomePage.propTypes = {
	getCategories: PropTypes.func.isRequired,
	onOrderModalToggle: PropTypes.func.isRequired
};

export default withFetchProductsService(mapMethodsToProps)(HomePage);