import specialBg from '../../img/special-bg.png';
import offerBig from '../../img/offer-big.png';
import offer1 from '../../img/offer-1.png';
import offer2 from '../../img/offer-2.png';

const SpecialOffers = () => {
	const offers = [
		{
			id: 1,
			title: '-25%',
			text: 'на деревообработку',
			bgImageUrl: offerBig
		},
		{
			id: 2,
			title: '-25% на деревообработку',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor',
			bgImageUrl: offer1
		},
		{
			id: 3,
			title: 'Осенее \n предложение',
			text: 'на деревообработку',
			bgImageUrl: offer2
		}
	];
	const renderOffers = () => {
		return offers.map((offer, index)=> {
			if(index > 0) {
				return (
					<div className="offer" key={offer.id}>
						<div className="offer_inner" style={{backgroundImage:`url(${offer.bgImageUrl})`}}>
							<div className="offer_content">
								<div className="offer_title">{offer.title}</div>
								<div className="offer_text">{offer.text}</div>
							</div>
						</div>
					</div>
				);
			}
			return null;
		});
	};
	return (
		<section className="special_offers">
			<div className="special_offers_bg">
				<img alt="special-bg" src={specialBg}/>
			</div>
			<div className="container">
				<h2 className="section_title">Специальные предложения</h2>
				<div className="special_offers_list_wrap">
					<div className="special_offers_list d-flex">
						<div className="offer big">
							<div className="offer_inner" style={{backgroundImage:`url(${offers[0].bgImageUrl})`}}>
								<div className="offer_content">
									<div className="offer_title">{offers[0].title}</div>
									<div className="offer_text">{offers[0].text}</div>
								</div>						
							</div>					
						</div>
						<div className="offers_wrap">
							{renderOffers()}							
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SpecialOffers;