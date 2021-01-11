import {useState, useRef, useEffect} from 'react';
import InputMask from 'react-input-mask';
import {withFetchProductsService} from '../../hoc-helpers';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const FormWidget = ({postForm, style, title, submitText}) => {
	const [name, setName] = useState('');
	const [tel, setTel] = useState('');
	const [formLoading, setFormLoading] = useState(false);
	const [accepted, setAccepted] = useState(true);
	const [formValid, setFormValid] = useState(false);
	const [formSent, setFormSent] = useState(false);
	const form = useRef(null);
	const mounted = useRef(true);

	useEffect(() => {
		return () => mounted.current = false;
	}, []);

	const onTelChange = e => {
		const tel = e.target.value;
		if(tel && tel.indexOf('_') === -1) {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
		setTel(e.target.value);
	};

	const onFormSubmit = e => {
		setFormSent(false);	
		e.preventDefault();		
		if(formValid) {			
			const formData = new FormData(form.current);			
			postForm(formData).then(data => {
				if(data.status === 'ok' && mounted.current) {
					setFormSent(true);
					setFormLoading(false);
					setName('');
					setTel('');
				}
			});
			setFormLoading(true);
		}		
	};

	return (
		<div className="widget widget_form">
			<div role="form" className="widget_form_inner" style={style ? style : {}}>
				<form method="post" onSubmit={onFormSubmit} ref={form}>
					<div className="form_title">{title}</div>
					<p>
						<label className="name">
							<span className="form_control_wrap">
								<input 
									type="text" 
									name="your-name" 
									className="form_control" 
									required										
									aria-invalid="false" 
									placeholder="Ваше имя" 
									aria-required={true}
									value={name} 
									onChange={e => setName(e.target.value)}/>
							</span>
						</label>
						<label className="phone">
							<span className="form_control_wrap">
							<InputMask 
								className="form_control" 
								type="tel" 
								placeholder="Ваш телефон" 
								aria-required="true" 
								aria-invalid="false" 
								mask="+7 (999) 999-99-99" 
								name="your_tel" 
								required={true} 
								value={tel} 
								onChange={onTelChange}/>	
							</span>
						</label>
						<input type="submit" value={submitText} disabled={!accepted}/>
						{formLoading && <div className="ajax_loader_wrap"><span className="ajax-loader"></span></div>}
						<span className="form_control_wrap">
							<span className="form_acceptance">
								<label>
									<input type="checkbox" name="acceptance" aria-invalid="false" checked={accepted} onChange={e => setAccepted(e.target.checked)}/>
									<span>Нажимая кнопку, я даю согласие на обработку персональных данных и соглашаюсь с <Link to="/privacy-policy">политикой конфиденциальности</Link></span>
								</label>
							</span>
						</span>
					</p>
				</form>
				{formSent && <div className="form_sent">Письмо успешно отправлено! Спасибо за заявку!</div>}
			</div>
		</div>
	);
};

const mapMethodsToProps = productsService => {
	return {
		postForm: productsService.postForm
	};
};

FormWidget.propTypes = {
	postForm: PropTypes.func.isRequired,
	style: PropTypes.object,
	title: PropTypes.string,
	submitText: PropTypes.string.isRequired
};

export default withFetchProductsService(mapMethodsToProps)(FormWidget);