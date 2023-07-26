import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      currentDate: new Date(),
    }
  }

  updateTime = () => {
    this.setState({
      date: formatDistanceToNow(this.state.currentDate, { addSuffix: true, includeSeconds: true }),
    })
  }

  componentDidMount() {
    this.updateTime()
    this.timer = setInterval(this.updateTime, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <span className="created">
        created
        {this.state.date}{' '}
      </span>
    )
  }
}

export default Timer
