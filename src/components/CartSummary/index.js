// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalValue = cartList.reduce(
        (accumulator, currentObject) =>
          accumulator + currentObject.price * currentObject.quantity,
        0,
      )
      return (
        <div className="cart-summary-bg">
          <h2 className="total">
            Order Total: <span className="price">{totalValue}/-</span>
          </h2>
          <p className="count">{cartList.length} items in cart</p>
          <button type="button" className="checkout">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
