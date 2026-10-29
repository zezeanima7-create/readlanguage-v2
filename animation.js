
/* ReadLanguage — animações de clique */
(() => {
  const style = document.createElement("style");

  style.textContent = `
    button, .button, [role="button"] {
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: transform .14s ease, filter .18s ease;
    }

    button:active, .button:active, [role="button"]:active {
      transform: scale(.96);
      filter: brightness(1.1);
    }

    .rl-ripple {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      background: currentColor;
      opacity: .22;
      transform: scale(0);
      animation: rl-ripple .55s ease-out forwards;
    }

    .rl-pop {
      animation: rl-pop .32s cubic-bezier(.2,.8,.2,1);
    }

    .rl-spark {
      position: fixed;
      z-index: 99999;
      pointer-events: none;
      font-size: 16px;
      animation: rl-spark .65s ease-out forwards;
    }

    @keyframes rl-ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @keyframes rl-pop {
      0% { transform: scale(1); }
      45% { transform: scale(1.045); }
      100% { transform: scale(1); }
    }

    @keyframes rl-spark {
      0% {
        transform: translate(0,0) scale(.5);
        opacity: 0;
      }
      20% { opacity: 1; }
      100% {
        transform: translate(var(--dx),var(--dy)) scale(1.2)
                   rotate(100deg);
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .rl-ripple, .rl-pop, .rl-spark {
        animation-duration: .01ms !important;
      }
      button, .button, [role="button"] {
        transition-duration: .01ms !important;
      }
    }
  `;

  document.head.appendChild(style);

  document.addEventListener("click", event => {
    const button = event.target.closest(
      "button, .button, [role='button']"
    );

    if (!button || button.disabled) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    const ripple = document.createElement("span");

    ripple.className = "rl-ripple";
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left =
      (event.clientX - rect.left - size / 2) + "px";
    ripple.style.top =
      (event.clientY - rect.top - size / 2) + "px";

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), {
      once: true
    });

    button.classList.remove("rl-pop");
    void button.offsetWidth;
    button.classList.add("rl-pop");

    button.addEventListener("animationend", () => {
      button.classList.remove("rl-pop");
    }, { once: true });

    ["✦", "✧", "·"].forEach((symbol, index) => {
      const spark = document.createElement("span");
      spark.className = "rl-spark";
      spark.textContent = symbol;
      spark.style.left = event.clientX + "px";
      spark.style.top = event.clientY + "px";
      spark.style.setProperty("--dx", ((index - 1) * 18) + "px");
      spark.style.setProperty("--dy", (-18 - index * 5) + "px");

      document.body.appendChild(spark);
      spark.addEventListener("animationend", () => spark.remove(), {
        once: true
      });
    });
  });
})();
