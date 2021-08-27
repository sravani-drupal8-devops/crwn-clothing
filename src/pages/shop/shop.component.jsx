import React from "react";

import SHOP_DATA from './shop.data.js'
import CollectionPreview from '../../components/collection-preview/collection-preview.compoent';

class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const { collections } = this.state;
        return (
            <div className='Shop'>
                {collections.map(({id, ...otheCollectionProps}) => (
                    <CollectionPreview key={id} {...otheCollectionProps} />
                )
                )}
            </div>
        )
    }
}

export default ShopPage;