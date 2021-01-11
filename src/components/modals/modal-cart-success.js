import {useRef, useEffect} from 'react';
import closeIcon from '../../img/close.png';
import PropTypes from 'prop-types';

const ModalCartSuccess = ({id, onShowToggle, show}) => {
	useEffect(() => {
		if(show) {
			document.body.style.overflowY = 'hidden';
		}		
		else document.body.style.overflowY = 'auto';
	}, [show]);

	useEffect(() => {
		return () => document.body.style.overflowY = 'auto';
	}, []);

	const classes = ["modal"];
	if(show) {
		classes.push("open");
	}
	const modalBody = useRef(null);
	const onModalClick = e => {
		if(!modalBody.current.contains(e.target)){
			onShowToggle();
		}
	};

	return (
		<div id={id} className={classes.join(" ")} onClick={onModalClick}>
		  <div className="modal_sandbox"></div>
		  <div className="modal_box">
		    <div className="modal_body" ref={modalBody}>
		      <div className="form">
		        <div className="form_title">Спасибо за заказ!</div>
		        <div className="form_subtitle">Ваша заявка отправлена!</div>		        
		        <div className="close" onClick={onShowToggle}>
		          <img alt="close" src={closeIcon}/>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
	);
};

ModalCartSuccess.propTypes = {
	id: PropTypes.string,
	onShowToggle: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired
}

export default ModalCartSuccess;