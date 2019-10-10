import React, { Component } from 'react';
import Heart from '../../../src/heart.png';
import { connect } from 'react-redux'

class HideAndShow extends Component {
    Like_It = (id) => {
        this.props.EditLikeList(id);
    }
    Block_It = (id) => {
        if(this.props.like.includes(id)){
            this.props.EditLikeList(id);
        }
        this.props.EditBlockList(id);
    }
    render() {

        let liked_list = this.props.like;
        let blocked_list = this.props.block;
        //console.log(liked_list);
        //console.log(blocked_list);
        //the movie gonna show on the screen
        let { posts } = this.props;
        let { title_sort } = this.props;
        let { count_sort } = this.props;
        let { avg_sort } = this.props;
        let { date_sort } = this.props;

        //sort
        if (title_sort === 1) {
            posts.sort(function (a, b) { return a.title.charCodeAt(0) - b.title.charCodeAt(0) })
        }

        if (title_sort === -1) {
            posts.sort(function (a, b) { return b.title.charCodeAt(0) - a.title.charCodeAt(0) })
        }

        if (count_sort === 1) {
            posts.sort(function (a, b) { return Number(a.vote_count) - Number(b.vote_count) })
        }

        if (count_sort === -1) {
            posts.sort(function (a, b) { return Number(b.vote_count) - Number(a.vote_count) })
        }

        if (avg_sort === 1) {
            posts.sort(function (a, b) { return Number(a.vote_average) - Number(b.vote_average) })
        }

        if (avg_sort === -1) {
            posts.sort(function (a, b) { return Number(b.vote_average) - Number(a.vote_average) })
        }

        if (date_sort === 1) {
            posts.sort(function (a, b) { return Date.parse(a.release_date) - Date.parse(b.release_date) })
        }

        if (date_sort === -1) {
            posts.sort(function (a, b) { return Date.parse(b.release_date) - Date.parse(a.release_date) })
        }


        const show_list = posts.length ? (
            posts.map(post => {
                let like_btn;
                if (liked_list.includes(post.id)) {
                    like_btn = <button className='like_btn' onClick={() => this.Like_It(post.id)}>Liked</button>
                } else {
                    like_btn = <button className='like_btn' onClick={() => this.Like_It(post.id)}>Like</button>
                }

                if (blocked_list.includes(post.id)) {
                    return (
                        <div key={post.id} className='poster'></div>
                    )
                } else {

                    return (
                        <div key={post.id} className='poster'>
                            <img src={'https://image.tmdb.org/t/p/w500' + post.poster_path} alt='movie' />
                            <div>
                                {like_btn}
                                <button className='block_btn' onClick={() => this.Block_It(post.id)}>Block</button>
                            </div>
                            <div className='Name_wrapper'>
                                <img src={Heart} alt='Heart' />
                                {post.title}
                            </div>
                            <div>Release Date: {post.release_date}</div>
                            <div>Vote Count: {post.vote_count}|Average Score: {post.vote_average}/10</div>
                            <div>{post.overview}</div>
                            <br />
                        </div>
                    )
                }
            })
        ) : (
                <div>Loading...</div>
            )
        return (
            <div>{show_list}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HideAndShow);
