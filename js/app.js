const countElement = document.querySelector("#count");
const channelElement = document.querySelector("#channel");
const statusElement = document.querySelector("#status");

function Start() {
  var channel = channelElement.value;
  let listeningForCount = false;
  let users = [];

  const client = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true,
    },
    channels: [channel],
  });

  client.connect().then(() => {
    statusElement.textContent = `Listening for commands`;
  });

  client.on("message", (wat, tags, message, self) => {
    if (tags.badges.broadcaster && message === "!start") {
      listeningForCount = true;
      statusElement.textContent = `Started`;
    } else if (tags.badges.broadcaster && message === "!end") {
      listeningForCount = false;
      swal(
        Object.keys(users)[
          Math.floor(Math.random() * Object.keys(users).length)
        ],
        "Won the giveaway",
        "success"
      );
    } else if (tags.badges.broadcaster && message === "!reset") {
      statusElement.textContent = "Listening for commands";
      countElement.textContent = 0;
      users = [];
    } else if (listeningForCount && message === "!join") {
      users[tags.username] = true;
      countElement.textContent = Object.keys(users).length;
    }
  });
}
