import React from 'react';
import ReactDOM from 'react-dom'

import inp from './input'

//对象和数组的解构，... 对应的是位置，和变量名字无关
class User extends React.Component{
	render() {
		const {
			name,
			age,
			lesson,
			...rest
		} = this.props
		return (
			<div {...rest}>
				{name} - {age} - {lesson}
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'ryan',
			age:30,
			lesson:'react'
		}
	}

	render() {
		let {
			name,
			age,
			lesson
		} = this.state
		return (
			<div>
				<User
					name={name}
					age={age}
					lesson={lesson}
					style={{color:'red'}}
					onClick={() =>{
						alert('hello')
					}}
					onMouseOver={() => {

					}}
				/>
			</div>
		)
	}
}
export default App;
