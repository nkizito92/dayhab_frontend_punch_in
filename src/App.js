import { Route, Switch } from 'react-router-dom'
import ClockIn from './components/ClockIn'
// import Navbar from './headers/Navbar'
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>

      </nav>
      <Switch>
        <Route exact path="/" component={() => <ClockIn/>} />
      </Switch>
    </div>
  );
}

export default App;
