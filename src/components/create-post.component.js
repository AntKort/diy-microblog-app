import React, { Component } from 'react';
import axios from 'axios';

// Options for date foramtting
const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' , hour: 'numeric', minute: 'numeric'};

// Functional React component for single posts which appear to the post forum
const Posti = props => (
    <div>
        <strong>{props.post.username} says:</strong>
        <p>{props.post.context}</p>
        <p>({(new Date(props.post.createdAt)).toLocaleDateString(undefined, DATE_OPTIONS)})</p>   
    </div>
)



// React class component
export default class CreatePost extends Component {
    // Constructor for react component
    constructor(props) {
        super(props);

        // Binding "this" for each method so "this" will refer to the class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeContext = this.onChangeContext.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        //Initial state
        this.state = {
            username: '',
            password: '',
            context: '',
            postList: [],
            userList: []
            //usernames: []
        }

    }

    // React lifecycle method which is called right before anything is displayed on the page
    // Send http get request tot he backend and gets all posts from the database and puts them to the postList
    // Send http get request tot he backend and gets all users from the database and puts them to the userList
    componentDidMount(){
        axios.get('http://localhost:5000/posts/')
            .then(response => {
                this.setState({ postList: response.data })
                this.postiList()
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({ 
                    userList: response.data,
                    // usernames: response.data.map(user => user.username)
                    // username: response.data [0].username 
                })
            })
            .catch((error) => {
                console.log(error);
            })

            
    }

    // Sets state when username is changed
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    
    // Sets state when password is changed
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    // Sets state when content is changed
    onChangeContext(e) {
        this.setState({
            context: e.target.value
        });
    }

    // Handles the submit event (when submit button is clicked)
    onSubmit(e) {
        e.preventDefault(); // prevents default html submit behaviour

        // users input
        const post = {
            username: this.state.username,
            content: this.state.content
        }

        // Sends http post request to the backend if username and password are correct
        this.state.userList.forEach(element => {
            if (element.password === this.state.password && element.username === this.state.username) {


                axios.post('http://localhost:5000/posts/add', post)
                .then(res => console.log(res.data));

                
                this.componentDidMount();
                
                
            }
        }); 

        // Maps the posts again when new post is submitted
        this.postiList() 

        // Content box is set to empty when post is submitted
        this.setState({
            context: ''
        })

    }
    // Maps certain elements from the array
    postiList() {
        return this.state.postList.map(currentPost => {
            return <Posti post={currentPost} key={currentPost._id} />;
        })
    }

    // What renders to the page is shown here
    render() {
        return (
                <div>
                <h4>Here you can create posts by inserting your Username and Password and then you can submit a post</h4>
                <div className="jumbotron">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <p> {this.postiList()}</p>
                        </div>


                        <div className="form-group">
                            <label>
                                <strong>Username:</strong> 
                            </label>
                            <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Password:</strong> 
                            </label>
                            <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Content:</strong> 
                            </label>
                            <textarea type="text"
                            rows="3"
                            maxLength='300'
                            required
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}
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

