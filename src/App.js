import "./App.css";

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/home/Home";
import axios from "axios";
import Trailer from "./component/trailer/Trailer";
import Reviews from "./component/review/Review";


function App() {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState([]);
    const [reviews, setReviews] = useState([]);

    
    const getMovies = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/movies/all"
            );
            setMovies(response.data);
        } catch (er) {
            console.log(er);
        }
    };
    const getMovieData = async(movieId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/movies/${movieId}`
            );
            const singleMovie = response.data;

            setMovie(singleMovie);
            
            singleMovie.reviewIds.map((obj)=> {
                setReviews((prev) =>{
                    return( [...prev, obj])})})

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home movies={movies} />}></Route>
                    <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
                    <Route
                        path="/Reviews/:movieId"
                        element={
                            <Reviews
                                getMovieData={getMovieData}
                                movie={movie}
                                reviews={reviews}
                                setReviews={setReviews}
                            />
                        }
                    ></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
