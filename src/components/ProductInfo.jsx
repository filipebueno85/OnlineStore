import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductInfo extends Component {
  render() {
    const { productList, addToCart } = this.props;
    return (
      <div className="result">
        {productList.results === undefined
          ? (
            <section className="nao-encontrado">
              <p>Nenhum produto foi encontrado</p>
              <p
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.

              </p>
            </section>
          )
          : productList.results.map((product) => (
            <div className="product-container" data-testid="product" key={ product.id }>
              <div className="product">
                <Link to={ `/details/${product.id}` } data-testid="product-detail-link">
                  <div className="product-details">

                    <p>{product.title}</p>
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p>
                      {`R$ ${product.price.toFixed(2).split('.').join(',')}`}
                    </p>
                    {product.shipping.free_shipping
                && <p className="frete" data-testid="free-shipping">Frete grátis</p>}
                  </div>
                </Link>
                <div>
                  <button
                    id={ product.id }
                    type="button"
                    className="product-button"
                    data-testid="product-add-to-cart"
                    onClick={ () => addToCart(product) }
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

ProductInfo.propTypes = {
  productList: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductInfo;
