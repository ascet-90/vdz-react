import {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';

const Sidebar = ({categories, children, match}) => {
	const [sidebarOpened, setSidebarOpened] = useState(false);
	const renderCategories = categories => {
		return (
			<ul className="widget catalog_categories">
				{
					categories.map(category => {
						const liClass = match.params.slug === category.slug ? 'active' : '';
						return (
							<li className={liClass} key={category.id} id={category.id}>
								<Link to={category.link}>{category.name}</Link>
							</li>
						);
					})
				}
			</ul>
		);
	};
	const togglerClass = 'sidebar_toggle' + (sidebarOpened ? ' active' : '');
	const sidebarClass = 'sidebar' + (sidebarOpened ? ' opened' : '');

	useEffect(() => {
		function toggleSidebar() {
			if(window.innerWidth > 768) {
				setSidebarOpened(false);
			}
		}
		window.addEventListener('resize', toggleSidebar);
		return () => window.removeEventListener('resize', toggleSidebar);
	}, []);

	return (
		<div id="sidebar" className={sidebarClass}>
			<div className="sidebar_header d-flex">
				<span>Каталог</span>
				<div className={togglerClass} onClick={() => setSidebarOpened(open => !open)}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<Collapse in={sidebarOpened}>
				<div className="sidebar_content">
					{categories && renderCategories(categories)}
					{children}
				</div>	
			</Collapse>			
		</div>
	);
};

Sidebar.propTypes = {
	categories: PropTypes.array,
	children: PropTypes.node,
	match: PropTypes.shape({
		params: PropTypes.shape({
			slug: PropTypes.string
		})
	}).isRequired
};

export default withRouter(Sidebar);