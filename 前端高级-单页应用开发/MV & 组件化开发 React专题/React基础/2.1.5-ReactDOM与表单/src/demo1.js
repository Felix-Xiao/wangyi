import React from 'react';
import ReactDOM from 'react-dom'

import inp from './input'
import confirm from './confirm'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: false,
			confirm: false
		}
	}

	render() {
		return (
			<div>
				app
				{this.state.confirm + ''}
				{this.state.data.map(item => <p key={item}> {item}</p>)}
			</div>
		)
	}

	componentDidMount() {
		let self = this;
		inp.show({
			onOk: (value) => {
				let obj = {
					message: 'Are you sure to add ' + value + '?',
					onCancel: function () {
						self.setState({ confirm: false })
					},
					onOk: function () {
						let data = self.state.data;
						data.push(value);
						self.setState({
							confirm: true,
							data: data
						})
					}
				}
				confirm.show(obj)
			}
		})
	}
}
export default App;
