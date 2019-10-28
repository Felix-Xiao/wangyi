import React, { Component, useState } from 'react';
import Confirm from './Confirm';

class App extends Component{
	render(){
		return (
			<div>
				aaa
			</div>
		)
	}
	async componentDidMount(){
		let res = await Confirm("确定删除吗")
		if (res) {
			console.log("是")
		} else {
			console.log("否")
		}
	}
}

export default App;