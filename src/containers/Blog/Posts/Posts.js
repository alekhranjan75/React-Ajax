import React, { Component } from 'react'
import Post from '../../../components/Post/Post'
import axios from 'axios'
import './Posts.css'

class Posts extends Component {
    _isMounted = false;
    state = {
        posts: [],
        fullPostId: null,
        error: false
    }

    componentDidMount() {
        console.log(this.props)
        this._isMounted = true;
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
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
            .catch(error => {
                console.log(error)
                if (this._isMounted) {
                    this.setState({
                        error: true
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
    render() {
        let posts = this.state.posts.map(post => {
            return <Post 
                    title = {post.title}  
                    key = {post.id} 
                    author = {post.author} 
                    clicked = {() => {this.clickHandler(post.id)}}/>
        });
        if (this.state.error) {
            posts = (<p style = {{textAlign: 'center'}}>something Went Wrong !!!</p>)
        }
        return (
            <section className="Posts">
                    {posts}
            </section>
        )

    }
}

export default Posts;