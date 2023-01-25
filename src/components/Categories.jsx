import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const dataCategories = await getCategories();
    this.setState({ categories: dataCategories });
  };

  render() {
    const { categories } = this.state;
    const { fetchProductByCategory } = this.props;
    return (
      <div className="categories-container">
        <h3>Filtre sua busca por categoria</h3>
        <select onChange={ fetchProductByCategory }>
          <option disabled selected>
            Selecione a categoria
          </option>
          {categories.length === 0
            ? ''
            : categories.map((categorie) => (
              // <label >

              <option
                name="categorie"
                key={ categorie.id }
                htmlFor={ categorie.name }
                data-testid="category"
                id={ categorie.name }
                value={ categorie.id }

              >
                {categorie.name}

              </option>
              // </label>
            ))}
          {/* <button onClick={ fetchProductByCategory } type="button">Selecionar</button> */}
        </select>
      </div>
    );
  }
}

Categories.propTypes = {
  fetchProductByCategory: PropTypes.func.isRequired,
};

export default Categories;
