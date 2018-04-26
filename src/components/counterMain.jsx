import React, {Component} from 'react';
import CountTo from 'react-count-to';

class CounterMain extends Component {
    constructor(props) {
        super(props)

        this.allKcal = 0;
        this.allFat = 0;
        this.allCarbs = 0;
        this.allProtein = 0;

        this.state = {
            fitBook: this.props.fitBook,
        }
    }
    
    sum = () => {

        let sumKcal = 0;
        let sumFat = 0;
        let sumCarbs = 0;
        let sumProtein = 0;

        this.state.fitBook.forEach(meal => {
            meal.products.forEach(product => {
                sumKcal += product.kcal
                sumFat += product.fat
                sumCarbs += product.carbs
                sumProtein += product.protein
            })
        })

        this.allKcal = sumKcal;
        this.allFat = sumFat;
        this.allCarbs = sumCarbs;
        this.allProtein = sumProtein;

        let sum = [sumKcal, sumFat, sumCarbs, sumProtein]

        return sum;
    }

    render() {
        return (
            <section className="counterMain">
                <h1 className="title">Data</h1>

            <div style={{ background: `rgba(0, 0, 0, ${this.state.opacity})` }} className="counterMain-content">
                <div  className="counterMain-opacity">
                    <div className="kcal">
                        <h1 className="macroTitle">Kcal</h1>
                        <div className="animated infinite jello">
                            <CountTo
                                delay={1}
                                from={this.allKcal}
                                to={this.sum()[0]}
                                speed={this.sum()[0]}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="fat">
                            <h1 className="macroTitle">Fat</h1>
                            <div className="animated infinite jello">
                                <CountTo
                                    delay={1}
                                    from={0}
                                    to={this.sum()[1]}
                                    speed={this.sum()[1]}
                                />
                            </div>
                        </div>
                        <div className="carbs">
                            <h1 className="macroTitle">Carbs</h1>
                            <div className="animated infinite jello">
                                <CountTo
                                    delay={1}
                                    from={0}
                                    to={this.sum()[2]}
                                    speed={this.sum()[2]}
                                />
                            </div>
                        </div>
                        <div className="protein">
                            <h1 className="macroTitle">Protein</h1>
                            <div className="animated infinite jello">
                                <CountTo
                                    delay={1}
                                    from={0}
                                    to={this.sum()[3]}
                                    speed={this.sum()[3]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        )
    }
}

export {CounterMain};
