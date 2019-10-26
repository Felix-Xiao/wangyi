import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Confirm extends React.Component {
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
						confirm.hide()
					}}>取消</button>
					<button onClick={(e) => {
						onOk()
						confirm.hide()
					}}>确定</button>
				</div>
			</div>
		)
	}
}
let node = null
const confirm = {
	show(obj) {
		node = document.createElement('div')
		document.body.appendChild(node)
		ReactDOM.render(<Confirm message={obj.message} onCancel={obj.onCancel} onOk={obj.onOk} />, node)
	},
	hide() {
		if (node) {
			ReactDOM.unmountComponentAtNode(node)
			document.body.removeChild(node)
		}
	}
}
export default confirm
