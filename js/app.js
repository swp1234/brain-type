// Neural Pathway Scanner - Brain Type Test
// Dimensions: selfReliance, novelty, intuition, empathy, action, challenge, innovation, extraversion, pressure, risk

const SCENARIOS = [
    { id: 0, dimension: 'selfReliance',  scenarioKey: 'scenario.0',  choiceAKey: 'choice.0a', choiceBKey: 'choice.0b' },
    { id: 1, dimension: 'novelty',       scenarioKey: 'scenario.1',  choiceAKey: 'choice.1a', choiceBKey: 'choice.1b' },
    { id: 2, dimension: 'intuition',     scenarioKey: 'scenario.2',  choiceAKey: 'choice.2a', choiceBKey: 'choice.2b' },
    { id: 3, dimension: 'empathy',       scenarioKey: 'scenario.3',  choiceAKey: 'choice.3a', choiceBKey: 'choice.3b' },
    { id: 4, dimension: 'action',        scenarioKey: 'scenario.4',  choiceAKey: 'choice.4a', choiceBKey: 'choice.4b' },
    { id: 5, dimension: 'challenge',     scenarioKey: 'scenario.5',  choiceAKey: 'choice.5a', choiceBKey: 'choice.5b' },
    { id: 6, dimension: 'innovation',    scenarioKey: 'scenario.6',  choiceAKey: 'choice.6a', choiceBKey: 'choice.6b' },
    { id: 7, dimension: 'extraversion',  scenarioKey: 'scenario.7',  choiceAKey: 'choice.7a', choiceBKey: 'choice.7b' },
    { id: 8, dimension: 'pressure',      scenarioKey: 'scenario.8',  choiceAKey: 'choice.8a', choiceBKey: 'choice.8b' },
    { id: 9, dimension: 'risk',          scenarioKey: 'scenario.9',  choiceAKey: 'choice.9a', choiceBKey: 'choice.9b' }
];

// Choice A = high on the dimension, Choice B = low (opposite)
// Dimensions and their A/B meanings:
// selfReliance: A=fix yourself, B=call for help
// novelty: A=explore new, B=stay in comfort
// intuition: A=trust gut, B=research
// empathy: A=listen/empathize, B=offer solutions
// action: A=jump in, B=plan first
// challenge: A=devil's advocate, B=find common ground
// innovation: A=wild brainstorm, B=refine existing
// extraversion: A=energizing, B=draining
// pressure: A=thrive under pressure, B=prefer steady pace
// risk: A=exciting opportunity, B=careful consideration

