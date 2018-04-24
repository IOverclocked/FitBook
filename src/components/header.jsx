import React, {Component} from 'react';

class Header extends Component {

    handleToggleMenu = () => {

    }

    render() {
        return (
            <header className="header">
                <div>
                    <div>
                        <span className="fit animated bounceInUp">Fit</span><span className="book animated bounceInRight">Book</span>
                    </div>
                    <i onClick={this.handleToggleMenu} className="icon-menu"></i>
                </div>
            </header>
        );
    }
}

export {Header};
