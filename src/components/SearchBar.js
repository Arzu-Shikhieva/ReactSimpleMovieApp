import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchBar extends Component {


    handleForSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleForSubmit}>
                    <div className='form-row mt-3 mb-5'>
                        <div className='col-10'>
                            <input
                                onChange={this.props.searchMovieProps}
                                type="text" className='form-control'
                                placeholder='Search a movie'
                            />
                        </div>
                        <div className='col-2'>
                            <Link
                                to='/add'
                                type='button'
                                className='btn btn-md btn-danger'
                                style={{float: 'right'}}>Add Movie
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;
