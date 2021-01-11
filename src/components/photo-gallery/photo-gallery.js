import {useState} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import PropTypes from 'prop-types';

const PhotoGallery = ({photos}) => {
	const [photoIndex, setPhotoIndex] = useState(0);	
	const [isOpen, setIsOpen] = useState(false);

	const onGalleryPhotoClick = (event, index) => {
		event.preventDefault();
		setPhotoIndex(index);
		document.body.style.overflowY = 'hidden';
		setIsOpen(true)
	};
	const renderGallery = photos => {
		return photos.map((photo, index) => {
			return (
				<div className="media_gallery_item" key={photo.id}>
					<a href={photo.imageURL} onClick={e => onGalleryPhotoClick(e, index)}>
						<img alt={photo.alt} src={photo.imageURL}/>
					</a>
				</div>
			);
		});
	};

	return (
		<div className="media_gallery d-flex">
			{photos.length > 0 && renderGallery(photos)}								
			{(isOpen && photos.length > 0) && (
        <Lightbox
          mainSrc={photos[photoIndex].imageURL}
          nextSrc={photos[(photoIndex + 1) % photos.length].imageURL}
          prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].imageURL}
          onCloseRequest={() => {
          	document.body.style.overflowY = 'auto';
          	setIsOpen(false);
          }}
          onMovePrevRequest={() => setPhotoIndex(photoIndex => (photoIndex + photos.length - 1) % photos.length)}
          onMoveNextRequest={() => setPhotoIndex(photoIndex => (photoIndex + 1) % photos.length)}/>
      )}
		</div>
	);
};

PhotoGallery.propTypes = {
	photos: PropTypes.array
};

export default PhotoGallery;