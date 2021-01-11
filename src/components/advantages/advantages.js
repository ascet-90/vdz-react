import parse from 'html-react-parser';
import advantagesBg from '../../img/advantages-bg.png';
import adv1 from '../../img/adv-1.png';
import adv2 from '../../img/adv-2.png';
import adv3 from '../../img/adv-3.png';
import adv4 from '../../img/adv-4.png';
import adv5 from '../../img/adv-5.png';

const Advantages = () => {
	const advantages = [
  	{
  		id: 1,
  		icon: adv1,
  		textContent: '<p>Существуем на рынке<br/><strong>более 15 лет</strong></p>'
  	},
  	{
  		id: 2,
  		icon: adv2,
  		textContent: '<p>Собственная<br/><strong>лесозаготовка</strong></p>'
  	},
  	{
  		id: 3,
  		icon: adv3,
  		textContent: '<p>Собственное<br/><strong>производство</strong></p>'
  	},
  	{
  		id: 4,
  		icon: adv4,
  		textContent: '<p><strong>Более 200</strong><br/>наименований в наличии</p>'
  	},
  	{
  		id: 5,
  		icon: adv5,
  		textContent: '<p><strong>Быстрая доставка</strong><br/>по Москве и МО</p>'
  	}
  ];

  return (
  	<section className="advantages">
			<div className="advantages_bg">
				<img alt="advantages-bg" src={advantagesBg}/>
			</div>
			<div className="container">
				<h2 className="section_title">Наши преимущества</h2>
				<div className="advantages_list d-flex">
					{advantages.map((avdantage, index) => {
						return (
							<div className="adv_item" key={avdantage.id}>
								<div className="adv_icon">
									<img alt={`adv-icon-${index}`} src={avdantage.icon}/>
								</div>									
								<div className="adv_content">
									{parse(avdantage.textContent)}
								</div>
							</div>
						);
					})}						
				</div>
			</div>
		</section>
  );
};

export default Advantages;