import axios from "axios";

const unfaultRequest = async (func) => {
    const MAX_REQUEST_TRIES = 20;

    for (let i = 0; i < MAX_REQUEST_TRIES; i++) {
        try {
            const response = await func();
            return response
        }
        catch (error) {
            if (i === 19) {
                console.error(error);
                throw error;
            }
        }
    }
};

const getSearchId = async () => {
    const responseId = await axios.get('https://front-test.beta.aviasales.ru/search');
    return responseId.data.searchId;
};

const getTicketsChunkBySearchId = async (searchId) => {
    const response = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    return response.data
};


const getAllTicketsChunks = async (searchId) => {
    let allTicketsChunks = [];
    while(true) {
        let data = await unfaultRequest(() => getTicketsChunkBySearchId(searchId));
        if (data) {
            allTicketsChunks = [...allTicketsChunks, ...data.tickets]
        }
        if (data.stop) {
            return allTicketsChunks;
        }
    }
};

export const getTickets = async () => {
    const searchId = await unfaultRequest(getSearchId);
    const ticketsChunk = await getAllTicketsChunks(searchId);
    ///
    console.log(ticketsChunk);
    ///
    return ticketsChunk;
};