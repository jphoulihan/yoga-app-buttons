import React, { Component } from "react";

class Intermediate extends Component {
  //filter function to get object by its id//
  findObjectByID(idToFind) {
    return function (yogaObj) {
      return yogaObj.id === idToFind;
    };
  }
  //we then use that filter function inside a map function triggered//
  mapPart(yogaID) {
    let filteredStretch = this.state.apiDataIntermediate.filter(
      this.findObjectByID(yogaID)
    );
    console.log(filteredStretch);

    this.setState({ stretches: this.state.stretches.concat(filteredStretch) });
  }

  render() {
    const mapStretch = this.props.stretches;
    return (
      <div className="card-group">
        {mapStretch.map((i) => (
          <div className="card text-center">
            <div className="card">
              <div className="card-body">
                <img
                  className="card-img-top"
                  alt="yogapic"
                  src={i.imgURL}
                  key={i.id}
                />

                <h3 className="card-title">{i.body_part}</h3>
                <h5 className="car-title">{i.position}</h5>
                <p className="card-text">{i.description}</p>

                <audio controls autoplay>
                  <source src={i.audio} />
                </audio>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Intermediate;
