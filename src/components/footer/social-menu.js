import vk from '../../img/vk.png';
import youtube from '../../img/youtube.png';
import instagram from '../../img/instagram.png';

const SocialMenu = () => {
	const icons = [
		{link: "#", iconURL: vk},
		{link: "#", iconURL: youtube},
		{link: "#", iconURL: instagram}
	];

	return (
		<div className="social_icons d-flex">
			{
				icons.map((icon, index) => {
					return (							
						<div className="social_icon" key={index}>
							<a href={icon.link}><img alt="social-icon" src={icon.iconURL}/></a>
						</div>			
					);
				})
			}
		</div>
	);	
};

export default SocialMenu;