const BRAIN_TYPES = {
    creator: {
        id: 'creator',
        emoji: '\u{1F3A8}',
        nameKey: 'type.creator.name',
        taglineKey: 'type.creator.tagline',
        descKey: 'type.creator.description',
        traitsKeys: ['type.creator.trait1', 'type.creator.trait2', 'type.creator.trait3', 'type.creator.trait4'],
        // High: innovation, novelty, intuition
        metrics: { creativity: 92, logic: 45, empathy: 68, intuition: 85, drive: 72 },
        color: '#ff6b6b'
    },
    analyzer: {
        id: 'analyzer',
        emoji: '\u{1F9EE}',
        nameKey: 'type.analyzer.name',
        taglineKey: 'type.analyzer.tagline',
        descKey: 'type.analyzer.description',
        traitsKeys: ['type.analyzer.trait1', 'type.analyzer.trait2', 'type.analyzer.trait3', 'type.analyzer.trait4'],
        // High: logic/analysis (low intuition), planning (low action)
        metrics: { creativity: 40, logic: 95, empathy: 50, intuition: 35, drive: 70 },
        color: '#4ecdc4'
    },
    empath: {
        id: 'empath',
        emoji: '\u{1F49C}',
        nameKey: 'type.empath.name',
        taglineKey: 'type.empath.tagline',
        descKey: 'type.empath.description',
        traitsKeys: ['type.empath.trait1', 'type.empath.trait2', 'type.empath.trait3', 'type.empath.trait4'],
        // High: empathy, harmony (low challenge), collaboration (low selfReliance)
        metrics: { creativity: 60, logic: 48, empathy: 95, intuition: 78, drive: 55 },
        color: '#ff8fab'
    },
    intuitive: {
        id: 'intuitive',
        emoji: '\u{1F52E}',
        nameKey: 'type.intuitive.name',
        taglineKey: 'type.intuitive.tagline',
        descKey: 'type.intuitive.description',
        traitsKeys: ['type.intuitive.trait1', 'type.intuitive.trait2', 'type.intuitive.trait3', 'type.intuitive.trait4'],
        // High: intuition, risk, gut-feel
        metrics: { creativity: 75, logic: 38, empathy: 65, intuition: 96, drive: 68 },
        color: '#9b59b6'
    },
    strategist: {
        id: 'strategist',
        emoji: '\u{1F3AF}',
        nameKey: 'type.strategist.name',
        taglineKey: 'type.strategist.tagline',
        descKey: 'type.strategist.description',
        traitsKeys: ['type.strategist.trait1', 'type.strategist.trait2', 'type.strategist.trait3', 'type.strategist.trait4'],
        // High: planning (low action), analysis (low intuition), problem-solving (low empathy)
        metrics: { creativity: 55, logic: 88, empathy: 42, intuition: 52, drive: 85 },
        color: '#f39c12'
    },
    visionary: {
        id: 'visionary',
        emoji: '\u{1F680}',
        nameKey: 'type.visionary.name',
        taglineKey: 'type.visionary.tagline',
        descKey: 'type.visionary.description',
        traitsKeys: ['type.visionary.trait1', 'type.visionary.trait2', 'type.visionary.trait3', 'type.visionary.trait4'],
        // High: innovation, risk, novelty
        metrics: { creativity: 90, logic: 52, empathy: 55, intuition: 80, drive: 88 },
        color: '#3498db'
    },
    guardian: {
        id: 'guardian',
        emoji: '\u{1F6E1}',
        nameKey: 'type.guardian.name',
        taglineKey: 'type.guardian.tagline',
        descKey: 'type.guardian.description',
        traitsKeys: ['type.guardian.trait1', 'type.guardian.trait2', 'type.guardian.trait3', 'type.guardian.trait4'],
        // High: empathy, security (low risk), comfort (low novelty)
        metrics: { creativity: 45, logic: 62, empathy: 90, intuition: 60, drive: 58 },
        color: '#1abc9c'
    },
    dynamo: {
        id: 'dynamo',
        emoji: '\u{26A1}',
        nameKey: 'type.dynamo.name',
        taglineKey: 'type.dynamo.tagline',
        descKey: 'type.dynamo.description',
        traitsKeys: ['type.dynamo.trait1', 'type.dynamo.trait2', 'type.dynamo.trait3', 'type.dynamo.trait4'],
        // High: action, pressure, extraversion
        metrics: { creativity: 65, logic: 55, empathy: 48, intuition: 58, drive: 96 },
        color: '#ffd93d'
    }
};

