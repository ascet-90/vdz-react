import {useState, useEffect, useRef} from 'react';
import Slider from "react-slick";
import Lightbox from 'react-image-lightbox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-image-lightbox/style.css';
import PropTypes from 'prop-types';

const DomkomplektGallerySlider = ({gallery}) => {  	
	const [slider, setSlider] = useState(null);
	const [sliderNav, setSliderNav] = useState(null);
	const [imageIndex, setImageIndex] = useState(0);	
	const [isOpen, setIsOpen] = useState(false);
	const sliderRef = useRef(null);
	const sliderNavRef = useRef(null);

	useEffect(() => {
		setSlider(sliderRef.current);
		setSliderNav(sliderNavRef.current);
	}, [sliderRef, sliderNavRef]);

	const sliderSettings = {
    dots: false,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll:1,
    infinite: false,
    asNavFor: sliderNav,
    responsive: [
      {
        breakpoint: 541,
        settings: {
            infinite: true
        } 
      }
    ]
  };
  const sliderSettingsNav = {
  	...sliderSettings,
  	focusOnSelect: true,
  	slidesToShow: 3,
  	vertical: true,
  	centerMode: false,                   
    centerPadding: 0,
    asNavFor: slider,
    responsive: [
      {
        breakpoint: 541,
        settings: {
            vertical: false,
            infinite: true
        }
      }
  	]
  };

  const onGalleryImageClick = (event, index) => {
		event.preventDefault();
    document.body.style.overflowY = 'hidden';
		setImageIndex(index);
		setIsOpen(true)
	};
	const galleryElem = gallery.map((image, index) => {
		return (
			<div className="slide" key={image.id}>
				<a href={image.imageURL} onClick={e => onGalleryImageClick(e, index)}><img alt={image.alt} src={image.imageURL}/></a>
			</div>
		);
	});
	return (
		<div className="catalog_single_gallery d-flex">
			<div className="catalog_single_slider">
  			<Slider {...sliderSettings} ref={slider => sliderRef.current = slider}>
  				{galleryElem}
  			</Slider>
			</div>
			<div className="catalog_single_slider_nav">
				<Slider {...sliderSettingsNav} ref={slider => sliderNavRef.current = slider}>
  				{gallery.map(image => {
		  			return (
		  				<div className="slide" key={image.imageURL}>
		  					<img alt={image.alt} src={image.imageURL}/>
		  				</div>
		  			);
		  		})}
  			</Slider>
			</div>
			{isOpen && (
        <Lightbox
          mainSrc={gallery[imageIndex].imageURL}
          nextSrc={gallery[(imageIndex + 1) % gallery.length].imageURL}
          prevSrc={gallery[(imageIndex + gallery.length - 1) % gallery.length].imageURL}
          onCloseRequest={() => {
            document.body.style.overflowY = 'auto';
            setIsOpen(false);
          }}
          onMovePrevRequest={() => setImageIndex(imageIndex => (imageIndex + gallery.length - 1) % gallery.length)}
          onMoveNextRequest={() => setImageIndex(imageIndex => (imageIndex + 1) % gallery.length)}/>
      )}
		</div>
	);
};

DomkomplektGallerySlider.propTypes = {
	gallery: PropTypes.array.isRequired
};

export default DomkomplektGallerySlider;