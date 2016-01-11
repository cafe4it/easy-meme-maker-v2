import React from 'react';

module.exports = React.createClass({
    displayName : 'TextPropertiesModal',
    render(){
        return <div>
            <a href="#modal-text">Change properties</a>
            <section className="modal--show" id="modal-text" tabIndex="-1"
                     role="dialog" aria-labelledby="modal-label" aria-hidden="true">

                <div className="modal-inner">
                    <header id="modal-label">Modal</header>
                    <div className="modal-content"></div>
                    <footer></footer>
                </div>

                <a href="#!" className="modal-close" title="Close this modal" data-close="Close"
                   data-dismiss="modal">?</a>
            </section>
        </div>
    }
})