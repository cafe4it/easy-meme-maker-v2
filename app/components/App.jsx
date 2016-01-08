import React from 'react';
import CanvasBox from './Canvas.jsx';
class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <h1>Easy meme maker app</h1>
            <CanvasBox className="canvas" Id="myCanvas"/>
        </div>
    }
}

module.exports = App;