import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Events from "./components/Events/Events";
import FindAlumni from "./components/FindAlumni/FindAlumni";
import AlumniTalk from "./components/AlumniTalk/AlumniTalk";
import HomePage from "./components/Home/HomePage";
import SignIn from "./components/LoginPage/SignIn";
import SignUp from "./components/LoginPage/SignUp";
import Navbar from "./components/Navbar/Navbar";
import UserState from "./context/UserState";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import Intro from "./components/About/Intro";
import Footer from "./components/Home/Footer/Footer";
import ImageScroller from "./components/About/ImageScroller";
import Cards from "./components/About/Card";
import BottomBar from "./components/Navbar/BottomBar";
import OnClickProfile from "./components/FindAlumni/OnClickProfile";
import About from "./components/About/About";
// import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";

function App() {
  return (
    <>
      <UserState>
        <Router>
          <div>
            <Navbar />

            <Switch>
              <Route path="/signUp">
                {" "}
                <SignUp />
              </Route>
              <Route path="/signin">
                {" "}
                <SignIn />{" "}
              </Route>
              <Route path="/alumni_talk">
                <AlumniTalk />
              </Route>
              <Route path="/find_alumni">
                <FindAlumni />
                <Footer />
              </Route>
              <Route path="/events">
                <Events />
                <Footer />
              </Route>
              {/* <Route path="/adminLogin">
								<AdminLogin />
							</Route> */}
              <Route path="/about">
                <About />
                <Footer />
              </Route>
              <Route path="/about">
                <Intro />
                <ImageScroller />
                <Cards />
                <Footer />
              </Route>
              <Route path="/feed">
                <Feed />
                <Footer />
              </Route>
              <Route path="/profilePage">
                <Profile />
                <Footer />
              </Route>
              <Route path="/OnClickProfile">
                <OnClickProfile />
              </Route>
              <Route path="/forgetPassword">
                <ForgetPassword />
              </Route>
              <Route path="/">
                <HomePage />
                <Footer />
              </Route>
            </Switch>
            <BottomBar />
          </div>
        </Router>
      </UserState>
    </>
  );
}

export default App;
