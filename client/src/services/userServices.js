const API_link = "http://localhost:3001";

export const getUser = async () => {
  const res = await fetch(`${API_link}/getCharacters`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};