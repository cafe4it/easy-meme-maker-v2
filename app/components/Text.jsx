import React from 'react';
import InputColor from 'react-input-color';

let TextInput = React.createClass({
    displayName : 'TextInput',
    _changeTextValue(e){
        const id = this.props.data.id;
        this.props.onEditText(id, e.target.value);
    },
    _colorDrag(e){
        this.props.onEditColor(this.props.data.id, e.target.value);
    },
    render(){
        return <div>
            <input type="text" defaultValue={this.props.data.text} onChange={this._changeTextValue}/>
            <input type="color" defaultValue={this.props.data.color} onChange={this._colorDrag}/>
        </div>
    }
});

module.exports = TextInput;