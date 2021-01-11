import React from 'react';
import calculateBg from '../../img/calculate-bg.png';
import formImageBg from '../../img/form-image-bg.png';
import {CatalogForm} from '../forms';

const Calculate = React.forwardRef(({formRef, onSubmit, formSent}, ref) => {
	return (
		<section className="calculate">
			<div className="calculate_bg">
				<img alt="calculate-bg" src={calculateBg}/>
			</div>
			<div className="container">			
				<div className="calculate_from_wrap">				
					<div className="form">
						<div className="calculate_title">
							Закажите расчет стоимости материалов
						</div>
						<CatalogForm ref={ref} onSubmit={onSubmit} formIsSent={formSent}/>
						{formSent && <div className="form_sent">Письмо успешно отправлено! Спасибо за заявку!</div>}
						</div>
					<div className="form_image d-flex">
						<img alt="form-bg" src={formImageBg}/>
					</div>
				</div>			
			</div>	
		</section>
	);
});

export default Calculate;