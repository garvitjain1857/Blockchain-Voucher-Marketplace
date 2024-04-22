
export async function createUser(userData) {
  const response = await fetch('http://localhost:8080/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'content-type': 'application/json' },
  });

  const data = await response.json();
  // TODO: on the server, it will only return some info of the user (not the password)
  return { data };
}

export async function loginUser(loginInfo) {
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: { 'content-type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      throw error;
    }
  } catch (error) {
    throw error;
  }
  // TODO: on the server, it will only return some info of the user (not the password)
}

export async function checkAuth() {
  try {
    const response = await fetch('http://localhost:8080/auth/check');

    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      throw error;
    }
  } catch (error) {
    throw error;
  }
  // TODO: on the server, it will only return some info of the user (not the password)
}


export async function signOut(userId) {
  // TODO: on the server, we will remove user session info
  return { data: 'success' };
}
