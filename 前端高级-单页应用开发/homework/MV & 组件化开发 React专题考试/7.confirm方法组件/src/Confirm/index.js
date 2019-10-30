import React, { Component, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function confirm(config) {
    return new Promise((resole, reject) => {
        var div = document.createElement('div');
        document.body.append(div);
        var currentConfig = Object.assign(Object.assign({}, { close: close, visible: true, done: false }), config);

        function render(props) {
            ReactDOM.render(
                props.visible &&
                <div className='loading'>
                    <div className='loading__mask'></div>
                    <div className='loading__content'>
                        <p> {props.title}</p>
                        <button onClick={(e) => {
                            var result = props.onCancel()
                            props.close()
                            resole(result || false)
                        }}>取消</button>
                        <button onClick={(e) => {
                            var result = props.onOk()
                            props.close()
                            resole(result || true)
                        }}>确定</button>
                    </div>
                </div>,
                div)
        }
        function close() {
            currentConfig = Object.assign(Object.assign({}, currentConfig), {
                visible: false,
            });
            render(currentConfig);
        }
        render(currentConfig);
    })
}
function Confirm(props) {
    var config = props;
    return confirm(config).then((result) => {
        return result
    });
}
export default Confirm;