export default class FetchProductsService {
	_staticURL = 'http://localhost:3001';
	_baseURL =  this._staticURL + '/api';

	getProducts = () => fetch(this._baseURL + '/products').then(res => res.json())

	getProduct = slug => fetch(this._baseURL + `/product/${slug}`).then(res => {
		if(res.ok){
			return res.json();
		} else {
			return {};
		}
	})
		.then(product => {
			return {
				...product,
				link: `/product/${product.slug}`,
				thumbnail: product.thumbnail !== '' ? this._staticURL + product.thumbnail : '',
				video_preview: this._staticURL + product.video_preview,
				gallery: product.gallery && product.gallery.map(img => {
					return {
						...img,
						imageURL: this._staticURL + img.imageURL
					};
				}),
				description_gallery: product.description_gallery && product.description_gallery.map(img => {
					return {
						...img,
						imageURL: this._staticURL + img.imageURL
					};
				})
			}
		});

	getCategories = () => fetch(this._baseURL + '/categories').then(res => res.json()).then(categories => {
		return categories.map(cat => {
			return {
				...cat,
				link: `/catalog/${cat.slug}`,
				thumbnail: this._staticURL + cat.thumbnail
			};
		});
	})

	getProductCategories = productId => fetch(this._baseURL + `/product_cats/${productId}`).then(res => res.json())
	.then(categories => {
		return categories.map(category => {
			return {
				...category,
				link: `/catalog/${category.slug}`
			};
		})
	})

	getAllProductsCategories = products => {
		const productsCopy = [...products];
		return Promise.all(productsCopy.map(product => { 
		  return this.getProductCategories(product.id).then(cats => {
		  	const newProduct = {...product};
		    newProduct.categories = [];
		    if(cats.length > 0){            
		      cats.forEach(cat => newProduct.categories.push({
		        name: cat.name, 
		        id: cat.id
		      }));
		    }          
		    return newProduct;
		  });
		}))
	}

	getProductsWithCategories = () => fetch(this._baseURL + '/products_with_cats').then(res => res.json())

	postForm = formData => fetch(this._baseURL + '/post', {
		method: 'POST',
	  body: formData
	}).then(res => res.json())

	getSubCategoriesForCategory = (catId, alllevels = false) => {
		let url = this._baseURL + `/subcategories/${catId}`;
		if(alllevels) {
			url += '?allLevels=true';
		}
		return fetch(url).then(res => res.json()).then(categories => {
			return categories.map(cat => {
				return {
					...cat,
					link: `/catalog/${cat.slug}`,
					thumbnail: cat.thumbnail !== '' ? this._staticURL + cat.thumbnail : ''
				};
			});
		})
	}
	getCategoryBySlug = slug => fetch(this._baseURL + `/category/${slug}`).then(res => {
		if(res.ok){
			return res.json();
		} else {
			return {};
		}
	})
	getCategoryById = id => fetch(this._baseURL + `/category?id=${id}`).then(res => {
		if(res.ok){
			return res.json().then(category => {
				return {
					...category,
					link: `/catalog/${category.slug}`
				};
			});
		} else {
			return {};
		}
	})

	getAllProductsForCategories = (catsIds = [], query = '') => {
		const queryString = query === '' ? query : `&${query}`;
		return fetch(this._baseURL + `/productsForCategories/?catsIds=${catsIds}${queryString}`)
		.then(res => res.json()).then(products => products.map(product => {
			return {
				...product,
				link: `/product/${product.slug}`,
				thumbnail: product.thumbnail !== '' ? this._staticURL + product.thumbnail : ''
			};
		}));
	}

	getSimilarProducts = productId => {
		return fetch(this._baseURL + `/similarProducts/${productId}`)
		.then(res => res.json()).then(products => products.map(product => {
			return {
				...product,
				link: `/product/${product.slug}`,
				thumbnail: product.thumbnail !== '' ? this._staticURL + product.thumbnail : ''
			};
		}));
	}

	getProductionPageGallery = () => fetch(this._baseURL + `/production_gallery`).then(res => res.json())
		.then(gallery => gallery.map(photo => {
			return {
				...photo,
				imageURL: this._staticURL + photo.imageURL
			};
		}))
};