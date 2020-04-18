import React, { Component } from 'react'
import Post from '../../../components/Post/Post'
import axios from 'axios'
import './Posts.css'
import { Link, Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
    _isMounted = false;
    state = {
        posts: [],
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
        this.props.history.push({pathname: '/' + id})
    }
    render() {
        let posts = this.state.posts.map(post => {
            return(
                // <Link to = {'/'+ post.id} key = {post.id} >
                    <Post 
                    key = {post.id}
                    title = {post.title}  
                    author = {post.author} 
                    clicked = {() => {this.clickHandler(post.id)}}/>
                // </Link>
            ) 
        });
        if (this.state.error) {
            posts = (<p style = {{textAlign: 'center'}}>something Went Wrong !!!</p>)
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path = "/:id" exact component = {FullPost}/>
            </div>
           
        )

    }
}

export default Posts;