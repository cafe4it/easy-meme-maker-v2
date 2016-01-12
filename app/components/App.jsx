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
                    color : '#FFFFFF',
                    align : 'center',
                    valign : 'top'
                },
                {
                    id : uuid.v4(),
                    text : 'Text 2',
                    color : '#FFFFFF',
                    align : 'center',
                    valign : 'bottom'
                }
            ]
        }

        this._changeText = this._changeText.bind(this);
        this._changeColor = this._changeColor.bind(this);
        this._changeImageSrc = this._changeImageSrc.bind(this);
        this._changeAlign = this._changeAlign.bind(this);
    }

    componentWillMount(){
        this.setState({
            ImageSrc : QueryString.image || ''
        })
    }

    render(){
        const texts = this.state.texts;

        return <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <h1>Easy Meme Maker</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <CanvasBox className="canvas" Id="myCanvas" ImageSrc={this.state.ImageSrc} Texts={texts}/>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    {this.renderTextImageInput()}
                                </div>
                            </div>
                            {texts.map((text)=>
                                    <TextInput key={text.id} data={text} onEditText={this._changeText} onEditColor={this._changeColor} onEditAlign={this._changeAlign}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
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

    _changeAlign(id, value){
        const texts = this.state.texts.map((text) => {
            if(text.id === id){
                text.align = value;
            }
            return text;
        });

        this.setState({texts});
    }

    renderTextImageInput(){
        return <div className="form-group">
            <label>Image Source</label>
            <input type="text" placeholder="Image Url" className="form-control" value={this.state.ImageSrc} onChange={this._changeImageSrc}/>
        </div>
    }

}

module.exports = App;