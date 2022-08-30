import './App.css';
import { BrowserRouter,Route, Switch} from 'react-router-dom';

import  LandingPage from './Componentes/LandingPage.jsx'
import Home from './Componentes/Home.jsx';
import CreateRecipes from './Componentes/CreateRecipes.jsx'
import Details from './Componentes/Details.jsx';


function App() {
  return (
    <BrowserRouter>
    <div >
      <Switch>
       <Route exact path='/'component= {LandingPage} />
       <Route exact path='/home'component= {Home} />
       <Route  path='/recipes'component= {CreateRecipes} />
       <Route  path='/home/:id'component= {Details} />
      </Switch>
      
    </div>
    </BrowserRouter> 
  );
}



export default App;
