import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.compoent';

import { selectCollectionPreview } from '../../redux/shop/shop.selector'
import { CollectionOverviewContainer } from './collection-overview.styles';

const CollectionsOverview = ({ collections }) =>  {
  return (
    <CollectionOverviewContainer>
        {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </CollectionOverviewContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionPreview
});

export default connect(mapStateToProps)(CollectionsOverview);