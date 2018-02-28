import React from 'react';

class Loader extends React.Component {

    render() {
        // return <h3>Загрузка...</h3>
        const stylesProgress =  {
            width: "100px",
        };

        const stylesProgressBar = {
            width: "100%"
        };

        return (
            <div className="progress" style={stylesProgress}>
                <div
                    className="progress-bar progress-bar-striped active"
                    role="progressbar"
                    style={stylesProgressBar}>
                </div>
            </div>
        )
    }
}

export default Loader;