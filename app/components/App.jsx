import React from 'react';
import CanvasBox from './Canvas.jsx';
import QueryString from '../libs/queryString.js';
import uuid from 'uuid';
import TextInput from './Text.jsx';
class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            texts : [
                {
                    id : uuid.v4(),
                    text : 'Text 1',
                    color : '#FFFFFF'
                },
                {
                    id : uuid.v4(),
                    text : 'Text 2',
                    color : '#FFFFFF'
                }
            ]
        }

        this._changeText = this._changeText.bind(this);
        this._changeColor = this._changeColor.bind(this);
        this._changeImageSrc = this._changeImageSrc.bind(this);
    }

    componentWillMount(){
        this.setState({
            ImageSrc : QueryString.image || ''
        })
    }

    render(){
        const texts = this.state.texts;

        return <div>
            <h1>Easy meme maker app</h1>
            {this.renderTextImageInput()}
            {texts.map((text)=>
                    <TextInput key={text.id} data={text} onEditText={this._changeText} onEditColor={this._changeColor}/>
            )}
            <CanvasBox className="canvas" Id="myCanvas" ImageSrc={this.state.ImageSrc} Texts={texts}/>
        </div>
    }

    _changeImageSrc(e){
        this.setState({
            ImageSrc : e.target.value
        })
    }

    _changeText(id, value){
        const texts = this.state.texts.map((text) => {
            if(text.id === id){
                text.text = value;
            }
            return text;
        });

        this.setState({texts});
    }

    _changeColor(id, value){
        const texts = this.state.texts.map((text) => {
            if(text.id === id){
                text.color = value;
            }
            return text;
        });

        this.setState({texts});
    }

    renderTextImageInput(){
        return <input type="text" placeholder="Image Url" value={this.state.ImageSrc} onChange={this._changeImageSrc}/>
    }

}

module.exports = App;