if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/assets/js/serviceWorker.js").then(
      function (registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

let db;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("musicDB", 1);

    request.onupgradeneeded = function (event) {
      db = event.target.result;

      // Tạo các Object Store
      db.createObjectStore("songs", { keyPath: "_id" });
      db.createObjectStore("albums", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("singers", { keyPath: "_id" });
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = function (event) {
      console.error("IndexedDB error:", event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
}

function saveData(storeName, data) {
  const transaction = db.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);
  data.forEach((item) => store.put(item));
  transaction.oncomplete = function () {
    console.log(`All data for ${storeName} stored successfully.`);
  };
  transaction.onerror = function (event) {
    console.error("Transaction error:", event.target.errorCode);
  };
}

function getData(storeName, callback) {
  const transaction = db.transaction([storeName], "readonly");
  const store = transaction.objectStore(storeName);
  const request = store.getAll();

  request.onsuccess = function (event) {
    callback(event.target.result);
  };

  request.onerror = function (event) {
    console.error("Transaction error:", event.target.errorCode);
  };
}

function playSong(songId) {
  getData("songs", function (songs) {
    const song = songs.find((song) => song._id === songId);
    if (song) {
      const audioSource = document.getElementById("audioSource");
      const audioPlayer = document.getElementById("audioPlayer");
      audioSource.src = song.link;
      audioPlayer.load();
      audioPlayer.play();
    }
  });
}

// Khởi tạo IndexedDB và lưu trữ dữ liệu
openDatabase()
  .then((db) => {
    console.log("Database opened successfully");
    // Lưu trữ dữ liệu vào các Object Store sau khi db đã sẵn sàng
    saveData("songs", songs);
    saveData("albums", albums);
    saveData("categories", categories);
    saveData("singers", singers);

    // Gọi hàm playSong với ID bài hát muốn phát
    playSong("65d38a7a94af16ac796b911b");
  })
  .catch((error) => {
    console.error("Failed to open database:", error);
  });

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("dropdownMenu");
  const dropdownBtn = document.getElementById("dropdownBtn");
  if (dropdown && dropdownBtn) {
    const isClickInside =
      dropdown.contains(event.target) || dropdownBtn.contains(event.target);
    if (!isClickInside) {
      dropdown.classList.remove("dropdownMenu");
    }
  }
});
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("avatarDropdown");
  const avatar = document.getElementById("avatar");
  const isClickInside =
    avatar.contains(event.target) || dropdown.contains(event.target);
  if (!isClickInside) {
    dropdown.classList.remove("avatarDropdown");
  }
});
function switchMode() {
  document.body.classList.toggle("switchMode");
}
document.getElementById("avatar").addEventListener("click", function (event) {
  const dropdown = document.getElementById("avatarDropdown");
  dropdown.classList.toggle("avatarDropdown");
  event.stopPropagation();
});
document
  .getElementById("avatarDropdown")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });
const backTop = document.getElementById("backTop");
const navbarFixed = document.getElementById("navbarFixed");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backTop.classList.add("back-top-active");
  } else if (window.scrollY > 50) {
    navbarFixed.classList.add("nav-fixed-active");
  } else {
    backTop.classList.remove("back-top-active");
    navbarFixed.classList.remove("nav-fixed-active");
  }
});



