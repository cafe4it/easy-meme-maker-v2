import React from 'react';
require('bootstrap-colorpicker');

module.exports = React.createClass({
    displayName : 'ColorPicker',
    componentDidMount(){
        $(function(){
            $('.color-picker').colorpicker();
        });
    },
    render(){
        return <div className="input-group color-picker">
            <input type="text" value={this.props.data.color} className="form-control"/>
            <span className="input-group-addon"><i></i></span>
        </div>
    }
})
