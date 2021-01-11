import React, {Fragment, useState, useEffect} from 'react';
import parse from 'html-react-parser';
import DomkomplektGallerySlider from './domkomplekt-gallery-slider';
import squareIcon from '../../img/expand-square.png';
import stripeIcon from '../../img/stripe.png';
import staresIcon from '../../img/stares.png';
import datesIcon from '../../img/dates.png';
import phoneIcon from '../../img/phone.png';
import whatsappIcon from '../../img/whatsapp-big.png';
import viberIcon from '../../img/viber-big.png';
import telegramIcon from '../../img/telegram-big.png';
import {number_format, numberWithSpaces} from '../../helper-functions';
import {Link} from 'react-router-dom';
import {ModalOrderDom} from '../modals';
import PropTypes from 'prop-types';

const SingleProductDomkomplekt = React.memo(({product}) => {

	const [selectedPrice, setSelectedPrice] = useState(0);
	const [creditChecked, setCreditChecked] = useState(false);
	const [piloPrice, setPiloPrice] = useState(0);
	const [sborkaPrice, setSborkaPrice] = useState(0);
	const [finalPrice, setFinalPrice] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [selectedPriceBlock, setSelectedPriceBlock] = useState('');
	const [selectedPriceTitle, setSelectedPriceTitle] = useState('');

	useEffect(() => {
		const initialPrice = product.prices_1.pricelist.length > 0 ? product.prices_1.pricelist[0].price : 0;
		setSelectedPriceBlock(product.prices_1.title);
		setSelectedPriceTitle(product.prices_1.pricelist.length > 0 ? product.prices_1.pricelist[0].title : '');
		setSelectedPrice(initialPrice);
		setFinalPrice(initialPrice);
	}, [product]);

	useEffect(() => {
		setFinalPrice(selectedPrice + sborkaPrice + piloPrice);
	}, [selectedPrice, sborkaPrice, piloPrice]);	

	const info = [
		{
			alt: "squareIcon",
			iconURL: squareIcon,
			title: 'Линейные размеры:',
			value: product.linear_sizes
		},
		{
			alt: "stripeIcon",
			iconURL: stripeIcon,
			title: 'Площадь:',
			value: `${number_format(product.area, 1, ",", " ")} м\u00B2`
		},
		{
			alt: "staresIcon",
			iconURL: staresIcon,
			title: 'Этажность:',
			value: product.storeys
		},
		{
			alt: "datesIcon",
			iconURL: datesIcon,
			title: 'Сроки производства:',
			value: product.terms
		}
	];

	const infoItems = info.map(item => {
		return (
			<div className="item d-flex" key={item.alt}>
				<div className="icon">
					<img alt={item.alt} src={item.iconURL}/>
				</div>
				<div className="item_content">
					<div className="title">
						{item.title}
					</div>
					<div className="item_value">
						{item.value}
					</div>
				</div>								
			</div>
		);
	});

	const onRadioChange = e => setSelectedPrice(Number(e.target.value));

	const onCheckboxChange = ({target}) => {
		switch(target.name){
			case 'pilo_price':
				target.checked ? setPiloPrice(Number(target.value)) : setPiloPrice(0);
				break;
			case 'sborka_price':
				target.checked ? setSborkaPrice(Number(target.value)) : setSborkaPrice(0);
				break;
			default:
				return;
		}
	};

	const renderPrices = ({prices_1, prices_2, pilo_price, sborka_price}) => {
		return (
			<div className="price_block_list d-flex">
				<div className="item d-flex">
					<div className="title">
						{prices_1.title}
					</div>
					<div className="price_wrap">
						{
							prices_1.pricelist.length > 0 && prices_1.pricelist.map(({title, price, id}, index) => {
								return (
									<div className="price" key={id}>
										<label>
											<input type="radio" name="price" defaultValue={price} defaultChecked={index === 0 ? true : false} onChange={e => {
												setSelectedPriceBlock(prices_1.title);
												setSelectedPriceTitle(title);
												onRadioChange(e);
											}}/>
											<span className="price_title">{title} <span>от <span className="sum_price">{price !== '' ? numberWithSpaces(price) : 0}</span> руб.</span></span>
										</label>
									</div>
								);
							})
						}
					</div>
				</div>
				<div className="item d-flex">
					<div className="title">
						{prices_2.title}
					</div>
					<div className="price_wrap">
						{
							prices_2.pricelist.length > 0 && prices_2.pricelist.map(({title, price, id}, index) => {
								return (
									<div className="price" key={id}>
										<label>
											<input type="radio" name="price" defaultValue={price} onChange={e => {
												setSelectedPriceBlock(prices_2.title);
												setSelectedPriceTitle(title);
												onRadioChange(e);
											}}/>
											<span className="price_title">{title} <span>от <span className="sum_price">{price !== '' ? numberWithSpaces(price) : 0}</span> руб.</span></span>
										</label>
									</div>
								);
							})
						}
					</div>
				</div>
				<div className="item additional d-flex">
					<div className="price_wrap">
						<div className="price">
							<label>
								<input type="checkbox" name="pilo_price" value={pilo_price} onChange={onCheckboxChange}/>
								<span>Комплект пиломатериалов <span><span className="sum_price">{pilo_price !== '' ? numberWithSpaces(pilo_price) : 0}</span> руб.</span></span>
							</label>
						</div>
						<div className="price">
							<label>
								<input type="checkbox" name="sborka_price" value={sborka_price} onChange={onCheckboxChange}/>
								<span>Предварительная стоимость сборки <span><span className="sum_price">{sborka_price !== '' ? numberWithSpaces(sborka_price) : 0}</span> руб.</span></span>
							</label>
						</div>
						<div className="price credit">
							<label>
								<input type="checkbox" name="credit" onChange={e => setCreditChecked(e.target.checked)}/>
								<span>Купить в кредит <Link to="/credit" className="credit_more">Узнать подробнее</Link></span>
							</label>
						</div>
					</div>
				</div>	
			</div>
		);
	};

	const onModalToggle = () => setShowModal(show => !show);

	const hiddenInputs = () => {
		let optionsValue = `${selectedPriceBlock} (${selectedPriceTitle} от ${selectedPrice} руб)`;
		if(piloPrice > 0) {
			optionsValue += `, Комплект пиломатериалов: от ${piloPrice} руб`;
		}
		if(sborkaPrice > 0) {
			optionsValue += `, Предварительная стоимость сборки: от ${sborkaPrice} руб`;
		}
		if(creditChecked) {
			optionsValue += ", Купить в кредит";
		}
		return (
			<Fragment>
				<input type="hidden" name="domkomplekt_name" value={product.name}/>
				<input type="hidden" name="domkomplekt_options" value={optionsValue}/>
				<input type="hidden" name="total_price" value={`Общая сумма: ${finalPrice} руб`}/>
			</Fragment>
		);
	};

	const {gallery} = product;
	
	return (
		<Fragment>		
			<h1 className="catalog_single_title">{product.name}</h1>
			{
				gallery && gallery.length > 0 && <DomkomplektGallerySlider gallery={gallery}/>
			}
			<div className="domkomplekt_info d-flex">
				{infoItems}
			</div>
			<div className="price_block">	
				<div className="price_block_title">
					Цена за стеновой комплект:
				</div>
				<form id="price_form" onSubmit={() => console.log('gfdgg')}>					
					{renderPrices(product)}
					<div className="final_price_wrap">
						Итоговая стоимость: <span className="final_price"><span>{numberWithSpaces(finalPrice)}</span> руб.</span>
					</div>
					<div className="social_wrap d-flex">
						<div className="social_icons">
							<a href={product.social.whatsapp_link}><img alt="whatsapp-icon" src={whatsappIcon}/></a>
							<a href={product.social.viber_link}><img alt="viber-icon" src={viberIcon}/></a>
							<a href={product.social.telegram_link}><img alt="telegram-icon" src={telegramIcon}/></a>
						</div>
						<button type="button" className="order_catalog" onClick={onModalToggle}>Заказать</button>
						<div className="phone">
								<img alt="phone-icon" src={phoneIcon}/>
								{parse(product.phone)}
							</div>
					</div>
				</form>
			</div>
			<div className="services_links">
				<p>Также вы можете заказать <Link to="/construction">услуги строительства</Link> и <Link to="/construction">отделочные работы</Link></p>
			</div>
			<div className="description">
				<div className="description_title">{product.description_title}</div>
				{parse(product.description)}
			</div>
			<ModalOrderDom 
				id="addDomkomplekt" 
				formTitle="Заказать комплект"
				submitText="Заказать комплект"
				formSubtitle={product.name}
				show={showModal} 
				onShowToggle={onModalToggle} 
				hiddenInputInfo={hiddenInputs()}
				/>			
		</Fragment>
	);
});

SingleProductDomkomplekt.propTypes = {
	product: PropTypes.object.isRequired
}

export default SingleProductDomkomplekt;