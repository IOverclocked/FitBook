import React, {Component} from 'react';

class ErrorWindow extends Component {

    render() {
        return (
            <div className="search-error">

                <h1>{this.props.errorMsg}</h1>

            </div>
        )
    }

}

export {ErrorWindow}
