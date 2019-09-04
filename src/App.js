import React from "react";
import "./App.css";
import wretch from "wretch";
import Radium from "radium";

import DefaultBackground from "./images/orgrimmar-gates.jpg";

const client_id = "bfc0a7db3dc5495e87053abf09a42fe6";

const styles = {
  characterData: {
    height: "100vh",
    background: `url(${DefaultBackground})`,
    position: "relative"
  },
  characterDataContainer: {
    width: "75%",
    height: "75%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(rgb(140,22,22), rgba(140,22,22,0.05))",
    textAlign: "center"
  },
  characterID: {
    textTransform: "uppercase",
    fontFamily: "Impact",
    fontSize: "64px",
    letterSpacing: "18px",
    marginTop: "50px"
  },
  characterName: {

  },
  characterRealm: {

  },
  characterStats: {
    fontFamily: "Trebuchet MS",
    fontSize: "20px",
    letterSpacing: "2px"
  },
  achievementPoints: {

  },
  honorableKills: {

  }
};

class App extends React.Component {
  state = {
    access_token: "",
    characterName: "Kaahzra",
    region: "us",
    res: {
      name: "",
      realm: "",
      achievementPoints: 0,
      totalHonorableKills: 0
    },
    client_secret: "ZPjIZd5il6CIKTMJwlrFf2c0k2N7hYMs"
  };

  componentDidMount() {
    // oauth
    wretch(
      "https://us.battle.net/oauth/token"
    )
    .query({client_secret: this.state.client_secret, client_id, grant_type: "client_credentials"})
      .options({ headers: { Accept: "application/json" } })
      .get()
      .json(res => this.setState({ access_token: res.access_token }))
      .then(() => {
        wretch(`https://us.api.blizzard.com/wow/character/illidan/${this.state.characterName}`)
        .query({region: "us", access_token: this.state.access_token})
          .get()
          .json(res => this.setState({res}))
      });
  }

  render() {
    return (
      <div style={[styles.characterData]}>
        <div style={[styles.characterDataContainer]}>
          <div style={[styles.characterID]}>
            <span style={[styles.characterName]}>
              {this.state.res.name}
            </span>
            -
            <span style={[styles.characterRealm]}>
              {this.state.res.realm}
            </span>
          </div>
          <div style={[styles.characterStats]}>
            {`Achievement Points: `}
            <span style={[styles.achievementPoints]}>
              {this.state.res.achievementPoints}
            </span>
            {` - `}
            {`Honorable Kills: `}
            <span style={[styles.honorableKills]}>
              {this.state.res.totalHonorableKills}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(App);