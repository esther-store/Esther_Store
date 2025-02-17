import './index.css'
import {MinusIcon} from '@/icons/MinusIcon'
import {PlusIcon} from '@/icons/PlusIcon'
import React from 'react';

const ProductQuantityController = React.memo(function ProductQuantityController({item, quantity, add, rest}) {
    return ( 
        <div className = "product-quantity-controller">
            <button onClick = {() => rest(item.id)}>
                <MinusIcon width={24} height={24} color = {"#000"}/>
            </button>
            <span>{quantity}</span>
            <button onClick = {() => add(item)}>
                <PlusIcon width={24} height={24}/>
            </button>
        </div>
     );
})

export default ProductQuantityController;