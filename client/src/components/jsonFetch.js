
const jsonGetch = async (url, callback, strKey) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw (error)
    }
    const responseData = await response.json()
    //console.log(responseData);
    //Call back here is generally the setState() method
    if (!!strKey && !!strKey.trim())
      callback(responseData[strKey]);
    else
      callback(responseData);
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

//Callback should set state to cause view to update.
const jsonPetch = async (url, payload, callback) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw (error);
    }
    const body = await response.json();
    callback(body);

  } catch (err) {
    console.error(`Error in fetch: ${err.status} (${err.message})`);
  }
}

export { jsonGetch, jsonPetch };

