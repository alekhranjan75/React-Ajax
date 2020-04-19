import React, { Component, Suspense } from 'react';

import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import './Blog.css';
// import axios from 'axios';
import Posts from './Posts/Posts';
// import NewPost from '../Blog/NewPost/NewPost'

const NewPost = React.lazy(() => import('../Blog/NewPost/NewPost'))
class Blog extends Component {  
    state = {
        auth: true
    }
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
                    <Suspense fallback = {<div>Loading...</div>}>
                        {/* Routing to a page if "auth" is true */}
                        {this.state.auth ?<Route exact path = '/new-post'component = {NewPost}/>:null}
                    </Suspense>
                    {/* Routing to a page if "auth" is true
                    {this.state.auth ?<Route exact path = '/new-post'component = {NewPost}/>:null} */}
                    <Route path = "/posts"  component = {Posts}/>
                    {/* This will automatically render the below if no such route is specified with  */}
                    {/* <Route render = {() => <h1>Page Not Found!</h1>} /> */}
                    <Redirect from= '/' to='/posts'/>
                    {/* <Route path = "/:id" exact component = {FullPost}/> */}
                </Switch>
                
                {/* <Route path="/new-post" exact render = {()=> <h1>Home</h1>}/> */}
            </div>
        );
    }
}

export default Blog;