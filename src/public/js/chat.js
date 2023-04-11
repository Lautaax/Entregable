const socket = io();

let user;
const chatBox = document.getElementById("chatBox");
const messagesList = document.getElementById("messagesList");

Swal.fire({
  icon: "info",
  title: "Entrar",
  input: "text",
  text: "Ingresar nombre!",
  confirmButtonText: "Ingresar",
  inputValidator: (value) => {
    return !value && "Ingresar usuario y presionar entre.";
  },
  allowOutsideClick: false,
  customClass: {
    popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
    icon: "!text-blue-600 !border-blue-500",
    validationMessage:
      "!w-10/12 !m-auto !mt-4 !text-slate-200 !bg-slate-700/90 !rounded-2xl !border-2 !border-gray-600",
    actions: "...",
    confirmButton: "!bg-blue-600 !px-8",
  },
}).then((result) => {
  user = result.value;
  socket.emit("user-auth", user);
  Swal.fire({
    icon: "success",
    title: `Bienvenido ${user}!`,
    confirmButtonText: "Gracias!",
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
      confirmButton: "!bg-blue-600 !px-8",
      timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
    },
  });
});

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("add-message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

socket.on("message_add", (message) => {
  let addedMessage = document.createElement("div");
  addedMessage.classList.add(
    "flex",
    "flex-row",
    "text-slate-200",
    "w-10/12",
    "border",
    "rounded-lg",
    "shadow",
    "bg-gray-700/90",
    "border-gray-600",
    "my-4",
    "m-auto",
    "items-center"
  );
  addedMessage.setAttribute("id", message._id);
  addedMessage.innerHTML = `
  <div>
    <svg
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </div>
  <div>
    <p>Usuario : ${message.user}</p>
    <p> Mensaje: ${message.message}</p>
  </div>
  `;

  messagesList.appendChild(addedMessage);
});

socket.on("user-connected", (data) => {
  Swal.fire({
    title: "Nuevo Usuario",
    text: `${data} Entro al chat`,
    toast: true,
    position: "top-right",
    icon: "success",
    customClass: {
      popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
      confirmButton: "!bg-blue-600 !px-5",
      timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
    },
  });
});
