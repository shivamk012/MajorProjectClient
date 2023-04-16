import './Styles/HomePage.css';
import Flowchart from './Flowchart.png';

export default function HomePage() {
  return (
    <div className="article-list">
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-6 "><h2 className="text-center fs-1 text-capitalize">Optimal Route based on Air Quality system</h2>
                <p className="text-center fs-5 fw-bolder">People frequently choose the quickest routes to their destinations, which raises the level of pollution in that area. In addition, regardless of the amount of traffic and pollution in a specific location, Google Maps provides the fastest route to a destination.
Therefore, a better method of addressing pollution is to choose a route where the travel time and pollutant distribution are both minimum and even during the trip. </p>
                <div className="row articles">
                <div className="item"> <h2 className="name fs-2">Proposed Methodology</h2>
                    <p className="description fs-5 fw-bolder">Our Software pipelining starts with a simple structure of getting data from 
                    Hardware to the cloud . We will send this data to cloud using ESP32 wifi module to IFTTT cloud and that data will 
                    be gone through some mathematical measures and this all work will be running in back end of our web application. 
                    When user asks for a route , the application will show multiple routes and in order to give concentration level of 
                    pollution it will add a color code to each route.</p>
                </div>
            </div>
                </div>
                <div className="col-sm-6 col-md-6 item"><img className="img-fluid" alt="flowchart"src={Flowchart}/></div>
            </div>
            <div className='d-flex'>
            <div className='col'>
                <h2>Guided By:</h2>
                <ul>
                <li>Dr. Shekhar Sharma</li>
                <li>Prof. Shubham Shrivastav</li>
                </ul>
            </div>
            <div className='col'>
                <h2>Submitted By</h2>
                <ul><li>Shivam Koolwal</li>
                <li>Yaman Birla</li>
                <li>Hariom Markam</li>
                <li>Rohit Gurjar</li></ul>
            </div>
        </div>
        </div>
    </div>
  )
}
