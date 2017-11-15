import * as React from 'react';
import { Tree, TreeEntry } from '../types';
import { Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

export interface Props {
    readonly fileBaseUrl: String;
    readonly tree: Tree;
}

const FileList = ({fileBaseUrl, tree}: Props) => {
    const glyph = <Glyphicon glyph="file"/>;
    const filesOnly = (entry: TreeEntry) => entry.type === 'blob';
    return (
        <ListGroup className="hoverable-file-list">
            <ListGroupItem key="files"><b>Files</b></ListGroupItem>
            {
                tree.tree.filter(filesOnly).map(file => {
                        const url = fileBaseUrl + '/' + file.path;
                        return <ListGroupItem key={file.path}>
                                    {glyph}<a href={url} target="_blank"> {file.path} </a>
                               </ListGroupItem>;
                    }
                )
            }
        </ListGroup>
    );
};

export default FileList;