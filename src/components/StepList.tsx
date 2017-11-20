import * as React from 'react';
import { GitHubConfigState, Step } from '../types';
import { Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface Props {
    readonly gitHubConfig: GitHubConfigState;
    readonly steps: Step[];
    readonly selectedStep: Step;
    readonly selectStep: (step: Step) => void;
    readonly downloadZipUri: (step: Step) => string;
    readonly fetchAllAsZip: (steps: Step[]) => Promise<JSZip>;
}

const StepList = (p: Props) => {

    const active = (step: Step) => step === p.selectedStep ? 'active' : '';

    const saveZip = () =>
        p.fetchAllAsZip(p.steps).then(zip => {
            zip.generateAsync({type: 'blob'}).then((blob: Blob) => {
                saveAs(blob, `${p.gitHubConfig.gitHubUser}-${p.gitHubConfig.gitHubRepo}.zip`);
            });
        });

    const downloadSingleStepButton = (step: Step) => step === p.selectedStep ? (
            <a href={p.downloadZipUri(step)}>
                <Glyphicon glyph="download" className="glyphicon-download-single" title="Download Step"/>
            </a>
        )
        : <div/>;

    const downloadAllStepsButton = (
        <a href="#" onClick={e => saveZip()} style={{visibility: 'hidden'}}>
            <Glyphicon glyph="download" className="glyphicon-download-all" title="Download All"/>
        </a>
    );

    return (
        <ListGroup>
            <ListGroupItem><b>Steps</b><span className="pull-right">{downloadAllStepsButton}</span></ListGroupItem>
            {
                p.steps.map(step =>
                    <ListGroupItem key={step.tag} className={active(step)} onClick={e => p.selectStep(step)}>
                        {step.title}
                        <span className="pull-right">
                        {downloadSingleStepButton(step)}
                        </span>
                    </ListGroupItem>
                )
            }
        </ListGroup>
    );
};

export default StepList;