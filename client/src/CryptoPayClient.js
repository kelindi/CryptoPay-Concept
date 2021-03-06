

const cPayRequest = async (route, request, body) => {
   let response;
    if (body == null) {
        response = await fetch(route, {
            method: request,
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          });
    }
    else {
        response = await fetch(route, {
            method: request,
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
    }
    const status = response.status;
    const data = await response.json();
    return { status: status, data: data };
  };

  export default cPayRequest;
