import React, { Component } from 'react';
import axios from 'axios';
import HideAndShow from './Movie_list_children/HideAndShow';
import PaginationBar from './Movie_list_children/PaginationBar';
import SortBar from './Movie_list_children/SortBar';

class MovieList extends Component {
    state = {
        posts: [],
        pageNumber: 1,
        //sort: default:0, decreasing:-1, increasing:1
        title_sort: 0,
        count_sort: 0,
        avg_sort: 0,
        date_sort: 0,
        visited_page : [],
        store_page: []
    }
    fetchData = () => {
        if(this.state.visited_page.includes(this.state.pageNumber) ){
            
            let posts = this.state.store_page[this.state.pageNumber-1];
            this.setState({
                posts: posts
            })
        }else{
        
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US&page=' + this.state.pageNumber)
            .then(res => {
                //console.log(res);
                let posts = res.data.results;
                //add current page to visited_page set
                let new_visited_page = [...this.state.visited_page, this.state.pageNumber];
                let store_page = [...this.state.store_page, posts];
                this.setState({
                    posts: posts,
                    visited_page: new_visited_page,
                    store_page: store_page
                })
            })
        }
    }
    ModifyPageNumber = (new_page) => {
        this.setState({
            pageNumber: new_page
        })
    }
    componentDidMount = () => {
        this.fetchData()
    }
    componentDidUpdate = (prevProps,prevState) => {
        //console.log(prevState);
        //console.log(this.state);
        //prevProps.pageNumber !== this.props.pageNumber
        if (prevState.pageNumber !== this.state.pageNumber) {
            //console.log('change');
            this.fetchData();
        }
    }
    ModifySort = (id) => {
        if (id === 'sort1') {
            if (this.state.title_sort === 0 || this.state.title_sort === 1) {
                this.setState({
                    title_sort: -1,
                    count_sort: 0,
                    avg_sort: 0,
                    date_sort: 0
                })
            }
            if (this.state.title_sort === -1) {
                this.setState({
                    title_sort: 1,
                    count_sort: 0,
                    avg_sort: 0,
                    date_sort: 0
                })
            }
        }

        if (id === 'sort2') {
            if (this.state.count_sort === 0 || this.state.count_sort === 1) {
                this.setState({
                    title_sort: 0,
                    count_sort: -1,
                    avg_sort: 0,
                    date_sort: 0
                })
            }
            if (this.state.count_sort === -1) {
                this.setState({
                    title_sort: 0,
                    count_sort: 1,
                    avg_sort: 0,
                    date_sort: 0
                })
            }
        }

        if (id === 'sort3') {
            if (this.state.avg_sort === 0 || this.state.avg_sort === 1) {
                this.setState({
                    title_sort: 0,
                    count_sort: 0,
                    avg_sort: -1,
                    date_sort: 0
                })
            }
            if (this.state.avg_sort === -1) {
                this.setState({
                    title_sort: 0,
                    count_sort: 0,
                    avg_sort: 1,
                    date_sort: 0
                })
            }
        }

        if (id === 'sort4') {
            if (this.state.date_sort === 0 || this.state.date_sort === 1) {
                this.setState({
                    title_sort: 0,
                    count_sort: 0,
                    avg_sort: 0,
                    date_sort: -1
                })
            }
            if (this.state.date_sort === -1) {
                this.setState({
                    title_sort: 0,
                    count_sort: 0,
                    avg_sort: 0,
                    date_sort: 1
                })
            }
        }

    }
    render() {
        return (
            <div>
                <SortBar ModifySort={this.ModifySort} title_sort={this.state.title_sort} count_sort={this.state.count_sort} avg_sort={this.state.avg_sort} date_sort={this.state.date_sort} />
                <PaginationBar pageNumber={this.state.pageNumber} ModifyPageNumber={this.ModifyPageNumber} />
                <HideAndShow posts={this.state.posts} pageNumber={this.state.pageNumber} title_sort={this.state.title_sort} count_sort={this.state.count_sort} avg_sort={this.state.avg_sort} date_sort={this.state.date_sort} />
            </div>
        )

    }
}

export default MovieList;