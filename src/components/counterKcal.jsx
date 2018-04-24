import React, {Component} from 'react';
import CountTo from 'react-count-to';


class CounterKcal extends Component {
    constructor(props) {
        super(props)

        this.allKcal = 0;
        this.changer = true;

        this.state = {
            kcalAnime: "",
            products: this.props.products,
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

    sumKcal = () => {

        let sum = 0;

        for (let i = 0; i < this.state.products.length; i++) {
            sum += this.state.products[i].kcal
        }

        this.allKcal = sum;

        return sum;
    }

    anime = () => {

        if(this.state.kcalAnime === "") {
            this.setState({
                kcalAnime: "wobble",
            })
        }

    }

    render() {
        return (
            <p className={`animated ${this.state.kcalAnime}`}>
                <CountTo onComplete={this.anime}  delay={1} from={this.allKcal} to={this.sumKcal()} speed={this.sumKcal()} />
            </p>

        );
    }

}

export {CounterKcal}
