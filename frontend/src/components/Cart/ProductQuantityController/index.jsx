import './index.css'
import MinusIcon from '@/assets/icons/minus-icon.svg'
import PlusIcon from '@/assets/icons/plus-icon.svg'
import React from 'react';

const ProductQuantityController = React.memo(function ProductQuantityController({item, quantity, add, rest}) {
    return ( 
        <div className = "product-quantity-controller">
            <button onClick = {() => rest(item)}>
                <img alt = "minus" src = {MinusIcon.src}/>
            </button>
            <span>{quantity}</span>
            <button onClick = {() => add(item)}>
                <img alt = "plus" src = {PlusIcon.src}/>
            </button>
        </div>
     );
})

export default ProductQuantityController;