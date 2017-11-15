import { AnnotatedTag, GitHubConfigState, Ref, SHA, StecService, Tag, Tree } from '../types';
import * as JSZip from 'jszip';

export class GitHubService implements StecService {

    private readonly baseUrl: string;

    constructor({gitHubUser, gitHubRepo}: GitHubConfigState) {
        this.baseUrl = `https://api.github.com/repos/${gitHubUser}/${gitHubRepo}`;
    }

    fetchTags(): Promise<Tag[]> {

        const url = `${this.baseUrl}/git/refs/tags`;

        return fetch(url)
            .then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response.statusText + ` (${url})`);
                    }
                },
                error => Promise.reject(error)
            );
    }

    fetchAnnotatedTag(sha: SHA): Promise<AnnotatedTag> {
        const url = `${this.baseUrl}/git/tags/${sha}`;

        return fetch(url)
            .then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response.statusText + ` (${url})`);
                    }
                },
                error => Promise.reject(error)
            );
    }

    fetchReadmeAsHtml(ref: Ref): Promise<string> {
        const url = `${this.baseUrl}/readme?ref=${ref}`;

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3.html');

        return fetch(url, {headers}).then(
            response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return Promise.reject(response.statusText + ` (${url})`);
                }
            },
            error => Promise.reject(error)
        );
    }

    fetchTree(sha: SHA): Promise<Tree> {
        const url = `${this.baseUrl}/git/trees/${sha}?recursive=1`;

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3.html');

        return fetch(url, {headers}).then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.statusText + ` (${url})`);
                }
            },
            error => Promise.reject(error)
        );
    }

    getDownloadZipUri(ref: Ref): string {
        return `${this.baseUrl}/zipball/${ref}`;
    }

    fetchAllStepsAsZip(refs: Ref[]): Promise<JSZip> {
        // TODO: Create master zip of all step zips
        const zip = new JSZip();
        return Promise.resolve(zip);
    }

}