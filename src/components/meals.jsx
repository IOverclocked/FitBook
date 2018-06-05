import React, {Component} from 'react';
import {Meal} from './meal.jsx';
import {SearchProduct} from './searchProduct.jsx';

class Meals extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fitBook: this.props.fitBook, //props z App.js
            searchWindow: false, //przełącznik okna wyszukiwania
            mealName: ""
        }
    }

    //Włączenie okna wyszukiwania produktów
    showSearchWindow = (mealName) => {
        this.setState({
            searchWindow: true,
            mealName
        })
    }

    //Zamykanie okna wyszukiwania produktów
    closeSearchWindow = () => {
        this.setState({
            searchWindow: false
        })
    }

    //Dodanie produktu do bazy
    updateProductsAdd = (product) => {

        console.log("6.Produkt przeliczony:", product);

        const fitBook = this.state.fitBook; //Props z App.js

        console.log("7.fitBook", fitBook);

        //dodanie produktu do wybranego posiłku
        fitBook.forEach(meal => {
            console.log("8.Meal", meal);
            if(meal.name === this.state.mealName) {
                console.log("9.Meal products", meal.products);
                meal.products.push(product);
                console.log("10.Meal products push", meal.products);
            }
        })

        //zapisanie w pamięci przeglądarki
        //funkcja z App.js
        if(typeof this.props.saveProducts === "function") {
            this.props.saveProducts(fitBook);
        }

        //zamknięcie okna wyszukiwania
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
