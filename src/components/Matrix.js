import ModelBasicExample from './modelBasicExample';

import React, { Component } from 'react'
import { Segment, Grid, Header, Image, Reveal } from 'semantic-ui-react'
import { Element } from 'react-scroll';


export default class Matrix extends Component {
    render() {
        return (
            <Segment style={{ padding: '0em' }} vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                        <Grid.Column>
                            <div>one</div>
                        </Grid.Column>
                        <Grid.Column>
                            <div>two</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>
                        <Grid.Column>
                            <div>one</div>
                        </Grid.Column>
                        <Grid.Column>
                            <div>two</div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}