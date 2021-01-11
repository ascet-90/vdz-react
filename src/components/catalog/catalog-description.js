import parse from 'html-react-parser';

const CatalogDescription = ({catalog}) => {
	if(catalog.description_title || catalog.description) {
		return (
			<section className="catalog_description">
				<div className="container">
					{catalog.description_title && <h2 className="section_title">{catalog.description_title}</h2>}
					<div className="description_content">
						 {catalog.description && parse(catalog.description)}
					</div>
				</div>
			</section>
		);
	}
	return <div className="catalog_description_empty"></div>;
};

export default CatalogDescription;