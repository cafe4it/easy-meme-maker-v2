import React from 'react';
import Konva from 'konva';

export default class CanvasBox extends React.Component{
    constructor(props){
        super(props);
        this._addImageToLayer = this._addImageToLayer.bind(this);
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

        this._addImageToLayer();
    }
    componentDidUpdate(){
        this._addImageToLayer();
    }
    _addImageToLayer(){
        let self = this;
        const ImageSrc = this.props.ImageSrc;
        Konva.Image.fromURL(ImageSrc, function(image){
            self.stage.setAttrs({
                width : image.width(),
                height : image.height()
            })
            self.layer.add(image);
            self.layer.draw();
        });
    }
    render(){
        return <div id={this.props.Id}></div>
    }
}