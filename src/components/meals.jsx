import React, {Component} from 'react';
import {Meal} from './meal.jsx';
import {SearchProduct} from './searchProduct.jsx';

class Meals extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fitBook: this.props.fitBook,
            searchWindow: false,
            mealName: ""
        }
    }

    showSearchWindow = (mealName) => {
        this.setState({
            searchWindow: true,
            mealName
        })
    }

    closeSearchWindow = () => {
        this.setState({
            searchWindow: false
        })
    }

    updateProductsAdd = (product) => {
        const fitBook = this.props.fitBook;

        fitBook.forEach(meal => {
            if(meal.name === this.state.mealName) {
                meal.products.push(product);
            }
        })

        if(typeof this.props.saveProducts === "function") {
            this.props.saveProducts(fitBook);
        }

        this.closeSearchWindow();

    }

    render() {
        const icon = ["icon-coffee", "icon-snack", "icon-food", "icon-main"];
        return (
            <section className="meals">
                <h1>Meals</h1>
                <div className="meals-content">
                    {
                        (this.state.searchWindow) &&
                        <SearchProduct
                            closeSearchWindow={this.closeSearchWindow}
                            updateProductsAdd={this.updateProductsAdd}
                        />
                    }
                    {
                        this.state.fitBook.map((meal, i) => {
                            return (
                                <Meal
                                    key={meal.name}
                                    icon={(i>2) ? icon[i-2] : icon[i]}
                                    name={meal.name}
                                    products={meal.products}
                                    saveProducts={this.props.saveProducts}
                                    fitBook={this.state.fitBook}
                                    showSearchWindow={this.showSearchWindow}
                                />
                            )
                        })
                    }
                </div>

            </section>
        );
    }
}

export {Meals};
