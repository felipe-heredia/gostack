import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import Login from '../pages/Login'
import SingUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'

import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/singup" component={SingUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
)

export default Routes
