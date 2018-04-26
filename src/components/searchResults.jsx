import React, {Component} from 'react';

class SearchResults extends Component {

    //zdarzenie dla kliknięcia w nazwę produktu
    handleSetName = (e) => {
        if(typeof this.props.setName === "function") {
            this.props.setName(e.target.innerText); //Funkcja z SearchProduct.jsx
        }
    }

    render() {
        return (
            <tr key={this.props.product.name} product={this.props.product}>
                <td onClick={this.handleSetName}>{this.props.product.name}</td>
                <td>{this.props.product.kcal}</td>
                <td>{this.props.product.fat}</td>
                <td>{this.props.product.carbs}</td>
                <td>{this.props.product.protein}</td>
            </tr>
        );
    }
}

export {SearchResults};
