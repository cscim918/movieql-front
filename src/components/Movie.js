import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import client from './../apollo';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px
  overflow: hidden;
  border-radius: 7px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 90%;
  width: 100%
  background-size: cover;
  background-position:center center;
`;

export default ({ id, bg, isLiked }) => {
  const [toggleMovie] = useMutation(LIKE_MOVIE, { variables: {id: parseInt(id), isLiked}});
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={toggleMovie}>{isLiked ? 'Unlike' : 'Like'}</button>
    </Container>
  );
};
