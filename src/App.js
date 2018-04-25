import React, {Component} from 'react';
import {Header} from './components/header.jsx';
import {Meals} from './components/meals.jsx';
import {CounterMain} from './components/counterMain.jsx';
import {Footer} from './components/footer.jsx';
import 'animate.css';
import './sass/main.css';

const stateFitBook = () => {

    let templatefitBook = [
        {
            "name": "Breakfast",
            "products": [

            ]
        } , {
            "name": "First Snack",
            "products": [

            ]
        }, {
            "name": "Lunch",
            "products": [

            ]
        }, {
            "name": "Second Snack",
            "products": [

            ]
        }, {
            "name": "Dinner",
            "products": [

            ]
        }
    ]

    if(localStorage.getItem('fitBook') !== "undefined" && localStorage.getItem('fitBook') !== null) {
        return JSON.parse(localStorage.getItem('fitBook'));
    } else {
        return templatefitBook;
    }

}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fitBook: stateFitBook()
        }
    }

    componentDidMount() {
        console.log("App.js: ", this.state.fitBook);
    }

    saveProducts = (arr_obj) => {
        this.setState({
            fitBook: arr_obj
        }, () => {
            localStorage.setItem('fitBook', JSON.stringify(arr_obj));
        })

    }

    downloadProducts = () => {
        return JSON.parse(localStorage.getItem('fitBook'))
    }

    render() {

        return (<div className="App">
            <Header/>
            <CounterMain fitBook={this.state.fitBook} />
            <Meals saveProducts={this.saveProducts} fitBook={this.state.fitBook} />
            <Footer />
        </div>);
    }
}

export default App;
