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
import AccountEdit from './components/adminComponents/AccountEdit'
import AccountShow from './components/adminComponents/AccountShow'
import Navbar from './headers/Navbar'
import { fetchPunches } from './action/clockAction'
import { fetchClients } from './action/clientAction'
import { fetchDrivers } from './action/driverAction'
import { fetchUsers } from './action/adminAction'
import { connect } from 'react-redux'
import './css/style.css'
import './App.css';

class App extends Component {

  state = {
    isLoggedIn: false,
    user: {},
    error: "",
    success: ""
  }

  componentDidMount() {
    this.props.fetchPunches()
    this.props.fetchClients()
    this.props.fetchDrivers()
    this.props.fetchUsers()
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
      .catch(error => {
        console.log('api errors:', error)
      })
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  statusMessage = (status) => {
    this.setState({
      error: status.error,
      success: status.success
    })
  }
  statusDisplayMessage = () => {
    let status = document.getElementById("message")
    let message = document.createElement('div')
    if (this.state.error !== "") {
      message.className = "error"
      message.innerHTML = this.state.error
      status.appendChild(message)
      setTimeout(() => {
        status.removeChild(message)
        this.setState({ error: "" })
      }, 2200)
    } else if (this.state.success !== "") {
      message.className = "updated"
      message.innerHTML = this.state.success
      status.appendChild(message)
      setTimeout(() => {
        status.removeChild(message)
        this.setState({ success: "" })
      }, 2200)
    }
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Navbar currentUser={this.state.user} isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={() => <Home isLoggedIn={this.state.isLoggedIn} />} />
            <Route exact path="/login" component={({ history }) => <Login handleLogin={this.handleLogin} statusMessage={this.statusMessage} history={history} isLoggedInNow={this.state.isLoggedIn} users={this.props.users} />} />
            <Route exact path="/logout" component={({ history }) => <Logout handleLogout={this.handleLogout} history={history} user={this.state.user} />} />
            <Route exact path="/signup" component={({ history }) => <Signup isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} history={history} />} />
            <Route exact path="/clockin" component={({ history }) => <ClockContainer statusMessage={this.statusMessage} current_user={this.state.user.id} isLoggedIn={this.state.isLoggedIn} punches={this.props.punches} clients={this.props.clients} history={history} />} />
            <Route exact path="/punches/:id/edit" component={({ history, match }) => <ClockEdit current_user={this.state.user.id} punches={this.props.punches} history={history} match={Number(parseInt(match.params.id))} isLoggedIn={this.state.isLoggedIn} />} />
            <Route exact path="/clients" component={() => <ClientContainer current_user={this.state.user.id} clients={this.props.clients} punches={this.props.punches} isLoggedIn={this.state.isLoggedIn} />} />
            <Route exact path="/clients/new" component={({ history }) => <ClientForm current_user={this.state.user.id} drivers={this.props.drivers} clients={this.props.clients} history={history} isLoggedIn={this.state.isLoggedIn} />} />
            <Route exact path="/clients/:id" component={({ match, history }) => <ClientShow current_user={this.state.user.id} isLoggedIn={this.state.isLoggedIn} clients={this.props.clients} punches={this.props.punches} history={history} match={Number(parseInt(match.params.id))} />} />
            <Route exact path="/clients/:id/edit" component={({ match, history }) => <ClientEdit current_user={this.state.user.id} isLoggedIn={this.state.isLoggedIn} clients={this.props.clients} punches={this.props.punches} history={history} match={Number(parseInt(match.params.id))} drivers={this.props.drivers} />} />
            <Route exact path="/drivers" component={() => <DriverContainer current_user={this.state.user.id} clients={this.props.clients} drivers={this.props.drivers} isLoggedInNow={this.state.isLoggedIn} />} />
            <Route exact path="/drivers/new" component={({ history }) => <DriverForm current_user={this.state.user.id} history={history} drivers={this.props.drivers} isLoggedIn={this.state.isLoggedIn} />} />
            <Route exact path="/drivers/:id" component={({ match, history }) => <DriverShow clients={this.props.clients} current_user={this.state.user.id} drivers={this.props.drivers} history={history} match={Number(parseInt(match.params.id))} isLoggedInNow={this.state.isLoggedIn} />} />
            <Route exact path="/drivers/:id/edit" component={({ match, history }) => <DriverEdit current_user={this.state.user.id} drivers={this.props.drivers} history={history} match={Number(parseInt(match.params.id))} isLoggedIn={this.state.isLoggedIn} />} />
            <Route exact path="/users/:id" component={({ match, history }) => <AccountShow isLoggedIn={this.state.isLoggedIn} history={history} match={match} users={this.props.users} />} />
            <Route exact path="/users/:id/edit" component={({ match, history }) => <AccountEdit isLoggedIn={this.state.isLoggedIn} match={match} users={this.props.users} statusMessage={this.statusMessage} history={history} />} />
          </Switch>
          <br />
          <div id="message">{this.statusDisplayMessage()}</div>
        </main>
        <footer>
          <small>Copyright 2021 - Time Clock By Kizito Njoku</small>
        </footer>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    punches: state.clockinsReducer.punches,
    clients: state.clientsReducer.clients,
    drivers: state.driversReducer.drivers,
    users: state.usersReducer.users
  }
}

export default connect(mapStateToProps, { fetchPunches, fetchClients, fetchDrivers, fetchUsers })(App)