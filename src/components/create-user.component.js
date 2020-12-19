import React, { Component } from 'react';

import axios from 'axios';


export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
        };

    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }



    onSubmit(e) {
        e.preventDefault();


        const user = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));


        window.location = '/'; 
        }
    


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