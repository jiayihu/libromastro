export function requestIEXCloud<T>(resource: string, options?: RequestInit): Promise<T> {
  const API_KEY = process.env.REACT_APP_IEXCLOUD_KEY;
  const BASE_URL = `https://cloud.iexapis.com/stable`;
  const headers = new Headers();

  if (options?.body) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(`${BASE_URL}${resource}?token=${API_KEY}`, {
    mode: 'cors',
    headers,
    ...options,
  }).then((response) => {
    if (!response.ok) throw new Error(response.statusText);

    return response.json();
  });
}
