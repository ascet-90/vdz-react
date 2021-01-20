const express = require('express');
const multer = require('multer')();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../public')));

app.post('/api/post', multer.array(), function(req, res) {
	console.log(req.body);
	res.send({status: 'ok'});
});	

function sortBy(sort, data, order = 'asc') {
	if(order === 'desc') {
		return data.sort((a, b) => {
	  	if(a[sort] < b[sort]) {
	  		return 1;
	  	}
	  	else if(a[sort] > b[sort]) {
	  		return -1;
	  	} else return 0;
	  });
	} 
	return data.sort((a, b) => {
  	if(a[sort] < b[sort]) {
  		return -1;
  	}
  	else if(a[sort] > b[sort]) {
  		return 1;
  	} else return 0;
  });	
}

app.get('/api/products', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
	  if (err) throw err;
	  const products = JSON.parse(data).products;
	  res.json(products);
	});
});	

app.get('/api/product/:slug', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
	  if (err) throw err;
	  const products = JSON.parse(data).products;
	  const product = products.find(prod => prod.slug === req.params.slug);
	  if(product){
	  	res.json(product);
	  } else {
	  	res.status(404).send();
	  }	  
	});
});

app.get('/api/categories/', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
	  if (err) throw err;
	  const categories = JSON.parse(data).categories;
	  if(req.query.include && req.query.include === 'all') {
	  	res.json(sortBy('name', categories));
	  } else {
			res.json(sortBy('name', categories.filter(cat => cat.parent_id === 0)));
	  }	  
	});
});

app.get('/api/product_cats/:id', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
	  if (err) throw err;
	  const products = JSON.parse(data).products;
	  const categories = JSON.parse(data).categories;
	  const product = products.find(product => product.id === parseInt(req.params.id));
	  const cats = [];
	  product.category_ids.forEach(catId => {
	  	cats.push(categories.find(category => category.id === catId));
	  });
	  // const cats = categories.filter(cat => product.category_ids.includes(cat.id));
	  res.json(cats);
	});
});

app.get('/api/products_with_cats', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
	  if (err) throw err;
	  const products = JSON.parse(data).products;
	  const categories = JSON.parse(data).categories;
	 	const resultProducts = products.map(product => {
	 		const cats = categories.filter(cat => product.category_ids.includes(cat.id));
	 		product.categories = cats.map(cat => {
	 			return {
	 				name: cat.name,
	 				id: cat.id 
	 			};
	 		});
	 		return product;
	 	});
	  res.json(resultProducts);
	});
});


app.get('/api/subcategories/:catId', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
	  if (err) throw err;
	  const categories = JSON.parse(data).categories;
	  if(req.query.allLevels !== 'true') {
	  	const subcategories = categories.filter(cat => cat.parent_id === parseInt(req.params.catId));	
	  	res.json(sortBy('name', subcategories));	
	  	return; 
		}	   
	  const parent = categories.find(cat => cat.id === parseInt(req.params.catId));	
	  let subcategories = categories.filter(cat => cat.parent_id === parent.id);
	  const result = [...subcategories];
	  while(subcategories.length > 0) {
	  	let temp = [];
	  	subcategories.forEach(cat => {
	  		temp = categories.filter(category => category.parent_id === cat.id);
	  		result.push(...temp);
	  	});
	  	subcategories = temp;
	  }	  
	  res.json(sortBy('name', result));
	});
});

app.get('/api/category/:slug', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
		if (err) throw err;
	  const categories = JSON.parse(data).categories;
	  const category = categories.find(cat => cat.slug === req.params.slug);
	  if(category){
	  	res.json(category);
	  } else {
	  	res.status(404).send();
	  }	 
	});
});
app.get('/api/category', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
		if (err) throw err;
	  const categories = JSON.parse(data).categories;
	  const category = categories.find(cat => cat.id === parseInt(req.query.id));
	  if(category){
	  	res.json(category);
	  } else {
	  	res.status(404).send();
	  }	 
	});
});

app.get('/api/productsForCategories/', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
		if (err) throw err;
	  const categories = JSON.parse(data).categories;
	  const products = JSON.parse(data).products;
	  const catsIdsArray = req.query.catsIds.split(',');
	  const productCats = categories.filter(cat => catsIdsArray.includes(`${cat.id}`));
	  const productIds = productCats.reduce((acc, current) => {
	  	return [...acc, ...current.product_ids];
	  }, []);
	  const productsSetIds = new Set(productIds);
	  const ids = Array.from(productsSetIds);
	  const orderBy = req.query.orderby;
	  const order = req.query.order;
	  let result = products.filter(product => ids.includes(product.id));
	  if(req.query.exclude) {
	  	result = products.filter(product => product.id !== parseInt(req.query.exclude));
	  }
	  switch(orderBy){
	  	case 'date':
	  		result = sortBy('date', result, order);	  		
	  		break;
	  	case 'price':
	  		result = sortBy('price', result, order);	  		
	  		break;
	  	case 'area':
	  		result = sortBy('area', result, order);	  		
	  		break;
	  	default:
	  		break;
	  }	  
	 	setTimeout(() => res.json(result), 1000);
	});
});
app.get('/api/similarProducts/:productId', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
		if (err) throw err;
	  const categories = JSON.parse(data).categories;
	  const products = JSON.parse(data).products;
	  const product = products.find(product => product.id === parseInt(req.params.productId));
	  if(product){
	  	const catsIdsArray = product.category_ids;
	  	const productCats = categories.filter(cat => catsIdsArray.includes(cat.id));
		  const productIds = productCats.reduce((acc, current) => {
		  	return [...acc, ...current.product_ids];
		  }, []);
		  const productsSetIds = new Set(productIds);
		  const ids = Array.from(productsSetIds);
		  const result = products.filter(product => {
		  	return (ids.includes(product.id) && product.id !== parseInt(req.params.productId));
		  });
	 		setTimeout(() => res.json(result), 1000);
	  } else {
	  	res.status(404).send();
	  };	  
	});
});

app.get('/api/production_gallery', function(req, res) {
	fs.readFile(path.join(__dirname, 'database.json'), 'utf8', function (err, data) {
		if (err) throw err;
		const photos = JSON.parse(data).production_page_gallery.photos;
		res.json(photos);
	});
});

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3001);