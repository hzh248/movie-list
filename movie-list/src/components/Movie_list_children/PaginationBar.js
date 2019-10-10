import React, { Component } from 'react'

class PaginationBar extends Component {
    GoToPrev = () => {
        //console.log(this.props.pageNumber);
        let new_page = this.props.pageNumber - 1;
        if (new_page >= 1) {
            this.props.ModifyPageNumber(new_page);
        }
    }
    GoToNext = () => {
        let new_page = this.props.pageNumber + 1;
        this.props.ModifyPageNumber(new_page);
    }
    render() {
        return (
            <div id='Pagination'>
                <button type='button' onClick={() => { this.GoToPrev() }}>&#8592;</button>
                <span>{this.props.pageNumber}/992</span>
                <button type='button' onClick={() => { this.GoToNext() }}>&#8594;</button>
            </div>
        )
    }

}

export default PaginationBar;