export default function Endpoint(jwt) {
  return (
    {
      login: "https://neoeducate-admin-api.vercel.app/auth/login",
      schools: "https://neoeducate-admin-api.vercel.app/schools/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("neojwt")
      }
    }
  )
}