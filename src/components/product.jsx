import React, {Component} from 'react';

class Product extends Component {

    //Zdarzenie usunięcia produktu z listy
    handleClickDelete = () => {

        if(typeof this.props.updateProductsDelete === "function") {
            this.props.updateProductsDelete(this.props.id, this.props.name); //Funkcja z Meal.jsx
        }

    }

    render() {
        return (
            <tr key={this.props.id}>
                <td onClick={this.handleClickDelete} className="icon-minus"></td>
                <td>{this.props.name}</td>
                <td>{this.props.quantity}</td>
                <td>{this.props.fat}</td>
                <td>{this.props.carbs}</td>
                <td>{this.props.protein}</td>
            </tr>
        );
    }
}

export {Product}
