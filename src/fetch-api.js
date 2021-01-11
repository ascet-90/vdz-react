const baseURL = 'http://localhost:3001';

const fetchPosts = () => fetch(baseURL + '/posts').then(res => res.json());
const fetchCategories = () => fetch(baseURL + '/categories').then(res => res.json());

const getPostCategories = postId => fetch(baseURL + `/post_cats/${postId}`).then(res => res.json());

const getAllPostsCategories = posts => Promise.all(posts.map(post => { 
  return getPostCategories(post.id).then(cats => {
    post.categories = [];
    if(cats.length > 0){            
      cats.forEach(cat => post.categories.push({
        name: cat.name, 
        id: cat.id
      }));
    }          
    return post;
  });
}));

const postData = body => fetch(baseURL + '/post', {
	method: 'POST',
	headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json());

export {
	fetchPosts,
	postData,
	fetchCategories,
	getPostCategories,
	getAllPostsCategories
};