import React from "react";
import { render } from "react-dom";

class Apply extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", password: "", confPassword: "", level: "Never do it", comments: "", dialogClass: ""};
    }

    render() {
        let message = null;
        if (this.state.password.length < 6 || this.state.password !== this.state.confPassword) {
            message = <p>Password too short or not confirmed.</p>;
        } else { 
            message = <p>Welcome {this.state.name}, 
            your email is {this.state.email}, 
            your level is {this.state.level}, 
            and you had the following comments: {this.state.comments}</p>;
        }

        return (
            <main>
                <header><h1>Apply Now!</h1></header>
                <h2>Enjor skating</h2>
                <section className="application">
                    <label>Name: </label>
                    <input type="text" maxLength="30" minLength="1" required 
                    value={this.state.name} onInput={(event) => this.setState({name: event.target.value})}></input>
                    <label>Email: </label>
                    <input type="email" maxLength="100" minLength="6" required 
                    value={this.state.email} onInput={(event) => this.setState({email: event.target.value})}></input>
                    <label>Password: </label>
                    <input type="password" maxLength="30" minLength="6" required 
                    value={this.state.password} onInput={(event) => this.setState({password: event.target.value})}></input>
                    <label>Confirm Password: </label>
                    <input type="password" maxLength="30" minLength="6" required 
                    value={this.state.confPassword} onInput={(event) => this.setState({confPassword: event.target.value})}></input>
                    <label>Level: </label>
                    <select required value={this.state.level} onInput={(event) => this.setState({level: event.target.value})}>
                        <option value="Never do it">Never do it</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1 to 3 years">1 to 3 years</option>
                        <option value="Professional">Professional</option>
                    </select>
                    <label>Comments: </label>
                    <textarea rows="8" cols="20" value={this.state.comments} 
                    onInput={(event) => this.setState({comments: event.target.value})}></textarea>
                    <button onClick={() => this.setState({dialogClass: "show"})}>SignUp</button>
                </section>
                <section id="ThanksDialog" className={this.state.dialogClass}>
                    <div className="message">
                        <h2>Thanks for Signing Up!</h2>
                        {message}
                        <button onClick={(e) => this.setState({dialogClass: ""})}>Close</button>
                    </div>
                </section>
            </main>

        );
    }
}



export default Apply;