import React from 'react';
import { hot } from 'react-hot-loader';
import styled from '@emotion/styled';

import styles from './main.css';

const Fancy = styled.h1({
    fontSize: '10em'
}, props => ({
    color: props.wild ? 'hotpink' : 'gold',
}));

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    add() {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        const isWild = this.state.count % 2 === 0;
        return (
            <div onClick={ this.add.bind(this) } className={ styles.counter }>
                <Fancy wild={ isWild }>
                    Count: { this.state.count }
                </Fancy>
            </div>
        )
    }
}

export default hot(module)(Counter);