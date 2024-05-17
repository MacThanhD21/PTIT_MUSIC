import { getCookie } from "../helpers/cookies.js";
import { users } from "../data/users.js";

// get id from cookie
const userId = getCookie("accessToken");
// console.log(userId);
const user_fined = users.find((user) => user._id === userId);
// console.log(user_fined);

// Get list recent played
export const recentPlayedListId = user_fined.recentPlay;
// console.log(recentPlayedListId);