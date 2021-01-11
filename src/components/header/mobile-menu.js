import {Link} from 'react-router-dom';
import logo from '../../img/logo.png';
import darkLogo from '../../img/logo-dark.png';
import whatsapp from '../../img/whatsapp.png';
import viber from '../../img/viber.png';
import PropTypes from 'prop-types';

const MobileMenu = ({opened, theme, toggleOpen}) => {
	const classes = opened ? 'active' : '';
	return (
		<div className="mobile_nav">
			<div className="container">
				<div className="mobile_nav_inner d-flex">
					<div className="logo">
						<Link to="/">
							<img alt="logo" src={theme === 'dark' ? logo : darkLogo}/>
						</Link>
					</div>
					<div className="header_tel">
						<div className="item d-flex">
							<a href="tel:74959259911">+7 (495) 925-99-11</a>
							<a className="whatsapp" href="/"><img alt="whatsapp" src={whatsapp}/></a> 
							<a href="/"><img alt="viber" src={viber}/></a> 
						</div>
						<div className="item d-flex">
							<a href="tel:74951569786">+7 (495) 156-97-86</a>
							<a className="whatsapp" href="/"><img alt="whatsapp" src={whatsapp}/></a> 
							<a href="/"><img alt="viber" src={viber}/></a> 
						</div>
					</div>	
					<div className={`mob_toggle ${classes}`} onClick={toggleOpen}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</div>
	);
};

MobileMenu.propTypes = {
	opened: PropTypes.bool.isRequired,
	theme: PropTypes.string,
	toggleOpen: PropTypes.func.isRequired
};

export default MobileMenu;