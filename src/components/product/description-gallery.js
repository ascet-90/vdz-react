import {Fragment, useState} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import PropTypes from 'prop-types';

const DescriptionGallery = ({gallery}) => {  	
	const [imageIndex, setImageIndex] = useState(0);	
	const [isOpen, setIsOpen] = useState(false);

	const onGalleryImageClick = (event, index) => {
		event.preventDefault();
		document.body.style.overflowY = 'hidden';
		setImageIndex(index);
		setIsOpen(true)
	};

	if(gallery.length > 0) {
		const galleryElem = gallery.map((image, index) => {
			return (
				<div className="media_gallery_item" key={image.id}>
					<a href={image.imageURL} onClick={e => onGalleryImageClick(e, index)}><img alt={image.alt} src={image.imageURL}/></a>
				</div>
			);
		});
		return (
  		<Fragment>
  			{galleryElem}
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
  		</Fragment>
  	);
	}
	return null;
};

DescriptionGallery.propTypes = {
	gallery: PropTypes.array.isRequired
};

export default DescriptionGallery;