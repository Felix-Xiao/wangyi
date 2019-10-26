import React from 'react';
import PropTypes from 'prop-types'

//使用context传递参数 context打破了组件之间必须通过props传递状态的过程，类似一个全局变量空间，其内容能被随意接触修改。这样导致程序不可控。
class App extends React.Component {
	//用来设置组件的context
	getChildContext() {
		return {color: "purple"};
	}
	constructor(props){
		super(props)
		this.state = {
			name: 'son'
		}
	}
	render() {
		console.log('App rerender')
		return (
			<div>
				{this.state.name && <Son1 name={this.state.name}/>}
			</div>
		);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('App did update')
	}

	componentWillUpdate(prevProps, prevState) {
		console.log('App will update')
	}
	
	componentDidMount() {
		console.log('app mount')
		window.app = this
	}

}

//是为context中的字段设置类型检查，必须设置
App.childContextTypes = {
	color: PropTypes.string
}
class Son1 extends React.Component{
	render() {
		console.log('Son1 rerender')
		return (
			<div>

				{this.props.name && <GrandSon1 name={this.props.name + '-grand'}/>}
			</div>
		);
	}
	componentWillUpdate(prevProps, prevState) {
		console.log('son will update')
	}
	componentDidUpdate(prevProps, prevState) {
		console.log('son did update')
	}
	componentDidMount() {
		console.log('son mount')
	}
	componentWillUnmount() {
		console.log('son unmount')
	}
}

class GrandSon1 extends React.Component{
	render() {
		console.log('GrandSon1 rerender')
		return (
			<div>
				{/* this.context.<key>即可获取 */}
				{this.props.name} - {this.context.color}
			</div>
		);
	}
	componentWillUpdate(prevProps, prevState) {
		console.log('son will update')
	}
	componentDidUpdate(prevProps, prevState) {
		console.log('GrandSon1 did update')
	}
	componentDidMount() {
		console.log('grandson mount')
	}
	componentWillUnmount() {
		console.log('GrandSon1 unmount')
	}
}

//首先要类型检查，必须的
GrandSon1.contextTypes = {
	color: PropTypes.string
};
export default App;
