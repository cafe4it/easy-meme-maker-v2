import React from 'react';
import Konva from 'konva';
import _ from 'underscore';

export default class CanvasBox extends React.Component{
    constructor(props){
        super(props);
        this._addImageAndTextToLayer = this._addImageAndTextToLayer.bind(this);
        this._addTextToLayer = this._addTextToLayer.bind(this);
    }
    componentDidMount(){
        const ImageSrc = this.props.ImageSrc;
        this.stage = new Konva.Stage({
            container: 'myCanvas',
            width: 640,
            height: 480
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        this._addImageAndTextToLayer();
    }
    componentDidUpdate(){
        this._addImageAndTextToLayer();
    }
    _addImageAndTextToLayer(isOnlyImage){
        let self = this;
        const ImageSrc = this.props.ImageSrc;
        if(ImageSrc && ImageSrc !== ''){
            var image = new Image();
            image.onload = function(){
                var _image = (self.image) ? self.image : new Konva.Image();
                _image.setAttrs({
                    image : image,
                    width : image.width,
                    height : image.height,
                    x : 0,
                    y : 0
                });

                self.stage.setAttrs({
                    width : image.width,
                    height : image.height
                });

                _image.setZIndex(1);
                if(!self.image){
                    self.layer.add(_image)
                };
                self.image = _image;

                if(!isOnlyImage) self._addTextToLayer();

                self.layer.draw();
            }

            image.src = ImageSrc;
        }else{
            this._addTextToLayer(true);
        }
    }
    _addTextToLayer(isDraw){
        let self = this;
        if(!self.texts){
            self.texts = self.props.Texts.map((t)=>{
                var _text = new Konva.Text({
                    id : t.id,
                    x: 10,
                    y: 15,
                    text: t.text,
                    align : 'center',
                    fontSize: 30,
                    fontFamily: 'Arial',
                    fill: t.color,
                    draggable : true
                });
                self.layer.add(_text);
                if(isDraw) self.layer.draw();

                return _text;
            });
        }else{
            const texts = this.props.Texts;

            this.texts.map((t)=>{
                var obj = _.findWhere(texts, {id : t.id()});
                if(obj){
                    t.setZIndex(999);
                    t.setAttrs({
                        text : obj.text,
                        fill : obj.color
                    });
                    this.layer.draw();
                }
            })
        }

    }
    render(){
        return <div id={this.props.Id}></div>
    }
}