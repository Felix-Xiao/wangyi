import React, { Component, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Confirm1 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            message,
            onOk,
            onCancel
        } = this.props
        return (
            <div className='loading'>
                <div className='loading__mask'></div>
                <div className='loading__content'>
                    <p> {message}</p>
                    <button onClick={(e) => {
                        onCancel()
                        Confirm.hide()
                    }}>取消</button>
                    <button onClick={(e) => {
                        onOk()
                        Confirm.hide()
                    }}>确定</button>
                </div>
            </div>

        )
    }
}
// const confirm = {
//     show(obj) {
//         debugger
//         node = document.createElement('div')
//         document.body.appendChild(node)
//         ReactDOM.render(<Confirm message={obj.message} onCancel={obj.onCancel} onOk={obj.onOk} />, node)
//     },
//     hide() {
//         if (node) {
//             ReactDOM.unmountComponentAtNode(node)
//             document.body.removeChild(node)
//         }
//     }
// }
// setStateAsync(state) {
//     return new Promise((resolve) => {
//     this.setState(state, resolve)
//     });
//     };
const useMyHook = (title) => {
    useEffect(() => {
        document.title = title
    },[title])
}
const Confirm = props => {
    let [confirm, setConfirm] = useState();
    // let obj = {
    //     message: props.msg,
    //     onCancel: function () {
    //         setConfirm(false)
    //     },
    //     onOk: function () {
            
    //     }
    // }
    // let node = null;
    // node = document.createElement('div')
    // document.body.appendChild(node)
    // ReactDOM.render(<Confirm1 message={"obj.message"}  />, node)
    useEffect(() => {
        setConfirm(true);
        return () =>{
            setConfirm(true);
        }
    })

    return (
        confirm

    )
}

// const Confirm2 = props  => {
// 	class confirmComponent extends Component {
// 		constructor(props){
// 			super(props)
// 			this.state = {

// 			}
// 		}
//         render() {
//             const {
//                 message,
//                 onOk,
//                 onCancel
//             } = this.props
//             return (
//                 <div className='loading'>
//                     <div className='loading__mask'></div>
//                     <div className='loading__content'>
//                         <p> {message}</p>
//                         <button onClick={(e) => {
//                             onCancel()
//                             Confirm.hide()
//                         }}>取消</button>
//                         <button onClick={(e) => {
//                             onOk()
//                             Confirm.hide()
//                         }}>确定</button>
//                     </div>
//                 </div>

//             )
//         }

// 		componentDidMount() {
// 			let that = this
// 			window.store = new Proxy(store, {
// 				get: function (target, key, receiver) {
// 					return Reflect.get(target, key, receiver);
// 				},
// 				set: function (target, key, value, receiver) {
// 					that.setState({
// 						[key]:value
// 					})
// 					return Reflect.set(target, key, value, receiver);
// 				}
// 			})
// 		}

// 	}
// 	return connectComponent
// }
export default Confirm;