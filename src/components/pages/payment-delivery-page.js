import visaIcon from '../../img/Visa.png';
import masterCardIcon from '../../img/MasterCard.png';
import mirIcon from '../../img/MIR.png';
import Breadcrumbs from '../breadcrumbs';

const PaymentDeliveryPage = () => {
	return (
		<>
			<div className="container">
				<Breadcrumbs/>
			</div>			
			<div className="main default_page">
				<div className="container">				
					<h1>Условия оплаты и доставки</h1>
					<h2>Оплата:</h2>
					<p>Оплата осуществляется по наличному и безналичному расчету с НДС и без НДС.</p>
					<p>Так же вы можете осуществить&nbsp;оплату банковской картой в режиме онлайн. При таком способе оплаты&nbsp;<strong>наценка составляет 2%</strong>&nbsp;от суммы заказа.</p>
					<h2>Доставка:</h2>
					<p>Мы осуществляем доставку автотранспортом нашей компании.</p>
					<ul>
					<li>Еврофура — имеет загрузку до 30 м<sup>3</sup>;</li>
					<li>КАМАЗ — имеет загрузку до 15 м<sup>3</sup>;</li>
					<li>Манипулятор 5 тонн — имеет загрузку до 8 м<sup>3</sup>;</li>
					<li>Газель — имеет загрузку до 3 м<sup>3</sup>;</li>
					</ul>
					<p>Так же у нас в автопарке присутствует транспорт большей или меньшей грузоподъемностью</p>
					<h2>Принимаем к оплате следующие пластиковые карты:</h2>
					<table>
					<tbody>
					<tr>
					<td><img style={{margin: '15px 5px'}} alt="visa-icon" width="130" height="50" src={visaIcon}/></td>
					<td>
					<p className="tmg_comment"><strong>Оплата пластиковыми картами Visa.</strong><br/>
					Приём платежей обеспечивает <a href="http://www.vtb.ru/" target="_top" rel="noopener noreferrer">Банк ВТБ (ПАО)</a>.</p>
					</td>
					</tr>
					<tr>
					<td><img alt="mastercard-icon" style={{margin: '15px 5px'}} src={masterCardIcon}  width="130" height="50"/></td>
					<td>
					<p className="tmg_comment"><strong>Оплата пластиковыми картами MasterCard.</strong><br/>
					Приём платежей обеспечивает <a href="http://www.vtb.ru/" target="_top" rel="noopener noreferrer">Банк ВТБ (ПАО)</a>.</p>
					</td>
					</tr>
					<tr>
					<td><img style={{margin: '15px 5px'}} alt="mir-icon" src={mirIcon} width="130" height="50"/></td>
					<td>
					<p className="tmg_comment"><strong>Оплата с помощью национальных платежных карт «Мир».</strong><br/>
					Приём платежей обеспечивает <a href="http://www.vtb.ru/" target="_top" rel="noopener noreferrer">Банк ВТБ (ПАО)</a>.</p>
					</td>
					</tr>
					</tbody>
					</table>
					<p><a href="/pravila_oplaty.pdf" target="_blank" rel="noopener noreferrer">*правила оплаты</a></p>
					<p><a href="/otkaz_ot_uslugi.pdf" target="_blank" rel="noopener noreferrer">*отказ от услуги</a></p>
					<p><a href="/vozvrat_tovara.pdf" target="_blank" rel="noopener noreferrer">*возврат товара</a></p>
					<p><a href="/rekvizity.pdf" target="_blank" rel="noopener noreferrer">*реквизиты организации</a></p>
				</div>
			</div>
		</>
	);
};

export default PaymentDeliveryPage;