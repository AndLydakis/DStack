import Generation from "./generation";
import Dragon from "./dragon";
import React, {Component} from "react";

class Home extends Component{
    render(){
        return(
            <div>
                <h2>DragonStack</h2>
                <Generation/>
                <Dragon/>
            </div>
        )
    }
}

export default Home;