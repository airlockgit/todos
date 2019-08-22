import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Todos from '../../components/todos';
import styled from './home.module.scss';

class Home extends Component {

    render() {
        return (
            <Container maxWidth="sm">
                <Box className={styled.box}>
                    <Todos placeholder='Задача...' />
                </Box>
            </Container>
        );
    }
}

export default Home;