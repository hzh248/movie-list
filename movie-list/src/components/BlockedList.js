import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import trash from '../../src/trash3.png';
import love from '../../src/love.png';
import ellips from '../../src/elipse.png';

class BlockedList extends Component {
    state = {
        block_posts: []
    }
    trashIt = (id) => {
        this.props.EditBlockList(id);
    }
    loveIt = (id) =>{
        this.props.EditBlockList(id);
        this.props.EditLikeList(id);
    }
    fetchData = (id) => {
        axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US')
            .then(res => {
                let post = {};
                post.id = id;
                post.img = res.data.poster_path;
                let block_posts = [...this.state.block_posts, post];
                this.setState({
                    block_posts: block_posts
                })
            })
    }
    componentDidMount() {
        let block_list = this.props.block;
        //console.log(like_list);
        for (let i = 0; i < block_list.length; i++) {
            this.fetchData(block_list[i]);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.block !== this.props.block) {
            this.setState({
                block_posts: []
            })
            let block_list = this.props.block;
            for (let i = 0; i < block_list.length; i++) {
                this.fetchData(block_list[i]);
            }
        }
    }
    render() {
        //console.log(this.props);
        let block_posts = this.state.block_posts;
        //console.log(block_posts);
       

        let show_blocked_list = block_posts.map(post => {
            return (
                <div key={post.id} className='movie_collection'>
                    <div className='like_footer'>
                        <img src={trash} alt='trash' onClick={() => this.trashIt(post.id)}/>
                        <img src={love} alt='love' onClick={() => this.loveIt(post.id)}/>
                        <img src={ellips} alt='ellips' />
                    </div>
                    <img src={'https://image.tmdb.org/t/p/w500' + post.img} alt='poster' />

                </div>
            )
        })

        return (
            <div id='BlockedList'>
                <h3>Movie List Of Blocked</h3>
                {show_blocked_list}
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        like: state.like,
        block: state.block
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        EditLikeList: (id) => { dispatch({ type: 'Like_It', id: id }) },
        EditBlockList: (id) => { dispatch({ type: 'Block_It', id: id }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockedList);