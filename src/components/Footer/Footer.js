import { PropTypes } from 'prop-types'
import { Component } from 'react'

import Filters from '../TaskFilters/TaskFilters'

import './Footer.css'

class Footer extends Component {
  static defaultProps = {
    taskVolume: 1,
  }

  render() {
    const { taskVolume, onClearComplete, filter, onFilterSelect } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{taskVolume} items left</span>
        <Filters filter={filter} onFilterSelect={onFilterSelect} />
        <button className="clear-completed" onClick={onClearComplete}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.propTypes = {
  taskVolume: PropTypes.number,
  onClearComplete: PropTypes.func.isRequired,
  filter: PropTypes.string,
  onFilterSelect: PropTypes.func.isRequired,
}

export default Footer
