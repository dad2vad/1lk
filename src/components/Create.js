import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

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

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("boards");
    this.state = {
      taluk: "",
      presentindicator: 0,
      successindicator: 0,
      fieldemptyindicator: 0
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("taluk")
      .once("value")
      .then(snapshot => {
        //console.log("hi");
        //console.log(snapshot.val())
        const data = firebaseLooper(snapshot);

        this.setState({
          data: data
        });
      })
      .catch(e => {
        console.log("error returned - ", e);
      });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    e.target.value = "";
  };

  onSubmit = e => {
    e.preventDefault();
    const { taluk } = this.state;
    var i;
    var presentindicator = 0;
    var successindicator = 0;
    var fieldemptyindicator = 0;

    if (taluk.length > 0) {
      for (i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].talukname === taluk) {
          presentindicator++;
          this.setState({ presentindicator: presentindicator });
          break;
        }
      }
    } else {
      fieldemptyindicator++;
      this.setState({ fieldemptyindicator: fieldemptyindicator });
    }

    if (presentindicator === 0) {
      var ref = firebase.database().ref("taluk");
      var obj = {
        talukname: taluk
      };
      ref.push(obj);
      this.setState({
        successindicator: successindicator
      });
    }

    this.setState({
      taluk: ""
    });
  };

  render() {
    const { taluk, description, author } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">ADD BOARD</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/" class="btn btn-primary">
                Taluka List
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <div>
                  {this.state.presentindicator ? (
                    <label for="failure">Already present</label>
                  ) : null}

                  {this.state.fieldemptyindicator ? (
                    <label for="failure">Field is empty</label>
                  ) : null}
                </div>
                <label for="title">add taluka:</label>
                <input
                  type="text"
                  class="form-control"
                  name="taluk"
                  value={taluk}
                  onChange={this.onChange}
                  placeholder="Enter taluka name"
                />
              </div>
              <button type="submit" class="btn btn-success">
                Submit
              </button>
              <div>
                {this.state.successindicator ? (
                  <label for="success">Added sucessfully</label>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
