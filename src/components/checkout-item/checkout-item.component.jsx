import React from 'react';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart-actions';
import { connect } from 'react-redux';

import { 
    CheckoutItemContainer, 
    ItemImageContainer, 
    RemoveButtonContainer, 
    TextContainer, 
    QuantityContainer 
} from './checkout-item.styles'

const CheckoutItem = ({cartItem, clearItem, addItem, removeItem }) => {
    const {name, imageUrl, quantity, price} = cartItem
    return(
        <CheckoutItemContainer>
            <ItemImageContainer>
                <img src={imageUrl} alt='item'/>
            </ItemImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div className='arrow' onClick={()=>removeItem(cartItem)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={()=>addItem(cartItem)}>&#10095;</div>
            </QuantityContainer>
            <TextContainer>{price}</TextContainer>
            <RemoveButtonContainer onClick={()=>clearItem(cartItem)}>&#10006;</RemoveButtonContainer>
        </CheckoutItemContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null,mapDispatchToProps)(CheckoutItem);