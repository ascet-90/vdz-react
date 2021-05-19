import Mobilemenu from './mobile-menu';
import {withRouter, Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Collapse from '@material-ui/core/Collapse';
import logo from '../../img/logo.png';
import darkLogo from '../../img/logo-dark.png';
import locationImg from '../../img/location.png';
import mail from '../../img/mail.png';
import whatsapp from '../../img/whatsapp.png';
import viber from '../../img/viber.png';
import HeaderMenu from './header-menu';
import PropTypes from 'prop-types';

const Header = ({location, onModalToggle}) => {
	const isFrontPage = location.pathname === '/';
	const theme = isFrontPage ? 'dark' : '';
	const [menuOpened, setMenuOpened] = useState(false);
	const headerTop = useRef(null);
	const [menuFixed, setMenuFixed] = useState(false);

	const toggleOpen = () => {
		setMenuOpened(opened => {
			document.body.style.overflowY = !opened ? 'hidden' : 'auto';
			return !opened;
		});		
	};
	const headerClasses = menuOpened ? ' open' : '';
	const fixedClass = menuFixed ? ' fixed' : '';

	useEffect(() => {
		setMenuOpened(false);
	}, [location.pathname]);
	
	useEffect(() => {		
		function toggleMobileMenu() {
			if(window.innerWidth > 1024) {				
				setMenuOpened(opened => {
					if(opened) {
						document.body.style.overflowY = 'auto';
					}
					return false;
				});
			}
		}
		let headerHeight = headerTop.current.offsetHeight;		
		
		function onScroll() {		
			if(window.innerWidth > 1024 && window.pageYOffset >= headerHeight) {
				setMenuFixed(true);
			} else {
				setMenuFixed(false);
			}
		}
		function onResize() {
			headerHeight = headerTop.current.offsetHeight;
			onScroll();
		}
		onScroll();
    window.addEventListener('resize', toggleMobileMenu);
    window.addEventListener('resize', onResize);    
		window.addEventListener('scroll', onScroll);

    return () => {
    	window.removeEventListener('resize', toggleMobileMenu);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
    }
  }, []);	

	return (
		<header id="header" className={`header ${theme}${headerClasses}${fixedClass}`}>
			<Mobilemenu toggleOpen={toggleOpen} opened={menuOpened} theme={theme}/>
			<Collapse in={menuOpened}>
				<div className="header_inner">
					<div className="container">
						<div className="header_top d-flex" ref={headerTop}>
							<div className="logo">
							{!isFrontPage ? <Link to="/"><img alt="logo" src={darkLogo}/></Link> : <img alt="logo" src={logo} />}
							</div>
							<div className="header_info_wrap d-flex">
								<div className="header_info">
									<div className="description">
										<p>Продажа пиломатериалов со склада производителя в <em>Москве и МО</em></p>
									</div>
									<div className="work_since">
										Работаем с 2005 года
									</div>
								</div>
								<div className="header_location">
									<div className="item address d-flex">
										<img alt="location" src={locationImg}/>
										<p>Адрес производства: МО, Воскресенск, ул. Конная, д. 4</p>
									</div>
									<div className="item email d-flex">
										<img alt="mail" src={mail}/>
										<a href="mailto:zakaz@les-zavod.ru">zakaz@les-zavod.ru</a> 
									</div>
								</div>
								<div className="header_tel">
									<div className="item d-flex">
										<a href="tel:74959259911">+7 (495) 925-99-11</a>
										<a className="whatsapp" href="/"><img alt="icon" src={whatsapp}/></a> 
										<a href="/"><img alt="icon" src={viber}/></a> 
									</div>
									<div className="item d-flex">
										<a href="tel:74951569786">+7 (495) 156-97-86</a>
										<a className="whatsapp"  href="/"><img alt="icon" src={whatsapp}/></a> 
										<a href="/"><img alt="icon" src={viber}/></a> 
									</div>
								</div>
							</div>
							<button className="order_call" onClick={onModalToggle}>Заказать звонок</button>
						</div>
					</div>
					<div className={`header_bottom${fixedClass}`}>
						<div className="container">
							<div className="menu_wrap d-flex">												
								<HeaderMenu/>
								<button className="order_call" onClick={onModalToggle}>Заказать звонок</button>										
							</div>	
						</div> 
					</div>
				</div>
			</Collapse>			
		</header>
	);
};

Header.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string
	}),
	onModalToggle: PropTypes.func.isRequired
};

export default withRouter(Header);