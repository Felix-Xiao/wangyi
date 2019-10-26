import React from 'react';
import ReactDOM from 'react-dom'

import inp from './input'

//类的继承，子类继承父类方法
class LogComponent extends React.Component{
	componentWillUnmount() {
		console.log('app','unmount')
	}
	componentWillMount() {
		console.log('app','mount')
	}
}


class App extends LogComponent{
	render() {
		return (
			<div id = 'app'>
				app
			</div>
		);
	}
}


export default App;
