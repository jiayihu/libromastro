export function requestIEXCloud<T = any>(
  resource: string,
  query: URLSearchParams = new URLSearchParams(),
  options?: RequestInit,
): Promise<T> {
  const API_KEY = process.env.REACT_APP_IEXCLOUD_KEY;
  const BASE_URL = `https://cloud.iexapis.com/stable`;
  const headers = new Headers();

  if (options?.body) {
    headers.set('Content-Type', 'application/json');
  }

  query.set('token', API_KEY!);

  return fetch(`${BASE_URL}${resource}?${query.toString()}`, {
    mode: 'cors',
    headers,
    ...options,
  }).then((response) => {
    if (!response.ok) throw new Error(response.statusText);

    return response.json();
  });
}
