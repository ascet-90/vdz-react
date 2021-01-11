import {Link} from 'react-router-dom';
import {number_format} from '../../helper-functions';
import PropTypes from 'prop-types';

const SimilarProducts = ({products}) => {
	return (
		<div className="similar_products">
			<div className="similar_products_title">Похожие товары</div>
			<div className="similar_products_list d-flex">
				{
					products.map(product => {
						return (
							<div className="similar_product d-flex" key={product.id} id={product.id}>
								<div className="thumb">
									<Link to={product.link}>
										{
											product.thumbnail && <img alt="" src={product.thumbnail}/>
										}
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
					})
				}							
			</div>
		</div>
	);
};

SimilarProducts.propTypes = {
	products: PropTypes.array.isRequired
};

export default SimilarProducts;