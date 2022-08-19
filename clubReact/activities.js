import React from "react";

function Event(props) {
    return (
        <tr>
            <td>{props.event.name}</td>
            <td>{props.event.dates}</td>
            <td>{props.event.description}</td>
        </tr>
    );
}

function Events(props) {
    let eventsArray = props.events;
    let eventsTable = eventsArray.map(function(ele, i) {
        return <Event key={"e" + i} event={ele}/>;
    });
    return eventsTable;
}

class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activities: []};
    }


    componentDidMount() {
        let that = this;
        fetch('/activities').then(res => res.json())
        .then(function(data) {
            that.setState({activities: data});
        });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <>
            <header><h1>Club Activities</h1></header>
            <main>
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Dates</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody id="activity">
                    <Events events={this.state.activities}/>
                </tbody>
                </table>
            </main>
            </>
        )
    }
}

export default Activities;