import { useContext } from 'react';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = ({ name, description, price, id }) => {
    const cartCtx = useContext(CartContext)
    const formattedprice = `$${price.toFixed(2)}`;
    const onAddToCartHandler = (amount) => {
        cartCtx.addItem({
            id,
            name,
            amount,
            price
        })
    }
    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{formattedprice}</div>
            </div>
            <div>
                <MealItemForm
                    onAddToCart={onAddToCartHandler}
                    id={id} />
            </div>
        </li>
    )
}

export default MealItem;