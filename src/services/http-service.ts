import apiClient from "./api-client";

interface Entity {
    id: number;
}
class HttpService {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, {signal: controller.signal })
        return { request, cancel: () => controller.abort() }
    }
    delete(id: number) {
        return apiClient.delete(`${this.endpoint} / ${id}`)
    }
    update<T extends Entity>(entity: T) {
        return apiClient.patch(`${this.endpoint} / ${entity.id}`)
    }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;

//omg is it pushing?