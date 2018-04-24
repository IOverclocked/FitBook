import React, {Component} from 'react';
import {SearchResults} from './searchResults.jsx';

class SearchProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchProducts: [],
            value: ""
        }
    }

    handleSearch = (e) => {

        let value = e.target.value;

        this.setState({
            searchProducts: [],
            value
        })

        fetch(`http://localhost:3000/products?name_like=${value.trim()}`).then( res => {
            return res.json()
        }).then( data => {

            this.setState({
                searchProducts: data
            })

        })

    }

    handleCloseWindow = (e) => {
        if(typeof this.props.closeWindow === "function") {
            this.props.closeWindow();
        }
    }

    handleClickAdd = (e) => {
        e.preventDefault();

        for (let i = 0; i < this.state.searchProducts.length; i++) {
            if(this.state.value === this.state.searchProducts[i].name) {

                if(typeof this.props.updateProductsAdd === "function") {
                    this.props.updateProductsAdd(this.state.searchProducts[i]);
                }
                if(typeof this.props.closeWindow === "function") {
                    this.props.closeWindow();
                }

            }
        }
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
                    <i
                        onClick={this.props.closeWindow}
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
                        <label for="add">
                            <input
                                onClick={this.handleClickAdd}
                                type="submit"
                                value="Add"
                            />
                        </label>

                    </form>
                    <div className="search-results">
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
                    </div>
                </div>
            </div>
        );
    }
}

export {SearchProduct};
