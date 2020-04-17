import React, { Component } from "react";
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

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talukname: "",
      talukid: ""
    };
  }

  componentDidMount() {
    var editid = this.props.match.params.id;
    firebase
      .database()
      .ref(`taluk/${editid}`)
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        this.setState({
          talukname: data.talukname,
          talukid: editid,
          isLoading: false
        });
      });
  }

  delete(deleteid) {
    firebase
      .database()
      .ref(`taluk/${deleteid}`)
      .remove()
      .then(() => {
        alert("Successfully deleted!");
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4>
              <Link to="/">Board List</Link>
            </h4>
            <h3 class="panel-title" />
          </div>
          <div class="panel-body">
            <dl>
              <dt>Taluk Name:</dt>
              <dd>{this.state.talukname}</dd>
            </dl>
            <Link to={`/edit/${this.state.talukid}`} class="btn btn-success">
              Edit
            </Link>
            &nbsp;
            <button
              onClick={this.delete.bind(this, this.state.talukid)}
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
