import React, { Component } from 'react';
import axios from 'axios'; //Importing axios to get user posts from database


const Post = props => (
    <tr>
        <td>{props.post.username}</td>
        <td>{props.post.context}</td>
        <td>{`${props.post.createdAt.substring(0, 10)} ${props.post.createdAt.substring(11, 16)}` }</td>
    </tr>
)

export default class Forum extends Component {
    constructor(props){
        super(props);
        
        this.state = {posts: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/posts/')
        .then(response => {
            this.setState({ posts: response.data })
        })

        .catch((error) => {
            console.log(error);
        })
    }


    postList(){
        return this.state.posts.map(currentpost => {
            return <Post post={currentpost}/>;
        })
    }

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
                        { this.postList() }
                    </tbody>
                </table>
            </div>
        )
    }
}