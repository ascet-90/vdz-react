import close from '../../img/close.png';
import {useState, useRef, useEffect} from 'react';
import {withFetchProductsService} from '../hoc-helpers';
import {ModalForm} from '../forms';
import PropTypes from 'prop-types';

const Modal = ({show, onShowToggle, postForm, id, formTitle, formSubtitle, submitText}) => {	
	const [formSent, setFormSent] = useState(false);
	const mounted = useRef(true);

	useEffect(() => {
		return () => {
			document.body.style.overflowY = 'auto';
			mounted.current = false;
		}
	}, []);

	useEffect(() => {
		if(show) document.body.style.overflowY = 'hidden';
		else document.body.style.overflowY = 'auto';
	}, [show]);

	const classes = ["modal"];
	if(show) {
		classes.push("open");
	}
	const modalBody = useRef(null);
	const form = useRef(null);
	const onModalClick = e => {
		if(!modalBody.current.contains(e.target)){
			onShowToggle();
			setFormSent(false);
		}
	};

	const onSubmit = e => {
		setFormSent(false);				
		const formData = new FormData(form.current);
		postForm(formData).then(data => {
			if(data.status === 'ok' && mounted.current) {
				setFormSent(true);
			}
		});
	};

	return (
		<div id={id} className={classes.join(" ")} onClick={onModalClick}>
		  <div className="modal_sandbox"></div>
		  <div className="modal_box">
		    <div className="modal_body" ref={modalBody}>
		    	<div className="form">
		    		<ModalForm 
		    			formTitle={formTitle}
		    			formSubtitle={formSubtitle}
		    			submitText={submitText}
		    			ref={form}
		    			formIsSent={formSent}
		    			onSubmit={onSubmit}
		    			onPolicyClick={onShowToggle}/>
		    		<div className="close" onClick={onShowToggle}>
		    			<img alt="close" src={close}/>
		    		</div>
		    		{formSent && <div className="form_sent">Письмо успешно отправлено! Спасибо за заявку!</div>}
		    	</div>
		    </div>
		  </div>
		</div>
	);
};

const mapMethodsToProps = productsService => {
	return {
		postForm: productsService.postForm
	};
};

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	onShowToggle: PropTypes.func.isRequired,
	postForm: PropTypes.func.isRequired,
	id: PropTypes.string,
	formTitle: PropTypes.string,
	formSubtitle: PropTypes.string,
	submitText: PropTypes.string
};

export default withFetchProductsService(mapMethodsToProps)(Modal);