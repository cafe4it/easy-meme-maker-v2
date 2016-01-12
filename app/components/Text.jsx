import React from 'react';
require('bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js');
require('!style!css!bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css');

let TextInput = React.createClass({
    displayName: 'TextInput',
    _changeTextValue(e){
        const id = this.props.data.id;
        this.props.onEditText(id, e.target.value);
    },
    _colorDrag(e){

    },
    _changeAlign(e){
        this.props.onEditAlign(this.props.data.id, e.target.value);
    },
    componentDidMount(){
        var self = this;
        var id = self.props.data.id,
            color_pickerId = '#color_picker' + id;
        $(function () {
            $(color_pickerId).colorpicker().on('changeColor.colorpicker', function (e) {
                self.props.onEditColor(self.props.data.id, e.color.toHex());
            });
        });
    },
    render(){
        var aligns = [
            {
                id : 'left',
                value : 'Left'
            },
            {
                id : 'center',
                value : 'Center'
            },
            {
                id : 'right',
                value : 'Right'
            }
        ]
        return <div className="row">
            <div className="col-md-8">
                <div className="form-group">
                    <input className="form-control" type="text" defaultValue={this.props.data.text}
                           onChange={this._changeTextValue}/>
                </div>
            </div>
            <div className="col-md-2">
                <select className="form-control" defaultValue={this.props.data.align} onChange={this._changeAlign} id={'sltAlign_' + this.props.data.id}>
                    {aligns.map((a)=>
                            <option key={a.id} value={a.id}>{a.value}</option>
                    )}
                </select>
            </div>
            <div className="col-md-2">
                <input id={'color_picker' + this.props.data.id} type="text" defaultValue={this.props.data.color}
                       value={this.props.data.color} className="color-picker form-control" onChange={this._colorDrag}/>
            </div>
        </div>
    }
});

module.exports = TextInput;