// Scoring: map dimension scores to brain types
// Each dimension: A choice = 1, B choice = 0
function determineBrainType(scores) {
    // scores is an object: { selfReliance:0|1, novelty:0|1, ... }
    const typeScores = {};

    Object.keys(BRAIN_TYPES).forEach(t => { typeScores[t] = 0; });

    // Creator: innovation(A) + novelty(A) + intuition(A)
    if (scores.innovation === 1) typeScores.creator += 3;
    if (scores.novelty === 1) typeScores.creator += 2;
    if (scores.intuition === 1) typeScores.creator += 2;
    if (scores.challenge === 1) typeScores.creator += 1;

    // Analyzer: intuition(B) + action(B) + selfReliance(A)
    if (scores.intuition === 0) typeScores.analyzer += 3;
    if (scores.action === 0) typeScores.analyzer += 2;
    if (scores.selfReliance === 1) typeScores.analyzer += 1;
    if (scores.innovation === 0) typeScores.analyzer += 2;

    // Empath: empathy(A) + challenge(B) + selfReliance(B)
    if (scores.empathy === 1) typeScores.empath += 3;
    if (scores.challenge === 0) typeScores.empath += 2;
    if (scores.selfReliance === 0) typeScores.empath += 1;
    if (scores.extraversion === 1) typeScores.empath += 1;
    if (scores.risk === 0) typeScores.empath += 1;

    // Intuitive: intuition(A) + risk(A) + empathy(A)
    if (scores.intuition === 1) typeScores.intuitive += 3;
    if (scores.risk === 1) typeScores.intuitive += 2;
    if (scores.empathy === 1) typeScores.intuitive += 1;
    if (scores.novelty === 1) typeScores.intuitive += 1;

    // Strategist: action(B) + intuition(B) + empathy(B) + selfReliance(A)
    if (scores.action === 0) typeScores.strategist += 3;
    if (scores.intuition === 0) typeScores.strategist += 2;
    if (scores.empathy === 0) typeScores.strategist += 1;
    if (scores.selfReliance === 1) typeScores.strategist += 1;
    if (scores.pressure === 1) typeScores.strategist += 1;

    // Visionary: innovation(A) + risk(A) + novelty(A) + action(A)
    if (scores.innovation === 1) typeScores.visionary += 2;
    if (scores.risk === 1) typeScores.visionary += 3;
    if (scores.novelty === 1) typeScores.visionary += 2;
    if (scores.action === 1) typeScores.visionary += 1;

    // Guardian: empathy(A) + risk(B) + novelty(B) + challenge(B)
    if (scores.empathy === 1) typeScores.guardian += 2;
    if (scores.risk === 0) typeScores.guardian += 3;
    if (scores.novelty === 0) typeScores.guardian += 2;
    if (scores.challenge === 0) typeScores.guardian += 1;

    // Dynamo: action(A) + pressure(A) + extraversion(A) + selfReliance(A)
    if (scores.action === 1) typeScores.dynamo += 3;
    if (scores.pressure === 1) typeScores.dynamo += 3;
    if (scores.extraversion === 1) typeScores.dynamo += 2;
    if (scores.selfReliance === 1) typeScores.dynamo += 1;

    // Find top type
    let maxScore = -1;
    let resultType = 'creator';
    Object.entries(typeScores).forEach(([type, score]) => {
        if (score > maxScore) {
            maxScore = score;
            resultType = type;
        }
    });

    return resultType;
}

class NeuralPathwayScanner {
    constructor() {
        this.currentRound = 0;
        this.scores = {};
        this.timerInterval = null;
        this.timeLeft = 3000;
        this.resultType = null;
        this.isTransitioning = false;
        this.resultViewTracked = false;
        this.hideLoader();
        this.init();
    }

