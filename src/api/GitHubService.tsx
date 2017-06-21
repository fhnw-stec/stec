import {StecService, Tag} from '../types/index';

export class GitHubService implements StecService {

    private readonly baseUrl: string;

    constructor(gitHubUser: string, gitHubRepo: string) {
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

}