import React, {Component} from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import axios from "axios";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


class App extends Component{
    state = {
        movies : [],
        searchQuery : ''
    }

    componentDidMount () {
        this.getMovies();
    }

    async getMovies () {
        const response = await axios.get('http://localhost:3004/movies');
        this.setState({movies : response.data})
    }

    deleteMovie = async (movie) => {
        await axios.delete(`http://localhost:3004/movies/${movie.id}`);

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state => ({
            movies : newMovieList
        }));
    }

    searchMovie = (event) => {
        this.setState({
            searchQuery : event.target.value
        })
    }

    addMovie = async (movie) => {
        await axios.post('http://localhost:3004/movies/', movie);
        this.setState(state => ({
            movies : state.movies.concat([movie])
        }));
        this.getMovies();
    }

    editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:3004/movies/${id}`, updatedMovie);
        this.getMovies();
    }

    render() {
        let newSearchQuery = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort( (a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        });

        return (
            <Router>

                <div className='container'>

                    <Switch>
                        <Route path='/' exact render={() => (
                            <React.Fragment>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <SearchBar searchMovieProps={this.searchMovie}/>
                                    </div>
                                </div>

                                <MovieList
                                    movies={newSearchQuery}
                                    deleteMovie = {this.deleteMovie}
                                />
                            </React.Fragment>
                        )}>

                        </Route>

                        <Route path='/add' exact render={ ({history}) => (

                            <AddMovie
                                onAddMovie = {(movie) => {this.addMovie(movie)
                                    history.push('/')
                                }
                                }
                            />

                        )}>

                        </Route>

                        <Route path='/edit/:id' render={ (props) => (

                            <EditMovie
                                {...props}
                                onEditMovie = {(id, movie) => {
                                    this.editMovie(id, movie)
                                }
                                }
                            />

                        )}>

                        </Route>

                    </Switch>

                </div>

            </Router>
        );
    }
}

export default App;
