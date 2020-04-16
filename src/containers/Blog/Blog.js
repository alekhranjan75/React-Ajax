import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    _isMounted = false;
    state = {
        posts: []
    }

    componentDidMount () {
        this._isMounted = true;
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            
            if (this._isMounted) {
                this.setState({
                    posts: response.data
                })
            }
            console.log(response)
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render () {
        const posts = this.state.posts.map(post => {
            return <Post title = {post.title}  key = {post.id}/>
        });
        
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;