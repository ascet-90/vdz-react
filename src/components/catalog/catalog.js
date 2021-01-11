import arrow from '../../img/product-arrow.png';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Catalog = ({bgImage, bgTitle, children, categories}) => {
	const style = bgImage ? {backgroundImage: `url(${bgImage})`} : {};

	const renderCategories = () => {
		return categories.map(category => {
			return (
				<div className="product" id={category.id} key={category.id}>
					<Link to={category.link}>
						<div className="product_title d-flex">
							<span>{category.name}</span>
							<div className="product_link d-flex">
								<img alt="arrow" src={arrow}/>
							</div>							
						</div>
						<div className="product_thumb d-flex">
							<img src={category.thumbnail} alt={category.name}/>
						</div>
					</Link>
				</div>
			);
		});
	};
	return (
		<section className="catalog" style={style}>
			<div className="container">
				{bgTitle && <div className="title_bg">{bgTitle}</div>}
				<div className="catalog_list_wrap">
					<h2 className="section_title">Каталог продукции</h2>
					<div className="catalog_list d-flex">
						{categories && renderCategories()}
					</div>
					{children}
				</div>
			</div>
		</section>
	);
};

Catalog.propTypes = {
	bgImage: PropTypes.string,
	bgTitle: PropTypes.string,
	children: PropTypes.node,
	categories: PropTypes.array
};

export default Catalog;