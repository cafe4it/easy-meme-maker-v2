import React from 'react';
import Konva from 'konva'

export default class CanvasBox extends React.Component{
    componentDidMount(){
        var stage = new Konva.Stage({
            container: 'myCanvas',
            width: 800,
            height: 600
        });

        var layer = new Konva.Layer();
        stage.add(layer);

        // create shape
        var box = new Konva.Rect({
            x: 0,
            y: 0,
            width: 100,
            height: 50,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
        });
        layer.add(box);

        layer.draw();

        // add cursor styling
        box.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        box.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
    }
    render(){
        return <div id={this.props.Id}></div>
    }
}