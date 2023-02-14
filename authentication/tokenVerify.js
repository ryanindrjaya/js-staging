import React from "react";
import { withRouter } from "next/router";

const parseJwt = (token) => { console.log("token")
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const tokenVerify = (props) => { console.log("verify")
    props.history.listen(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            const decodedJwt = parseJwt(user.accessToken);

            if (decodedJwt.exp * 1 < Date.now()) {
                props.logOut();
            }
        }
    });

    return <div></div>;
};

export default withRouter(tokenVerify);