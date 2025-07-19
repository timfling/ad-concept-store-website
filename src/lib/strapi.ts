export async function fetchAPI(
  path: string,
  options: RequestInit = {}
) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const apiToken = process.env.STRAPI_API_TOKEN;

  if (!baseUrl) {
    throw new Error("Strapi API URL is not defined in environment variables.");
  }

  const url = `${baseUrl}${path}`;
  console.log('--- [strapi.ts] Sending request to URL:', url);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}\n${errorBody}`);
  }

  const json = await res.json();
  console.log('--- [strapi.ts] Received JSON response:', JSON.stringify(json, null, 2));
  return json.data;
} 