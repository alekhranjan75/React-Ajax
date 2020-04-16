import React, { Component } from 'react';
import axios from 'axios'
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    
    componentDidUpdate () {
        if (this.props.fullPost) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.fullPost)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.fullPost)
                .then(response => {
                    // console.log(response.data)
                    this.setState({
                        loadedPost: response.data
                    })
                })
            }
        }
    }


    render () {

        let post = <p style = {{'textAlign': 'center'}}>Please select a Post!</p>;
        if(this.props.fullPost) {
            post = <p style = {{'textAlign': 'center'}}> Loading... !!!</p>
        }
        if (this.state.loadedPost && this.props.fullPost) {
            post = (
            <div className="FullPost">
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick = {this.props.delete}>Delete</button>
                </div>
            </div>

            );
        }
        return post;
    }
}

export default FullPost;