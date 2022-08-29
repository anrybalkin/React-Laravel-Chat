export async function POST(url = '', data = {}) {


    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache', 
      headers: {
         'Content-Type': 'application/json',
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body:JSON.stringify(data)
      
    });
    return await response.json();
  }

  export async function GET(url = '') {

    const response = await fetch(url, {
      method: 'GET', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
    });
    return await response.json();
  }