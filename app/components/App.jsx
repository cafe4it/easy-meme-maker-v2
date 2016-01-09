import React from 'react';
import CanvasBox from './Canvas.jsx';
import QueryString from '../libs/queryString.js';
class App extends React.Component{
    constructor(props){
        super(props);

        this.renderTextImageInput = this.renderTextImageInput.bind(this);
        this._changeImageSrc = this._changeImageSrc.bind(this);
    }

    componentWillMount(){
        this.setState({
            ImageSrc : QueryString.image || ''
        })
    }

    render(){
        //this.ImageSrc = this.state.ImageSrc;
        return <div>
            <h1>Easy meme maker app</h1>
            {this.renderTextImageInput()}
            {this.renderTextOnTop()}
            {this.renderTextOnBottom()}
            <CanvasBox className="canvas" Id="myCanvas" ImageSrc={this.state.ImageSrc} Text1={this.state.Text1 || 'Text 1'} Text2={this.state.Text2 || 'Text 2'}/>
        </div>
    }

    _changeImageSrc(e){
        this.setState({
            ImageSrc : e.target.value
        })
    }

    _changeText1(e){
        this.setState({
            Text1 : e.target.value
        });
    }

    _changeText2(e){
        this.setState({
            Text2 : e.target.value
        });
    }

    renderTextImageInput(){
        return <input type="text" placeholder="Image Url" value={this.state.ImageSrc} onChange={this._changeImageSrc}/>
    }

    renderTextOnTop(){
        return <input type="text" placeholder="Text 1" defaultValue='Text 1' onChange={this._changeText1}/>
    }

    renderTextOnBottom(){
        return <input type="text" placeholder="Text 2" defaultValue='Text 2' onChange={this._changeText2}/>
    }
}

module.exports = App;