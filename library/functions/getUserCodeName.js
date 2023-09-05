import nookies from "nookies";

export default async function getUserCodeName() {
  const { token } = nookies.get(null);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const req = await fetch(endpoint, options);
    const res = await req.json();

    console.log("res", res);

    return res?.codename;
  } catch (error) {
    console.log(error);
  }
}
