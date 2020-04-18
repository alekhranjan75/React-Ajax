import React, { Component } from 'react';

import {Route, Link} from 'react-router-dom'
import './Blog.css';
import axios from 'axios';
import Posts from './Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost'

class Blog extends Component {
    
    deletePostHandler = () => {
        axios.delete('/posts/'+ this.state.fullPostId)
        .then(res => {
            console.log(res)
        })
        this.setState({
            fullPostId: null
        })
    }
    render () {        
        return (
            <div className = "Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to = '/'>Home</Link></li>
                            <li><Link to = {{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li> 
                        </ul>
                    </nav>
                </header>
                {/* <Route path = '/' render = {()=> <h1>Home</h1>} />
                <Route path = '/' render = {()=> <h1>Home 2</h1>}/> */}
                <Route path = "/" exact component = {Posts}/>
                <Route exact path = '/new-post' >
                    <NewPost />
                </ Route>
                {/* <Route path="/new-post" exact render = {()=> <h1>Home</h1>}/> */}
            </div>
        );
    }
}

export default Blog;