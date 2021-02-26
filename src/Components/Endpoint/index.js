export default function Endpoint(jwt) {
  const urlEndpoint = "https://neoeducate-admin-api.vercel.app"
  return (
    {
      login: `${urlEndpoint}/auth/login`,
      schools: `${urlEndpoint}/schools/`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("neojwt")
      }
    }
  )
}