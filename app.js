
/* ReadLanguage: interface, conta demonstrativa, cursos e lições. */
(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const STORAGE = {
    users: 'rlplus_users',
    session: 'rlplus_session',
    prefs: 'rlplus_prefs',
    progress: 'rlplus_progress'
  };

  const LANGUAGES = [
    { code: 'en', name: 'Inglês', native: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Espanhol', native: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Francês', native: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Alemão', native: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', native: 'Italiano', flag: '🇮🇹' },
    { code: 'ja', name: 'Japonês', native: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Coreano', native: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinês', native: '中文', flag: '🇨🇳' },
    { code: 'ru', name: 'Russo', native: 'Русский', flag: '🇷🇺' },
    { code: 'nl', name: 'Holandês', native: 'Nederlands', flag: '🇳🇱' },
    { code: 'ar', name: 'Árabe', native: 'العربية', flag: '🇸🇦' },
    { code: 'pt', name: 'Português para estrangeiros', native: 'Português', flag: '🇧🇷' }
  ];

  // Vocabulário inicial. O curso de português usa pistas em inglês.
  const WORDS = {
    en: [
      ['Hello', 'Olá', ['Olá', 'Adeus', 'Obrigado', 'Por favor']],
      ['Water', 'Água', ['Água', 'Pão', 'Casa', 'Livro']],
      ['Thank you', 'Obrigado(a)', ['Desculpe', 'Obrigado(a)', 'Bom dia', 'Até logo']],
      ['Book', 'Livro', ['Janela', 'Livro', 'Mesa', 'Cadeira']],
      ['Good morning', 'Bom dia', ['Boa noite', 'Até logo', 'Bom dia', 'Obrigado']],
      ['Friend', 'Amigo(a)', ['Família', 'Amigo(a)', 'Escola', 'Cidade']],
      ['Please', 'Por favor', ['Desculpe', 'Por favor', 'Obrigado', 'Talvez']],
      ['Apple', 'Maçã', ['Laranja', 'Banana', 'Maçã', 'Pera']],
      ['House', 'Casa', ['Casa', 'Carro', 'Rua', 'Porta']],
      ['Goodbye', 'Tchau', ['Olá', 'Tchau', 'Bom dia', 'Sim']],
      ['Food', 'Comida', ['Comida', 'Água', 'Escola', 'Livro']],
      ['Beautiful', 'Bonito(a)', ['Pequeno(a)', 'Bonito(a)', 'Frio(a)', 'Rápido(a)']]
    ],

    es: [
      ['Hola', 'Olá', ['Adeus', 'Olá', 'Água', 'Obrigado']],
      ['Agua', 'Água', ['Casa', 'Água', 'Livro', 'Pão']],
      ['Gracias', 'Obrigado(a)', ['Olá', 'Desculpe', 'Obrigado(a)', 'Por favor']],
      ['Libro', 'Livro', ['Livro', 'Mesa', 'Cadeira', 'Janela']],
      ['Buenos días', 'Bom dia', ['Boa noite', 'Bom dia', 'Tchau', 'Até logo']],
      ['Amigo', 'Amigo', ['Amigo', 'Cidade', 'Comida', 'Leite']],
      ['Por favor', 'Por favor', ['Obrigado', 'Desculpe', 'Por favor', 'Olá']],
      ['Manzana', 'Maçã', ['Pera', 'Maçã', 'Uva', 'Banana']],
      ['Casa', 'Casa', ['Rua', 'Carro', 'Casa', 'Escola']],
      ['Adiós', 'Adeus', ['Olá', 'Obrigado', 'Adeus', 'Sim']],
      ['Comida', 'Comida', ['Comida', 'Bebida', 'Livro', 'Janela']],
      ['Bonito', 'Bonito', ['Frio', 'Bonito', 'Alto', 'Rápido']]
    ],

    fr: [
      ['Bonjour', 'Bom dia', ['Boa noite', 'Obrigado', 'Bom dia', 'Adeus']],
      ['Eau', 'Água', ['Água', 'Pão', 'Casa', 'Livro']],
      ['Merci', 'Obrigado(a)', ['Olá', 'Obrigado(a)', 'Desculpe', 'Sim']],
      ['Livre', 'Livro', ['Mesa', 'Livro', 'Janela', 'Cadeira']],
      ['Au revoir', 'Adeus', ['Bom dia', 'Obrigado', 'Adeus', 'Por favor']],
      ['Ami', 'Amigo', ['Escola', 'Amigo', 'Cidade', 'Comida']],
      ['S’il vous plaît', 'Por favor', ['Obrigado', 'Por favor', 'Desculpe', 'Adeus']],
      ['Pomme', 'Maçã', ['Uva', 'Pera', 'Maçã', 'Banana']],
      ['Maison', 'Casa', ['Casa', 'Carro', 'Rua', 'Porta']],
      ['Nourriture', 'Comida', ['Bebida', 'Comida', 'Livro', 'Água']],
      ['Chat', 'Gato', ['Cão', 'Gato', 'Peixe', 'Pássaro']],
      ['Merci beaucoup', 'Muito obrigado', ['Até amanhã', 'Muito obrigado', 'Bom dia', 'Por favor']]
    ],

    de: [
      ['Hallo', 'Olá', ['Tchau', 'Olá', 'Água', 'Livro']],
      ['Wasser', 'Água', ['Água', 'Pão', 'Casa', 'Mesa']],
      ['Danke', 'Obrigado(a)', ['Bom dia', 'Obrigado(a)', 'Até logo', 'Desculpe']],
      ['Buch', 'Livro', ['Caneta', 'Cadeira', 'Livro', 'Janela']],
      ['Tschüss', 'Tchau', ['Bom dia', 'Tchau', 'Obrigado', 'Água']],
      ['Freund', 'Amigo', ['Escola', 'Amigo', 'Cidade', 'Comida']],
      ['Bitte', 'Por favor', ['Por favor', 'Adeus', 'Olá', 'Obrigado']],
      ['Apfel', 'Maçã', ['Pera', 'Maçã', 'Uva', 'Banana']],
      ['Haus', 'Casa', ['Casa', 'Carro', 'Rua', 'Porta']],
      ['Essen', 'Comida', ['Comida', 'Água', 'Livro', 'Escola']],
      ['Katze', 'Gato', ['Cão', 'Gato', 'Peixe', 'Pássaro']],
      ['Guten Morgen', 'Bom dia', ['Boa noite', 'Bom dia', 'Adeus', 'Obrigado']]
    ],

    it: [
      ['Ciao', 'Olá', ['Obrigado', 'Olá', 'Água', 'Livro']],
      ['Acqua', 'Água', ['Casa', 'Água', 'Pão', 'Mesa']],
      ['Grazie', 'Obrigado(a)', ['Adeus', 'Olá', 'Obrigado(a)', 'Desculpe']],
      ['Libro', 'Livro', ['Livro', 'Janela', 'Cadeira', 'Caneta']],
      ['Arrivederci', 'Até logo', ['Bom dia', 'Obrigado', 'Até logo', 'Água']],
      ['Amico', 'Amigo', ['Família', 'Amigo', 'Escola', 'Cidade']],
      ['Per favore', 'Por favor', ['Obrigado', 'Por favor', 'Olá', 'Adeus']],
      ['Mela', 'Maçã', ['Pera', 'Uva', 'Maçã', 'Banana']],
      ['Casa', 'Casa', ['Carro', 'Casa', 'Rua', 'Porta']],
      ['Cibo', 'Comida', ['Comida', 'Água', 'Livro', 'Bebida']],
      ['Gatto', 'Gato', ['Gato', 'Cão', 'Peixe', 'Pássaro']],
      ['Buongiorno', 'Bom dia', ['Boa noite', 'Tchau', 'Bom dia', 'Obrigado']]
    ],

    ja: [
      ['こんにちは', 'Olá', ['Adeus', 'Olá', 'Obrigado', 'Água']],
      ['水 (みず)', 'Água', ['Livro', 'Casa', 'Água', 'Pão']],
      ['ありがとう', 'Obrigado(a)', ['Obrigado(a)', 'Bom dia', 'Adeus', 'Por favor']],
      ['本 (ほん)', 'Livro', ['Mesa', 'Livro', 'Janela', 'Cadeira']],
      ['さようなら', 'Adeus', ['Olá', 'Água', 'Adeus', 'Obrigado']],
      ['友達 (ともだち)', 'Amigo(a)', ['Escola', 'Amigo(a)', 'Cidade', 'Comida']],
      ['お願いします', 'Por favor', ['Por favor', 'Obrigado', 'Desculpe', 'Adeus']],
      ['りんご', 'Maçã', ['Pera', 'Maçã', 'Uva', 'Banana']],
      ['家 (いえ)', 'Casa', ['Casa', 'Carro', 'Rua', 'Porta']],
      ['食べ物', 'Comida', ['Comida', 'Livro', 'Água', 'Janela']],
      ['猫 (ねこ)', 'Gato', ['Cão', 'Gato', 'Pássaro', 'Peixe']],
      ['おはよう', 'Bom dia', ['Boa noite', 'Bom dia', 'Adeus', 'Obrigado']]
    ],

    ko: [
      ['안녕하세요', 'Olá', ['Tchau', 'Olá', 'Obrigado', 'Água']],
      ['물', 'Água', ['Livro', 'Água', 'Pão', 'Casa']],
      ['감사합니다', 'Obrigado(a)', ['Desculpe', 'Obrigado(a)', 'Bom dia', 'Adeus']],
      ['책', 'Livro', ['Mesa', 'Livro', 'Janela', 'Cadeira']],
      ['안녕히 가세요', 'Adeus', ['Olá', 'Obrigado', 'Adeus', 'Por favor']],
      ['친구', 'Amigo(a)', ['Cidade', 'Amigo(a)', 'Comida', 'Escola']],
      ['제발', 'Por favor', ['Obrigado', 'Por favor', 'Desculpe', 'Olá']],
      ['사과', 'Maçã', ['Pera', 'Maçã', 'Uva', 'Banana']],
      ['집', 'Casa', ['Casa', 'Rua', 'Porta', 'Carro']],
      ['음식', 'Comida', ['Água', 'Comida', 'Livro', 'Escola']],
      ['고양이', 'Gato', ['Gato', 'Cão', 'Pássaro', 'Peixe']],
      ['좋은 아침', 'Bom dia', ['Boa noite', 'Bom dia', 'Tchau', 'Obrigado']]
    ],

    zh: [
      ['你好', 'Olá', ['Adeus', 'Olá', 'Obrigado', 'Água']],
      ['水', 'Água', ['Pão', 'Livro', 'Água', 'Casa']],
      ['谢谢', 'Obrigado(a)', ['Olá', 'Obrigado(a)', 'Desculpe', 'Até logo']],
      ['书', 'Livro', ['Mesa', 'Cadeira', 'Livro', 'Janela']],
      ['再见', 'Adeus', ['Olá', 'Água', 'Adeus', 'Obrigado']],
      ['朋友', 'Amigo(a)', ['Escola', 'Cidade', 'Amigo(a)', 'Comida']],
      ['请', 'Por favor', ['Obrigado', 'Por favor', 'Bom dia', 'Desculpe']],
      ['苹果', 'Maçã', ['Pera', 'Maçã', 'Uva', 'Banana']],
      ['房子', 'Casa', ['Casa', 'Carro', 'Rua', 'Porta']],
      ['食物', 'Comida', ['Comida', 'Água', 'Livro', 'Escola']],
      ['猫', 'Gato', ['Cão', 'Gato', 'Peixe', 'Pássaro']],
      ['早上好', 'Bom dia', ['Boa noite', 'Tchau', 'Bom dia', 'Obrigado']]
    ],

    ru: [
      ['Привет', 'Olá', ['Tchau', 'Olá', 'Água', 'Livro']],
      ['Вода', 'Água', ['Pão', 'Água', 'Casa', 'Mesa']],
      ['Спасибо', 'Obrigado(a)', ['Desculpe', 'Obrigado(a)', 'Olá', 'Adeus']],
      ['Книга', 'Livro', ['Livro', 'Janela', 'Mesa', 'Cadeira']],
      ['До свидания', 'Adeus', ['Olá', 'Adeus', 'Água', 'Obrigado']],
      ['Друг', 'Amigo', ['Escola', 'Amigo', 'Comida', 'Cidade']],
      ['Пожалуйста', 'Por favor', ['Por favor', 'Obrigado', 'Bom dia', 'Adeus']],
      ['Яблоко', 'Maçã', ['Uva', 'Pera', 'Maçã', 'Banana']],
      ['Дом', 'Casa', ['Casa', 'Rua', 'Carro', 'Porta']],
      ['Еда', 'Comida', ['Água', 'Comida', 'Livro', 'Escola']],
      ['Кошка', 'Gato', ['Gato', 'Cão', 'Pássaro', 'Peixe']],
      ['Доброе утро', 'Bom dia', ['Boa noite', 'Bom dia', 'Tchau', 'Obrigado']]
    ],

    nl: [
      ['Hallo', 'Olá', ['Adeus', 'Olá', 'Água', 'Livro']],
      ['Water', 'Água', ['Água', 'Pão', 'Casa', 'Mesa']],
      ['Dank je', 'Obrigado(a)', ['Desculpe', 'Obrigado(a)', 'Olá', 'Até logo']],
      ['Boek', 'Livro', ['Livro', 'Janela', 'Cadeira', 'Mesa']],
      ['Tot ziens', 'Até logo', ['Bom dia', 'Obrigado', 'Até logo', 'Água']],
      ['Vriend', 'Amigo', ['Cidade', 'Amigo', 'Escola', 'Comida']],
      ['Alsjeblieft', 'Por favor', ['Obrigado', 'Por favor', 'Adeus', 'Olá']],
      ['Appel', 'Maçã', ['Pera', 'Maçã', 'Uva', 'Banana']],
      ['Huis', 'Casa', ['Casa', 'Carro', 'Rua', 'Porta']],
      ['Eten', 'Comida', ['Comida', 'Água', 'Livro', 'Janela']],
      ['Kat', 'Gato', ['Cão', 'Gato', 'Peixe', 'Pássaro']],
      ['Goedemorgen', 'Bom dia', ['Boa noite', 'Bom dia', 'Adeus', 'Obrigado']]
    ],

    ar: [
      ['مرحبا', 'Olá', ['Adeus', 'Olá', 'Obrigado', 'Água']],
      ['ماء', 'Água', ['Livro', 'Água', 'Casa', 'Pão']],
      ['شكرا', 'Obrigado(a)', ['Obrigado(a)', 'Desculpe', 'Bom dia', 'Tchau']],
      ['كتاب', 'Livro', ['Livro', 'Mesa', 'Janela', 'Cadeira']],
      ['مع السلامة', 'Adeus', ['Olá', 'Água', 'Adeus', 'Obrigado']],
      ['صديق', 'Amigo', ['Escola', 'Amigo', 'Cidade', 'Comida']],
      ['من فضلك', 'Por favor', ['Obrigado', 'Por favor', 'Olá', 'Desculpe']],
      ['تفاحة', 'Maçã', ['Pera', 'Maçã', 'Uva', 'Banana']],
      ['منزل', 'Casa', ['Carro', 'Casa', 'Rua', 'Porta']],
      ['طعام', 'Comida', ['Comida', 'Bebida', 'Livro', 'Água']],
      ['قطة', 'Gato', ['Cão', 'Gato', 'Pássaro', 'Peixe']],
      ['صباح الخير', 'Bom dia', ['Boa noite', 'Bom dia', 'Tchau', 'Obrigado']]
    ],

    pt: [
      ['Hello', 'Olá', ['Olá', 'Adeus', 'Obrigado', 'Por favor']],
      ['How are you?', 'Como vai?', ['Como vai?', 'Qual é seu nome?', 'Até logo', 'Bom dia']],
      ['Thank you', 'Obrigado(a)', ['Desculpe', 'Obrigado(a)', 'Boa noite', 'Talvez']],
      ['Good morning', 'Bom dia', ['Boa noite', 'Bom dia', 'Até amanhã', 'Tchau']],
      ['Friend', 'Amigo(a)', ['Família', 'Amigo(a)', 'Escola', 'Cidade']],
      ['Please', 'Por favor', ['Por favor', 'Obrigado', 'Sim', 'Não']],
      ['Water', 'Água', ['Leite', 'Água', 'Pão', 'Livro']],
      ['House', 'Casa', ['Rua', 'Casa', 'Porta', 'Cidade']],
      ['Apple', 'Maçã', ['Pera', 'Uva', 'Maçã', 'Banana']],
      ['Goodbye', 'Adeus', ['Olá', 'Obrigado', 'Adeus', 'Sim']],
      ['Food', 'Comida', ['Comida', 'Bebida', 'Livro', 'Janela']],
      ['Cat', 'Gato', ['Cão', 'Gato', 'Peixe', 'Pássaro']]
    ]
  };

  const UI = {
    'pt-BR': {
      signout: 'Sair',
      choose: 'Vamos escolher seu caminho.',
      study: 'Quero aprender',
      interface: 'Idioma da interface',
      goal: 'Meta diária',
      save: 'Salvar e ver minhas lições',
      course: 'Seu curso',
      configure: '⚙️ Configurar',
      review: 'Fazer revisão',
      learned: 'respostas corretas registradas',
      verify: 'Verificar resposta',
      next: 'Continuar',
      exit: 'Sair da lição',
      welcome: 'Vamos aprender!',
      completed: 'Lição concluída',
      back: 'Voltar para a trilha'
    },
    en: {
      signout: 'Log out',
      choose: 'Let’s choose your path.',
      study: 'I want to learn',
      interface: 'Interface language',
      goal: 'Daily goal',
      save: 'Save and view lessons',
      course: 'Your course',
      configure: '⚙️ Settings',
      review: 'Practice review',
      learned: 'correct answers recorded',
      verify: 'Check answer',
      next: 'Continue',
      exit: 'Leave lesson',
      welcome: 'Let’s learn!',
      completed: 'Lesson complete',
      back: 'Back to course path'
    },
    es: {
      signout: 'Salir',
      choose: 'Elijamos tu camino.',
      study: 'Quiero aprender',
      interface: 'Idioma de la interfaz',
      goal: 'Meta diaria',
      save: 'Guardar y ver lecciones',
      course: 'Tu curso',
      configure: '⚙️ Configuración',
      review: 'Repasar',
      learned: 'respuestas correctas registradas',
      verify: 'Comprobar respuesta',
      next: 'Continuar',
      exit: 'Salir de la lección',
      welcome: '¡Vamos a aprender!',
      completed: 'Lección completada',
      back: 'Volver al curso'
    }
  };

  const safeParse = (raw, fallback) => {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const getUsers = () => safeParse(localStorage.getItem(STORAGE.users), []);
  const getSession = () => safeParse(localStorage.getItem(STORAGE.session), null);
  const getPrefs = () => safeParse(
    localStorage.getItem(STORAGE.prefs),
    { learn: 'en', ui: 'pt-BR', goal: 10 }
  );
  const getProgress = () => safeParse(
    localStorage.getItem(STORAGE.progress),
    { xp: 0, correct: 0, learned: 0, completed: {}, streak: 0, lastStudy: '' }
  );

  const save = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

  let prefs = getPrefs();
  let progress = getProgress();
  let currentQuestion = 0;
  let selectedOption = null;
  let lessonData = [];
  let rightThisLesson = 0;
  let xpStart = 0;
  let reviewMode = false;
  let hearts = 5;

  function fillLanguageSelect(select) {
    if (!select) return;
    select.replaceChildren();

    LANGUAGES.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.code;
      option.textContent = `${lang.flag} ${lang.name} — ${lang.native}`;
      select.appendChild(option);
    });

    select.value = prefs.learn;
  }

  function interfaceSelectValue() {
    ['interfaceLanguage', 'homeInterfaceLanguage'].forEach(id => {
      if ($(id)) $(id).value = prefs.ui;
    });
  }

  function showAuthTab(tab) {
    if (!$('loginForm')) return;

    const login = tab === 'login';
    $('loginForm').classList.toggle('hidden', !login);
    $('registerForm').classList.toggle('hidden', login);
    $('loginTab').classList.toggle('active', login);
    $('registerTab').classList.toggle('active', !login);
    $('loginMessage').textContent = '';
    $('registerMessage').textContent = '';
  }

  function setMessage(id, message, type = 'error') {
    const element = $(id);
    if (!element) return;
    element.textContent = message;
    element.className = `form-message ${type}`;
  }

  function onRegister(event) {
    event.preventDefault();

    const name = $('registerName').value.trim();
    const email = $('registerEmail').value.trim().toLowerCase();
    const password = $('registerPassword').value;

    if (password.length < 4) {
      return setMessage('registerMessage', 'Use pelo menos 4 caracteres.');
    }

    const users = getUsers();

    if (users.some(user => user.email === email)) {
      return setMessage(
        'registerMessage',
        'Já existe uma conta demonstrativa com esse e-mail. Entre nela.'
      );
    }

    users.push({ name, email, password });
    save(STORAGE.users, users);
    save(STORAGE.session, { email, name });
    $('registerForm').reset();
    enterApp(true);
  }

  function onLogin(event) {
    event.preventDefault();

    const email = $('loginEmail').value.trim().toLowerCase();
    const password = $('loginPassword').value;

    const user = getUsers().find(item =>
      item.email === email && item.password === password
    );

    if (!user) {
      return setMessage(
        'loginMessage',
        'Não encontrei essa conta. Confira os dados ou crie uma conta demonstrativa.'
      );
    }

    save(STORAGE.session, { email: user.email, name: user.name });
    enterApp(false);
  }

  function enterApp(firstTime) {
    if ($('authScreen')) $('authScreen').classList.add('hidden');
    if ($('logoutButton')) $('logoutButton').classList.remove('hidden');

    if ($('setupScreen')) {
      $('setupScreen').classList.toggle(
        'hidden',
        !firstTime && Boolean(prefs.configured)
      );
    }

    if ($('homeScreen')) {
      $('homeScreen').classList.toggle(
        'hidden',
        firstTime || !prefs.configured
      );
    }

    if (firstTime || !prefs.configured) {
      showSetup();
    } else {
      renderHome();
    }
  }

  function showSetup() {
    fillLanguageSelect($('learningLanguage'));
    interfaceSelectValue();

    if ($('dailyGoal')) {
      $('dailyGoal').value = String(prefs.goal || 10);
    }

    if ($('setupScreen')) $('setupScreen').classList.remove('hidden');
    if ($('homeScreen')) $('homeScreen').classList.add('hidden');
  }

  function commitSetup() {
    prefs.learn = $('learningLanguage').value;
    prefs.ui = $('interfaceLanguage').value;
    prefs.goal = Number($('dailyGoal').value);
    prefs.configured = true;
    save(STORAGE.prefs, prefs);

    $('setupScreen').classList.add('hidden');
    if ($('homeScreen')) $('homeScreen').classList.remove('hidden');
    renderHome();
  }

  function applyHomeSettings() {
    prefs.learn = $('homeLearningLanguage').value;
    prefs.ui = $('homeInterfaceLanguage').value;
    prefs.configured = true;
    save(STORAGE.prefs, prefs);
    renderHome();
  }

  function renderHome() {
    if (!$('homeScreen')) return;

    const session = getSession();
    const lang = LANGUAGES.find(item => item.code === prefs.learn) || LANGUAGES[0];

    $('welcomeTitle').textContent =
      `${(session?.name || 'Vamos aprender').split(' ')[0]}, ` +
      `${UI[prefs.ui]?.welcome || 'vamos aprender!'}`;

    $('courseTitle').textContent = `${lang.name} • Fundamentos`;
    $('courseFlag').textContent = lang.flag;
    $('statXp').textContent = `${progress.xp} XP`;
    $('statStreak').textContent =
      `${progress.streak || 0} ${progress.streak === 1 ? 'dia' : 'dias'}`;
    $('statCorrect').textContent = progress.correct;
    $('statLearned').textContent = progress.learned;
    $('headerStreak').innerHTML = `🔥 <b>${progress.streak || 0}</b>`;

    fillLanguageSelect($('homeLearningLanguage'));

    if ($('homeLearningLanguage')) {
      $('homeLearningLanguage').value = prefs.learn;
    }

    interfaceSelectValue();

    const path = $('lessonPath');
    path.replaceChildren();

    const done = progress.completed[prefs.learn] || 0;
    const topics = [
      'Primeiras palavras',
      'Cumprimentos',
      'Pessoas e lugares',
      'Comida e objetos',
      'Frases úteis',
      'Revisão final'
    ];

    topics.forEach((topic, index) => {
      const node = document.createElement('button');
      const completed = index < done;
      const unlocked = index <= done;

      node.type = 'button';
      node.className =
        `path-node ${completed ? 'completed' : ''} ${unlocked ? '' : 'locked'}`;
      node.textContent = completed
        ? '✓'
        : (unlocked ? ['▶', 'A', 'B', 'C', 'D', '★'][index] : '🔒');

      node.setAttribute(
        'aria-label',
        `${topic}${unlocked ? ' — iniciar' : ' — bloqueada'}`
      );
      node.title = topic;

      node.addEventListener('click', () => {
        if (!unlocked) {
          node.classList.add('rl-wiggle');
          setTimeout(() => node.classList.remove('rl-wiggle'), 400);
          return;
        }

        startLesson(false);
      });

      const caption = document.createElement('div');
      caption.className = 'path-caption';
      caption.textContent = `${index + 1}. ${topic}`;
      path.append(node, caption);
    });
                          
