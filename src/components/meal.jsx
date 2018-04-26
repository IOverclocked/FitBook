import React, {Component} from 'react';
import {Products} from './products.jsx';
import {CounterKcal} from './counterKcal.jsx';

class Meal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            icon: 'icon-down',
            toggle: true,
            products: this.props.products,
            height: "0",
            anime: ""
        }
    }

    handleClickToggle = (e) => {

        if(this.state.toggle) {
            this.setState({
                icon: 'icon-up',
                toggle: false,
                height: "600px",
                anime: "flipInX"
            })
        } else {
            this.setState({
                icon: 'icon-down',
                toggle: true,
                height: '0',
                anime: "flipOutX"
            })
        }

    }

    updateProductsDelete = (id, name) => {
        let fitBook = this.props.fitBook;
        let arrTemp = this.state.products.filter((el, key) => key !== id)

        this.setState({
            products: arrTemp
        })

        fitBook.forEach(meal => {
            if(this.props.name === meal.name) {
                meal.products = meal.products.filter((product, key) => key !== id)
            }
        })

        //funkcja z App.js
        if(typeof this.props.saveProducts === "function") {
            this.props.saveProducts(fitBook);
        }

    }

    render() {
        return (
            <div className="meal-content">

                <div onClick={this.handleClickToggle} className="meal">

                    <div>
                        <i className={this.props.icon}></i>
                        <span>{this.props.name}</span>
                    </div>
                    <div>
                        <p>INGESTED</p>
                        <CounterKcal products={this.state.products} />
                    </div>
                    <div>
                        <i className={this.state.icon}></i>
                    </div>

                </div>
                <div className={`slider animated ${this.state.anime}`} style={{ maxHeight: this.state.height}} >
                    <Products
                        updateProductsDelete={this.updateProductsDelete}
                        mealName={this.props.name}
                        products={this.state.products}
                        showSearchWindow={this.props.showSearchWindow}
                    />
                </div>

            </div>

        );
    }
}

export {Meal}
