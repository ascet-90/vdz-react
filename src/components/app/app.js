import {useState, useEffect} from 'react';
import Header from '../header';
import {Route, Switch} from 'react-router-dom';
import {
  HomePage, 
  DefaultPage, 
  ProductionPage, 
  CatalogArchive, 
  PaymentDeliveryPage, 
  CartPage, 
  CatalogPage, 
  ConstructionPage, 
  ContactsPage,
  CreditPage,
  PrivacyPolicyPage
} from '../pages';
import {FetchProductsContextProvider} from '../fetch-products-context';
import {LocalStorageContextProvider} from '../localstorage-context';
import {FetchProductsService} from '../../services';
import Footer from '../footer';
import {YMaps} from 'react-yandex-maps';
import SingleProduct from '../product';
import Cart from '../cart';
import ScrollToTop from './scroll-top';

const App = () => {
  const [productsService] = useState(new FetchProductsService());
  const [cartProducts, setCartProducts] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);  

  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem('products'));
    if(cartProducts) {
      setCartProducts(cartProducts);
    }
  }, []);
  
  const onOrderModalToggle = () => setShowOrderModal(show => !show);

  const onCartProductsChange = cartProduct => {
    if(Array.isArray(cartProduct)) {
      const nullPriceProducts = [];
      cartProduct.forEach(prod => {
        if(prod.countPriceCubic === null
          && prod.countPricePiece === null
          && prod.countPricePack === null
          && prod.countPriceSquare === null) {
          nullPriceProducts.push(prod.id);
        }
      });      
      const newProducts = cartProduct.filter(prod => !nullPriceProducts.includes(prod.id))
      setCartProducts(newProducts);      
      localStorage.setItem('products', JSON.stringify(newProducts));
      return;
    }
    const foundProductIndex = cartProducts.findIndex(prod => prod.id === cartProduct.id);    
    let newCartProducts = [...cartProducts];
    if(foundProductIndex === -1) {      
      newCartProducts.push(cartProduct);
    } else {
      if(cartProduct.countPriceCubic === null
        && cartProduct.countPricePiece === null
        && cartProduct.countPricePack === null
        && cartProduct.countPriceSquare === null) {
        newCartProducts = newCartProducts.filter(product => product.id !== cartProduct.id);
      } else {
        newCartProducts[foundProductIndex] = cartProduct;      
      }
    }
    setCartProducts(newCartProducts);
    localStorage.setItem('products', JSON.stringify(newCartProducts));
  };

  return (
    <YMaps>
      <ScrollToTop />
      <LocalStorageContextProvider value={{cartProducts, onCartProductsChange}}>
        <FetchProductsContextProvider value={productsService}>
          <div className="wrapper">
          	<Header onModalToggle={onOrderModalToggle}/>
            <Switch>
              <Route path="/" exact>
                <HomePage onOrderModalToggle={onOrderModalToggle}/>
              </Route>
              <Route path="/production">
                <ProductionPage onOrderModalToggle={onOrderModalToggle}/>
              </Route>
              <Route path="/catalog/:slug" render={({match}) => <CatalogArchive match={match} onOrderModalToggle={onOrderModalToggle} />}/>
              <Route path="/product/:slug" render={
                ({match}) => <SingleProduct match={match} onOrderModalToggle={onOrderModalToggle}/>
              }/>
              <Route path="/payment-delivery" component={PaymentDeliveryPage} />
              <Route path="/cart" component={CartPage} />
              <Route path="/catalog">
                <CatalogPage onOrderModalToggle={onOrderModalToggle}/>
              </Route>
              <Route path="/construction" >
                <ConstructionPage onOrderModalToggle={onOrderModalToggle}/>
              </Route>
              <Route path="/contacts">
                <ContactsPage onOrderModalToggle={onOrderModalToggle}/>
              </Route>
              <Route path="/credit">
                <CreditPage onOrderModalToggle={onOrderModalToggle}/>
              </Route>
              <Route path="/privacy-policy">
                <PrivacyPolicyPage onOrderModalToggle={onOrderModalToggle}/>
              </Route>
              <Route component={DefaultPage}/>              
            </Switch>
            <Cart cartProducts={cartProducts}/>
            <Footer showOrderModal={showOrderModal} onModalToggle={onOrderModalToggle}/>
          </div>
        </FetchProductsContextProvider>
      </LocalStorageContextProvider>
    </YMaps>
  );
};
 
export default App;
