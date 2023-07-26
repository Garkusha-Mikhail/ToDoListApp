import { PropTypes } from 'prop-types'
import { Component } from 'react'

import './NewTaskForm.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { task: '' }
  }

  static defaultProps = {
    onAddItem: () => {},
  }

  onValueChange = (e) => {
    this.setState({
      task: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    e.target.reset()
    if (this.state.task.length > 0) {
      this.props.onAddItem(this.state.task)
    }
    this.setState({
      task: '',
    })
  }

  render() {
    const { task } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onValueChange}
            value={task}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
        </form>
      </header>
    )
  }
}

Header.propTypes = {
  onAddItem: PropTypes.func,
}

export default Header
