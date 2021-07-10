import "./App.css";
import { HomePage } from "./containers/HomePage";
import { Switch, Route, Redirect } from "react-router-dom";
import { CustomerAccessPage } from "./containers/customerAccessPage";
import { CamPage } from "./containers/CamPage";
import { MeetingList } from "./containers/MeetingList";
import Logout from './components/accountBox/logout';
import newMeeting from "./containers/MeetingList/newMeeting";
import LogIn from "./components/accountBox/loginForm";
import Signup from "./components/accountBox/signupForm";
import { Meeting } from "../src/containers/MeetingPage/Meeting";
import { ParticipantPage } from "../src/containers/MeetingPage/ParticipantPage";

import { useSelector } from "react-redux";
import UpdateMeeting from "./containers/MeetingList/updateMeeting"

function App() {
  const token = useSelector((state) => state.authReducer.token);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/meeting/:id" render={id => <Meeting {...id} />} />

        {token === null ? <Route path="/customer/access/:action" exact component={CustomerAccessPage} />: null}
        <Route path="/cam" exact component={CamPage} />

        {token !== null ? (
          <Route path="/meetinglist" exact component={MeetingList} />
        ) : null}

        {token !== null ? (
          <Route path="/newMeeting" exact component={newMeeting} />
        ) : null}

        {token !== null ? (
          <Route path="/updatemeeting/:id" render={id => <UpdateMeeting {...id} exact component={UpdateMeeting} />} />
        ) : null}
          <Route path="/addParticipant/:id" exact component={MeetingList} />
          <Route path="/deleteparticipant/:id" exact component={MeetingList} />

        {/* {token === null ? (
          <Route path="/customer/access/signin" exact component={LogIn} />
        ) : null}

        {token === null ? (
          <Route path="/customer/access/signup" exact component={Signup} />
        ) : null} */}

        {token !== null ? (<Route path="/logout" exact component={Logout} />) : null}

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
