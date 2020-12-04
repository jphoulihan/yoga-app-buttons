import React, { Component } from "react";

class Intermediate extends Component {
  render() {
    const mapIntermediate = this.props.mapObjectIntermediate;
    return (
      <div className="card-group">
        {mapIntermediate.map((person, index) => (
          <div className="card text-center">
            <div class="card">
              <div className="card-body">
                <img
                  className="card-img-top"
                  alt="yogapic"
                  src={person.imgURL}
                  key={index}
                />

                <h3 className="card-title">{person.body_part}</h3>
                <h5 className="car-title">{person.Position}</h5>
                <p className="card-text">{person.Description}</p>

                <audio controls autoplay>
                  <source src={person.Audio} />
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
