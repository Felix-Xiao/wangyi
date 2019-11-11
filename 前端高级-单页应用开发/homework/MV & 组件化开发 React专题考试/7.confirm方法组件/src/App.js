import React, { Component } from 'react';
import Confirm from './Confirm';

//confirm 方法返回Confirm组件,可以添加更多参数
function confirm(props) {
	return Confirm({
		title: props,
		onOk() {
			// console.log('OK');
			return true;
		},
		onCancel() {
			// console.log('Cancel');
			return false;
		},
	});
}

class App extends Component{
	render(){
		return (
			<div>
				aaa
			</div>
		)
	}
	async componentDidMount(){
		let res = await confirm("确定删除吗")
		if (res) {
			console.log("是")
		} else {
			console.log("否")
		}
	}
}

export default App;