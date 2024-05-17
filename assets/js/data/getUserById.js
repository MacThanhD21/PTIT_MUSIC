import { getCookie } from "../helpers/cookies.js";
import { users } from "../data/users.js";
const userId = getCookie("accessToken");
const user_fined = users.find((user) => user._id === userId);
export const recentPlayedListId = user_fined.recentPlay;
export const favoriteListId = user_fined.favoriteMusic;