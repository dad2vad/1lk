import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import firebase from "./Firebase";

export const firebaseLooper = snapshot => {
  let data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talukas: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("taluk")
      .once("value")
      .then(snapshot => {
        const data = firebaseLooper(snapshot);
        this.setState({
          talukas: data
        });
      })
      .catch(e => {
        console.log("error returned - ", e);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">ASSIGN LIST</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/create">Add TALUKA</Link>
            </h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Taluka Name</th>
                  {/* <th>Description</th>
                  <th>Author</th> */}
                </tr>
              </thead>
              <tbody>
                {this.state.talukas.map(taluka => (
                  <tr key={taluka.id}>
                    <td>
                      <Link to={`/show/${taluka.id}`}>{taluka.talukname}</Link>
                    </td>
                    {/* <td>{board.description}</td>
                    <td>{board.author}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
