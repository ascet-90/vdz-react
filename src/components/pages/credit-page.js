import {Fragment, useState} from 'react';
import Breadcrumbs from '../breadcrumbs';
import {Modal} from '../modals';
import Advantages from '../advantages';
import MapContainer from '../map-container';
import PropTypes from 'prop-types';

const CreditPage = ({onOrderModalToggle, postForm}) => {
	const [showModal, setShowModal] = useState(false);
		
	return (
		<Fragment>
			<div className="container">
				<Breadcrumbs/>
			</div>			
			<div className="main credit_page">
				<section className="description_wrap">
					<div className="container">
						<h1 className="section_title">У нас вы можете приобрести домокомплекты в кредит</h1>
						<div className="description">
							<h2>Оплата в кредит</h2>
							<p>Для покупки любого проекта Вы можете воспользоваться удобной кредитной программой от наших банков-партнеров.</p>
							<h2>Условия предоставления кредита</h2>
							<ul>
							<li>— Первый взнос: от 10%</li>
							<li>— Срок кредита: от 6 месяцев до 5 лет</li>
							<li>— Сумма кредита: от 5000 до 2 000 000 рублей</li>
							<li>— Переплата: от 10% в год</li>
							<li>— Наличие 2-х документов удостоверяющих личность (паспорт, водительское удостоверение, СНИЛС)</li>
							<li>— Без поручителей и залога</li>
							<li>— Погашение равными долями</li>
							</ul>
							<p>*Кредит предоставляется ПАО «Почта Банк»</p>
							<p>Более подробную информацию по условиям предоставления кредита Вы можете получить у менеджеров по телефону.</p>
						</div>
					</div>			
				</section>
				<section className="send_order">
					<div className="container">
						<div className="send_order_content">
							<h2 className="section_title">Отправить заявку на получение продукции в кредит</h2>
							<div className="send_order_text">
								Наш менеджер свяжется с вами в ближайшее время для уточнения деталей заказа	
							</div>
							<button className="order_credit" onClick={() => setShowModal(true)}>Отправить заявку</button>
						</div>
					</div>
					<Modal 
						id="modalCredit" 
						formTitle="Отправить заявку на получение продукции в кредит" 
						formSubtitle="Наш менеджер свяжется с вами в ближайшее время для уточнения деталей заказа"
						submitText="Отправить заявку" 
						show={showModal} 
						onShowToggle={() => setShowModal(show => !show)}/>
				</section>
				<Advantages/>
				<MapContainer onModalToggle={onOrderModalToggle}/>
			</div>
		</Fragment>
	);
};

CreditPage.propTypes = {
	onOrderModalToggle: PropTypes.func
};

export default CreditPage;