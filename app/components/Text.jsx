import React from 'react';
import _ from 'underscore';
require('imports?$=jquery!../libs/bootstrap-colorpicker.js');
require('!style!css!bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css');

let TextInput = React.createClass({
    displayName: 'TextInput',
    _changeTextValue(e){
        this.props.onEditInput(_.extend(this.props.data, {text: e.target.value}));
    },
    _colorDrag(e){

    },
    _changeAlign(e){
        this.props.onEditInput(_.extend(this.props.data, {align: e.target.value}));
    },
    _changeVAlign(e){
        this.props.onEditInput(_.extend(this.props.data, {valign: e.target.value}));
    },
    _changeFontFamily(e){
        this.props.onEditInput(_.extend(this.props.data, {fontFamily: e.target.value}));
    },
    _changeFontSize(e){
        this.props.onEditInput(_.extend(this.props.data, {fontSize: e.target.value}));
    },
    _changeFontStyle(e){
        this.props.onEditInput(_.extend(this.props.data, {fontStyle: e.target.value}));
    },
    componentDidMount(){
        var self = this;
        var id = self.props.data.id,
            color_pickerId = '#color_picker' + id;
        $(function () {
            $(color_pickerId).colorpicker().on('changeColor.colorpicker', function (e) {
                self.props.onEditInput(_.extend(self.props.data, {color: e.color.toHex()}));
            });
        });
    },
    render(){
        const aligns = [
            {
                id: 'left',
                value: 'Left'
            },
            {
                id: 'center',
                value: 'Center'
            },
            {
                id: 'right',
                value: 'Right'
            },
            {
                id: 'custom',
                value: 'Custom'
            }
        ]

        const vAligns = [
            {
                id: 'top',
                value: 'Top'
            },
            {
                id: 'middle',
                value: 'Middle'
            },
            {
                id: 'bottom',
                value: 'Bottom'
            },
            {
                id: 'custom',
                value: 'Custom'
            }
        ]

        const fontFamilies = [
            {
                id: 'Arial',
                value: 'Arial'
            },
            {
                id: 'Impact',
                value: 'Impact'
            }
        ];

        const fontSizes = [
            8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96
        ]

        const fontStyles = ['normal', 'bold', 'italic'];

        return <div className="row">
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                        <h4 className="panel-title">
                            {this.props.data.title}
                        </h4>
                    </div>
                    <div className="panel-body">
                        <div className="row row-input">
                            <div className="col-md-12">
                                <div className="form-inline">
                                    <div className="form-group">
                                        <select className="form-control" defaultValue={this.props.data.fontStyle}
                                                value={this.props.data.fontStyle}
                                                id={'sltFontStyle_'+this.props.data.id}
                                                onChange={this._changeFontStyle}>
                                            {fontStyles.map((fSt)=>
                                                    <option key={fSt} value={fSt}>{fSt}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;
                                    <div className="form-group">
                                        <select className="form-control" defaultValue={this.props.data.fontFamily}
                                                value={this.props.data.fontFamily}
                                                id={'sltFontFamily_'+this.props.data.id}
                                                onChange={this._changeFontFamily}>
                                            {fontFamilies.map((ff)=>
                                                    <option key={ff.id} value={ff.id}>{ff.value}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;
                                    <div className="form-group">
                                        <select className="form-control" defaultValue={this.props.data.fontSize}
                                                value={this.props.data.fontSize}
                                                id={'sltFontSize_'+this.props.data.id}
                                                onChange={this._changeFontSize}>
                                            {fontSizes.map((fs)=>
                                                    <option key={fs} value={fs}>{fs}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;
                                    <div className="form-group">
                                        <div className="input-group color_picker" id={'color_picker' + this.props.data.id}>
                                            <input type="text"
                                                   defaultValue={this.props.data.color}
                                                   value={this.props.data.color} className="color-picker form-control"
                                                   onChange={this._colorDrag}/>
                                            <span className="input-group-addon"><i></i></span>
                                        </div>
                                    </div>
                                    &nbsp;
                                    <div className="form-group">
                                        <select className="form-control" defaultValue={this.props.data.valign}
                                                value={this.props.data.valign}
                                                id={'sltVAlign_'+this.props.data.id} onChange={this._changeVAlign}>
                                            {vAligns.map((v)=>
                                                    <option key={v.id} value={v.id}>{v.value}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;
                                    <div className="form-group">
                                        <select className="form-control" defaultValue={this.props.data.align}
                                                value={this.props.data.align} onChange={this._changeAlign}
                                                id={'sltAlign_' + this.props.data.id}>
                                            {aligns.map((a)=>
                                                    <option key={a.id} value={a.id}>{a.value}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input className="form-control" type="text" defaultValue={this.props.data.text}
                                           onChange={this._changeTextValue}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
});

module.exports = TextInput;