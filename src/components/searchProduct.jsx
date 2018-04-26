import React, {Component} from 'react';
import {SearchResults} from './searchResults.jsx';
import {ErrorWindow} from './errorWindow.jsx';

class SearchProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchProducts: [],
            value: "",
            quantity: "",
            errorWindow: false,
            errorMsg: ""
        }
    }

    handleSearch = (e) => {

        let value = e.target.value;

        this.setState({
            searchProducts: [],
            value
        })

        fetch(`http://localhost:3000/products?name_like=${value}`).then( res => {
            return res.json()
        }).then( data => {

            if(this.state.value.length === 0) {
                this.setState({
                    searchProducts: []
                })
            } else {
                this.setState({
                    searchProducts: data
                })
            }


        })

    }

    handleClickCloseWindow = (e) => {
        if(typeof this.props.closeSearchWindow === "function") {
            this.props.closeSearchWindow();
        }
    }

    exchangeAmount = (product, quantity) => {

        for(let key in product) {
            if(key !== "name" && key !== "quantity") {
                product[key] = Math.round((product[key] * (quantity / 100)), 0);
            }
        }

        return product;
    }

    errorFeedback = (errorMsg) => {

        this.setState({
            errorWindow: true,
            errorMsg
        })

        this.timer = setTimeout(() => {
            this.setState({
                errorWindow: false,
                errorMsg: ""
            })
        }, 2000)

    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleClickAdd = (e) => {

        e.preventDefault();

        let quantity = this.state.quantity;
        let value = this.state.value;

        if(value.length === 0 && quantity.length === 0) {

            this.errorFeedback("You must complete all field");

        } else if (quantity < 0 || quantity.length === 0) {

            this.errorFeedback("The quantity must be bigger than 0");

        } else {

            let tempControl = false;

            for (let i = 0; i < this.state.searchProducts.length; i++) {
                if(value === this.state.searchProducts[i].name) {

                    let product = {...this.state.searchProducts[i], quantity: Number(quantity)};

                    if(typeof this.props.updateProductsAdd === "function") {
                        this.props.updateProductsAdd(this.exchangeAmount(product, quantity));
                    }
                    if(typeof this.props.closeWindow === "function") {
                        this.props.closeWindow();
                    }

                    tempControl = true;

                }
            }

            if(tempControl === false) {
                this.errorFeedback("You must write correct name food product");
            }

        }


    }

    handleQuantity = (e) => {

        let quantity = e.target.value;

        this.setState({
            quantity
        })

    }

    setName = (name) => {
        this.setState({
            value: name
        })
    }

    render() {
        return (
            <div className="search">
                <div className="search-content">
                    { this.state.errorWindow && <ErrorWindow errorMsg={this.state.errorMsg}/>}
                    <i
                        onClick={this.handleClickCloseWindow}
                        className="icon-close">
                    </i>
                    <form>
                        <label for="name">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={this.state.value}
                                onChange={this.handleSearch}
                                placeholder="Search product..."
                            />
                        </label>
                        <label for="quantity">
                            <input
                                onChange={this.handleQuantity}
                                type="number"
                                name="quantity"
                                id="quantity"
                            />
                        </label>
                        <label for="add">
                            <input
                                onClick={this.handleClickAdd}
                                type="submit"
                                value="Add"
                            />
                        </label>

                    </form>
                    <div className="search-results">
                            {
                                (this.state.searchProducts.length > 0) &&
                                <table>
                                    <thead>
                                        <tr>
                                            <th>PRODUCTS</th><th>KCAL</th><th>FAT</th><th>CARBS</th><th>PROTEIN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.searchProducts.map(product => {
                                                return (
                                                    <SearchResults
                                                        key={product.name}
                                                        product={product}
                                                        setName={this.setName}
                                                    />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            }
                    </div>
                </div>
            </div>
        );
    }
}

export {SearchProduct};
