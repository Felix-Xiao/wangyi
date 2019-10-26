import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../Icon'
import './index.scss'

class Button extends Component {
	static propTypes = {
		icon: PropTypes.string,
		typt: PropTypes.string
	}
	static defaultProps = {
		icon: 'dianpu',
		type: 'primary'
	}
	render() {
		const {
			icon,
			children,
			type,
			size,
			...rest
		} = this.props
		let cls = classNames({
			[`size-${size}`]: true,
		})
		return (
			<button className={`react-ui__btn react-ui__btn--${type} size-${size}`}>
				<Icon name={icon} />
				{children}
			</button>
		)
	}
}

export default Button

