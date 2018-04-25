import React, {Component} from 'react';
import {Products} from './products.jsx';
import {CounterKcal} from './counterKcal.jsx';

class Meal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            icon: 'icon-down',
            toggle: true,
            listAnime: "slideup",
            products: this.props.products,
            height: 0
        }
    }

    handleClick = (e) => {

        if(this.state.toggle) {
            this.setState({
                icon: 'icon-up',
                toggle: false,
                height: `${170 + this.state.products.length * 200}px`
            })
        } else {
            this.setState({
                icon: 'icon-down',
                toggle: true,
                height: `0px`
            })
        }

    }

    updateProductsAdd = (product) => {
        const fitBook = this.props.fitBook;
        
        this.setState({
            products: [...this.state.products, product]
        })

        fitBook.forEach(meal => {
            if(this.props.name === meal.name) {
                meal.products.push(product);
            }
        })

        //funkcja z App.js
        if(typeof this.props.saveProducts === "function") {
            this.props.saveProducts(fitBook);
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

                <div onClick={e => this.handleClick(e)} className="meal">

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
                <div className="slideup" style={{ overflow: "auto", height: this.state.height}} >
                    <Products
                        updateProductsDelete={this.updateProductsDelete}
                        updateProductsAdd={this.updateProductsAdd}
                        mealName={this.props.name}
                        products={this.state.products}/>
                </div>

            </div>

        );
    }
}

export {Meal}
