import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import trash from '../../src/trash3.png';
import forbidden from '../../src/forbidden.png';
import ellips from '../../src/elipse.png';


class LikedList extends Component {
    state = {
        like_posts: []
    }
    trashIt = (id) => {
        this.props.EditLikeList(id);
    }
    forbidIt = (id) => {
        this.props.EditLikeList(id);
        this.props.EditBlockList(id);
        console.log('forbid ' + id);
    }
    fetchData = (id) => {
        axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US')
            .then(res => {
                let post = {};
                post.id = id;
                post.img = res.data.poster_path;
                let like_posts = [...this.state.like_posts, post];
                this.setState({
                    like_posts: like_posts
                })
            })

    }
    componentDidMount() {
        let like_list = this.props.like;
        //console.log(like_list);
        for (let i = 0; i < like_list.length; i++) {
            this.fetchData(like_list[i]);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.like !== this.props.like) {
            this.setState({
                like_posts: []
            })
            let like_list = this.props.like;
            for (let i = 0; i < like_list.length; i++) {
                this.fetchData(like_list[i]);
            }
        }
    }

    render() {
        //console.log(this.state.like_posts);
        let like_posts = this.state.like_posts;
        console.log(like_posts);
        //console.log(this.props);

        let show_liked_list = like_posts.map(post => {
            return (
                <div key={post.id} className='movie_collection'>
                    <div className='like_footer'>
                        <img src={trash} alt='trash' onClick={() => this.trashIt(post.id)} />
                        <img src={forbidden} alt='forbidden' onClick={() => this.forbidIt(post.id)} />
                        <img src={ellips} alt='ellips' />
                    </div>
                    <img src={'https://image.tmdb.org/t/p/w500' + post.img} alt='poster' />

                </div>
            )
        })

        return (
            <div id='LikedList'>
                <h3>Movie List Of Liked</h3>
                {show_liked_list}
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

export default connect(mapStateToProps, mapDispatchToProps)(LikedList);
