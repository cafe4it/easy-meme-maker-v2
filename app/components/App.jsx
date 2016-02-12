import React from 'react';
import CanvasBox from './Canvas.jsx';
import QueryString from '../libs/queryString.js';
import uuid from 'uuid';
import TextInput from './Text.jsx';
import _ from 'underscore';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            texts: [
                {
                    id: uuid.v4(),
                    title : 'Text 1',
                    text: 'Text 1',
                    fontFamily: 'MyImpact',
                    fontSize : 30,
                    fontStyle : 'bold',
                    color: '#FFFFFF',
                    stroke : '#000000',
                    strokeWidth : 1,
                    align: 'center',
                    valign: 'top',
                    isUpperCase : true,
                },
                {
                    id: uuid.v4(),
                    title : 'Text 2',
                    text: 'Text 2',
                    fontFamily: 'MyImpact',
                    fontSize : 30,
                    fontStyle : 'bold',
                    color: '#FFFFFF',
                    stroke : '#000000',
                    strokeWidth : 1,
                    align: 'center',
                    valign: 'bottom',
                    isUpperCase : true,
                }
            ]
        }


        this._changeInput = this._changeInput.bind(this);
        this._changeImageSrc = this._changeImageSrc.bind(this);
    }

    componentWillMount() {
        this.setState({
            ImageSrc: QueryString.image || ''
        })
    }

    render() {
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
                            <CanvasBox className="canvas" Id="myCanvas" ImageSrc={this.state.ImageSrc} Texts={texts}
                                       onEditInput={this._changeInput}/>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                Image Source
                                            </h4>
                                        </div>
                                        <div className="panel-body">
                                            {this.renderTextImageInput()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {texts.map((text)=>
                                    <TextInput key={text.id} data={text} onEditInput={this._changeInput}/>
                            )}
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-success">
                                        <span className="glyphicon glyphicon-download-alt"></span> &nbsp;
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    _changeInput(textObj) {
        const texts = this.state.texts.map((text) => {
            if (text.id === textObj.id) {
                text = _.extend(text, textObj);
            }
            return text;
        });

        this.setState({texts});
    }

    _changeImageSrc(e) {
        this.setState({
            ImageSrc: e.target.value
        })
    }

    renderTextImageInput() {
        return <div className="form-group">
            <input type="text" placeholder="Image Url" className="form-control" value={this.state.ImageSrc}
                   onChange={this._changeImageSrc}/>
        </div>
    }

}

module.exports = App;