import React, { Component } from 'react'

import { apiEndpoint } from './helpers'
import LoadingSpinner from './LoadingSpinner'
import DollarInput from './DollarInput'
import { ReactComponent as XIcon } from '../media/x-icon.svg'

import axios from 'axios'

const initialState = {
  loading: false,
  list: [],
  newListItem: ""
}

class DollarList extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    this.setState({loading: true} , () => {
      axios({
        method: 'get',
        url: apiEndpoint(this.props.mainRoute)
      })
      .then(response => {
        console.log(response)
        this.setState({
          loading: false,
          list: response.data
        })
      })
      .catch(error => console.log(error))
    })
  }

  handleNewItemName = (e) => {
    this.setState({
      newListItem: e.target.value
    })
  }

  handleNewItem = () => {
    this.setState({loading: true} , () => {
      axios({
        method: 'post',
        url: apiEndpoint(this.props.mainRoute + '/new'),
        data: { name: this.state.newListItem }
      })
      .then(response => {
        console.log(response)
        this.setState({ loading: false }, this.getList)
      })
      .catch(error => console.log(error))
    })
  }

  updateItemValue = (id, value) => {
    this.setState({loading: true} , () => {
      axios({
        method: 'post',
        url: apiEndpoint(this.props.mainRoute + '/update/value'),
        data: {
          id: id,
          value: value
        }
      })
      .then(response => {
        console.log(response)
        this.setState({ loading: false }, this.getList)
      })
      .catch(error => console.log(error))
    })
  }

  updateItemName = (id, name) => {
    this.setState({loading: true} , () => {
      axios({
        method: 'post',
        url: apiEndpoint(this.props.mainRoute + '/update/name'),
        data: {
          id: id,
          name: name
        }
      })
      .then(response => {
        console.log(response)
        this.setState({ loading: false }, this.getList)
      })
      .catch(error => console.log(error))
    })
  }

  deleteItem = (id) => {
    const itemToDelete = this.state.list.find(x => x.id === id)

    if (itemToDelete && window.confirm(`Are you sure you want to delete the ${this.props.itemName}: "${itemToDelete.name}"?`)) {
      this.setState({loading: true} , () => {
        axios({
          method: 'post',
          url: apiEndpoint(this.props.mainRoute + '/delete'),
          data: { id: id }
        })
        .then(response => {
          console.log(response)
          this.setState({ loading: false }, this.getList)
        })
        .catch(error => console.log(error))
      })
    }
  }

  handleNameChange = (e, id) => {
    let newList = JSON.parse(JSON.stringify(this.state.list))
    let foundItem = newList.find(x => x.id === id)

    if (foundItem) {
      foundItem.name = e.target.value
    }

    this.setState({
      list: newList
    })
  }

  handleNameUpdate = (e, id) => {
    if (e.key === 'Enter') {
      this.updateItemName(id, e.target.value)
    }
  }

  handleNameFocus = (e) => {
    e.preventDefault()
    e.target.select()
  }

  render () {
    if (this.state.loading) {
      return (<LoadingSpinner/>)
    }

    const tableStyle = {
      textAlign: "right",
      margin: "0 auto"
    }

    const nameInputStyle = {
      fontWeight: "bold",
      background: "transparent",
      border: "none",
      color: "white",
      textAlign: "right",
      width: this.state.list.reduce((acc, curr) => {
        if (curr.name.length > acc) {
          return curr.name.length
        }
        return acc
      }, 0).toString() + "em"
    }

    const xIconStyle = {
      paddingRight: "10px",
      paddingLeft: "10px",
      cursor: "pointer",
      opacity: "60%"
    }

    return (
      <div>
        <table style={tableStyle}><tbody>
          { this.state.list.sort((a, b) => b.value - a.value).map(item => {
            return (
              <tr key={item.id}>
                <td><input style={nameInputStyle} value={item.name} onFocus={this.handleNameFocus}
                           onChange={e => this.handleNameChange(e, item.id)} onKeyDown={e => this.handleNameUpdate(e, item.id)}/></td>
                <td><DollarInput defaultValue={item.value}
                                 handleUpdate={(value) => this.updateItemValue(item.id, value)}/></td>
                <td><XIcon style={xIconStyle} onClick={() => this.deleteItem(item.id)}/></td>
              </tr>
            )
          })}
          { this.state.list.length > 1 ?
            <tr>
              <td style={{fontWeight: "bold"}}>Total</td>
              <td style={{fontSize: "x-large"}}>$ {this.state.list.reduce((acc, curr) => acc += curr.value, 0)}</td>
              <td></td>
            </tr>
          : null }
        </tbody></table>
        <br/><br/>
        <div>
          Enter new {this.props.timeFrame} {this.props.itemName}:
          <br/><br/>
          <input type="text" placeholder={`${this.props.itemName} name`} onChange={this.handleNewItemName}/>
          <button onClick={this.handleNewItem}>Submit</button>
        </div>
      </div>
    )
  }
}

export default DollarList;
