import {useState, useEffect, useRef} from 'react';
import Sidebar from '../sidebar';
import {Banner} from '../widgets';
import {withFetchProductsService} from '../hoc-helpers';
import {Link} from 'react-router-dom';
import bannerImg from '../../img/banner-2.png';
import {FormWidget} from '../widgets';
import MapContainer from'../map-container';
import PropTypes from 'prop-types';
import Breadcrumbs from '../breadcrumbs';

const ConstructionPage = ({getCategories, onOrderModalToggle}) => {
	const [categories, setCategories] = useState([]);
	const mounted = useRef(true);

	useEffect(() => {
		return () => mounted.current = false;
	}, []);

	useEffect(() => {
		getCategories().then(categories => {
			if(mounted.current)	setCategories(categories);
		});
	}, [getCategories]);

	return (
		<div className="main construction_page">
			<div className="container">
				<Breadcrumbs/>
				<div className="catalog_single_wrap d-flex">
					<Sidebar categories={categories}>
						<Banner imageURL={bannerImg}/>
					</Sidebar>
					<div className="content">
						<h1 className="section_title">Услуги строительства</h1>
						<div className="description">
							<p>Для наших клиентов, мы предлагаем услугу строительного подряда, наши специалисты готовы выполнить следующие виды работ:</p>
							<ul>
								<li>монтаж фундаментов различного типа : свайный, ленточный, плита, столбчатый и т.д;</li>
								<li>сборка стенового комплекта из профилированного бруса как по проекту в «чашу», так и по технологии в «теплый угол»;</li>
								<li>монтаж стропильной системы и настил кровли всех видов;</li>
								<li>установка дверей и окон с обсадными коробками;</li>
								<li>электрика;</li>
								<li>отопление;</li>
								<li>канализация;</li>
								<li>внешние и внутренние отделочные работы;</li>
							</ul>
							<p>Наши проектировщики помогут вам разработать любой проект вашего будущего дома или бани;</p>
							<p>Все строительные и отделочные работы осуществляют высококлассные специалисты, а за качественное и за своевременное исполнение работ мы несем полную ответственность, по результатам даем многолетнюю гарантию.</p>
							<p>Мы уже много лет осуществляем строительство объектов и за это время накопили огромный опыт в деревянном домостроении.</p>
							<p>При согласовании с текущими владельцами построенных многочисленных объектов, можем организовать просмотр и оценить качество выполнения работ.</p>
							<p>Если при заказе нашей продукции, вы так же делаете заказ строительных работ, то наша компания предложит дополнительные скидки.</p>
							<p>При заказе услуг строительства вы можете приобрести стеновые домокомплекты в&nbsp;<Link to="/credit">кредит</Link>.</p>
							<p>На все вопросы мы ответим по телефонам&nbsp;<a href="tel:+74959259911">+7(495) 925-99-11</a>;&nbsp;<a href="tel:+79151569786">+7(915) 156-97-86</a></p>
						</div>
						<div className="info_wrap d-flex">
							<div className="info">
								<div className="section_title">О заводе</div>
								<div className="production_text">
									<p>Воскресенский деревообрабатывающий завод – это высококачественные пиломатериалы в Москве и Московской области. Для своевременной аккуратной поставки подбирается транспорт в зависимости от количества заказанного оптом и в розницу материала. Опытные строители знают, что купить пиломатериалы с доставкой – решение экономное и выгодное. Сделать заказ можно, не покидая рабочего места или не прерываясь от текущих дел. Чтобы оформить заказ, необходимо воспользоваться одним из трех способов.</p>
								</div>
							</div>			
							<div className="form">
								<FormWidget title="Закажите строительство дома" submitText="Заказать"/>
							</div>			
						</div>
					</div>
				</div>
			</div>
			<MapContainer onModalToggle={onOrderModalToggle}/>
		</div>
	);
};

ConstructionPage.propTypes = {
	getCategories: PropTypes.func.isRequired,
	onOrderModalToggle: PropTypes.func
};

const mapMethodsToProps = productsService => {
	return {
		getCategories: productsService.getCategories
	};
};

export default withFetchProductsService(mapMethodsToProps)(ConstructionPage);