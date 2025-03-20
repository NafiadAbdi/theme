import qs from "query-string";

interface UrlQueryParams {
	params: string;
	key: string;
	value: string;
}

interface RemoveUrlQueryParams {
	params: string;
	keysToRemove: string[];
}

// ✅ Fix: Correctly appends query string to pathname
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
	const queryString = qs.parse(params);
	queryString[key] = value;
	return `${window.location.pathname}?${qs.stringify(queryString)}`;
};

// ✅ Fix: Properly removes keys without breaking URL structure
export const removeKeysFromUrlQuery = ({
	params,
	keysToRemove,
}: RemoveUrlQueryParams) => {
	const queryString = qs.parse(params);
	keysToRemove.forEach((key) => delete queryString[key]);
	return `${window.location.pathname}?${qs.stringify(queryString, {
		skipNull: true,
	})}`;
};
