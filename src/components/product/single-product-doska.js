import React, {Fragment, useState, useEffect, useContext} from 'react';
import parse from 'html-react-parser';
import {numberWithSpaces} from '../../helper-functions';
import whatsappIcon from '../../img/whatsapp-big.png';
import viberIcon from '../../img/viber-big.png';
import telegramIcon from '../../img/telegram-big.png';
import phoneIcon from '../../img/phone.png';
import PropTypes from 'prop-types';
import ProductGallerySlider from './product-gallery-slider';
import {ModalOrder} from '../modals';
import LocalStorageContext from '../localstorage-context';

const SingleProductDoska = React.memo(({product}) => {	

	const [countPriceCubic, setCountPriceCubic] = useState(product.price_cubic ? 1 : 0);
	const [countPricePiece, setCountPricePiece] = useState(product.price_piece ? 1 : 0);
	const [countPricePack, setCountPricePack] = useState(product.price_pack ? 1 : 0);
	const [countPriceSquare, setCountPriceSquare] = useState(product.price_square ? 1 : 0);
	const [cubicSum, setCubicSum] = useState(product.price_cubic);
	const [pieceSum, setPieceSum] = useState(product.price_piece);
	const [packSum, setPackSum] = useState(product.price_pack);
	const [squareSum, setSquareSum] = useState(product.price_square);
	const [priceSum, setPriceSum] = useState(0);
	const [priceCubicVisible, setPriceCubicVisible] = useState(false);
	const [pricePieceVisible, setPricePieceVisible] = useState(false);
	const [pricePackVisible, setPricePackVisible] = useState(false);
	const [priceSquareVisible, setPriceSquareVisible] = useState(false);
	const [showModalOrder, setShowModalOrder] = useState(false);

  const {cartProducts, onCartProductsChange} = useContext(LocalStorageContext);

	useEffect(() => {
		const cubicSum = product.price_cubic === '' ? 0 : product.price_cubic;
		cubicSum ? setPriceCubicVisible(true) : setPriceCubicVisible(false); 
		const pieceSum = product.price_piece === '' ? 0 : product.price_piece;
		pieceSum ? setPricePieceVisible(true) : setPricePieceVisible(false);
		const packSum = product.price_pack === '' ? 0 : product.price_pack;
		packSum ?	setPricePackVisible(true) : setPricePackVisible(false);
		const squareSum = product.price_square === '' ? 0 : product.price_square;
		squareSum ?	setPriceSquareVisible(true) :	setPriceSquareVisible(false);
		const sum = cubicSum + pieceSum + packSum + squareSum;
		setPriceSum(sum);
	}, [product]);

	useEffect(() => {
		setCountPriceCubic(product.price_cubic ? 1 : 0);
		setCountPricePiece(product.price_piece ? 1 : 0);
		setCountPricePack(product.price_pack ? 1 : 0);
		setCountPriceSquare(product.price_square ? 1 : 0);
	}, [product]);

	useEffect(() => {		
		setCubicSum(countPriceCubic * product.price_cubic);
	}, [countPriceCubic, product.price_cubic]);
	useEffect(() => {
		setPieceSum(countPricePiece * product.price_piece);
	}, [countPricePiece, product.price_piece]);
	useEffect(() => {
		setPackSum(countPricePack * product.price_pack);
	}, [countPricePack, product.price_pack]);
	useEffect(() => {
		setSquareSum(countPriceSquare * product.price_square);
	}, [countPriceSquare, product.price_square]);	

	const onModalToggle = () => setShowModalOrder(show => !show);
  
  const renderSum = sum => {
  	return sum === '' ? 0 : numberWithSpaces(sum);
  };	
  const {gallery} = product;

  const onOrderClick = () => {  	
  	if(priceSum === 0) {
  		alert("Укажите количество товара!");
  		return;
  	}
  	const newProduct = {
  		id: product.id,
  		name: product.name, 
  		type: product.product_type,
  		priceCubic: product.price_cubic,
  		pricePiece: product.price_piece,
  		pricePack: product.price_pack,
  		priceSquare: product.price_square,
  		countPriceCubic: countPriceCubic === 0 ? null : countPriceCubic,
  		countPricePiece: countPricePiece === 0 ? null : countPricePiece,
  		countPricePack: countPricePack === 0 ? null : countPricePack,
  		countPriceSquare: countPriceSquare === 0 ? null : countPriceSquare,
  		cubicSum,
  		pieceSum,
  		packSum,
  		squareSum,
  		priceSum,
  		thumbnail: product.thumbnail,
  		link: product.link
  	};  	
  	if(cartProducts && cartProducts.length > 0) {
  		const foundProduct = cartProducts.find(prod => prod.id === product.id);
  		if(!foundProduct) {  			
  			onCartProductsChange(newProduct); 
  		} else {
  			const newProduct = {...foundProduct};
  			if(newProduct.countPriceCubic !== null) {
  				newProduct.countPriceCubic += countPriceCubic;
  			} else if(!newProduct.countPriceCubic && countPriceCubic !== 0) {
  				newProduct.countPriceCubic = countPriceCubic;
  			} 		
  			if(newProduct.countPricePiece !== null) {
  				newProduct.countPricePiece += countPricePiece;
  			} else if(!newProduct.countPricePiece && countPricePiece !== 0) {
  				newProduct.countPricePiece = countPricePiece;
  			}	
  			if(newProduct.countPricePack !== null) {
  				newProduct.countPricePack += countPricePack;
  			} else if(!newProduct.countPricePack && countPricePack !== 0) {
  				newProduct.countPricePack = countPricePack;
  			}
  			if(newProduct.countPriceSquare !== null) {
  				newProduct.countPriceSquare += countPriceSquare;
  			} else if(!newProduct.countPriceSquare && countPriceSquare !== 0) {
  				newProduct.countPriceSquare = countPriceSquare;
  			}
  			newProduct.cubicSum += cubicSum;
  			newProduct.pieceSum += pieceSum;
  			newProduct.packSum += packSum;
  			newProduct.squareSum += squareSum;
  			newProduct.priceSum += priceSum;
  			onCartProductsChange(newProduct);
  			
  		}	
  	} else {
  		onCartProductsChange(newProduct); 
  	}		  	
  	setShowModalOrder(true);
  };

  const renderPriceLabel = label => {
  	switch(label) {
  		case 'cubic':
  			return (<>руб./м<sup>3</sup></>);
  		case 'piece':
  		 	return 'руб. за шт.';
  		case 'pack':
  			return 'руб. за пачку';
  		case 'square':
  			return (<>руб./м<sup>2</sup></>);
  		default:
  			return null;
  	} 
  };

	return (
		<Fragment>
			<div className="catalog_single_main d-flex">											
				{
					gallery && gallery.length > 0 && <ProductGallerySlider gallery={gallery}/>
				}	
				<div className="catalog_single_info">
					<h1 className="catalog_single_title">{product.name}</h1>
					<div className="doska_info">
						<div className="item d-flex">
							<span className="title">Порода древесины:</span>
							<span className="item_content">{product.poroda}</span>
						</div>
						<div className="item d-flex">
							<span className="title">Класс/Сорт:</span>
							<span className="item_content">{product.class_sort}</span>
						</div>
						<div className="item price d-flex">
							<span className="title">Цена:</span>
							<span className="item_content">от <span>{renderSum(product.price)}</span> {renderPriceLabel(product.price_label)}</span>
						</div>
					</div>
					<div className="price_wrap">
						{
							priceCubicVisible &&
							<div className="price_item meter d-flex">
								<div className="input_wrap d-flex">
									<button className="price_minus" onClick={() => {
										if(countPriceCubic > 0) {
											setCountPriceCubic(price => price - 1);
											setPriceSum(sum => sum - product.price_cubic);
										}
									}}>-</button>
									<span className="input_price"><span>{countPriceCubic}</span>м<sup>3</sup></span>
									<button className="price_plus" onClick={() => {
										setCountPriceCubic(price => price + 1); 
										setPriceSum(sum => sum + product.price_cubic);
									}
									}>+</button>
								</div>
								<span className="single_price"><span>{renderSum(cubicSum)}</span> руб.</span>
							</div>
						}
						{
							pricePieceVisible && 
							<div className="price_item piece d-flex">
								<div className="input_wrap d-flex">
									<button className="price_minus" onClick={() => {
										if(countPricePiece > 0) {
											setCountPricePiece(price => price - 1);
											setPriceSum(sum => sum - product.price_piece);
										}
									}}>-</button>
									<span className="input_price"><span>{countPricePiece}</span>шт.</span>
									<button className="price_plus" onClick={() => {setCountPricePiece(price => price + 1); setPriceSum(sum => sum + product.price_piece)}}>+</button>
								</div>
								<span className="single_price"><span>{renderSum(pieceSum)}</span> руб.</span>
							</div>
						}
						{
							pricePackVisible &&
							<div className="price_item pack d-flex">
								<div className="input_wrap d-flex">
									<button className="price_minus" onClick={() => {
										if(countPricePack > 0) {
											setCountPricePack(price => price - 1);
											setPriceSum(sum => sum - product.price_pack);
										}
									}}>-</button>
									<span className="input_price"><span>{countPricePack}</span>п.</span>
									<button className="price_plus" onClick={() => {setCountPricePack(price => price + 1); setPriceSum(sum => sum + product.price_pack)}}>+</button>
								</div>
								<span className="single_price"><span>{renderSum(packSum)}</span> руб.</span>
							</div>
						}
						{
							priceSquareVisible &&
							<div className="price_item square d-flex">
								<div className="input_wrap d-flex">
									<button className="price_minus" onClick={() => {
										if(countPriceSquare > 0) {
											setCountPriceSquare(price => price - 1);
											setPriceSum(sum => sum - product.price_square);
										}
									}}>-</button>
									<span className="input_price"><span>{countPriceSquare}</span>м<sup>2</sup></span>
									<button className="price_plus" onClick={() => {setCountPriceSquare(price => price + 1); setPriceSum(sum => sum + product.price_square)}}>+</button>
								</div>
								<span className="single_price"><span>{renderSum(squareSum)}</span> руб.</span>
							</div>
						}
						<div className="price_sum_wrap">Итого: <span className="price_sum"><span>{renderSum(priceSum)}</span> руб.</span></div>
					</div>				
				</div>
			</div>
			<div className="social_wrap d-flex">
				<div className="social_icons">
					<a href={product.social.whatsapp_link}><img alt="whatsapp-icon" src={whatsappIcon}/></a>
					<a href={product.social.viber_link}><img alt="viber-icon" src={viberIcon}/></a>
					<a href={product.social.telegram_link}><img alt="telegram-icon" src={telegramIcon}/></a>
				</div>
				{
					(priceCubicVisible || pricePieceVisible || pricePackVisible || priceSquareVisible) &&
						<button type="button" className="order_catalog" onClick={onOrderClick}>Заказать</button>
				}				
				<div className="phone">
						<img alt="phone-icon" src={phoneIcon}/>
						{parse(product.phone)}
					</div>
			</div>	
			<div className="description_block">
				<div className="description_header">
					{parse(product.description)}
				</div>
				<div className="description_content">
					<div className="description_title">
						{product.description_title}
					</div>
					<div className="description_text">
						{parse(product.description_text)}
					</div>
				</div>
			</div>
			<ModalOrder id="addToCartSuccess" show={showModalOrder} onShowToggle={onModalToggle}/>		
		</Fragment>
	);
});

SingleProductDoska.propTypes = {
	product: PropTypes.object.isRequired
}

export default SingleProductDoska;