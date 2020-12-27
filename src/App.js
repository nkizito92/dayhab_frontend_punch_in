import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ClockContainer from './container/ClockContainer'
import ClientContainer from './container/ClientContainer'
import Navbar from './headers/Navbar'
import { fetchPunches } from './action/clockAction'
import { fetchClients } from './action/clientAction'
import { connect } from 'react-redux'
import './css/style.css'
import './App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchPunches()
    this.props.fetchClients()
  }
 render () {

   console.log(this.props.punches)
   return (

     <div className="App">
     <nav>
     <Navbar />
     </nav>
     <Switch>
        <Route exact path="/" component={() => <ClockContainer punches={this.props.punches}/>} />
        <Route exact path="/clients" component={() => <ClientContainer clients={this.props.clients} />} />
     </Switch>
     </div>
  ) 
  }
    
}

const mapStateToProps = state => {
  return {
      punches: state.clockinsReducer.punches,
      clients: state.clientsReducer.clients
  }
}

export default connect(mapStateToProps, { fetchPunches, fetchClients })(App)
