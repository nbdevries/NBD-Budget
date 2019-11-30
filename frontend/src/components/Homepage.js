import React, { Component } from 'react'

import Track from './Track'
import Overview from './Overview'
import Expenses from './Expenses'
import Incomes from './Incomes'
import Debts from './Debts'

import { ReactComponent as BurgerMenuIcon } from '../media/burger-menu-icon.svg'

const menuItems = [
  { name: "Track", component: <Track/> },
  { name: "Overview", component: <Overview/> },
  { name: "Monthly Expenses", component: <Expenses/> },
  { name: "Monthly Incomes", component: <Incomes/> },
  { name: "Overall Debts", component: <Debts/> }
]

const initialState = {
  showMenu: false,
  menuItems: menuItems,
  navigateTo: menuItems[0],
}

class Homepage extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleNavigation = (e) => {
    this.setState({
      navigateTo: menuItems.find(x => x.name === e.target.getAttribute('name')),
      showMenu: false
    })
  }

  showHideMenu = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render () {

    const menuStyle = {
      textAlign: "center",
      color: "white",
      backgroundColor: "#606060",
      height: "100%",
      position: "fixed",
      width: "100%"
    }

    const itemStyle = {
      cursor: "pointer"
    }

    if (this.state.showMenu) {
      return (
        <div style={menuStyle}>
         { this.state.menuItems.map(item => {
           return (<h2 key={item.name} style={itemStyle} name={item.name} onClick={this.handleNavigation}>{item.name}</h2>)
         })}
        </div>
      )
    }

    const headerStyle = {
      paddingTop: "15px",
      paddingBottom: "15px",
      width: "100%",
      zIndex: "99",
      backgroundColor: "#606060",
      boxShadow: "0 0 5px 2px #000000",
      textAlign: "center"
    }

    const burgerMenuIconStyle = {
      cursor: "pointer",
      position: "fixed",
      top: 0,
      left: 0,
      padding: "10px"
    }

    const titleStyle = {
      color: "white",
      fontWeight: "bold"
    }

    const componentStyle = {
      color: "white",
      padding: "20px",
      textAlign: "center"
    }

    return (
      <div>
        <div style={headerStyle}>
          <BurgerMenuIcon style={burgerMenuIconStyle} onClick={this.showHideMenu}/>
          <div style={titleStyle}>{this.state.navigateTo ? this.state.navigateTo.name : null }</div>
        </div>
        <div style={componentStyle}>
          { this.state.navigateTo ? this.state.navigateTo.component : null }
        </div>
      </div>
    )
  }
}

export default Homepage;
