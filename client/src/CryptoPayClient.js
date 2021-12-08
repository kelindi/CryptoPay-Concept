

const cPayRequest = async (route, request, body) => {
   let response;
    console.log(body)
    if (body == null) {
      console.log("fetching")
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
            body: body,
          });
    }
    console.log(response.status)
    const status = response.status;
    const data = await response.json();
    console.log(route, data)
    return { status: status, data: data };
  };

  export default cPayRequest;
