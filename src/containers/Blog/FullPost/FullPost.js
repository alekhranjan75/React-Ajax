import React, { Component } from 'react';
import axios from 'axios'
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(res => {
                console.log(res)
            })
    }
    componentDidMount () {
        // console.log(this.props)
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                .then(response => {
                    // console.log(response.data)
                    this.setState({
                        loadedPost: response.data
                    })
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.loadedPost.id != this.props.match.params.id) {
            console.log("Repeating")
            axios.get('/posts/' + this.props.match.params.id)
                .then(response => {
                    // console.log(response.data)
                    this.setState({
                        loadedPost: response.data
                })
            })
        }

    }


    render () {
        // console.log(this.props.match.params.id)
        let post = <p style = {{'textAlign': 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style = {{'textAlign': 'center'}}> Loading... !!!</p>
        }
        if (this.state.loadedPost && this.props.match.params.id) {
            post = (
            <div className="FullPost">
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick = {this.deletePostHandler}>Delete</button>
                </div>
            </div>

            );
        }
        return post;
    }
}

export default FullPost;