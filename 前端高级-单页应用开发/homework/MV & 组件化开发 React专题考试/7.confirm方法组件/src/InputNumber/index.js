import React, { Component } from 'react'

class InputNumber extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
    }
    //根据props中是否有value属性判断是否是可控组件
    get inControl() {
        return 'value' in this.props
    }
    //显示的值，如果是受控组件则显示父组件传进的value；如果是非受控组件则显示内部的value
    get value() {
        if (this.inControl) {
            console.log("From outerControl");
            return this.props.value
        } else {
            console.log("From innerControl");
            return this.state.value
        }
    }
    render() {
        return (
            <div>
                <input value={this.value} onChange={e => {
                    // 如果是受控组件则调用父组件onChange方法; 如果是非受控组件则改变内部value状态
                    if (!this.inControl) {
                        this.setState({
                            value: e.target.value
                        })
                    }
                    this.props.onChange(e)
                }} />
            </div>
        )
    }
    componentDidMount() {
        //将默认值赋值
        this.setState({
            value: this.props.defaultValue
        })
    }
}

export default InputNumber;