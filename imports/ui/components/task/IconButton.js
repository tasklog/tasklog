import React, { Component, createRef } from 'react'
import tippy from 'tippy.js'

class IconButton extends Component {
    button = createRef()
    componentDidMount() {
        if (!this.props.noTooltip) {
            tippy.one(this.button.current)
        }
    }
    render() {
        return (
            <button
                ref={this.button}
                className={`icon-button ${this.props.className}`}
                onClick={this.props.onClick}
                title={this.props.label}
                aria-label={this.props.label}
            >
                <this.props.icon />
            </button>
        )
    }
}

export default IconButton