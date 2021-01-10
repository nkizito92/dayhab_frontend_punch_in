import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ClockContainer from './container/ClockContainer'
import ClientContainer from './container/ClientContainer'
import DriverContainer from './container/DriverContainer'
import DriverForm from './components/driversComponents/DriverForm'
import DriverEdit from './components/driversComponents/DriverEdit'
import DriverShow from './components/driversComponents/DriverShow'
import ClientShow from './components/clientsComponents/ClientShow'
import ClientEdit from './components/clientsComponents/ClientEdit'
import ClientForm from './components/clientsComponents/ClientForm'
import ClockEdit from './components/clockComponents/ClockEdit'
import Navbar from './headers/Navbar'
import { fetchPunches } from './action/clockAction'
import { fetchClients } from './action/clientAction'
import { fetchDrivers } from './action/driverAction'
import { connect } from 'react-redux'
import './css/style.css'
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.fetchPunches()
    this.props.fetchClients()
    this.props.fetchDrivers()
  }

  render() {
    return (

      <div className="App">
        <nav>
          <Navbar />
        </nav>
        <Switch>
          <Route exact path="/" component={() => <ClockContainer punches={this.props.punches} clients={this.props.clients}/>} />
          <Route exact path="/punches/:id/edit" component={({history, match}) => <ClockEdit punches={this.props.punches} history={history} match={Number(parseInt(match.params.id))}/>} />
          <Route exact path="/clients" component={() => <ClientContainer clients={this.props.clients} punches={this.props.punches} />} />
          <Route exact path="/clients/new" component={({history}) => <ClientForm drivers={this.props.drivers} clients={this.props.clients} history={history} />} />
          <Route exact path="/clients/:id" component={({ match, history }) => <ClientShow clients={this.props.clients} punches={this.props.punches} history={history} match={Number(parseInt(match.params.id))} />} />
          <Route exact path="/clients/:id/edit" component={({ match, history }) => <ClientEdit clients={this.props.clients} punches={this.props.punches} history={history} match={Number(parseInt(match.params.id))} drivers={this.props.drivers} />} />
          <Route exact path="/drivers" component={() => <DriverContainer drivers={this.props.drivers} />} />
          <Route exact path="/drivers/new" component={({history}) => <DriverForm history={history} drivers={this.props.drivers} />} />
          <Route exact path="/drivers/:id" component={({ match, history }) => <DriverShow drivers={this.props.drivers} history={history} match={Number(parseInt(match.params.id))} />} />
          <Route exact path="/drivers/:id/edit" component={({ match, history }) => <DriverEdit drivers={this.props.drivers} history={history} match={Number(parseInt(match.params.id))} />} />
        </Switch>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    punches: state.clockinsReducer.punches,
    clients: state.clientsReducer.clients,
    drivers: state.driversReducer.drivers
  }
}

export default connect(mapStateToProps, { fetchPunches, fetchClients, fetchDrivers })(App)
