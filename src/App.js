import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const isExists = cartList.some(eachItem => eachItem.id === product.id)
    if (isExists) {
      const updatedCartListItemQuantity = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          return {...eachItem, quantity: eachItem.quantity + product.quantity}
        }
        return eachItem
      })
      this.setState({cartList: updatedCartListItemQuantity})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const increaseCartListItemQuantity = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })
    this.setState({cartList: increaseCartListItemQuantity})
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState
      const updatedCartList = cartList
        .map(eachItem => {
          if (eachItem.id === id) {
            if (eachItem.quantity > 1) {
              return {...eachItem, quantity: eachItem.quantity - 1}
            }
            // Returning null for items with quantity 1, these will be filtered out
            return null
          }
          return eachItem
        })
        .filter(eachItem => eachItem !== null) // Remove items that are null
      return {cartList: updatedCartList}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
