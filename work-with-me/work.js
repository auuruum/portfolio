(() => {
  "use strict";
  function initializeWork({ signal, onCleanup }) {

    const email = "aurimasdovgialo@gmail.com";
    const form = document.querySelector("#brief-form");
    const dialog = document.querySelector("#message-dialog");
    const preview = document.querySelector("#message-preview");
    const emailDraft = document.querySelector("#email-draft");
    const submitButton = form.querySelector("[type='submit']");
    const languageButtons = [...document.querySelectorAll("[data-language]")];
    const typeKeys = { mods: "typeMods", website: "typeWebsite", launcher: "typeLauncher", server: "typeServer", bot: "typeBot", full: "typeFull", fix: "typeFix" };
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
        discordCopied: "Discord username copied.",
        discordFallback: "Discord: auuruum — select and copy this username.",
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
        "discordLabel": "Kopijuoti Discord",
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
        "discordCopied": "Discord vardas nukopijuotas.",
        "discordFallback": "Discord: auuruum — pažymėk ir nukopijuok šį vardą.",
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
        discordLabel: "Скопировать Discord",
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
        discordCopied: "Ник Discord скопирован.",
        discordFallback: "Discord: auuruum — выдели и скопируй этот ник.",
        websiteAlt: "Сайт Minecraft-сообщества BebraLand",
        launcherAlt: "Лаунчер BebraLand с профилями и управлением игрой",
      },
    };

    const pricingTranslations = {
      en: {
        pricingScopeTitle: "How much should it do?",
        pricingOne: "One small feature",
        pricingOneHint: "A focused, simple task.",
        pricingFew: "A few simple features",
        pricingFewHint: "A small set of related actions.",
        pricingFixTitle: "What needs changing?",
        pricingFixOne: "One small fix",
        pricingFixOneHint: "A focused change in an existing project.",
        pricingFixFew: "A few small fixes",
        pricingFixFewHint: "Several closely related adjustments.",
        pricingFullTitle: "What kind of project?",
        pricingFullOne: "A small launch using existing tools",
        pricingFullOneHint: "Start with ready-made components and my existing work.",
        pricingFullFew: "A new custom system",
        pricingFullFewHint: "New architecture, complex features or a larger ecosystem.",
        pricingOneOff: "One-off development",
        pricingStarting: "Starting budget · scope to confirm",
        pricingReview: "Scope to confirm",
        pricingQuote: "Let’s discuss",
        pricingModsNote: "A simple mod or plugin for one Minecraft version and platform.",
        pricingBotNote: "A simple bot for one Discord server, with basic commands or automation.",
        pricingFixNote: "Small, clearly defined changes in an existing project. I’ll check the code first.",
        pricingFullNote: "An initial budget for a small launch using existing tools. The selected parts are a wishlist; we agree what fits before starting.",
        pricingWebsiteNote: "Tell me about the pages, design and features. I’ll estimate your website after a short discussion.",
        pricingServerNote: "Tell me about the server, plugins and setup you need. I’ll check the scope before quoting.",
        pricingLauncherNote: "Platforms, accounts, updates and backend needs change the scope. Let’s work out your launcher first.",
        pricingReviewNote: "This goes beyond the simple setup. I’ll check the details and give you a separate quote.",
        pricingReference: "For reference, simple tasks: {range}.",
        pricingFullReference: "Small launches start with a {range} budget; the complete scope needs a quote.",
        pricingDiscuss: "Discuss this project",
        pricingBrief: "Calculator selection",
        pricingBriefScope: "Scope",
        pricingBriefParts: "Parts to discuss",
        pricingBriefExtras: "Additional requirements",
        pricingBriefNote: "Preliminary guide only. Covers this calculator selection, not every item in the inquiry. Final scope and price to be agreed; hosting, domains, paid services and maintenance are separate.",
      },
      ru: {
        heroPricing: "Прикинуть стоимость",
        typeFix: "Небольшие доработки",
        pricingEyebrow: "Прикинем бюджет",
        pricingTitleOne: "Твоя идея.",
        pricingTitleTwo: "Понятный ориентир.",
        pricingDescription: "Несколько ответов помогут понять порядок цен. Контакты оставлять не нужно. Итоговые объём и стоимость согласуем вместе.",
        pricingChoices: "Параметры проекта для расчёта",
        pricingService: "Что нужно сделать?",
        pricingScopeTitle: "Какой объём задуман?",
        pricingOne: "Одна небольшая функция",
        pricingOneHint: "Простая задача с понятным результатом.",
        pricingFew: "Несколько простых функций",
        pricingFewHint: "Небольшой набор связанных действий.",
        pricingFixTitle: "Что нужно доработать?",
        pricingFixOne: "Одно небольшое исправление",
        pricingFixOneHint: "Конкретная правка в существующем проекте.",
        pricingFixFew: "Несколько небольших правок",
        pricingFixFewHint: "Несколько тесно связанных изменений.",
        pricingFullTitle: "Какой проект планируешь?",
        pricingFullOne: "Небольшой запуск на готовой основе",
        pricingFullOneHint: "Используем готовые компоненты и мои наработки.",
        pricingFullFew: "Новая система с нуля",
        pricingFullFewHint: "Новая архитектура, сложные функции или большая экосистема.",
        pricingCustom: "Что-то большее / пока не знаю",
        pricingCustomHint: "Разберёмся с объёмом вместе.",
        pricingComponents: "Какие части ты рассматриваешь?",
        pricingExtras: "Нужно что-то ещё?",
        pricingIntegration: "База данных, внешний сервис, веб-панель или платежи",
        pricingPlatforms: "Несколько версий игры, платформ или Discord-серверов",
        pricingExtrasHint: "Для оценки таких задач сначала уточним детали.",
        pricingEstimate: "Ориентировочный бюджет разработки",
        pricingOneOff: "Разовая разработка",
        pricingStarting: "Стартовый бюджет · объём уточним",
        pricingReview: "Нужно уточнить объём",
        pricingQuote: "Давай обсудим",
        pricingModsNote: "Простой мод или плагин для одной версии Minecraft и одной платформы.",
        pricingBotNote: "Простой бот для одного Discord-сервера: базовые команды или автоматизация.",
        pricingFixNote: "Небольшие, чётко определённые доработки существующего проекта. Сначала посмотрю код.",
        pricingFullNote: "Стартовый бюджет небольшого запуска на готовой основе. Выбранные части — пожелания: до начала согласуем, что войдёт в работу.",
        pricingWebsiteNote: "Расскажи о страницах, дизайне и функциях. После короткого обсуждения оценю твой сайт.",
        pricingServerNote: "Расскажи о сервере, плагинах и нужных настройках. Уточню объём и назову стоимость.",
        pricingLauncherNote: "Платформы, аккаунты, обновления и backend влияют на объём. Сначала разберём твой лаунчер.",
        pricingReviewNote: "Это выходит за рамки простой задачи. Уточню детали и предложу отдельную стоимость.",
        pricingReference: "Для ориентира: простые задачи — {range}.",
        pricingFullReference: "Для небольшого запуска ориентир — {range}; полную стоимость определим по составу.",
        pricingIncluded: "В согласованную работу входят",
        pricingIncludedBuild: "Разработка и проверка",
        pricingIncludedFiles: "Исходники и инструкция запуска",
        pricingUse: "Обсудить этот вариант",
        pricingDiscuss: "Обсудить проект",
        pricingFootnote: "Предварительный ориентир. Объём и итоговую стоимость согласуем до начала. Хостинг, домены, платные сервисы и дальнейшая поддержка — отдельно.",
        pricingAttached: "Расчёт добавлен к сообщению",
        pricingRemove: "Убрать",
        pricingBrief: "Выбор в калькуляторе",
        pricingBriefScope: "Объём",
        pricingBriefParts: "Части для обсуждения",
        pricingBriefExtras: "Дополнительные требования",
        pricingBriefNote: "Предварительный ориентир только для выбранного варианта в калькуляторе, а не всей заявки. Объём и итоговую цену ещё согласуем; хостинг, домены, платные сервисы и поддержка — отдельно.",
        faqPriceAnswer: "Начальный бюджет можно прикинуть в калькуляторе выше. Для простых модов, плагинов и ботов ориентир — 30–50 €, для небольших доработок — 15–25 €. Итоговая стоимость зависит от согласованного объёма и нужных интеграций.",
      },
      lt: {
        heroPricing: "Įvertinti biudžetą",
        typeFix: "Nedideli pakeitimai",
        pricingEyebrow: "Trumpas biudžeto įvertinimas",
        pricingTitleOne: "Tavo idėja.",
        pricingTitleTwo: "Pradinė kaina.",
        pricingDescription: "Keli pasirinkimai padės suprasti biudžetą. Kontaktų palikti nereikia. Galutinę apimtį ir kainą suderinsime kartu.",
        pricingChoices: "Projekto duomenys kainai įvertinti",
        pricingService: "Ką reikia sukurti?",
        pricingScopeTitle: "Kokia darbų apimtis?",
        pricingOne: "Viena nedidelė funkcija",
        pricingOneHint: "Paprasta užduotis su aiškiu rezultatu.",
        pricingFew: "Kelios paprastos funkcijos",
        pricingFewHint: "Nedidelis susijusių veiksmų rinkinys.",
        pricingFixTitle: "Ką reikia pakeisti?",
        pricingFixOne: "Vienas nedidelis pataisymas",
        pricingFixOneHint: "Konkretus esamo projekto pakeitimas.",
        pricingFixFew: "Keli nedideli pataisymai",
        pricingFixFewHint: "Keli glaudžiai susiję pakeitimai.",
        pricingFullTitle: "Kokį projektą planuoji?",
        pricingFullOne: "Nedidelis startas su esamais įrankiais",
        pricingFullOneHint: "Naudojame paruoštus komponentus ir mano turimus sprendimus.",
        pricingFullFew: "Nauja individuali sistema",
        pricingFullFewHint: "Nauja architektūra, sudėtingos funkcijos ar didesnė ekosistema.",
        pricingCustom: "Didesnis projektas / dar nežinau",
        pricingCustomHint: "Apimtį išsiaiškinsime kartu.",
        pricingComponents: "Kokias dalis svarstai?",
        pricingExtras: "Ar reikės ko nors papildomai?",
        pricingIntegration: "Duomenų bazė, išorinė paslauga, valdymo skydas ar mokėjimai",
        pricingPlatforms: "Kelios žaidimo versijos, platformos ar Discord serveriai",
        pricingExtrasHint: "Prieš įvertinant tokias užduotis reikia aptarti detales.",
        pricingEstimate: "Preliminarus kūrimo biudžetas",
        pricingOneOff: "Vienkartinis kūrimas",
        pricingStarting: "Pradinis biudžetas · apimtį suderinsime",
        pricingReview: "Reikia patikslinti apimtį",
        pricingQuote: "Aptarkime",
        pricingModsNote: "Paprastas modas ar papildinys vienai Minecraft versijai ir platformai.",
        pricingBotNote: "Paprastas botas vienam Discord serveriui: pagrindinės komandos ar automatizavimas.",
        pricingFixNote: "Nedideli, aiškiai apibrėžti esamo projekto pakeitimai. Pirmiausia peržiūrėsiu kodą.",
        pricingFullNote: "Pradinis nedidelio projekto biudžetas naudojant esamus įrankius. Pasirinktos dalys yra pageidavimai; prieš pradėdami sutarsime, kas įeina į darbą.",
        pricingWebsiteNote: "Papasakok apie puslapius, dizainą ir funkcijas. Po trumpo pokalbio įvertinsiu tavo svetainę.",
        pricingServerNote: "Papasakok apie serverį, papildinius ir nustatymus. Patikslinsiu apimtį ir pateiksiu kainą.",
        pricingLauncherNote: "Platformos, paskyros, atnaujinimai ir serverio dalis keičia apimtį. Pirmiausia aptarkime paleidyklę.",
        pricingReviewNote: "Tai viršija paprastos užduoties apimtį. Aptarsiu detales ir pateiksiu atskirą pasiūlymą.",
        pricingReference: "Orientyrui: paprastos užduotys — {range}.",
        pricingFullReference: "Nedidelio starto biudžeto orientyras — {range}; visą kainą lems suderinta apimtis.",
        pricingIncluded: "Į suderintą darbą įeina",
        pricingIncludedBuild: "Kūrimas ir patikra",
        pricingIncludedFiles: "Išeities failai ir paleidimo instrukcija",
        pricingUse: "Aptarti šį variantą",
        pricingDiscuss: "Aptarti projektą",
        pricingFootnote: "Preliminarus orientyras. Apimtį ir galutinę kainą suderinsime prieš pradėdami. Hostingas, domenai, mokamos paslaugos ir tolesnė priežiūra — atskirai.",
        pricingAttached: "Įvertinimas pridėtas prie žinutės",
        pricingRemove: "Pašalinti",
        pricingBrief: "Skaičiuoklės pasirinkimas",
        pricingBriefScope: "Apimtis",
        pricingBriefParts: "Dalys aptarimui",
        pricingBriefExtras: "Papildomi reikalavimai",
        pricingBriefNote: "Preliminarus orientyras tik šiam skaičiuoklės pasirinkimui, ne visai užklausai. Apimtį ir galutinę kainą dar suderinsime; hostingas, domenai, mokamos paslaugos ir priežiūra — atskirai.",
        faqPriceAnswer: "Pradinį biudžetą gali įvertinti skaičiuoklėje aukščiau. Paprastų modų, papildinių ir botų orientyras — 30–50 €, nedidelių pakeitimų — 15–25 €. Galutinė kaina priklauso nuo suderintos apimties ir integracijų.",
      },
    };
    pricingTranslations.en.faqPriceAnswer = "Use the calculator above for a starting budget. Simple mods, plugins and bots are typically €30–50; small changes are €15–25. The final price depends on the agreed scope and integrations.";
    for (const [locale, copy] of Object.entries(pricingTranslations)) Object.assign(translations[locale], copy);

    // Only agreed price bands are automatic. Unpriced or complex work needs a quote.
    const pricingServices = {
      mods: { one: [30, 40], few: [40, 50], reference: [30, 50], note: "pricingModsNote" },
      bot: { one: [30, 40], few: [40, 50], reference: [30, 50], note: "pricingBotNote" },
      fix: { one: [15, 20], few: [20, 25], reference: [15, 25], note: "pricingFixNote" },
      full: { one: [200, 300], reference: [200, 300], note: "pricingFullNote" },
      website: { note: "pricingWebsiteNote" },
      server: { note: "pricingServerNote" },
      launcher: { note: "pricingLauncherNote" },
    };
    const serviceInput = document.querySelector("#estimate-service");
    const scopeInputs = [...document.querySelectorAll("input[name='estimate-scope']")];
    const partInputs = [...document.querySelectorAll("#estimate-components input")];
    const integrationInput = document.querySelector("#estimate-integrations");
    const platformsInput = document.querySelector("#estimate-platforms");
    const attachedEstimate = document.querySelector("#pricing-brief-data");
    let currentEstimate;
    let language = "en";
    let currentBrief = "";
    let currentShowcase = "website";
    const t = (key) => translations[language][key] ?? translations.en[key] ?? key;

    const formatRange = ([low, high]) => `€${low}–${high}`;
    function scopeKeys(service) {
      if (service === "fix") return ["pricingFixTitle", "pricingFixOne", "pricingFixOneHint", "pricingFixFew", "pricingFixFewHint"];
      if (service === "full") return ["pricingFullTitle", "pricingFullOne", "pricingFullOneHint", "pricingFullFew", "pricingFullFewHint"];
      return ["pricingScopeTitle", "pricingOne", "pricingOneHint", "pricingFew", "pricingFewHint"];
    }
    function estimateValue() {
      return currentEstimate.range ? formatRange(currentEstimate.range) : t("pricingQuote");
    }
    function estimateBadge() {
      return t(currentEstimate.range ? (currentEstimate.service === "full" ? "pricingStarting" : "pricingOneOff") : "pricingReview");
    }
    function updateAttachedEstimate() {
      document.querySelector("#brief-estimate").hidden = !attachedEstimate.value;
      document.querySelector("#brief-estimate-summary").textContent = attachedEstimate.value
        ? `${t(typeKeys[currentEstimate.service])} · ${estimateValue()} · ${estimateBadge()}` : "";
    }
    function renderEstimate() {
      if (!Object.hasOwn(pricingServices, serviceInput.value)) serviceInput.value = "mods";
      const service = serviceInput.value;
      const config = pricingServices[service];
      const scope = scopeInputs.find((input) => input.checked)?.value || "one";
      const parts = service === "full" ? partInputs.filter((input) => input.checked).map((input) => input.value) : [];
      const extras = [];
      if (integrationInput.checked) extras.push("pricingIntegration");
      if (platformsInput.checked) extras.push("pricingPlatforms");
      const range = extras.length || parts.includes("launcher") ? null : config[scope] || null;
      currentEstimate = { service, scope, parts, extras, range, reference: config.reference };
      document.querySelector("#estimate-scope").hidden = !config.reference;
      document.querySelector("#estimate-components").hidden = service !== "full";
      const scopeIds = ["title", "one-label", "one-hint", "few-label", "few-hint"];
      scopeKeys(service).forEach((key, index) => { document.querySelector(`#estimate-scope-${scopeIds[index]}`).textContent = t(key); });
      document.querySelector("#estimate-price").textContent = estimateValue();
      document.querySelector("#estimate-badge").textContent = estimateBadge();
      document.querySelector(".pricing-result").dataset.review = String(!range);
      document.querySelector("#estimate-summary").textContent = t(!range && config.reference ? "pricingReviewNote" : config.note);
      const reference = document.querySelector("#estimate-reference");
      reference.hidden = Boolean(range || !config.reference);
      reference.textContent = config.reference
        ? t(service === "full" ? "pricingFullReference" : "pricingReference").replace("{range}", formatRange(config.reference)) : "";
      document.querySelector("#estimate-cta-label").textContent = t(range ? "pricingUse" : "pricingDiscuss");
      updateAttachedEstimate();
    }
    function calculatorBrief() {
      const { service, scope, parts, extras, reference } = currentEstimate;
      const lines = [`${t("pricingBrief")}: ${t(typeKeys[service])}`];
      if (reference) {
        const keys = scopeKeys(service);
        lines.push(`${t("pricingBriefScope")}: ${t(scope === "custom" ? "pricingCustom" : keys[scope === "one" ? 1 : 3])}`);
      }
      if (parts.length) lines.push(`${t("pricingBriefParts")}: ${parts.map((part) => t(typeKeys[part])).join(", ")}`);
      if (extras.length) lines.push(`${t("pricingBriefExtras")}: ${extras.map(t).join("; ")}`);
      lines.push(`${t("pricingEstimate")}: ${estimateValue()} (${estimateBadge()})`);
      if (!currentEstimate.range && reference) lines.push(t(service === "full" ? "pricingFullReference" : "pricingReference").replace("{range}", formatRange(reference)));
      lines.push(t("pricingBriefNote"));
      return lines;
    }
    function resetScope() {
      scopeInputs.forEach((input) => { input.checked = input.value === "one"; });
      integrationInput.checked = false;
      platformsInput.checked = false;
      partInputs.forEach((input) => { input.checked = false; });
    }
    function selectService(service) {
      const previousService = currentEstimate.service;
      serviceInput.value = service;
      resetScope();
      renderEstimate();
      if (attachedEstimate.value) {
        form.querySelector(`input[name='type'][value='${previousService}']`).checked = false;
        form.querySelector(`input[name='type'][value='${currentEstimate.service}']`).checked = true;
      }
    }

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
      if (attachedEstimate.value) lines.push("", ...calculatorBrief());
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
      renderEstimate();
      if (dialog.open) buildBrief();
      try { localStorage.setItem("auuruum-work-language", language); } catch { /* Language switching also works without storage. */ }
    }

    languageButtons.forEach((button) => button.addEventListener("click", () => {
      setLanguage(button.dataset.language);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", language);
      try { history.replaceState(history.state, "", url); } catch { /* Local-file browsers may limit history changes. */ }
    }));
    let initialLanguage = new URLSearchParams(window.location.search).get("lang");
    if (!initialLanguage) {
      try { initialLanguage = localStorage.getItem("auuruum-work-language"); } catch { /* The English default matches the portfolio. */ }
    }
    setLanguage(Object.hasOwn(translations, initialLanguage) ? initialLanguage : "en");

    document.querySelectorAll("[data-project]").forEach((link) => {
      link.addEventListener("click", () => {
        selectService(link.dataset.project);
      });
    });

    serviceInput.addEventListener("change", () => selectService(serviceInput.value));
    for (const input of [...scopeInputs, ...partInputs, integrationInput, platformsInput]) input.addEventListener("change", renderEstimate);
    document.querySelector("#use-estimate").addEventListener("click", () => {
      attachedEstimate.value = "attached";
      form.querySelector(`input[name='type'][value='${currentEstimate.service}']`).checked = true;
      updateAttachedEstimate();
    });
    document.querySelector("#remove-estimate").addEventListener("click", () => {
      attachedEstimate.value = "";
      updateAttachedEstimate();
      document.querySelector("#project-idea").focus({ preventScroll: true });
    });
    form.querySelectorAll("input[name='type']").forEach((input) => input.addEventListener("change", () => {
      if (input.value === currentEstimate.service && !input.checked) {
        attachedEstimate.value = "";
        updateAttachedEstimate();
      }
    }));
    document.querySelector("#pricing-controls").disabled = false;

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

    const contactStatus = document.querySelector("#contact-status");
    for (const [selector, value, copied, fallback] of [
      ["#copy-email", email, "emailCopied", "emailFallback"],
      ["#copy-discord", "auuruum", "discordCopied", "discordFallback"],
    ]) {
      document.querySelector(selector).addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(value);
          contactStatus.textContent = t(copied);
        } catch {
          contactStatus.textContent = t(fallback);
        }
      });
    }

    const header = document.querySelector("#header");
    const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 30);
    window.addEventListener("scroll", updateHeader, { passive: true, signal });
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
      onCleanup(() => observer.disconnect());
    }
  }
  if (window.PortfolioTransitions) window.PortfolioTransitions.register("work", initializeWork);
  else initializeWork({ signal: new AbortController().signal, onCleanup() {} });
})();
