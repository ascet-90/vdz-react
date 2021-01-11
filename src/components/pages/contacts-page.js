import MapContainer from '../map-container';
import Breadcrumbs from '../breadcrumbs';
import PropTypes from 'prop-types';

const ContactsPage = ({onOrderModalToggle}) => {

	return (
		<div className="main contacts_page">
			<div className="container">
				<Breadcrumbs/>
			</div>			
			<MapContainer title="Контакты" onModalToggle={onOrderModalToggle}/>			
		</div>
	);
};

ContactsPage.propTypes = {
	onOrderModalToggle: PropTypes.func
};

export default ContactsPage;