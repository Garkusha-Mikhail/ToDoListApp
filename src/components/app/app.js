import { Component } from 'react'

import Header from '../NewTaskForm/NewTaskForm'
import TodoList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          task: 'Remove Task1',
          active: true,
          key: 1,
          id: 1,
        },
        {
          task: 'Remove Task2',
          active: true,
          key: 2,
          id: 2,
        },
        {
          task: 'Remove Task3',
          active: true,
          key: 3,
          id: 3,
        },
      ],
      filter: 'all',
    }
    this.maxKey = 4
    this.maxId = 4
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

  addItem = (task) => {
    const newItem = {
      task,
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
