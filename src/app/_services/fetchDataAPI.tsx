import NotFound from "@/app/not-found";
import client from "./client";

export const authUserLogin = async (email, password) => {
  const { data } = await client.post("auth/login", {
    email: email,
    password: password,
  });
  return data.results.user;
};

export const authUserSignUp = async (email, password, name) => {
  const { data } = await client.post("auth/register", {
    email: email,
    password: password,
    name: name,
  });
  return data.results.user;
};

export const logOut = async () => {
  const { data } = await client.get("auth/logout");
  return data.results;
};

export const CreateFeed = async (content, user) => {
  const { data } = await client.post("feeds", {
    content: content,
    user: user,
  });
  return data.results;
};

export const GetAllFeeds = async () => {
  const { data } = await client.get("feeds");
  return data.results;
};

export const DeleteFeed = async (feedId: string) => {
  const { data } = await client.delete(`feeds/${feedId}`);
  return data.results;
};

export const GetFeedById = async (feedId: string) => {
  const { data } = await client.get(`feeds/${feedId}`);
  // console.log(data);

  return data.results;
};

export const showCurrUser = async () => {
  try {
    const { data } = await client.get("users/showme");
    return data.results;
  } catch (error) {
    return "error";
  }
};

export const getAllUsers = async () => {
  const { data } = await client.get(`users/`);
  return data.results;
};

export const getUserByName = async (username: string) => {
  const { data } = await client.get(`/users/username/${username}`);
  return data.results;
};

export const getFeedByUsername = async (username: string) => {
  const { data } = await client.get(`feeds/user/${username}`);
  return data.results;
};
