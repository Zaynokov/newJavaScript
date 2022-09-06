export function service(url, method = 'GET', body) {
    return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
  }