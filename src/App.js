import React, { Component } from "react";
// import Intermediate from "./components/Intermediate";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("in constructor");
    // create three state variables.
    // apiData is an array to hold our JSON data
    // isFetched indicates if the API call has finished
    // errorMsg is either null (none) or there is some error
    //isBeginner/isIntermediate property begins set to false
    this.state = {
      apiData: [],
      apiDataBeginner: [],
      apiDataIntermediate: [],
      stretches: [],
      isFetched: false,
      errorMsg: null,
      isBeginner: false,
      isIntermediate: false
    };

    this.mapPart = this.mapPart.bind(this);
    this.clearStretch = this.clearStretch.bind(this);
  }
  //filter function to get object by its id//
  findObjectByID(idToFind) {
    return function (yogaObj) {
      return yogaObj.id === idToFind;
    };
  }
  //we then use that filter function inside a map function triggered//
  mapPart(yogaID) {
    let filteredStretch = this.state.apiDataIntermediate
      .filter(this.findObjectByID(yogaID))
      .map((y) => (
        <div className="card-group">
          <div className="card text-center">
            <div class="card">
              <div className="card-body">
                <img className="card-img-top" alt="yogapic" src={y.imgURL} />
                <h5 className="car-title">{y.position}</h5>
                <p className="card-text">{y.description}</p>
                <audio controls autoplay>
                  <source src={y.audio} />
                </audio>
              </div>
            </div>
          </div>
        </div>
      ));
    console.log(filteredStretch);

    this.setState({ stretches: this.state.stretches.concat(filteredStretch) });
  }

  clearStretch() {
    this.setState({ stretches: [] });
  }
  //****************API calls starts here********************//
  // componentDidMount() is invoked immediately after a
  // component is mounted (inserted into the tree)
  async componentDidMount() {
    try {
      const API_URL =
        "https://raw.githubusercontent.com/jphoulihan/yoga-app/main/yoga.json"; //Needs to be updated
      // Fetch or access the service at the API_URL address
      const response = await fetch(API_URL);
      // wait for the response. When it arrives, store the JSON version
      // of the response in this variable.
      const jsonResult = await response.json();

      // update the state variables correctly.
      //access different parts of the json array by initializing this.setState and creating key:value pairs.
      this.setState({ apiDataBeginner: jsonResult.beginner });
      this.setState({ apiDataIntermediate: jsonResult.intermediate });
      this.setState({ apiDataAdvanced: jsonResult.advanced });
      this.setState({ isFetched: true });
    } catch (error) {
      // In the case of an error ...
      this.setState({ isFetched: false });
      // This will be used to display error message.
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

  // PAY ATTENTION to the JSON returned. We need to be able to
  // access specific properties from the JSON returned.
  // Notice that this time we have three possible returns for our
  // render. This is conditional rendering based on some conditions
  render() {
    if (this.state.errorMsg) {
      return (
        <div className="error">
          <h1>An error has occured in the API call</h1>
        </div>
      ); // end of return.
    } else if (this.state.isFetched === false) {
      return (
        <div className="fetching">
          <h1>We are loading your API request</h1>
        </div>
      ); // end of return
    } else {
      // we have no errors and we have data
      //****************API calls end here********************//

      //****************App return starts here********************//
      return (
        <div className="App">
          <h1>QUICK STRETCH</h1>
          {/*start of drop down beginner button menu*/}
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Beginner
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {/*//wrap map function around this putting id in button//*/}
            {this.state.apiDataBeginner.map((b) => (
              <button
                key={b.id}
                onClick={() => this.mapPart(b.body_part)}
                className="dropdown-item"
                type="button"
              >
                {b.body_part}
              </button>
            ))}
            <button
              onClick={this.clearStretch}
              type="button"
              className="btn btn-outline-warning btn-block"
            >
              Clear
            </button>
          </div>
          {/** end of drop down beginner*/}
          {/*start of intermediate drop down*/}
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Intermediate
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {/*//wrap map function around this putting id in button//*/}
            {this.state.apiDataIntermediate.map((i) => (
              <button
                key={i.id}
                onClick={() => this.mapPart(i.id)}
                className="dropdown-item"
                type="button"
              >
                {i.body_part}
              </button>
            ))}
            <button
              onClick={this.clearStretch}
              type="button"
              className="btn btn-outline-warning btn-block"
            >
              Clear
            </button>
          </div>
          {/*end of advanced drop down*/}
          {/*below is a div container contents is each stretch*/}
          <div>{this.state.stretches}</div>

          {/* <div className="card-group">
        {this.state.apiData.map((person) => (
          <div className="card text-center">
            <div class="card">
              <div className="card-body">
                <img
                  className="card-img-top"
                  alt="yogapic"
                  src={person.imgURL}
                  key={person.id}
                />

                <h3 className="card-title">{person.body_part}</h3>
                <h5 className="car-title">{person.position}</h5>
                <p className="card-text">{person.description}</p>

                <audio controls autoplay>
                  <source src={person.audio} />
                </audio>
              </div>
            </div>
          </div>
        ))}
      </div> */}
        </div>
      ); // end of return
    } // end of the else statement.
  } // end of render()
} // end of App class

//***************************Beginner Mapping Content Component****************************//
// class StretchByPart extends Component {
//   render() {
//     const mapBeginner = this.props.mapObjectBeginner;
//     return <div className="card-group">{mapBeginner}</div>;
//   }
// }
export default App;
