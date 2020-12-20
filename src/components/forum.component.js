import React, { Component } from 'react';
import axios from 'axios'; //Importing axios to get user posts from database

//react element for returning a table row with the necessary data
const PostRow = props => (
    <tr>
        <td>{props.post.username}</td>
        <td>{props.post.context}</td>
        <td>{`${props.post.createdAt.substring(0, 10)} ${props.post.createdAt.substring(11, 16)}` }</td>
    </tr>
)
// creating react class component
export default class Forum extends Component {
    //creating constructor for the component
    constructor(props){
        super(props);
        
        //creating an array for the posts
        this.state = {PostArray: []};
    }

    // getting the post data from database and setting it to the array
    componentDidMount(){
        axios.get('http://localhost:5000/posts/')
        .then(response => {
            this.setState({ PostArray: response.data })
        })

        .catch((error) => {
            console.log(error);
        })
    }

    //returning the table rows
    postingList(){
        return this.state.PostArray.map(recentpost => {
            return <PostRow post={recentpost}/>;
        })
    }

    //creating the frontpage render which renders a table that calls postingList() method
    render() {
        return (
            <div>
                <h3>
                MicroBlog DIY Post History
                <br></br>
                <small class = "text-muted">Start posting by creating an user</small>
                </h3>
                <table className="table table-hover table-warning"> 
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Context</th>
                            <th>Post-Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.postingList() }
                    </tbody>
                </table>
            </div>
        )
    }
}