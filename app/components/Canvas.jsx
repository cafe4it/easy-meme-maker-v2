import React from 'react';
import Konva from 'konva';
import _ from 'underscore';

export default class CanvasBox extends React.Component {
    constructor(props) {
        super(props);
        this._addImageAndTextToLayer = this._addImageAndTextToLayer.bind(this);
        this._addTextToLayer = this._addTextToLayer.bind(this);
    }

    componentDidMount() {
        const ImageSrc = this.props.ImageSrc;
        this.stage = new Konva.Stage({
            container: 'myCanvas',
            width: 640,
            height: 480
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        this._addImageAndTextToLayer();

        $('body').on('contextmenu', '#myCanvas', function (e) {
            return false;
        });
    }

    componentDidUpdate() {
        this._addImageAndTextToLayer();
    }

    _addImageAndTextToLayer(isOnlyImage) {
        let self = this;
        const canvasDefaultWidth = ($('#myCanvas').width() && $('#myCanvas').width() > 640) ? 640 : $('#myCanvas').width();
        const ImageSrc = this.props.ImageSrc;
        if (ImageSrc && ImageSrc !== '') {
            var image = new Image();
            image.onload = function () {
                var _image = (self.image) ? self.image : new Konva.Image();
                _image.setAttrs({
                    image: image,
                    x: 0,
                    y: 0
                });
                if(image.width > canvasDefaultWidth){
                    let scale_W = canvasDefaultWidth / image.width;
                    _image.setAttrs({
                        width: canvasDefaultWidth,
                        height: image.height * scale_W,
                    });

                    self.stage.setAttrs({
                        width: canvasDefaultWidth,
                        height: image.height * scale_W
                    });
                }else{
                    _image.setAttrs({
                        width: image.width,
                        height: image.height,
                    });

                    self.stage.setAttrs({
                        width: image.width,
                        height: image.height
                    });
                }

                _image.setZIndex(1);
                if (!self.image) {
                    self.layer.add(_image)
                }
                ;
                self.image = _image;

                if (!isOnlyImage) self._addTextToLayer();

                self.layer.draw();
            }

            image.src = ImageSrc;
        } else {
            this._addTextToLayer(true);
        }
    }

    _addTextToLayer(isDraw) {
        let self = this;
        if (!self.texts) {
            self.texts = self.props.Texts.map((t)=> {
                var _text = new Konva.Text({
                    id: t.id,
                    x: 0,
                    y: 0,
                    text: t.text,
                    align: 'center',
                    fontSize: t.fontSize,
                    fontFamily: t.fontFamily,
                    fontStyle : t.fontStyle,
                    wrap : 'char',
                    fill: t.color,
                    stroke : t.stroke,
                    strokeWidth : 0.5,
                    shadow : t.stroke,
                    shadowBlur : t.strokeWidth,
                    draggable: true
                });

                var X = 0, Y = 0;
                switch (t.align) {
                    case 'left':
                        X = 0;
                        break;
                    case 'right':
                        X = self.stage.width() - _text.width();
                        break;
                    case 'center':
                        X = (self.stage.width() / 2) - (_text.width() / 2);
                        break;
                }

                switch (t.valign) {
                    case 'top' :
                        Y = 10;
                        break;
                    case 'middle':
                        Y = (self.stage.height() / 2 ) - (_text.height() / 2);
                        break;
                    case 'bottom':
                        Y = (self.stage.height() - _text.fontSize() - 10);
                        break;
                }

                _text.setAttrs({
                    x: X,
                    y: Y
                })

                self.layer.add(_text);

                _text.on('dragend', function (e) {
                    var obj = {
                        id: _text.id(),
                        align: 'custom',
                        valign: 'custom'
                    }
                    self.props.onEditInput(obj);
                });

                // add cursor styling
                _text.on('mouseover', function () {
                    document.body.style.cursor = 'pointer';
                });
                _text.on('mouseout', function () {
                    document.body.style.cursor = 'default';
                });

                if (isDraw) self.layer.draw();

                return _text;
            });
        } else {
            const texts = this.props.Texts;

            this.texts.map((t)=> {
                var obj = _.findWhere(texts, {id: t.id()});
                if (obj) {
                    t.setZIndex(999);
                    t.setAttrs({
                        text: obj.text,
                        fill: obj.color,
                        shadow : obj.stroke,
                        shadowBlur : obj.strokeWidth,
                        fontFamily : obj.fontFamily,
                        fontSize : obj.fontSize,
                        fontStyle : obj.fontStyle
                    })

                    if (t.width() > self.stage.width()) {
                        t.width(self.stage.width());
                    }

                    var X = t.x();
                    var Y = t.y();
                    switch (obj.align) {
                        case 'left':
                            X = 0;
                            break;
                        case 'right':
                            X = self.stage.width() - t.width();
                            break;
                        case 'center':
                            X = (self.stage.width() / 2) - (t.width() / 2);
                            break;
                    }
                    switch (obj.valign) {
                        case 'top' :
                            Y = 10;
                            break;
                        case 'middle':
                            Y = (self.stage.height() / 2 ) - (t.height() / 2);
                            break;
                        case 'bottom':
                            Y = (self.stage.height() - t.fontSize() - 10);
                            break;
                    }

                    t.setAttrs({
                        x: X,
                        y: Y
                    });


                    this.layer.draw();
                }
            })
        }

    }

    render() {
        return <div id={this.props.Id}></div>
    }
}