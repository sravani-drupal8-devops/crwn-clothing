import React from "react";
import { Route } from 'react-router-dom';

import CollectionsOverview from "../../components/collections-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage = ({match}) =>(
    <div className='Shop'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
)

export default ShopPage;