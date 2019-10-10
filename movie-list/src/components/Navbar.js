import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div className='menu'>
                <div className='app-menu'>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/MovieList'>Movies List</Link></li>
                        <li><Link to='/LikedList'>Movie List Of Liked</Link></li>
                        <li><Link to='/BlockedList'>Movie List Of Blocked</Link></li>
                    </ul>
                    <hr />
                </div>
            </div>
        )

    }
}

export default Navbar;