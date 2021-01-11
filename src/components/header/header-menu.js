import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const HeaderMenu = ({location}) => {
	const paths = [
		{to: "/", name: "Главная"},
		{to: "/production", name: "Производство"},
		{to: "/catalog", name: "Каталог"},
		{to: "/payment-delivery", name: "Оплата и доставка"},
		{to: "/credit", name: "Кредит"},
		{to: "/construction", name: "Строительство"},
		{to: "/contacts", name: "Контакты"}
	];
	const headerMenu = paths.map(path => {
		const classes = ["menu_item"];
		if(location.pathname === path.to) {
			classes.push("current");
			document.title = path.name;
		}
		return <li key={path.to} className={classes.join(" ")}><Link to={path.to}>{path.name}</Link></li>
	});

	return (
		<ul id="header-menu" className="menu">
			{headerMenu}
		</ul>
	);
};

HeaderMenu.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string
	})
};

export default withRouter(HeaderMenu);