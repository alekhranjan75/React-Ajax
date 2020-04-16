import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    _isMounted = false;
    state = {
        posts: [],
        fullPostId: null
    }

    componentDidMount () {
        this._isMounted = true;
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            })
            if (this._isMounted) {
                this.setState({
                    posts: updatedPosts
                })
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    clickHandler = (id) => {
        this.setState({
            fullPostId: id
        })
    }
    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+ this.state.fullPostId)
        .then(res => {
            console.log(res)
        })
        this.setState({
            fullPostId: null
        })
    }
    render () {
        const posts = this.state.posts.map(post => {
            return <Post 
                    title = {post.title}  
                    key = {post.id} 
                    author = {post.author} 
                    clicked = {() => {this.clickHandler(post.id)}}/>
        });
        
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost 
                    fullPost = {this.state.fullPostId}
                    delete = {this.deletePostHandler}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;