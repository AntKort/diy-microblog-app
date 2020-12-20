import React, { Component } from 'react';

import axios from 'axios'; //importing axios for adding users to database


export default class CreateUser extends Component {
    //react component constructor
    constructor(props) {
        super(props);

        //binding the methods to refer to this exact class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //setting the component state
        this.state = {
            username: '',
            password: '',
        };

    }

    //method for setting username state
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    //method for setting password state
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }


    //method for handling the submit button press
    onSubmit(e) {
        e.preventDefault();

        //input of the user
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(user);

        //sending http post request to add new user to database
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        //once the the user is added to database, user is thrown to the front page
        window.location = '/'; 
        }
    

    //renders the create new user component page
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <div className="jumbotron">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                required
                                minLength= '4'
                                maxLength= '20'
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                placeholder = "Type in a username of your decision (4-20 Characters)"
                            />
                        </div>
                        <hr class="my-4"></hr>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="text"
                                required
                                minLength= '6'
                                maxLength= '15'
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                placeholder = "Type in a password with a length of 6-15 characters"
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Create New User" className="btn btn-dark" />
                        </div>




                    </form>
                </div>
            </div>
        )
    }
}