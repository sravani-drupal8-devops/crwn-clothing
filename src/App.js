import './App.css';

import React from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage  from './pages/checkout/checkout.component';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';
import {setCurrentUser} from './redux/user/user.actions';
//import{ selectCollectionPreview } from './redux/shop/shop.selector';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';



class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const auth = getAuth();
    const { setCurrentUser } = this.props;
    //const mad = Object.values(collections);
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      }
      setCurrentUser(userAuth);
      /**addCollectionAndDocuments('collections', 
      collectionArray.map(({title, items}) => ({title, items})));*/
    });
  }


  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/checkout' component={CheckoutPage}></Route>
          <Route 
            path='/signin' 
            render={() => 
              this.props.currenUser ? (
              <Redirect to='/'/>
            ) : (
              <SignInAndSignUpPage />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currenUser: selectCurrentUser,
  //collectionArray: selectCollectionPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
