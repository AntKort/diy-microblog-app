import React, { Component } from 'react';
import axios from 'axios'; //Importing axios to be able to add posts to database


export default class CreatePosts extends Component {
    //react component constructor
    constructor(props) {
        super(props);

        //binding the methods to refer to this exact class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeContext = this.onChangeContext.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //creating the state of the component
        this.state = {
            username: '',
            password: '',
            context:'',
            usernames: [],
            users: []
        }
    }


    componentDidMount(){

        //Getting users from database for the slidedown menu
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0){
                this.setState({
                    usernames: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }
        })
        
        //getting user data to check user input correctness
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0){
                this.setState({
                    users: response.data
                })
            }
        })
    }
    
    //method for updating username state
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    //method for updating password state
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }
    //method for updating context state
    onChangeContext(e){
        this.setState({
            context: e.target.value
        });
    }


    //handling the submit button clicks
    onSubmit(e) {
        e.preventDefault(); 

        //constructor for users input
        const post = {
            username: this.state.username,
            context: this.state.context
        }

        //sending http post request to database
        this.state.users.forEach(element => {
            if (element.password ===  this.state.password && element.username === this.state.username){
                console.log(post);
                
                axios.post('http://localhost:5000/posts/add', post)
                .then(res => console.log(res.data));
                window.location = '/';
            } else {
                console.log("Adding the post has failed"); 
            }
        })
    }

    //page rendering/design shown here
    render() {
        return (
            <div>
                <h4>Select your Username from the slide down-menu and start posting!</h4>
                <div className="jumbotron">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>
                            Username:
                            </label>
                            <select ref="userInput"
                            required
                            readonly
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.usernames.map(function(user) {
                                        return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <hr class="my-4"></hr>
                        <div className="form-group">
                            <label>
                            Password: 
                            </label>
                            <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                        </div>
                        <hr class="my-4"></hr>
                        <div className="form-group">
                            <label>
                            Context:
                            </label>
                            <textarea type="text"
                            required
                            maxLength = '280'
                            className="form-control"
                            value={this.state.context}
                            onChange={this.onChangeContext}
                            placeholder = "Post by typing a text here. (Max 280 characters)"
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Submit Post" className="btn btn-dark" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
