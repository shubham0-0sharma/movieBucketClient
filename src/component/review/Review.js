import { useEffect, useRef } from "react";
import "./Review.css"
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import axios from "axios";
import { Link } from "react-router-dom";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const revText = useRef();
    let params = useParams();

    const movieId = params.movieId;


    useEffect(() => {
        getMovieData(movieId);
        return setReviews([])
    }, []);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/review",
                {
                    reviewBody: rev.value,
                    imdbId: movieId,
                }
            );
            const updatedReviews = [...reviews,{body:rev.value}];

            rev.value = "";
            
            setReviews(updatedReviews);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="review-container">
            <Row>
                <Col>
                    <Link to="/" style={{ textDecoration: "none", color:"white" }} >
                        <h3>Reviews</h3>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-2 container-second-row">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>

                <Col className="review-area">
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm
                                        handleSubmit={addReview}
                                        revText={revText}
                                        labelText="Write a Review?"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {reviews?.map((r) => {
                        return (
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        );
                    })}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
