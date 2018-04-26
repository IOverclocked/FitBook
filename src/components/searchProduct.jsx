import React, {Component} from 'react';
import {SearchResults} from './searchResults.jsx';
import {ErrorWindow} from './errorWindow.jsx';

class SearchProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchProducts: [], //tablicy wyszukanych produktów
            value: "", //nazwa produktu
            quantity: "", //ilość produktu
            errorWindow: false, //przełącznik uruchamiania feedbacka
            errorMsg: "" //treść feedback
        }
    }

    //Pobieranie danych z json-server
    handleSearch = (e) => {

        let value = e.target.value;

        this.setState({
            searchProducts: [],
            value
        })

        fetch(`http://localhost:3000/products?name_like=${value}`).then( res => {
            return res.json()
        }).then( data => {

            //przypisanie danych do zmiennej state
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

    //Zdarzenie zamknięcia okna wyszukiwania
    handleClickCloseWindow = (e) => {
        if(typeof this.props.closeSearchWindow === "function") {
            this.props.closeSearchWindow(); //Funkcja z Meals.jsx
        }
    }

    //przeliczenie makroskłaników i kalorii z ilości produktu
    exchangeAmount = (product, quantity) => {

        for(let key in product) {
            if(key !== "name" && key !== "quantity") {
                product[key] = Math.round((product[key] * (quantity / 100)), 0);
            }
        }

        return product;
    }

    //zwrócenie wiadomości po walidacji
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

    //reset timera
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    //Zdarzenie dodania nowego produktu do listy
    handleClickAdd = (e) => {

        e.preventDefault();

        let quantity = this.state.quantity;
        let value = this.state.value;

        //Sprawdzenie czy pola nie są puste
        if(value.length === 0 && quantity.length === 0) {

            this.errorFeedback("You must complete all field");

        //sprawdzenie czy została podana ilość
        } else if (quantity < 0 || quantity.length === 0) {

            this.errorFeedback("The quantity must be bigger than 0");

        } else {

            let tempControl = false;

            //dodanie produktu do odpowieniego posiłku
            for (let i = 0; i < this.state.searchProducts.length; i++) {
                if(value === this.state.searchProducts[i].name) {

                    let product = {...this.state.searchProducts[i], quantity: Number(quantity)};

                    if(typeof this.props.updateProductsAdd === "function") {
                        this.props.updateProductsAdd(this.exchangeAmount(product, quantity)); //Funkcja z Meals.jsx
                    }
                    if(typeof this.props.closeWindow === "function") {
                        this.props.closeWindow(); //Funkcja z Meals.jsx
                    }

                    tempControl = true;

                }
            }

            //walidacja poprawności nazwy produktu
            if(tempControl === false) {
                this.errorFeedback("You must write correct name food product");
            }

        }


    }

    //zdarzenie dla przypisania ilości
    handleQuantity = (e) => {

        let quantity = e.target.value;

        this.setState({
            quantity
        })

    }

    //Przypisanie nazwy
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
                                //sprawdzenie czy zostało coś znalezione
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
