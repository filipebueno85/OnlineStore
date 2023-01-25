import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  state = {
    cartlist: [],
  };

  async componentDidMount() {
    this.teste();
  }

  teste = () => {
    const getCartList = JSON.parse(localStorage.getItem('cartlist')) ?? [];
    this.setState({ cartlist: getCartList });
  };

  increaseQuantity = (index, availableQuantity) => {
    const { cartlist } = this.state;
    const temp = [...cartlist];
    if (temp[index].productQuantity === availableQuantity) return;
    temp[index].productQuantity += 1;
    this.setState({ cartlist: [...temp] });
    localStorage.setItem('cartlist', JSON.stringify(temp));
    this.getTotalItemsCart();
  };

  decreaseQuantity = (index) => {
    const { cartlist } = this.state;
    const temp = [...cartlist];
    if (temp[index].productQuantity === 1) return;
    temp[index].productQuantity -= 1;
    this.setState({ cartlist: [...temp] });
    localStorage.setItem('cartlist', JSON.stringify(temp));
    this.getTotalItemsCart();
  };

  removeItem = (id) => {
    const { cartlist } = this.state;
    const temp = cartlist.filter((productCart) => productCart.id !== id);
    this.setState({ cartlist: [...temp] });
    localStorage.setItem('cartlist', JSON.stringify(temp));
    this.getTotalItemsCart();
  };

  getTotalItemsCart = () => {
    const getCartList = JSON.parse(localStorage.getItem('cartlist')) ?? [];
    let totalItems = 0;
    getCartList.forEach((productCart) => {
      totalItems += productCart.productQuantity;
    });
    localStorage.setItem('totalItemsCart', totalItems);
  };

  getTotalPrice = () => {
    const { cartlist } = this.state;
    let acumulator = 0;
    const total = cartlist.map((product) => {
      const currentPrice = (product.productQuantity * product.price).toFixed(2);
      acumulator += Number(currentPrice);
      return acumulator;
    });
    return total[total.length - 1];
  };

  render() {
    const { cartlist } = this.state;
    const total = this.getTotalPrice();
    return (
      <div>
        <header>
          <Link to="/">
            <h1 style={ { color: 'rgb(255, 235, 210)' } }>Online Store</h1>
          </Link>
        </header>
        <div className="cart-container">
          <h1>Meu Carrinho</h1>
          {cartlist.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          ) : (
            <div className="cart-Product">
              {cartlist.map((cartProduct, index) => (
                <div className="product-unit" key={ cartProduct.id }>
                  <Link
                    to={ `/details/${cartProduct.id}` }
                    data-testid="product-detail-link"
                  >
                    <div className="cart-prod-desc">
                      <p data-testid="shopping-cart-product-name">{cartProduct.title}</p>
                      <div>
                        <img src={ cartProduct.thumbnail } alt={ cartProduct.title } />
                      </div>
                      <p>
                        {`Valor Unitário R$ ${cartProduct.price
                          .toFixed(2).split('.').join(',')}`}

                      </p>
                    </div>
                    <p>
                      {`Valor total R$ ${(cartProduct.productQuantity * cartProduct.price)
                        .toFixed(2).split('.').join(',')}`}
                    </p>
                  </Link>

                  <div className="cart-buttons">
                    <button
                      className="cart-quantity-button"
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.decreaseQuantity(index) }
                      value={ index }
                    >
                      -

                    </button>
                    <p data-testid="shopping-cart-product-quantity">
                      {cartProduct.productQuantity}

                    </p>
                    <button
                      className="cart-quantity-button"
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ () => this.increaseQuantity(
                        index,
                        cartProduct.available_quantity,
                      ) }
                    >
                      +

                    </button>
                    <button
                      className="product-button"
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => this.removeItem(cartProduct.id) }
                    >
                      Remover Item

                    </button>
                  </div>
                </div>
              ))}
              <p className="product-unit">{`Total da compra: R$ ${total.toFixed(2)}`}</p>
              <button className="checkout-button" type="button">
                <Link to="/checkout" data-testid="checkout-products">
                  Finalizar compra
                </Link>
              </button>
            </div>
          )}

        </div>

      </div>
    );
  }
}

export default ShoppingCart;
