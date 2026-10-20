(() => {
  "use strict";
  function initializeWork({ signal, onCleanup }) {

    const email = "aurimasdovgialo@gmail.com";
    const form = document.querySelector("#brief-form");
    const dialog = document.querySelector("#message-dialog");
    const preview = document.querySelector("#message-preview");
    const emailDraft = document.querySelector("#email-draft");
    const telegramDraft = document.querySelector("#telegram-draft");
    const telegramDraftHint = document.querySelector("#telegram-draft-hint");
    let telegramNeedsCopy = false;
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
        discordBriefCopied: "Message copied. Open a chat with auuruum in Discord and paste it there.",
        telegramCopy: "Copy & open chat",
        telegramBriefCopied: "Full message copied. Paste it into Telegram; long messages may need to be sent in parts.",
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
        "heroLayersProject": "Mano Minecraft projektas",
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
        "messageIntro": "Patikrink detales ir pasirink, kur tęsti pokalbį.",
        "emailDraft": "Atidaryti Gmail juodraštį",
        "telegramDraft": "Atidaryti pokalbį su tekstu",
        "telegramCopy": "Kopijuoti ir atidaryti pokalbį",
        "discordDraft": "Kopijuoti ir atidaryti profilį",
        "discordPasteHint": "Discord: įklijuok nukopijuotą žinutę į pokalbį su auuruum.",
        "messageSendNote": "Žinutę peržiūrėsi ir išsiųsi pats.",
        "copyBrief": "Kopijuoti žinutę",
        "emailSubject": "Projekto aptarimas",
        "greeting": "Labas, Aurimai! Norėčiau aptarti projektą.",
        "briefName": "Vardas / projektas",
        "briefType": "Domina",
        "briefBudget": "Biudžetas",
        "briefTimeline": "Terminas",
        "copied": "Žinutė nukopijuota. Gali ją įklijuoti į pokalbį.",
        "discordBriefCopied": "Žinutė nukopijuota. Atidaryk Discord pokalbį su auuruum ir įklijuok ją.",
        "telegramBriefCopied": "Visa žinutė nukopijuota. Įklijuok ją į Telegram; ilgą žinutę gali tekti siųsti dalimis.",
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
        heroLayersProject: "Мой Minecraft-проект",
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
        messageIntro: "Проверь детали и выбери, где продолжить разговор.",
        emailDraft: "Открыть черновик в Gmail",
        telegramDraft: "Открыть чат с текстом",
        telegramCopy: "Скопировать и открыть чат",
        discordDraft: "Скопировать и открыть профиль",
        discordPasteHint: "Discord: вставь скопированное сообщение в чат с auuruum.",
        messageSendNote: "Ты сам проверишь и отправишь сообщение.",
        copyBrief: "Скопировать сообщение",
        emailSubject: "Обсуждение проекта",
        greeting: "Привет, Aurimas! Хочу обсудить проект.",
        briefName: "Имя / проект",
        briefType: "Интересует",
        briefBudget: "Бюджет",
        briefTimeline: "Срок",
        copied: "Сообщение скопировано. Можно вставить его в переписку.",
        discordBriefCopied: "Сообщение скопировано. Открой чат с auuruum в Discord и вставь его туда.",
        telegramBriefCopied: "Сообщение скопировано целиком. Вставь его в Telegram; длинный текст может понадобиться отправить частями.",
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
      "en": {
        "pricingScopeTitle": "Which scope sounds closest?",
        "pricingOne": "Small mod",
        "pricingFew": "Medium mod",
        "pricingFixTitle": "What needs changing?",
        "pricingFixOne": "Small, defined change",
        "pricingFixOneHint": "One clear adjustment in existing code, after a code review.",
        "pricingFixFew": "Several related changes",
        "pricingFixFewHint": "Several changes, quoted after reviewing the existing code.",
        "pricingFullTitle": "What kind of project?",
        "pricingFullOne": "A small launch using existing tools",
        "pricingFullOneHint": "A limited launch using an agreed selection of existing components.",
        "pricingFullFew": "A new custom system",
        "pricingFullFewHint": "A larger project built around your requirements. Individually quoted.",
        "pricingOneOff": "One-off development",
        "pricingStarting": "Starting budget · scope to confirm",
        "pricingReview": "Scope to confirm",
        "pricingQuote": "Let’s discuss",
        "pricingModsNote": "For one agreed Minecraft version and platform. Scope and any required assets are agreed before starting.",
        "pricingBotNote": "A small Discord bot for one server, with the scope agreed before starting. Hosting and ongoing running costs are separate.",
        "pricingFixNote": "One small, clearly defined change. I’ll review the existing code first; diagnosis or a larger repair needs a separate quote.",
        "pricingFullNote": "€200–300 is a starting budget for a limited launch using existing components. The selected parts are requests to discuss; only the agreed scope is included, not a whole custom ecosystem.",
        "pricingWebsiteNote": "One responsive page using a familiar starting layout. You supply the text and images; custom design, content creation, extra languages and interactive services need a separate quote.",
        "pricingServerNote": "Basic configuration of one server using existing plugins. Hosting, paid plugins, maps and custom development are separate.",
        "pricingLauncherNote": "Launchers are individually quoted after discussing the existing base, target platforms, accounts and update system.",
        "pricingReviewNote": "These requirements need a separate quote. I’ll review the scope and any existing code before confirming the price.",
        "pricingReference": "Basic scope before additional requirements: {range}. This is not the quote for this selection.",
        "pricingFullReference": "A limited launch starts with a {range} budget. The selected components need a separate scope and quote.",
        "pricingDiscuss": "Discuss this project",
        "pricingBrief": "Calculator selection",
        "pricingBriefScope": "Scope",
        "pricingBriefParts": "Parts to discuss",
        "pricingBriefExtras": "Additional requirements",
        "pricingBriefNote": "Preliminary guide only. Covers this calculator selection, not every item in the inquiry. Final scope and price to be agreed; third-party costs and ongoing maintenance are separate.",
        "typeMods": "Minecraft mods & plugins",
        "pricingDescription": "Choose a service and the closest scope. These are budget guides; we agree the exact work and final price before starting.",
        "pricingComplex": "Large mod",
        "pricingCustom": "Not sure — help me estimate",
        "pricingCustomHint": "Describe the idea; I’ll help work out the scope.",
        "pricingBotOne": "Simple Discord bot",
        "pricingBotOneHint": "A compact bot for one Discord server.",
        "pricingBotFew": "Advanced Discord bot",
        "pricingBotFewHint": "A larger bot with more extensive functionality. Individually quoted.",
        "pricingWebsiteTitle": "What kind of website?",
        "pricingWebsiteOne": "One-page website",
        "pricingWebsiteOneHint": "A familiar starting layout, responsive build and your supplied text and images.",
        "pricingWebsiteFew": "Small website",
        "pricingWebsiteFewHint": "A few pages in one style, using your supplied text and images.",
        "pricingWebsiteComplex": "Custom web application",
        "pricingWebsiteComplexHint": "Accounts, dashboards, payments or complex integrations. Individually quoted.",
        "pricingServerTitle": "How much setup do you need?",
        "pricingServerOne": "Basic server setup",
        "pricingServerOneHint": "One server, existing plugins and a small agreed list of settings.",
        "pricingServerFew": "Extended server setup",
        "pricingServerFewHint": "One game mode: permissions, economy, menus and testing using existing plugins.",
        "pricingServerComplex": "Custom systems or a server network",
        "pricingServerComplexHint": "Custom plugins, linked servers or a larger setup. Individually quoted.",
        "pricingExtrasHint": "I’ll assess these requirements separately before confirming the scope and price.",
        "pricingFrom": "From €{amount}",
        "pricingIndividual": "Individual quote · starting price only",
        "pricingOptionQuote": "Individual quote",
        "pricingComplexNote": "€80 is a starting point, not a fixed price for a complete system. I’ll review the scope and quote the work individually.",
        "pricingBotAdvancedNote": "Advanced Discord bots start from €80. I’ll review the features, integrations and intended use before confirming the final price.",
        "pricingWebsiteSmallNote": "A few pages in one visual style, with supplied text and images. User accounts, payment features and extra languages need a separate quote.",
        "pricingServerExtendedNote": "One game mode using existing plugins: agreed permissions, economy and menus, checked together. Hosting, paid plugins, maps and custom code are separate.",
        "pricingFootnote": "Final scope, price and timeline are agreed before starting. Requests beyond the agreed scope are quoted separately.",
        "faqPriceAnswer": "Mods and plugins: small €20–30, medium €50–70, large from €80 with an individual quote. Small changes €15–25; simple Discord bots €30–50. Websites and server setups have their own ranges in the calculator. Launchers are individually quoted. Final scope and price are agreed before starting.",
        "pricingBotTitle": "What kind of Discord bot?",
        "pricingExtras": "Any additional requirements?",
        "pricingModsIntegration": "A database, external service or website integration",
        "pricingModsCompatibility": "More than one Minecraft version, mod loader or server platform",
        "pricingModsAssets": "Custom textures, models or sounds",
        "pricingBotIntegration": "External services, a database or a web dashboard",
        "pricingBotServers": "Use on multiple Discord servers",
        "pricingBotLanguages": "Multiple bot interface languages",
        "pricingWebsiteIntegration": "User accounts, payments or external integrations",
        "pricingWebsiteLanguages": "Multiple website languages",
        "pricingWebsiteContent": "Custom design or help creating content",
        "pricingServerDevelopment": "Custom plugins or external integrations",
        "pricingServerNetwork": "More than one server or a linked server network",
        "pricingServerAssets": "Maps or resource packs to configure",
        "pricingFixDiagnosis": "The cause of the issue is still unknown",
        "pricingFixCompatibility": "A compatibility update or migration",
        "pricingFixIntegration": "Changes involving a third-party integration",
        "pricingFixExtrasHint": "I’ll review the existing code before quoting diagnosis, migration or integration work.",
        "pricingFullDevelopment": "Custom development beyond the existing components",
        "pricingFullIntegration": "Connections and shared data between components",
        "pricingFullLanguages": "Multiple language versions of the project",
        "pricingFullExtrasHint": "Custom development and connections between components need a separate scope and quote.",
        "pricingLauncherRequirements": "What should the launcher support?",
        "pricingLauncherAccounts": "Sign-in and account management",
        "pricingLauncherUpdates": "Automatic game or modpack updates",
        "pricingLauncherPlatforms": "Support for more than one operating system",
        "pricingLauncherRequirementsHint": "Every launcher is quoted individually. These choices help describe your requirements.",
        "pricingIncludedConfiguration": "Configuration and testing",
        "pricingIncludedConfigFiles": "Configuration files and setup instructions",
        "pricingIncludedUpdatedFiles": "Updated source files and change notes",
        "pricingIncludedWebsiteFiles": "Website source and publishing instructions",
        "pricingIncludedImplementation": "Implementation and testing",
        "pricingIncludedProjectFiles": "Agreed project files and handover instructions",
        "pricingModsCosts": "Custom assets, paid dependencies and ongoing maintenance are separate.",
        "pricingBotCosts": "Hosting, paid APIs and ongoing maintenance are separate.",
        "pricingWebsiteCosts": "Domain, hosting, paid services and ongoing maintenance are separate.",
        "pricingServerCosts": "Hosting, paid plugins, maps and ongoing administration are separate.",
        "pricingFixCosts": "Ongoing maintenance is agreed separately.",
        "pricingProjectCosts": "Hosting, paid services and ongoing maintenance are separate."
      },
      "ru": {
        "heroPricing": "Прикинуть стоимость",
        "typeFix": "Небольшие доработки",
        "pricingEyebrow": "Прикинем бюджет",
        "pricingTitleOne": "Твоя идея.",
        "pricingTitleTwo": "Понятный ориентир.",
        "pricingDescription": "Выбери услугу и подходящий объём. Это ориентиры бюджета: точный объём и итоговую цену согласуем до начала работы.",
        "pricingChoices": "Параметры проекта для расчёта",
        "pricingService": "Что нужно сделать?",
        "pricingScopeTitle": "Какой вариант ближе к твоей идее?",
        "pricingOne": "Небольшой мод",
        "pricingFew": "Средний мод",
        "pricingFixTitle": "Что нужно доработать?",
        "pricingFixOne": "Небольшая понятная правка",
        "pricingFixOneHint": "Одно конкретное изменение в существующем коде, после его проверки.",
        "pricingFixFew": "Несколько связанных правок",
        "pricingFixFewHint": "Несколько изменений; назову цену после проверки существующего кода.",
        "pricingFullTitle": "Какой проект планируешь?",
        "pricingFullOne": "Небольшой запуск на готовой основе",
        "pricingFullOneHint": "Ограниченный запуск на согласованном наборе готовых компонентов.",
        "pricingFullFew": "Новая система с нуля",
        "pricingFullFewHint": "Большой проект под твои требования. Индивидуальная оценка.",
        "pricingCustom": "Не знаю — помоги оценить",
        "pricingCustomHint": "Опиши идею — помогу определить объём.",
        "pricingComponents": "Какие части ты рассматриваешь?",
        "pricingExtras": "Есть дополнительные требования?",
        "pricingExtrasHint": "Оценю эти требования отдельно, прежде чем подтвердить объём и стоимость.",
        "pricingEstimate": "Ориентировочный бюджет разработки",
        "pricingOneOff": "Разовая разработка",
        "pricingStarting": "Стартовый бюджет · объём уточним",
        "pricingReview": "Нужно уточнить объём",
        "pricingQuote": "Давай обсудим",
        "pricingModsNote": "Для одной согласованной версии Minecraft и платформы. Объём и нужные материалы определим до начала работы.",
        "pricingBotNote": "Небольшой Discord-бот для одного сервера; объём согласуем до начала. Хостинг и постоянные расходы — отдельно.",
        "pricingFixNote": "Одна небольшая, чётко определённая правка. Сначала посмотрю код; диагностику или большой ремонт оценим отдельно.",
        "pricingFullNote": "200–300 € — стартовый бюджет ограниченного запуска на готовых компонентах. Выбранные части — пожелания для обсуждения; в цену входит только согласованный объём, а не целая экосистема с нуля.",
        "pricingWebsiteNote": "Одна адаптивная страница на знакомой основе. Тексты и изображения предоставляешь ты; свой дизайн, создание контента, дополнительные языки и интерактивные сервисы оценим отдельно.",
        "pricingServerNote": "Базовая настройка одного сервера на готовых плагинах. Хостинг, платные плагины, карты и своя разработка — отдельно.",
        "pricingLauncherNote": "Лаунчеры оцениваю индивидуально: сначала обсудим готовую основу, платформы, аккаунты и систему обновлений.",
        "pricingReviewNote": "Для этих требований нужна отдельная оценка. Разберу объём и существующий код, если он есть, затем подтвержу цену.",
        "pricingReference": "Базовый объём без дополнительных требований: {range}. Это не стоимость выбранного варианта.",
        "pricingFullReference": "Ограниченный запуск начинается с бюджета {range}. Выбранные компоненты требуют отдельного согласования объёма и цены.",
        "pricingIncluded": "В согласованную работу входят",
        "pricingIncludedBuild": "Разработка и проверка",
        "pricingIncludedFiles": "Исходники и инструкция запуска",
        "pricingUse": "Обсудить этот вариант",
        "pricingDiscuss": "Обсудить проект",
        "pricingFootnote": "Объём, итоговую цену и сроки согласуем до начала. Пожелания сверх согласованного объёма оценим отдельно.",
        "pricingAttached": "Расчёт добавлен к сообщению",
        "pricingRemove": "Убрать",
        "pricingBrief": "Выбор в калькуляторе",
        "pricingBriefScope": "Объём",
        "pricingBriefParts": "Части для обсуждения",
        "pricingBriefExtras": "Дополнительные требования",
        "pricingBriefNote": "Предварительный ориентир только для выбранного варианта в калькуляторе, а не всей заявки. Объём и итоговую цену ещё согласуем; сторонние расходы и дальнейшая поддержка — отдельно.",
        "faqPriceAnswer": "Моды и плагины: небольшие — 20–30 €, средние — 50–70 €, большие — от 80 € с индивидуальной оценкой. Небольшие правки — 15–25 €, простые Discord-боты — 30–50 €. Для сайтов и настройки серверов есть свои диапазоны в калькуляторе. Лаунчеры оцениваю индивидуально. Объём и итоговую цену согласуем до начала.",
        "typeMods": "Minecraft — моды и плагины",
        "pricingComplex": "Большой мод",
        "pricingBotOne": "Простой Discord-бот",
        "pricingBotOneHint": "Небольшой бот для одного Discord-сервера.",
        "pricingBotFew": "Продвинутый Discord-бот",
        "pricingBotFewHint": "Более крупный бот с расширенными возможностями. Индивидуальная оценка.",
        "pricingWebsiteTitle": "Какой сайт нужен?",
        "pricingWebsiteOne": "Одностраничный сайт",
        "pricingWebsiteOneHint": "На знакомой основе, с адаптацией для телефона и твоими текстами и изображениями.",
        "pricingWebsiteFew": "Небольшой сайт",
        "pricingWebsiteFewHint": "Несколько страниц в одном стиле с твоими готовыми текстами и изображениями.",
        "pricingWebsiteComplex": "Веб-приложение на заказ",
        "pricingWebsiteComplexHint": "Аккаунты, панели управления, платежи или сложные интеграции. Индивидуальная оценка.",
        "pricingServerTitle": "Какой объём настройки нужен?",
        "pricingServerOne": "Базовая настройка сервера",
        "pricingServerOneHint": "Один сервер, готовые плагины и небольшой согласованный список настроек.",
        "pricingServerFew": "Расширенная настройка",
        "pricingServerFewHint": "Один режим: права, экономика, меню и проверка на готовых плагинах.",
        "pricingServerComplex": "Свои системы или сеть серверов",
        "pricingServerComplexHint": "Свои плагины, связанные серверы или большой объём настройки. Индивидуальная оценка.",
        "pricingFrom": "От €{amount}",
        "pricingIndividual": "Индивидуальная оценка · только стартовая цена",
        "pricingOptionQuote": "Индивидуально",
        "pricingComplexNote": "80 € — стартовый ориентир, а не фиксированная цена целой системы. Разберу объём и назову индивидуальную стоимость.",
        "pricingBotAdvancedNote": "Продвинутые Discord-боты — от 80 €. Разберу функции, интеграции и сценарии использования, затем подтвержу итоговую цену.",
        "pricingWebsiteSmallNote": "Несколько страниц в одном стиле, с готовыми текстами и изображениями. Аккаунты, платежи и дополнительные языки оценим отдельно.",
        "pricingServerExtendedNote": "Один режим на готовых плагинах: согласованные права, экономика и меню с общей проверкой. Хостинг, платные плагины, карты и свой код — отдельно.",
        "pricingBotTitle": "Какой Discord-бот нужен?",
        "pricingModsIntegration": "База данных, внешний сервис или связь с сайтом",
        "pricingModsCompatibility": "Несколько версий Minecraft, загрузчиков модов или серверных платформ",
        "pricingModsAssets": "Свои текстуры, модели или звуки",
        "pricingBotIntegration": "Внешние сервисы, база данных или веб-панель",
        "pricingBotServers": "Работа на нескольких Discord-серверах",
        "pricingBotLanguages": "Несколько языков интерфейса бота",
        "pricingWebsiteIntegration": "Аккаунты пользователей, платежи или внешние интеграции",
        "pricingWebsiteLanguages": "Несколько языковых версий сайта",
        "pricingWebsiteContent": "Индивидуальный дизайн или помощь с контентом",
        "pricingServerDevelopment": "Свои плагины или внешние интеграции",
        "pricingServerNetwork": "Несколько серверов или связанная сеть серверов",
        "pricingServerAssets": "Настройка карт или ресурспаков",
        "pricingFixDiagnosis": "Причина ошибки пока неизвестна",
        "pricingFixCompatibility": "Обновление совместимости или перенос проекта",
        "pricingFixIntegration": "Изменения, затрагивающие стороннюю интеграцию",
        "pricingFixExtrasHint": "Сначала посмотрю код, затем оценю диагностику, перенос или работу с интеграциями.",
        "pricingFullDevelopment": "Своя разработка сверх готовых компонентов",
        "pricingFullIntegration": "Связь и обмен данными между компонентами",
        "pricingFullLanguages": "Несколько языковых версий проекта",
        "pricingFullExtrasHint": "Свою разработку и связь компонентов оценим после отдельного согласования объёма.",
        "pricingLauncherRequirements": "Что должен поддерживать лаунчер?",
        "pricingLauncherAccounts": "Вход и управление аккаунтами",
        "pricingLauncherUpdates": "Автоматическое обновление игры или сборки модов",
        "pricingLauncherPlatforms": "Работа на нескольких операционных системах",
        "pricingLauncherRequirementsHint": "Каждый лаунчер оцениваю индивидуально. Эти пункты помогут описать твои требования.",
        "pricingIncludedConfiguration": "Настройка и проверка",
        "pricingIncludedConfigFiles": "Файлы настроек и инструкция запуска",
        "pricingIncludedUpdatedFiles": "Обновлённые исходники и описание изменений",
        "pricingIncludedWebsiteFiles": "Исходники сайта и инструкция публикации",
        "pricingIncludedImplementation": "Реализация и проверка",
        "pricingIncludedProjectFiles": "Согласованные файлы проекта и инструкция передачи",
        "pricingModsCosts": "Свои материалы, платные зависимости и дальнейшая поддержка — отдельно.",
        "pricingBotCosts": "Хостинг, платные API и дальнейшая поддержка — отдельно.",
        "pricingWebsiteCosts": "Домен, хостинг, платные сервисы и дальнейшая поддержка — отдельно.",
        "pricingServerCosts": "Хостинг, платные плагины, карты и дальнейшее администрирование — отдельно.",
        "pricingFixCosts": "Дальнейшую поддержку согласуем отдельно.",
        "pricingProjectCosts": "Хостинг, платные сервисы и дальнейшая поддержка — отдельно."
      },
      "lt": {
        "heroPricing": "Įvertinti biudžetą",
        "typeFix": "Nedideli pakeitimai",
        "pricingEyebrow": "Trumpas biudžeto įvertinimas",
        "pricingTitleOne": "Tavo idėja.",
        "pricingTitleTwo": "Pradinė kaina.",
        "pricingDescription": "Pasirink paslaugą ir artimiausią darbų apimtį. Tai biudžeto orientyrai; tikslią apimtį ir galutinę kainą suderinsime prieš pradėdami.",
        "pricingChoices": "Projekto duomenys kainai įvertinti",
        "pricingService": "Ką reikia sukurti?",
        "pricingScopeTitle": "Kuris variantas artimiausias tavo idėjai?",
        "pricingOne": "Nedidelis modas",
        "pricingFew": "Vidutinio dydžio modas",
        "pricingFixTitle": "Ką reikia pakeisti?",
        "pricingFixOne": "Nedidelis aiškus pakeitimas",
        "pricingFixOneHint": "Vienas konkretus esamo kodo pakeitimas, pirmiausia jį peržiūrėjus.",
        "pricingFixFew": "Keli susiję pakeitimai",
        "pricingFixFewHint": "Keli pakeitimai; kainą pateiksiu peržiūrėjęs esamą kodą.",
        "pricingFullTitle": "Kokį projektą planuoji?",
        "pricingFullOne": "Nedidelis startas su esamais įrankiais",
        "pricingFullOneHint": "Ribotos apimties startas naudojant suderintą esamų komponentų rinkinį.",
        "pricingFullFew": "Nauja individuali sistema",
        "pricingFullFewHint": "Didesnis projektas pagal tavo reikalavimus. Vertinama individualiai.",
        "pricingCustom": "Dar nežinau — padėk įvertinti",
        "pricingCustomHint": "Aprašyk idėją; padėsiu nustatyti darbų apimtį.",
        "pricingComponents": "Kokias dalis svarstai?",
        "pricingExtras": "Ar yra papildomų reikalavimų?",
        "pricingExtrasHint": "Šiuos reikalavimus įvertinsiu atskirai prieš patvirtindamas apimtį ir kainą.",
        "pricingEstimate": "Preliminarus kūrimo biudžetas",
        "pricingOneOff": "Vienkartinis kūrimas",
        "pricingStarting": "Pradinis biudžetas · apimtį suderinsime",
        "pricingReview": "Reikia patikslinti apimtį",
        "pricingQuote": "Aptarkime",
        "pricingModsNote": "Vienai suderintai Minecraft versijai ir platformai. Apimtį ir reikiamą medžiagą sutarsime prieš pradėdami.",
        "pricingBotNote": "Nedidelis Discord botas vienam serveriui; apimtį suderinsime prieš pradėdami. Hostingas ir nuolatinės veikimo išlaidos — atskirai.",
        "pricingFixNote": "Vienas nedidelis, aiškiai apibrėžtas pakeitimas. Pirmiausia peržiūrėsiu kodą; diagnostiką ar didesnį taisymą įvertinsime atskirai.",
        "pricingFullNote": "200–300 € yra pradinis ribotos apimties projekto biudžetas naudojant esamus komponentus. Pasirinktos dalys — pageidavimai aptarimui; į kainą įeina tik suderinta apimtis, ne visa individuali ekosistema.",
        "pricingWebsiteNote": "Vienas telefonui pritaikytas puslapis naudojant esamą pagrindą. Tekstus ir vaizdus pateiki tu; individualų dizainą, turinio kūrimą, papildomas kalbas ir interaktyvias paslaugas įvertinsime atskirai.",
        "pricingServerNote": "Bazinis vieno serverio konfigūravimas su esamais papildiniais. Hostingas, mokami papildiniai, žemėlapiai ir individualus kūrimas — atskirai.",
        "pricingLauncherNote": "Paleidykles įvertinu individualiai, aptarę esamą pagrindą, platformas, paskyras ir atnaujinimų sistemą.",
        "pricingReviewNote": "Šiems reikalavimams reikia atskiro pasiūlymo. Peržiūrėsiu apimtį ir esamą kodą, jei jis yra, tada patvirtinsiu kainą.",
        "pricingReference": "Bazinė apimtis be papildomų reikalavimų: {range}. Tai nėra šio pasirinkimo kaina.",
        "pricingFullReference": "Riboto starto biudžetas prasideda nuo {range}. Pasirinktiems komponentams reikia atskirai suderinti apimtį ir kainą.",
        "pricingIncluded": "Į suderintą darbą įeina",
        "pricingIncludedBuild": "Kūrimas ir patikra",
        "pricingIncludedFiles": "Išeities failai ir paleidimo instrukcija",
        "pricingUse": "Aptarti šį variantą",
        "pricingDiscuss": "Aptarti projektą",
        "pricingFootnote": "Apimtį, galutinę kainą ir terminus suderinsime prieš pradėdami. Prašymus, viršijančius suderintą apimtį, įvertinsime atskirai.",
        "pricingAttached": "Įvertinimas pridėtas prie žinutės",
        "pricingRemove": "Pašalinti",
        "pricingBrief": "Skaičiuoklės pasirinkimas",
        "pricingBriefScope": "Apimtis",
        "pricingBriefParts": "Dalys aptarimui",
        "pricingBriefExtras": "Papildomi reikalavimai",
        "pricingBriefNote": "Preliminarus orientyras tik šiam skaičiuoklės pasirinkimui, ne visai užklausai. Apimtį ir galutinę kainą dar suderinsime; išorinės išlaidos ir tolesnė priežiūra — atskirai.",
        "faqPriceAnswer": "Modai ir papildiniai: nedideli — 20–30 €, vidutiniai — 50–70 €, dideli — nuo 80 € su individualiu įvertinimu. Nedideli pakeitimai — 15–25 €, paprasti Discord botai — 30–50 €. Svetainių ir serverių paruošimo intervalai pateikti skaičiuoklėje. Paleidyklės vertinamos individualiai. Apimtį ir galutinę kainą suderinsime prieš pradėdami.",
        "typeMods": "Minecraft modai ir papildiniai",
        "pricingComplex": "Didelis modas",
        "pricingBotOne": "Paprastas Discord botas",
        "pricingBotOneHint": "Nedidelis botas vienam Discord serveriui.",
        "pricingBotFew": "Išplėstinis Discord botas",
        "pricingBotFewHint": "Didesnis botas su platesnėmis galimybėmis. Vertinama individualiai.",
        "pricingWebsiteTitle": "Kokios svetainės reikia?",
        "pricingWebsiteOne": "Vieno puslapio svetainė",
        "pricingWebsiteOneHint": "Esamas pagrindas, pritaikymas telefonui ir tavo pateikti tekstai bei vaizdai.",
        "pricingWebsiteFew": "Nedidelė svetainė",
        "pricingWebsiteFewHint": "Keli vieno stiliaus puslapiai su tavo pateiktais tekstais ir vaizdais.",
        "pricingWebsiteComplex": "Individuali žiniatinklio programa",
        "pricingWebsiteComplexHint": "Paskyros, valdymo skydai, mokėjimai ar sudėtingos integracijos. Vertinama individualiai.",
        "pricingServerTitle": "Kokios konfigūravimo apimties reikia?",
        "pricingServerOne": "Bazinis serverio paruošimas",
        "pricingServerOneHint": "Vienas serveris, esami papildiniai ir nedidelis suderintas nustatymų sąrašas.",
        "pricingServerFew": "Išplėstinis serverio paruošimas",
        "pricingServerFewHint": "Vienas žaidimo režimas: teisės, ekonomika, meniu ir patikra su esamais papildiniais.",
        "pricingServerComplex": "Individualios sistemos ar serverių tinklas",
        "pricingServerComplexHint": "Individualūs papildiniai, susieti serveriai ar didesnė paruošimo apimtis. Vertinama individualiai.",
        "pricingFrom": "Nuo €{amount}",
        "pricingIndividual": "Individualus pasiūlymas · tik pradinė kaina",
        "pricingOptionQuote": "Individualiai",
        "pricingComplexNote": "80 € yra pradinis orientyras, ne fiksuota visos sistemos kaina. Peržiūrėsiu apimtį ir pateiksiu individualų pasiūlymą.",
        "pricingBotAdvancedNote": "Išplėstiniai Discord botai — nuo 80 €. Peržiūrėsiu funkcijas, integracijas ir naudojimo scenarijus, tada patvirtinsiu galutinę kainą.",
        "pricingWebsiteSmallNote": "Keli vieno stiliaus puslapiai su pateiktais tekstais ir vaizdais. Paskyras, mokėjimus ir papildomas kalbas įvertinsime atskirai.",
        "pricingServerExtendedNote": "Vienas režimas su esamais papildiniais: suderintos teisės, ekonomika ir meniu su bendra patikra. Hostingas, mokami papildiniai, žemėlapiai ir individualus kodas — atskirai.",
        "pricingBotTitle": "Kokio Discord boto reikia?",
        "pricingModsIntegration": "Duomenų bazė, išorinė paslauga ar ryšys su svetaine",
        "pricingModsCompatibility": "Kelios Minecraft versijos, modų įkėlikliai ar serverio platformos",
        "pricingModsAssets": "Individualios tekstūros, modeliai ar garsai",
        "pricingBotIntegration": "Išorinės paslaugos, duomenų bazė ar valdymo skydas",
        "pricingBotServers": "Naudojimas keliuose Discord serveriuose",
        "pricingBotLanguages": "Kelios boto sąsajos kalbos",
        "pricingWebsiteIntegration": "Naudotojų paskyros, mokėjimai ar išorinės integracijos",
        "pricingWebsiteLanguages": "Kelios svetainės kalbos",
        "pricingWebsiteContent": "Individualus dizainas ar pagalba kuriant turinį",
        "pricingServerDevelopment": "Individualūs papildiniai ar išorinės integracijos",
        "pricingServerNetwork": "Keli serveriai ar susietas serverių tinklas",
        "pricingServerAssets": "Žemėlapių ar išteklių paketų konfigūravimas",
        "pricingFixDiagnosis": "Klaidos priežastis dar nežinoma",
        "pricingFixCompatibility": "Suderinamumo atnaujinimas ar projekto perkėlimas",
        "pricingFixIntegration": "Pakeitimai, susiję su išorine integracija",
        "pricingFixExtrasHint": "Pirmiausia peržiūrėsiu kodą, tada įvertinsiu diagnostiką, perkėlimą ar integracijų darbus.",
        "pricingFullDevelopment": "Individualus kūrimas, papildantis esamus komponentus",
        "pricingFullIntegration": "Ryšiai ir duomenų mainai tarp komponentų",
        "pricingFullLanguages": "Kelios projekto kalbinės versijos",
        "pricingFullExtrasHint": "Individualiam kūrimui ir komponentų ryšiams reikia atskirai suderinti apimtį ir kainą.",
        "pricingLauncherRequirements": "Ką turi palaikyti paleidyklė?",
        "pricingLauncherAccounts": "Prisijungimas ir paskyrų valdymas",
        "pricingLauncherUpdates": "Automatiniai žaidimo ar modų rinkinio atnaujinimai",
        "pricingLauncherPlatforms": "Kelių operacinių sistemų palaikymas",
        "pricingLauncherRequirementsHint": "Kiekviena paleidyklė vertinama individualiai. Šie pasirinkimai padeda aprašyti tavo reikalavimus.",
        "pricingIncludedConfiguration": "Konfigūravimas ir patikra",
        "pricingIncludedConfigFiles": "Konfigūracijos failai ir paleidimo instrukcija",
        "pricingIncludedUpdatedFiles": "Atnaujinti išeities failai ir pakeitimų aprašymas",
        "pricingIncludedWebsiteFiles": "Svetainės išeities failai ir publikavimo instrukcija",
        "pricingIncludedImplementation": "Įgyvendinimas ir patikra",
        "pricingIncludedProjectFiles": "Suderinti projekto failai ir perdavimo instrukcija",
        "pricingModsCosts": "Individuali medžiaga, mokamos priklausomybės ir tolesnė priežiūra — atskirai.",
        "pricingBotCosts": "Hostingas, mokami API ir tolesnė priežiūra — atskirai.",
        "pricingWebsiteCosts": "Domenas, hostingas, mokamos paslaugos ir tolesnė priežiūra — atskirai.",
        "pricingServerCosts": "Hostingas, mokami papildiniai, žemėlapiai ir tolesnis administravimas — atskirai.",
        "pricingFixCosts": "Tolesnę priežiūrą suderinsime atskirai.",
        "pricingProjectCosts": "Hostingas, mokamos paslaugos ir tolesnė priežiūra — atskirai."
      }
    };
    for (const [locale, copy] of Object.entries(pricingTranslations)) Object.assign(translations[locale], copy);

    // Ranges are budget guides; minimums always require an individual quote.
    const customScope = { label: "pricingCustom", hint: "pricingCustomHint" };
    const pricingServices = {
      mods: {
        title: "pricingScopeTitle", note: "pricingModsNote",
        extras: ["pricingModsIntegration", "pricingModsCompatibility", "pricingModsAssets"],
        costs: "pricingModsCosts",
        scopes: {
          one: { label: "pricingOne", range: [20, 30] },
          few: { label: "pricingFew", range: [50, 70] },
          complex: { label: "pricingComplex", minimum: 80, note: "pricingComplexNote" },
          custom: customScope,
        },
      },
      bot: {
        title: "pricingBotTitle", note: "pricingBotNote",
        extras: ["pricingBotIntegration", "pricingBotServers", "pricingBotLanguages"],
        costs: "pricingBotCosts",
        scopes: {
          one: { label: "pricingBotOne", hint: "pricingBotOneHint", range: [30, 50] },
          few: { label: "pricingBotFew", hint: "pricingBotFewHint", minimum: 80, note: "pricingBotAdvancedNote" },
          custom: customScope,
        },
      },
      fix: {
        title: "pricingFixTitle", note: "pricingFixNote",
        extras: ["pricingFixDiagnosis", "pricingFixCompatibility", "pricingFixIntegration"],
        extrasHint: "pricingFixExtrasHint", includedFiles: "pricingIncludedUpdatedFiles", costs: "pricingFixCosts",
        scopes: {
          one: { label: "pricingFixOne", hint: "pricingFixOneHint", range: [15, 25] },
          few: { label: "pricingFixFew", hint: "pricingFixFewHint", note: "pricingReviewNote" },
          custom: customScope,
        },
      },
      full: {
        title: "pricingFullTitle", note: "pricingFullNote",
        extras: ["pricingFullDevelopment", "pricingFullIntegration", "pricingFullLanguages"],
        extrasHint: "pricingFullExtrasHint", includedBuild: "pricingIncludedImplementation",
        includedFiles: "pricingIncludedProjectFiles", costs: "pricingProjectCosts",
        scopes: {
          one: { label: "pricingFullOne", hint: "pricingFullOneHint", range: [200, 300] },
          few: { label: "pricingFullFew", hint: "pricingFullFewHint", note: "pricingReviewNote" },
          custom: customScope,
        },
      },
      website: {
        title: "pricingWebsiteTitle", note: "pricingWebsiteNote",
        extras: ["pricingWebsiteIntegration", "pricingWebsiteLanguages", "pricingWebsiteContent"],
        includedFiles: "pricingIncludedWebsiteFiles", costs: "pricingWebsiteCosts",
        scopes: {
          one: { label: "pricingWebsiteOne", hint: "pricingWebsiteOneHint", range: [100, 180] },
          few: { label: "pricingWebsiteFew", hint: "pricingWebsiteFewHint", range: [200, 350], note: "pricingWebsiteSmallNote" },
          complex: { label: "pricingWebsiteComplex", hint: "pricingWebsiteComplexHint", note: "pricingReviewNote" },
          custom: customScope,
        },
      },
      server: {
        title: "pricingServerTitle", note: "pricingServerNote",
        extras: ["pricingServerDevelopment", "pricingServerNetwork", "pricingServerAssets"],
        includedBuild: "pricingIncludedConfiguration", includedFiles: "pricingIncludedConfigFiles", costs: "pricingServerCosts",
        scopes: {
          one: { label: "pricingServerOne", hint: "pricingServerOneHint", range: [40, 80] },
          few: { label: "pricingServerFew", hint: "pricingServerFewHint", range: [100, 180], note: "pricingServerExtendedNote" },
          complex: { label: "pricingServerComplex", hint: "pricingServerComplexHint", note: "pricingReviewNote" },
          custom: customScope,
        },
      },
      launcher: {
        note: "pricingLauncherNote",
        extras: ["pricingLauncherAccounts", "pricingLauncherUpdates", "pricingLauncherPlatforms"],
        extrasTitle: "pricingLauncherRequirements", extrasHint: "pricingLauncherRequirementsHint", costs: "pricingProjectCosts",
      },
    };
    const serviceInput = document.querySelector("#estimate-service");
    const scopeInputs = [...document.querySelectorAll("input[name='estimate-scope']")];
    const partInputs = [...document.querySelectorAll("#estimate-components input")];
    const extraInputs = [...document.querySelectorAll("#estimate-extras input")];
    const attachedEstimate = document.querySelector("#pricing-brief-data");
    let currentEstimate;
    let language = "en";
    let currentBrief = "";
    let currentShowcase = "website";
    const t = (key) => translations[language][key] ?? translations.en[key] ?? key;

    const formatRange = ([low, high]) => `€${low}–${high}`;
    function formatEstimate({ range, minimum }) {
      if (range) return formatRange(range);
      if (minimum) return t("pricingFrom").replace("{amount}", minimum);
      return t("pricingQuote");
    }
    function estimateValue() {
      return formatEstimate(currentEstimate);
    }
    function estimateBadge() {
      if (currentEstimate.minimum) return t("pricingIndividual");
      if (currentEstimate.range) return t(currentEstimate.service === "full" ? "pricingStarting" : "pricingOneOff");
      return t("pricingReview");
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
      let scope = scopeInputs.find((input) => input.checked)?.value || "one";
      if (config.scopes && !config.scopes[scope]) scope = "one";
      const selection = config.scopes?.[scope];
      const parts = service === "full" ? partInputs.filter((input) => input.checked).map((input) => input.value) : [];
      for (const [index, input] of extraInputs.entries()) {
        const key = config.extras[index];
        input.value = key;
        document.querySelector(`#${input.id}-label`).textContent = t(key);
      }
      document.querySelector("#estimate-extras-title").textContent = t(config.extrasTitle || "pricingExtras");
      document.querySelector("#estimate-extras-hint").textContent = t(config.extrasHint || "pricingExtrasHint");
      const extras = extraInputs.filter((input) => input.checked).map((input) => input.value);
      const additionalReview = extras.length > 0 || parts.includes("launcher") || parts.length > 1;
      const range = additionalReview ? null : selection?.range || null;
      const minimum = additionalReview ? null : selection?.minimum || null;
      const reference = additionalReview ? selection?.range || null : null;
      currentEstimate = { service, scope, parts, extras, range, minimum, reference, selection };
      document.querySelector("#estimate-scope").hidden = !config.scopes;
      document.querySelector("#estimate-components").hidden = service !== "full";
      if (config.title) document.querySelector("#estimate-scope-title").textContent = t(config.title);
      for (const input of scopeInputs) {
        const option = config.scopes?.[input.value];
        input.closest("label").hidden = !option;
        input.disabled = !option;
        input.checked = input.value === scope;
        if (!option) continue;
        document.querySelector(`#estimate-scope-${input.value}-label`).textContent = t(option.label);
        const hint = document.querySelector(`#estimate-scope-${input.value}-hint`);
        hint.textContent = option.hint ? t(option.hint) : "";
        hint.hidden = !option.hint;
        document.querySelector(`#estimate-scope-${input.value}-price`).textContent = option.range || option.minimum
          ? formatEstimate(option) : input.value === "custom" ? "" : t("pricingOptionQuote");
      }
      document.querySelector("#estimate-price").textContent = estimateValue();
      document.querySelector("#estimate-badge").textContent = estimateBadge();
      document.querySelector(".pricing-result").dataset.review = String(!range && !minimum);
      const note = additionalReview || (config.scopes && scope === "custom") ? "pricingReviewNote" : selection?.note || config.note;
      document.querySelector("#estimate-summary").textContent = t(note);
      const referenceElement = document.querySelector("#estimate-reference");
      referenceElement.hidden = !reference;
      referenceElement.textContent = reference
        ? t(service === "full" ? "pricingFullReference" : "pricingReference").replace("{range}", formatRange(reference)) : "";
      document.querySelector("#estimate-cta-label").textContent = t(range ? "pricingUse" : "pricingDiscuss");
      document.querySelector("#estimate-included-build").textContent = t(config.includedBuild || "pricingIncludedBuild");
      document.querySelector("#estimate-included-files").textContent = t(config.includedFiles || "pricingIncludedFiles");
      document.querySelector("#estimate-footnote").textContent = `${t("pricingFootnote")} ${t(config.costs)}`;
      updateAttachedEstimate();
    }
    function calculatorBrief() {
      const { service, parts, extras, reference, selection } = currentEstimate;
      const lines = [`${t("pricingBrief")}: ${t(typeKeys[service])}`];
      if (selection) lines.push(`${t("pricingBriefScope")}: ${t(selection.label)}`);
      if (parts.length) lines.push(`${t("pricingBriefParts")}: ${parts.map((part) => t(typeKeys[part])).join(", ")}`);
      if (extras.length) lines.push(`${t("pricingBriefExtras")}: ${extras.map(t).join("; ")}`);
      lines.push(`${t("pricingEstimate")}: ${estimateValue()} (${estimateBadge()})`);
      if (!currentEstimate.range && reference) lines.push(t(service === "full" ? "pricingFullReference" : "pricingReference").replace("{range}", formatRange(reference)));
      lines.push(t("pricingBriefNote"));
      return lines;
    }
    function resetScope() {
      scopeInputs.forEach((input) => { input.checked = input.value === "one"; });
      extraInputs.forEach((input) => { input.checked = false; });
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
      // Keep the full brief available instead of letting Telegram trim a long draft.
      telegramNeedsCopy = [...currentBrief].length > 4096;
      telegramDraft.href = telegramNeedsCopy
        ? "https://t.me/auurruum"
        : `https://t.me/auurruum?${new URLSearchParams({ text: currentBrief })}`;
      telegramDraftHint.dataset.i18n = telegramNeedsCopy ? "telegramCopy" : "telegramDraft";
      telegramDraftHint.textContent = t(telegramDraftHint.dataset.i18n);
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
      document.querySelectorAll("[data-hero-image]").forEach((image) => {
        image.alt = t(image.dataset.heroImage === "website" ? "websiteAlt" : "launcherAlt");
      });
      document.querySelector("#contact-status").textContent = "";
      document.querySelector("#message-status").textContent = "";
      renderEstimate();
      if (dialog.open) buildBrief();
      try { localStorage.setItem("auuruum-work-language", language); } catch { /* Language switching also works without storage. */ }
    }

    const languageMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let languageChange = 0;
    let requestedLanguage = null;
    let languageAnimations = [];

    function applyLanguage(nextLanguage) {
      setLanguage(nextLanguage);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", language);
      try { history.replaceState(history.state, "", url); } catch { /* Local-file browsers may limit history changes. */ }
    }

    function clearLanguageAnimations() {
      languageAnimations.forEach((animation) => animation.cancel());
      languageAnimations = [];
      delete document.documentElement.dataset.languageTransition;
    }

    function visibleLanguageBlocks() {
      const selectors = [
        "[data-i18n]:not(option)", "#estimate-service", "#estimate-scope-title",
        ".pricing-option-heading", ".pricing-scope-options small", ".pricing-check > span",
        "#estimate-extras-title", "#estimate-extras-hint", ".estimate-live",
        ".estimate-included", "#estimate-cta-label", "#estimate-footnote",
        "#brief-estimate-summary", "#message-preview",
      ];
      const blocks = new Set();
      for (const text of document.querySelectorAll(selectors.join(","))) {
        if (text.closest("[hidden], .skip-link, dialog:not([open])")) continue;
        let block = text;
        // Translate a whole rendered text block instead of moving inline fragments.
        while (block.parentElement && ["inline", "contents"].includes(getComputedStyle(block).display)) block = block.parentElement;
        const rect = block.getBoundingClientRect();
        if (rect.width && rect.height && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth) blocks.add(block);
      }
      return [...blocks].filter((block) => ![...blocks].some((parent) => parent !== block && parent.contains(block)));
    }

    async function changeLanguage(nextLanguage) {
      if (!Object.hasOwn(translations, nextLanguage) || signal.aborted) return;
      const change = ++languageChange;
      requestedLanguage = nextLanguage;
      clearLanguageAnimations();
      if (nextLanguage === language || languageMotion.matches || typeof Element.prototype.animate !== "function") {
        applyLanguage(nextLanguage);
        requestedLanguage = null;
        return;
      }

      const blocks = visibleLanguageBlocks();
      const scrollStart = window.scrollY;
      const anchor = blocks.map((element) => ({ element, top: element.getBoundingClientRect().top }))
        .filter(({ top }) => top >= 110).sort((a, b) => a.top - b.top)[0];
      try {
        document.documentElement.dataset.languageTransition = "out";
        for (const block of blocks) languageAnimations.push(block.animate([
          { opacity: 1, filter: "blur(0px)", translate: "0 0" },
          { opacity: 0, filter: "blur(4px)", translate: "0 -4px" },
        ], { duration: 120, easing: "ease-in", fill: "both" }));
        await Promise.all(languageAnimations.map((animation) => animation.finished.catch(() => {})));
        if (change !== languageChange || signal.aborted) return;

        const restoreScroll = Math.abs(window.scrollY - scrollStart) < 2;
        clearLanguageAnimations();
        applyLanguage(nextLanguage);
        if (restoreScroll && scrollStart > 0 && anchor?.element.isConnected) {
          const offset = anchor.element.getBoundingClientRect().top - anchor.top;
          if (Math.abs(offset) > 1) window.scrollBy({ top: offset, behavior: "instant" });
        }

        document.documentElement.dataset.languageTransition = "in";
        for (const block of visibleLanguageBlocks()) languageAnimations.push(block.animate([
          { opacity: 0, filter: "blur(5px)", translate: "0 8px" },
          { opacity: 1, filter: "blur(0px)", translate: "0 0" },
        ], {
          duration: 420,
          delay: Math.min(75, Math.max(0, block.getBoundingClientRect().top * 0.1)),
          easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both",
        }));
        await Promise.all(languageAnimations.map((animation) => animation.finished.catch(() => {})));
        if (change !== languageChange || signal.aborted) return;
        clearLanguageAnimations();
        requestedLanguage = null;
      } catch {
        if (change !== languageChange || signal.aborted) return;
        clearLanguageAnimations();
        applyLanguage(nextLanguage);
        requestedLanguage = null;
      }
    }

    languageButtons.forEach((button) => button.addEventListener("click", () => {
      void changeLanguage(button.dataset.language);
    }, { signal }));
    languageMotion.addEventListener("change", () => {
      if (!languageMotion.matches || !requestedLanguage) return;
      ++languageChange;
      clearLanguageAnimations();
      applyLanguage(requestedLanguage);
      requestedLanguage = null;
    }, { signal });
    onCleanup(() => {
      ++languageChange;
      requestedLanguage = null;
      clearLanguageAnimations();
    });

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
    for (const input of [...scopeInputs, ...partInputs, ...extraInputs]) input.addEventListener("change", renderEstimate);
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

    async function copyBrief(successKey = "copied") {
      const status = document.querySelector("#message-status");
      status.textContent = "";
      try {
        await navigator.clipboard.writeText(currentBrief);
        if (!signal.aborted) status.textContent = t(successKey);
      } catch {
        if (signal.aborted) return;
        preview.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(preview);
        selection?.removeAllRanges();
        selection?.addRange(range);
        status.textContent = t("copyFallback");
      }
    }

    document.querySelector("#copy-brief").addEventListener("click", () => copyBrief());
    // Start the clipboard write during the click; let the link open normally so
    // it keeps browser link behavior and does not depend on an async popup.
    document.querySelector("#discord-draft").addEventListener("click", () => {
      copyBrief("discordBriefCopied");
    });
    telegramDraft.addEventListener("click", () => {
      if (telegramNeedsCopy) copyBrief("telegramBriefCopied");
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
