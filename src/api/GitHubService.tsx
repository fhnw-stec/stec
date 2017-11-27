import { AnnotatedTag, GitHubConfigState, Ref, SHA, StecService, Tag, Tree } from '../types';
import * as JSZip from 'jszip';

export class GitHubService implements StecService {

    private readonly baseUrl: string;
    private readonly accessToken: string;

    constructor({gitHubUser, gitHubRepo, accessToken}: GitHubConfigState) {
        this.baseUrl = `https://api.github.com/repos/${gitHubUser}/${gitHubRepo}`;
        this.accessToken = accessToken;
    }

    fetchTags(): Promise<Tag[]> {

        const url = `${this.baseUrl}/git/refs/tags?${this.accessTokenParamIfPresent()}`;

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
        const url = `${this.baseUrl}/git/tags/${sha}?${this.accessTokenParamIfPresent()}`;

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
        const url = `${this.baseUrl}/readme?ref=${ref}&${this.accessTokenParamIfPresent()}`;

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
        const url = `${this.baseUrl}/git/trees/${sha}?recursive=1&${this.accessTokenParamIfPresent()}`;

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
        return `${this.baseUrl}/zipball/${ref}?${this.accessTokenParamIfPresent()}`;
    }

    fetchAllStepsAsZip(refs: Ref[]): Promise<JSZip> {
        // TODO: Create master zip of all step zips
        const zip = new JSZip();
        return Promise.resolve(zip);
    }

    private accessTokenParamIfPresent(): string {
        if (this.accessToken.trim()) {
            return 'access_token=' + this.accessToken;
        } else {
            return '';
        }
    }

}