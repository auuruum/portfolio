(() => {
  "use strict";

  const email = "aurimasdovgialo@gmail.com";
  const form = document.querySelector("#brief-form");
  const dialog = document.querySelector("#message-dialog");
  const preview = document.querySelector("#message-preview");
  const emailDraft = document.querySelector("#email-draft");
  const submitButton = form.querySelector("[type='submit']");
  const languageButtons = [...document.querySelectorAll("[data-language]")];
  const typeKeys = { mods: "typeMods", website: "typeWebsite", launcher: "typeLauncher", server: "typeServer", bot: "typeBot", full: "typeFull" };
  const textElements = [...document.querySelectorAll("[data-i18n]")];
  const placeholderElements = [...document.querySelectorAll("[data-i18n-placeholder]")];
  const english = Object.fromEntries(textElements.map((element) => [element.dataset.i18n, element.textContent]));
  placeholderElements.forEach((element) => { english[element.dataset.i18nPlaceholder] = element.placeholder; });

  const translations = {
    en: {
      ...english,
      pageTitle: "Work with me · auuruum",
      closeMessage: "Close message",
      emailSubject: "Project inquiry",
      greeting: "Hi Aurimas! I'd like to discuss a project.",
      briefName: "Name / project",
      briefType: "Interested in",
      briefBudget: "Budget",
      briefTimeline: "Timeline",
      copied: "Message copied. You can paste it into your conversation.",
      copyFallback: "The message is selected. Copy it with Ctrl+C or your device’s copy command.",
      emailCopied: "Email address copied.",
      emailFallback: "You can select and copy the email address above.",
      websiteAlt: "BebraLand community website",
      launcherAlt: "BebraLand launcher with profiles and game controls",
    },
    lt: {
      "pageTitle": "Dirbkime kartu · auuruum",
      "closeMessage": "Uždaryti žinutę",
      "skip": "Pereiti prie turinio",
      "navWork": "Darbai",
      "navProcess": "Kaip dirbame",
      "navTalk": "Susisiek",
      "heroEyebrow": "Nepriklausomas programuotojas · Vilnius, LT",
      "heroLineOne": "Tavo idėja.",
      "heroLineTwo": "Kurkime kartu.",
      "heroDescription": "Modifikacija, svetainė ar visas „Minecraft“ projektas. Papasakok, ką sumanei. Padėsiu išsiaiškinti detales ir įgyvendinti idėją.",
      "heroCta": "Aptarkime projektą",
      "heroWork": "Mano darbai",
      "heroNote": "Apimtį, kainą ir terminus suderiname prieš pradėdami.",
      "sceneBuilt": "Tikras projektas iš mano portfolio",
      "sceneLabel": "Viskas veikia kartu.",
      "backPortfolio": "Grįžti į portfolio",
      "capabilitiesEyebrow": "Ką galime sukurti",
      "capabilitiesNote": "Nuo vienos funkcijos iki viso projekto.",
      "typeMods": "Modai ir papildiniai",
      "typeWebsite": "Svetainės",
      "typeLauncher": "Paleidyklės",
      "typeServer": "Serverių paruošimas",
      "typeBot": "Discord botai",
      "typeFull": "Visas projektas",
      "workEyebrow": "Mano darbai / 01",
      "workTitleOne": "Mano sukurta.",
      "workTitleTwo": "Ir jau naudojama.",
      "workDescription": "Mano projektai ir viešai išleisti darbai. Keli pavyzdžiai, ką galėčiau sukurti tavo idėjai.",
      "showWebsite": "Svetainė",
      "showLauncher": "Paleidyklė",
      "workOwned": "Mano paties „Minecraft“ projektas",
      "bebralandDescription": "Bendruomenės svetainė, paleidyklė, serverio dalis ir Discord įrankiai, sujungti į vieną sistemą.",
      "cs2Visual": "Nuo žaidimo serverio iki transliacijos",
      "cs2Title": "Įrankiai turnyrams",
      "cs2Description": "Trys sujungtos esamų projektų atšakos: rungtynių valdymas, žaidimo serveris ir transliacijos HUD naudoja bendrus duomenis.",
      "releasesTitle": "„Minecraft“ modai, kuriuos gali išbandyti.",
      "releasesDescription": "Vieši leidimai, atnaujinimai ir bendruomenės atsiliepimai.",
      "processEyebrow": "Kaip dirbame / 02",
      "processTitleOne": "Pirma pokalbis.",
      "processTitleTwo": "Tada aiškus planas.",
      "processDescription": "Tu papasakoji idėją. Aš užduodu techninius klausimus. Sutariame, ką sukursiu, kiek tai kainuos ir kada bus paruošta.",
      "stepOneTitle": "Papasakok idėją",
      "stepOneDescription": "Keli sakiniai, eskizas ar pavyzdys. Pradėk nuo to, kaip viskas turėtų veikti.",
      "stepOneNote": "Savais žodžiais",
      "stepTwoTitle": "Suderiname detales",
      "stepTwoDescription": "Prieš pradėdami sutariame dėl apimties, kainos, terminų, perduodamų failų ir mokėjimų tvarkos.",
      "stepTwoNote": "Pasiūlymas tavo projektui",
      "stepThreeTitle": "Kūrimas ir peržiūra",
      "stepThreeDescription": "Atlieku sutartus darbus ir parodau eigą. Didesnį projektą galime suskaidyti į atskirus etapus.",
      "stepThreeNote": "Rezultatas, kurį gali patikrinti",
      "stepFourTitle": "Patikra ir perdavimas",
      "stepFourDescription": "Patikriname sutartą rezultatą, užbaigiame likusį mokėjimą ir perduodu failus bei instrukcijas.",
      "stepFourNote": "Galima judėti toliau",
      "agreementNote": "Kiekvieną projektą įvertinu individualiai. Jei eigoje atsiras naujų idėjų, papildomus darbus ir jų kainą suderinsime prieš juos įgyvendindami.",
      "startEyebrow": "Pradėkime nuo idėjos / 03",
      "startTitleOne": "Ką esi",
      "startTitleTwo": "sumanęs?",
      "startDescription": "Pokalbiui pradėti užtenka idėjos. Paruošk trumpą aprašymą arba parašyk man tiesiogiai.",
      "personalNote": "Bendrausi tiesiogiai su manimi.",
      "emailLabel": "Kopijuoti el. paštą",
      "briefEyebrow": "Nuo čia pradedame",
      "typeLabel": "Ką norėtum sukurti?",
      "typeHint": "Pažymėk, kas tinka, arba tiesiog aprašyk idėją žemiau.",
      "ideaLabel": "Papasakok apie idėją",
      "ideaPlaceholder": "Ką norėtum sukurti? Kaip tai turėtų veikti?",
      "nameLabel": "Tavo vardas arba projektas",
      "optional": "nebūtina",
      "namePlaceholder": "Kaip į tave kreiptis?",
      "extraDetails": "Jau žinai biudžetą ar norimą datą?",
      "budgetLabel": "Biudžetas, jei žinomas",
      "budgetPlaceholder": "Suma ar intervalas, arba aptarsime",
      "timelineLabel": "Terminas, jei žinomas",
      "timelinePlaceholder": "Data, renginys arba neskubu",
      "prepareButton": "Paruošti žinutę",
      "formNote": "Prieš siųsdamas peržiūrėsi tekstą. Registruotis nereikia.",
      "faqEyebrow": "Kelios detalės",
      "faqTitle": "Keli atsakymai.",
      "faqPriceQuestion": "Kiek tai kainuos?",
      "faqPriceAnswer": "Kaina priklauso nuo užduoties, jau turimų sprendimų ir reikalingų integracijų. Aptaręs detales, pateiksiu kainą už sutartą darbų apimtį.",
      "faqSpecQuestion": "Ar reikia techninės užduoties?",
      "faqSpecAnswer": "Gali pradėti nuo idėjos, pavyzdžio ar problemos, kurią nori išspręsti. Reikalingas technines detales išsiaiškinsime pokalbio metu.",
      "faqPaymentQuestion": "Kaip vyksta atsiskaitymas?",
      "faqPaymentAnswer": "Mokėjimo būdą ir tvarką sutariame pasiūlyme. Priklausomai nuo projekto, galime numatyti avansą ir likusią sumą arba atskirai apmokamus etapus.",
      "faqHandoverQuestion": "Kas vyksta po perdavimo?",
      "faqHandoverAnswer": "Prieš pradėdami sutariame dėl perdavimo, pirminio kodo, instrukcijų ir klaidų taisymo laikotarpio. Prieglobą, tolesnę priežiūrą ir naujas funkcijas galime aptarti atskirai.",
      "footerNote": "Pradėk nuo idėjos. Detales išsiaiškinsime kartu.",
      "footerPortfolio": "Portfolio",
      "footerLinks": "Visos nuorodos",
      "messageEyebrow": "Taip prasideda pokalbis",
      "messageTitle": "Aprašymas paruoštas.",
      "messageIntro": "Patikrink detales, tada atidaryk el. laiško juodraštį arba nukopijuok tekstą pokalbiui per Telegram. Dar niekas neišsiųsta.",
      "emailDraft": "Atidaryti laiško juodraštį",
      "copyBrief": "Kopijuoti žinutę",
      "telegramAfterCopy": "Nukopijavai? Atidaryti Telegram",
      "emailSubject": "Projekto aptarimas",
      "greeting": "Labas, Aurimai! Norėčiau aptarti projektą.",
      "briefName": "Vardas / projektas",
      "briefType": "Domina",
      "briefBudget": "Biudžetas",
      "briefTimeline": "Terminas",
      "copied": "Žinutė nukopijuota. Gali ją įklijuoti į pokalbį.",
      "copyFallback": "Tekstas pažymėtas. Nukopijuok jį naudodamas „Ctrl+C“ arba įrenginio kopijavimo funkciją.",
      "emailCopied": "El. pašto adresas nukopijuotas.",
      "emailFallback": "Gali pažymėti ir nukopijuoti aukščiau pateiktą el. pašto adresą.",
      "websiteAlt": "„BebraLand“ bendruomenės svetainė",
      "launcherAlt": "„BebraLand“ paleidyklė su profiliais ir žaidimo valdymu"
    },
    ru: {
      pageTitle: "Работа со мной · auuruum",
      closeMessage: "Закрыть сообщение",
      skip: "К содержимому",
      navWork: "Мои работы",
      navProcess: "Как работаем",
      navTalk: "Обсудим?",
      heroEyebrow: "Независимый разработчик · Вильнюс, LT",
      heroLineOne: "Есть идея?",
      heroLineTwo: "Давай создадим.",
      heroDescription: "Мод, сайт или целый Minecraft-проект. Расскажи, что задумал. Я помогу разобраться в деталях и возьмусь за разработку.",
      heroCta: "Обсудить проект",
      heroWork: "Посмотреть работы",
      heroNote: "Объём, стоимость и сроки согласуем до начала работы.",
      sceneBuilt: "Реальный проект из моего портфолио",
      sceneLabel: "Всё работает вместе.",
      backPortfolio: "Вернуться в портфолио",
      capabilitiesEyebrow: "Что можно разработать",
      capabilitiesNote: "От одной функции до целого проекта.",
      typeMods: "Моды и плагины",
      typeWebsite: "Сайты",
      typeLauncher: "Лаунчеры",
      typeServer: "Настройка серверов",
      typeBot: "Discord-боты",
      typeFull: "Проект под ключ",
      workEyebrow: "Мои работы / 01",
      workTitleOne: "То, что я создал.",
      workTitleTwo: "И чем уже пользуются.",
      workDescription: "Собственные проекты и публичные релизы. Несколько примеров того, что я могу сделать для твоей идеи.",
      showWebsite: "Сайт",
      showLauncher: "Лаунчер",
      workOwned: "Мой собственный Minecraft-проект",
      bebralandDescription: "Сайт сообщества, лаунчер, backend и Discord-инструменты, связанные в одну систему.",
      cs2Visual: "От игрового сервера до трансляции",
      cs2Title: "Инструменты для турниров",
      cs2Description: "Три связанных форка: управление матчами, игровой сервер и HUD трансляции используют общие данные.",
      releasesTitle: "Моды, которыми можно пользоваться.",
      releasesDescription: "Публичные релизы, обновления и отзывы сообщества.",
      processEyebrow: "Как работаем / 02",
      processTitleOne: "Сначала разговор.",
      processTitleTwo: "Потом понятный план.",
      processDescription: "Ты рассказываешь идею. Я уточняю технические детали. Вместе определяем результат, стоимость и срок.",
      stepOneTitle: "Расскажи идею",
      stepOneDescription: "Несколько предложений, набросок или пример. Начни с того, как всё должно работать.",
      stepOneNote: "Своими словами",
      stepTwoTitle: "Согласуем детали",
      stepTwoDescription: "До старта определим объём, стоимость, сроки, что передаю и как оплачивается работа.",
      stepTwoNote: "Оценка именно твоей задачи",
      stepThreeTitle: "Разработаем и проверим",
      stepThreeDescription: "Я выполняю согласованную работу и показываю прогресс. Большой проект можно разделить на этапы.",
      stepThreeNote: "Результат можно проверить",
      stepFourTitle: "Передам результат",
      stepFourDescription: "Проверим готовность, закроем оставшуюся оплату и передадим файлы и инструкции.",
      stepFourNote: "Можно двигаться дальше",
      agreementNote: "Каждую задачу оцениваю индивидуально. Если по ходу появятся новые идеи, сначала обсудим дополнительную работу и её стоимость.",
      startEyebrow: "Начнём с идеи / 03",
      startTitleOne: "Что ты",
      startTitleTwo: "задумал?",
      startDescription: "Для первого разговора достаточно идеи. Подготовь короткое описание или напиши мне напрямую.",
      personalNote: "Ты общаешься напрямую со мной.",
      emailLabel: "Скопировать email",
      briefEyebrow: "Отправная точка",
      typeLabel: "Что хочется сделать?",
      typeHint: "Отметь подходящее или просто опиши идею ниже.",
      ideaLabel: "Расскажи об идее",
      ideaPlaceholder: "Что хочешь создать? Как это должно работать?",
      nameLabel: "Твоё имя или название проекта",
      optional: "необязательно",
      namePlaceholder: "Как к тебе обращаться?",
      extraDetails: "Уже есть бюджет или желаемая дата?",
      budgetLabel: "Бюджет, если известен",
      budgetPlaceholder: "Диапазон или обсудим вместе",
      timelineLabel: "Срок, если известен",
      timelinePlaceholder: "Дата, событие или без спешки",
      prepareButton: "Подготовить сообщение",
      formNote: "Перед отправкой ты проверишь текст. Регистрация не нужна.",
      faqEyebrow: "Несколько деталей",
      faqTitle: "Возможно, ты спросишь.",
      faqPriceQuestion: "Сколько это будет стоить?",
      faqPriceAnswer: "Цена зависит от задачи, того, что уже есть, и нужных интеграций. После обсуждения я назову стоимость за согласованный объём работы.",
      faqSpecQuestion: "Нужно ли техническое задание?",
      faqSpecAnswer: "Начать можно с идеи, примера или проблемы, которую хочется решить. Нужные технические детали я уточню в разговоре.",
      faqPaymentQuestion: "Как проходит оплата?",
      faqPaymentAnswer: "Способ и порядок оплаты фиксируем в предложении. В зависимости от проекта можно согласовать аванс и остаток либо отдельно оплачиваемые этапы.",
      faqHandoverQuestion: "Что будет после сдачи?",
      faqHandoverAnswer: "До начала работы согласуем передачу, исходники, инструкции и период исправления ошибок. Хостинг, дальнейшую поддержку и новые функции можно обсудить отдельно.",
      footerNote: "Начни с идеи. С деталями разберёмся вместе.",
      footerPortfolio: "Портфолио",
      footerLinks: "Все ссылки",
      messageEyebrow: "С этого начинается разговор",
      messageTitle: "Описание готово.",
      messageIntro: "Проверь детали, затем открой черновик письма или скопируй текст для Telegram. Пока ничего не отправлено.",
      emailDraft: "Открыть черновик письма",
      copyBrief: "Скопировать сообщение",
      telegramAfterCopy: "Скопировал? Открыть Telegram",
      emailSubject: "Обсуждение проекта",
      greeting: "Привет, Aurimas! Хочу обсудить проект.",
      briefName: "Имя / проект",
      briefType: "Интересует",
      briefBudget: "Бюджет",
      briefTimeline: "Срок",
      copied: "Сообщение скопировано. Можно вставить его в переписку.",
      copyFallback: "Текст выделен. Скопируй его через Ctrl+C или команду копирования на устройстве.",
      emailCopied: "Email скопирован.",
      emailFallback: "Можно выделить и скопировать email выше.",
      websiteAlt: "Сайт Minecraft-сообщества BebraLand",
      launcherAlt: "Лаунчер BebraLand с профилями и управлением игрой",
    },
  };

  let language = "en";
  let currentBrief = "";
  let currentShowcase = "website";
  const t = (key) => translations[language][key] ?? translations.en[key] ?? key;

  function buildBrief() {
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const idea = String(data.get("idea") || "").trim();
    const budget = String(data.get("budget") || "").trim();
    const timeline = String(data.get("timeline") || "").trim();
    const types = data.getAll("type").map((type) => t(typeKeys[type])).join(", ");
    const lines = [t("greeting")];
    if (name) lines.push(`${t("briefName")}: ${name}`);
    if (types) lines.push(`${t("briefType")}: ${types}`);
    lines.push("", idea);
    if (budget || timeline) lines.push("");
    if (budget) lines.push(`${t("briefBudget")}: ${budget}`);
    if (timeline) lines.push(`${t("briefTimeline")}: ${timeline}`);
    currentBrief = lines.join("\n");
    preview.textContent = currentBrief;
    const query = new URLSearchParams({ view: "cm", fs: "1", to: email, su: t("emailSubject") + (name ? ` · ${name}` : ""), body: currentBrief });
    emailDraft.href = `https://mail.google.com/mail/?${query}`;
  }

  function setLanguage(nextLanguage) {
    if (!Object.hasOwn(translations, nextLanguage)) return;
    language = nextLanguage;
    document.documentElement.lang = language;
    document.title = t("pageTitle");
    document.querySelector("#close-message").setAttribute("aria-label", t("closeMessage"));
    textElements.forEach((element) => { element.textContent = t(element.dataset.i18n); });
    placeholderElements.forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
    languageButtons.forEach((button) => { button.setAttribute("aria-pressed", String(button.dataset.language === language)); });
    document.querySelector("#showcase-image").alt = t(currentShowcase === "website" ? "websiteAlt" : "launcherAlt");
    document.querySelector("#contact-status").textContent = "";
    document.querySelector("#message-status").textContent = "";
    if (dialog.open) buildBrief();
    try { localStorage.setItem("auuruum-work-language", language); } catch { /* Language switching also works without storage. */ }
  }

  languageButtons.forEach((button) => button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    try { history.replaceState(null, "", url); } catch { /* Local-file browsers may limit history changes. */ }
  }));
  let initialLanguage = new URLSearchParams(window.location.search).get("lang");
  if (!initialLanguage) {
    try { initialLanguage = localStorage.getItem("auuruum-work-language"); } catch { /* The English default matches the portfolio. */ }
  }
  setLanguage(Object.hasOwn(translations, initialLanguage) ? initialLanguage : "en");

  document.querySelectorAll("[data-project]").forEach((link) => {
    link.addEventListener("click", () => {
      const input = [...form.querySelectorAll("input[name='type']")].find((item) => item.value === link.dataset.project);
      if (input) input.checked = true;
    });
  });

  const showcaseSources = {
    website: "../assets/bebraland/bebraland-home.png",
    launcher: "../assets/bebraland/bebraland-launcher-home.png",
  };
  document.querySelectorAll("[data-showcase]").forEach((button) => {
    button.addEventListener("click", () => {
      currentShowcase = button.dataset.showcase;
      const image = document.querySelector("#showcase-image");
      image.src = showcaseSources[currentShowcase];
      image.alt = t(currentShowcase === "website" ? "websiteAlt" : "launcherAlt");
      document.querySelectorAll("[data-showcase]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const idea = form.elements.idea;
    if (!idea.value.trim()) {
      idea.value = "";
      idea.reportValidity();
      return;
    }
    if (!form.reportValidity()) return;
    buildBrief();
    document.querySelector("#message-status").textContent = "";
    dialog.showModal();
  });
  submitButton.disabled = false;

  document.querySelector("#close-message").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

  document.querySelector("#copy-brief").addEventListener("click", async () => {
    const status = document.querySelector("#message-status");
    try {
      await navigator.clipboard.writeText(currentBrief);
      status.textContent = t("copied");
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(preview);
      selection?.removeAllRanges();
      selection?.addRange(range);
      preview.focus();
      status.textContent = t("copyFallback");
    }
  });

  document.querySelector("#copy-email").addEventListener("click", async () => {
    const status = document.querySelector("#contact-status");
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = t("emailCopied");
    } catch {
      status.textContent = t("emailFallback");
    }
  });

  const header = document.querySelector("#header");
  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("can-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
  }
})();
