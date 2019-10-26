import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import './index.scss'

class Input extends Component {
	constructor(props) {
		super(props)
		this.state = {
			focus: false,
			innerValue: ''
		}
	}
	static propTypes = {
		size: PropTypes.string,
		message: PropTypes.string,
		onChange: PropTypes.func,
	}
	static defaultProps = {
		size: 'middle',
		onChange: () => { },
	}
	get inControl() {
		return 'value' in this.props
	}
	get value() {
		if (this.state.inControl) {
			return this.props.value
		} else {
			return this.state.innerValue
		}
	}

	render() {
		const {
			focus
		} = this.state
		const {
			icon,
			size,
			value,
			onChange,
			message,
			prefix,
			subfix,
			defaultValue,
			children,
			rule = new RegExp(),
			...rest
		} = this.props

		let cls = classNames({
			input: true,
			focus,
			[`size-${size}`]: true,
			'react-ui__input': true,
		})

		return (
			<div>
				<div className={cls}>
					{prefix && <Icon name={prefix} />}
					<input
						value={this.value}
						onFocus={e => {
							this.setState({
								focus: true
							})
						}}
						onBlur={e => {
							this.setState({
								focus: false
							})
						}}
						onChange={(e) => {
							if (!this.inControl) {
								this.setState({
									innerValue: e.target.value
								})
							}
							this.props.onChange(e)
						}}
					/>
					{subfix && <Icon name={subfix} />}

				</div>
				<p>
					{!rule.test(this.value) && message}
				</p>
			</div>
		)
	}
	componentDidMount() {
		this.setState({
			innerValue: this.props.defaultValue
		})
	}
}

export default Input

// 受控
// 非受控
