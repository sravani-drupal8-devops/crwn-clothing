import React from 'react';

import CartItem from '../cart-item/cart-item.component';
import {connect} from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart-selector';
import { toggleCartHidden } from '../../redux/cart/cart-actions';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import { CartDropdownContainer, EmptyMessageContainer, CartItemsContainer, CartDropdownButton} from './cart-dropdown.styles';

const CartDropdown = ({ cartItems,history, dispatch }) => (
    <CartDropdownContainer>
        <CartItemsContainer>
            {  
                cartItems.length ? (
                    cartItems.map(cartItem=>(
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                ) : (
                    <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                )
            }
        </CartItemsContainer>
        <CartDropdownButton onClick={()=> {
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }}
        > GO TO CHECKOUT </CartDropdownButton>
    </CartDropdownContainer>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps,null)(CartDropdown));