import './index.css'
import MinusIcon from '@/assets/icons/minus-icon.svg'
import {PlusIcon} from '@/icons/PlusIcon'
import React from 'react';

const ProductQuantityController = React.memo(function ProductQuantityController({item, quantity, add, rest}) {
    return ( 
        <div className = "product-quantity-controller">
            <button onClick = {() => rest(item.id)}>
                <img alt = "minus" src = {MinusIcon.src}/>
            </button>
            <span>{quantity}</span>
            <button onClick = {() => add(item)}>
                <PlusIcon width={40} height={40}/>
            </button>
        </div>
     );
})

export default ProductQuantityController;