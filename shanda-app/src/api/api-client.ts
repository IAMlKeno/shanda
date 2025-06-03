import axios from "axios";

const api: string = 'localhost:4201';
// export async function fetchSomeData(): Promise<any> {
export function fetchSomeData() {
  // axios.get(`http://${api}/test/`)
  //   .then((response) => response.data)
  //   .catch(error => {console.log(error)})

  return "api";
}

export async function fetchUserData() {
  const token: string | null = window.localStorage.getItem('access-token');
  if (token) {
    try {
      const res = await axios.get(`http://${api}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}