import React, { Component, Fragment } from "react";
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator/error-indicator";
import Spinner from "../spinner/spinner";

import "./random-planet.css";

export default class RandomPlanet extends Component {
  state = {
    planet: {},
    loading: true,
    error: false,
  };
  SwapiService = new SwapiService();

  constructor() {
    super();
    this.updatePlanet();
  }
  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 25 + 2);
    this.SwapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null,
      hasData = !(loading || error),
      content = hasData ? <PlanetView planet={planet} /> : null,
      errorIndicator = error ? <ErrorIndicator /> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {errorIndicator}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, population, rotationPeriod, diameter, name } = planet;
  return (
    <Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt="planet"
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
