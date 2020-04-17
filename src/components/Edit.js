import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talukname: "",
      talukid: "",
      data: []
    };
  }

  componentWillMount() {
    var editid = this.props.match.params.id;

    firebase
      .database()
      .ref(`taluk/${editid}`)
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        //  console.log(editid);
        this.setState({
          talukname: data.talukname,
          talukid: editid,
          isLoading: false
        });
      });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    // console.log(this.state.talukid);
    console.log(this.state);
    const { talukid, talukname } = this.state;

    firebase
      .database()
      .ref(`taluk/${talukid}`)
      .update({
        talukname: talukname
      })
      .then(() => {
        alert("Successfully updated!");
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error updating document: ", error);
      });
    // const updateRef = firebase
    //   .firestore()
    //   .collection("boards")
    //   .doc(this.state.key);
    // updateRef
    //   .set({
    //     title,
    //     description,
    //     author
    //   })
    //   .then(docRef => {
    //     this.setState({
    //       key: "",
    //       title: "",
    //       description: "",
    //       author: ""
    //     });
    //     this.props.history.push("/show/" + this.props.match.params.id);
    //   })
    //   .catch(error => {
    //     console.error("Error adding document: ", error);
    //   });
  };

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">EDIT BOARD</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to={`/show/${this.state.talukid}`} class="btn btn-primary">
                Board List
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Taluk:</label>
                <input
                  type="talukname"
                  class="form-control"
                  name="talukname"
                  value={this.state.talukname}
                  onChange={this.onChange}
                  placeholder="talukname"
                />
              </div>
              <button type="submit" class="btn btn-success">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
