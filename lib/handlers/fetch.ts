import { ActionResponse } from "@/types/global";
import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";


interface FetchOptions extends RequestInit {
    timeout?: number;
}

function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export async function fetchHandler<T>(
	url: string,
	options: FetchOptions = {}
): Promise<ActionResponse<T>> {
    // Validate URL
    try {
        new URL(url);
    } catch {
        const error = new Error("Invalid URL");
        logger.error(`Error fetching ${url}: ${error.message}`);
        return handleError(error) as ActionResponse<T>;
    }

    const {
        timeout = 5000,
        headers: customHeaders = {},
        ...restOptions
    } = options;

    // Validate timeout
    const safeTimeout = typeof timeout === "number" && timeout > 0 ? timeout : 5000;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), safeTimeout);

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    // Sanitize headers: only allow string values
    const sanitizedHeaders: HeadersInit = {};
    for (const [key, value] of Object.entries({...defaultHeaders, ...customHeaders})) {
        if (typeof value === "string") {
            sanitizedHeaders[key] = value;
        } else {
            logger.warn(`Header ${key} was ignored because its value is not a string`);
        }
    }

    const config: RequestInit = {
        ...restOptions,
        headers: sanitizedHeaders,
        signal: controller.signal,
    };

    try {
        const response = await fetch(url, config);
        clearTimeout(id);

        if (!response.ok) {
            throw new RequestError(response.status, `HTTP error: ${response.status}`)
        }

        // Handle JSON parsing errors
        try {
            return await response.json();
        } catch (jsonError) {
            const error = new Error("Failed to parse JSON response");
            logger.error(`Error fetching ${url}: ${error.message}`);
            return handleError(error) as ActionResponse<T>;
        }

    } catch (err) {
        const error = isError(err) ? err : new Error("Unknown error");
        if(error.name === "AbortError") {
            logger.warn(`Request to ${url} timed out`);
        } else {
            logger.error(`Error fetching ${url}: ${error.message}`);
        }
        return handleError(error) as ActionResponse<T>;

    }
}
