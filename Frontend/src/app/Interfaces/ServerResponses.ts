import { Manager } from "./Manager"

interface ServerResponse {
    status: 'ok' | 'error'
    message?: string
}

interface ManagersResponse extends ServerResponse {
    managers?: Manager[]
}

interface ManagerResponse extends ServerResponse {
    manager?: Manager
}

export {
    ServerResponse,
    ManagersResponse,
    ManagerResponse
}