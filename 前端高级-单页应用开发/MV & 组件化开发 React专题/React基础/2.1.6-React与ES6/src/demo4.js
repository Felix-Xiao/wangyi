import React from 'react';
import ReactDOM from 'react-dom'

//修饰器，创建方式：创建一个函数，参数是组件(Component), 返回这个组件的子类，并在子组件中调用父组件的方法
//调用方式：在组件上加@(修饰器名字) 如 @loading
let loading = (Com) => {
	class LoadingComponent extends Com {
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
					{super.render()}
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
	return LoadingComponent
}

@loading
class App extends React.Component {
	render() {
		return (
			<div>
				app
			</div>
		);
	}

	componentDidMount() {
		this.showLoading()
		setTimeout(function(){
			this.hideLoading()
		}.bind(this), 3000)
	}
}

export default App;