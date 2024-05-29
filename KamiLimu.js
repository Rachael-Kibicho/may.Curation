document.addEventListener("DOMContentLoaded", () => {
    const spaceSound = document.getElementById("spaceSound");
    spaceSound.volume = 0.5;
    const pageTitle = document.querySelector(".container1");
    const bodyContent = document.querySelector(".content");
    let isSoundPlayed = false;


    function playSpaceSound(){
        spaceSound.play();
        isSoundPlayed = true;
    }
    document.body.addEventListener("click", playSpaceSound, { once: true });
    window.addEventListener("load", playSpaceSound);

    const player = videojs("myVideo", {
      controls: true,
      autoplay: false,
      preload: "auto",
    });

    player.on("play", () => {
      console.log("Video is playing!");
      spaceSound.pause();
      bodyContent.classList.add("blur");
    });

    player.on("pause", () => {
      console.log("Video is paused.");
      bodyContent.classList.remove("blur");

    });

    player.on("ended", () => {
        pageTitle.innerHTML = "<h1> Phew! You found it, I hope it was out of this world! </h1>";
        playSpaceSound();
        bodyContent.classList.remove("blur");
      });

    const widgetImages = {
      "widget2": "mercuryconvo.jpg",
      "widget3": "venusconvo.jpg",
      "widget4": "earthconvo.jpg",
      "widget5": "marsconvo.jpg",
      "widget6": "jupiterconvo.jpg"
    };

    function showModalOverlay(widgetId) {
      const modalOverlay = document.getElementById("modalOverlay");
      const conversation = document.getElementById("conversation");
      const bodyContent = document.querySelector(".content");

      const imageUrl = widgetImages[widgetId];
      conversation.style.backgroundImage = `url(${imageUrl})`;

      modalOverlay.classList.add("active");

      const myVideo = document.getElementById("myVideo");
      const videoWidget = document.getElementById("videoWidget");
      videoWidget.addEventListener('click', () => {
        myVideo.classList.add("active");
      })
      if (widgetId !== videoWidget){
        myVideo.classList.remove("active");
        bodyContent.classList.remove("blur");
      }
    }

    const widgets = document.querySelectorAll(".widget");

    widgets.forEach(widget => {
      widget.addEventListener("click", () => {
        showModalOverlay(widget.id);
        bodyContent.classList.add("blur");
      });
    });

    const exitButton = document.getElementById("exit");

    exitButton.addEventListener("click", () => {
      const bodyContent = document.querySelector(".content");
      const modalOverlay = document.getElementById("modalOverlay");
      bodyContent.classList.remove("blur");
      modalOverlay.classList.remove("active");
      player.pause();

    });
  });
