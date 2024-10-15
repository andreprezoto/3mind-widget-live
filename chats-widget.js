(function () {
  // Criar o estilo do widget
  const style = document.createElement("style");
  style.textContent = `
      #chat-widget-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        z-index: 1000;
      }
  
      #chat-widget-message-container {
        position: relative;
        margin-right: 20px;
      }
  
      #chat-widget-message {
        background-color: #ff7000;
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-family: Arial, sans-serif;
        box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
  
      #chat-widget-lottie {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin-right: 10px;
      }
  
      #chat-widget {
        width: 60px;
        height: 60px;
        background-image: url("https://0e9372c3273da841ec29bfdfe34a2de7.cdn.bubble.io/f1727983485791x724569948933606800/CAIO.png?_gl=1*1bz3ois*_gcl_au*MjE4NTc3OTY4LjE3MjY2OTAwODA.*_ga*MTcyNDE4OTcyMy4xNzE4ODIyOTg0*_ga_BFPVR2DEE2*MTcyNzk2MTQwMS43Ny4xLjE3Mjc5ODM0NzQuNDAuMC4w");
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }
  
      #chat-widget:hover {
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
      }
  
      #chat-window {
        display: none;
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 80%;
        max-width: 400px;
        min-height: 400px;
        max-height: 600px;
        background-color: white;
        z-index: 1001;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        flex-direction: column;
      }
  
      #chat-header {
        padding: 10px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
        display: flex;
        justify-content: flex-end;
      }
  
      #chat-iframe-container {
        flex-grow: 1;
        position: relative;
      }
  
      #chat-iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }
  
      #chat-close {
        width: 20px;
        height: 20px;
        background-color: #ff7000;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 14px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      @media (max-width: 480px) {
        #chat-widget-container {
          flex-direction: column-reverse;
          align-items: flex-end;
        }
  
        #chat-widget-message-container {
          margin-right: 0;
          margin-top: 10px;
        }
  
        #chat-window {
          width: 90%;
          height: 80vh;
          bottom: 90px;
          right: 5%;
          left: 5%;
        }
      }
    `;
  document.head.appendChild(style);

  // Criar os elementos do widget
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "chat-widget-container";
  widgetContainer.innerHTML = `
      <div id="chat-widget-message-container">
        <div id="chat-widget-lottie"></div>
        <div id="chat-widget-message">Precisa de ajuda?</div>
      </div>
      <div id="chat-widget"></div>
    `;

  const chatWindow = document.createElement("div");
  chatWindow.id = "chat-window";
  chatWindow.innerHTML = `
      <div id="chat-header">
        <button id="chat-close">×</button>
      </div>
      <div id="chat-iframe-container">
        <iframe
          id="chat-iframe"
          src="about:blank"
          allow="same-origin"
          sandbox="allow-scripts allow-same-origin allow-forms"
        ></iframe>
      </div>
    `;

  document.body.appendChild(widgetContainer);
  document.body.appendChild(chatWindow);

  // Funcionalidade do widget
  const widget = document.getElementById("chat-widget");
  const chatIframe = document.getElementById("chat-iframe");
  const closeButton = document.getElementById("chat-close");
  const widgetMessage = document.getElementById("chat-widget-message");
  let clientId = "";

  console.log("clientId inicial: ", clientId);

  function setWidgetMessage(message) {
    widgetMessage.textContent = message;
  }

  function openChat() {
    chatWindow.style.display = "flex";
  }

  function closeChat() {
    chatWindow.style.display = "none";
  }

  function setClientId(id) {
    clientId = id;
    console.log("clientId atualizado: ", clientId);
  }

  function getClientId() {
    return clientId;
  }

  function setChatUrl(url) {
    const currentClientId = getClientId();
    console.log("setChatUrl - clientId atual: ", currentClientId);
    const urlWithClientId = `${url}?client_id=${currentClientId}`;
    chatIframe.src = urlWithClientId;
  }

  widgetContainer.addEventListener("click", openChat);

  closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    closeChat();
  });

  document.addEventListener("click", (e) => {
    if (
      chatWindow.style.display === "flex" &&
      !chatWindow.contains(e.target) &&
      !widgetContainer.contains(e.target)
    ) {
      closeChat();
    }
  });

  // Carregar o Lottie e iniciar a animação
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js";
  script.onload = () => {
    const lottieContainer = document.getElementById("chat-widget-lottie");
    const lottieAnimation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "https://lottie.host/e8f9d528-8610-4300-9c18-c070bcb7dcf6/SUUE9p0742.json",
    });

    lottieAnimation.addEventListener("complete", () => {
      lottieContainer.style.display = "none";
      widgetMessage.style.opacity = "1";
    });

    // Iniciar animação após um curto atraso
    setTimeout(() => {
      lottieAnimation.play();
    }, 500);
  };
  document.head.appendChild(script);

  // Expor funções para uso externo
  window.chatWidget = {
    setWidgetMessage,
    setChatUrl,
    setClientId,
    getClientId,
  };
})();
