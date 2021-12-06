

cPayRequest = async (request, route, body = {}) => {
    const response = await fetch(route, {
      method: request,
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const status = response.status;
    const data = await response.json();
    return { status: status, data: data };
  };

  export default cPayRequest;
