import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Page extends Component {
    render() {
        return (
            <div className='page'>
                {this.props.children}
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Page)