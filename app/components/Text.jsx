import React from 'react';
import TextPropertiesModal from './TextProperties.jsx';

let TextInput = React.createClass({
    displayName : 'TextInput',
    _changeTextValue(e){
        const id = this.props.data.id;
        this.props.onEditText(id, e.target.value);
    },
    _colorDrag(color,cb){
        this.props.onEditColor(this.props.data.id, color);
    },
    render(){
        return <div>
            <input type="text" defaultValue={this.props.data.text} onChange={this._changeTextValue}/>
            <TextPropertiesModal/>
        </div>
    }
});

module.exports = TextInput;