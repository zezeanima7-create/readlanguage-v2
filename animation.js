
/* Efeitos compartilhados pelos botões do ReadLanguage. */
(() => {
  const addStyle = () => {
    if (document.getElementById('rl-animation-style')) return;

    const style = document.createElement('style');
    style.id = 'rl-animation-style';

    style.textContent = `
      button, .btn, .option-button {
        -webkit-tap-highlight-color: transparent;
        transition:
          transform .15s ease,
          filter .2s ease,
          box-shadow .2s ease;
      }

      button:active, .btn:active, .option-button:active {
        transform: scale(.97);
      }

      .rl-ripple {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        background: currentColor;
        opacity: .17;
        transform: scale(0);
        animation: rlRipple .55s ease-out forwards;
      }

      .rl-spark {
        position: fixed;
        z-index: 99999;
        pointer-events: none;
        font-size: 16px;
        color: #26966b;
        animation: rlSpark .65s ease-out forwards;
      }

      .verify-pulse {
        animation: verifyPulse .55s ease;
      }

      .correct-pulse {
        animation: correctPulse .5s ease;
      }

      .wrong-pulse {
        animation: wrongPulse .4s ease;
      }

      .rl-wiggle {
        animation: rlWiggle .35s ease;
      }

      @keyframes rlRipple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes rlSpark {
        0% {
          opacity: 0;
          transform: translate(0, 0) scale(.5);
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform:
            translate(var(--dx), var(--dy))
            rotate(100deg)
            scale(1.2);
        }
      }

      @keyframes verifyPulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(38, 150, 107, .5);
        }

        50% {
          transform: scale(1.035);
          box-shadow: 0 0 0 8px rgba(38, 150, 107, 0);
        }

        100% {
          transform: scale(1);
          box-shadow: none;
        }
      }

      @keyframes correctPulse {
        0% { transform: scale(1); }
        45% { transform: scale(1.04); }
        100% { transform: scale(1); }
      }

      @keyframes wrongPulse {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-3px); }
      }

      @keyframes rlWiggle {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px); }
        75% { transform: translateX(4px); }
      }

      @media (prefers-reduced-motion: reduce) {
        .rl-ripple, .rl-spark, .verify-pulse,
        .correct-pulse, .wrong-pulse, .rl-wiggle {
          animation-duration: .01ms !important;
        }

        button, .btn, .option-button {
          transition-duration: .01ms !important;
        }
      }
    `;

    document.head.appendChild(style);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addStyle, { once: true });
  } else {
    addStyle();
  }

  document.addEventListener('click', event => {
    const target = event.target.closest(
      'button, .btn, .option-button'
    );

    if (!target || target.disabled) return;

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    const ripple = document.createElement('span');

    ripple.className = 'rl-ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left =
      `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top =
      `${event.clientY - rect.top - size / 2}px`;

    if (getComputedStyle(target).position === 'static') {
      target.style.position = 'relative';
    }

    target.appendChild(ripple);

    ripple.addEventListener(
      'animationend',
      () => ripple.remove(),
      { once: true }
    );

    if (target.id === 'verifyButton') {
      target.classList.remove('verify-pulse');
      void target.offsetWidth;
      target.classList.add('verify-pulse');

      setTimeout(() => {
        target.classList.remove('verify-pulse');
      }, 600);
    }

    ['✦', '✧', '·'].forEach((symbol, index) => {
      const spark = document.createElement('span');

      spark.className = 'rl-spark';
      spark.textContent = symbol;
      spark.style.left = `${event.clientX}px`;
      spark.style.top = `${event.clientY}px`;

      spark.style.setProperty(
        '--dx',
        `${(index - 1) * 17}px`
      );

      spark.style.setProperty(
        '--dy',
        `${-20 - index * 5}px`
      );

      document.body.appendChild(spark);

      spark.addEventListener(
        'animationend',
        () => spark.remove(),
        { once: true }
      );
    });
  });
})();
                            
