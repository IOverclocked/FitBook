import React, {Component} from 'react';
import {Meal} from './meal.jsx';

class Meals extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fitBook: this.props.fitBook
        }
    }

    render() {
        const icon = ["icon-coffee", "icon-snack", "icon-food", "icon-main"];
        return (
            <section className="meals">
                <h1>Meals</h1>
                <div className="meals-content">
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
