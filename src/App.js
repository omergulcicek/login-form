import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { Home, Login } from "./pages"
import "./App.css"

function App() {
  const isLogin = false;

  return (
    <Router>
      <header>

      </header>

      <main>
        <section>
          <Switch>
            <Route path="/login" component={Login} />

            <Route path="/" render={() =>
              isLogin ? (
                <Home />
              ) : (
                <Redirect to={{ pathname: '/login' }} />
              )
            } />
          </Switch>
        </section>
      </main>

      <footer>
        
      </footer>
    </Router>
  )
}

export default App
