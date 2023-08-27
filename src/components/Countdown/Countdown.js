/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Component } from 'react'
import './Countdown.css'
class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startedTimer: false,
      finished: false,
      taskHour: 0,
      taskMin: 0,
      taskSec: 0,
    }
    this.startTimer = () => {
      const { startedTimer, finished } = this.state
      const { id } = this.props
      console.log(`timer ${id} started`)
      if (startedTimer) {
        return
      }
      this.setState({ startedTimer: true })

      this.timer = setInterval(() => {
        const { taskHour, taskMin, taskSec } = this.state
        console.log(`interval ${id} started`)
        let hourLeft = taskHour
        let minLeft = taskMin
        let secLeft = taskSec
        console.log(`left ${hourLeft} ${minLeft} ${secLeft}`)
        if (finished) {
          console.log(`task ${id} finished`)
        }

        if (secLeft === 0) {
          if (minLeft === 0 && hourLeft === 0) {
            clearInterval(this.timer)
            this.setState({ startedTimer: false, finished: true })
            console.log(`task ${id} finished`)
          } else if (minLeft === 0 && hourLeft > 0) {
            hourLeft -= 1
            minLeft = 59
            secLeft = 59
          } else if (minLeft > 0) {
            minLeft -= 1
            secLeft = 59
          }
        } else {
          secLeft -= 1
        }
        this.setState({ taskHour: hourLeft, taskMin: minLeft, taskSec: secLeft })
      }, 1000)
    }

    this.pauseTimer = () => {
      console.log(`timer ${this.props.id} paused`)
      this.setState({ startedTimer: false })
      clearInterval(this.timer)
    }
  }

  componentDidMount() {
    const { min, sec } = this.props

    const hours = Math.floor(min / 60)
    const fomatedMin = hours ? (min % 60) + Math.floor(sec / 60) : Math.floor(sec / 60) + +min
    const formatedSec = sec % 60 ? sec : 0

    this.setState({ taskHour: hours, taskMin: fomatedMin, taskSec: formatedSec })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { startedTimer, taskHour, taskMin, taskSec } = this.state

    return (
      <div className="description">
        <button
          type="button"
          className={`icon icon-play ${startedTimer ? 'started' : null}`}
          aria-label="play"
          onClick={this.startTimer}
        />
        <button type="button" className="icon icon-pause" aria-label="pause" onClick={this.pauseTimer} />
        <span style={{ marginLeft: 10 }}>{`${taskHour.toString().padStart(2, '0')}:${taskMin
          .toString()
          .padStart(2, '0')}:${taskSec.toString().padStart(2, '0')}`}</span>
      </div>
    )
  }
}

export default Countdown
