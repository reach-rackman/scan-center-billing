import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import palette from './theme/palette';

import AppHeader from './modules/common/AppHeader';
import Home from './modules/home';
import AddPatientDetails from './modules/patient/addDetails';
import ViewAppointments from './modules/appointments/view';
import StoreRegistry from './modules/common/storeRegistry';
import { Provider } from 'mobx-react';
import CreateStores from './createStores';
import Payment from './modules/payment';

const styles = {
  appWrapper: {
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

function App({ classes }) {
  const theme = createMuiTheme({ palette });
  new CreateStores().init();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appWrapper}>
        <Router>
          <Provider {...StoreRegistry.getStores()}>
            <AppHeader />
            <Switch>
              <Route path="/addpatient">
                <AddPatientDetails />
              </Route>
              <Route path="/patients/:patientId/payment">
                <Payment />
              </Route>
              <Route path="/patients">
                <ViewAppointments />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Provider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default withStyles(styles)(App);
