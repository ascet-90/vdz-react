import addressIcon from '../../img/address-icon.png';
import mailIcon from '../../img/mail-icon.png';
import telIcon from '../../img/tel-icon.png';
import placemarkIcon from '../../img/location-icon.png';
import {Map, FullscreenControl, GeolocationControl, ZoomControl, Placemark} from 'react-yandex-maps';
import PropTypes from 'prop-types';

const MapContainer = ({onModalToggle, title}) => {
	
 	const mapOptions = {
 		center: ['55.414704', '38.887923'],
 		zoom: 15,
 		behaviors: ['drag', 'multiTouch']
 	};
 	const placemarkOptions = {
 		iconLayout: 'default#image',
		iconImageHref: placemarkIcon,
		iconImageSize: [37, 54]
 	};

	return (
		<div className="map_wrap">
			<div className="container">
				<div className="map_container d-flex">
					<div className="description">
						{title && <h1>{title}</h1>}
						<div className="map_title">
							Продажа пиломатериалов со склада производителя в Москве и МО
						</div>
						<div className="description_list">
							<div className="item address d-flex">
								<div className="icon">
									<img alt="address-icon" src={addressIcon}/>
								</div>
								<p>Адрес производства:<br/><strong>МО, Воскресенск, ул. Конная, д.4</strong></p>
							</div>
							<div className="item mail d-flex">
								<div className="icon">
									<img alt="mail-icon" src={mailIcon}/>
								</div>
								<a href="mailto:zakaz@les-zavod.ru">zakaz@les-zavod.ru</a> 
							</div>
							<div className="item phone d-flex">
								<div className="icon">
									<img alt="tel-icon" src={telIcon}/>
								</div>
								<div className="phone_list">
									<span><a href="tel:74959259911">+7 (495) 925-99-11</a></span>
									<span><a href="tel:74951569786">+7 (495) 156-97-86</a></span>
								</div>
							</div>
						</div>
						<button className="order_call" onClick={onModalToggle}>Заказать звонок</button>
					</div>
					<div className="yandex_map_wrap">
						<Map defaultState={mapOptions} height={415} width={'100%'}>
							<FullscreenControl />
							<GeolocationControl options={{ float: 'left' }} />
							<ZoomControl options={{ float: 'right' }} />
							<Placemark defaultGeometry={mapOptions.center} defaultOptions={placemarkOptions}/>
						</Map>
					</div>
				</div>
			</div>
		</div>
	);
};

MapContainer.propTypes = {
	onModalToggle: PropTypes.func.isRequired
};

export default MapContainer;