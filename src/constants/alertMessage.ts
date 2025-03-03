import { AlertMessageServerActionKeys } from "../types/alertMessage";

const ALERTS_MESSAGE_COMMENTS = new Map<AlertMessageServerActionKeys, string>([
    ['add', 'Adding a new post will not add it into the server. It will simulate request and will return the new created data'],
    ['update', 'Updating a post will not update it into the server. It will simulate request and will return modified data'],
    ['delete', 'Deleting a post will not delete it into the server. It will simulate request'],
])


export { ALERTS_MESSAGE_COMMENTS }