    hideLoader() {
        window.addEventListener('load', () => {
            const loader = document.getElementById('app-loader');
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 300);
            }
        });
    }

    async init() {
        try {
            if (window.i18n && typeof window.i18n.init === 'function') {
                await i18n.init();
            }
        } catch (e) {
            console.warn('i18n init failed:', e.message);
        }
        this.setupEventListeners();
        this.setupGA();
    }

    setupGA() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: 'Neural Pathway Scanner',
                page_location: window.location.href
            });
        }
    }

    trackEvent(eventName, params = {}) {
        const payload = Object.assign({ app_name: 'brain-type' }, params);
        if (typeof gtag === 'function') {
            gtag('event', eventName, payload);
        } else {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(Object.assign({ event: eventName }, payload));
        }
    }

    getCurrentLang() {
        if (window.i18n && typeof i18n.getCurrentLanguage === 'function') {
            return i18n.getCurrentLanguage();
        }
        return document.documentElement.lang || 'en';
    }

    getShareUrl() {
        const url = new URL(window.location.origin + window.location.pathname);
        const resultType = this.resultType || 'unknown';
        url.searchParams.set('lang', this.getCurrentLang());
        url.searchParams.set('utm_source', 'share');
        url.searchParams.set('utm_medium', 'brain_type_result');
        url.searchParams.set('utm_campaign', 'personality_result_share');
        url.searchParams.set('utm_content', resultType);
        if (this.resultType) url.searchParams.set('brain_type', this.resultType);
        return url.toString();
    }

    getShareEventParams(method, extra = {}) {
        const resultType = this.resultType || 'unknown';
        return Object.assign({
            content_type: 'test_result',
            surface: 'result_actions',
            method,
            result_type: resultType,
            lang: this.getCurrentLang(),
            utm_source: 'share',
            utm_medium: 'brain_type_result',
            utm_campaign: 'personality_result_share',
            utm_content: resultType
        }, extra);
    }

    getSlugFromHref(href) {
        try {
            const url = new URL(href, window.location.origin);
            const parts = url.pathname.split('/').filter(Boolean);
            return parts[parts.length - 1] || 'home';
        } catch (error) {
            return 'unknown';
        }
    }

    setupEventListeners() {
        const startBtn = document.getElementById('start-btn');
        if (startBtn) startBtn.addEventListener('click', () => this.startScan());

        const retryBtn = document.getElementById('retry-btn');
        if (retryBtn) retryBtn.addEventListener('click', () => this.reset());

        const choiceA = document.getElementById('choice-a');
        const choiceB = document.getElementById('choice-b');
        if (choiceA) choiceA.addEventListener('click', () => this.makeChoice('a'));
        if (choiceB) choiceB.addEventListener('click', () => this.makeChoice('b'));

        // Language
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) langToggle.addEventListener('click', () => this.toggleLangMenu());

        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                if (lang) this.changeLang(lang);
            });
        });

        // Theme
        this.initTheme();

        // Share buttons
        const shareTwitter = document.getElementById('share-twitter');
        const shareFacebook = document.getElementById('share-facebook');
        const shareCopy = document.getElementById('share-copy');
        if (shareTwitter) shareTwitter.addEventListener('click', () => this.shareTwitter());
        if (shareFacebook) shareFacebook.addEventListener('click', () => this.shareFacebook());
        if (shareCopy) shareCopy.addEventListener('click', () => this.shareCopy());

        document.querySelectorAll('.growth-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.trackEvent('brain_type_growth_click', {
                    cta_surface: card.getAttribute('data-growth-surface') || 'intro_growth',
                    link_position: index + 1,
                    target_slug: card.getAttribute('data-target-slug') || this.getSlugFromHref(card.href),
                    destination: card.href,
                    target_label: card.textContent.trim().replace(/\s+/g, ' ').slice(0, 120)
                });
            });
        });

        document.querySelectorAll('.related-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.trackEvent('brain_type_related_click', {
                    related_position: index + 1,
                    related_key: card.getAttribute('data-related-key') || this.getSlugFromHref(card.href),
                    destination: card.href,
                    target_label: card.textContent.trim().replace(/\s+/g, ' ').slice(0, 120)
                });
            });
        });

        document.querySelectorAll('.related-games a').forEach((link, index) => {
            link.addEventListener('click', () => {
                this.trackEvent('brain_type_footer_link_click', {
                    link_position: index + 1,
                    target_slug: this.getSlugFromHref(link.href),
                    destination: link.href,
                    target_label: link.textContent.trim()
                });
            });
        });
    }

    initTheme() {
        const toggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        const saved = localStorage.getItem('app-theme') || 'dark';
        html.setAttribute('data-theme', saved);
        this.updateThemeBtn(saved);

        if (toggle) {
            toggle.addEventListener('click', () => {
                const current = html.getAttribute('data-theme') || 'dark';
                const next = current === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                localStorage.setItem('app-theme', next);
                this.updateThemeBtn(next);
            });
        }
    }

    updateThemeBtn(theme) {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
        }
    }

    toggleLangMenu() {
        const menu = document.getElementById('lang-menu');
        if (menu) menu.classList.toggle('hidden');
    }

    async changeLang(lang) {
        if (window.i18n) {
            await i18n.setLanguage(lang);
        }
        document.getElementById('lang-menu').classList.add('hidden');

        // If on scan screen, update current scenario
        if (this.currentRound > 0 && this.currentRound <= 10 && !this.resultType) {
            this.displayScenario();
        }
        // If on result screen, re-render result
        if (this.resultType) {
            this.displayResult();
        }
    }

    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        window.scrollTo(0, 0);
    }

    // === PHASE 1: RAPID FIRE ===
    startScan() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'test_start', { app_name: 'brain-type', content_type: 'neural_scan' });
        }

        this.currentRound = 0;
        this.scores = {};
        this.resultType = null;
        this.resultViewTracked = false;

        // Reset all neural pathways in SVG
        for (let i = 0; i < 10; i++) {
            const np = document.getElementById('np-' + i);
            if (np) {
                np.classList.remove('active');
                np.style.opacity = '0';
            }
        }

        this.showScreen('scan-screen');
        this.nextRound();
    }

    nextRound() {
        if (this.currentRound >= 10) {
            this.startAnalyzing();
            return;
        }

        this.isTransitioning = false;
        const scenario = SCENARIOS[this.currentRound];

        // Update progress
        const progress = ((this.currentRound + 1) / 10) * 100;
        document.getElementById('scan-progress-fill').style.width = progress + '%';
        document.getElementById('scan-current').textContent = this.currentRound + 1;

        // Display scenario
        this.displayScenario();

        // Start timer
        this.startTimer();
    }

    displayScenario() {
        const scenario = SCENARIOS[this.currentRound];
        const t = (key) => (window.i18n && typeof i18n.t === 'function') ? i18n.t(key) : key;

        document.getElementById('scenario-text').textContent = t(scenario.scenarioKey);
        const choiceA = document.getElementById('choice-a');
        const choiceB = document.getElementById('choice-b');
        choiceA.textContent = t(scenario.choiceAKey);
        choiceB.textContent = t(scenario.choiceBKey);
        choiceA.className = 'choice-btn choice-a';
        choiceB.className = 'choice-btn choice-b';
        choiceA.disabled = false;
        choiceB.disabled = false;
    }

    startTimer() {
        this.timeLeft = 3000;
        const timerCircle = document.getElementById('timer-circle');
        const timerText = document.getElementById('timer-text');
        const timerContainer = document.querySelector('.timer-container');
        const circumference = 2 * Math.PI * 26; // r=26

        timerCircle.style.strokeDashoffset = '0';
        timerText.textContent = '3';
        timerContainer.classList.remove('timer-urgent');

        clearInterval(this.timerInterval);
        const startTime = Date.now();

        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            this.timeLeft = Math.max(0, 3000 - elapsed);
            const fraction = this.timeLeft / 3000;

            timerCircle.style.strokeDashoffset = (circumference * (1 - fraction)).toFixed(1);
            timerText.textContent = Math.ceil(this.timeLeft / 1000);

            if (this.timeLeft <= 1000) {
                timerContainer.classList.add('timer-urgent');
            }

            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.autoChoice();
            }
        }, 50);
    }

    autoChoice() {
        // Timeout: random choice with visual indication
        const random = Math.random() < 0.5 ? 'a' : 'b';
        const btn = document.getElementById('choice-' + random);
        btn.classList.add('timeout-auto');
        this.makeChoice(random, true);
    }

    makeChoice(choice, isTimeout = false) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        clearInterval(this.timerInterval);

        const scenario = SCENARIOS[this.currentRound];
        // A = 1 (high on dimension), B = 0 (low on dimension)
        this.scores[scenario.dimension] = choice === 'a' ? 1 : 0;

        // Disable buttons and show selection
        const choiceA = document.getElementById('choice-a');
        const choiceB = document.getElementById('choice-b');
        choiceA.disabled = true;
        choiceB.disabled = true;

        if (!isTimeout) {
            const selected = document.getElementById('choice-' + choice);
            selected.classList.add('selected');
        }

        // Activate neural pathway in brain SVG
        const np = document.getElementById('np-' + this.currentRound);
        if (np) {
            np.classList.add('active');
        }

        // GA event for choice
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scan_choice', {
                round: this.currentRound + 1,
                dimension: scenario.dimension,
                choice: choice,
                timeout: isTimeout
            });
        }

        this.currentRound++;

        // Brief pause then next round
        setTimeout(() => this.nextRound(), 500);
    }

    // === PHASE 2: ANALYZING ===
    startAnalyzing() {
        this.showScreen('analyzing-screen');

        const fill = document.getElementById('analyzing-fill');
        const percent = document.getElementById('analyzing-percent');
        const detail = document.getElementById('analyzing-detail');
        const t = (key) => (window.i18n && typeof i18n.t === 'function') ? i18n.t(key) : key;

        const steps = [
            { pct: 15, key: 'analyzing.mapping' },
            { pct: 35, key: 'analyzing.synapses' },
            { pct: 55, key: 'analyzing.patterns' },
            { pct: 75, key: 'analyzing.cognitive' },
            { pct: 90, key: 'analyzing.finalizing' },
            { pct: 100, key: 'analyzing.complete' }
        ];

        let step = 0;
        const advanceStep = () => {
            if (step >= steps.length) {
                // Done analyzing
                setTimeout(() => {
                    this.resultType = determineBrainType(this.scores);

                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'test_complete', {
                            app_name: 'brain-type',
                            result_type: this.resultType
                        });
                    }

                    this.showScreen('result-screen');
                    this.displayResult();
                }, 400);
                return;
            }

            const s = steps[step];
            fill.style.width = s.pct + '%';
            percent.textContent = s.pct + '%';
            detail.textContent = t(s.key);
            step++;
            setTimeout(advanceStep, 400 + Math.random() * 300);
        };

        setTimeout(advanceStep, 300);
    }

    // === RESULT ===
    displayResult() {
        const type = BRAIN_TYPES[this.resultType];
        const t = (key) => (window.i18n && typeof i18n.t === 'function') ? i18n.t(key) : key;

        // Header
        document.getElementById('result-emoji').textContent = type.emoji;
        document.getElementById('result-title').textContent = t(type.nameKey);
        document.getElementById('result-tagline').textContent = t(type.taglineKey);

        // Percentile stat
        const percentile = this.calculatePercentile();
        const percentileText = t('result.percentileStat').replace('{percent}', percentile);
        document.getElementById('percentile-stat').innerHTML = percentileText;

        // Description
        document.getElementById('result-description').innerHTML = '<p>' + t(type.descKey) + '</p>';

        // Neural metrics
        const metricsGrid = document.getElementById('metrics-grid');
        metricsGrid.innerHTML = '';

        const metricLabels = {
            creativity: t('metric.creativity'),
            logic: t('metric.logic'),
            empathy: t('metric.empathy'),
            intuition: t('metric.intuition'),
            drive: t('metric.drive')
        };

        const metricColors = {
            creativity: '#ff6b6b',
            logic: '#4ecdc4',
            empathy: '#ff8fab',
            intuition: '#9b59b6',
            drive: '#ffd93d'
        };

        Object.entries(type.metrics).forEach(([key, value]) => {
            const row = document.createElement('div');
            row.className = 'metric-row';
            row.innerHTML = `
                <div class="metric-label">
                    <span class="metric-name">${metricLabels[key] || key}</span>
                    <span class="metric-value">${value}%</span>
                </div>
                <div class="metric-bar-bg">
                    <div class="metric-bar-fill" style="background: ${metricColors[key] || '#e040fb'};" data-width="${value}"></div>
                </div>
            `;
            metricsGrid.appendChild(row);
        });

        // Animate metric bars
        requestAnimationFrame(() => {
            setTimeout(() => {
                metricsGrid.querySelectorAll('.metric-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
            }, 100);
        });

        // Key traits
        const traitsList = document.getElementById('traits-list');
        traitsList.innerHTML = '';
        type.traitsKeys.forEach(key => {
            const tag = document.createElement('span');
            tag.className = 'trait-tag';
            tag.textContent = t(key);
            traitsList.appendChild(tag);
        });

        // Result brain SVG color
        const resultOutline = document.querySelector('.result-outline');
        if (resultOutline) {
            resultOutline.style.stroke = type.color;
        }

        // Build result brain pathways
        this.buildResultBrainPaths(type.color);

        // Confetti
        this.createConfetti();

        if (!this.resultViewTracked) {
            this.resultViewTracked = true;
            this.trackEvent('result_view', this.getShareEventParams('view', {
                surface: 'result_screen'
            }));
            this.trackEvent('brain_type_result_view', this.getShareEventParams('view', {
                surface: 'result_screen'
            }));
        }
    }

    calculatePercentile() {
        // 8 brain types → each ~12.5%
        const typeDistribution = {
            creator: 14,
            analyzer: 13,
            empath: 15,
            intuitive: 11,
            strategist: 12,
            visionary: 10,
            guardian: 16,
            dynamo: 9
        };
        return typeDistribution[this.resultType] || 12;
    }

    buildResultBrainPaths(color) {
        const svg = document.getElementById('brain-svg-result');
        if (!svg) return;

        // Remove old dynamic paths
        svg.querySelectorAll('.result-np').forEach(p => p.remove());

        const paths = [
            'M70,55 Q85,45 100,60 Q110,70 95,85',
            'M130,55 Q115,45 100,60 Q90,70 105,85',
            'M55,80 Q70,70 85,82 Q100,94 80,108',
            'M145,80 Q130,70 115,82 Q100,94 120,108',
            'M65,110 Q80,100 95,112 Q105,120 88,132',
            'M135,110 Q120,100 105,112 Q95,120 112,132',
            'M75,135 Q90,125 100,138 Q110,150 95,160',
            'M125,135 Q110,125 100,138 Q90,150 105,160',
            'M80,155 Q95,148 100,158 Q105,168 100,175',
            'M120,155 Q105,148 100,158 Q95,168 100,175'
        ];

        const ns = 'http://www.w3.org/2000/svg';
        paths.forEach((d, i) => {
            // Only draw paths for dimensions that were scored as A (1)
            const scenario = SCENARIOS[i];
            const isActive = this.scores[scenario.dimension] === 1;

            const path = document.createElementNS(ns, 'path');
            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', isActive ? color : 'rgba(255,255,255,0.1)');
            path.setAttribute('stroke-width', isActive ? '2' : '1');
            path.setAttribute('filter', isActive ? 'url(#glow-result)' : '');
            path.setAttribute('class', 'result-np');
            path.style.opacity = isActive ? '0.8' : '0.2';

            if (isActive) {
                path.style.strokeDasharray = '200';
                path.style.strokeDashoffset = '200';
                path.style.animation = `draw-path 1s ease-out ${i * 0.1}s forwards`;
            }

            svg.appendChild(path);
        });

        // Add draw-path keyframes if not already present
        if (!document.getElementById('result-path-style')) {
            const style = document.createElement('style');
            style.id = 'result-path-style';
            style.textContent = '@keyframes draw-path { to { stroke-dashoffset: 0; } }';
            document.head.appendChild(style);
        }
    }

    createConfetti() {
        const container = document.getElementById('confetti-container');
        container.innerHTML = '';
        const colors = ['#e040fb', '#ff69f8', '#00d4ff', '#ff6b6b', '#4ecdc4', '#ffd93d', '#9b59b6'];

        for (let i = 0; i < 35; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 0.5) + 's';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(piece);
            setTimeout(() => piece.remove(), 3500);
        }
    }

    // === SHARE ===
    shareTwitter() {
        const type = BRAIN_TYPES[this.resultType];
        const t = (key) => (window.i18n && typeof i18n.t === 'function') ? i18n.t(key) : key;
        const template = t('share.twitterText');
        const text = template
            .replace('{type}', t(type.nameKey))
            .replace('{emoji}', type.emoji);
        const shareUrl = this.getShareUrl();
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=550,height=420');

        const params = this.getShareEventParams('twitter', { share_url: shareUrl });
        this.trackEvent('brain_type_share_click', params);
        this.trackEvent('share', params);
    }

    shareFacebook() {
        const shareUrl = this.getShareUrl();
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=550,height=420');

        const params = this.getShareEventParams('facebook', { share_url: shareUrl });
        this.trackEvent('brain_type_share_click', params);
        this.trackEvent('share', params);
    }

    shareCopy() {
        const type = BRAIN_TYPES[this.resultType];
        const t = (key) => (window.i18n && typeof i18n.t === 'function') ? i18n.t(key) : key;
        const shareUrl = this.getShareUrl();
        const template = t('share.copyText');
        const text = template
            .replace('{type}', t(type.nameKey))
            .replace('{emoji}', type.emoji)
            .replace('{url}', shareUrl);

        navigator.clipboard.writeText(text).then(() => {
            alert(t('message.copy_success'));
            const params = this.getShareEventParams('clipboard', { share_url: shareUrl });
            this.trackEvent('brain_type_copy_link', params);
            this.trackEvent('share', params);
        }).catch(() => {
            alert(t('message.copy_error'));
        });
    }

    reset() {
        this.currentRound = 0;
        this.scores = {};
        this.resultType = null;
        this.resultViewTracked = false;
        clearInterval(this.timerInterval);
        this.showScreen('intro-screen');
    }
}

// Start app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new NeuralPathwayScanner();
});
