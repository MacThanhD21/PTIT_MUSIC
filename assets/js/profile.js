import { getCookie, setCookie } from "./helpers/cookies.js";

const imageField = document.getElementById("img-account-profile"),
  usernameField = document.getElementById("inputUsername"),
  emailField = document.getElementById("inputEmailAddress"),
  passwordField = document.getElementById("inputPassWord");

// Function to display user information
function displayUserInformation() {
  try {
    const userCookieValue = JSON.parse(getCookie("user"));
    console.log(userCookieValue);
    if (userCookieValue) {
      imageField.src = userCookieValue.profilePictureUrl;
      usernameField.value = userCookieValue.username;
      emailField.value = userCookieValue.email;
      passwordField.value = userCookieValue.password;
    } else {
      console.log("Không tìm thấy cookie");
    }
  } catch (e) {
    console.log(e);
  }
}
displayUserInformation();

// localStorage.removeItem("userInfoDisplayed");
// Check if the user info has already been displayed
// if (localStorage.getItem("userInfoDisplayed") === "true") {
//   localStorage.setItem("userInfoDisplayed", "false");
// }
// else {
//   console.log("Đang false mà, cập nhật cái loll");
// }

// Rest of your code (e.g., event listeners for image upload and save changes button)

const imageUpload = document.getElementById("imageUpload"),
  imagePreview = document.getElementById("avatar__display"),
  saveChangesButton = document.getElementById("save__changes");

const API_UPDATE_USER =
  "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/updateUser";

async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your upload preset

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/db7oouu4n/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

imageUpload.addEventListener("change", async function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%;">`;
    };
    reader.readAsDataURL(file);

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      imageField.src = imageUrl;
    }
  }
});

saveChangesButton.addEventListener("click", async function () {
  const userData = {
    imageUrl: imageField.src,
    username: usernameField.value,
    email: emailField.value,
    password: passwordField.value,
  };

  try {
    const response = await fetch(API_UPDATE_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    const userDataUpdated = result.result.body;

    if (userDataUpdated === null) {
      alert("Update failed");
      return;
    } else {
      alert("Update successfully");

      // Update user cookie
      const userCookieValue = JSON.parse(getCookie("user"));
      userCookieValue.profilePictureUrl = userDataUpdated.profilePictureUrl;
      userCookieValue.username = userDataUpdated.username;
      userCookieValue.email = userDataUpdated.email;
      userCookieValue.password = userDataUpdated.password;

      setCookie("user", JSON.stringify(userCookieValue), 1);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
});
