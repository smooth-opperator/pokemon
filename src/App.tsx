import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import List from "./components/List";
import Detail from "./components/Detail";

function App() {
  return (
    <div className="App" data-testid="app">
      <Router>
        <Route exact path="/">
          <Redirect exact from="/" to="/list/1" />
        </Route>
        <Switch>
          <Route path="/list/:page" children={<List />} />
        </Switch>
        <Switch>
          <Route path="/item/:id" children={<Detail />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
