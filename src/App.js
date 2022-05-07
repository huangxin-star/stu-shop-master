import './App.css';
import 'antd/dist/antd.css'
import {Switch,Route,Redirect} from 'react-router-dom'
import {adminRoutes,mainRoutes} from './routes'
import Frame from './components/Frame/Index'
function App() {
  return (
    <Frame>
      <Switch>
       {
         adminRoutes.map(route=>{
           return <Route key={route.path} path={route.path} exact={route.exact} render={routeProps=>{
             return <route.component {...routeProps}></route.component>
           }} ></Route>
         })
       }
       <Redirect to={adminRoutes[0].path } from='/admin'></Redirect>
       <Redirect to={mainRoutes[0].path} exact from='/'></Redirect>
     </Switch>
    </Frame>
  );
}

export default App;
