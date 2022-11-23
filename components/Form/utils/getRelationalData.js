import nookies from "nookies";

const cookies = nookies.get(null);
export async function getRelationalData(url, parameter, query) {
  const endpoint = process.env.NEXT_PUBLIC_URL + `/${url}?filters[${parameter}][$eq]=${query}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  try {
    const req = await fetch(endpoint, options);
    const res = await req.json();

    return res?.data[0]?.id || null;
  } catch (err) {
    console.log(err);
  }
}

export async function getLocationsId(locationsNamesArr = []) {
  let endpoint = process.env.NEXT_PUBLIC_URL + "/locations?";

  locationsNamesArr?.forEach((locationName, index) => {
    endpoint += `filters[name][$in][${index}]=${locationName}`;
    if (index < locationsNamesArr.length - 1) {
      endpoint += "&";
    }
  }) || [];

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  try {
    const req = await fetch(endpoint, options);
    const res = await req.json();

    return res?.data.map((location) => location.id) || [];
  } catch (err) {
    console.log(err);
  }
}
