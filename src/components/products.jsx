import React, {Component} from 'react';
import {CounterMacro} from './counterMacro.jsx';
import {Product} from './product.jsx';

class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: this.props.products, //Props z Meals.jsx
        }
    }

    //Sprawdzenie zmian w stanie z poprzednimi
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.products.length === prevState.products.length) {
            return null
        }

        return {
            products: nextProps.products,
        }

    }

    //Zdarzenie Włączenie okna wyszukiwania
    handleClickShowSearchWindow = (e) => {
        if(typeof this.props.showSearchWindow === "function") {
            this.props.showSearchWindow(this.props.mealName); //Funkcjia z Meals.jsx
        }
    }

    render() {

        return (
            <div className="products">
                <table>
                    <thead>
                        <tr><th></th><th>PRODUCTS</th><th>QUANTITY</th><th>FAT</th><th>CARBS</th><th>PROTEIN</th></tr>
                    </thead>
                    <tbody>
                    {
                        this.state.products.map((product, key) => {
                            return (
                                <Product
                                    id={key}
                                    updateProductsDelete={this.props.updateProductsDelete}
                                    key={key}
                                    name={product.name}
                                    quantity={product.quantity}
                                    fat={product.fat}
                                    carbs={product.carbs}
                                    protein={product.protein}
                                />
                            )
                        })
                    }
                    <tr>
                        <td onClick={this.handleClickShowSearchWindow} className="icon-plus"></td>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td>
                    </tr>
                    <CounterMacro products={this.state.products}/>
                    </tbody>
                </table>
            </div>
        );
    }
}

export {Products}
