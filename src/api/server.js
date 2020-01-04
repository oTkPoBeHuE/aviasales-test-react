import axios from "axios";


const getSearchId = async () => {
    const responseId = await axios.get('https://front-test.beta.aviasales.ru/search');
    return responseId.data.searchId;
};

const getTicketsChunkBySearchId = async (searchId) => {
    const response = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    return response.data
};

export const getTickets = async () => {
  const searchId = await unfaultRequest(getSearchId);
  const ticketsChunk = await getAllTicketsChunks(searchId);
  ///
  console.log(ticketsChunk)
  ///
  return ticketsChunk;
};

const getAllTicketsChunks = async (searchId) => {
    let allTicketsChunks = [];
    while(true) {
        let data = await unfaultRequest(() => getTicketsChunkBySearchId(searchId));
        data ? allTicketsChunks = [...allTicketsChunks, ...data.tickets] : data = await unfaultRequest(() => getTicketsChunkBySearchId(searchId));
        if (data.stop) {
            return allTicketsChunks;
            console.log(data)
        }
    }
};

export const unfaultRequest = async (func) => {
    const MAX_REQUEST_TRIES = 20;

    for (let i = 0; i < MAX_REQUEST_TRIES; i++) {
        try {
            const response = await func();
            return response
        }
        catch (error) {
            return false;
            console.error(error);
            if (i = 19) {
                throw error;
                console.log(error)
            }
        }
    }
};