import SocialMenu from './social-menu';
import {Modal} from '../modals';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = ({showOrderModal, onModalToggle}) => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer_inner d-flex">
					<SocialMenu/>	
					<div className="footer_right d-flex">
						<Link to="/privacy-policy">Политика конфиденциальности</Link>
						<div className="copyright">© 2020 Все права защищены</div>
					</div>
				</div>							
			</div>	
			<Modal 
				id="modalOrder"
				formTitle="Заказать звонок" 
				formSubtitle="Наш менеджер свяжется с вами в ближайшее время для уточнения деталей заказа" 
				submitText="Заказать звонок" 
				show={showOrderModal} 
				onShowToggle={onModalToggle}/>
		</footer>		
	);
};

Footer.propTypes = {
	showOrderModal: PropTypes.bool.isRequired,
	onModalToggle: PropTypes.func.isRequired
};

export default Footer;