import {useRef, useState, useEffect} from 'react';
import {number_format} from '../../helper-functions';
import closeIcon from '../../img/close.png';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ModalOrder = ({id, onShowToggle, show}) => {
	const [productsCount, setProductsCount] = useState(0);
	const [productsSum, setProductsSum] = useState(0);

	useEffect(() => {
		if(show) {
			document.body.style.overflowY = 'hidden';
			const products = JSON.parse(localStorage.getItem('products'));
			if(products) {
				setProductsCount(products.length);
				const sum = products.reduce((acc, curr) => {
					return acc + curr.priceSum;
				}, 0);
				setProductsSum(sum);
			}
		}		
		else document.body.style.overflowY = 'auto';
	}, [show]);

	useEffect(() => {
		return () => document.body.style.overflowY = 'auto';
	}, []);

	const classes = ["modal"];
	if(show) {
		classes.push("open");
	}
	const modalBody = useRef(null);
	const onModalClick = e => {
		if(!modalBody.current.contains(e.target)){
			onShowToggle();
		}
	};

	return (
		<div id={id} className={classes.join(" ")} onClick={onModalClick}>
		  <div className="modal_sandbox"></div>
		  <div className="modal_box">
		    <div className="modal_body" ref={modalBody}>
		      <div className="form">
		        <div className="form_title">Товар добавлен в корзину</div>
		        <div className="form_product_info">
		        	<div className="form_product_info_count">Товаров: <span>{productsCount}</span> </div>
		        	<div className="form_product_info_sum">На сумму: <span>{number_format(productsSum, 0, '.', ' ')}</span> руб.</div>
		        </div>
		        <div className="form_links d-flex">
		        	<Link to="/cart" onClick={onShowToggle}>Перейти в корзину</Link>
		        	<button onClick={onShowToggle}>Продолжить покупку</button>
		        </div>
		        <div className="close" onClick={onShowToggle}>
		          <img alt="close" src={closeIcon}/>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
	);
};

ModalOrder.propTypes = {
	id: PropTypes.string,
	onShowToggle: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired
}

export default ModalOrder;