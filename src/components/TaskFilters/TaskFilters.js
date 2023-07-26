import './TaskFilters.css'
import { PropTypes } from 'prop-types'

function Filters(props) {
  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = buttonsData.map(({ name, label }) => {
    const actived = props.filter === name
    const clazz = actived ? 'selected' : ''

    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => props.onFilterSelect(name)}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}

Filters.propTypes = {
  onFilterSelect: PropTypes.func,
  filter: PropTypes.string,
}

Filters.defaultProps = {
  filter: 'all',
}

export default Filters
