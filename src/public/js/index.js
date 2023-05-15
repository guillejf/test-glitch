//FRONT
const socket = io();

socket.on("msgs_back_to_front", (msgs) => {
  const msgsDiv = document.getElementById("msgsdiv");
  msgsDiv.innerHTML = JSON.stringify(msgs);
  console.log(msgs);
  /* 
  socket.emit("msg_front_to_back", {
    msg: Date.now() + " hola desde el front al socket",
  }); */
});

let nombreUsuario = "";

const chatBox = document.getElementById("chatbox");

chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      msg: chatBox.value,
      user: nombreUsuario,
    });
    chatBox.value = "";
  }
});

async function main() {
  const { value: nombre } = await Swal.fire({
    title: "Enter your name",
    input: "text",
    inputLabel: "Your name",
    inputValue: "",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });

  if (nombre) {
    nombreUsuario = nombre;
    //Swal.fire(`Your name is ${nombreUsuario}`);
  } else {
    //Swal.fire(`Nombre no ingresado`);
  }
}

main();
