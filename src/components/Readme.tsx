import * as React from 'react';

export interface Props {
    readonly readme: string;
}

const Readme = ({readme}: Props) => {
    return <div dangerouslySetInnerHTML={{__html: readme}}/>;
};

export default Readme;