// index.js file
import React from "react";
import ReactDOM from "react-dom";
import "./club.css";
import Home from "./home";
import Menu from "./menu";
import Login from "./login"
import Activities from "./activities";
import events from "./eventData.json";
import Apply from "./apply";
import AdminActivity from "./AdminActivity";

class App extends React.Component {

    constructor(props) {
        super(props);
        // Application state variables:
        // *role* is for RBAC == "role based access control"
        // we have "guest", "user", and "admin"
        //
        this.state = { role: "admin", show: "home" };
    }

    showHandler(toShow) {
        this.setState({show : toShow});
    }

    logoutHandler() {
        this.setState({role : "guest"});
        this.setState({show : "home"});
    }

    render() {
        let content = null;
        let menu = null;
        switch(this.state.show) {
            case "home":
                content = <Home />;
                break;
            case "login":
                content = <Login />;
                break;
            case "apply":
                content = <Apply />;
                break;
            case "activities":
                content = <Activities events={events} />;
                break;
            case "adminActivity":
                content = <AdminActivity role={this.state.role}/>;
                break;
            default:
                content = <Home />;
        }

        switch(this.state.role) {
            case "guest":
                menu = <Menu role="guest" show={this.state.show} toShow={this.showHandler.bind(this)} />;
                break;
            case "user":
                menu = <Menu role="user" show={this.state.show} toShow={this.showHandler.bind(this)} toLogout={this.logoutHandler.bind(this)}/>;
                break;
            case "admin":
                menu = <Menu role="admin" show={this.state.show} toShow={this.showHandler.bind(this)} toLogout={this.logoutHandler.bind(this)}/>;
                break;
            default:
                menu = <Menu role="guest" show={this.state.show} toShow={this.showHandler.bind(this)} />;
        }

        return (
            <>
                {menu}
                {content}
            </>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));