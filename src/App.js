import React, { Component } from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import { onlineUrl } from './action/urlLink'
import ClockContainer from './container/ClockContainer'
import ClientContainer from './container/ClientContainer'
import DriverContainer from './container/DriverContainer'
import Home from './components/Home'
import Login from './components/adminComponents/Login'
import Logout from './components/adminComponents/Logout'
import Signup from './components/adminComponents/Signup'
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

  state = {
    isLoggedIn: false,
    user: {}
  }

  componentDidMount() {
    this.props.fetchPunches()
    this.props.fetchClients()
    this.props.fetchDrivers()
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get(`${onlineUrl()}/logged_in`)
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    return (
      // make some routes bounces back to clients view if not logged in 
      <div className="App">
        <nav>
          <Navbar userName={this.state.user} isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
        </nav>
        <Switch>
          <Route exact path="/" component={() => <Home isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path="/login" component={({ history }) => <Login handleLogin={this.handleLogin} history={history} isLoggedInNow={this.state.isLoggedIn} />} />
          <Route exact path="/logout" component={({ history }) => <Logout handleLogout={this.handleLogout} history={history} user={this.state.user} />} />
          <Route exact path="/signup" component={({ history }) => <Signup isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} history={history} />} />
          <Route exact path="/clockin" component={() => <ClockContainer punches={this.props.punches} clients={this.props.clients} />} />
          <Route exact path="/punches/:id/edit" component={({ history, match }) => <ClockEdit punches={this.props.punches} history={history} match={Number(parseInt(match.params.id))} isLoggedIn={this.state.isLoggedIn}/>} />
          <Route exact path="/clients" component={() => <ClientContainer clients={this.props.clients} punches={this.props.punches} isLoggedInNow={this.state.isLoggedIn} />} />
          <Route exact path="/clients/new" component={({ history }) => <ClientForm drivers={this.props.drivers} clients={this.props.clients} history={history} isLoggedIn={this.state.isLoggedIn}/>} />
          <Route exact path="/clients/:id" component={({ match, history }) => <ClientShow isLoggedIn={this.state.isLoggedIn} clients={this.props.clients} punches={this.props.punches} history={history} match={Number(parseInt(match.params.id))} />} />
          <Route exact path="/clients/:id/edit" component={({ match, history }) => <ClientEdit isLoggedIn={this.state.isLoggedIn} clients={this.props.clients} punches={this.props.punches} history={history} match={Number(parseInt(match.params.id))} drivers={this.props.drivers} />} />
          <Route exact path="/drivers" component={() => <DriverContainer drivers={this.props.drivers} isLoggedInNow={this.state.isLoggedIn} />} />     
          <Route exact path="/drivers/new" component={({ history }) => <DriverForm history={history} drivers={this.props.drivers} isLoggedIn={this.state.isLoggedIn}/>} />
          <Route exact path="/drivers/:id" component={({ match, history }) => <DriverShow drivers={this.props.drivers} history={history} match={Number(parseInt(match.params.id))}  isLoggedInNow={this.state.isLoggedIn}/>} />
          <Route exact path="/drivers/:id/edit" component={({ match, history }) => <DriverEdit drivers={this.props.drivers} history={history} match={Number(parseInt(match.params.id))} isLoggedIn={this.state.isLoggedIn}/>} />
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