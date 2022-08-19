import React from "react";
import eventData from "./eventData.json";

function Event(props) {
    return (
        <tr>
            <td><button onClick={props.deleteHandler}>Delete</button></td>
            <td>{props.event.name}</td>
            <td>{props.event.dates}</td>
            <td>{props.event.description}</td>
        </tr>
    );
}

function Events(props) {
    let eventsArray = props.events;
    let eventsTable = eventsArray.map(function(ele, i) {
        return <Event key={"e" + i} event={ele} deleteHandler={props.deleteHandler.bind(null, i)}/>;
    });
    return eventsTable;
}

class AdminActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: "", dates: "", description: "", events: eventData};
    }

    addHandler() {
        if (this.state.name.length === 0 || this.state.dates.length === 0) {
            console.log("name or dates can not be empty!!!");
        } else {
            let activity = {name: this.state.name, dates: this.state.dates, description: this.state.description};
            this.setState({events: this.state.events.concat(activity)});
        }   
    }

    deleteActivity(delIndex) {
        if (this.props.role === "admin") {
            let remainActivities = this.state.events.filter((ele, index) => index != delIndex);
            this.setState({events: remainActivities});
        } else {
            console.log("You need admin user to delete!!!");
        }
    }

    render() {
        
        return (
            <>
            <header><h1>Activity Management</h1></header>
            <main>
                <h3>Add Activities</h3>
                <section className="adminActivity">   
                    <label>Name</label>
                    <input type="text" maxLength="30" minLength="1" required
                    onChange={(event) => this.setState({name: event.target.value})}></input>
                    <label>Dates</label>
                    <input type="text" minLength="1" required
                    onChange={(event) => this.setState({dates: event.target.value})}></input>
                    <label>Description</label>
                    <textarea rows="4" cols="20" value={this.state.description} 
                    onChange={(event) => this.setState({description: event.target.value})}></textarea>
                    <button onClick={this.addHandler.bind(this)}>Add</button>
                </section>
                <h3>Activities</h3>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Name</td>
                            <td>Dates</td>
                            <td>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                        <Events events={this.state.events} deleteHandler={this.deleteActivity.bind(this)}></Events>
                    </tbody>
                </table>
            </main>
            </>
        );
    }
}

export default AdminActivity;