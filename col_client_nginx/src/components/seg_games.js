import Spatial from './Spatial';
import Computation from './Computation';
import Random from './Random';

import React, { Component } from 'react'
import { Segment, Grid, Header, Image, Reveal } from 'semantic-ui-react'


export default class Games extends Component {
    render() {
        return (
            <Segment vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                        <Grid.Column>
                            <Computation />
                        </Grid.Column>
                        <Grid.Column>
                            <Spatial />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}








