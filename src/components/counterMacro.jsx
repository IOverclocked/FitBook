import React, {Component} from 'react';
import CountTo from 'react-count-to';

class CounterMacro extends Component {
    constructor(props) {
        super(props)

        this.allCarbs = 0;
        this.allFat = 0;
        this.allProtein = 0;

        this.state = {
            animeFat: "",
            animeCarbs: "",
            animeProtein: "",
            products: this.props.products
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.products.length === prevState.products.length) {
            return null
        }

        return {
            products: nextProps.products,
        }

    }

    sumMacro = () => {

        let carbs = 0, fat = 0, protein = 0;
        let macro = [];

        for (let i = 0; i < this.state.products.length; i++) {
            carbs += this.state.products[i].carbs;
            fat += this.state.products[i].fat;
            protein += this.state.products[i].protein;
        }

        this.allCarbs = carbs;
        this.allFat = fat;
        this.allProtein = protein;

        macro = [carbs, fat, protein];

        return macro;

    }

    animeFat = () => {
        this.setState({
            animeFat: "flip",
        })

        this.timerAnimeFat = setTimeout(() => {
            this.setState({
                animeFat: ""
            })
        }, 1000);
    }

    animeCarbs = () => {
        this.setState({
            animeCarbs: "flip",
        })

        this.timerAnimeCarbs = setTimeout(() => {
            this.setState({
                animeCarbs: ""
            })
        }, 1000);
    }


    animeProtein = () => {
        this.setState({
            animeProtein: "flip",
        })

        this.timerAnimeProtein = setTimeout(() => {
            this.setState({
                animeProtein: ""
            })
        }, 1000);
    }

    render() {
        return (
            <tr className="summary">
                <td></td>
                <td> Summary: </td>
                <td> </td>
                <td className={`animated ${this.state.animeFat}`}>
                    <CountTo
                        onComplete={this.animeFat}
                        delay={1}
                        from={0}
                        to={this.sumMacro()[1]}
                        speed={this.sumMacro()[1]+500} />
                </td>
                <td className={`animated ${this.state.animeCarbs}`}>
                    <CountTo
                        onComplete={this.animeCarbs}
                        delay={1}
                        from={0}
                        to={this.sumMacro()[0]}
                        speed={this.sumMacro()[0]+500} />
                </td>
                <td className={`animated ${this.state.animeProtein}`}>
                    <CountTo
                        onComplete={this.animeProtein}
                        delay={1}
                        from={0}
                        to={this.sumMacro()[2]}
                        speed={this.sumMacro()[2]+500} />
                </td>
            </tr>
        );
    }

}

export {CounterMacro}
