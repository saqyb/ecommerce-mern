const getUser = async (userId) => {
  try {
    const res = await fetch("/vendor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      console.log("Failed to fetch Data");
    }
    if (!res.ok) {
      console.log(res);
      throw new Error(`Error! status: ${res.status}`);
    }
  } catch (err) {
    console.log(err);
  }
};
export default getUser;
