import React, { Component } from 'react'

class SortBar extends Component {
    Sort = (e) => {
        this.props.ModifySort(e.target.id);
    }
    render() {
        let title_sort;
        let count_sort;
        let avg_sort;
        let date_sort;
        //console.log(this.props.title_sort);
        if (this.props.title_sort === -1) {
            //now: decreasing
            title_sort = <button className='button' id='sort1' onClick={(e) => this.Sort(e)}>{'Title'}&nbsp;&#8593;</button>
        } else {
            //now increasing
            title_sort = <button className='button' id='sort1' onClick={(e) => this.Sort(e)}>{'Title'}&nbsp;&#8595;</button>
        }

        if (this.props.count_sort === -1) {
            count_sort = <button className='button' id='sort2' onClick={(e) => this.Sort(e)}>{'View Count'}&nbsp;&#8593;</button>
        } else {
            count_sort = <button className='button' id='sort2' onClick={(e) => this.Sort(e)}>{'View Count'}&nbsp;&#8595;</button>
        }

        if (this.props.avg_sort === -1) {
            avg_sort = <button className='button' id='sort3' onClick={(e) => this.Sort(e)}>{'Vote Average'}&nbsp;&#8593;</button>
        } else {
            avg_sort = <button className='button' id='sort3' onClick={(e) => this.Sort(e)}>{'Vote Average'}&nbsp;&#8595;</button>
        }

        if (this.props.date_sort === -1) {
            date_sort = <button className='button' id='sort4' onClick={(e) => this.Sort(e)}>{'Release Date'}&nbsp;&#8593;</button>
        } else {
            date_sort = <button className='button' id='sort4' onClick={(e) => this.Sort(e)}>{'Release Date'}&nbsp;&#8595;</button>
        }

        return (
            <div id='SortBar'>
                {title_sort}
                {count_sort}
                {avg_sort}
                {date_sort}
            </div>
        )
    }
}

export default SortBar;