import axios from "axios";

// export async function fetchSomeData(): Promise<any> {
export function fetchSomeData(): void {
  console.log('test');
  // axios.get("//localhost:4201/")
  fetch("shanda_backend:4201/")
    .then((response) => response.body)
    .then(json => console.log(json))
    .catch(error => {console.log(error)})
}