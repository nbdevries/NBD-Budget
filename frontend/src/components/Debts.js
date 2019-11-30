import React, { Component } from 'react'

import DollarList from './DollarList'

const propsToSendDebts = {
  mainRoute: "debts",
  itemName: "Debt",
  timeFrame: "total"
}

const propsToSendDebtOligations = {
  mainRoute: "debtobligations",
  itemName: "Obligations",
  timeFrame: "monthly"
}

class Debts extends Component {
  render () {
    return (
      <div>
        <DollarList {...propsToSendDebts}/>
        <h2>Obligations</h2>
        <DollarList {...propsToSendDebtOligations}/>
      </div>
    )
  }
}

export default Debts;
