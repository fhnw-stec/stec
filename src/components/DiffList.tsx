import * as React from 'react';
import 'diff2html';
import d2h = require('diff2html');

export interface Props {
    readonly diff: string;
}

const DiffList = ({diff}: Props) => {

    class Diff2HtmlOptionsImpl implements Diff2Html.Options {
        constructor(public inputFormat: string) {
        }
    }

    let strConfiguration = new Diff2HtmlOptionsImpl('diff');
    let diffInput = d2h.Diff2Html.getJsonFromDiff(diff, strConfiguration);

    let diffConfiguration = new Diff2HtmlOptionsImpl('json');
    let htmlString = d2h.Diff2Html.getPrettyHtml(diffInput, diffConfiguration);
    return <div dangerouslySetInnerHTML={{__html: htmlString}}/>;
};

export default DiffList;