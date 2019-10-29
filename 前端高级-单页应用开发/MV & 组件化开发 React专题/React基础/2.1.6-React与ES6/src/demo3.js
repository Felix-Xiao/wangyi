import React from 'react';
import ReactDOM from 'react-dom'

import inp from './input'

//类的继承，子类继承父类方法，子类调用父类方法，可用于创建所有子类的父类，用来包装共有的行为
class LoadingComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	render() {
		const {
			loading
		} = this.state
		return (
			<div>
				{loading ? 'loading....' : ''}
			</div>
		);
	}
	showLoading() {
		this.setState({
			loading: true
		})
	}
	hideLoading() {
		this.setState({
			loading: false
		})
	}
}


class App extends LoadingComponent {
	render() {
		return (
			<div>
				{super.render()}
				app
			</div>
		);
	}

	componentDidMount() {
		this.showLoading()
		setTimeout(() => {
			this.hideLoading()
		}, 3000)
	}
}

//代理，创建代理，可以拦截对参数的赋值和取值操作
let obj = new Proxy({
	a: 10,
	b: 20
}, {
		get: function (target, key, ) {
			console.log('get ', key)
			return target[key] * 10
		},
		set: function (target, key, value) {
			return Reflect.set(target, key, value)
		}
	})

let obj1 = new Proxy({
	a: 10,
	b: 20
}, {
		get: function (target, key) {
			console.log('target: ' + target, 'key: ' + key);
			return target[key] * 10;
		},
		set: function (target, key, value) {
			console.log('target: ' + target, 'key: ' + key, 'value: ' + value)
			return Reflect.set(target, key, value + 1)
		}
	})

window.obj = obj
window.obj1 = obj1
export default App;
