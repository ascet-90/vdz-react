import PropTypes from 'prop-types';

const Banner = ({imageURL, link}) => {
	const image = <img alt="" src={imageURL}/>;
	return (
		<div className="widget widget_banner">
			{link ? <a href={link}>{image}</a> : image}			
		</div>
	);
};

Banner.propTypes = {
	imageURL: PropTypes.string.isRequired,
	link: PropTypes.string
};

export default Banner;