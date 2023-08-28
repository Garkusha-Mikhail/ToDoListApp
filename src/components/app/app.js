import { Component } from 'react'

import Header from '../NewTaskForm/NewTaskForm'
import TodoList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      filter: 'all',
    }
    this.maxKey = 1
    this.maxId = 1
  }

  deleteItem = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((item) => item.id !== id),
    }))
  }

  onComplete = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, active: !item.active }
        }
        return item
      }),
    }))
  }

  addItem = (task, hour, min, sec) => {
    const newItem = {
      task,
      hour,
      min,
      sec,

      active: true,
      key: this.maxKey++,
      id: this.maxId++,
    }

    this.setState(({ data }) => {
      const newArr = [...data, newItem]
      return {
        data: newArr,
      }
    })
  }

  onClearComplete = () => {
    this.setState(({ data }) => ({
      data: data.filter((item) => item.active),
    }))
  }

  filterTasks = (items, filter) => {
    switch (filter) {
      case 'active':
        return items.filter((item) => item.active)
      case 'completed':
        return items.filter((item) => !item.active)
      default:
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({ filter })
  }

  taskEdit = (task, id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, task }
        }
        return item
      }),
    }))
  }
  taskSaveTime = (id, hour, min, sec) => {
    console.log(`method started with ${id} ${hour} ${min} ${sec}`)
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, hour, min, sec }
        }
        return item
      }),
    }))
  }

  render() {
    const { data, filter } = this.state
    const taskVolume = data.filter((item) => item.active).length
    const visibleData = this.filterTasks(data, filter)

    return (
      <section className="todoapp">
        <Header onAddItem={this.addItem} />
        <section className="main">
          <TodoList
            data={visibleData}
            taskSaveTime={this.taskSaveTime}
            onComplete={this.onComplete}
            onDelete={this.deleteItem}
            taskEdit={this.taskEdit}
          />
          <Footer
            taskVolume={taskVolume}
            onClearComplete={this.onClearComplete}
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </section>
      </section>
    )
  }
}

export default App
