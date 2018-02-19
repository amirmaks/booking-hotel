import React from "react";
import {Route, Link} from "react-router-dom";

const Item = ({ label, to, activeOnlyWhenExact }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
            <Link to={to} className={match ? "list-group-item active" : "list-group-item"}>
                {label}
            </Link>
        )}
    />
);

export default Item;