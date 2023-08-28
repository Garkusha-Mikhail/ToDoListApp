import { PropTypes } from 'prop-types'
import { Component } from 'react'

import './NewTaskForm.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { task: '', hour: '', min: '', sec: '' }
  }

  static defaultProps = {
    onAddItem: () => {},
  }

  onTaskChange = (e) => {
    this.setState({
      task: e.target.value,
    })
  }
  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }
  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { task, hour, min, sec } = this.state
    console.log('press')
    e.preventDefault()
    e.target.reset()
    if (this.state.task.length > 0) {
      this.props.onAddItem(task, hour, min, sec)
    }
    this.setState({
      task: '',
      hour: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { task, min, sec } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <button className="hidden" />
          <input
            onChange={this.onTaskChange}
            value={task}
            type="text"
            className="new-todo"
            placeholder="Task"
            autoFocus
          />
          <input
            onChange={this.onMinChange}
            value={min}
            type="number"
            className="new-todo"
            placeholder="min"
            autoFocus
          />
          <input
            onChange={this.onSecChange}
            value={sec}
            type="number"
            className="new-todo"
            placeholder="sec"
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
