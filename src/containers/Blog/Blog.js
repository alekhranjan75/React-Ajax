import React, { Component } from 'react';

import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import './Blog.css';
import axios from 'axios';
import Posts from './Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost'
import FullPost from './FullPost/FullPost';

class Blog extends Component {  
    render () {        
        return (
            <div className = "Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to = '/posts' exact>Home</NavLink></li>
                            <li><NavLink to = {{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li> 
                        </ul>
                    </nav>
                </header>
                {/* <Route path = '/' render = {()=> <h1>Home</h1>} />
                <Route path = '/' render = {()=> <h1>Home 2</h1>}/> */}
                
                <Switch>
                    <Route exact path = '/new-post' >
                        <NewPost />
                    </ Route>
                    <Route path = "/posts"  component = {Posts}/>
                    <Redirect from= '/' to='/posts'/>
                    {/* <Route path = "/:id" exact component = {FullPost}/> */}
                </Switch>
                
                {/* <Route path="/new-post" exact render = {()=> <h1>Home</h1>}/> */}
            </div>
        );
    }
}

export default Blog;