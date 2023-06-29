import {Link} from "react-router-dom"
import "./Home.css"

export default function Home(){
    return(
        <div className="Home">
            <div className="jumbo">
                <h3 className="subheading">HeathApp HUB</h3>

                <h1 className="heading">HeathTracker</h1>
            </div>


            <div className="actions">
                <div className="links">
                    <Link to="/register">
                        <button className="btn primary">Register</button>
                    </Link>
                    <Link to="/portal">
                        <button className="btn outline">login button</button>
                    </Link>
                </div>


            </div>
        </div>
    )
}
