import React from "react";

function Li(props) {
    var lis = null;
    if (props.role === "user" || props.role === "admin") {
        lis = 
        <>
        <li className={props.show==="home"?"active":null}><a onClick={props.toShow.bind(null, "home")}>Home</a></li>
        <li className={props.show==="activities"?"active":null}><a onClick={props.toShow.bind(null, "activities")}>Activities</a></li>
        <li className={props.show==="adminActivity"?"active":null}><a onClick={props.toShow.bind(null, "adminActivity")}>Manage Activities</a></li>
        <li><a onClick={props.toLogout}>Logout</a></li>
        </>
    } else if (props.role === "guest") {
        lis =
        <>
        <li className={props.show==="home"?"active":null}><a onClick={props.toShow.bind(null, "home")}>Home</a></li>
        <li className={props.show==="activities"?"active":null}><a onClick={props.toShow.bind(null, "activities")}>Activities</a></li>
        <li className={props.show==="login"?"active":null}><a onClick={props.toShow.bind(null, "login")}>Login</a></li>
        <li className={props.show==="apply"?"active":null}><a onClick={props.toShow.bind(null, "apply")}>Apply</a></li>
        </>
    }
    return lis;
}

function Menu(props) {
    return (
    <nav>
        <ul>
            <Li role={props.role} show={props.show} toShow={props.toShow} toLogout={props.toLogout}/>
        </ul>
    </nav>
    );
}

export default Menu;