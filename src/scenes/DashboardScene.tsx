import React, { memo } from 'react';
import {
    Logo,
    Header,
    Paragraph,
    Button,
    Background
} from '../components';
import { Navigation } from '../types';

type Props = {
    navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => (
    <Background>
        <Logo />
        <Header>Let’s start</Header>
        <Paragraph>
            Your amazing app starts here. Open you favourite code editor and start
            editing this project.
    </Paragraph>
        <Button mode="outlined" onPress={() => navigation.navigate("HomeScene")}>
            Logout
    </Button>
    </Background>
);

export default memo(Dashboard);