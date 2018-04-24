import React, {Component} from 'react';

class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="footer-opacity">
                    <div className="footer-content">
                        <h1>FitBook&copy; 2017 Michał Osiatycki</h1>
                        <ul>
                            <li><a href="#">www.fitNow.pl</a></li>
                            <li><a href="#">www.fitatu.pl</a></li>
                            <li><a href="#">www.przepisy.pl</a></li>
                            <li><a href="#">www.fitNow.pl</a></li>
                            <li><a href="#">www.fitatu.pl</a></li>
                            <li><a href="#">www.przepisy.pl</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}

export {Footer};
