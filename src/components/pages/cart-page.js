import {Fragment, useEffect, useContext, useState, useRef, useMemo} from 'react';
import {Link} from 'react-router-dom';
import LocalStorageContext from '../localstorage-context';
import deleteIcon from '../../img/delete.png';
import {numberWithSpaces} from '../../helper-functions';
import {CartForm} from '../forms';
import {withFetchProductsService} from '../hoc-helpers';
import {ModalCartSuccess} from '../modals';
import PropTypes from 'prop-types';

const CartPage = ({postForm}) => {
	const {cartProducts, onCartProductsChange} = useContext(LocalStorageContext);	
	const formRef = useRef(null);
	const [formSent, setFormSent] = useState(false);
	const mounted = useRef(true);
	const [cartOrderSuccess, setCartOrderSuccess] = useState(false);

	useEffect(() => {
		document.body.classList.add('page-template-cart-page');
		document.title = "Корзина";
		return () => {			
			document.body.classList.remove('page-template-cart-page');
			mounted.current = false;
		}
	}, []);

	const useHideZeroPriceInputs = cartProducts => {
		const cartProductsPrev = useRef(0);
		useEffect(() => {			
			if(cartProductsPrev.current === 0 && cartProducts.length > 0) {
				const products = cartProducts.map(cartProduct => {
					return {
						...cartProduct,
						countPriceCubic: cartProduct.countPriceCubic === 0 ? null : cartProduct.countPriceCubic,
						countPricePiece: cartProduct.countPricePiece === 0 ? null : cartProduct.countPricePiece,
						countPricePack: cartProduct.countPricePack === 0 ? null : cartProduct.countPricePack,
						countPriceSquare: cartProduct.countPriceSquare === 0 ? null : cartProduct.countPriceSquare
					};
				});
				onCartProductsChange(products);
			}
			cartProductsPrev.current = cartProducts.length;
		}, [cartProducts, cartProductsPrev]);
	};

	useHideZeroPriceInputs(cartProducts);		

	const cartItems = useMemo(() => cartProducts.map((cartProduct, index) => {
		const onProductDelete = product => {
			const delProduct = {...product};
			delProduct.countPriceCubic = null;
			delProduct.countPricePiece = null;
			delProduct.countPricePack = null;
			delProduct.countPriceSquare = null;
			onCartProductsChange(delProduct);
		};
		const priceInputs = [];
		if(cartProduct.countPriceCubic !== null) {
			const priceInput = (
				<div className="price_item d-flex" key={`${cartProduct.id}-countPriceCubic`}>
					<div className="input_wrap d-flex">
						<button className="price_minus" onClick={() => {
							if(cartProduct.countPriceCubic > 0) {
								const cartProd = {...cartProduct};
								cartProd.countPriceCubic -= 1;
								cartProd.cubicSum -= cartProduct.priceCubic;
								cartProd.priceSum -= cartProduct.priceCubic;
								onCartProductsChange(cartProd);
							}
						}}>-</button>
						<span className="input_price"><span>{cartProduct.countPriceCubic}</span>м<sup>3</sup></span>
						<button className="price_plus" onClick={() => {
							const cartProd = {...cartProduct};
							cartProd.countPriceCubic += 1;
							cartProd.cubicSum += cartProduct.priceCubic;
							cartProd.priceSum += cartProduct.priceCubic;
							onCartProductsChange(cartProd);		
						}
						}>+</button>
					</div>
				</div>);
			priceInputs.push(priceInput);
		}
		if(cartProduct.countPricePiece != null) {
			const priceInput = (
				<div className="price_item d-flex" key={`${cartProduct.id}-countPricePiece`}>
					<div className="input_wrap d-flex">
						<button className="price_minus" onClick={() => {
							if(cartProduct.countPricePiece > 0) {
								const cartProd = {...cartProduct};
								cartProd.countPricePiece -= 1;
								cartProd.pieceSum -= cartProduct.pricePiece;
								cartProd.priceSum -= cartProduct.pricePiece;
								onCartProductsChange(cartProd);			
							}
						}}>-</button>
						<span className="input_price"><span>{cartProduct.countPricePiece}</span>шт.</span>
						<button className="price_plus" onClick={() => {
							const cartProd = {...cartProduct};
							cartProd.countPricePiece += 1;
							cartProd.pieceSum += cartProduct.pricePiece;
							cartProd.priceSum += cartProduct.pricePiece;
							onCartProductsChange(cartProd);		
						}
						}>+</button>
					</div>
				</div>);
			priceInputs.push(priceInput);
		}
		if(cartProduct.countPricePack != null) {
			const priceInput = (
				<div className="price_item d-flex" key={`${cartProduct.id}-countPricePack`}>
					<div className="input_wrap d-flex">
						<button className="price_minus" onClick={() => {
							if(cartProduct.countPricePack > 0) {
								const cartProd = {...cartProduct};
								cartProd.countPricePack -= 1;
								cartProd.packSum -= cartProduct.pricePack;
								cartProd.priceSum -= cartProduct.pricePack;
								onCartProductsChange(cartProd);			
							}
						}}>-</button>
						<span className="input_price"><span>{cartProduct.countPricePack}</span>п.</span>
						<button className="price_plus" onClick={() => {
							const cartProd = {...cartProduct};
							cartProd.countPricePack += 1;
							cartProd.packSum += cartProduct.pricePack;
							cartProd.priceSum += cartProduct.pricePack;
							onCartProductsChange(cartProd);		
						}
						}>+</button>
					</div>
				</div>);
			priceInputs.push(priceInput);
		}
		if(cartProduct.countPriceSquare !== null) {
			const priceInput = (
				<div className="price_item d-flex" key={`${cartProduct.id}-countPriceSquare`}>
					<div className="input_wrap d-flex">
						<button className="price_minus" onClick={() => {
							if(cartProduct.countPriceSquare > 0) {
								const cartProd = {...cartProduct};
								cartProd.countPriceSquare -= 1;
								cartProd.squareSum -= cartProduct.priceSquare;
								cartProd.priceSum -= cartProduct.priceSquare;
								onCartProductsChange(cartProd);			
							}
						}}>-</button>
						<span className="input_price"><span>{cartProduct.countPriceSquare}</span>м<sup>2</sup></span>
						<button className="price_plus" onClick={() => {
							const cartProd = {...cartProduct};
							cartProd.countPriceSquare += 1;
							cartProd.squareSum += cartProduct.priceSquare;
							cartProd.priceSum += cartProduct.priceSquare;
							onCartProductsChange(cartProd);		
						}
						}>+</button>
					</div>
				</div>);
			priceInputs.push(priceInput);
		}
		const prices = [];
		if(cartProduct.countPriceCubic !== null){
			const price = <span className="prod_price" key={`${cartProduct.id}-cubicSum`}>{numberWithSpaces(cartProduct.cubicSum)} р.</span>;
			prices.push(price);
		}
		if(cartProduct.countPricePiece !== null){
			const price = <span className="prod_price" key={`${cartProduct.id}-pieceSum`}>{numberWithSpaces(cartProduct.pieceSum)} р.</span>;
			prices.push(price);
		}
		if(cartProduct.countPricePack !== null){
			const price = <span className="prod_price" key={`${cartProduct.id}-packSum`}>{numberWithSpaces(cartProduct.packSum)} р.</span>;
			prices.push(price);
		}
		if(cartProduct.countPriceSquare !== null){
			const price = <span className="prod_price" key={`${cartProduct.id}-squareSum`}>{numberWithSpaces(cartProduct.squareSum)} р.</span>;
			prices.push(price);
		}
		const cartItem = (
			<div className="cart_products_item d-flex" key={`${cartProduct.id}`}>
				<div className="thumbnail">
					<div className="thumbnail_inner d-flex">
						<Link className="prod_thumb" to={cartProduct.link}><img alt={`product-thumb-${cartProduct.id}`} src={cartProduct.thumbnail}/></Link>
					</div>												
				</div>
				<div className="cart_product_info d-flex">
					<div className="title">
						<span className="mob_title">Наименование</span>
						<Link className="prod_title" to={cartProduct.link}>{cartProduct.name}</Link>
					</div>
					<div className="count">
						<span className="mob_title">Количество:&nbsp;</span>
						<div className="prod_count">							
								{priceInputs}
						</div>
					</div>
					<div className="price">
						<span className="mob_title">Цена:&nbsp;</span>
							<span className="prices_wrap">
								{prices}
							</span>
					</div>
					<div className="delete">
						<button className="product_delete" onClick={() => onProductDelete(cartProduct)}><img alt="delete-icon" src={deleteIcon}/></button>
					</div>
				</div>
			</div>
		);
		return cartItem;
	}), [cartProducts, onCartProductsChange]);
	
	const totalSum = cartProducts.reduce((acc, cartProduct) => {
		return acc + cartProduct.priceSum;
	}, 0);

	const cartList = (
		<div className="cart_products_list">
			<div className="cart_products_header d-flex">
				<div className="thumbnail"></div>
				<div className="title">Наименование</div>
				<div className="count">Количество</div>
				<div className="price">Цена</div>
				<div className="delete">Удалить</div>
			</div>
			{cartItems}
			<div className="cart_products_sum">
				Итого: <span className="total_sum">{totalSum} р.</span>
			</div>
		</div>
	);

	const onSubmit = () => {
		setFormSent(false);				
		const formData = new FormData(formRef.current);
		postForm(formData).then(data => {
			if(data.status === 'ok' && mounted.current) {
				setFormSent(true);
				setCartOrderSuccess(true);
			}
		});
	};

	const cartProductsInfo = useMemo(() => {
		let inputValue = '';
		const totalSum = cartProducts.reduce((acc, cartProduct) => {
			return acc + cartProduct.priceSum;
		}, 0);
		cartProducts.forEach(cartProduct => {
			const priceCubicLabel = cartProduct.countPriceCubic ?  `${cartProduct.countPriceCubic} м\u00B3, ` : '';
			const pricePieceLabel = cartProduct.countPricePiece ?  `${cartProduct.countPricePiece} шт., ` : '';
			const pricePackLabel = cartProduct.countPricePack ?  `${cartProduct.countPricePack} пачка, ` : '';
			const priceSquareLabel = cartProduct.countPriceSquare ?  `${cartProduct.countPriceSquare} м\u00B2` : '';
			inputValue += `
			Название товара: ${cartProduct.name}
			Количество товара: ${priceCubicLabel}${pricePieceLabel}${pricePackLabel}${priceSquareLabel}
			Сумма товара: ${cartProduct.priceSum}
			---------,
			`
		});
		inputValue += `Сумма: ${totalSum}
			Товаров в заказе: ${cartProducts.length}`;
		return <input type="hidden" name="products-info" value={inputValue}/>;
	}, [cartProducts]);

	const cartBlock = (
		<Fragment> 
			{cartList}
			<div className="cart_form">
				<CartForm onSubmit={onSubmit} formIsSent={formSent} ref={formRef}>
					{cartProductsInfo}
				</CartForm>
			</div>
		</Fragment>
	);

	return (
		<div className="main cart_page">
			<div className="container">
				<div className="cart_wrap">
					<h1 className="section_title">Корзина</h1>
					{cartProducts.length === 0 &&	<p className="cart_empty">Ваша корзина пуста</p>}
					{cartProducts.length > 0 && cartBlock}
				</div>
			</div>
			<ModalCartSuccess id="thanks" show={cartOrderSuccess} onShowToggle={() => setCartOrderSuccess(show => !show)}/>
		</div>
	);
};

CartForm.propTypes = {
	postForm: PropTypes.func
};

const mapMethodsToProps = productsService => {
	return {
		postForm: productsService.postForm
	}
};

export default withFetchProductsService(mapMethodsToProps)(CartPage);