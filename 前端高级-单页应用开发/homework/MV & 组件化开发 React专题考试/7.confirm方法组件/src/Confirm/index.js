import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function confirm(config) {
    return new Promise((resole, reject) => {
        //创建div，并加到body上
        var div = document.createElement('div');
        document.body.append(div);
        //根据config创建currentConfig，将visible设置为true，将来可以添加其他属性
        var currentConfig = Object.assign(Object.assign({}, { close: close, visible: true }), config);

        //渲染方法,用props.visible属性控制是否显示Dialog,并根据点击事件执行onCancel(),onOk()方法
        function render(props) {
            ReactDOM.render(
                props.visible &&
                <div className='modal'>
                    <div className='modal-mask'></div>
                    <div className='modal-wrap'>
                        <div className='modal1'>
                            <div className='modal-content'>
                                <div className='modal-body'>
                                    <div className='modal-confirm__wrapper'>
                                        <div className='modal-confirm__body'>
                                            <span className='modal-confirm__title'> {props.title}</span>
                                        </div>
                                        <div className='modal-confirm__btns'>
                                            <button className='confirm__btn' onClick={(e) => {
                                                //执行onCancel事件并且取得返回值
                                                var result = props.onCancel()
                                                props.close()
                                                //执行resole，如果result有值则使用result，否则返回false
                                                resole(result || false)
                                            }}>取消</button>
                                            <button className='confirm__btn btn-primary'
                                                onClick={(e) => {
                                                    //执行onOk事件并且取得返回值
                                                    var result = props.onOk()
                                                    props.close()
                                                    //执行resole，如果result有值则使用result，否则返回true
                                                    resole(result || true)
                                                }}>确定</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>, div)
        }
        //关闭Dialog方法，将visible设置成false，隐藏Dialog
        function close() {
            currentConfig = Object.assign(Object.assign({}, currentConfig), {
                visible: false,
            });
            render(currentConfig);
        }
        //根据currentConfig参数第一次渲染confirm
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