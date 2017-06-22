import {GitHubRepo, GitHubUser, Ref, StecService, Tag} from '../types/index';

export class GitHubService implements StecService {

    private readonly baseUrl: string;

    constructor(gitHubUser: GitHubUser, gitHubRepo: GitHubRepo) {
        this.baseUrl = `https://api.github.com/repos/${gitHubUser}/${gitHubRepo}`;
    }

    fetchTags(): Promise<Tag[]> {

        const url = `${this.baseUrl}/tags`;

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

}