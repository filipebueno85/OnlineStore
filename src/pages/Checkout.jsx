import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Error from '../components/Error';

class Checkout extends Component {
  state = {
    name: '',
    cpf: '',
    email: '',
    tel: '',
    cep: '',
    address: '',
    complemento: '',
    number: '',
    city: '',
    cartlist: [],
    payment: '',
    isValidate: true,
  };

  componentDidMount() {
    this.getCart();
    this.getTotalPrice();
  }

  getCart = () => {
    const cartlist = JSON.parse(localStorage.getItem('cartlist')) ?? [];
    this.setState({ cartlist });
  };

  removeItem = (id) => {
    const { cartlist } = this.state;
    const temp = cartlist.filter((productCart) => productCart.id !== id);
    this.setState({ cartlist: [...temp] });
    localStorage.setItem('cartlist', JSON.stringify(temp));
    this.getTotalItemsCart();
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getTotalItemsCart = () => {
    const getCartList = JSON.parse(localStorage.getItem('cartlist')) ?? [];
    let totalItems = 0;
    getCartList.forEach((productCart) => {
      totalItems += productCart.productQuantity;
    });
    localStorage.setItem('totalItemsCart', totalItems);
  };

  validateInfo = () => {
    const {
      name,
      cpf,
      email,
      tel,
      address,
      cep,
      payment,
    } = this.state;
    const { history: { push } } = this.props;

    if (name.length !== 0 && cpf.length !== 0 && email.length !== 0
      && tel.length !== 0 && address.length !== 0 && cep.length !== 0
      && payment.length !== 0) {
      push('/');
      localStorage.removeItem('cartlist');
      this.getTotalItemsCart();
    } else {
      this.setState({ isValidate: false });
    }
  };

  render() {
    const {
      cartlist,
      name,
      cpf,
      email,
      tel,
      address,
      complemento,
      number,
      cep,
      city,
      isValidate,
    } = this.state;
    const total = this.getTotalPrice();
    return (
      <div>
        <header>
          <Link to="/">
            <h1>Online Store</h1>
          </Link>
        </header>
        <div className="cart-container">
          <h1>Revise seus produtos: </h1>
          {cartlist.map((product) => (
            <div className="product-unit" key={ product.id }>
              <Link
                to={ `/details/${product.id}` }
                data-testid="product-detail-link"
              >
                <div className="cart-prod-desc">
                  <p data-testid="shopping-cart-product-name">{product.title}</p>
                  <div>
                    <img src={ product.thumbnail } alt={ product.title } />
                  </div>
                  <p>
                    {`Valor Unitário R$ ${product.price
                      .toFixed(2).split('.').join(',')}`}

                  </p>
                </div>
                <p>
                  {`Valor total R$ ${(product.productQuantity * product.price)
                    .toFixed(2).split('.').join(',')}`}
                </p>
              </Link>
              <div className="cart-buttons">
                <button
                  className="product-button"
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => this.removeItem(product.id) }
                >
                  Remover Item

                </button>
              </div>
            </div>
          ))}
          <p className="product-unit">{`Total: R$ ${total}`}</p>
        </div>
        <section className="info-payment">
          <h3>Informações do comprador:</h3>
          <input
            className="data-client"
            value={ name }
            data-testid="checkout-fullname"
            onChange={ this.handleChange }
            type="text"
            placeholder="Nome completo"
            name="name"
          />
          <input
            className="data-client"
            value={ cpf }
            data-testid="checkout-cpf"
            onChange={ this.handleChange }
            type="tel"
            placeholder="cpf"
            name="cpf"
          />
          <input
            className="data-client"
            value={ email }
            data-testid="checkout-email"
            onChange={ this.handleChange }
            type="email"
            placeholder="email"
            name="email"
          />
          <input
            className="data-client"
            value={ tel }
            data-testid="checkout-phone"
            onChange={ this.handleChange }
            type="tel"
            placeholder="(xx) xxxxx-xxxx"
            name="tel"
          />
          <input
            className="data-client"
            value={ cep }
            data-testid="checkout-cep"
            onChange={ this.handleChange }
            type="tel"
            placeholder="cep"
            name="cep"
          />
          <input
            className="data-client"
            value={ address }
            data-testid="checkout-address"
            onChange={ this.handleChange }
            type="text"
            placeholder="Endereço"
            name="address"
          />
          <input
            className="data-client"
            value={ complemento }
            onChange={ this.handleChange }
            type="text"
            placeholder="Complemento"
            name="complemento"
          />
          <input
            className="data-client"
            value={ number }
            onChange={ this.handleChange }
            type="text"
            placeholder="Número"
            name="number"
          />
          <input
            className="data-client"
            value={ city }
            onChange={ this.handleChange }
            type="text"
            placeholder="cidade"
            name="city"
          />
        </section>
        <div className="payment">
          <p>Método de pagamento:</p>
          <div className="rting-input">
            <label htmlFor="boleto">
              <input
                data-testid="ticket-payment"
                onChange={ this.handleChange }
                type="radio"
                id="boleto"
                name="payment"
                value="boleto"
              />
              Boleto
            </label>
            <label htmlFor="visa">
              <input
                data-testid="visa-payment"
                onChange={ this.handleChange }
                type="radio"
                id="visa"
                name="payment"
                value="Visa"
              />
              Visa
            </label>
            <label htmlFor="Mastercard">
              <input
                data-testid="master-payment"
                onChange={ this.handleChange }
                type="radio"
                name="payment"
                value="Mastercard"
              />
              Mastercard
            </label>
            <label htmlFor="Elo">
              <input
                data-testid="elo-payment"
                onChange={ this.handleChange }
                type="radio"
                name="payment"
                value="Elo"
              />
              Elo
            </label>
          </div>
          <button
            className="checkout-button"
            data-testid="checkout-btn"
            type="button"
            onClick={ this.validateInfo }
          >
            Comprar
          </button>
          {!isValidate && <Error />}
        </div>
      </div>
    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Checkout;
