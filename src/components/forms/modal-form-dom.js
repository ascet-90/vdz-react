import React, {useState, useEffect} from 'react';
import InputMask from 'react-input-mask';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ModalFormDom = React.forwardRef(({onSubmit, formTitle, formSubtitle, submitText, formIsSent, onPolicyClick, children}, ref) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [accepted, setAccepted] = useState(true);
	const [formValid, setFormValid] = useState(false);
	const [formLoading, setFormLoading] = useState(false);

	useEffect(() => {
		if(formIsSent) {	
			setPhone('');
			setName('');
			setEmail('');
			setAddress('');
			setFormLoading(false);
		}
	}, [formIsSent]);

	const onNameChange = e => setName(e.target.value);	
	const onAcceptanceChange = e => setAccepted(e.target.checked);
	const onPhoneChange = e => {
		const tel = e.target.value;
		if(tel && tel.indexOf('_') === -1) {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
		setPhone(e.target.value);
	};
	const onFormSubmit = e => {
		e.preventDefault();		
		if(formValid) {		
			setFormLoading(true);	
			onSubmit(e);
		}		
	};

	return (
		<form method="post" ref={ref} onSubmit={onFormSubmit}>
			<div className="form_title">{formTitle}</div>
			<div className="form_subtitle">{formSubtitle}</div>
			<div className="form_row d-flex">
				<label className="name">
					<span className="form_control_wrap">
						<input 
							type="text" 
							name="your_name" 
							aria-required="true" 
							aria-invalid="false" 
							placeholder="Ваше имя" 
							required={true} 
							value={name} 
							onChange={onNameChange}/>
					</span>
				</label>
				<label className="email">
					<span className="form_control_wrap">
						<input 
							type="email" 
							required
							name="your_email" 
							aria-required="true" 
							aria-invalid="false" 
							placeholder="Ваш email"
							value={email}
							onChange={e => setEmail(e.target.value)}/>
					</span>
				</label>				
			</div>
			<div className="form_row d-flex">
				<label className="phone">
					<span className="form_control_wrap">
						<InputMask 
							type="tel" 
							placeholder="Ваш телефон" 
							aria-required="true" 
							aria-invalid="false" 
							mask="+7 (999) 999-99-99" 
							name="your_tel" 
							required={true} 
							value={phone} 
							onChange={onPhoneChange}/>										
					</span>
				</label>
				<label className="address">
					<span className="form_control_wrap">
						<input 
							type="text" 
							placeholder="Адрес доставки" 
							aria-required="true" 
							aria-invalid="false"  
							name="your_address" 
							required={true} 
							value={address} 
							onChange={e => setAddress(e.target.value)}/>										
					</span>
				</label>
			</div>
			<p>
				<input type="submit" value={submitText} disabled={!accepted}/>
				{formLoading && <span className="ajax-loader"></span>}
				<span className="form_control_wrap">
					<span className="form_acceptance">
						<label>
							<input type="checkbox" name="acceptance" aria-invalid="false" checked={accepted} onChange={onAcceptanceChange}/>
							<span>Нажимая кнопку, я даю согласие на обработку персональных данных и соглашаюсь с <Link onClick={onPolicyClick} to="/privacy-policy">политикой конфиденциальности</Link></span>
						</label>
					</span>
				</span>
				{children}
			</p>
		</form>
	);
});

ModalFormDom.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	formTitle: PropTypes.string,
	formSubtitle: PropTypes.string,
	submitText: PropTypes.string,
	formIsSent: PropTypes.bool,
	onPolicyClick: PropTypes.func
};

export default ModalFormDom;