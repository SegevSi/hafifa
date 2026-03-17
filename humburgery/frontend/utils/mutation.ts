import { InternalServerError, NotFound } from "http-json-errors";

const retry = (failureCount: number, error: Error) => {
    if (error instanceof NotFound) 
        return false;
    
    return failureCount < 3;
}; 

const retryDelay = (failureCount: number, error: Error) => {
    if (error instanceof InternalServerError) 
        return 1000;
  
    return Math.min(1000 * 2 ** failureCount, 30000);
};

export { retry, retryDelay};