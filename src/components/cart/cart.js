import {numberWithSpaces} from '../../helper-functions';
import {Link} from 'react-router-dom';
import shoopingCartIcon from '../../img/shopping-cart.png';

const Cart = ({cartProducts}) => {
	const sum = cartProducts.reduce((acc, curr) => {
		return acc + curr.priceSum;
	}, 0);

	return (
		<Link to="/cart" className="cart">
		  <div className="cart_image">
		    <img alt="shopping-cart" src={shoopingCartIcon}/>
		    <span>{cartProducts.length}</span>
		  </div>
		  <div className="cart_price">
		    <span>{numberWithSpaces(sum)}</span> руб.
		  </div>
		</Link>
	);
};

export default Cart;