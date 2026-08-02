// ============================================================
// MOTION SETTINGS · 所有主要动效参数集中在这里
// 时间单位为 ms；比例通常使用 0–1；位置与遮罩使用百分比数值。
// ============================================================
const MOTION_SETTINGS = {
  // 默认尊重系统「减少动态效果」；章节视频仍保留，因为它们承载叙事内容。
  // 若展览设备必须统一播放完整动效，可将 forceFullMotion 改为 true。
  motionPolicy: {
    forceFullMotion:false
  },

  // Prologue 五段文字：出现时间、模糊、缩放与段落间隔
  introText: {
    initialDelay:500,
    focusDuration:2800,
    paragraphGap:450,
    easing:"easeOutCubic",
    initialBlurPx:24,
    blurCurve:1.35,
    initialScale:1.22,
    initialLiftRem:.35,
    initialOpacity:.08
  },

  // 跋：第六章街景淡出到与序言共用的粒子背景，随后自动显露五段文字。
  epilogue: {
    navigationLockDuration:3600,
    textInitialDelay:520,
    focusDuration:2200,
    paragraphGap:350,
    easing:"easeOutCubic",
    initialBlurPx:24,
    blurCurve:1.35,
    initialScale:1.2,
    initialLiftRem:.35,
    initialOpacity:.06
  },

  // 手机上把序幕/跋这两段文字的初始状态改得更"可见":
  // 起始透明度从接近 0 提高、模糊和放大幅度减小、开场延迟缩短,
  // 目的是让用户在加载/低网速时,一进来就能看到一点内容在动,
  // 不会误以为屏幕是黑的、卡住了。整体渐显的感觉还在,只是不再从"完全看不见"开始。
  ...(document.documentElement.classList.contains("is-small-device") ? {
    introText: {
      initialDelay:120, focusDuration:1700, paragraphGap:280, easing:"easeOutCubic",
      initialBlurPx:10, blurCurve:1.35, initialScale:1.06, initialLiftRem:.2, initialOpacity:.32
    },
    epilogue: {
      navigationLockDuration:3600, textInitialDelay:140, focusDuration:1500, paragraphGap:230,
      easing:"easeOutCubic", initialBlurPx:10, blurCurve:1.35, initialScale:1.05, initialLiftRem:.2, initialOpacity:.3
    }
  } : {}),

  // Intro 星河：全部由 Canvas + requestAnimationFrame 执行。
  // 数量、团簇、漂移、明暗呼吸、粒径、鼠标打散与回弹均只在此处控制；CSS 不参与粒子动效。
  introParticles: {
    maxPixelRatio:2,
    largeViewportMaxPixelRatio:1.25,
    largeViewportPixelThreshold:2500000,
    lowPowerCountScale:.72,
    lowPowerFrameInterval:33.333,
    standardFrameInterval:16.667,
    // Aura 以 WebGL 绘制约12万粒子；Canvas 使用较低数量匹配其可见密度，避免移动设备过载。
    minCount:2200,
    maxCount:5600,
    densityDivisor:330,
    clusterCount:9,
    clusterProbability:.7,
    galaxyBandProbability:.62,
    galaxyCenterY:.5,
    galaxyWaveCycles:2.65,
    galaxyWavePhase:-.8,
    galaxyWaveAmplitude:.11,
    clusterCenterScatterY:.1,
    clusterSpreadXMin:.025,
    clusterSpreadXMax:.1,
    clusterSpreadYMin:.025,
    clusterSpreadYMax:.115,
    galaxyScatterY:.2,
    depthPower:1.7,
    driftMin:.0425,
    driftDepthRange:.1275,
    // 可见点径约 1.05–2.24px，并继续由 depth 形成远近差异。
    radiusMin:.525,
    radiusDepthRange:.595,
    alphaMin:.045,
    alphaDepthRange:.48,
    twinkleSpeedMin:.003,
    twinkleSpeedMax:.008,
    shimmerBase:.52,
    shimmerRange:.48,
    shimmerClockRate:.00012,
    // 粒子光晕：复用一张柔边径向渐变光斑；透明度与半径仅做轻微呼吸。
    glowDepthThreshold:.16,
    glowActivationThreshold:.22,
    glowRadiusMultiplier:4,
    glowAlphaMultiplier:.16,
    glowBreathClockRate:.00022,
    glowBreathPhaseScale:.63,
    glowBreathBase:.72,
    glowBreathRange:.28,
    glowBreathRadiusRange:.07,
    // 流动亮星：约1%同时处于最亮阶段；每颗周期不同，因此亮星身份持续轮换。
    brightStarFraction:.01,
    brightStarFadeFraction:.008,
    brightStarCycleMinMs:14000,
    brightStarCycleMaxMs:30000,
    brightStarGlowMultiplier:2.4,
    brightStarRadiusGain:.2,
    brightStarShimmerLift:.35,
    // 鼠标扰动：参考柔和、滞后的局部排斥场。粒子只被暂时推离锚点，不累积飞散速度。
    interactionRadiusMin:105,
    interactionRadiusMax:190,
    interactionRadiusWidthRatio:.12,
    interactionThreshold:.015,
    interactionDisplacement:72,
    interactionDepthBase:.88,
    interactionDepthRange:.24,
    pointerFollow:.1,
    pointerPresenceResponse:.14,
    // 参考页只有鼠标目标的 0.1 跟随；粒子位移本身逐帧直接响应，不叠加第二层迟滞。
    particleResponse:1,
    wrapPaddingX:4,
    wrapPaddingY:6,
    resizeDebounce:160
  },

  // 每章先导文：滚动换句、邻句状态与滚轮灵敏度
  narrativeText: {
    scrollDuration:1050,
    easing:"easeInOutCubic",
    neighborOpacity:.22,
    unfocusedScale:.88,
    focusedScale:1,
    blurPerStepRem:.08,
    maxBlurRem:.3,
    zhBaseOpacity:.48,
    zhFocusGain:.52,
    enBaseOpacity:.3,
    enFocusGain:.5,
    activeThreshold:.02,
    neighborRange:1.02,
    wheelThreshold:12,
    wheelThrottle:800
  },

  // 先导文后段：底图从黑暗中逐步显露的程度
  leadBackground: {
    revealLineCount:3,
    maxOpacity:.46,
    initialBlurRem:2.4,
    blurReductionRem:1.15,
    initialBrightness:.3,
    brightnessGain:.28,
    initialScale:1.06,
    scaleReduction:.025
  },

  // 第六章先导文：抽象光场从黑暗中显形，并逐步对齐最终街景的光源。
  portalNeon: {
    chapterIndex:5,
    leadInOffset:.65,
    blobs:[
      { id:"blue", startX:.54, startY:.48, endX:1360, endY:95, opacity:.54, revealAt:0, scaleStart:.72, scaleEnd:1.08 },
      { id:"rose", startX:.61, startY:.43, endX:345, endY:420, opacity:.3, revealAt:.12, scaleStart:.65, scaleEnd:1 },
      { id:"amber", startX:.48, startY:.54, endX:1195, endY:278, opacity:.62, revealAt:.25, scaleStart:.7, scaleEnd:1.08 },
      { id:"reflection", startX:.44, startY:.58, endX:875, endY:755, opacity:.24, revealAt:.52, scaleStart:.52, scaleEnd:1.02 }
    ]
  },

  // 底图 → 完成拼贴图：停留、时长、遮罩位置与共同质感
  chapterReveal: {
    baseFadeDuration:1000,
    baseHoldDuration:650, // 原 1000ms，缩短 35%
    defaultRevealDuration:3000,
    chapterEntryDelay:450,
    imageToTextDelay:1250,
    baseFadeEasing:"easeOutCubic",
    revealEasing:"easeInOutCubic",
    durations:[3000,3600,3200,3000,2800,2800],
    feather:{ width:24, middleAlpha:.46, middlePosition:.45 },
    centerDissolve:{
      finalRadius:105,
      origins:{
        chapter1:{ x:40, y:61, radius:95 },     // 大“蕙”字
        chapter3:{ x:50, y:35, radius:95, featherWidth:30 },     // 宣传海报中心
        chapter5:{ x:59, y:69, radius:110, featherWidth:30 },    // 红门
        finalScene:{ x:90, y:91, radius:145, featherWidth:30 }   // 猫（第六章；时间线含 Intro 时为第七幕）
      }
    },
    outsideIn:{ focusX:67.5, focusY:31, initialHoleRadius:101, innerFeather:3, outerFeather:8, featherAlpha:.18 },
    posterSplit:{ topInset:58, bottomInset:42 },
    sweep:{},
    dissolve:{ cellSize:1, fadeSpan:.24, maxPixelRatio:1.5 }
  },

  // 透明视频图层：本章 reveal 完成后的启动时间与播放速度。
  // 每章可在 motionOverlay 中单独覆盖 startDelay / playbackRate。
  chapterMotion: {
    startDelay:0,
    playbackRate:1
  },

  // 第五章门交互：坐标和尺寸均基于 1659 × 948 原图，以百分比投影到任意屏幕。
  doorTransition: {
    chapterIndex:4,
    targetChapterIndex:5,
    triggerMotionId:"ch5-door-trigger",
    triggerVisibleProgress:1,
    x:59.4,
    y:69.5,
    width:2.45,
    height:11.5,
    washDuration:2500,
    reducedWashDuration:2500,
    solidBlackHoldDuration:220,
    washEasing:"easeInOutCubic",
    maxPixelRatio:.75,
    blobCount:5,
    blobStagger:.07,
    blobStartRadius:5,
    blobOverscan:1.12,
    blobAlphaMin:.16,
    blobAlphaMax:.28,
    blobWashStart:.62,
    blobWashComplete:.92,
    blobEasing:"easeInOutCubic",
    blobPointCount:32,
    blobEdgeAmplitude:.052,
    blobEdgeDetail:.018,
    blobMotionCycles:.34,
    blobRotation:.16,
    glowStartRadius:8,
    glowOverscan:1.32,
    glowRingInner:.34,
    glowRingPeak:.67,
    glowRingOuter:.98,
    glowRingAlpha:.72,
    glowPulseAmplitude:.055,
    glowPulseCycles:1.15,
    ripplePointCount:96,
    rippleAmplitudeRatio:.035,
    rippleAmplitudeMax:22,
    rippleFrequencyA:5,
    rippleFrequencyB:9,
    rippleFrequencyC:14,
    rippleClockRate:.0034,
    rippleStrokeAlpha:.3,
    rippleStrokeWidthRatio:.009,
    zoomParticleCount:240,
    zoomParticleAlpha:.52,
    zoomParticleSpeedMin:.72,
    zoomParticleSpeedMax:1.42,
    zoomParticleLengthMin:1.5,
    zoomParticleLengthMax:22,
    zoomParticleWidthMin:.55,
    zoomParticleWidthMax:2.2,
    glowWashStart:.6,
    glowEasing:"easeInOutCubic",
    particleCountMin:10000,
    particleCountMax:18000,
    particleDensityDivisor:115,
    particleBirthSpan:.92,
    particleFadeInSpan:.045,
    particleRadiusMin:.42,
    particleRadiusMax:1.15,
    particleAlphaMin:.14,
    particleAlphaMax:.84,
    particleBrightFraction:.01,
    particleCenterBias:1.55,
    particleReach:1.12,
    particleCoverStart:0,
    particleCoverScale:2,
    whiteFadeStart:.68,
    whiteFadeEasing:"easeInOutCubic",
    emissionStartRadiusMin:.002,
    emissionStartRadiusMax:.018,
    emissionEndRadiusMin:.28,
    emissionEndRadiusMax:1.12,
    emissionCurveMax:.38,
    emissionPulseAngle:.075,
    emissionPulseMin:6,
    emissionPulseMax:24,
    spiralArms:7,
    spiralTurns:2.35,
    spiralJitter:.62,
    spiralRotation:1.1
  },

  // 页面级过渡
  interface: {
    startDismissDuration:1400
  }
};

// 第六章环境声：滚动驱动的音量渐强，与画面 reveal 节奏对齐。
// 播放优先走 Web Audio decodeAudioData → AudioBufferSourceNode（sample-accurate loop），
// 从根源避免 OGG/AAC 容器编码 priming padding（编码器在音频首尾插入的、不可听的"预热帧"）
// 造成的循环接缝停顿/静音。仅当 fetch/decode 失败（如本地 file:// 协议下 CORS 限制）时，
// 才退化为 <audio> 元素 + 手动提前跳回的近似方案（见 ensureChapter6AmbientElement 内的 fallback 分支）。
const CHAPTER_6_SOUND = {
  srcOgg:"assets/sound/ch6-ambient.ogg",
  srcM4a:"assets/sound/ch6-ambient.m4a",
  // 先导文阶段不出声：环境声只在画面完全 reveal 后才开始播放（见 revealChapter6Ambient）。
  // 画面完全 reveal 后，从静音直接淡入到满音量（在原满音量基础上整体下调 20%，作为背景音乐应保持安静）。
  revealVolume:.8,
  revealFadeDuration:1800,
  // 离开第六章（跳转到跋、其他章节或时间线）时的淡出时长。
  exitFadeDuration:1200,
  // 用户在静音状态下点击「声音」开关：音频从头播放，音量在此时长内淡入到当前滚动/画面阶段应有的目标值。
  unmuteFadeDuration:500,
  // --- Web Audio 主管线的循环裁切 ---
  // 跳过源文件头部的编码器 priming padding（不可听的预热静音），loop 起点从这里开始。
  // 若源音频本身开头就是有效内容（无 padding），可设为 0。
  loopStartSeconds:.05,
  // 跳过源文件尾部同理存在的 padding；loop 终点为 buffer 总时长减去这个量。
  loopEndTrimSeconds:.05,
  // --- <audio> 元素 fallback 管线专用（仅在 Web Audio 管线不可用时生效）---
  // <audio> 元素手动无缝循环：在距结尾这么多秒时提前跳回 0，避免原生 loop 在编解码器边界处的卡顿/静默。
  // 注意：这个 fallback 只能近似处理尾部，无法处理头部 padding，效果不如主管线。
  loopTailSeconds:.3
};

// 第四章 BGM（ch4-hum）：与 Ch6 环境声相同的 sample-accurate 无缝循环方案。
// 先导文阶段不出声；画面（大字报/毛像 motion）出现的一刻才开始播放。
const CHAPTER_4_SOUND = {
  srcOgg:"assets/sound/ch4-hum.ogg",
  srcM4a:"assets/sound/ch4-hum.m4a",
  revealVolume:1,
  revealFadeDuration:1800,
  exitFadeDuration:1200,
  unmuteFadeDuration:500,
  loopStartSeconds:.05,
  loopEndTrimSeconds:.05,
  loopTailSeconds:.3
};

// 第五章开门音效：单次播放（不循环），与门开启动效同时触发。
// 走与第六章环境声相同的 decodeAudioData → AudioBufferSourceNode 管线（共用同一个 AudioContext），
// 但使用独立的 GainNode，音量与 Ch6 环境声互不影响。
// 调音量：改下面的 volume 值即可（0 = 静音，1 = 满音量）。
const CHAPTER_5_DOOR_SOUND = {
  srcOgg:"assets/sound/5-door.ogg",
  srcM4a:"assets/sound/ch5-door.m4a",
  // 门声音量 —— 后期在这里调节。
  volume:.2
};

const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
let motionPreference = "full";
try {
  motionPreference = localStorage.getItem("1970-motion-preference") || "full";
} catch (_) {}

const FONT_SIZE_PRESETS = [
  { id:"standard", label:"标准", nextLabel:"调大内容字体", scale:1 },
  { id:"large", label:"较大", nextLabel:"恢复标准内容字体", scale:1.18 }
];

const TRADITIONAL_CHINESE_LOCALIZATIONS = [
  ["歷史背景", "歷史脈絡"],
  ["側欄正文語言", "側欄內文語言"],
  ["小說原文閱讀", "小說原文"],
  ["圖像註釋", "圖像註解"],
  ["歷史核心", "歷史脈絡"],
  ["與沈蕙蘭的關係", "與沈蕙蘭的關聯"],
  ["腳註", "註釋"],
  ["準確題名", "正確題名"],
  ["準確標題", "正確標題"],
  ["樓道", "走廊"],
  ["屏幕", "螢幕"],
  ["打開聲音", "開啟聲音"],
  ["關閉聲音", "關閉聲音"],
  ["開啟動效", "開啟動態效果"],
  ["關閉動效", "關閉動態效果"],
  ["調大內容字體", "放大內文字級"],
  ["恢復標準內容字體", "恢復標準內文字級"],
  ["標準", "標準"],
  ["較大", "較大"],
  ["字號", "字級"],
  ["聲音", "聲音"],
  ["動效", "動態效果"]
];

let fontSizePreference = "standard";
try {
  fontSizePreference = localStorage.getItem("1970-font-size-preference") || "standard";
} catch (_) {}

function prefersReducedMotion() {
  if (motionPreference === "full") return false;
  if (motionPreference === "reduced") return true;
  return !MOTION_SETTINGS.motionPolicy.forceFullMotion && !!reducedMotionQuery?.matches;
}

function applyMotionEasing(name, progress) {
  if (name === "linear") return progress;
  if (name === "easeOutCubic") return 1 - Math.pow(1 - progress, 3);
  if (name === "easeInOutCubic") {
    return progress < .5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }
  return progress;
}

const TERMS = {
  "cultural-revolution": {
    number: 1,
    zh: "文化大革命",
    en: "Wénhuà Dàgémìng (“Great Proletarian Cultural Revolution”)",
    bodyZh: "通常指1966年至1976年间席卷中国的政治与社会运动。教育、文化与日常生活受到全面冲击，知识分子、干部及许多普通家庭遭到审查、批斗、迁徙或长期分离。",
    bodyEn: "A political and social movement that convulsed China from 1966 to 1976. Education, culture, and everyday life were disrupted; intellectuals, officials, and many ordinary families faced denunciation, forced relocation, and prolonged separation."
  },
  "stinking-ninth": {
    number: 2,
    zh: "臭老九",
    en: "Chòu Lǎo Jiǔ (“Stinking Old Ninth”)",
    bodyZh: "文革中贬称知识分子的政治标签。“老九”借用了旧有的社会等级说法，加上“臭”以后成为羞辱、排斥教师、学者和专业人士的用语。",
    bodyEn: "A derogatory Cultural Revolution label for intellectuals. The older expression “the ninth” was intensified with “stinking” and used to humiliate and marginalize teachers, scholars, and professionals."
  },
  "dazibao": {
    number: 3,
    zh: "大字报",
    en: "Dàzìbào (“Big-character Poster”)",
    bodyZh: "以大字书写并张贴在公共空间的政治文字。文革初期，大字报常被用于公开批判、指控个人或动员群众；被点名者往往会立即暴露在集体压力之下。",
    bodyEn: "Large handwritten political texts posted in public. Early in the Cultural Revolution they were used to denounce individuals, circulate accusations, and mobilize crowds, exposing named people to immediate public pressure."
  },
  "may-seventh": {
    number: 4,
    zh: "五七干校",
    en: "Wǔqī Gànxiào (“May Seventh Cadre School”)",
    bodyZh: "文革时期设在农村的劳动与政治学习场所。干部、教师、作家、医生及其他专业人士可能被送往那里参加农业劳动、集体生活与思想学习。",
    bodyEn: "Rural institutions combining manual labor, collective living, and political study. Officials, teachers, writers, doctors, and other professionals could be sent there during the Cultural Revolution."
  },
  "sent-down": {
    number: 5,
    zh: "下乡",
    en: "Xiàxiāng (“Sent Down to a Farm”)",
    bodyZh: "这里指城市青年被安排到农村或农场劳动与生活。1968年12月以后，上山下乡运动迅速扩大，许多青年的教育、工作和家庭关系由此被长期改变。",
    bodyEn: "The dispatch of urban youth to live and work on farms or in rural areas. After December 1968, the movement expanded rapidly and reshaped the education, work, and family lives of millions."
  },
  "highest-directive": {
    number: 6,
    zh: "最高指示",
    en: "Zuìgāo Zhǐshì (“Highest Directive”)",
    bodyZh: "文革时期对毛泽东最新指示的称呼。1968年12月22日传达的指示强调知识青年到农村接受再教育，随后推动了大规模的上山下乡。",
    bodyEn: "A period term for Mao Zedong’s latest instruction. The directive publicized on 22 December 1968 called for educated youth to be re-educated in rural areas and accelerated the mass sent-down movement."
  },
  "commune": {
    number: 7,
    zh: "人民公社",
    en: "Rénmín Gōngshè (“People’s Commune”)",
    bodyZh: "1958年以后中国农村的集体组织形式，通常同时承担生产、行政和公共生活职能。到1969年，公社及其下属生产大队仍是农村劳动与分配的重要框架。",
    bodyEn: "A form of rural collective organization established from 1958, combining production, administration, and public life. In 1969, communes and their production brigades still structured much rural labor and distribution."
  },
  "struggle-session": {
    number: 8,
    zh: "批斗会",
    en: "Pīdòu Huì (“Struggle Session”)",
    bodyZh: "公开批判与施压的集体会议。被针对者可能被迫低头、认错或接受长时间的辱骂；其他参与者也常被要求表态，以证明自己的政治立场。",
    bodyEn: "A collective meeting for public denunciation and coercion. Targets could be forced to bow, confess, or endure prolonged abuse, while others were pressed to declare their political position."
  },
  "thought-reform": {
    number: 9,
    zh: "思想改造",
    en: "Sīxiǎng Gǎizào (“Ideological Reform”)",
    bodyZh: "通过学习、劳动、自我批评和集体监督来改变个人思想的政治要求。叙事中的“不长不短”表现了人在持续审查下学会的自我保护。",
    bodyEn: "A political demand to reshape thought through study, labor, self-criticism, and collective supervision. The narrator’s carefully measured speech shows a form of self-protection under constant scrutiny."
  }
};

const CONTEXTS = [
  {
    title: "儿时父母的书房", titleEn: "My Parents’ Study · 1953",
    zh: "1950年代，教师和读书人家里的书房常兼作读书、备课、藏书和待客的地方。字典、古典小说、画报、家庭照片和宣传画可以放在同一间屋里，这种并置并不矛盾：新中国早期的政治图像已经进入学校、单位和家庭，旧书与新宣传也会在日常空间中同时存在。\n\n1966年以后，这类私人收藏变得危险。旧书、旧画、月份牌和家族照片可能在“破四旧”与抄家中被查抄、封存、涂污或烧毁。书房因此不再只是家庭记忆，也会成为家庭成分和思想倾向被审查的地方。",
    en: "In the 1950s, the study of a teacher or reader often served several uses at once: reading, lesson preparation, book storage, and receiving visitors. Dictionaries, classical fiction, pictorials, family photographs, and propaganda posters could occupy the same room. This mixture was not contradictory. In early PRC domestic life, older books and new political imagery often existed side by side.\n\nAfter 1966, such private collections became vulnerable. Old books, paintings, yuefenpai calendar posters, and family photographs could be seized, sealed away, defaced, or burned during house searches and the Pò Sìjiù (“Destroy the Four Olds”) campaign. A study could therefore become a place where a family’s class background and thoughts were inspected.",
    material: "合成记忆图像｜书房、家庭照片、宣传画与古典仕女图层"
  },
  {
    title: "学校与公开批判", titleEn: "Schools and Public Denunciation · 1966",
    zh: "这类老式高校教学楼和机关楼在1950至60年代很常见。长走廊、成排房门、厚墙、裸露灯泡和克制装饰，来自强调秩序、集体通行和机构功能的建筑习惯，也带有苏联规划与建筑教育的影响。\n\n1966年学校停课后，校园没有停止运转，而是被重新用于政治动员。走廊、办公室门口和公告墙可以迅速变成张贴大字报、围观指控和组织批判的公共场所。建筑原本服务于教学和行政秩序；在运动中，这种集体性也让私人遭遇很难继续留在私人范围内。",
    en: "This kind of older university or government building was common in the 1950s and 1960s. Long corridors, repeated doors, thick walls, exposed bulbs, and restrained decoration came from an institutional approach that valued order, collective circulation, and function. Soviet planning and architectural education also shaped these spaces.\n\nAfter schools closed in 1966, campuses did not simply fall silent. They were repurposed for political mobilization. Corridors, office doors, and notice walls could quickly become public sites for dàzìbào, accusation, and organized criticism. The building had been designed for teaching and administration. During the movement, its collective layout also made private suffering difficult to keep private.",
    material: "合成记忆图像｜学校走廊、手写大字报、红色宣传碎片"
  },
  {
    title: "下乡与人民公社", titleEn: "Sent-down Youth and the Commune · 1968-1969",
    zh: "1968年12月以后，大批城市青年被送到农村、农场和边疆地区接受再教育。到达公社后，个人生活被纳入生产队和生产大队的安排：出工、记工分、分配口粮、政治学习，都由集体制度管理。\n\n宣传画常把农业劳动画成丰收、队列和昂扬姿态。水田里的实际日子更具体：长时间弯腰，脚和腿泡在水里，蚊虫驱不完，伤口反复感染。对一个刚离开学校不久的年轻教师来说，“劳动改造”不是抽象口号，而是每天从身体上重新学习服从。",
    en: "After December 1968, large numbers of urban young people were sent to farms, villages, and frontier regions for re-education. Once they arrived at a commune, private life was absorbed into the routines of the production team and brigade: work assignments, work points, grain distribution, and political study.\n\nPropaganda often showed farm labor as harvest, formation, and uplift. Work in a rice paddy was more bodily and exact: hours bent over, feet and legs in water, mosquitoes that would not disperse, wounds that became infected again and again. For a young teacher recently removed from school, “labor reform” was not an abstract slogan. It was obedience learned through the body.",
    material: "合成记忆图像｜宣传画、稻田倒影与公社劳动场景"
  },
  {
    title: "会议室里的自我审查", titleEn: "Self-surveillance in the Meeting Room · 1969",
    zh: "生产大队会议室是公社日常政治生活的重要空间。这里可以安排劳动、传达通知，也可以政治学习、忆苦思甜、思想汇报和批斗。毛泽东像、政治口号和黑板不是装饰，它们把会议室变成一个持续提醒人如何说话、如何表态的场所。\n\n对参加者来说，开会不只是听通知。一个人要学会把自己的想法整理成当时认可的话，也要在必要时检讨“不该有”的念头。长期处在这种环境中，自我审查会变成一种日常技能。",
    en: "The production brigade meeting room was an important space of everyday political life in a commune. It could be used for work assignments and announcements, as well as political study, speak-bitterness meetings, ideological reports, and struggle sessions. Portraits of Mao Zedong, political slogans, and blackboards were not decoration. They turned the room into a place that continually instructed people how to speak and how to take a position.\n\nFor participants, meetings were not only about receiving notices. A person had to learn how to translate private thought into approved language, and sometimes how to criticize thoughts they were not supposed to have. Over time, self-surveillance became a daily skill.",
    material: "合成记忆图像｜大队会议室、政治标语、黑板与领袖像"
  },
  {
    title: "稻田里的门", titleEn: "The Door in the Rice Paddy · 1970",
    sidebar:false,
    zh: "皖南低地常见水田、田埂和水杉。公社里出工的人每天沿田埂走向水田，傍晚再顺着原路回来。",
    en: "Rice paddies, raised ridges, and dawn redwoods are common in the lowlands of southern Anhui. Commune workers walked along the ridges into the paddies each day and returned the same way at dusk.",
    material: "魔幻现实主义合成图像｜稻田、水杉、黄昏天空与孤立红门"
  },
  {
    title: "门的另一边", titleEn: "The Other Side · Greenwich Village, 1970",
    zh: "1970年前后的格林尼治村，是曼哈顿一个以住宅为主、同时分布着书店、咖啡馆和小型演出场所的街区。红砖公寓的底层常有临街商铺。到了晚上，居民、学生、店员、乐手和来看演出的人会出现在同一片街道上。[6]\n\n独立书店不仅卖书，也会张贴公告，供人碰面和交换信息。1967年开业的奥斯卡·王尔德纪念书店是其中一个重要例子。它出售正面讨论同性恋生活的书籍和期刊，也为社群提供活动信息和聚会空间。[1]\n\n咖啡馆和小型演出场所散布在住宅之间，民谣、蓝调、诗歌朗诵和实验戏剧因此进入街区的日常生活。Gerde's Folk City是当时重要的民谣演出场所，鲍勃·迪伦早期曾在这里演出。[3][11]\n\n本章画面组合了这些同时期的街区元素，并非复原某一条具体街道。",
    en: "Around 1970, Greenwich Village was a Manhattan neighbourhood made up mainly of residences, with bookshops, coffeehouses, and small performance venues among them. Street-level shops often occupied the ground floors of red-brick apartment buildings. At night, residents, students, shop workers, musicians, and people arriving for a show shared the same streets.[6]\n\nIndependent bookshops did more than sell books. They also posted notices and gave people places to meet and exchange information. The Oscar Wilde Memorial Bookshop, which opened in 1967, was an important example. It sold books and periodicals that discussed gay and lesbian life positively and provided activity information and meeting space for the community.[1]\n\nCoffeehouses and small performance venues stood among residential buildings, bringing folk music, blues, poetry readings, and experimental theatre into everyday neighbourhood life. Gerde's Folk City was an important folk venue where Bob Dylan played early engagements.[3][11]\n\nThis chapter combines elements found in the neighbourhood around 1970 rather than reconstructing a specific street.",
    material: "合成场景｜格林尼治村夜间街道、书店、咖啡馆与1970年代车辆",
    references: [
      {
        image:"https://www.nyclgbtsites.org/wp-content/uploads/2021/06/Craig-Rodwell-2-NYPL-1.jpeg",
        alt:"Craig Rodwell and Mei-Mei Sanford at the Oscar Wilde Memorial Bookshop in 1970",
        captionZh:"克雷格·罗德韦尔（Craig Rodwell）与梅梅·桑福德（Mei-Mei Sanford）在奥斯卡·王尔德纪念书店，1970年",
        captionEn:"Craig Rodwell and Mei-Mei Sanford at the Oscar Wilde Memorial Bookshop, 1970",
        source:"Diana Davies / The New York Public Library",
        href:"https://www.nyclgbtsites.org/site/oscar-wilde-memorial-bookshop/"
      }
    ],
    sources: [
      { zh:"[1] NYC LGBTQ Historic Sites Project：Oscar Wilde Memorial Bookshop 史料页", en:"[1] NYC LGBTQ Historic Sites Project: Oscar Wilde Memorial Bookshop", href:"https://www.nyclgbtsites.org/site/oscar-wilde-memorial-bookshop/" },
      { zh:"[3] Village Preservation：1961-1970 年的 Greenwich Village 音乐与咖啡店文化", en:"[3] Village Preservation: Folk Music in Greenwich Village, 1961-1970", href:"https://villagepreservation.org/2015/01/06/folk-music-in-greenwich-village-1961-1970s/" },
      { zh:"[6] Village Preservation：Greenwich Village 的街区、画廊、剧场与社会运动史", en:"[6] Village Preservation: Greenwich Village neighbourhood, gallery, theatre, and social-movement history", href:"https://villagepreservation.org/resources/neighborhood-history/" },
      { zh:"[11] Village Preservation：Gerde's Folk City及其演出者", en:"[11] Village Preservation: Gerde's Folk City and its performers", href:"https://villagepreservation.org/2018/03/28/gerdes-folk-city-the-end-of-a-greenwich-village-icon/" }
    ]
  }
];

// 热点坐标优先使用 Photoshop 原图像素：xPx / yPx（左上角为 0,0）。
// 现有 x / y 百分比数据继续兼容，但会先还原为原图坐标，再按 object-fit:cover 投影。
// id 仅供系统内部识别；zh / en 才会展示给用户。
// Excel「是什么」→ zh / en 标题；「hover信息」→ note 正文，二者不得拼接。
const HOTSPOTS = [
  [
    {
      id:"ch01-kangxi-name", xPx:649, yPx:556,
      zh:"《康熙字典》中的“沈蕙兰”", en:"“Shen Huilan” in the Kangxi Dictionary",
      note:"三个姓名用字从字典页中浮现，连接她对文字、书房与家庭记忆的最初认识。",
      noteEn:"The three characters of her name emerge from the dictionary page, linking literacy with her earliest memories of the study and family life.",
      learnMoreZh:"《康熙字典》成书于清代，按部首和笔画检字；《新华字典》是20世纪面向现代读者的小型工具书，两者的体例和用途不同。[1]\n\n蕙兰小时候在父亲书房里逐字查自己的名字。字页、姓名和识字这几件事留在同一段家庭记忆里。\n\n脚注｜[1] 画面所用版本及“用地支检索部首”的具体方法仍待确认。",
      learnMoreEn:"Compiled in the Qing dynasty, the Kangxi Dictionary organizes characters by radicals and stroke counts. The Xinhua Dictionary is a compact twentieth-century reference work for modern readers; the two work differently.[1]\n\nAs a child, Huilan looks up the characters of her name in Father’s study. The dictionary page, her name, and learning to read belong to the same family memory.\n\nNotes｜[1] The edition shown and the stated lookup method still require confirmation.",
      anchorZh:"蕙兰曾在父亲书房里查自己名字的三个字。放大的字页留住的是她刚认识名字时的记忆。",
      anchorEn:"Huilan once looks up the three characters of her name in Father’s study. The enlarged page holds the memory of first recognizing them.",
      reviewFlag:"待确认：表格中的“用地支检索部首”具体指哪一种《康熙字典》检字标记或版本。"
    },
    {
      id:"ch01-china-soviet-friendship", xPx:514, yPx:228,
      zh:"中苏友好宣传画", en:"Chinese-Soviet Friendship Poster",
      note:"红旗与并置的人物形象，把国家间的政治友好带进家庭日常观看的空间。",
      noteEn:"Red flags and paired figures bring the political alliance between China and the Soviet Union into the visual life of the home.",
      learnMoreZh:"历史核心｜20世纪50年代的中苏友好宣传常用并肩人物、红旗、工业建设和集体劳动表现两国结盟、苏联援助与社会主义现代化。[1]\n\n与沈蕙兰的关系｜海报挂在父亲书房里。对童年的沈蕙兰来说，政治宣传与书籍、备课和家庭生活同时存在。\n\n脚注｜[1] 准确题名、作者、年份与原始图片来源仍待确认。",
      learnMoreEn:"History core｜Chinese-Soviet friendship posters of the 1950s often used paired figures, red flags, industrial construction, and collective labor to represent alliance, Soviet assistance, and socialist modernization.[1]\n\nShen Huilan｜The poster hangs in Father’s study. In Shen Huilan’s childhood, political propaganda shares the room with books, lesson preparation, and family life.\n\nNotes｜[1] The title, artist, date, and original image source remain unconfirmed.",
      reviewFlag:"待确认：海报的准确标题、创作年份、作者及图片来源。"
    },
    {
      id:"ch01-calendar-family", xPx:321, yPx:833,
      zh:"月份牌《合家欢》", en:"Yuefenpai Calendar Poster: A Happy Family",
      note:"月份牌把广告、日历与理想化的家庭图像结合，曾是近代城市家庭常见的商业视觉文化。",
      noteEn:"Yuefenpai combined advertising and calendars with idealized domestic scenes and were once common in urban households.",
      learnMoreZh:"历史核心｜月份牌把商品广告、日历与理想化人物或家庭图像结合，是近代城市商业视觉文化的一部分。[1]\n\n与沈蕙兰的关系｜沈蕙兰小时候喜欢看《合家欢》。画中完整、安定的家庭后来与她在文革中的家庭离散形成对照。\n\n脚注｜[1] 作者、制作年代、品牌与原始收藏来源仍待确认。",
      learnMoreEn:"History core｜Yuefenpai combined advertising and calendars with idealized figures or domestic scenes and formed part of modern urban commercial culture.[1]\n\nShen Huilan｜Shen Huilan enjoys looking at A Happy Family as a child. Its orderly, intact household later contrasts with the separation of her own family during the Cultural Revolution.\n\nNotes｜[1] The artist, date, brand, and original collection remain unconfirmed.",
      reviewFlag:"待补：作品作者、制作年份、品牌与原始收藏来源。"
    },
    {
      id:"ch01-young-companion", xPx:993, yPx:780,
      zh:"《良友》画报封面女郎", en:"Cover Girl of The Young Companion",
      note:"《良友》以女性肖像、摄影、时事与文艺内容共同构成近代中国都市生活的视觉窗口。",
      noteEn:"The Young Companion combined female portraiture, photography, current affairs, literature, and art as a visual record of modern Chinese urban life.",
      learnMoreZh:"《良友》1926年创刊、1945年终刊，女性封面之外还有新闻、摄影、文学、艺术和都市生活。[1]\n\n这本旧画报由母亲留下。蕙兰小时候从封面看见城市时装，也看见家庭生活以外的成年世界。\n\n脚注｜[1] 画面中的封面人物、期号与年份仍待确认。",
      learnMoreEn:"Published from 1926 to 1945, The Young Companion included female cover portraits, news, photography, literature, art, and urban life.[1]\n\nThe old pictorial was left by Mother. As a child, Huilan sees city fashion on its cover and an adult world beyond the household.\n\nNotes｜[1] The cover subject, issue number, and date remain unconfirmed.",
      anchorZh:"这是母亲年轻时订阅并留在家中的旧画报。蕙兰从封面想象都市、时装和画面之外的成年世界。",
      anchorEn:"This is an older pictorial Mother subscribed to and kept at home. Huilan imagines fashion, the city, and an adult world beyond its cover.",
      reviewFlag:"待确认：封面人物身份、期号与原始封面年份。"
    },
    {
      id:"ch01-gu-huichuntang", xPx:1176, yPx:539,
      zh:"月份牌《谷回春堂广告》", en:"Yuefenpai Advertisement for Gu Huichun Tang",
      note:"谢之光，1931年。富丽的室内陈设与时装女性共同构成商品广告中的现代生活想象。",
      noteEn:"Painted by Xie Zhiguang in 1931, the advertisement combines a fashionable woman and an elaborate interior in a commercial image of modern life.",
      learnMoreZh:"历史核心｜谢之光1931年绘制的药品月份牌广告，把时装女性、洋派室内和商品宣传组合成当时的现代生活图景。[1]\n\n与沈蕙兰的关系｜沈蕙兰小时候喜欢画中人物的服装。文革中，这类月份牌可能被归为“资产阶级生活方式”或“四旧”，私人审美也可能受到政治审查。\n\n脚注｜[1] 规范题名、收藏机构与图片授权仍待确认。",
      learnMoreEn:"History core｜Xie Zhiguang’s 1931 pharmaceutical calendar advertisement combines a fashionable woman, a Western-style interior, and commercial promotion in a contemporary image of modern life.[1]\n\nShen Huilan｜As a child, Shen Huilan is drawn to the figure’s clothing. During the Cultural Revolution, such yuefenpai could be condemned as bourgeois culture or one of the Four Olds, bringing private taste under political scrutiny.\n\nNotes｜[1] The formal title, collection, and image rights remain unconfirmed.",
      reviewFlag:"待补：原作收藏机构、规范英文题名与可公开使用的图片来源。"
    },
    {
      id:"ch01-dipper-scripture", xPx:819, yPx:173,
      zh:"《太上玄灵北斗本命延生真经》彩绘本", en:"Illustrated Scripture of the Northern Dipper",
      note:"明嘉靖二十一年（1542）纸本泥金彩绘本，以金彩和人物图像表现道教星辰信仰。",
      noteEn:"A 1542 illustrated manuscript on paper, using gold pigment and figures to represent Daoist astral belief.",
      learnMoreZh:"这件明嘉靖二十一年（1542）纸本泥金彩绘本，把道教文字、神仙谱系和仪式图像放在同一书页。[1]\n\n父亲读志怪故事时，蕙兰会看画里的仙人和云气。她先从书页上认识这些形象。\n\n脚注｜[1] 图片来自书格；具体馆藏、卷册信息与授权范围仍待确认。",
      learnMoreEn:"This 1542 illustrated scripture brings Daoist writing, divine lineages, and ritual images together on a single page.[1]\n\nWhen Father reads tales of the strange, Huilan studies the immortals and clouds in the picture. She first knows these figures from a page.\n\nNotes｜[1] The image is from Shuge; the collection record, volume details, and rights remain to be confirmed.",
      anchorZh:"这是文人家庭收藏的旧画。蕙兰喜欢看腾云驾雾的仙人，也喜欢听父亲读中国的志怪与玄幻故事。",
      anchorEn:"This is an old painting kept by a scholarly family. Huilan likes the immortals moving through clouds and the strange tales Father reads aloud.",
      source:"书格",
      sourceUrl:"https://www.shuge.org/meet/topic/138221/",
      reviewFlag:"图片来源已确认为书格；待确认具体馆藏、卷册信息及图片授权范围。"
    },
    {
      id:"ch01-dream-red-chamber", xPx:1555, yPx:344,
      zh:"《红楼梦》图册", en:"Illustrated Album of Dream of the Red Chamber",
      note:"图册画有人物、服饰和室内场景。读者可以在读文字以外，慢慢看人物穿什么、住在什么样的房间里。",
      noteEn:"The album shows figures, clothing, and interiors. It lets readers linger over what the characters wear and the rooms they inhabit, alongside the written text.",
      learnMoreZh:"历史核心｜《红楼梦》通过绣像、人物册页与连环图画等形式传播，人物服饰和室内空间也成为阅读经验的一部分。[1]\n\n与沈蕙兰的关系｜沈蕙兰喜欢观看图中人物的服装。对她来说，读小说既包括文字，也包括对人物和生活方式的视觉认识。\n\n脚注｜[1] 画家、刊刻年代、具体版本与图片来源仍待确认。",
      learnMoreEn:"History core｜Dream of the Red Chamber circulated through portraits, album leaves, and sequential illustrations. Clothing and interiors therefore formed part of the reading experience.[1]\n\nShen Huilan｜Shen Huilan is especially interested in the figures’ clothing. For her, reading the novel includes both the text and a visual encounter with its characters and ways of life.\n\nNotes｜[1] The artist, date, edition, and image source remain unconfirmed.",
      anchorZh:"沈蕙兰最喜欢看图中人物华丽的衣服；在她的童年记忆里，读小说也意味着长时间凝视这些人物。",
      anchorEn:"Shen Huilan especially loves the figures’ elaborate clothing. In her childhood memory, reading the novel also means spending long stretches of time looking at its characters.",
      reviewFlag:"待确认：图册的画家、刊刻年代、具体版本及图片来源；坐标靠近右缘，在iPad横屏上会因裁切自动隐藏。"
    }
  ],
  [
    {
      id:"ch02-dazibao", xPx:1107, yPx:292,
      zh:"大字报", en:"Dàzìbào (“Big-character Poster”)",
      note:"大字报内容：父亲沈鸿礼的名字被叉掉。左侧罪名写着“宣扬封建糟粕，毒害革命青年”；右侧口号为：“坚决批判资产阶级反动路线！打倒一切牛鬼蛇神！革命师生联合起来！把无产阶级文化大革命进行到底！”",
      noteEn:"The poster crosses out Father Shen Hongli’s name. The accusation on the left reads, “Promoting feudal dross and poisoning revolutionary youth.” The slogans on the right read: “Resolutely criticize the bourgeois reactionary line! Down with all cow demons and snake spirits! Revolutionary teachers and students, unite! Carry the Great Proletarian Cultural Revolution through to the end!”",
      learnMoreZh:"大字报把政治指控写成公开张贴、围观和传播的文字。“牛鬼蛇神”是边界很宽的政治标签；“宣扬封建糟粕，毒害革命青年”是运动中的政治定性，不是司法罪名。[1]\n\n这张大字报写着父亲沈鸿礼的姓名、他教古代文学的事和相关罪名。蕙兰站在楼道里看见它，没有发言。\n\n脚注｜[1] 政治术语已有资料依据；姓名、罪名和口号需按最终画面逐字复核。",
      learnMoreEn:"Dàzìbào made political accusations public, open to posting, watching, and circulation. Niúguǐ Shéshén (“Cow Demons and Snake Spirits”) was a political label with broad and shifting boundaries. “Promoting feudal dross and poisoning revolutionary youth” was a political designation, not a judicial charge.[1]\n\nThis poster carries Father Shen Hongli’s name, his teaching of classical literature, and the accusation against him. Huilan sees it in the corridor and says nothing.\n\nNotes｜[1] The political terms are documented; the name, accusation, and slogans must be checked against the final image.",
      reviewFlag:"已按叙事设定写入沈鸿礼姓名与罪名；这些字句需以最终画面逐字复核。"
    },
    {
      id:"ch02-red-guard-poster", xPx:1027, yPx:596,
      zh:"红卫兵宣传画", en:"Red Guard Propaganda Poster",
      note:"红卫兵手举《毛泽东选集》。文革宣传把举书、挥臂和共同前进的动作反复组合，用领袖著作赋予群众行动以政治权威，并把不同的人塑造成意志一致的革命集体。",
      noteEn:"Red Guards raise Selected Works of Mao Zedong. Cultural Revolution propaganda repeatedly combined raised books, lifted arms, and forward movement, using the leader’s writings to authorize mass action and recasting distinct individuals as a revolutionary collective with a single will.",
      learnMoreZh:"历史核心｜红、黑、白的高对比便于快速印刷和远距离识读，也把人物、口号与政治立场组织成明确的视觉秩序。举书、挥臂和共同前进，是文革群众宣传画反复使用的动作组合。画中人高举的可能是《毛泽东选集》；下方口号仍需复核。[1]\n\n脚注｜[1] 准确题名、年份、作者、出版单位、口号识读与图片授权仍待确认。",
      learnMoreEn:"History core｜High-contrast red, black, and white supported rapid printing and distant legibility while organizing figures, slogans, and political positions into a clear visual order. Raised books, lifted arms, and collective forward movement recur throughout Cultural Revolution mass propaganda. The figure may be holding Selected Works of Mao Zedong; the lower slogan still requires verification.[1]\n\nNotes｜[1] The title, date, artist, publisher, slogan transcription, and image rights remain unconfirmed.",
      image:"assets/references/ch02-red-guard-poster.jpeg",
      source:"原始参考图｜宣传画2-.jpeg",
      galleryIntroZh:"以下海报用于辨认同时期常见的红、黑、白构图、集体人物、举书动作与政治口号。它们不是本画面所用海报的出处；画面中的书可能是《毛泽东选集》或《毛主席语录》，应按每件馆藏记录分别辨认。",
      galleryIntroEn:"These posters are visual references for the period’s red-black-white palette, collective figures, raised books, and political slogans. They are not the source of the poster used in this scene. The raised books may be Selected Works of Mao Zedong or Quotations from Chairman Mao and are identified separately in each catalog record.",
      gallery:[
        {
          image:"assets/references/red-guard-gallery/e15-569.jpg",
          zh:"坚决打倒党内头号走资本主义道路的当权派！彻底粉碎资本主义复辟的反革命逆流！",
          en:"Resolutely smash the number one power holders in the Party that follow the capitalist road! Thoroughly crush the counterrevolutionary adverse current of capitalist restoration!",
          metaZh:"1966年｜太原区大专中院校革命红卫兵代表政治工作会议筹备处｜右下角人物包括被作为“走资派”表现的刘少奇和邓小平",
          metaEn:"1966 · Preparatory Office for a political work conference of Red Guard representatives in the Taiyuan region · Liu Shaoqi and Deng Xiaoping appear among the “capitalist-roaders” in the lower-right corner",
          credit:"BG E15/569 · Chineseposters.net · Landsberger collection",
          href:"https://chineseposters.net/posters/e15-569"
        },
        {
          image:"assets/references/red-guard-gallery/e39-557.jpg",
          zh:"毛主席万岁，红卫兵万岁",
          en:"Long live Chairman Mao, long live the Red Guards",
          metaZh:"1967年｜上海多个红卫兵组织｜画面文字“我支持你们！”",
          metaEn:"1967 · several Red Guard groups in Shanghai · the poster reads “I support you!”",
          credit:"BG E39/557 · Chineseposters.net · IISH collection",
          href:"https://chineseposters.net/posters/e39-557"
        },
        {
          image:"assets/references/red-guard-gallery/pc-1968-009.jpg",
          zh:"红卫兵杀向美帝苏修——世界打倒美帝苏修",
          en:"Red Guard kill American imperialism and Soviet revisionism — The world strikes down American imperialism and Soviet revisionism",
          metaZh:"1968年｜“红卫兵万岁”大会筹备处设计｜出版单位不详",
          metaEn:"1968 · designed by the Preparatory Committee for the “Long Live the Red Guards” meeting · publisher unknown",
          credit:"PC-1968-009 · Chineseposters.net · Private collection",
          href:"https://chineseposters.net/posters/pc-1968-009"
        }
      ],
      circulationLinks:[
        {
          label:"Militaria Barcelona｜约 51 × 73 cm",
          href:"https://militariabcn.com/en/republica-popular-de-china-cartel-de-propaganda-maoista-aproximadamente-51-x-73-cm-m16"
        },
        {
          label:"The Collector’s Guild｜C004186 Chinese Propaganda Poster",
          href:"https://www.germanmilitaria.com/OtherNations/photos/C004186.html"
        }
      ],
      reviewFlag:"待考证：准确题名、创作年份、作者、出版单位、原始收藏来源及图片授权；现有文件带 PrintnSell 水印。"
    },
    {
      id:"ch02-fractured-childhood-memory", xPx:389, yPx:265,
      zh:"“不正确”的儿时记忆", en:"“Incorrect” Childhood Memories",
      note:"儿时喜欢看的月份牌，和在父亲的《康熙字典》里查到的自己的名字。",
      noteEn:"The yuefenpai calendar posters she loved as a child, and her own name found in Father’s Kangxi Dictionary.",
      learnMoreZh:"1966年“破四旧”期间，旧书、月份牌等物品可能被查抄、停售、封存或毁损。红卫兵抄家在各地做法不同，也有很大的任意性，不能说所有《康熙字典》都被毁了。[1][2]\n\n沈家的月份牌被撕碎，《康熙字典》被泼墨焚烧。对蕙兰来说，一件连着她爱看的图画，一件连着她自己的名字；后来它们都被说成“不正确”。\n\n脚注｜[1] 中发〔67〕158号及新华书店记录反映查抄、封存与停售。[2] 1970年9月17日周恩来在辞书会议上谈到《新华字典》与《康熙字典》的继承关系。沈家字典的具体遭遇属于人物经历。",
      learnMoreEn:"During the 1966 Pò Sìjiù (“Destroy the Four Olds”) campaign, old books and yuefenpai could be seized, withdrawn, sealed away, or destroyed. Red Guard raids varied by place and could be arbitrary. The evidence does not support the claim that every Kangxi Dictionary was destroyed.[1][2]\n\nThe Shen family’s yuefenpai is torn apart and its Kangxi Dictionary is splashed with ink and burned. One belongs to Huilan’s childhood pictures; the other to learning her own name. Later both are called “incorrect.”\n\nNotes｜[1] Central Document No. 158 and Xinhua Bookstore records document confiscation, sequestration, and withdrawal. [2] On 17 September 1970, Zhou Enlai discussed the lineage from Kangxi Dictionary to Xinhua Dictionary. The fate of the Shen family copy belongs to the character’s history.",
      reviewFlag:"多来源证据链支持传统字书在文革中遭到结构性排斥、停售、封存与毁损风险；红卫兵抄家具有地方差异和任意性，不能概括为所有《康熙字典》均被毁。沈家《康熙字典》的具体遭遇属于小说中的家庭记忆。王力、吕叔湘及普通读者回忆中关于《康熙字典》的具体表述，待取得可定位的原文与页码后再列为直接引证。"
    }
  ],
  [
    { x:50, y:32, zh:"公社宣传画", en:"Commune Propaganda Image", note:"公社宣传常以集体队列、丰收和昂扬姿态表现农业劳动。", noteEn:"Commune propaganda often represented agricultural labor through collective formations, abundant harvests, and energetic poses.", term:"commune" },
    { x:55, y:77, zh:"水稻田", en:"Rice Paddy", note:"长期浸水和弯腰劳动使水田成为皮疹、伤口感染和腰背损伤的来源。", noteEn:"Prolonged immersion and bent-over labor made rice paddies a source of rashes, wound infections, and back injuries." }
  ],
  [
    { x:51, y:13, zh:"政治标语", en:"Political Slogans", note:"政治口号长期悬挂在会议室，使政策语言成为集体生活的固定环境。", noteEn:"Political slogans remained on meeting-room walls, making official language a permanent part of collective life." },
    { x:50, y:40, zh:"领袖像", en:"Portrait of Mao Zedong", note:"在机关、学校和公社集体空间中，领袖像通常占据正面或中心位置。", noteEn:"In offices, schools, and commune meeting spaces, portraits of Mao Zedong commonly occupied the front wall or visual center." },
    {
      id:"ch04-inner-thoughts", xPx:420, yPx:640,
      variant:"text-group",
      zh:"心里的念头", en:"Thoughts Kept Inside",
      note:"黑色手写字是沈蕙兰在每日批判会中没有说出口的心里念头。",
      noteEn:"The black handwriting records thoughts that Shen Huilan does not say aloud during the daily struggle session.",
      learnMoreZh:"黑色手写文字记录她没有公开说出的心声。此处将逐句提供英文翻译；除《诗经》及其在文革时期的处境外，不增加额外历史说明。",
      learnMoreEn:"The black handwriting records thoughts Shen Huilan does not say aloud during the daily struggle session. This section will provide line-by-line English translations, with additional context limited to the Book of Songs and its position during the Cultural Revolution.",
      hideChapterContext:true
    },
    {
      id:"ch04-struggle-session-speech", xPx:1280, yPx:640,
      variant:"text-group",
      zh:"批判会发言", en:"Speech at the Struggle Session",
      note:"白色印刷字是沈蕙兰在每日批判会上实际说出口、经过自我审核的发言。",
      noteEn:"The white printed text records what Shen Huilan says aloud after revising her thoughts into politically acceptable language.",
      learnMoreZh:"白色印刷文字是她把心里念头改写成政治上安全、可以公开说出的语言。此处将逐句提供英文翻译，并简要说明相关话术来源，以及它如何批判、压制对应的内心话。",
      learnMoreEn:"The white printed text is the politically permissible language into which she reshapes her private thoughts before speaking. This section will provide line-by-line translations and brief notes on the rhetoric’s sources and how it disciplines the corresponding inner voice.",
      hideChapterContext:true
    }
  ],
  [],
  []
];

const CHAPTER_4_INDEX = 3;
const CHAPTER_6_INDEX = 5;
const CHAPTER_6_MEMORY_CUES = [
  {
    id:"books", order:0, xPx:260, yPx:445, widthPx:500, heightPx:400, radiusPx:255, thoughtPosition:"center",
    thoughtZh:"书一排一排立在橱窗里，展示着……我们家那些，是烧掉的。",
    thoughtEn:"The books stand in rows in the window, on display... Ours were burned."
  },
  {
    id:"hair", order:1, xPx:583, yPx:564, widthPx:208, heightPx:268, radiusPx:138, thoughtPosition:"center",
    thoughtZh:"风把她的头发吹起来……我的长发，在下乡的第一个月剪了，没法打理。辫梢的蝴蝶，飞走了。",
    thoughtEn:"The wind lifts her hair... Mine was cut short in my first month at the farm. There was no way to keep it. The butterflies at the end of my braids flew away."
  },
  {
    id:"conversation", order:2, xPx:1257, yPx:555, widthPx:312, heightPx:216, radiusPx:176, thoughtPosition:"center",
    thoughtZh:"他们轻轻松松，说说笑笑……话到嘴边，不必先在脑子里转一圈。",
    thoughtEn:"They are chatting with such ease, as if words can reach the mouth without turning circles in the mind first."
  },
  {
    id:"cat", order:3, xPx:1490, yPx:790, widthPx:350, heightPx:270, radiusXPx:190, radiusYPx:155, thoughtPosition:"center",
    thoughtZh:"猫慢悠悠地走过去，像是在巡自己的地盘……一拐，就没进树影里了。",
    thoughtEn:"The cat ambles past, as if patrolling ground it already owns... then turns, and slips into the shadow of a tree."
  }
];

const SOUND_UI = {
  buttonLabelOn:"ON",
  buttonLabelOff:"OFF"
};

const CHAPTER_6_MEMORY_TIMING = {
  initialStill:2000,
  openingFocus:2250,
  openingThoughtEnter:1190,
  openingThoughtHold:3117,
  openingThoughtExit:1020,
  thoughtExit:1200,
  betweenMemories:2500,
  cueReset:500,
  cueFocus:90,
  cueThoughtEnter:180
};
const CHAPTER_6_CUE_HIT_SCALE = 0.58;

const CHAPTERS = [
  {
    image:"assets/chapters/memo-01-1953.jpeg", baseImage:"assets/chapters/motion/ch1-first-frame.jpg", baseOnly:true, year:"1953", title:"儿时父母的书房", titleEn:"My Parents' Study",
    motionOverlays:[
      {
        id:"ch1-appear", webm:"assets/chapters/motion/ch1-appear.webm", hevc:"assets/chapters/motion/ch1-appear-hevc.mov",
        placement:"base", layer:2, start:"image-visible", stop:"chapter-exit",
        startDelay:0, fadeInBeforePlay:700, playbackRate:1, loop:false, duration:5500, preload:"auto"
      },
      {
        id:"ch1-loop", webm:"assets/chapters/motion/ch1-loop.webm", hevc:"assets/chapters/motion/ch1-loop-hevc.mov",
        placement:"base", layer:3, start:"after-motion", afterMotion:"ch1-appear", stop:"chapter-exit",
        startDelay:0, playbackRate:1, loop:true, preload:"auto"
      }
    ],
    hotspotAfterMotion:"ch1-appear",
    hotspotDelay:1000,
    steps:[
      { zh:"我叫沈蕙兰。", en:"My name is Shen Huilan." },
      { zh:"一九四四年，我生在芜湖。", en:"I was born in Wuhu, in 1944." },
      { zh:"弟弟惠国，比我小八岁。", en:"My younger brother, Huiguo, was eight years younger than me." },
      { zh:"父亲在师范学院教古文。\n母亲教初中语文。", en:"Father taught classical Chinese at a normal university.\nMother taught Chinese at a middle school." },
      { zh:"后来，他们管这样的人叫：\n“臭老九”。", en:"Later, people like them were called\nChòu Lǎo Jiǔ (“Stinking Old Ninth”).", refs:[{ zh:"臭老九", en:"Chòu Lǎo Jiǔ (“Stinking Old Ninth”)", id:"stinking-ninth" }] },
      { zh:"小时候，家里有一间很大的书房。", en:"When I was little, we had a large study at home." },
      { zh:"满墙，都是父母的书。", en:"The walls were lined with Father and Mother’s books." },
      { zh:"我最喜欢待在里面玩。", en:"I spent hours there." }
    ]
  },
  {
    image:"assets/chapters/memo-02-1966.jpeg", baseImage:"assets/chapters/motion/ch2-first-frame.jpg", baseOnly:true, year:"1966", title:"芜湖师范学院的楼道", titleEn:"A Corridor at Wuhu Normal University",
    motionOverlays:[
      {
        id:"ch2-build", webm:"assets/chapters/motion/ch2.webm", hevc:"assets/chapters/motion/ch2-hevc.mov",
        placement:"base", layer:2, start:"image-visible", stop:"chapter-exit",
        startDelay:0, fadeInBeforePlay:500, playbackRate:1, loop:false, duration:3500
      }
    ],
    hotspotAfterMotion:"ch2-build",
    hotspotDelay:1000,
    steps:[
      { zh:"我刚站上讲台，还不到两年。", en:"I had been teaching for less than two years." },
      { zh:"一九六六年夏天来了。", en:"Then came the summer of 1966." },
      { zh:"课停了。\n图书馆也关了。", en:"Classes stopped.\nThe library closed." },
      { zh:"父亲办公室的门上，贴了大字报。\n我站在楼道里看着。一个字也没说……", en:"A Dàzìbào (“Big-character Poster”) was pasted to Father’s office door.\nI stood in the corridor and looked at it. I did not say a word…", refs:[{ zh:"大字报", en:"Dàzìbào (“Big-character Poster”)", id:"dazibao" }] },
      { zh:"后来，父亲被送去了五七干校。\n信还是能寄的。只是写下的每一句，都要先经过审查。\n有时候，信忽然就断了，也不知道……出了什么事。", en:"Later, Father was sent to a Wǔqī Gànxiào (“May Seventh Cadre School”).\nLetters could still be sent, but every line had to pass political scrutiny.\nSometimes the letters stopped without warning. We did not know… what had happened.", refs:[{ zh:"五七干校", en:"Wǔqī Gànxiào (“May Seventh Cadre School”)", id:"may-seventh" }] },
      { zh:"母亲留在芜湖，惠国还在念高中，我下了乡。\n……我们没有说再见。", en:"Mother stayed in Wuhu. Huiguo was still in high school. I was Xiàxiāng (“Sent Down to a Farm”).\n…We never said goodbye.", refs:[{ zh:"下了乡", en:"Xiàxiāng (“Sent Down to a Farm”)", id:"sent-down" }] }
    ]
  },
  {
    image:"assets/chapters/memo-03-1969-outdoors.jpeg", baseImage:"assets/chapters/motion/ch3-first-frame.jpg", baseOnly:true, year:"1969", title:"红星人民公社的水田", titleEn:"The Rice Paddies of Red Star Commune",
    motionOverlays:[
      {
        id:"ch3-appear", webm:"assets/chapters/motion/ch3-appear.webm", hevc:"assets/chapters/motion/ch3-appear-hevc.mov",
        placement:"base", layer:2, start:"image-visible", stop:"chapter-exit",
        startDelay:0, fadeInBeforePlay:500, playbackRate:1, loop:false, duration:2000, preload:"auto"
      },
      {
        id:"ch3-loop", webm:"assets/chapters/motion/ch3-loop.webm", hevc:"assets/chapters/motion/ch3-loop-hevc.mov",
        placement:"base", layer:3, start:"after-motion", afterMotion:"ch3-appear", stop:"chapter-exit",
        startDelay:0, playbackRate:1, loop:true, preload:"auto"
      }
    ],
    hotspotAfterMotion:"ch3-appear",
    hotspotDelay:1000,
    steps:[
      { zh:"六八年十二月，那道最高指示下来以后，\n我被分到了芜湖县红星人民公社。", en:"In December 1968, after the Zuìgāo Zhǐshì (“Highest Directive”) was issued,\nI was assigned to the Red Star Rénmín Gōngshè (“People’s Commune”) in Wuhu County.", refs:[{ zh:"最高指示", en:"Zuìgāo Zhǐshì (“Highest Directive”)", id:"highest-directive" },{ zh:"人民公社", en:"Rénmín Gōngshè (“People’s Commune”)", id:"commune" }] },
      { zh:"我从小在城里长大，从来没有见过那么大片的水田。", en:"I grew up in the city. I had never seen rice paddies stretching so far." },
      { zh:"每天早上五点半出工：弯腰，插秧。\n每天十个小时循环，等直起腰来，总头昏眼花看不真切……", en:"Every morning at five-thirty, we went out to work: bend down, plant rice.\nThe same motions continued for ten hours. When I finally straightened up, my head was spinning and I could no longer see clearly…" },
      { zh:"夏天的蚊子，有绿豆那么大，驱散不完。", en:"In summer, the mosquitoes were as big as mung beans. We could never drive them all away." },
      { zh:"手和腿，因为总是泡水，受伤后感染。\n反反复复，一直不好。", en:"My hands and legs were always in the water; once injured, they became infected.\nThe infections kept coming back. They never really healed." }
    ]
  },
  {
    baseImage:"assets/chapters/base/chapter-04-base.jpg", baseOnly:true, year:"1969", title:"公社大队会议室", titleEn:"The Brigade Meeting Room",
    motionOverlays:[
      {
        id:"ch4-text",
        webm:"assets/chapters/motion/ch4-text.webm",
        hevc:"assets/chapters/motion/ch4-text-hevc.mov",
        hevcOnDesktop:true,
        placement:"base", layer:2, start:"image-entry", stop:"chapter-exit",
        startDelay:3500, playbackRate:1, opacity:.82, blendMode:"normal",
        loop:false, duration:5000
      },
      {
        id:"ch4-mao-glow",
        webm:"assets/chapters/motion/ch4-mao-glow.webm",
        hevc:"assets/chapters/motion/ch4-mao-glow-hevc.mov",
        hevcOnDesktop:true,
        placement:"base", layer:3, start:"image-entry", stop:"chapter-exit",
        startDelay:0, playbackRate:1, loop:true
      }
    ],
    hotspotAfterMotion:"ch4-text",
    hotspotDelay:1000,
    steps:[
      { zh:"我们公社每天要开批斗会，轮流说自己的思想改造。", en:"Our commune held a Pīdòu Huì (“Struggle Session”) every day.\nWe took turns reporting on our Sīxiǎng Gǎizào (“Ideological Reform”).", refs:[{ zh:"批斗会", en:"Pīdòu Huì (“Struggle Sessions”)", id:"struggle-session" },{ zh:"思想改造", en:"Sīxiǎng Gǎizào (“Ideological Reform”)", id:"thought-reform" }] },
      { zh:"我总是说得不长，也不短。\n不出错，也不显眼。", en:"I always spoke just long enough.\nNo mistakes. Nothing that drew attention." },
      { zh:"偶尔，有些念头刚萌芽……我就制止了。", en:"Sometimes, a thought would begin to surface… I stopped it." },
      { zh:"日复一日，那些念头，也就安静下来了。", en:"Day after day, those thoughts slowly grew quiet." }
    ]
  },
  {
    image:"assets/chapters/memo-05-1970-outdoors-dawn.jpeg", baseImage:"assets/chapters/motion/ch5-first-frame.jpg", baseOnly:true, year:"1970", title:"田埂黄昏的门", titleEn:"A Door at Dusk on the Ridge",
    motionOverlays:[
      {
        id:"ch5-appear", webm:"assets/chapters/motion/ch5-appear.webm", hevc:"assets/chapters/motion/ch5-appear-hevc.mov",
        placement:"base", layer:2, start:"image-visible", stop:"chapter-exit",
        startDelay:0, fadeInBeforePlay:700, playbackRate:1, loop:false, duration:3000
      },
      {
        // 网页版已将透明门动画预合成到 ch5-appear 的末帧，避免浏览器把透明像素解码成黑/白底。
        id:"ch5-door-trigger", webm:"assets/chapters/motion/ch5-door-trigger.webm", hevc:"assets/chapters/motion/ch5-door-trigger-hevc.mov",
        placement:"base", layer:3, start:"interaction", stop:"chapter-exit",
        startDelay:0, fadeInBeforePlay:0, playbackRate:1, loop:false, duration:1167, preload:"auto"
      }
    ],
    hotspotAfterMotion:"ch5-appear",
    hotspotDelay:0,
    steps:[
      { zh:"那天，我一个人补种到日落。站起来的时候，我看见了它。", en:"That evening, I was replanting alone until sunset.\nWhen I stood up, I saw it." },
      { zh:"就在前面，两棵水杉之间……", en:"Right there, between two dawn redwoods…" },
      { zh:"一扇门。", en:"A door." },
      { zh:"没有墙，也没有屋子。就那么独自立着。", en:"No wall. No house. It stood there alone." },
      { zh:"三年了。\n我以为，好奇心早就死了。", en:"For three years, I thought my curiosity had been dead." },
      { zh:"可那一天……它动了一下。\n我走了过去。", en:"But that day… it stirred.\nI walked toward it." },
      { zh:"门缝里，透出一丝光。", en:"A sliver of light came through the gap." }
    ]
  },
  {
    // Base still is extracted from the exact same pre-composited video at frame 0.
    // It carries the seated cat from the first visible frame and prevents a base/video colour jump.
    image:"assets/chapters/base/chapter-06-1970-GW.png", baseImage:"assets/chapters/base/chapter-06-1970-GW.png", baseOnly:true, year:"1970", title:"门的另一边", titleEn:"The Other Side of the Door", isFinal:true,
    motionOverlays:[
      {
        // 猫在聚光移向它的路径时单独播放一次，结束后露出持续运动的环境底层。
        id:"ch6-cat-once",
        webm:"assets/chapters/motion/ch6-complete.webm?v=20260723-2245",
        hevc:"assets/chapters/motion/ch6-complete-hevc.mov?v=20260723-2245",
        placement:"base",
        start:"interaction",
        startDelay:0,
        hideOnEnd:true,
        layer:3,
        preload:"auto",
        fadeInDuration:900
      },
      {
        // 人物谈话等环境动作从 memory course 开头持续循环。
        id:"ch6-ambient-loop",
        webm:"assets/chapters/motion/ch6.webm?v=20260723-2247",
        hevc:"assets/chapters/motion/ch6-hevc.mov?v=20260723-2247",
        placement:"base",
        start:"memory-sequence",
        initialTime:0,
        loopStart:0,
        loop:true,
        layer:2,
        preload:"auto",
        fadeInDuration:900
      }
    ],
    steps:[
      { zh:"门开了。门后却是一片黑暗。", en:"The door opened. Behind it was only darkness." },
      { zh:"黑暗里，那一丝光散开，\n浮起一些我从未见过的颜色。", en:"In the darkness, that sliver of light spread\ninto colors I had never seen." },
      { zh:"湿润的，流动的，一点点明亮起来。", en:"Damp and fluid, they slowly grew brighter." },
      { zh:"不是煤油灯的昏黄，也不是电灯的白。", en:"Neither the dim yellow of an oil lamp\nnor the white of an electric light." },
      { zh:"人声、车声、音乐，还有远处的汽笛。", en:"Voices, cars, music, and a distant ship’s horn." },
      { zh:"咖啡、潮湿的石头、汽油，还有陌生的花香。", en:"Coffee, wet stone, gasoline, and an unfamiliar perfume." },
      { zh:"我站在门框里，\n看见了门另一边的夜晚。", en:"I stood in the doorway\nand saw the night on the other side." }
    ]
  }
];

const app = document.getElementById("app");
const backgrounds = document.getElementById("backgrounds");
const portalNeon = document.getElementById("portal-neon");
const portalNeonBlobs = [...document.querySelectorAll("[data-portal-neon]")];
const hotspotsEl = document.getElementById("hotspots");
const tooltip = document.getElementById("hotspot-tooltip");
const narrative = document.getElementById("narrative");
const yearEl = document.querySelector(".chapter-year");
const titleZhEl = document.querySelector(".chapter-title-zh");
const titleEnEl = document.querySelector(".chapter-title-en");
const startScreen = document.getElementById("start-screen");
const startBgWrap = document.querySelector(".start-bg-wrap");
const startBg = document.querySelector(".start-bg");
const introParticles = document.getElementById("intro-particles");
const epilogueScreen = document.getElementById("epilogue-screen");
const epilogueText = epilogueScreen?.querySelector(".epilogue-text");
const epilogueParagraphs = [...document.querySelectorAll(".epilogue-paragraph")];
const doorWash = document.getElementById("door-wash");
const doorWashCanvas = document.getElementById("door-wash-canvas");
const startParagraphs = [...document.querySelectorAll(".start-paragraph")];
const experience = document.getElementById("experience");
const fullscreenButtons = [...document.querySelectorAll(".fullscreen-button-start, .fullscreen-button-corner")];
const fontSizeToggle = document.getElementById("font-size-toggle");
const fontSizeModeLabel = fontSizeToggle?.querySelector(".font-size-mode-label");
const motionToggle = document.getElementById("motion-toggle");
const motionModeLabel = motionToggle?.querySelector(".motion-mode-label");
const soundToggle = document.getElementById("sound-toggle");
const soundModeLabel = soundToggle?.querySelector(".sound-mode-label");
const screenControls = document.querySelector(".screen-controls");
const controlsCollapseToggle = document.getElementById("controls-collapse-toggle");
const navButtonPrev = document.querySelector(".timeline-arrow-prev");
const navButtonNext = document.querySelector(".timeline-arrow-next");
const timelineStops = [...document.querySelectorAll(".timeline-stop")];
const contextToggle = document.getElementById("context-toggle");
const contextPanel = document.getElementById("context-panel");
const contextClose = document.getElementById("context-close");
const contextCollapse = document.getElementById("context-collapse");
const contextContent = document.getElementById("context-content");
const contextLanguageButtons = [...document.querySelectorAll("[data-context-language]")];
const memoryLayer = document.getElementById("memory-layer");
const memoryVignette = document.getElementById("memory-vignette");
const memoryCuesEl = document.getElementById("memory-cues");
const memoryThought = document.getElementById("memory-thought");
const audioHint = document.getElementById("audio-hint");
const traditionalConverter = window.OpenCC?.Converter
  ? window.OpenCC.Converter({ from:"cn", to:"t" })
  : value => value;

let chapterIndex = 0;
let stepIndex = 0;
let phase = "text";
let startActive = true;
let epilogueActive = false;
let startComplete = false;
let busy = false;
let lastWheelAt = 0;
let visualStep = 0;
let lineAnimationFrame = null;
let compositeRevealFrame = null;
let compositeRevealResolve = null;
let lineCenters = [];
const startTimers = [];
const startAnimationFrames = new Map();
const epilogueTimers = [];
const epilogueAnimationFrames = new Map();
const chapterMotionTimers = new WeakMap();
let introParticleFrame = null;
let introParticleField = [];
let introParticleRunning = false;
let introParticleResizeTimer = null;
let introParticleGlowSprite = null;
let introParticlePixelRatio = 1;
let introParticleFrameInterval = MOTION_SETTINGS.introParticles.standardFrameInterval;
let introParticleLastDrawAt = 0;
let chapter6GlanceRun = 0;
let chapter6GlanceTimer = null;
let chapter6HintTimer = null;
let chapter6PassiveCloseTimer = null;
let chapter6SpotlightFrame = null;
let chapter6SpotlightState = null;
let chapter6CueDismissedAt = Number.NEGATIVE_INFINITY;
const chapter6SequenceWaits = new Map();
let chapter6ActiveCueId = null;
let soundEnabled = true;
let soundUnlocked = false;
const chapter6Visited = new Set();
let chapter6AudioContext = null;
let chapter6AmbientAudioEl = null;
let chapter6AmbientSourceNode = null;
let chapter6AmbientGainNode = null;
let chapter6AmbientTargetVolume = 0;
let chapter6AmbientFadeFrame = null;
// Web Audio decodeAudioData 管线状态：解码后的 PCM 缓存，以及当前正在播放的 buffer source。
// AudioBufferSourceNode 只能播放一次（start() 后不可重用），所以每次播放都要新建节点；
// chapter6AmbientBuffer 缓存解码结果，避免每次播放都重新 fetch + decode。
let chapter6AmbientBuffer = null;
let chapter6AmbientBufferPromise = null;
let chapter6AmbientBufferSource = null;
let chapter6AmbientUseFallbackElement = false;
let chapter6AmbientRevealed = false;
// 第四章环境声状态（独立于 Ch6，但共用同一个 AudioContext，实现方式与 Ch6 完全一致）。
let chapter4AmbientAudioEl = null;
let chapter4AmbientGainNode = null;
let chapter4AmbientFadeFrame = null;
let chapter4AmbientBuffer = null;
let chapter4AmbientBufferPromise = null;
let chapter4AmbientBufferSource = null;
let chapter4AmbientUseFallbackElement = false;
let chapter4AmbientRevealed = false;
// 第五章开门音效状态（独立于 Ch6 环境声，但共用同一个 AudioContext）。
let doorSoundGainNode = null;
let doorSoundBuffer = null;
let doorSoundBufferPromise = null;
let doorSoundUseFallbackElement = false;
let doorSoundAudioEl = null;
let narrativePointerStart = null;
let epilogueSafetyFrame = null;
const introParticlePointer = {
  x:0,
  y:0,
  targetX:0,
  targetY:0,
  energy:0,
  active:false,
  initialized:false
};

function escapeHTML(value) {
  return value.replace(/[&<>"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" })[character]);
}

function renderContextChineseLabel(value) {
  const escaped = escapeHTML(value);
  return `<span data-context-chinese data-hans="${escaped}">${escaped}</span>`;
}

function renderContextParagraphs(value, className) {
  return value
    .split(/\n{2,}/)
    .map(paragraph => `<p class="${className}">${escapeHTML(paragraph)}</p>`)
    .join("");
}

function localizeTraditionalChinese(value) {
  return TRADITIONAL_CHINESE_LOCALIZATIONS.reduce((result, [source, target]) => {
    return result.replaceAll(source, target);
  }, value);
}

function convertElementToTraditional(element) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
    node.nodeValue = localizeTraditionalChinese(traditionalConverter(node.nodeValue));
  });
  element.querySelectorAll("[aria-label]").forEach(node => {
    node.setAttribute("aria-label", localizeTraditionalChinese(traditionalConverter(node.getAttribute("aria-label"))));
  });
}

function buildTraditionalContextBodies() {
  contextContent.querySelectorAll(".context-body-hant").forEach(node => node.remove());
  contextContent.querySelectorAll(".context-body-zh").forEach(source => {
    const traditional = source.cloneNode(true);
    traditional.classList.remove("context-body-zh");
    traditional.classList.add("context-body-hant");
    traditional.setAttribute("lang", "zh-Hant");
    convertElementToTraditional(traditional);
    source.after(traditional);
  });
}

function updateContextChineseLabels() {
  const traditional = contextPanel.dataset.language === "zh-hant";
  document.querySelectorAll("[data-context-chinese]").forEach(label => {
    const simplified = label.dataset.hans || label.textContent;
    label.textContent = traditional
      ? localizeTraditionalChinese(traditionalConverter(simplified))
      : simplified;
  });
}

function updateContextLocaleChrome() {
  const traditional = contextPanel.dataset.language === "zh-hant";
  contextPanel.setAttribute("aria-label", traditional ? "歷史脈絡" : "历史背景");
  contextClose?.setAttribute("aria-label", traditional ? "關閉歷史脈絡" : "关闭历史背景");
  contextCollapse?.setAttribute("aria-label", traditional ? "收起歷史脈絡" : "收起历史背景");
  contextCollapse?.setAttribute("title", traditional ? "收起側欄" : "收起侧栏");
  const languageGroupLabel = traditional ? "側欄內文語言" : "侧栏正文语言";
  document.querySelector(".context-language-toggle")?.setAttribute("aria-label", languageGroupLabel);
}

function renderRichText(text, refs = [], language) {
  let rendered = escapeHTML(text);
  refs.forEach(ref => {
    const needle = escapeHTML(ref[language]);
    const term = TERMS[ref.id];
    const button = `${needle}<button class="term-ref" type="button" data-term="${ref.id}" aria-label="Learn more: ${escapeHTML(term.en)}">${term.number}</button>`;
    rendered = rendered.replace(needle, button);
  });
  return rendered.replace(/\n/g, "<br>");
}

function renderLayeredReading(text, language = "zh") {
  return text.split(/\n\n+/).map(section => {
    const divider = section.indexOf("｜");
    if (divider === -1) return `<p>${section.replaceAll("\n", "<br>")}</p>`;
    const label = section.slice(0, divider);
    const rawBody = section.slice(divider + 1);
    const supporting = label === "脚注" || label === "Notes";
    const historical = label === "历史核心" || label === "History core";
    const personal = label === "与沈蕙兰的关系" || label === "Shen Huilan";
    const body = supporting ? rawBody : rawBody.replace(/\[(\d+)\]/g, '<sup class="context-citation">[$1]</sup>');
    const classes = ["context-reading-section", supporting ? "is-supporting" : "", personal ? "is-personal" : ""].filter(Boolean).join(" ");
    const visibleLabel = historical || personal ? "" : `<span class="context-reading-label">${label}</span>`;
    return `<p class="${classes}" lang="${language === "zh" ? "zh-CN" : "en"}">${visibleLabel}${body.replaceAll("\n", "<br>")}</p>`;
  }).join("");
}

function renderReferenceGallery(hotspot) {
  if (!hotspot?.gallery?.length) return "";
  const thumbnails = hotspot.gallery.map((item, index) => `
    <button class="reference-gallery-thumb" type="button" data-gallery-index="${index}" aria-pressed="false" aria-label="放大查看：${escapeHTML(item.zh)}">
      <img src="${item.image}" alt="${escapeHTML(item.zh)}" loading="lazy">
    </button>`).join("");
  const circulationLinks = (hotspot.circulationLinks || []).map(item =>
    `<li><a href="${item.href}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.label)}</a></li>`
  ).join("");
  return `
    <section class="reference-gallery" aria-labelledby="reference-gallery-title">
      <h3 id="reference-gallery-title">${renderContextChineseLabel("同类海报视觉语言")} <span>Related poster language</span></h3>
      <p class="context-body-zh">${hotspot.galleryIntroZh}</p>
      <p class="context-en context-body-en">${hotspot.galleryIntroEn}</p>
      <div class="reference-gallery-grid">${thumbnails}</div>
      <figure class="reference-gallery-viewer" hidden>
        <button class="reference-gallery-close" type="button" aria-label="关闭大图">×</button>
        <img class="reference-gallery-large" src="" alt="">
        <figcaption>
          <strong class="reference-gallery-zh context-body-zh"></strong>
          <span class="reference-gallery-en context-body-en"></span>
          <span class="reference-gallery-meta-zh context-body-zh"></span>
          <span class="reference-gallery-meta-en context-body-en"></span>
          <a class="reference-gallery-credit" href="" target="_blank" rel="noopener noreferrer"></a>
        </figcaption>
      </figure>
      ${circulationLinks ? `
        <div class="circulation-records">
          <h4>${renderContextChineseLabel("同图流通记录")} <span>Circulation records</span></h4>
          <p class="context-body-zh">以下商店页面显示与画面所用海报相同的图像，只能证明图像或实物曾在收藏市场流通，不能确认其创作者、出版单位或创作年代。</p>
          <p class="context-en context-body-en">These sales listings document circulation of the same image or object, not its creator, publisher, or date.</p>
          <ul>${circulationLinks}</ul>
        </div>` : ""}
    </section>`;
}

function bindReferenceGallery(hotspot) {
  if (!hotspot?.gallery?.length) return;
  const viewer = contextContent.querySelector(".reference-gallery-viewer");
  const large = contextContent.querySelector(".reference-gallery-large");
  const buttons = [...contextContent.querySelectorAll(".reference-gallery-thumb")];
  const close = contextContent.querySelector(".reference-gallery-close");
  const setText = (selector, value) => {
    const element = contextContent.querySelector(selector);
    if (element) element.textContent = value || "";
  };
  buttons.forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.galleryIndex);
    const item = hotspot.gallery[index];
    if (!item) return;
    large.src = item.image;
    large.alt = item.zh;
    setText(".reference-gallery-zh", item.zh);
    setText(".reference-gallery-en", item.en);
    setText(".reference-gallery-meta-zh", item.metaZh);
    setText(".reference-gallery-meta-en", item.metaEn);
    const credit = contextContent.querySelector(".reference-gallery-credit");
    credit.href = item.href;
    credit.textContent = `${item.credit} · 查看馆藏记录 / View catalog record`;
    buildTraditionalContextBodies();
    viewer.hidden = false;
    buttons.forEach(candidate => candidate.setAttribute("aria-pressed", String(candidate === button)));
    viewer.scrollIntoView({ block:"nearest", behavior:"smooth" });
  }));
  close?.addEventListener("click", () => {
    viewer.hidden = true;
    large.removeAttribute("src");
    buttons.forEach(button => button.setAttribute("aria-pressed", "false"));
  });
}

function initBackgrounds() {
  CHAPTERS.forEach((chapter, index) => {
    const visual = document.createElement("div");
    visual.className = `chapter-visual reveal-${chapter.reveal || "dissolve"}`;
    visual.dataset.index = index;
    const compositeImage = chapter.baseOnly
      ? ""
      : `<img class="chapter-bg chapter-bg-composite" src="${chapter.image}" alt="${chapter.title}：完成拼贴图">`;
    const motionOverlays = chapter.motionOverlays || (chapter.motionOverlay ? [chapter.motionOverlay] : []);
    const motionMedia = motionOverlays.map(overlay => {
      const useHevc = overlay.hevc && (shouldUseAppleAlphaVideo() || (overlay.hevcOnDesktop && isDesktopSafari()));
      const motionSource = useHevc ? overlay.hevc : overlay.webm;
      const loopAttribute = overlay.loop && overlay.loopStart == null ? "loop" : "";
      const hasFrame = Boolean(overlay.frame);
      const frameClass = hasFrame ? " is-frame" : "";
      const patchClass = hasFrame && overlay.featheredPatch !== false ? " is-patch" : "";
      const fitClass = overlay.fit === "contain" ? " is-contain" : "";
      return `<video class="chapter-motion-layer${frameClass}${patchClass}${fitClass}" data-source="${motionSource}" muted ${loopAttribute} playsinline preload="${overlay.preload || "metadata"}" disablepictureinpicture aria-hidden="true"
        data-motion-id="${overlay.id || "motion"}"
        data-placement="${overlay.placement || "composite"}"
        data-frame-x="${overlay.frame?.x ?? ""}"
        data-frame-y="${overlay.frame?.y ?? ""}"
        data-frame-width="${overlay.frame?.width ?? ""}"
        data-frame-height="${overlay.frame?.height ?? ""}"
        data-frame-anchor="${overlay.anchor || "top-left"}"
        data-start="${overlay.start || "reveal-complete"}"
        data-after-motion="${overlay.afterMotion || ""}"
        data-stop="${overlay.stop || "chapter-exit"}"
        data-start-delay="${overlay.startDelay ?? MOTION_SETTINGS.chapterMotion.startDelay}"
        data-loop-start="${overlay.loopStart ?? ""}"
        data-initial-time="${overlay.initialTime ?? ""}"
        data-hide-on-end="${overlay.hideOnEnd ? "true" : "false"}"
        data-fade-in-before-play="${overlay.fadeInBeforePlay || 0}"
        data-duration="${overlay.duration || 0}"
        data-playback-rate="${overlay.playbackRate ?? MOTION_SETTINGS.chapterMotion.playbackRate}"
        style="z-index:${overlay.layer || 2};--motion-opacity:${overlay.opacity ?? 1};--motion-blend:${overlay.blendMode || "normal"};--motion-fade-in:${overlay.fadeInDuration ?? overlay.fadeInBeforePlay ?? 0}ms"></video>`;
    }).join("");
    visual.innerHTML = `
      <img class="chapter-bg chapter-bg-base" src="${chapter.baseImage || chapter.image}" alt="${chapter.title}：底图">
      ${compositeImage}
      ${!chapter.baseOnly && chapter.reveal === "dissolve" ? '<canvas class="chapter-bg chapter-dissolve-canvas" aria-hidden="true"></canvas>' : ''}
      ${motionMedia}`;
    backgrounds.appendChild(visual);
    visual.querySelectorAll(".chapter-motion-layer").forEach(configureMotionMedia);
  });
}

function shouldUseAppleAlphaVideo() {
  const userAgent = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  // 桌面 Safari（没有触屏的 Mac）保持原来的 webm 播放,不走 hevc——
  // desktop 体验是设计优先级,一直用 webm 没问题,hevc 文件更大,
  // 没必要在桌面上多绕一层。只有真正的触屏 iOS 设备才用 hevc。
  return isIOS;
}

// 第四章一直用的是"桌面 Safari 也走 hevc"这套旧逻辑,本来就没问题,
// 所以单独给它开个例外,不受上面"桌面一律用 webm"的新规则影响。
function isDesktopSafari() {
  const userAgent = navigator.userAgent || "";
  const isTouch = /iPhone|iPad|iPod/i.test(userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/i.test(userAgent) && !/(Chrome|Chromium|CriOS|Edg|OPR|Android)/i.test(userAgent);
  return isSafari && !isTouch;
}

function configureMotionMedia(media) {
  media.src = media.dataset.source;
  positionChapterMotionPatch(media);
  media.addEventListener("error", () => {
    media.classList.remove("is-playing");
    media.setAttribute("data-motion-unavailable", "true");
  });
  if (media.dataset.hideOnEnd === "true") {
    media.addEventListener("ended", () => media.classList.remove("is-playing"));
  }
  const loopStartRaw = media.dataset.loopStart;
  const loopStart = Number(loopStartRaw);
  if (loopStartRaw !== "" && Number.isFinite(loopStart) && loopStart >= 0) {
    media.addEventListener("ended", () => {
      if (!media.classList.contains("is-playing") || media.dataset.motionUnavailable) return;
      try { media.currentTime = loopStart; } catch (_) {}
      media.play().catch(() => {
        media.classList.remove("is-playing");
        media.setAttribute("data-motion-unavailable", "true");
      });
    });
  }
  const previousMotionId = media.dataset.afterMotion;
  if (!previousMotionId) return;
  const visual = media.closest(".chapter-visual");
  const previousMedia = visual?.querySelector(`.chapter-motion-layer[data-motion-id="${previousMotionId}"]`);
  previousMedia?.addEventListener("ended", () => {
    if (!visual.classList.contains("is-active") || media.dataset.motionUnavailable) return;
    playChapterMotion(media);
  });
}

function positionChapterMotionPatch(media) {
  if (!media?.classList.contains("is-frame")) return;
  const visual = media.closest(".chapter-visual");
  const image = visual?.querySelector(".chapter-bg-base");
  if (!visual || !image?.naturalWidth || !image?.naturalHeight) {
    if (image && !image.dataset.motionPatchLoadPending) {
      image.dataset.motionPatchLoadPending = "true";
      image.addEventListener("load", () => {
        delete image.dataset.motionPatchLoadPending;
        positionChapterMotionPatch(media);
      }, { once:true });
    }
    return;
  }
  const x = Number(media.dataset.frameX);
  const y = Number(media.dataset.frameY);
  const width = Number(media.dataset.frameWidth);
  const height = Number(media.dataset.frameHeight);
  if (![x, y, width, height].every(Number.isFinite)) return;
  const containerWidth = visual.clientWidth;
  const containerHeight = visual.clientHeight;
  if (!containerWidth || !containerHeight) return;
  const scale = Math.max(
    containerWidth / image.naturalWidth,
    containerHeight / image.naturalHeight
  );
  const cropOffsetX = (containerWidth - image.naturalWidth * scale) / 2;
  const cropOffsetY = (containerHeight - image.naturalHeight * scale) / 2;
  const anchor = media.dataset.frameAnchor;
  const anchoredX = anchor === "bottom-right" ? image.naturalWidth - width : x;
  const anchoredY = anchor === "bottom-right" ? image.naturalHeight - height : y;
  media.style.left = `${cropOffsetX + anchoredX * scale}px`;
  media.style.top = `${cropOffsetY + anchoredY * scale}px`;
  media.style.width = `${width * scale}px`;
  media.style.height = `${height * scale}px`;
}

function positionChapterMotionPatches() {
  document.querySelectorAll(".chapter-motion-layer.is-frame").forEach(positionChapterMotionPatch);
}

function stopChapterMotion(visual, trigger = null) {
  visual?.querySelectorAll(".chapter-motion-layer").forEach(media => {
    if (trigger && media.dataset.stop !== trigger) return;
    media.classList.remove("is-playing");
    clearTimeout(chapterMotionTimers.get(media));
    chapterMotionTimers.delete(media);
    media.pause();
    try { media.currentTime = 0; } catch (_) {}
  });
}

function playChapterMotion(media) {
  const begin = () => {
    media.playbackRate = Number(media.dataset.playbackRate) || MOTION_SETTINGS.chapterMotion.playbackRate;
    const configuredStart = Number(media.dataset.initialTime);
    const initialTime = Number.isFinite(configuredStart) && configuredStart >= 0 ? configuredStart : 0;
    try { media.currentTime = initialTime; } catch (_) {}
    media.pause();
    media.classList.add("is-playing");
    const play = () => media.play().catch(() => {
      media.classList.remove("is-playing");
      media.setAttribute("data-motion-unavailable", "true");
    });
    const fadeInBeforePlay = Math.max(0, Number(media.dataset.fadeInBeforePlay) || 0);
    const beginPlayback = () => {
      if (media.readyState >= 2) play();
      else media.addEventListener("canplay", play, { once:true });
    };
    if (fadeInBeforePlay) chapterMotionTimers.set(media, setTimeout(beginPlayback, fadeInBeforePlay));
    else beginPlayback();
  };
  const startDelay = Math.max(0, Number(media.dataset.startDelay) || 0);
  if (startDelay) chapterMotionTimers.set(media, setTimeout(begin, startDelay));
  else begin();
}

function startChapterMotion(visual, trigger) {
  const videos = [...(visual?.querySelectorAll(".chapter-motion-layer") || [])]
    .filter(media => media.dataset.start === trigger);
  videos.forEach(playChapterMotion);
}

function startChapter6MemoryMotion(visual) {
  const media = visual?.querySelector('.chapter-motion-layer[data-motion-id="ch6-ambient-loop"]');
  if (!media || media.dataset.motionUnavailable) return Promise.resolve();

  clearTimeout(chapterMotionTimers.get(media));
  chapterMotionTimers.delete(media);
  media.pause();
  media.playbackRate = Number(media.dataset.playbackRate) || MOTION_SETTINGS.chapterMotion.playbackRate;
  try { media.currentTime = 0; } catch (_) {}
  media.classList.add("is-playing");

  return new Promise(resolve => {
    let fallbackTimer = null;
    const finish = () => {
      clearTimeout(fallbackTimer);
      media.removeEventListener("playing", finish);
      media.removeEventListener("error", fail);
      resolve();
    };
    const fail = () => {
      media.classList.remove("is-playing");
      media.setAttribute("data-motion-unavailable", "true");
      finish();
    };
    const playFromBeginning = () => {
      try { media.currentTime = 0; } catch (_) {}
      media.play().catch(fail);
    };

    media.addEventListener("playing", finish, { once:true });
    media.addEventListener("error", fail, { once:true });
    if (media.readyState >= 2) playFromBeginning();
    else media.addEventListener("canplay", playFromBeginning, { once:true });
    fallbackTimer = setTimeout(finish, 3000);
  });
}

function waitForChapterMotion(visual, motionId) {
  const media = visual?.querySelector(`.chapter-motion-layer[data-motion-id="${motionId}"]`);
  if (!media || media.ended) return Promise.resolve();
  const expectedDuration = Number(media.dataset.duration) || 0;
  const expectedDelay = Number(media.dataset.startDelay) || 0;
  const expectedFadeIn = Number(media.dataset.fadeInBeforePlay) || 0;
  return new Promise(resolve => {
    let fallbackTimer = null;
    const finish = () => {
      clearTimeout(fallbackTimer);
      media.removeEventListener("ended", finish);
      media.removeEventListener("error", finish);
      resolve();
    };
    media.addEventListener("ended", finish, { once:true });
    media.addEventListener("error", finish, { once:true });
    fallbackTimer = setTimeout(finish, expectedDelay + expectedFadeIn + expectedDuration + 1500);
  });
}

function primeChapterMotion(visual, motionId) {
  const media = visual?.querySelector(`.chapter-motion-layer[data-motion-id="${motionId}"]`);
  if (!media) return;
  clearTimeout(chapterMotionTimers.get(media));
  chapterMotionTimers.delete(media);
  media.pause();
  try { media.currentTime = 0; } catch (_) {}
  media.classList.add("is-playing");
  media.setAttribute("data-motion-primed", "true");
}

function playChapterMotionById(visual, motionId, options = {}) {
  const media = visual?.querySelector(`.chapter-motion-layer[data-motion-id="${motionId}"]`);
  const required = options.required === true;
  const resolveAt = Math.max(0, Math.min(1, Number(options.resolveAt) || 1));
  if (!media || (prefersReducedMotion() && !required)) return Promise.resolve();
  const duration = Number(media.dataset.duration) || 0;
  media.classList.add("is-playing");
  media.removeAttribute("data-motion-primed");
  media.pause();
  try { media.currentTime = 0; } catch (_) {}
  return new Promise(resolve => {
    let fallbackTimer = null;
    let progressFrame = null;
    const finish = () => {
      clearTimeout(fallbackTimer);
      cancelAnimationFrame(progressFrame);
      media.removeEventListener("ended", finish);
      media.removeEventListener("error", finish);
      resolve();
    };
    const checkProgress = () => {
      const mediaDuration = Number.isFinite(media.duration) && media.duration > 0
        ? media.duration
        : duration / 1000;
      if (media.ended || (mediaDuration > 0 && media.currentTime >= mediaDuration * resolveAt)) {
        finish();
        return;
      }
      progressFrame = requestAnimationFrame(checkProgress);
    };
    const begin = () => media.play().then(() => {
      progressFrame = requestAnimationFrame(checkProgress);
    }).catch(finish);
    media.addEventListener("ended", finish, { once:true });
    media.addEventListener("error", finish, { once:true });
    fallbackTimer = setTimeout(finish, duration + 1200);
    if (media.readyState >= 2) begin();
    else media.addEventListener("canplay", begin, { once:true });
  });
}

function initIntroParticles() {
  if (prefersReducedMotion() || introParticleRunning) return;
  resizeIntroParticles();
  introParticleRunning = true;
  drawIntroParticles();
}

function randomGalaxyOffset() {
  const first = Math.max(.0001, Math.random());
  const second = Math.random();
  return Math.sqrt(-2 * Math.log(first)) * Math.cos(2 * Math.PI * second);
}

function getIntroParticleGlowSprite() {
  if (introParticleGlowSprite) return introParticleGlowSprite;
  const size = 64;
  const center = size / 2;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const spriteContext = sprite.getContext("2d");
  const gradient = spriteContext.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, "rgba(255,255,255,.7)");
  gradient.addColorStop(.16, "rgba(255,255,255,.42)");
  gradient.addColorStop(.42, "rgba(255,255,255,.14)");
  gradient.addColorStop(.72, "rgba(255,255,255,.035)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  spriteContext.fillStyle = gradient;
  spriteContext.fillRect(0, 0, size, size);
  introParticleGlowSprite = sprite;
  return introParticleGlowSprite;
}

function resizeIntroParticles() {
  const settings = MOTION_SETTINGS.introParticles;
  const screenRect = (introParticles.parentElement || startScreen).getBoundingClientRect();
  const width = Math.max(1, Math.round(screenRect.width));
  const height = Math.max(1, Math.round(screenRect.height));
  const pixelArea = width * height;
  const hardwareConcurrency = navigator.hardwareConcurrency || 8;
  const deviceMemory = navigator.deviceMemory || 8;
  const lowPower = hardwareConcurrency <= 4 || deviceMemory <= 4;
  const largeViewport = pixelArea >= settings.largeViewportPixelThreshold;
  const pixelRatioLimit = largeViewport ? settings.largeViewportMaxPixelRatio : settings.maxPixelRatio;
  const pixelRatio = Math.min(pixelRatioLimit, window.devicePixelRatio || 1);
  introParticlePixelRatio = pixelRatio;
  introParticleFrameInterval = lowPower || largeViewport
    ? settings.lowPowerFrameInterval
    : settings.standardFrameInterval;
  introParticles.width = Math.round(width * pixelRatio);
  introParticles.height = Math.round(height * pixelRatio);

  const baseParticleCount = Math.max(settings.minCount, Math.min(settings.maxCount, pixelArea / settings.densityDivisor));
  const particleCount = Math.round(baseParticleCount * (lowPower ? settings.lowPowerCountScale : 1));
  const clusters = Array.from({ length:settings.clusterCount }, () => {
    const x = Math.random() * width;
    const galaxyCenter = height * (settings.galaxyCenterY
      + Math.sin(x / width * Math.PI * settings.galaxyWaveCycles + settings.galaxyWavePhase) * settings.galaxyWaveAmplitude);
    return {
      x,
      y:galaxyCenter + randomGalaxyOffset() * height * settings.clusterCenterScatterY,
      spreadX:width * (settings.clusterSpreadXMin + Math.random() * (settings.clusterSpreadXMax - settings.clusterSpreadXMin)),
      spreadY:height * (settings.clusterSpreadYMin + Math.random() * (settings.clusterSpreadYMax - settings.clusterSpreadYMin))
    };
  });
  introParticleField = Array.from({ length:particleCount }, () => {
    const depth = Math.pow(Math.random(), settings.depthPower);
    const clustered = Math.random() < settings.clusterProbability;
    const cluster = clusters[Math.floor(Math.random() * clusters.length)];
    const anchorX = clustered
      ? (cluster.x + randomGalaxyOffset() * cluster.spreadX + width) % width
      : Math.random() * width;
    const galaxyCenter = height * (settings.galaxyCenterY
      + Math.sin(anchorX / width * Math.PI * settings.galaxyWaveCycles + settings.galaxyWavePhase) * settings.galaxyWaveAmplitude);
    const anchorY = clustered
      ? (cluster.y + randomGalaxyOffset() * cluster.spreadY + height) % height
      : Math.random() < settings.galaxyBandProbability
        ? Math.max(-settings.wrapPaddingY, Math.min(height + settings.wrapPaddingY, galaxyCenter + randomGalaxyOffset() * height * settings.galaxyScatterY))
        : Math.random() * height;
    const drift = settings.driftMin + depth * settings.driftDepthRange;
    const driftAngle = Math.random() * Math.PI * 2;
    return {
      x:anchorX, y:anchorY, anchorX, anchorY,
      velocityX:0, velocityY:0,
      driftX:Math.cos(driftAngle) * drift,
      driftY:Math.sin(driftAngle) * drift,
      depth,
      radius:settings.radiusMin + depth * settings.radiusDepthRange,
      alpha:settings.alphaMin + depth * settings.alphaDepthRange,
      twinkle:Math.random() * Math.PI * 2,
      twinkleSpeed:settings.twinkleSpeedMin + Math.random() * (settings.twinkleSpeedMax - settings.twinkleSpeedMin),
      brightStarOffset:Math.random(),
      brightStarCycleMs:settings.brightStarCycleMinMs
        + Math.random() * (settings.brightStarCycleMaxMs - settings.brightStarCycleMinMs)
    };
  });
}

function drawIntroParticles(now = 0) {
  if (!introParticleRunning) return;
  const settings = MOTION_SETTINGS.introParticles;
  if (now && introParticleLastDrawAt && now - introParticleLastDrawAt < introParticleFrameInterval) {
    introParticleFrame = requestAnimationFrame(drawIntroParticles);
    return;
  }
  introParticleLastDrawAt = now;
  const pixelRatio = introParticlePixelRatio;
  const context = introParticles.getContext("2d");
  const width = introParticles.width / pixelRatio;
  const height = introParticles.height / pixelRatio;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#fff";

  const interactionRadius = Math.max(settings.interactionRadiusMin,
    Math.min(settings.interactionRadiusMax, width * settings.interactionRadiusWidthRatio));
  introParticlePointer.energy += ((introParticlePointer.active ? 1 : 0) - introParticlePointer.energy)
    * settings.pointerPresenceResponse;
  if (introParticlePointer.initialized) {
    introParticlePointer.x += (introParticlePointer.targetX - introParticlePointer.x) * settings.pointerFollow;
    introParticlePointer.y += (introParticlePointer.targetY - introParticlePointer.y) * settings.pointerFollow;
  }
  introParticleField.forEach(particle => {
    particle.anchorX += particle.driftX;
    particle.anchorY += particle.driftY;
    if (particle.anchorX > width + settings.wrapPaddingX) {
      particle.anchorX = -settings.wrapPaddingX;
      particle.x = particle.anchorX;
    } else if (particle.anchorX < -settings.wrapPaddingX) {
      particle.anchorX = width + settings.wrapPaddingX;
      particle.x = particle.anchorX;
    }
    if (particle.anchorY < -settings.wrapPaddingY) {
      particle.anchorY = height + settings.wrapPaddingY;
      particle.y = particle.anchorY;
    } else if (particle.anchorY > height + settings.wrapPaddingY) {
      particle.anchorY = -settings.wrapPaddingY;
      particle.y = particle.anchorY;
    }

    let targetX = particle.anchorX;
    let targetY = particle.anchorY;
    if (introParticlePointer.initialized && introParticlePointer.energy > settings.interactionThreshold) {
      const deltaX = particle.anchorX - introParticlePointer.x;
      const deltaY = particle.anchorY - introParticlePointer.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || .001;
      if (distance < interactionRadius) {
        const proximity = 1 - distance / interactionRadius;
        const smoothInfluence = proximity * proximity * (3 - 2 * proximity);
        const displacement = smoothInfluence * settings.interactionDisplacement
          * introParticlePointer.energy
          * (settings.interactionDepthBase + particle.depth * settings.interactionDepthRange);
        targetX += deltaX / distance * displacement;
        targetY += deltaY / distance * displacement;
      }
    }

    particle.x += (targetX - particle.x) * settings.particleResponse;
    particle.y += (targetY - particle.y) * settings.particleResponse;

    particle.twinkle += particle.twinkleSpeed;
    const shimmer = settings.shimmerBase
      + Math.sin(particle.twinkle + now * settings.shimmerClockRate) * settings.shimmerRange;
    const brightness = particle.alpha * Math.max(0, shimmer);
    const glowProgress = Math.max(0, Math.min(1,
      (shimmer - settings.glowActivationThreshold) / (1 - settings.glowActivationThreshold)));
    const brightStarProgress = (now / particle.brightStarCycleMs + particle.brightStarOffset) % 1;
    const brightStarDistance = Math.abs(brightStarProgress - .5);
    const brightStarHalfWidth = settings.brightStarFraction * .5;
    const brightStarFadeEnd = brightStarHalfWidth + settings.brightStarFadeFraction;
    const brightStarLinear = brightStarDistance <= brightStarHalfWidth
      ? 1
      : brightStarDistance >= brightStarFadeEnd
        ? 0
        : 1 - (brightStarDistance - brightStarHalfWidth) / settings.brightStarFadeFraction;
    const brightStarStrength = brightStarLinear * brightStarLinear * (3 - 2 * brightStarLinear);
    const effectiveGlowProgress = Math.max(glowProgress, brightStarStrength * .85);
    if ((particle.depth >= settings.glowDepthThreshold || brightStarStrength > 0) && effectiveGlowProgress > 0) {
      const glowBreathProgress = (Math.sin(
        particle.twinkle * settings.glowBreathPhaseScale + now * settings.glowBreathClockRate
      ) + 1) * .5;
      const glowBreath = settings.glowBreathBase + glowBreathProgress * settings.glowBreathRange;
      const glowRadiusPulse = 1 + glowBreathProgress * settings.glowBreathRadiusRange;
      const brightStarRadius = 1 + brightStarStrength * settings.brightStarRadiusGain;
      const glowRadius = particle.radius * settings.glowRadiusMultiplier * glowRadiusPulse * brightStarRadius;
      const brightStarGlow = 1 + brightStarStrength * (settings.brightStarGlowMultiplier - 1);
      const glowBrightness = particle.alpha * Math.max(0,
        shimmer + brightStarStrength * settings.brightStarShimmerLift);
      context.globalCompositeOperation = "lighter";
      context.globalAlpha = glowBrightness * settings.glowAlphaMultiplier
        * effectiveGlowProgress * glowBreath * brightStarGlow;
      context.drawImage(getIntroParticleGlowSprite(),
        particle.x - glowRadius, particle.y - glowRadius, glowRadius * 2, glowRadius * 2);
    }
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = brightness;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fill();
  });
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  introParticleFrame = requestAnimationFrame(drawIntroParticles);
}

function startIntroParticles() {
  if (introParticleRunning || prefersReducedMotion() || document.hidden) return;
  resizeIntroParticles();
  introParticleLastDrawAt = 0;
  introParticleRunning = true;
  drawIntroParticles();
}

function stopIntroParticles() {
  introParticleRunning = false;
  introParticlePointer.energy = 0;
  introParticlePointer.active = false;
  introParticlePointer.initialized = false;
  if (introParticleResizeTimer) clearTimeout(introParticleResizeTimer);
  introParticleResizeTimer = null;
  if (introParticleFrame) cancelAnimationFrame(introParticleFrame);
  introParticleFrame = null;
}

function scatterIntroParticles(event) {
  if (!introParticleRunning) return;
  const rect = (introParticles.parentElement || startScreen).getBoundingClientRect();
  introParticlePointer.targetX = event.clientX - rect.left;
  introParticlePointer.targetY = event.clientY - rect.top;
  if (!introParticlePointer.initialized) {
    introParticlePointer.x = introParticlePointer.targetX;
    introParticlePointer.y = introParticlePointer.targetY;
    introParticlePointer.initialized = true;
  }
  introParticlePointer.active = true;
}

function cancelStartAnimations(finish = false) {
  startAnimationFrames.forEach(frame => cancelAnimationFrame(frame));
  startAnimationFrames.clear();
  if (!finish) return;
  startParagraphs.forEach(paragraph => {
    paragraph.classList.add("is-visible");
    paragraph.style.removeProperty("opacity");
    paragraph.style.removeProperty("filter");
    paragraph.style.removeProperty("transform");
  });
}

function animateIntroParagraph(paragraph, duration) {
  const settings = MOTION_SETTINGS.introText;
  if (prefersReducedMotion()) {
    paragraph.classList.add("is-visible");
    paragraph.style.removeProperty("opacity");
    paragraph.style.removeProperty("filter");
    paragraph.style.removeProperty("transform");
    return;
  }
  paragraph.classList.remove("is-visible");
  const startedAt = performance.now();
  const drawFrame = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const focusProgress = applyMotionEasing(settings.easing, progress);
    const blur = settings.initialBlurPx * Math.pow(1 - progress, settings.blurCurve);
    const scale = 1 + (settings.initialScale - 1) * (1 - focusProgress);
    const lift = settings.initialLiftRem * (1 - focusProgress);
    const opacity = settings.initialOpacity + (1 - settings.initialOpacity) * focusProgress;

    paragraph.style.opacity = opacity.toFixed(3);
    paragraph.style.filter = `blur(${blur.toFixed(2)}px)`;
    paragraph.style.transform = `translateY(${lift.toFixed(3)}rem) scale(${scale.toFixed(4)})`;

    if (progress < 1) {
      startAnimationFrames.set(paragraph, requestAnimationFrame(drawFrame));
      return;
    }

    startAnimationFrames.delete(paragraph);
    paragraph.classList.add("is-visible");
    paragraph.style.removeProperty("opacity");
    paragraph.style.removeProperty("filter");
    paragraph.style.removeProperty("transform");
  };

  startAnimationFrames.set(paragraph, requestAnimationFrame(drawFrame));
}

function startSequence() {
  const settings = MOTION_SETTINGS.introText;
  if (prefersReducedMotion()) {
    fastForwardStart();
    return;
  }
  const revealDelay = settings.initialDelay;
  const revealDuration = settings.focusDuration;
  const pauseBetweenParagraphs = settings.paragraphGap;
  cancelStartAnimations();
  startParagraphs.forEach(paragraph => {
    paragraph.classList.remove("is-visible");
    paragraph.style.removeProperty("opacity");
    paragraph.style.removeProperty("filter");
    paragraph.style.removeProperty("transform");
  });
  startBgWrap.classList.add("is-active");
  startParagraphs.forEach((paragraph, index) => {
    const time = revealDelay + index * (revealDuration + pauseBetweenParagraphs);
    startTimers.push(setTimeout(() => {
      animateIntroParagraph(paragraph, revealDuration);
      startBg.classList.add(`stage-${index + 1}`);
    }, time));
  });
  const sequenceDuration = revealDelay
    + startParagraphs.length * revealDuration
    + Math.max(0, startParagraphs.length - 1) * pauseBetweenParagraphs;
  startTimers.push(setTimeout(() => {
    startComplete = true;
  }, sequenceDuration));
}

function cancelEpilogueAnimations(finish = false) {
  epilogueTimers.splice(0).forEach(clearTimeout);
  epilogueAnimationFrames.forEach(frame => cancelAnimationFrame(frame));
  epilogueAnimationFrames.clear();
  if (!finish) return;
  epilogueParagraphs.forEach(paragraph => {
    paragraph.classList.add("is-visible");
    paragraph.style.removeProperty("opacity");
    paragraph.style.removeProperty("filter");
    paragraph.style.removeProperty("transform");
  });
}

function animateEpilogueParagraph(paragraph, duration) {
  const settings = MOTION_SETTINGS.epilogue;
  if (prefersReducedMotion()) {
    paragraph.classList.add("is-visible");
    requestEpilogueSafetyLayout();
    return;
  }
  paragraph.classList.remove("is-visible");
  const startedAt = performance.now();
  const drawFrame = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const focusProgress = applyMotionEasing(settings.easing, progress);
    const blur = settings.initialBlurPx * Math.pow(1 - progress, settings.blurCurve);
    const scale = 1 + (settings.initialScale - 1) * (1 - focusProgress);
    const lift = settings.initialLiftRem * (1 - focusProgress);
    const opacity = settings.initialOpacity + (1 - settings.initialOpacity) * focusProgress;
    paragraph.style.opacity = opacity.toFixed(3);
    paragraph.style.filter = `blur(${blur.toFixed(2)}px)`;
    paragraph.style.transform = `translateY(${lift.toFixed(3)}rem) scale(${scale.toFixed(4)})`;
    if (progress < 1) {
      epilogueAnimationFrames.set(paragraph, requestAnimationFrame(drawFrame));
      return;
    }
    epilogueAnimationFrames.delete(paragraph);
    paragraph.classList.add("is-visible");
    paragraph.style.removeProperty("opacity");
    paragraph.style.removeProperty("filter");
    paragraph.style.removeProperty("transform");
    requestEpilogueSafetyLayout();
  };
  epilogueAnimationFrames.set(paragraph, requestAnimationFrame(drawFrame));
}

function updateEpilogueSafetyLayout() {
  if (!epilogueScreen || !epilogueText) return;
  epilogueScreen.classList.remove("is-safety-condensed");
  if (!epilogueActive) return;
  const verticalPadding = 24;
  const availableHeight = epilogueScreen.clientHeight - verticalPadding * 2;
  const needsSafety = epilogueText.scrollHeight > availableHeight;
  epilogueScreen.classList.toggle("is-safety-condensed", needsSafety);
}

function requestEpilogueSafetyLayout() {
  if (epilogueSafetyFrame) cancelAnimationFrame(epilogueSafetyFrame);
  epilogueSafetyFrame = requestAnimationFrame(() => {
    epilogueSafetyFrame = null;
    updateEpilogueSafetyLayout();
  });
}

function fastForwardEpilogue() {
  cancelEpilogueAnimations(true);
  requestEpilogueSafetyLayout();
  busy = false;
  updateNav();
}

function startEpilogueSequence() {
  const settings = MOTION_SETTINGS.epilogue;
  cancelEpilogueAnimations();
  epilogueParagraphs.forEach(paragraph => {
    paragraph.classList.remove("is-visible");
    paragraph.style.removeProperty("opacity");
    paragraph.style.removeProperty("filter");
    paragraph.style.removeProperty("transform");
  });
  if (prefersReducedMotion()) {
    fastForwardEpilogue();
    return;
  }
  epilogueParagraphs.forEach((paragraph, index) => {
    const time = settings.textInitialDelay + index * (settings.focusDuration + settings.paragraphGap);
    epilogueTimers.push(setTimeout(() => {
      animateEpilogueParagraph(paragraph, settings.focusDuration);
    }, time));
  });
  epilogueTimers.push(setTimeout(() => {
    if (!epilogueActive) return;
    busy = false;
    updateNav();
  }, settings.navigationLockDuration));
}

function hideEpilogue() {
  if (!epilogueActive && !epilogueScreen.classList.contains("is-active")) return;
  cancelEpilogueAnimations();
  if (epilogueSafetyFrame) cancelAnimationFrame(epilogueSafetyFrame);
  epilogueSafetyFrame = null;
  stopIntroParticles();
  epilogueActive = false;
  document.body.classList.remove("is-epilogue");
  epilogueScreen.classList.remove("is-active", "is-receding");
  epilogueScreen.classList.remove("is-safety-condensed");
  epilogueScreen.setAttribute("aria-hidden", "true");
  app.removeAttribute("aria-hidden");
  epilogueParagraphs.forEach(paragraph => paragraph.classList.remove("is-visible"));
  busy = false;
}

function enterEpilogue() {
  if (epilogueActive) return;
  if (chapterIndex === CHAPTER_6_INDEX) stopChapter6Ambient();
  if (chapterIndex === CHAPTER_4_INDEX) stopChapter4Ambient();
  busy = true;
  startActive = false;
  epilogueActive = true;
  phase = "epilogue";
  closeContext();
  hideTooltip();
  stopIntroParticles();
  epilogueScreen.prepend(introParticles);
  document.body.classList.add("is-epilogue");
  app.className = "app is-image-mode";
  app.setAttribute("aria-hidden", "true");
  hotspotsEl.innerHTML = "";
  epilogueScreen.classList.add("is-active");
  epilogueScreen.setAttribute("aria-hidden", "false");
  startIntroParticles();
  setTimeline("epilogue");
  updateNav();
  requestEpilogueSafetyLayout();
  requestAnimationFrame(() => {
    setActiveBackground(null);
    startEpilogueSequence();
  });
}

function fastForwardStart() {
  startTimers.forEach(clearTimeout);
  cancelStartAnimations(true);
  startParagraphs.forEach((paragraph, index) => {
    startBg.classList.add(`stage-${index + 1}`);
  });
  startComplete = true;
}

function advanceStart() {
  startTimers.forEach(clearTimeout);
  cancelStartAnimations();
  dismissStart();
}

function dismissStart(immediate = false) {
  if (startScreen.classList.contains("is-hidden")) return;
  hideEpilogue();
  startScreen.classList.add("is-hidden");
  const finish = () => {
    startActive = false;
    stopIntroParticles();
    startScreen.setAttribute("aria-hidden", "true");
    enterChapter(0, 0);
  };
  immediate ? finish() : setTimeout(finish, MOTION_SETTINGS.interface.startDismissDuration);
}

function showStart() {
  if (chapterIndex === CHAPTER_6_INDEX) stopChapter6Ambient();
  if (chapterIndex === CHAPTER_4_INDEX) stopChapter4Ambient();
  hideEpilogue();
  startScreen.prepend(introParticles);
  startTimers.forEach(clearTimeout);
  setLightNarrativeMode(false);
  startActive = true;
  startComplete = true;
  startScreen.classList.remove("is-hidden");
  startScreen.setAttribute("aria-hidden", "false");
  startIntroParticles();
  fastForwardStart();
  setTimeline("start");
  renderContext("start");
  closeContext();
}

function renderChapterText() {
  const chapter = CHAPTERS[chapterIndex];
  narrative.innerHTML = `<div class="poem">${chapter.steps.map((step, index) => `
    <div class="poem-step" data-step="${index}">
      <div class="step-zh">${renderRichText(step.zh, step.refs, "zh")}</div>
      <div class="step-en">${renderRichText(step.en, step.refs, "en")}</div>
    </div>`).join("")}</div>`;
  visualStep = stepIndex;
  measureLineLayout();
  updateTextState();
  if (document.fonts?.ready) {
    const currentPoem = narrative.querySelector(".poem");
    document.fonts.ready.then(() => {
      if (currentPoem?.isConnected) {
        measureLineLayout();
        paintTextPosition(visualStep);
      }
    });
  }
}

function updateTextState() {
  const poem = narrative.querySelector(".poem");
  if (!poem) return;
  paintTextPosition(visualStep);
}

function measureLineLayout() {
  const poem = narrative.querySelector(".poem");
  if (!poem) return;
  const elements = [...poem.querySelectorAll(".poem-step")];
  const gap = parseFloat(getComputedStyle(poem).getPropertyValue("--line-gap")) || 24;
  lineCenters = [0];
  for (let index = 1; index < elements.length; index += 1) {
    const previousHeight = elements[index - 1].offsetHeight;
    const currentHeight = elements[index].offsetHeight;
    lineCenters[index] = lineCenters[index - 1] + previousHeight / 2 + gap + currentHeight / 2;
  }
}

function getFocusCenter(position) {
  if (!lineCenters.length) return 0;
  const lower = Math.max(0, Math.min(lineCenters.length - 1, Math.floor(position)));
  const upper = Math.max(0, Math.min(lineCenters.length - 1, Math.ceil(position)));
  const fraction = position - Math.floor(position);
  return lineCenters[lower] + (lineCenters[upper] - lineCenters[lower]) * fraction;
}

function paintTextPosition(position) {
  const settings = MOTION_SETTINGS.narrativeText;
  const poem = narrative.querySelector(".poem");
  if (!poem) return;
  const textChannel = "255,255,255";
  const focusCenter = getFocusCenter(position);
  poem.querySelectorAll(".poem-step").forEach((element, index) => {
    const distance = index - position;
    const absoluteDistance = Math.abs(distance);
    const proximity = Math.max(0, 1 - absoluteDistance);
    const neighborPresence = absoluteDistance <= 1 ? settings.neighborOpacity * Math.min(1, absoluteDistance) : 0;
    const opacity = Math.max(proximity, neighborPresence);
    const scale = settings.unfocusedScale + proximity * (settings.focusedScale - settings.unfocusedScale);
    const blur = Math.min(settings.maxBlurRem, absoluteDistance * settings.blurPerStepRem);
    element.style.opacity = String(opacity);
    element.style.filter = `blur(${blur}rem)`;
    const offset = (lineCenters[index] || 0) - focusCenter;
    element.style.transform = `translateY(calc(-50% + ${offset}px)) scale(${scale})`;
    const zh = element.querySelector(".step-zh");
    const en = element.querySelector(".step-en");
    if (zh) zh.style.color = `rgba(${textChannel},${settings.zhBaseOpacity + proximity * settings.zhFocusGain})`;
    if (en) en.style.color = `rgba(${textChannel},${settings.enBaseOpacity + proximity * settings.enFocusGain})`;
    element.classList.toggle("is-active", phase === "text" && absoluteDistance < settings.activeThreshold);
    element.classList.toggle("is-neighbor", phase === "text" && absoluteDistance >= settings.activeThreshold && absoluteDistance <= settings.neighborRange);
  });
  updateTextBackground(position);
  if (chapterIndex === CHAPTER_6_INDEX) updateChapter6AmbientForScroll(position);
}

function updateTextBackground(position) {
  if (phase !== "text") return;
  const settings = MOTION_SETTINGS.leadBackground;
  const lastIndex = CHAPTERS[chapterIndex].steps.length - 1;
  if (chapterIndex === MOTION_SETTINGS.portalNeon.chapterIndex) {
    const portalSettings = MOTION_SETTINGS.portalNeon;
    const revealStart = Math.max(0, lastIndex - (settings.revealLineCount - 1));
    const revealSpan = Math.max(1, lastIndex - revealStart);
    const imageProgress = Math.max(0, Math.min(1, (position - revealStart) / revealSpan));
    const lightProgress = Math.max(0, Math.min(1,
      (position + portalSettings.leadInOffset) / Math.max(1, revealStart)));
    const visual = document.querySelector(`.chapter-visual[data-index="${chapterIndex}"]`);
    if (visual) {
      visual.style.opacity = String(imageProgress * settings.maxOpacity);
      visual.style.filter = `blur(${settings.initialBlurRem - imageProgress * settings.blurReductionRem}rem) brightness(${settings.initialBrightness + imageProgress * settings.brightnessGain})`;
      visual.style.transform = `scale(${settings.initialScale - imageProgress * settings.scaleReduction})`;
    }
    updatePortalNeon(lightProgress, imageProgress);
    return;
  }
  resetPortalNeon();
  const revealStart = Math.max(0, lastIndex - (settings.revealLineCount - 1));
  const revealSpan = Math.max(1, lastIndex - revealStart);
  const revealProgress = Math.max(0, Math.min(1, (position - revealStart) / revealSpan));
  const visual = document.querySelector(`.chapter-visual[data-index="${chapterIndex}"]`);
  if (!visual) return;
  visual.style.opacity = String(revealProgress * settings.maxOpacity);
  visual.style.filter = `blur(${settings.initialBlurRem - revealProgress * settings.blurReductionRem}rem) brightness(${settings.initialBrightness + revealProgress * settings.brightnessGain})`;
  visual.style.transform = `scale(${settings.initialScale - revealProgress * settings.scaleReduction})`;
}

function projectPortalSourcePoint(image, x, y) {
  if (!image?.naturalWidth || !image?.naturalHeight) return null;
  const width = app.clientWidth;
  const height = app.clientHeight;
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  return {
    x:(width - image.naturalWidth * scale) / 2 + x * scale,
    y:(height - image.naturalHeight * scale) / 2 + y * scale
  };
}

function updatePortalNeon(progress, fadeProgress = 0) {
  const settings = MOTION_SETTINGS.portalNeon;
  const image = document.querySelector(`.chapter-visual[data-index="${settings.chapterIndex}"] .chapter-bg-base`);
  portalNeonBlobs.forEach(blob => {
    const profile = settings.blobs.find(item => item.id === blob.dataset.portalNeon);
    if (!profile) return;
    const finalPoint = projectPortalSourcePoint(image, profile.endX, profile.endY);
    const startX = app.clientWidth * profile.startX;
    const startY = app.clientHeight * profile.startY;
    const endX = finalPoint?.x ?? startX;
    const endY = finalPoint?.y ?? startY;
    const localProgress = Math.max(0, Math.min(1, (progress - profile.revealAt) / Math.max(.001, 1 - profile.revealAt)));
    const eased = applyMotionEasing("easeOutCubic", localProgress);
    const scale = profile.scaleStart + (profile.scaleEnd - profile.scaleStart) * eased;
    blob.style.left = `${startX + (endX - startX) * eased}px`;
    blob.style.top = `${startY + (endY - startY) * eased}px`;
    const fade = 1 - applyMotionEasing("easeInOutCubic", fadeProgress);
    blob.style.opacity = String(profile.opacity * eased * fade);
    blob.style.transform = `translate(-50%,-50%) scale(${scale})`;
  });
  // 每个光团单独控制显露程度；容器不再二次压低透明度。
  portalNeon.style.opacity = "1";
}

function resetPortalNeon() {
  portalNeon.style.opacity = "0";
  portalNeonBlobs.forEach(blob => { blob.style.opacity = "0"; });
}

function animateTextToStep(target) {
  if (lineAnimationFrame) cancelAnimationFrame(lineAnimationFrame);
  if (prefersReducedMotion()) {
    visualStep = target;
    lineAnimationFrame = null;
    paintTextPosition(visualStep);
    return;
  }
  const settings = MOTION_SETTINGS.narrativeText;
  const start = visualStep;
  const startedAt = performance.now();
  const duration = settings.scrollDuration;
  const animateFrame = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = applyMotionEasing(settings.easing, progress);
    visualStep = start + (target - start) * eased;
    paintTextPosition(visualStep);
    if (progress < 1) lineAnimationFrame = requestAnimationFrame(animateFrame);
    else {
      visualStep = target;
      lineAnimationFrame = null;
      paintTextPosition(visualStep);
    }
  };
  lineAnimationFrame = requestAnimationFrame(animateFrame);
}

function setChapterInfo() {
  const chapter = CHAPTERS[chapterIndex];
  yearEl.textContent = chapter.year;
  titleZhEl.textContent = chapter.title;
  titleEnEl.textContent = chapter.titleEn;
}

function setLightNarrativeMode(active) {
  document.body.classList.remove("is-light-narrative");
}

function getTextModeClass(index = chapterIndex) {
  return `app is-text-mode${index === MOTION_SETTINGS.portalNeon.chapterIndex ? " is-portal-neon" : ""}`;
}

function cancelCompositeReveal() {
  if (compositeRevealFrame) cancelAnimationFrame(compositeRevealFrame);
  compositeRevealFrame = null;
  if (compositeRevealResolve) compositeRevealResolve();
  compositeRevealResolve = null;
  document.querySelectorAll(".chapter-dissolve-canvas").forEach(canvas => {
    canvas.hidden = true;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  });
}

function seededDissolveNoise(index, seed) {
  const value = Math.sin((index + 1) * 12.9898 + (seed + 1) * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function prepareDissolveCanvas(visual, composite, chapter) {
  const settings = MOTION_SETTINGS.chapterReveal.dissolve;
  const canvas = visual.querySelector(".chapter-dissolve-canvas");
  if (!canvas || !composite.naturalWidth || !composite.naturalHeight) return null;
  const width = Math.max(1, Math.round(visual.clientWidth));
  const height = Math.max(1, Math.round(visual.clientHeight));
  const pixelRatio = Math.min(settings.maxPixelRatio, window.devicePixelRatio || 1);
  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);
  canvas.hidden = false;

  const source = document.createElement("canvas");
  source.width = canvas.width;
  source.height = canvas.height;
  const sourceContext = source.getContext("2d");
  const imageRatio = composite.naturalWidth / composite.naturalHeight;
  const canvasRatio = canvas.width / canvas.height;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = composite.naturalWidth;
  let sourceHeight = composite.naturalHeight;
  if (imageRatio > canvasRatio) {
    sourceWidth = composite.naturalHeight * canvasRatio;
    sourceX = (composite.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = composite.naturalWidth / canvasRatio;
    sourceY = (composite.naturalHeight - sourceHeight) / 2;
  }
  sourceContext.drawImage(composite, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, source.width, source.height);

  const cellSize = Math.max(4, Math.round(settings.cellSize * pixelRatio));
  const columns = Math.ceil(canvas.width / cellSize);
  const rows = Math.ceil(canvas.height / cellSize);
  const seed = CHAPTERS.indexOf(chapter);
  const cells = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column;
      cells.push({
        x:column * cellSize,
        y:row * cellSize,
        threshold:seededDissolveNoise(index, seed) * (1 - settings.fadeSpan)
      });
    }
  }
  return { canvas, context:canvas.getContext("2d"), source, cells, cellSize, fadeSpan:settings.fadeSpan };
}

function drawDissolveFrame(state, progress) {
  if (!state) return;
  const { canvas, context, source, cells, cellSize, fadeSpan } = state;
  context.clearRect(0, 0, canvas.width, canvas.height);
  cells.forEach(cell => {
    const rawOpacity = Math.max(0, Math.min(1, (progress - cell.threshold) / fadeSpan));
    if (rawOpacity <= 0) return;
    const opacity = rawOpacity * rawOpacity * (3 - 2 * rawOpacity);
    const width = Math.min(cellSize + 1, canvas.width - cell.x);
    const height = Math.min(cellSize + 1, canvas.height - cell.y);
    context.globalAlpha = opacity;
    context.drawImage(source, cell.x, cell.y, width, height, cell.x, cell.y, width, height);
  });
  context.globalAlpha = 1;
}

function setActiveBackground(indexOrNull) {
  cancelCompositeReveal();
  document.querySelectorAll(".chapter-visual").forEach((visual, index) => {
    stopChapterMotion(visual);
    visual.style.removeProperty("opacity");
    visual.style.removeProperty("filter");
    visual.style.removeProperty("transform");
    visual.classList.toggle("is-active", indexOrNull === index);
    visual.classList.remove("is-composite-revealed", "is-reveal-complete", "is-js-revealing");
    const composite = visual.querySelector(".chapter-bg-composite");
    const dissolveCanvas = visual.querySelector(".chapter-dissolve-canvas");
    if (composite) {
      composite.style.removeProperty("opacity");
      composite.style.removeProperty("filter");
      composite.style.removeProperty("transform");
      composite.style.removeProperty("clip-path");
      composite.style.removeProperty("mask-image");
      composite.style.removeProperty("-webkit-mask-image");
    }
    if (dissolveCanvas) {
      dissolveCanvas.hidden = true;
      dissolveCanvas.getContext("2d")?.clearRect(0, 0, dissolveCanvas.width, dissolveCanvas.height);
    }
  });
}

function animateCompositeReveal(visual, chapter, duration) {
  const settings = MOTION_SETTINGS.chapterReveal;
  const composite = visual?.querySelector(".chapter-bg-composite");
  if (!visual || !composite) return Promise.resolve();
  cancelCompositeReveal();
  if (prefersReducedMotion()) {
    visual.classList.add("is-composite-revealed", "is-reveal-complete");
    visual.classList.remove("is-js-revealing");
    composite.style.removeProperty("opacity");
    composite.style.removeProperty("filter");
    composite.style.removeProperty("transform");
    return Promise.resolve();
  }
  visual.classList.remove("is-composite-revealed", "is-reveal-complete");
  visual.classList.add("is-js-revealing");
  const startedAt = performance.now();
  const dissolveState = chapter.reveal === "dissolve"
    ? prepareDissolveCanvas(visual, composite, chapter)
    : null;

  return new Promise(resolve => {
    compositeRevealResolve = resolve;
    const finish = () => {
      visual.classList.add("is-composite-revealed", "is-reveal-complete");
      visual.classList.remove("is-js-revealing");
      composite.style.opacity = "1";
      if (dissolveState) {
        dissolveState.canvas.hidden = true;
        dissolveState.context.clearRect(0, 0, dissolveState.canvas.width, dissolveState.canvas.height);
      }
      composite.style.removeProperty("opacity");
      composite.style.removeProperty("filter");
      composite.style.removeProperty("transform");
      composite.style.removeProperty("clip-path");
      composite.style.removeProperty("mask-image");
      composite.style.removeProperty("-webkit-mask-image");
      compositeRevealFrame = null;
      compositeRevealResolve = null;
      stopChapterMotion(visual, "reveal-complete");
      resolve();
    };

    const animate = now => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = applyMotionEasing(settings.revealEasing, progress);
      composite.style.opacity = chapter.reveal === "dissolve" ? "0" : "1";
      composite.style.filter = "none";
      composite.style.transform = "none";

      if (chapter.reveal === "center-dissolve") {
        const center = settings.centerDissolve;
        const feather = settings.feather;
        const origin = center.origins[chapter.revealOrigin] || { x:50, y:50 };
        const revealRadius = eased * (origin.radius || center.finalRadius);
        const softness = (origin.featherWidth || feather.width) * Math.min(1, eased * 4);
        const middle = revealRadius + softness * feather.middlePosition;
        const mask = `radial-gradient(circle at ${origin.x}% ${origin.y}%,#000 0,#000 ${revealRadius.toFixed(2)}%,rgba(0,0,0,${feather.middleAlpha}) ${middle.toFixed(2)}%,transparent ${(revealRadius + softness).toFixed(2)}%)`;
        composite.style.webkitMaskImage = mask;
        composite.style.maskImage = mask;
      } else if (chapter.reveal === "outside-in") {
        const outside = settings.outsideIn;
        const holeRadius = (1 - eased) * outside.initialHoleRadius;
        const mask = `radial-gradient(circle at ${outside.focusX}% ${outside.focusY}%,transparent 0,transparent ${holeRadius.toFixed(2)}%,rgba(0,0,0,${outside.featherAlpha}) ${(holeRadius + outside.innerFeather).toFixed(2)}%,#000 ${(holeRadius + outside.outerFeather).toFixed(2)}%)`;
        composite.style.webkitMaskImage = mask;
        composite.style.maskImage = mask;
      } else if (chapter.reveal === "poster-split") {
        const split = settings.posterSplit;
        composite.style.clipPath = `inset(${(split.topInset * (1 - eased)).toFixed(2)}% 0 ${(split.bottomInset * (1 - eased)).toFixed(2)}% 0)`;
      } else if (chapter.reveal === "sweep") {
        const feather = settings.feather;
        const front = eased * (100 + feather.width);
        const opaqueEdge = Math.max(0, front - feather.width);
        const middle = Math.max(0, front - feather.width * feather.middlePosition);
        const transparentEdge = Math.max(0, front);
        const mask = `linear-gradient(to right,#000 0,#000 ${opaqueEdge.toFixed(2)}%,rgba(0,0,0,${feather.middleAlpha}) ${middle.toFixed(2)}%,transparent ${transparentEdge.toFixed(2)}%)`;
        composite.style.clipPath = "none";
        composite.style.webkitMaskImage = mask;
        composite.style.maskImage = mask;
      } else if (chapter.reveal === "dissolve") {
        if (dissolveState) drawDissolveFrame(dissolveState, eased);
        else composite.style.opacity = String(eased);
      }

      if (progress < 1) compositeRevealFrame = requestAnimationFrame(animate);
      else finish();
    };
    compositeRevealFrame = requestAnimationFrame(animate);
  });
}

function setTimeline(scene) {
  timelineStops.forEach(stop => {
    const active = stop.dataset.scene === String(scene);
    stop.classList.toggle("is-active", active);
    if (active) {
      stop.scrollIntoView({ behavior:"smooth", inline:"center", block:"nearest" });
      navigator.vibrate?.(8); // iPhone Safari 不支持这个 API,会静默忽略,不报错
    }
  });
}

function hasChapterSidebar(target) {
  if (target === "start" || target === "epilogue" || typeof target === "string") return true;
  return CONTEXTS[target]?.sidebar !== false;
}

function updateContextAvailability(target = startActive ? "start" : epilogueActive ? "epilogue" : chapterIndex) {
  const available = hasChapterSidebar(target);
  contextToggle.classList.toggle("is-unavailable", !available);
  contextToggle.setAttribute("aria-hidden", String(!available));
  contextToggle.tabIndex = available ? 0 : -1;
  if (!available) closeContext();
}

function updateNav() {
  if (epilogueActive) {
    navButtonPrev.disabled = false;
    navButtonNext.disabled = true;
    setTimeline("epilogue");
    updateContextAvailability("epilogue");
    updateSoundToggle();
    return;
  }
  navButtonPrev.disabled = startActive;
  navButtonNext.disabled = false;
  if (!startActive) setTimeline(chapterIndex);
  updateContextAvailability();
  updateSoundToggle();
}

async function enterChapter(index, initialStep = 0) {
  hideEpilogue();
  busy = true;
  teardownChapter6Memory();
  if (chapterIndex === CHAPTER_6_INDEX && index !== CHAPTER_6_INDEX) stopChapter6Ambient();
  if (chapterIndex === CHAPTER_4_INDEX && index !== CHAPTER_4_INDEX) stopChapter4Ambient();
  chapterIndex = index;
  stepIndex = initialStep;
  phase = "text";
  app.className = getTextModeClass(index);
  setLightNarrativeMode(index === MOTION_SETTINGS.doorTransition.targetChapterIndex);
  setActiveBackground(chapterIndex);
  startChapterMotion(document.querySelector(`.chapter-visual[data-index="${chapterIndex}"]`), "chapter-entry");
  setChapterInfo();
  renderChapterText();
  renderHotspots();
  renderContext(chapterIndex);
  narrative.classList.add("is-visible");
  updateNav();
  await delay(MOTION_SETTINGS.chapterReveal.chapterEntryDelay);
  busy = false;
}

async function showImage() {
  busy = true;
  phase = "image";
  const chapter = CHAPTERS[chapterIndex];
  const visual = document.querySelector(`.chapter-visual[data-index="${chapterIndex}"]`);
  teardownChapter6Memory();
  setLightNarrativeMode(false);
  app.className = "app is-image-mode is-transitioning is-js-fading";
  if (chapter.baseOnly) startChapterMotion(visual, "image-entry");
  if (chapterIndex === CHAPTER_4_INDEX) revealChapter4Ambient();
  let hotspotMotion = Promise.resolve();
  renderHotspots();
  updateNav();
  const settings = MOTION_SETTINGS.chapterReveal;
  await fadeBackgroundToFull(visual, settings.baseFadeDuration);
  startChapterMotion(visual, "image-visible");
  if (chapter.hotspotAfterMotion) hotspotMotion = waitForChapterMotion(visual, chapter.hotspotAfterMotion);
  narrative.classList.remove("is-visible");
  app.classList.remove("is-transitioning", "is-js-fading");
  if (chapter.baseImage && !chapter.baseOnly) {
    await delay(settings.baseHoldDuration);
    await animateCompositeReveal(visual, chapter, chapter.revealDuration || settings.defaultRevealDuration);
  }
  if (chapter.hotspotAfterMotion) {
    await hotspotMotion;
    await delay(chapter.hotspotDelay || 0);
  }
  if (chapterIndex === MOTION_SETTINGS.doorTransition.chapterIndex) {
    primeChapterMotion(visual, MOTION_SETTINGS.doorTransition.triggerMotionId);
  }
  app.classList.add("is-hotspots-ready");
  if (chapterIndex === CHAPTER_6_INDEX) {
    revealChapter6Ambient();
    // The memory route is authored against the complete motion pass, so both
    // timelines must begin together at frame zero.
    await startChapter6MemoryMotion(visual);
    if (!isChapter6ImageMode()) {
      busy = false;
      return;
    }
    app.classList.add("is-memory-active");
    memoryLayer.setAttribute("aria-hidden", "false");
    renderChapter6MemoryCues();
    // The first focus starts only after its screen coordinates are current.
    requestAnimationFrame(() => {
      positionChapter6MemoryCues();
      requestAnimationFrame(runChapter6OpeningGlance);
    });
  }
  updateSoundToggle();
  busy = false;
}

function fadeBackgroundToFull(visual, duration) {
  if (!visual) return Promise.resolve();
  if (prefersReducedMotion() || duration <= 0) {
    visual.style.removeProperty("opacity");
    visual.style.removeProperty("filter");
    visual.style.removeProperty("transform");
    return Promise.resolve();
  }
  const startOpacity = Number.parseFloat(visual.style.opacity || getComputedStyle(visual).opacity) || 0;
  const filter = visual.style.filter;
  const startBlur = Number.parseFloat(filter.match(/blur\(([\d.]+)rem\)/)?.[1] || "0");
  const startBrightness = Number.parseFloat(filter.match(/brightness\(([\d.]+)\)/)?.[1] || "1");
  const startScale = Number.parseFloat(visual.style.transform.match(/scale\(([\d.]+)\)/)?.[1] || "1");
  const startedAt = performance.now();
  return new Promise(resolve => {
    const animate = now => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = applyMotionEasing(MOTION_SETTINGS.chapterReveal.baseFadeEasing, progress);
      visual.style.opacity = String(startOpacity + (1 - startOpacity) * eased);
      visual.style.filter = `blur(${startBlur * (1 - eased)}rem) brightness(${startBrightness + (1 - startBrightness) * eased})`;
      visual.style.transform = `scale(${startScale + (1 - startScale) * eased})`;
      if (progress < 1) requestAnimationFrame(animate);
      else {
        visual.style.removeProperty("opacity");
        visual.style.removeProperty("filter");
        visual.style.removeProperty("transform");
        resolve();
      }
    };
    requestAnimationFrame(animate);
  });
}

async function showTextFromImage() {
  busy = true;
  teardownChapter6Memory();
  if (chapterIndex === CHAPTER_6_INDEX) chapter6AmbientRevealed = false;
  setActiveBackground(chapterIndex);
  startChapterMotion(document.querySelector(`.chapter-visual[data-index="${chapterIndex}"]`), "chapter-entry");
  app.className = getTextModeClass();
  setLightNarrativeMode(chapterIndex === MOTION_SETTINGS.doorTransition.targetChapterIndex);
  phase = "text";
  stepIndex = CHAPTERS[chapterIndex].steps.length - 1;
  renderChapterText();
  narrative.classList.add("is-visible");
  updateNav();
  await delay(MOTION_SETTINGS.chapterReveal.imageToTextDelay);
  busy = false;
}

function goForward() {
  if (busy) return;
  const chapter = CHAPTERS[chapterIndex];
  if (phase === "text") {
    if (stepIndex < chapter.steps.length - 1) stepIndex += 1;
    else return showImage();
    animateTextToStep(stepIndex);
  }
  // 滚轮停留在当前章节：画面之后不自动跨到下一时间线节点。
  updateNav();
}

function goBackward() {
  if (busy) return;
  if (phase === "image") showTextFromImage();
  else if (stepIndex > 0) {
    stepIndex -= 1;
    animateTextToStep(stepIndex);
  }
  // 滚轮停留在当前章节：第一句之前不自动跨到上一时间线节点。
  updateNav();
}

function goForwardDirect() {
  if (busy) return;
  if (epilogueActive) return;
  const chapter = CHAPTERS[chapterIndex];
  if (phase === "text") showImage();
  else if (phase === "image" && chapter.isFinal) enterEpilogue();
  else if (phase === "image") enterChapter(chapterIndex + 1, 0);
  updateNav();
}

function goBackwardDirect() {
  if (busy) return;
  if (epilogueActive) {
    const finalChapter = CHAPTERS.length - 1;
    hideEpilogue();
    enterChapter(finalChapter, CHAPTERS[finalChapter].steps.length - 1).then(showImage);
    return;
  }
  if (phase === "image") showTextFromImage();
  else if (chapterIndex > 0) {
    const previous = chapterIndex - 1;
    enterChapter(previous, CHAPTERS[previous].steps.length - 1).then(showImage);
  }
  updateNav();
}

function renderContext(target, hotspot = null) {
  if (typeof target === "string" && TERMS[target]) {
    const term = TERMS[target];
    contextContent.innerHTML = `
      <h2>${renderContextChineseLabel(term.zh)}</h2><p class="context-title-en">${term.en}</p>
      <p class="context-body-zh">${term.bodyZh}</p><p class="context-en context-body-en">${term.bodyEn}</p>
      <hr class="context-rule"><p class="context-material">${renderContextChineseLabel("术语说明")} · TERM NOTE ${term.number}</p>`;
    buildTraditionalContextBodies();
    updateContextChineseLabels();
    return;
  }
  if (target === "start") {
    contextContent.innerHTML = `
      <h2>${renderContextChineseLabel("序言：1966")}</h2><p class="context-title-en">Prologue · 1966</p>
      <p class="context-body-zh">1966年，文化大革命开始。学校停课，工作单位和家庭生活都受到冲击；许多人被批斗、迁徙或长期与亲人分离。文中的上标词汇解释这段经历常用的政治语言。</p>
      <p class="context-en context-body-en">The Cultural Revolution began in 1966. Schools closed, workplaces and family life were disrupted, and many people faced denunciation, displacement, or long separation from relatives. Superscript terms in the text explain the political language of the period.</p>
      <hr class="context-rule">
      <p class="context-material context-body-zh">点击文中的上标数字查看术语</p>
      <p class="context-material context-body-en">Select a superscript number to read the term note.</p>`;
    buildTraditionalContextBodies();
    updateContextChineseLabels();
    return;
  }
  if (target === "epilogue") {
    contextContent.innerHTML = `
      <h2>${renderContextChineseLabel("跋")}</h2><p class="context-title-en">Epilogue</p>
      <div class="context-primary">
        <section class="epilogue-context-section">
          <h3>${renderContextChineseLabel("七十年代末：平反与返城")}<small>Late 1970s: Rehabilitation and Return</small></h3>
          <p class="context-body-zh">1976年以后，教育秩序、知识分子政策和此前的政治结论陆续调整。平反、恢复工作与知青返城并非在同一天完成，各地、各单位和每个人的进程也不相同。1978至1979年，知青返城形成大规模潮流；安徽的下乡知青也通过招工、招生、征兵、病困退等途径分批离开农村。沈蕙兰下放前已经大学毕业并任教，不属于典型的城市中学毕业知青；她重返学校更接近受冲击教师与知识分子恢复工作。两条变化发生在相近的历史转折中，但制度路径不同。具体返校年份属于人物设定。[1][2]</p>
          <p class="context-en context-body-en">After 1976, earlier political judgments were reviewed and schools began to rebuild. Rehabilitation and the return of sent-down youth happened unevenly. The return gathered pace in 1978 and 1979; in Anhui, people left the countryside through job placements, education, military service, and hardship provisions. Shen Huilan had already graduated from university and taught before she was sent down, so she is not a typical urban school leaver. Her return belongs more closely to the reinstatement of teachers and intellectuals. The two shifts overlapped but followed different paths. Her exact return date is fictional.[1][2]</p>
        </section>
        <section class="epilogue-context-section">
          <h3>${renderContextChineseLabel("古典文学重新回到课堂")}<small>Classical Literature Returns to the Classroom</small></h3>
          <p class="context-body-zh">文革期间，学校教育中断，语文课高度政治化，古典文学教学受到严重压缩。不同地区和年份的教材并不完全一致，不能笼统说所有古文都被统一禁止。1978年以后，全国教材体系重建；1979年的中学语文教材已经增加中国古典诗文。《孔雀东南飞》和屈原作品后来成为中学语文常见篇目。蕙兰后来每年讲这些作品。这写的是她回到课堂后的日常，不指向某一册真实教材。[3][4]</p>
          <p class="context-en context-body-en">During the Cultural Revolution, schooling was disrupted, Chinese classes became heavily politicized, and classical literature was sharply reduced. Textbooks still varied by place and year, so it would be inaccurate to say every classical text was uniformly banned. A national curriculum was rebuilt after 1978, and the 1979 Chinese textbooks included more classical poetry and prose. <i>The Peacock Flies Southeast</i> and works by Qu Yuan later became familiar school texts. Huilan teaches them each year after returning to the classroom. This describes her daily work, not one documented textbook edition.[3][4]</p>
        </section>
        <section class="epilogue-context-section">
          <h3>${renderContextChineseLabel("君子兰与她的名字")}<small>Clivia and Her Name</small></h3>
          <p class="context-body-zh">君子兰原产非洲南部，植物学上不属于兰科。它的中文名取“君子”之意，常让人联想到端正、克制与高洁；传统兰花在中国文化中也长期与君子品格相连。对沈蕙兰而言，这份退休礼物还有一层私人联系：“兰”是她名字的最后一个字。[5][6]</p>
          <p class="context-en context-body-en">Clivia comes from southern Africa and is not a true orchid. Its Chinese name invokes the <i>junzi</i>, a person of cultivated character, while orchids have long carried similar associations in Chinese culture. The retirement gift is also personal: <i>lan</i>, meaning orchid, is the final character of Shen Huilan's name.[5][6]</p>
        </section>
      </div>
      <details class="context-section">
        <summary>${renderContextChineseLabel("参考资料")} <span>References</span></summary>
        <ol class="epilogue-context-sources">
          <li><a href="https://dag.tsinghua.edu.cn/info/1066/2801.htm" target="_blank" rel="noopener noreferrer">[1] 清华大学档案馆：1978年教育领域的拨乱反正</a></li>
          <li><a href="https://www.tsyzm.cn/CN/Y2014/V1/I11/95" target="_blank" rel="noopener noreferrer">[2] 金大陆：《知青下乡与返城：凸显历史的转折》</a></li>
          <li><a href="https://www.pep.com.cn/products/zhytu/jylltsh/201906/t20190614_1939191.shtml" target="_blank" rel="noopener noreferrer">[3] 人民教育出版社：《新中国中小学教材建设史：中学语文卷》</a></li>
          <li><a href="https://www.edu.cn/edu/ji_chu/zong_he/xue_fa/yu_wen/200603/t20060323_19842.shtml" target="_blank" rel="noopener noreferrer">[4] 《解放后中学语文教学的变迁》</a></li>
          <li><a href="https://www.wbg.cas.cn/KPPJ/zrjy/hbsjt/201208/t20120818_3629500.html" target="_blank" rel="noopener noreferrer">[5] 中国科学院武汉植物园：君子兰的来源与命名</a></li>
          <li><a href="https://yllhj.beijing.gov.cn/ztxx/bjhx/hhzs/201901/t20190107_118655.shtml" target="_blank" rel="noopener noreferrer">[6] 北京市园林绿化局：兰花与中国文化</a></li>
        </ol>
      </details>`;
    buildTraditionalContextBodies();
    updateContextChineseLabels();
    return;
  }
  const context = CONTEXTS[target];
  const referenceItems = (context.references || []).map(reference => {
    const captionZh = reference.captionZh || reference.caption || "";
    const captionEn = reference.captionEn || reference.caption || "";
    const image = `<img src="${reference.image}" alt="${reference.alt || captionZh || captionEn || "参考图片"}" loading="lazy">`;
    const media = reference.href
      ? `<a href="${reference.href}" target="_blank" rel="noopener noreferrer">${image}</a>`
      : image;
    return `<figure class="context-reference">${media}<figcaption><span class="context-body-zh">${captionZh}</span><span class="context-en context-body-en">${captionEn}</span>${reference.source ? `<small>${reference.source}</small>` : ""}</figcaption></figure>`;
  }).join("");
  const contextSources = (context.sources || []).length ? `
    <ul class="context-sources">
      ${(context.sources || []).map(source => `<li><a href="${source.href}" target="_blank" rel="noopener noreferrer"><span class="context-body-zh">${source.zh}</span><span class="context-en context-body-en">${source.en}</span></a></li>`).join("")}
    </ul>` : "";
  const hotspotImage = hotspot?.image ? `<figure class="context-reference"><img src="${hotspot.image}" alt="${hotspot.zh}">${hotspot.source ? `<figcaption><small>${hotspot.source}</small></figcaption>` : ""}</figure>` : "";
  const hotspotSource = hotspot?.source && !hotspot?.image ? `<p class="hotspot-source">图片来源 · ${hotspot.sourceUrl ? `<a href="${hotspot.sourceUrl}" target="_blank" rel="noopener noreferrer">${hotspot.source}</a>` : hotspot.source}</p>` : "";
  const hotspotReading = hotspot?.learnMoreZh ? `
    <div class="hotspot-reading">
      <div class="hotspot-reading-zh context-body-zh">${renderLayeredReading(hotspot.learnMoreZh, "zh")}</div>
      ${hotspot.learnMoreEn ? `<div class="context-en hotspot-reading-en context-body-en">${renderLayeredReading(hotspot.learnMoreEn, "en")}</div>` : ""}
    </div>` : "";
  const hotspotGallery = renderReferenceGallery(hotspot);
  const hotspotNoteEn = hotspot?.noteEn ? `<p class="context-en context-body-en">${hotspot.noteEn}</p>` : "";
  const hotspotAnchor = hotspot?.anchorZh && !hotspot?.learnMoreZh?.includes("与沈蕙兰的关系｜") ? `
    <blockquote class="context-anchor context-body-zh">${hotspot.anchorZh}</blockquote>
    ${hotspot.anchorEn ? `<blockquote class="context-anchor context-en context-body-en">${hotspot.anchorEn}</blockquote>` : ""}` : "";
  const hotspotReferences = `${hotspotImage}${hotspotGallery}${hotspotSource}`;
  const hasReferences = Boolean(hotspotReferences || referenceItems || contextSources);
  const chapterContext = hotspot?.hideChapterContext ? "" : `
    ${hotspot ? "" : `<div class="context-primary">
      ${renderContextParagraphs(context.zh, "context-body-zh")}
      ${renderContextParagraphs(context.en, "context-en context-body-en")}
    </div>`}
    ${hasReferences ? `<details class="context-section">
      <summary>${renderContextChineseLabel("参考图片")} <span>References</span></summary>
      ${hotspotReferences}${referenceItems}${contextSources}
    </details>` : ""}
    <details class="context-section">
      <summary>${renderContextChineseLabel("小说原文阅读")} <span>Read the novel</span></summary>
      ${context.novelZh ? `<blockquote class="context-body-zh">${context.novelZh}</blockquote><p class="context-en context-body-en">${context.novelEn || ""}</p>` : `<p class="context-empty context-body-zh">本章小说原文尚未导入。</p><p class="context-empty context-body-en">Novel excerpt not yet added.</p>`}
    </details>`;
  contextContent.innerHTML = `
    <h2>${renderContextChineseLabel(hotspot ? hotspot.zh : context.title)}</h2>
    <p class="context-title-en">${hotspot ? hotspot.en : context.titleEn}</p>
    ${hotspot ? `<p class="context-body-zh">${hotspot.note}</p>${hotspotNoteEn}${hotspotReading}${hotspotAnchor}<hr class="context-rule">` : ""}
    ${chapterContext}`;
  buildTraditionalContextBodies();
  updateContextChineseLabels();
  bindReferenceGallery(hotspot);
}

function setContextLanguage(language) {
  const nextLanguage = ["zh-hans", "zh-hant", "en"].includes(language) ? language : "zh-hans";
  contextPanel.dataset.language = nextLanguage;
  contextLanguageButtons.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.contextLanguage === nextLanguage));
  });
  updateContextChineseLabels();
  updateContextLocaleChrome();
}

function openContext(target = chapterIndex, hotspot = null) {
  if (!hotspot && !hasChapterSidebar(target)) return;
  renderContext(target, hotspot);
  contextPanel.classList.add("is-open");
  contextPanel.setAttribute("aria-hidden", "false");
  contextToggle.setAttribute("aria-expanded", "true");
}

function closeContext() {
  contextPanel.classList.remove("is-open");
  contextPanel.setAttribute("aria-hidden", "true");
  contextToggle.setAttribute("aria-expanded", "false");
}

function isChapter6ImageMode() {
  return chapterIndex === CHAPTER_6_INDEX && phase === "image";
}

function clearChapter6Timers() {
  if (chapter6GlanceTimer) clearTimeout(chapter6GlanceTimer);
  if (chapter6HintTimer) clearTimeout(chapter6HintTimer);
  if (chapter6PassiveCloseTimer) clearTimeout(chapter6PassiveCloseTimer);
  if (chapter6SpotlightFrame) cancelAnimationFrame(chapter6SpotlightFrame);
  chapter6SequenceWaits.forEach((resolve, timer) => {
    clearTimeout(timer);
    resolve(false);
  });
  chapter6SequenceWaits.clear();
  chapter6GlanceTimer = null;
  chapter6HintTimer = null;
  chapter6PassiveCloseTimer = null;
  chapter6SpotlightFrame = null;
}

function waitForChapter6Sequence(duration, runId) {
  const actualDuration = prefersReducedMotion()
    ? Math.max(500, Math.min(duration, 1200))
    : duration;
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      chapter6SequenceWaits.delete(timer);
      resolve(runId === chapter6GlanceRun && isChapter6ImageMode());
    }, actualDuration);
    chapter6SequenceWaits.set(timer, resolve);
  });
}

function hideAudioHint() {
  audioHint.classList.remove("is-visible");
  audioHint.setAttribute("aria-hidden", "true");
}

function showAudioHint(message, duration = 2600) {
  audioHint.innerHTML = `<p>${message}</p>`;
  audioHint.classList.add("is-visible");
  audioHint.setAttribute("aria-hidden", "false");
  if (chapter6HintTimer) clearTimeout(chapter6HintTimer);
  chapter6HintTimer = setTimeout(hideAudioHint, duration);
}

function hideMemoryThought() {
  memoryThought.className = "memory-thought";
  memoryThought.innerHTML = "";
  memoryThought.setAttribute("aria-hidden", "true");
}

function showMemoryThought(zh, en, interactive = false) {
  memoryThought.className = `memory-thought is-center${interactive ? " is-interactive" : ""}`;
  memoryThought.innerHTML = `
    <div class="memory-thought-inner">
      <p class="memory-thought-zh" lang="zh-CN">${zh}</p>
      <p class="memory-thought-en" lang="en">${en}</p>
    </div>`;
  memoryThought.classList.remove("is-leaving");
  memoryThought.classList.add("is-visible");
  memoryThought.setAttribute("aria-hidden", "false");
}

function beginMemoryThoughtExit() {
  memoryThought.classList.add("is-leaving");
}

function setMemoryFocusCue(cue, { animate = true, duration } = {}) {
  const transitionDuration = duration
    ?? (chapter6ActiveCueId ? CHAPTER_6_MEMORY_TIMING.cueFocus : CHAPTER_6_MEMORY_TIMING.openingFocus);
  const target = {
    x:cue.screenX,
    y:cue.screenY,
    radiusX:cue.screenRadiusX,
    radiusY:cue.screenRadiusY
  };
  const apply = state => {
    memoryVignette.style.setProperty("--glance-x", `${state.x}px`);
    memoryVignette.style.setProperty("--glance-y", `${state.y}px`);
    memoryVignette.style.setProperty("--glance-radius-x", `${state.radiusX}px`);
    memoryVignette.style.setProperty("--glance-radius-y", `${state.radiusY}px`);
  };

  if (chapter6SpotlightFrame) cancelAnimationFrame(chapter6SpotlightFrame);
  chapter6SpotlightFrame = null;
  if (!animate || !chapter6SpotlightState || prefersReducedMotion() || transitionDuration <= 0) {
    chapter6SpotlightState = target;
    apply(target);
    return;
  }

  const start = { ...chapter6SpotlightState };
  const startedAt = performance.now();
  const animateFrame = now => {
    const progress = Math.min(1, (now - startedAt) / transitionDuration);
    const eased = 1 - Math.pow(1 - progress, 3);
    chapter6SpotlightState = {
      x:start.x + (target.x - start.x) * eased,
      y:start.y + (target.y - start.y) * eased,
      radiusX:start.radiusX + (target.radiusX - start.radiusX) * eased,
      radiusY:start.radiusY + (target.radiusY - start.radiusY) * eased
    };
    apply(chapter6SpotlightState);
    if (progress < 1) chapter6SpotlightFrame = requestAnimationFrame(animateFrame);
    else chapter6SpotlightFrame = null;
  };
  chapter6SpotlightFrame = requestAnimationFrame(animateFrame);
}

function startChapter6CatMotion() {
  const visual = document.querySelector(`.chapter-visual[data-index="${CHAPTER_6_INDEX}"]`);
  const media = visual?.querySelector('.chapter-motion-layer[data-motion-id="ch6-cat-once"]');
  if (media && !media.dataset.motionUnavailable) playChapterMotion(media);
}

function closeChapter6Cue(cancelSequence = false) {
  if (cancelSequence) {
    chapter6GlanceRun += 1;
    clearChapter6Timers();
  }
  chapter6ActiveCueId = null;
  chapter6SpotlightState = null;
  delete memoryLayer.dataset.previewCue;
  memoryLayer.style.setProperty("--glance-transition-duration", `${CHAPTER_6_MEMORY_TIMING.thoughtExit}ms`);
  memoryLayer.classList.remove("is-frozen", "is-previewing");
  memoryCuesEl.querySelectorAll(".memory-cue").forEach(button => button.classList.remove("is-active"));
  hideMemoryThought();
  if (chapter6PassiveCloseTimer) clearTimeout(chapter6PassiveCloseTimer);
  chapter6PassiveCloseTimer = null;
}

function dismissChapter6Cue() {
  if (!chapter6ActiveCueId && !memoryLayer.classList.contains("is-previewing")) return;
  chapter6CueDismissedAt = performance.now();
  closeChapter6Cue(true);
}

function cancelChapter6Glance(reason = "interrupt") {
  chapter6GlanceRun += 1;
  clearChapter6Timers();
  memoryLayer.style.setProperty("--glance-transition-duration", `${CHAPTER_6_MEMORY_TIMING.thoughtExit}ms`);
  if (reason !== "complete") {
    memoryLayer.classList.remove("is-glancing", "is-previewing");
    app.classList.add("is-memory-cues-ready");
    hideMemoryThought();
  }
}

async function playChapter6Thought(cue, runId, timing) {
  if (!await waitForChapter6Sequence(timing.focus, runId)) return false;
  showMemoryThought(cue.thoughtZh, cue.thoughtEn, timing.interactive);
  if (!await waitForChapter6Sequence(timing.enter, runId)) return false;
  if (timing.persist) return true;
  if (!await waitForChapter6Sequence(timing.hold, runId)) return false;
  beginMemoryThoughtExit();
  if (!await waitForChapter6Sequence(timing.exit ?? CHAPTER_6_MEMORY_TIMING.thoughtExit, runId)) return false;
  hideMemoryThought();
  return true;
}

async function openChapter6Cue(cueId) {
  const cue = CHAPTER_6_MEMORY_CUES.find(item => item.id === cueId);
  if (!cue || !isChapter6ImageMode() || !chapter6Visited.has("opening-glance-complete")) return;
  const previousCueId = chapter6ActiveCueId;
  const previewCueId = memoryLayer.dataset.previewCue;
  const needsReset = Boolean(
    (previousCueId && previousCueId !== cueId)
    || (previewCueId && previewCueId !== cueId)
  );
  const remainingDismissFade = Math.max(
    0,
    CHAPTER_6_MEMORY_TIMING.cueReset - (performance.now() - chapter6CueDismissedAt)
  );
  if (previousCueId === cueId) return;
  cancelChapter6Glance("cue");
  closeChapter6Cue();
  const runId = chapter6GlanceRun;
  const resetDuration = needsReset ? CHAPTER_6_MEMORY_TIMING.cueReset : remainingDismissFade;
  if (resetDuration > 0 && !await waitForChapter6Sequence(resetDuration, runId)) return;
  chapter6ActiveCueId = cueId;
  chapter6CueDismissedAt = Number.NEGATIVE_INFINITY;
  if (cue.id === "cat") startChapter6CatMotion();
  setMemoryFocusCue(cue, { animate:false });
  memoryLayer.classList.add("is-frozen");
  const button = memoryCuesEl.querySelector(`[data-memory-cue="${cueId}"]`);
  button?.classList.add("is-active");
  playChapter6Thought(
    cue,
    runId,
    {
      focus:CHAPTER_6_MEMORY_TIMING.cueFocus,
      enter:CHAPTER_6_MEMORY_TIMING.cueThoughtEnter,
      persist:true,
      interactive:true
    }
  );
}

async function runChapter6OpeningGlance() {
  if (!isChapter6ImageMode()) return;
  if (chapter6Visited.has("opening-glance-complete")) {
    app.classList.add("is-memory-cues-ready");
    return;
  }
  chapter6Visited.add("opening-glance");
  chapter6GlanceRun += 1;
  const runId = chapter6GlanceRun;
  const cues = [...CHAPTER_6_MEMORY_CUES].sort((a, b) => a.order - b.order);

  if (!await waitForChapter6Sequence(CHAPTER_6_MEMORY_TIMING.initialStill, runId)) return;
  memoryLayer.classList.add("is-glancing");
  for (let index = 0; index < cues.length; index += 1) {
    if (runId !== chapter6GlanceRun || !isChapter6ImageMode()) return;
    const cue = cues[index];
    if (index === 0) {
      memoryLayer.classList.add("is-opening");
      memoryLayer.style.setProperty("--opening-focus-duration", `${CHAPTER_6_MEMORY_TIMING.openingFocus}ms`);
      setMemoryFocusCue(cue);
    }
    hideMemoryThought();
    const completed = await playChapter6Thought(
      cue,
      runId,
      {
        focus:index === 0 ? CHAPTER_6_MEMORY_TIMING.openingFocus : 0,
        enter:CHAPTER_6_MEMORY_TIMING.openingThoughtEnter,
        hold:CHAPTER_6_MEMORY_TIMING.openingThoughtHold,
        exit:CHAPTER_6_MEMORY_TIMING.openingThoughtExit
      }
    );
    if (!completed) return;
    if (index === 0) {
      memoryLayer.classList.remove("is-opening");
      memoryLayer.style.removeProperty("--opening-focus-duration");
    }
    if (index < cues.length - 1) {
      const nextCue = cues[index + 1];
      if (nextCue.id === "cat") startChapter6CatMotion();
      setMemoryFocusCue(nextCue);
      if (!await waitForChapter6Sequence(CHAPTER_6_MEMORY_TIMING.betweenMemories, runId)) return;
    }
  }

  chapter6Visited.add("opening-glance-complete");
  app.classList.add("is-memory-cues-ready");
  cancelChapter6Glance("complete");
  memoryLayer.classList.remove("is-glancing");
  hideMemoryThought();
}

function renderChapter6MemoryCues() {
  memoryCuesEl.innerHTML = "";
  CHAPTER_6_MEMORY_CUES.forEach(cue => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "memory-cue";
    button.dataset.memoryCue = cue.id;
    button.setAttribute("aria-label", `${cue.thoughtZh} / ${cue.thoughtEn}`);
    button.addEventListener("click", event => {
      event.stopPropagation();
      if (!chapter6Visited.has("opening-glance-complete")) return;
      openChapter6Cue(cue.id);
    });
    const activateCue = () => {
      if (!chapter6Visited.has("opening-glance-complete")) return;
      if (memoryLayer.classList.contains("is-glancing")) return;
      openChapter6Cue(cue.id);
    };
    const dismissCue = () => {
      if (chapter6ActiveCueId === cue.id) dismissChapter6Cue();
    };
    button.addEventListener("pointerenter", activateCue);
    button.addEventListener("pointerleave", dismissCue);
    button.addEventListener("focus", activateCue);
    button.addEventListener("blur", dismissCue);
    memoryCuesEl.appendChild(button);
  });
  positionChapter6MemoryCues();
}

function teardownChapter6Memory() {
  clearChapter6Timers();
  chapter6ActiveCueId = null;
  memoryLayer.className = "memory-layer";
  memoryVignette.style.removeProperty("--glance-x");
  memoryVignette.style.removeProperty("--glance-y");
  memoryVignette.style.removeProperty("--glance-radius-x");
  memoryVignette.style.removeProperty("--glance-radius-y");
  chapter6SpotlightState = null;
  chapter6CueDismissedAt = Number.NEGATIVE_INFINITY;
  memoryLayer.setAttribute("aria-hidden", "true");
  memoryCuesEl.innerHTML = "";
  hideMemoryThought();
  hideAudioHint();
  app.classList.remove("is-memory-active", "is-memory-cues-ready");
}

// ============================================================
// 第六章环境声：
// 主管线走 Web Audio decodeAudioData → AudioBufferSourceNode，loop 起止点裁掉编码器
// 首尾的 priming padding，实现 sample-accurate 无缝循环。
// 仅当 fetch/decode 失败（如本地 file:// 协议下的 CORS 限制）时，退化为 <audio> 元素
// + 手动提前跳回的近似方案（无法处理头部 padding，效果弱于主管线，仅供本地预览兜底）。
// 两条管线共用同一个 GainNode，音量渐变 / reveal / 退出淡出等上层逻辑无需区分管线。
// ============================================================
function ensureChapter6AudioContext() {
  if (chapter6AudioContext) return chapter6AudioContext;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  chapter6AudioContext = new AudioContextClass();
  chapter6AmbientGainNode = chapter6AudioContext.createGain();
  chapter6AmbientGainNode.gain.value = 0;
  chapter6AmbientGainNode.connect(chapter6AudioContext.destination);
  // 第五章开门音效的独立 GainNode，共用同一个 AudioContext 但音量与 Ch6 环境声互不干扰。
  doorSoundGainNode = chapter6AudioContext.createGain();
  doorSoundGainNode.gain.value = CHAPTER_5_DOOR_SOUND.volume;
  doorSoundGainNode.connect(chapter6AudioContext.destination);
  // 第四章环境声的独立 GainNode，共用同一个 AudioContext。
  chapter4AmbientGainNode = chapter6AudioContext.createGain();
  chapter4AmbientGainNode.gain.value = 0;
  chapter4AmbientGainNode.connect(chapter6AudioContext.destination);
  return chapter6AudioContext;
}

// --- 主管线：decodeAudioData → AudioBufferSourceNode ---

function loadChapter6AmbientBuffer() {
  if (chapter6AmbientBuffer) return Promise.resolve(chapter6AmbientBuffer);
  if (chapter6AmbientBufferPromise) return chapter6AmbientBufferPromise;
  const context = ensureChapter6AudioContext();
  if (!context) return Promise.resolve(null);
  // file:// 下 fetch() 被浏览器按 CORS 规则整体禁用；这里让 fetch 直接抛错走向 catch，
  // 由调用方回退到 <audio> 元素管线，而不是让整页报错。
  const probe = new Audio();
  const canPlayM4a = probe.canPlayType("audio/mp4; codecs=mp4a.40.2");
  const src = canPlayM4a ? CHAPTER_6_SOUND.srcM4a : CHAPTER_6_SOUND.srcOgg;
  chapter6AmbientBufferPromise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
      return response.arrayBuffer();
    })
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(buffer => {
      chapter6AmbientBuffer = buffer;
      return buffer;
    })
    .catch(fetchError => {
      console.warn("[ch6-sound] decodeAudioData pipeline unavailable, falling back to <audio> element:", fetchError);
      chapter6AmbientUseFallbackElement = true;
      return null;
    });
  return chapter6AmbientBufferPromise;
}

function stopChapter6AmbientBufferSource() {
  if (!chapter6AmbientBufferSource) return;
  try { chapter6AmbientBufferSource.onended = null; chapter6AmbientBufferSource.stop(); } catch (_) {}
  chapter6AmbientBufferSource = null;
}

// AudioBufferSourceNode 一次性播放对象，不能暂停/复用；每次「开始播放」都新建节点。
// loop 起止点裁掉 CHAPTER_6_SOUND.loopStartSeconds / loopEndTrimSeconds 对应的首尾 padding。
function startChapter6AmbientBufferSource(buffer) {
  const context = ensureChapter6AudioContext();
  if (!context || !buffer || !chapter6AmbientGainNode) return false;
  stopChapter6AmbientBufferSource();
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const loopStart = Math.max(0, Math.min(buffer.duration, CHAPTER_6_SOUND.loopStartSeconds || 0));
  const loopEnd = Math.max(loopStart, buffer.duration - Math.max(0, CHAPTER_6_SOUND.loopEndTrimSeconds || 0));
  source.loopStart = loopStart;
  source.loopEnd = loopEnd;
  source.connect(chapter6AmbientGainNode);
  source.start(0, loopStart);
  chapter6AmbientBufferSource = source;
  return true;
}

// --- Fallback 管线：<audio> 元素（file:// 本地预览，或 decode 失败时兜底） ---

function ensureChapter6AmbientElement() {
  if (chapter6AmbientAudioEl) return chapter6AmbientAudioEl;
  const context = ensureChapter6AudioContext();
  if (!context) { console.warn("[ch6-sound] AudioContext unavailable"); return null; }
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false;
  audio.crossOrigin = "anonymous";
  const canPlayM4a = audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
  audio.src = canPlayM4a ? CHAPTER_6_SOUND.srcM4a : CHAPTER_6_SOUND.srcOgg;
  audio.addEventListener("error", () => {
    if (audio.dataset.fallbackTried) {
      console.warn("[ch6-sound] could not load ambient audio (both sources failed)");
      return;
    }
    audio.dataset.fallbackTried = "1";
    const fallbackSrc = audio.src.includes(encodeURI(CHAPTER_6_SOUND.srcM4a).split("/").pop())
      ? CHAPTER_6_SOUND.srcOgg
      : CHAPTER_6_SOUND.srcM4a;
    console.warn("[ch6-sound] primary source failed, falling back to:", fallbackSrc);
    audio.src = fallbackSrc;
    audio.load();
  });
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    if (audio.currentTime >= audio.duration - CHAPTER_6_SOUND.loopTailSeconds) audio.currentTime = 0;
  });
  audio.addEventListener("ended", () => {
    if (!chapter6AmbientGainNode) return;
    try { audio.currentTime = 0; } catch (_) {}
    audio.play().catch(() => {});
  });
  const source = context.createMediaElementSource(audio);
  source.connect(chapter6AmbientGainNode);
  chapter6AmbientSourceNode = source;
  chapter6AmbientAudioEl = audio;
  return audio;
}

function startChapter6AmbientFallbackElement() {
  const context = ensureChapter6AudioContext();
  const audio = ensureChapter6AmbientElement();
  if (!context || !audio) return;
  audio.currentTime = 0;
  audio.play()?.catch(playbackError => console.warn("[ch6-sound] play() failed:", playbackError));
}

// ============================================================
// 第四章环境声（ch4-hum）：实现方式与 Ch6 完全一致（decodeAudioData →
// AudioBufferSourceNode，sample-accurate 无缝循环，<audio> 元素兜底）。
// 与 Ch6 的区别：没有滚动驱动的渐强，只有「先导文静音 → 画面出现即满音量淡入」
// 与「离开章节淡出」两个状态，逻辑更简单。
// ============================================================
function loadChapter4AmbientBuffer() {
  if (chapter4AmbientBuffer) return Promise.resolve(chapter4AmbientBuffer);
  if (chapter4AmbientBufferPromise) return chapter4AmbientBufferPromise;
  const context = ensureChapter6AudioContext();
  if (!context) return Promise.resolve(null);
  const probe = new Audio();
  const canPlayM4a = probe.canPlayType("audio/mp4; codecs=mp4a.40.2");
  const src = canPlayM4a ? CHAPTER_4_SOUND.srcM4a : CHAPTER_4_SOUND.srcOgg;
  chapter4AmbientBufferPromise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
      return response.arrayBuffer();
    })
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(buffer => {
      chapter4AmbientBuffer = buffer;
      return buffer;
    })
    .catch(fetchError => {
      console.warn("[ch4-sound] decodeAudioData pipeline unavailable, falling back to <audio> element:", fetchError);
      chapter4AmbientUseFallbackElement = true;
      return null;
    });
  return chapter4AmbientBufferPromise;
}

function stopChapter4AmbientBufferSource() {
  if (!chapter4AmbientBufferSource) return;
  try { chapter4AmbientBufferSource.onended = null; chapter4AmbientBufferSource.stop(); } catch (_) {}
  chapter4AmbientBufferSource = null;
}

function startChapter4AmbientBufferSource(buffer) {
  const context = ensureChapter6AudioContext();
  if (!context || !buffer || !chapter4AmbientGainNode) return false;
  stopChapter4AmbientBufferSource();
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const loopStart = Math.max(0, Math.min(buffer.duration, CHAPTER_4_SOUND.loopStartSeconds || 0));
  const loopEnd = Math.max(loopStart, buffer.duration - Math.max(0, CHAPTER_4_SOUND.loopEndTrimSeconds || 0));
  source.loopStart = loopStart;
  source.loopEnd = loopEnd;
  source.connect(chapter4AmbientGainNode);
  source.start(0, loopStart);
  chapter4AmbientBufferSource = source;
  return true;
}

function ensureChapter4AmbientElement() {
  if (chapter4AmbientAudioEl) return chapter4AmbientAudioEl;
  const context = ensureChapter6AudioContext();
  if (!context) { console.warn("[ch4-sound] AudioContext unavailable"); return null; }
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false;
  audio.crossOrigin = "anonymous";
  const canPlayM4a = audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
  audio.src = canPlayM4a ? CHAPTER_4_SOUND.srcM4a : CHAPTER_4_SOUND.srcOgg;
  audio.addEventListener("error", () => {
    if (audio.dataset.fallbackTried) {
      console.warn("[ch4-sound] could not load ambient audio (both sources failed)");
      return;
    }
    audio.dataset.fallbackTried = "1";
    const fallbackSrc = audio.src.includes(encodeURI(CHAPTER_4_SOUND.srcM4a).split("/").pop())
      ? CHAPTER_4_SOUND.srcOgg
      : CHAPTER_4_SOUND.srcM4a;
    console.warn("[ch4-sound] primary source failed, falling back to:", fallbackSrc);
    audio.src = fallbackSrc;
    audio.load();
  });
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    if (audio.currentTime >= audio.duration - CHAPTER_4_SOUND.loopTailSeconds) audio.currentTime = 0;
  });
  audio.addEventListener("ended", () => {
    if (!chapter4AmbientGainNode) return;
    try { audio.currentTime = 0; } catch (_) {}
    audio.play().catch(() => {});
  });
  const source = context.createMediaElementSource(audio);
  source.connect(chapter4AmbientGainNode);
  chapter4AmbientAudioEl = audio;
  return audio;
}

function startChapter4AmbientFallbackElement() {
  const context = ensureChapter6AudioContext();
  const audio = ensureChapter4AmbientElement();
  if (!context || !audio) return;
  audio.currentTime = 0;
  audio.play()?.catch(playbackError => console.warn("[ch4-sound] play() failed:", playbackError));
}

function startChapter4AmbientSource() {
  if (chapter4AmbientUseFallbackElement) {
    startChapter4AmbientFallbackElement();
    return;
  }
  loadChapter4AmbientBuffer().then(buffer => {
    if (buffer) {
      if (!startChapter4AmbientBufferSource(buffer)) startChapter4AmbientFallbackElement();
    } else {
      startChapter4AmbientFallbackElement();
    }
  });
}

function stopChapter4AmbientSource() {
  stopChapter4AmbientBufferSource();
  if (chapter4AmbientAudioEl) chapter4AmbientAudioEl.pause();
}

function isChapter4AmbientSourcePlaying() {
  return Boolean(chapter4AmbientBufferSource) || (chapter4AmbientAudioEl && !chapter4AmbientAudioEl.paused);
}

function cancelChapter4AmbientFade() {
  if (chapter4AmbientFadeFrame) cancelAnimationFrame(chapter4AmbientFadeFrame);
  chapter4AmbientFadeFrame = null;
}

function setChapter4AmbientGain(value) {
  if (chapter4AmbientGainNode) chapter4AmbientGainNode.gain.value = value;
}

function getChapter4AmbientGain() {
  return chapter4AmbientGainNode ? chapter4AmbientGainNode.gain.value : 0;
}

function fadeChapter4Ambient(targetVolume, duration) {
  if (!chapter4AmbientGainNode) return;
  cancelChapter4AmbientFade();
  const clampedTarget = Math.max(0, Math.min(1, targetVolume));
  if (!soundEnabled) {
    setChapter4AmbientGain(0);
    stopChapter4AmbientSource();
    return;
  }
  if (duration <= 0 || prefersReducedMotion()) {
    setChapter4AmbientGain(clampedTarget);
    return;
  }
  const startVolume = getChapter4AmbientGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter4AmbientGain(startVolume + (clampedTarget - startVolume) * progress);
    if (progress < 1) chapter4AmbientFadeFrame = requestAnimationFrame(step);
    else chapter4AmbientFadeFrame = null;
  };
  chapter4AmbientFadeFrame = requestAnimationFrame(step);
}

function ensureChapter4AmbientPlaying() {
  if (!soundEnabled) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  if (isChapter4AmbientSourcePlaying()) return;
  startChapter4AmbientSource();
}

// 由 showImage() 在第四章画面（大字报/毛像 motion）出现的一刻调用：先导文阶段始终静音，
// 淡入到满音量，纯粹「图 + 声」，不随先导文滚动渐强。
function revealChapter4Ambient() {
  if (chapterIndex !== CHAPTER_4_INDEX) return;
  chapter4AmbientRevealed = true;
  if (!soundEnabled) { setChapter4AmbientGain(0); return; }
  ensureChapter4AmbientPlaying();
  fadeChapter4Ambient(CHAPTER_4_SOUND.revealVolume, CHAPTER_4_SOUND.revealFadeDuration);
}

// 离开第四章（跳转其他章节、时间线）时调用：淡出并停止。
function stopChapter4Ambient() {
  if (!chapter4AmbientGainNode) return;
  chapter4AmbientRevealed = false;
  if (!soundEnabled || prefersReducedMotion()) {
    cancelChapter4AmbientFade();
    setChapter4AmbientGain(0);
    stopChapter4AmbientSource();
    return;
  }
  cancelChapter4AmbientFade();
  const duration = CHAPTER_4_SOUND.exitFadeDuration;
  const startVolume = getChapter4AmbientGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter4AmbientGain(startVolume * (1 - progress));
    if (progress < 1) chapter4AmbientFadeFrame = requestAnimationFrame(step);
    else {
      chapter4AmbientFadeFrame = null;
      stopChapter4AmbientSource();
    }
  };
  chapter4AmbientFadeFrame = requestAnimationFrame(step);
}

// 用户在静音状态下打开「声音」开关，且当前正处于第四章：音频从头播放并淡入。
function unmuteChapter4AmbientIfActive() {
  if (chapterIndex !== CHAPTER_4_INDEX) return;
  cancelChapter4AmbientFade();
  setChapter4AmbientGain(0);
  const target = chapter4AmbientRevealed ? CHAPTER_4_SOUND.revealVolume : 0;
  if (target <= 0) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  startChapter4AmbientSource();
  fadeChapter4Ambient(target, CHAPTER_4_SOUND.unmuteFadeDuration);
}

// ============================================================
// 第五章开门音效：单次播放，不循环。
// 与 Ch6 环境声共用同一个 AudioContext，走相同的 decodeAudioData → AudioBufferSourceNode
// 主管线，fetch/decode 失败时回退到 <audio> 元素。音量由独立的 doorSoundGainNode 控制，
// 见 CHAPTER_5_DOOR_SOUND.volume（后期调音量改那里即可）。
// ============================================================
function loadDoorSoundBuffer() {
  if (doorSoundBuffer) return Promise.resolve(doorSoundBuffer);
  if (doorSoundBufferPromise) return doorSoundBufferPromise;
  const context = ensureChapter6AudioContext();
  if (!context) return Promise.resolve(null);
  const probe = new Audio();
  const canPlayM4a = probe.canPlayType("audio/mp4; codecs=mp4a.40.2");
  const src = canPlayM4a ? CHAPTER_5_DOOR_SOUND.srcM4a : CHAPTER_5_DOOR_SOUND.srcOgg;
  doorSoundBufferPromise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
      return response.arrayBuffer();
    })
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(buffer => {
      doorSoundBuffer = buffer;
      return buffer;
    })
    .catch(fetchError => {
      console.warn("[ch5-door-sound] decodeAudioData pipeline unavailable, falling back to <audio> element:", fetchError);
      doorSoundUseFallbackElement = true;
      return null;
    });
  return doorSoundBufferPromise;
}

function playDoorSoundBuffer(buffer) {
  const context = ensureChapter6AudioContext();
  if (!context || !buffer || !doorSoundGainNode) return false;
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = false; // 单次播放，不重复
  source.connect(doorSoundGainNode);
  source.start(0);
  return true;
}

function ensureDoorSoundElement() {
  if (doorSoundAudioEl) return doorSoundAudioEl;
  const context = ensureChapter6AudioContext();
  if (!context) { console.warn("[ch5-door-sound] AudioContext unavailable"); return null; }
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false; // 单次播放，不重复
  audio.crossOrigin = "anonymous";
  const canPlayM4a = audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
  audio.src = canPlayM4a ? CHAPTER_5_DOOR_SOUND.srcM4a : CHAPTER_5_DOOR_SOUND.srcOgg;
  audio.addEventListener("error", () => {
    if (audio.dataset.fallbackTried) {
      console.warn("[ch5-door-sound] could not load door sound (both sources failed)");
      return;
    }
    audio.dataset.fallbackTried = "1";
    const fallbackSrc = audio.src.includes(encodeURI(CHAPTER_5_DOOR_SOUND.srcM4a).split("/").pop())
      ? CHAPTER_5_DOOR_SOUND.srcOgg
      : CHAPTER_5_DOOR_SOUND.srcM4a;
    console.warn("[ch5-door-sound] primary source failed, falling back to:", fallbackSrc);
    audio.src = fallbackSrc;
    audio.load();
  });
  const source = context.createMediaElementSource(audio);
  source.connect(doorSoundGainNode);
  doorSoundAudioEl = audio;
  return audio;
}

function playDoorSoundFallbackElement() {
  const context = ensureChapter6AudioContext();
  const audio = ensureDoorSoundElement();
  if (!context || !audio) return;
  audio.currentTime = 0;
  audio.play()?.catch(playbackError => console.warn("[ch5-door-sound] play() failed:", playbackError));
}

// 统一入口：优先主管线（AudioBufferSourceNode，单次播放），回退兜底 <audio> 元素。
// 若声音已被静音（soundEnabled === false）则不播放。
function playDoorOpenSound() {
  if (!soundEnabled) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  if (doorSoundUseFallbackElement) {
    playDoorSoundFallbackElement();
    return;
  }
  loadDoorSoundBuffer().then(buffer => {
    if (buffer) {
      if (!playDoorSoundBuffer(buffer)) playDoorSoundFallbackElement();
    } else {
      playDoorSoundFallbackElement();
    }
  });
}

// --- 统一入口：优先主管线，回退兜底管线 ---

// 异步：decodeAudioData 需要等待网络/解码完成，因此调用方不应假设播放是同步开始的
// （淡入的 GainNode 自动化不受影响，因为它只依赖 chapter6AmbientGainNode，与音源无关）。
function startChapter6AmbientSource() {
  if (chapter6AmbientUseFallbackElement) {
    startChapter6AmbientFallbackElement();
    return;
  }
  loadChapter6AmbientBuffer().then(buffer => {
    if (buffer) {
      if (!startChapter6AmbientBufferSource(buffer)) startChapter6AmbientFallbackElement();
    } else {
      startChapter6AmbientFallbackElement();
    }
  });
}

function stopChapter6AmbientSource() {
  stopChapter6AmbientBufferSource();
  if (chapter6AmbientAudioEl) chapter6AmbientAudioEl.pause();
}

function isChapter6AmbientSourcePlaying() {
  return Boolean(chapter6AmbientBufferSource) || (chapter6AmbientAudioEl && !chapter6AmbientAudioEl.paused);
}

function cancelChapter6AmbientFade() {
  if (chapter6AmbientFadeFrame) cancelAnimationFrame(chapter6AmbientFadeFrame);
  chapter6AmbientFadeFrame = null;
}

function setChapter6AmbientGain(value) {
  if (chapter6AmbientGainNode) chapter6AmbientGainNode.gain.value = value;
}

function getChapter6AmbientGain() {
  return chapter6AmbientGainNode ? chapter6AmbientGainNode.gain.value : 0;
}

function fadeChapter6Ambient(targetVolume, duration) {
  if (!chapter6AmbientGainNode) return;
  cancelChapter6AmbientFade();
  const clampedTarget = Math.max(0, Math.min(1, targetVolume));
  if (!soundEnabled) {
    setChapter6AmbientGain(0);
    stopChapter6AmbientSource();
    return;
  }
  if (duration <= 0 || prefersReducedMotion()) {
    setChapter6AmbientGain(clampedTarget);
    return;
  }
  const startVolume = getChapter6AmbientGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter6AmbientGain(startVolume + (clampedTarget - startVolume) * progress);
    if (progress < 1) chapter6AmbientFadeFrame = requestAnimationFrame(step);
    else chapter6AmbientFadeFrame = null;
  };
  chapter6AmbientFadeFrame = requestAnimationFrame(step);
}

function ensureChapter6AmbientPlaying() {
  if (!soundEnabled) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  if (isChapter6AmbientSourcePlaying()) return;
  startChapter6AmbientSource();
}

// 由 paintTextPosition 在第六章文字阶段调用：先导文阶段始终保持静音，
// 环境声只在画面完全 reveal 后由 revealChapter6Ambient 触发（纯粹"图 + 声"，不随先导文滚动渐强）。
function updateChapter6AmbientForScroll(position) {
  if (chapterIndex !== CHAPTER_6_INDEX || phase !== "text") return;
  chapter6AmbientRevealed = false;
  chapter6AmbientTargetVolume = 0;
  cancelChapter6AmbientFade();
  setChapter6AmbientGain(0);
  stopChapter6AmbientSource();
}

// 由 showImage() 在第六章画面完全 reveal 后调用：从当前音量淡入到满音量。
function revealChapter6Ambient() {
  if (chapterIndex !== CHAPTER_6_INDEX) return;
  chapter6AmbientRevealed = true;
  chapter6AmbientTargetVolume = CHAPTER_6_SOUND.revealVolume;
  if (!soundEnabled) { setChapter6AmbientGain(0); return; }
  ensureChapter6AmbientPlaying();
  fadeChapter6Ambient(CHAPTER_6_SOUND.revealVolume, CHAPTER_6_SOUND.revealFadeDuration);
}

// 离开第六章（跳转跋、其他章节、时间线）时调用：淡出并停止。
function stopChapter6Ambient() {
  if (!chapter6AmbientGainNode) return;
  chapter6AmbientRevealed = false;
  chapter6AmbientTargetVolume = 0;
  if (!soundEnabled || prefersReducedMotion()) {
    cancelChapter6AmbientFade();
    setChapter6AmbientGain(0);
    stopChapter6AmbientSource();
    return;
  }
  cancelChapter6AmbientFade();
  const duration = CHAPTER_6_SOUND.exitFadeDuration;
  const startVolume = getChapter6AmbientGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter6AmbientGain(startVolume * (1 - progress));
    if (progress < 1) chapter6AmbientFadeFrame = requestAnimationFrame(step);
    else {
      chapter6AmbientFadeFrame = null;
      stopChapter6AmbientSource();
    }
  };
  chapter6AmbientFadeFrame = requestAnimationFrame(step);
}

// 用户在静音状态下打开「声音」开关，且当前正处于第六章：
// 音频从头播放，音量在 unmuteFadeDuration 内淡入到当前应有目标音量。
function unmuteChapter6AmbientIfActive() {
  if (chapterIndex !== CHAPTER_6_INDEX) return;
  cancelChapter6AmbientFade();
  setChapter6AmbientGain(0);
  // 先导文阶段没有声音；只有画面已完全 reveal 时才恢复播放。
  const target = chapter6AmbientRevealed ? CHAPTER_6_SOUND.revealVolume : 0;
  chapter6AmbientTargetVolume = target;
  if (target <= 0) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  // 音频始终从头（loop 起点）重新播放，与之前是否已在后台播放无关。
  startChapter6AmbientSource();
  fadeChapter6Ambient(target, CHAPTER_6_SOUND.unmuteFadeDuration);
}

function updateSoundToggle() {
  document.documentElement.dataset.sound = soundEnabled ? "on" : "off";
  soundToggle?.setAttribute("aria-checked", String(soundEnabled));
  soundToggle?.setAttribute("aria-label", soundEnabled ? "关闭声音" : "打开声音");
  if (soundModeLabel) soundModeLabel.textContent = soundEnabled ? SOUND_UI.buttonLabelOn : SOUND_UI.buttonLabelOff;
}

function unlockSound() {
  soundUnlocked = true;
  updateSoundToggle();
}

// 进入第六章的路径不止一种（门、timeline、方向键、滚轮……），无法只锚定某一个手势。
// 因此改为监听页面上第一次出现的任意真实用户手势（点击/触摸/按键/滚轮），
// 在那一刻创建并 resume AudioContext——不管用户最终从哪条路径到达第六章，届时都已就绪。
let chapter6AudioContextUnlockAttached = false;
function unlockChapter6AudioContextOnFirstGesture() {
  const context = ensureChapter6AudioContext();
  if (context?.state === "suspended") context.resume().catch(() => {});
  // 提前触发 fetch + decode，避免用户实际到达对应章节、按下 reveal/开门时才第一次解码造成延迟。
  // 若解码失败，各自的 loadXxxBuffer 会把对应的 UseFallbackElement 置 true，
  // 后续 startXxxSource 自然会走 <audio> 元素兜底，这里无需额外分支。
  // 第五章开门音效尤其关键：它是单次点击触发的一次性播放，若不提前解码，
  // fetch + decodeAudioData 的延迟会让音效明显晚于开门动效（无法像环境声那样靠淡入掩盖）。
  if (soundEnabled) {
    loadChapter6AmbientBuffer();
    loadChapter4AmbientBuffer();
    loadDoorSoundBuffer();
  }
}
function attachChapter6AudioContextUnlock() {
  if (chapter6AudioContextUnlockAttached) return;
  chapter6AudioContextUnlockAttached = true;
  const events = ["pointerdown", "keydown", "wheel", "touchstart"];
  const handler = () => {
    unlockChapter6AudioContextOnFirstGesture();
    events.forEach(type => document.removeEventListener(type, handler));
  };
  events.forEach(type => document.addEventListener(type, handler, { passive:true }));
}

function toggleSound() {
  soundUnlocked = true;
  soundEnabled = !soundEnabled;
  updateSoundToggle();
  if (soundEnabled) {
    // AudioContext 必须在真实用户手势的调用栈内创建/resume，
    // 否则浏览器会把它留在 suspended 状态——即便之后在第六章调用 resume() 也常常无效。
    // 因此这里无条件执行，不依赖当前是否已经在第六章。
    const context = ensureChapter6AudioContext();
    if (context?.state === "suspended") context.resume().catch(() => {});
    loadChapter6AmbientBuffer();
    unmuteChapter6AmbientIfActive();
    loadChapter4AmbientBuffer();
    unmuteChapter4AmbientIfActive();
    loadDoorSoundBuffer();
  } else {
    cancelChapter6AmbientFade();
    setChapter6AmbientGain(0);
    stopChapter6AmbientSource();
    cancelChapter4AmbientFade();
    setChapter4AmbientGain(0);
    stopChapter4AmbientSource();
  }
}

function getHotspotSourcePoint(hotspot, image) {
  if (Number.isFinite(hotspot.xPx) && Number.isFinite(hotspot.yPx)) {
    return { x:hotspot.xPx, y:hotspot.yPx };
  }
  return {
    x:(hotspot.x / 100) * image.naturalWidth,
    y:(hotspot.y / 100) * image.naturalHeight
  };
}

function positionChapter6MemoryCues() {
  if (!memoryCuesEl?.children.length || chapterIndex !== CHAPTER_6_INDEX) return;
  const visual = document.querySelector(`.chapter-visual[data-index="${chapterIndex}"]`);
  const image = visual?.querySelector(".chapter-bg-composite") || visual?.querySelector(".chapter-bg-base");
  if (!image || !image.naturalWidth || !image.naturalHeight) return;
  const containerWidth = memoryCuesEl.clientWidth;
  const containerHeight = memoryCuesEl.clientHeight;
  if (!containerWidth || !containerHeight) return;
  const scale = Math.max(
    containerWidth / image.naturalWidth,
    containerHeight / image.naturalHeight
  );
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  const cropOffsetX = (containerWidth - renderedWidth) / 2;
  const cropOffsetY = (containerHeight - renderedHeight) / 2;

  memoryCuesEl.querySelectorAll(".memory-cue").forEach(button => {
    const cue = CHAPTER_6_MEMORY_CUES.find(item => item.id === button.dataset.memoryCue);
    if (!cue) return;
    const screenX = cropOffsetX + cue.xPx * scale;
    const screenY = cropOffsetY + cue.yPx * scale;
    const width = cue.widthPx * scale * CHAPTER_6_CUE_HIT_SCALE;
    const height = cue.heightPx * scale * CHAPTER_6_CUE_HIT_SCALE;
    const minRadius = Math.min(containerWidth, containerHeight) * 0.09;
    const maxRadius = Math.min(containerWidth, containerHeight) * 0.38;
    const radiusX = Math.min(Math.max((cue.radiusXPx ?? cue.radiusPx) * scale, minRadius), maxRadius);
    const radiusY = Math.min(Math.max((cue.radiusYPx ?? cue.radiusPx) * scale, minRadius), maxRadius);
    cue.screenX = screenX;
    cue.screenY = screenY;
    cue.screenRadiusX = radiusX;
    cue.screenRadiusY = radiusY;
    button.style.left = `${screenX}px`;
    button.style.top = `${screenY}px`;
    button.style.setProperty("--cue-width", `${width}px`);
    button.style.setProperty("--cue-height", `${height}px`);
  });
}

function positionHotspots() {
  const visual = document.querySelector(`.chapter-visual[data-index="${chapterIndex}"]`);
  const image = visual?.querySelector(".chapter-bg-composite") || visual?.querySelector(".chapter-bg-base");
  if (!image || !image.naturalWidth || !image.naturalHeight) {
    if (image && !image.dataset.hotspotLoadPending) {
      image.dataset.hotspotLoadPending = "true";
      image.addEventListener("load", () => {
        delete image.dataset.hotspotLoadPending;
        positionHotspots();
      }, { once:true });
    }
    return;
  }
  positionChapter6MemoryCues();

  const containerWidth = hotspotsEl.clientWidth;
  const containerHeight = hotspotsEl.clientHeight;
  if (!containerWidth || !containerHeight) return;
  const scale = Math.max(
    containerWidth / image.naturalWidth,
    containerHeight / image.naturalHeight
  );
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  const cropOffsetX = (containerWidth - renderedWidth) / 2;
  const cropOffsetY = (containerHeight - renderedHeight) / 2;

  hotspotsEl.querySelectorAll(".hotspot").forEach(button => {
    const hotspot = HOTSPOTS[chapterIndex][Number(button.dataset.hotspotIndex)];
    if (!hotspot) return;
    const source = getHotspotSourcePoint(hotspot, image);
    const screenX = cropOffsetX + source.x * scale;
    const screenY = cropOffsetY + source.y * scale;
    const isVisible = screenX >= 0 && screenX <= containerWidth && screenY >= 0 && screenY <= containerHeight;
    button.style.left = `${screenX}px`;
    button.style.top = `${screenY}px`;
    button.style.visibility = isVisible ? "visible" : "hidden";
    button.tabIndex = isVisible ? 0 : -1;
  });

  const doorTrigger = hotspotsEl.querySelector(".door-trigger");
  if (doorTrigger) {
    const door = MOTION_SETTINGS.doorTransition;
    const sourceX = image.naturalWidth * door.x / 100;
    const sourceY = image.naturalHeight * door.y / 100;
    const screenX = cropOffsetX + sourceX * scale;
    const screenY = cropOffsetY + sourceY * scale;
    const triggerWidth = image.naturalWidth * door.width / 100 * scale;
    const triggerHeight = image.naturalHeight * door.height / 100 * scale;
    const isVisible = screenX + triggerWidth / 2 >= 0
      && screenX - triggerWidth / 2 <= containerWidth
      && screenY + triggerHeight / 2 >= 0
      && screenY - triggerHeight / 2 <= containerHeight;
    doorTrigger.style.left = `${screenX}px`;
    doorTrigger.style.top = `${screenY}px`;
    doorTrigger.style.width = `${triggerWidth}px`;
    doorTrigger.style.height = `${triggerHeight}px`;
    doorTrigger.style.visibility = isVisible ? "visible" : "hidden";
    doorTrigger.tabIndex = isVisible ? 0 : -1;
  }
}

function renderHotspots() {
  if (chapterIndex === CHAPTER_6_INDEX) {
    hotspotsEl.innerHTML = "";
    return;
  }
  hotspotsEl.innerHTML = "";
  HOTSPOTS[chapterIndex].forEach((hotspot, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hotspot";
    if (hotspot.variant) button.classList.add(`hotspot--${hotspot.variant}`);
    button.dataset.hotspotIndex = String(index);
    if (hotspot.id) button.dataset.hotspotId = hotspot.id;
    button.setAttribute("aria-label", `${hotspot.zh} — ${hotspot.en}`);
    button.addEventListener("mouseenter", () => showTooltip(button, hotspot));
    button.addEventListener("mouseleave", hideTooltip);
    button.addEventListener("focus", () => showTooltip(button, hotspot));
    button.addEventListener("blur", hideTooltip);
    button.addEventListener("click", () => {
      hideTooltip();
      openContext(hotspot.term || chapterIndex, hotspot.term ? null : hotspot);
    });
    button.style.animationDelay = `${index * .38}s`;
    hotspotsEl.appendChild(button);
  });
  if (chapterIndex === MOTION_SETTINGS.doorTransition.chapterIndex) {
    const doorTrigger = document.createElement("button");
    doorTrigger.type = "button";
    doorTrigger.className = "door-trigger";
    doorTrigger.setAttribute("aria-label", "打开门 / Open the door");
    doorTrigger.innerHTML = `<svg class="door-trigger-assistive" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle class="door-trigger-pulse" cx="24" cy="24" r="18"/>
      <circle class="door-trigger-ring" cx="24" cy="24" r="11"/>
      <circle class="door-trigger-core" cx="24" cy="24" r="7.5"/>
    </svg>`;
    doorTrigger.addEventListener("click", openDoorTransition);
    hotspotsEl.appendChild(doorTrigger);
  }
  positionHotspots();
  requestAnimationFrame(positionHotspots);
}

// 保留旧的“粒子填满屏幕”实验代码供参数回看，但不再调用，避免高负载与双 wave。
function animateDoorWashDenseLegacy(originX, originY) {
  const settings = MOTION_SETTINGS.doorTransition;
  const width = app.clientWidth;
  const height = app.clientHeight;
  const pixelRatio = Math.min(settings.maxPixelRatio, window.devicePixelRatio || 1);
  doorWashCanvas.width = Math.round(width * pixelRatio);
  doorWashCanvas.height = Math.round(height * pixelRatio);
  const context = doorWashCanvas.getContext("2d");
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const maxDistance = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(width - originX, originY),
    Math.hypot(originX, height - originY),
    Math.hypot(width - originX, height - originY)
  );
  const particleCount = Math.round(Math.max(settings.particleCountMin,
    Math.min(settings.particleCountMax, width * height / settings.particleDensityDivisor)));
  const particles = Array.from({ length:particleCount }, (_, index) => {
    // 越靠近中心分布越密，中心的白色完全来自粒子的相互叠加。
    const radialSeed = Math.pow(Math.random(), settings.particleCenterBias);
    const arm = index % settings.spiralArms;
    const depth = Math.pow(Math.random(), 1.7);
    const brightStar = Math.random() < settings.particleBrightFraction;
    return {
      radialSeed,
      angle:arm / settings.spiralArms * Math.PI * 2
        + radialSeed * settings.spiralTurns * Math.PI * 2
        + (Math.random() - .5) * settings.spiralJitter,
      // 一小批粒子立即从门内涌出，其余粒子贯穿整段持续补生。
      birth:index < particleCount * .08 ? 0 : Math.min(settings.particleBirthSpan,
        Math.pow(Math.random(), 1.75) * settings.particleBirthSpan
          * (.75 + radialSeed * .25)),
      depth,
      speed:.44 + depth * .62 + Math.random() * .22,
      directionOffset:(Math.random() - .5) * .82,
      drift:(Math.random() - .5) * (.22 + depth * .48),
      radius:(settings.particleRadiusMin
        + depth * (settings.particleRadiusMax - settings.particleRadiusMin))
        * (brightStar ? 1.15 : 1),
      alpha:brightStar ? .92 : settings.particleAlphaMin
        + depth * (settings.particleAlphaMax - settings.particleAlphaMin)
    };
  });

  // 预先生成一层微粒填充场。每个低分辨率像素都是一颗最终会补齐白场的小粒子，
  // 按照与门的距离、螺旋扰动和随机值分批出现，不使用半透明白色蒙版。
  const fillResolution = settings.particleFillResolution;
  const fillWidth = Math.ceil(width / fillResolution);
  const fillHeight = Math.ceil(height / fillResolution);
  const fillPixelCount = fillWidth * fillHeight;
  const fillCanvas = document.createElement("canvas");
  fillCanvas.width = fillWidth;
  fillCanvas.height = fillHeight;
  const fillContext = fillCanvas.getContext("2d");
  const fillBucketByPixel = new Uint8Array(fillPixelCount);
  const fillDepthLayerByPixel = new Uint8Array(fillPixelCount);
  const fillBrightByPixel = new Uint8Array(fillPixelCount);
  const fillBucketCounts = new Uint32Array(settings.particleFillBuckets);
  const scoreMaximum = 1 + settings.particleFillRandomness * 1.15;
  for (let pixelIndex = 0; pixelIndex < fillPixelCount; pixelIndex += 1) {
    const x = pixelIndex % fillWidth * fillResolution;
    const y = Math.floor(pixelIndex / fillWidth) * fillResolution;
    const dx = x - originX;
    const dy = y - originY;
    const radial = Math.min(1, Math.hypot(dx, dy) / maxDistance);
    const angle = Math.atan2(dy, dx);
    const spiral = (Math.sin(angle * settings.spiralArms
      - radial * settings.spiralTurns * Math.PI * 2) + 1) * .5;
    const score = Math.min(1, (radial
      + Math.random() * settings.particleFillRandomness
      + spiral * settings.particleFillRandomness * .15) / scoreMaximum);
    const bucket = Math.min(settings.particleFillBuckets - 1,
      Math.floor(score * settings.particleFillBuckets));
    const depth = Math.pow(Math.random(), settings.particleFillDepthPower);
    const depthLayer = Math.min(settings.particleFillDepthLayers - 1,
      Math.floor(depth * settings.particleFillDepthLayers));
    const brightStar = Math.random() < settings.particleFillBrightFraction;
    fillBucketByPixel[pixelIndex] = bucket;
    fillDepthLayerByPixel[pixelIndex] = depthLayer;
    fillBrightByPixel[pixelIndex] = brightStar ? 1 : 0;
    fillBucketCounts[bucket] += 1;
  }
  const fillBucketOffsets = new Uint32Array(settings.particleFillBuckets + 1);
  for (let bucket = 0; bucket < settings.particleFillBuckets; bucket += 1) {
    fillBucketOffsets[bucket + 1] = fillBucketOffsets[bucket] + fillBucketCounts[bucket];
  }
  const fillBucketCursor = fillBucketOffsets.slice(0, settings.particleFillBuckets);
  const fillOrderedPixels = new Uint32Array(fillPixelCount);
  for (let pixelIndex = 0; pixelIndex < fillPixelCount; pixelIndex += 1) {
    const bucket = fillBucketByPixel[pixelIndex];
    fillOrderedPixels[fillBucketCursor[bucket]] = pixelIndex;
    fillBucketCursor[bucket] += 1;
  }
  let lastFilledBucket = -1;
  const startedAt = performance.now();
  doorWash.classList.remove("is-releasing");
  doorWash.classList.add("is-active");

  return new Promise(resolve => {
    const draw = now => {
      const progress = Math.min(1, (now - startedAt) / settings.washDuration);
      const eased = applyMotionEasing(settings.washEasing, progress);
      const coverProgress = Math.max(0,
        Math.min(1, (progress - settings.particleCoverStart) / (1 - settings.particleCoverStart)));
      const coverScale = 1 + (settings.particleCoverScale - 1)
        * coverProgress;
      context.clearRect(0, 0, width, height);

      // 微粒从门向外逐批补齐；最后一批出现时，白屏本身已经由粒子填满。
      const fillProgress = Math.max(0,
        Math.min(1, (progress - settings.particleFillStart) / (1 - settings.particleFillStart)));
      const targetFillBucket = Math.min(settings.particleFillBuckets - 1,
        Math.floor(fillProgress * settings.particleFillBuckets));
      const revealPaths = Array.from({ length:settings.particleFillDepthLayers }, () => new Path2D());
      const revealBrightPaths = Array.from({ length:settings.particleFillDepthLayers }, () => new Path2D());
      const revealCounts = new Uint32Array(settings.particleFillDepthLayers);
      const revealBrightCounts = new Uint32Array(settings.particleFillDepthLayers);
      if (targetFillBucket > lastFilledBucket) {
        for (let bucket = lastFilledBucket + 1; bucket <= targetFillBucket; bucket += 1) {
          const start = fillBucketOffsets[bucket];
          const end = fillBucketOffsets[bucket + 1];
          for (let orderedIndex = start; orderedIndex < end; orderedIndex += 1) {
            const sourcePixelIndex = fillOrderedPixels[orderedIndex];
            const layerIndex = fillDepthLayerByPixel[sourcePixelIndex];
            const depth = (layerIndex + 1) / settings.particleFillDepthLayers;
            const hashX = ((sourcePixelIndex * 1664525 + 1013904223) >>> 0) / 4294967296;
            const hashY = ((sourcePixelIndex * 22695477 + 1) >>> 0) / 4294967296;
            const x = sourcePixelIndex % fillWidth + .5 + (hashX - .5) * .46;
            const y = Math.floor(sourcePixelIndex / fillWidth) + .5 + (hashY - .5) * .46;
            const radius = (.58 + depth * .14) * (fillBrightByPixel[sourcePixelIndex] ? 1.08 : 1);
            const path = fillBrightByPixel[sourcePixelIndex]
              ? revealBrightPaths[layerIndex] : revealPaths[layerIndex];
            path.moveTo(x + radius, y);
            path.arc(x, y, radius, 0, Math.PI * 2);
            if (fillBrightByPixel[sourcePixelIndex]) revealBrightCounts[layerIndex] += 1;
            else revealCounts[layerIndex] += 1;
          }
        }
        lastFilledBucket = targetFillBucket;
      }
      fillContext.fillStyle = "#fff";
      revealPaths.forEach((path, layerIndex) => {
        const depth = (layerIndex + 1) / settings.particleFillDepthLayers;
        if (revealCounts[layerIndex]) {
          fillContext.globalAlpha = .16 + depth * .64;
          fillContext.fill(path);
        }
        if (revealBrightCounts[layerIndex]) {
          fillContext.globalAlpha = .96;
          fillContext.fill(revealBrightPaths[layerIndex]);
        }
      });
      fillContext.globalAlpha = 1;
      context.globalAlpha = 1;
      context.imageSmoothingEnabled = true;
      context.drawImage(fillCanvas, 0, 0, width, height);

      // 将粒子归入少量透明度层后成批绘制，避免每颗 fill() 造成掉帧。
      const alphaLevels = [.06, .15, .3, .52, .9];
      const particlePaths = alphaLevels.map(() => new Path2D());
      const particleLayerCounts = alphaLevels.map(() => 0);
      particles.forEach(particle => {
        if (progress <= particle.birth) return;
        const life = Math.min(1, (progress - particle.birth) / Math.max(.001, 1 - particle.birth));
        const fadeIn = life * life * (3 - 2 * life);
        // 保持径向位移持续推进，避免 ease-out 过早减速后悬停等待。
        const travel = Math.min(1, life * particle.speed);
        const distance = maxDistance * settings.particleReach * particle.radialSeed
          * (.68 + particle.depth * .48) * (.012 + travel * .988);
        const angle = particle.angle
          + eased * settings.spiralRotation
          + particle.directionOffset * travel
          + life * particle.drift;
        const x = originX + Math.cos(angle) * distance;
        const y = originY + Math.sin(angle) * distance;
        const alpha = particle.alpha * fadeIn;
        const layerIndex = alpha < .1 ? 0
          : alpha < .22 ? 1
            : alpha < .4 ? 2
              : alpha < .7 ? 3 : 4;
        const radius = particle.radius * (.7 + fadeIn * .3) * coverScale;
        particlePaths[layerIndex].moveTo(x + radius, y);
        particlePaths[layerIndex].arc(x, y, radius, 0, Math.PI * 2);
        particleLayerCounts[layerIndex] += 1;
      });
      context.fillStyle = "#fff";
      particlePaths.forEach((path, layerIndex) => {
        if (!particleLayerCounts[layerIndex]) return;
        context.globalAlpha = alphaLevels[layerIndex];
        context.fill(path);
      });

      context.globalAlpha = 1;
      if (progress < 1) requestAnimationFrame(draw);
      else resolve();
    };
    requestAnimationFrame(draw);
  });
}

// 已停用的粒子版本；当前门转场只使用下方同心圆动画。
function animateDoorWashParticlesLegacy(originX, originY) {
  const settings = MOTION_SETTINGS.doorTransition;
  const width = app.clientWidth;
  const height = app.clientHeight;
  const pixelRatio = Math.min(settings.maxPixelRatio, window.devicePixelRatio || 1);
  doorWashCanvas.width = Math.round(width * pixelRatio);
  doorWashCanvas.height = Math.round(height * pixelRatio);
  const context = doorWashCanvas.getContext("2d");
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const maxDistance = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(width - originX, originY),
    Math.hypot(originX, height - originY),
    Math.hypot(width - originX, height - originY)
  );
  const particleCount = Math.round(Math.max(settings.particleCountMin,
    Math.min(settings.particleCountMax, width * height / settings.particleDensityDivisor)));
  const particles = Array.from({ length:particleCount }, (_, index) => {
    const radialSeed = Math.pow(Math.random(), settings.particleCenterBias);
    const depth = Math.pow(Math.random(), 1.7);
    const brightStar = Math.random() < settings.particleBrightFraction;
    return {
      radialSeed,
      depth,
      startAngle:Math.random() * Math.PI * 2,
      startRadiusRatio:settings.emissionStartRadiusMin
        + Math.pow(Math.random(), 2.4) * (settings.emissionStartRadiusMax
          - settings.emissionStartRadiusMin),
      endRadiusRatio:settings.emissionEndRadiusMin
        + Math.pow(Math.random(), .72) * (settings.emissionEndRadiusMax
          - settings.emissionEndRadiusMin),
      curve:(Math.random() - .5) * settings.emissionCurveMax * 2,
      pulsePhase:Math.random() * Math.PI * 2,
      pulseFrequency:1.15 + Math.random() * 1.45,
      pulseDistance:settings.emissionPulseMin
        + depth * (settings.emissionPulseMax - settings.emissionPulseMin),
      birth:index < particleCount * .1 ? 0 : Math.random() * settings.particleBirthSpan,
      travelDuration:.4 + (1 - depth) * .17 + Math.random() * .16,
      radius:(settings.particleRadiusMin
        + depth * (settings.particleRadiusMax - settings.particleRadiusMin))
        * (brightStar ? 1.15 : 1),
      alpha:brightStar ? .92 : settings.particleAlphaMin
        + depth * (settings.particleAlphaMax - settings.particleAlphaMin)
    };
  });
  const startedAt = performance.now();
  doorWash.classList.add("is-active");

  return new Promise(resolve => {
    const draw = now => {
      const progress = Math.min(1, (now - startedAt) / settings.washDuration);
      const whiteProgress = Math.max(0,
        Math.min(1, (progress - settings.whiteFadeStart) / (1 - settings.whiteFadeStart)));
      const whiteOpacity = applyMotionEasing(settings.whiteFadeEasing, whiteProgress);
      context.clearRect(0, 0, width, height);

      // 白色底层只做整体曝光，不产生独立的圆形边缘或第二个 wave。
      context.globalAlpha = whiteOpacity;
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);

      const alphaLevels = [.06, .15, .3, .52, .9];
      const particlePaths = alphaLevels.map(() => new Path2D());
      const particleLayerCounts = new Uint32Array(alphaLevels.length);
      particles.forEach(particle => {
        if (progress <= particle.birth) return;
        const age = progress - particle.birth;
        const fadeProgress = Math.min(1, age / settings.particleFadeInSpan);
        const fadeIn = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);
        const rawTravel = Math.min(1, age / particle.travelDuration);
        const travel = rawTravel * rawTravel * (3 - 2 * rawTravel);
        const pulseEnvelope = Math.sin(travel * Math.PI);
        const pulse = Math.sin(travel * Math.PI * 2 * particle.pulseFrequency
          + particle.pulsePhase);
        const distance = maxDistance * (particle.startRadiusRatio
          + (particle.endRadiusRatio - particle.startRadiusRatio) * travel)
          + pulse * particle.pulseDistance * pulseEnvelope;
        const angle = particle.startAngle
          + particle.curve * travel
          + pulse * settings.emissionPulseAngle * pulseEnvelope;
        const x = originX + Math.cos(angle) * distance;
        const y = originY + Math.sin(angle) * distance;
        const brightnessPulse = .76 + (pulse + 1) * .12;
        const alpha = particle.alpha * fadeIn * brightnessPulse;
        const layerIndex = alpha < .1 ? 0
          : alpha < .22 ? 1
            : alpha < .4 ? 2
              : alpha < .7 ? 3 : 4;
        const radius = particle.radius * (.82 + travel * 1.18);
        particlePaths[layerIndex].moveTo(x + radius, y);
        particlePaths[layerIndex].arc(x, y, radius, 0, Math.PI * 2);
        particleLayerCounts[layerIndex] += 1;
      });
      context.fillStyle = "#fff";
      particlePaths.forEach((path, layerIndex) => {
        if (!particleLayerCounts[layerIndex]) return;
        context.globalAlpha = alphaLevels[layerIndex] * (1 - whiteOpacity * .22);
        context.fill(path);
      });
      context.globalAlpha = 1;

      if (progress < 1) requestAnimationFrame(draw);
      else resolve();
    };
    requestAnimationFrame(draw);
  });
}

// 已停用的水波光晕版本；当前门转场使用下方性能优化的半透明同心圆。
function animateDoorWashGlowLegacy(originX, originY) {
  const settings = MOTION_SETTINGS.doorTransition;
  const width = app.clientWidth;
  const height = app.clientHeight;
  const pixelRatio = Math.min(settings.maxPixelRatio, window.devicePixelRatio || 1);
  doorWashCanvas.width = Math.round(width * pixelRatio);
  doorWashCanvas.height = Math.round(height * pixelRatio);
  const context = doorWashCanvas.getContext("2d");
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const maxDistance = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(width - originX, originY),
    Math.hypot(originX, height - originY),
    Math.hypot(width - originX, height - originY)
  );
  const zoomParticles = Array.from({ length:settings.zoomParticleCount }, () => ({
    angle:Math.random() * Math.PI * 2,
    seed:Math.random(),
    speed:settings.zoomParticleSpeedMin
      + Math.random() * (settings.zoomParticleSpeedMax - settings.zoomParticleSpeedMin),
    depth:Math.pow(Math.random(), 1.45)
  }));
  const startedAt = performance.now();
  doorWash.classList.add("is-active");

  return new Promise(resolve => {
    const draw = now => {
      const progress = Math.min(1, (now - startedAt) / settings.washDuration);
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      const eased = applyMotionEasing(settings.glowEasing, progress);
      const pulseEnvelope = Math.sin(progress * Math.PI);
      const pulse = 1 + Math.sin(progress * Math.PI * 2 * settings.glowPulseCycles)
        * settings.glowPulseAmplitude * pulseEnvelope;
      const radius = (settings.glowStartRadius
        + (maxDistance * settings.glowOverscan - settings.glowStartRadius) * eased) * pulse;
      const washProgress = Math.max(0,
        Math.min(1, (progress - settings.glowWashStart) / (1 - settings.glowWashStart)));
      const washOpacity = applyMotionEasing("easeInOutCubic", washProgress);

      // 后段整体曝光成白色；前段保持参考中的暗中心与宽阔柔焦光环。
      context.globalAlpha = washOpacity;
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);

      // 少量放射短光点从圆心加速冲向画面边缘，提供参考中的 zoom-through 纵深感。
      const zoomPaths = [new Path2D(), new Path2D(), new Path2D()];
      const zoomLayerCounts = new Uint16Array(3);
      zoomParticles.forEach(particle => {
        const phase = (particle.seed + progress * particle.speed * 1.35) % 1;
        const travel = Math.pow(phase, 1.75);
        const distance = maxDistance * 1.12 * travel;
        const length = (settings.zoomParticleLengthMin
          + (settings.zoomParticleLengthMax - settings.zoomParticleLengthMin)
            * phase * phase) * (.68 + particle.depth * .48);
        const directionX = Math.cos(particle.angle);
        const directionY = Math.sin(particle.angle);
        const endX = originX + directionX * distance;
        const endY = originY + directionY * distance;
        const startX = originX + directionX * Math.max(0, distance - length);
        const startY = originY + directionY * Math.max(0, distance - length);
        const layerIndex = Math.min(2, Math.floor(particle.depth * 3));
        zoomPaths[layerIndex].moveTo(startX, startY);
        zoomPaths[layerIndex].lineTo(endX, endY);
        zoomLayerCounts[layerIndex] += 1;
      });
      const zoomLayerAlpha = [.24, .48, .78];
      context.globalCompositeOperation = "screen";
      context.strokeStyle = "#fff";
      context.lineCap = "round";
      zoomPaths.forEach((path, layerIndex) => {
        if (!zoomLayerCounts[layerIndex]) return;
        const depth = (layerIndex + 1) / 3;
        context.lineWidth = settings.zoomParticleWidthMin
          + depth * (settings.zoomParticleWidthMax - settings.zoomParticleWidthMin);
        context.globalAlpha = settings.zoomParticleAlpha * zoomLayerAlpha[layerIndex]
          * Math.min(1, progress * 5) * (1 - washOpacity * .88);
        context.stroke(path);
      });

      const ringGradient = context.createRadialGradient(
        originX, originY, 0, originX, originY, radius
      );
      ringGradient.addColorStop(0, "rgba(255,255,255,.015)");
      ringGradient.addColorStop(settings.glowRingInner, "rgba(255,255,255,.045)");
      ringGradient.addColorStop(Math.max(settings.glowRingInner,
        settings.glowRingPeak - .15), "rgba(255,255,255,.32)");
      ringGradient.addColorStop(settings.glowRingPeak, "rgba(255,255,255,1)");
      ringGradient.addColorStop(settings.glowRingOuter, "rgba(255,255,255,.08)");
      ringGradient.addColorStop(1, "rgba(255,255,255,0)");
      context.globalCompositeOperation = "screen";
      context.globalAlpha = settings.glowRingAlpha * Math.min(1, progress * 4)
        * (1 - washOpacity * .45);
      context.fillStyle = ringGradient;
      const rippleTime = now * settings.rippleClockRate;
      const rippleAmplitude = Math.min(settings.rippleAmplitudeMax,
        radius * settings.rippleAmplitudeRatio) * (.4 + pulseEnvelope * .6);
      context.beginPath();
      for (let point = 0; point <= settings.ripplePointCount; point += 1) {
        const angle = point / settings.ripplePointCount * Math.PI * 2;
        const wave = (
          Math.sin(angle * settings.rippleFrequencyA + rippleTime)
          + Math.sin(angle * settings.rippleFrequencyB - rippleTime * .73) * .55
          + Math.sin(angle * settings.rippleFrequencyC + rippleTime * .41) * .3
        ) / 1.85;
        const edgeRadius = Math.max(1, radius + wave * rippleAmplitude);
        const x = originX + Math.cos(angle) * edgeRadius;
        const y = originY + Math.sin(angle) * edgeRadius;
        if (point === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.fill();

      // 只强调圆形外缘的水波震动，不绘制参考中的螺旋波浪或放射线。
      context.globalAlpha = settings.rippleStrokeAlpha * pulseEnvelope
        * (1 - washOpacity * .72);
      context.strokeStyle = "#fff";
      context.lineWidth = Math.max(1.1, radius * settings.rippleStrokeWidthRatio);
      context.stroke();

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      if (progress < 1) requestAnimationFrame(draw);
      else resolve();
    };
    requestAnimationFrame(draw);
  });
}

function animateDoorWash(originX, originY) {
  const settings = MOTION_SETTINGS.doorTransition;
  const duration = prefersReducedMotion() ? settings.reducedWashDuration : settings.washDuration;
  const width = app.clientWidth;
  const height = app.clientHeight;
  const pixelRatio = Math.min(settings.maxPixelRatio, window.devicePixelRatio || 1);
  doorWashCanvas.width = Math.round(width * pixelRatio);
  doorWashCanvas.height = Math.round(height * pixelRatio);
  const context = doorWashCanvas.getContext("2d");
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const maxDistance = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(width - originX, originY),
    Math.hypot(originX, height - originY),
    Math.hypot(width - originX, height - originY)
  );
  // 每层使用固定参数，只让相位缓慢变化；避免逐帧随机噪声造成抖动和额外计算。
  const blobProfiles = Array.from({ length:settings.blobCount }, (_, index) => ({
    frequency:index % 2 === 0 ? 3 : 4,
    detailFrequency:index % 3 === 0 ? 6 : 7,
    phase:index * 1.137,
    detailPhase:index * 2.071,
    direction:index % 2 === 0 ? 1 : -1
  }));
  const startedAt = performance.now();
  doorWash.classList.remove("is-releasing");
  doorWash.classList.add("is-active");

  return new Promise(resolve => {
    const draw = now => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const washRange = Math.max(.001, settings.blobWashComplete - settings.blobWashStart);
      const washProgress = Math.max(0,
        Math.min(1, (progress - settings.blobWashStart) / washRange));
      const washOpacity = applyMotionEasing("easeInOutCubic", washProgress);
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      let fullScreenAlpha = washOpacity;
      context.fillStyle = "#020203";
      for (let index = 0; index < settings.blobCount; index += 1) {
        const delay = index * settings.blobStagger;
        const localProgress = Math.max(0,
          Math.min(1, (progress - delay) / Math.max(.001, 1 - delay)));
        if (localProgress <= 0) continue;
        const eased = applyMotionEasing(settings.blobEasing, localProgress);
        const radius = settings.blobStartRadius
          + (maxDistance * settings.blobOverscan - settings.blobStartRadius) * eased;
        const alpha = settings.blobAlphaMin
          + index / Math.max(1, settings.blobCount - 1)
            * (settings.blobAlphaMax - settings.blobAlphaMin);
        const profile = blobProfiles[index];
        const motionPhase = progress * Math.PI * 2 * settings.blobMotionCycles
          * profile.direction;
        const rotation = progress * settings.blobRotation * profile.direction;
        const layerAlpha = alpha * Math.min(1, localProgress * 3.5)
          * (1 - washOpacity * .65);
        const minimumEdge = radius
          * (1 - settings.blobEdgeAmplitude - settings.blobEdgeDetail);

        // 边缘已经超出四角时，这一层视觉上等同于全屏黑色；合并透明度，
        // 不再绘制巨大的多边形，避免动效后段反复覆盖整张画布。
        if (minimumEdge >= maxDistance) {
          fullScreenAlpha = 1 - (1 - fullScreenAlpha) * (1 - layerAlpha);
          continue;
        }

        context.globalAlpha = layerAlpha;
        context.beginPath();
        for (let point = 0; point <= settings.blobPointCount; point += 1) {
          const angle = point / settings.blobPointCount * Math.PI * 2;
          const edge = 1
            + Math.sin(angle * profile.frequency + profile.phase + motionPhase)
              * settings.blobEdgeAmplitude
            + Math.sin(angle * profile.detailFrequency + profile.detailPhase - motionPhase * .63)
              * settings.blobEdgeDetail;
          const x = originX + Math.cos(angle + rotation) * radius * edge;
          const y = originY + Math.sin(angle + rotation) * radius * edge;
          if (point === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.fill();
      }

      // 所有已覆盖全屏的层和最终黑色 wash 只合成为一次绘制。
      context.globalAlpha = fullScreenAlpha;
      context.fillRect(0, 0, width, height);

      context.globalAlpha = 1;
      if (progress < 1) requestAnimationFrame(draw);
      else resolve();
    };
    requestAnimationFrame(draw);
  });
}

async function openDoorTransition(event) {
  const settings = MOTION_SETTINGS.doorTransition;
  if (busy || phase !== "image" || chapterIndex !== settings.chapterIndex) return;
  busy = true;
  unlockSound();
  hideTooltip();
  closeContext();

  const appRect = app.getBoundingClientRect();
  const triggerRect = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX || triggerRect.left + triggerRect.width / 2;
  const clickY = event.clientY || triggerRect.top + triggerRect.height / 2;
  const originX = clickX - appRect.left;
  const originY = clickY - appRect.top;
  event.currentTarget.disabled = true;
  event.currentTarget.classList.add("is-triggered");
  const visual = document.querySelector(`.chapter-visual[data-index="${chapterIndex}"]`);
  playDoorOpenSound(); // 开门音效：与门开动效同时触发，单次播放
  await playChapterMotionById(visual, settings.triggerMotionId, {
    required:true,
    resolveAt:settings.triggerVisibleProgress
  });
  app.classList.add("is-door-washing");

  await animateDoorWash(originX, originY);
  doorWash.classList.add("is-solid");
  await delay(settings.solidBlackHoldDuration);
  await enterChapter(settings.targetChapterIndex, 0);
  busy = true;
  doorWash.classList.add("is-releasing");
  await delay(prefersReducedMotion() ? 0 : 1350);
  doorWash.classList.remove("is-active", "is-releasing", "is-solid");
  doorWashCanvas.width = 1;
  doorWashCanvas.height = 1;
  busy = false;
}

function showTooltip(button, hotspot) {
  tooltip.innerHTML = `<strong>${hotspot.zh}</strong><span class="tooltip-translation">${hotspot.en}</span><p>${hotspot.note}</p>${hotspot.noteEn ? `<p class="tooltip-note-en">${hotspot.noteEn}</p>` : ""}<p class="tooltip-more">查看背景 / Learn more →</p>`;
  const experienceRect = experience.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  const x = buttonRect.left - experienceRect.left + buttonRect.width / 2;
  const y = buttonRect.top - experienceRect.top + buttonRect.height / 2;
  const tooltipWidth = Math.min(272, experienceRect.width * .72);
  tooltip.style.left = `${Math.max(12, Math.min(x + 18, experienceRect.width - tooltipWidth - 12))}px`;
  const tooltipHeight = tooltip.offsetHeight;
  const safeCenterY = Math.max(tooltipHeight / 2 + 12, Math.min(y, experienceRect.height - tooltipHeight / 2 - 12));
  tooltip.style.top = `${safeCenterY}px`;
  tooltip.classList.add("is-visible");
  tooltip.setAttribute("aria-hidden", "false");
}

function hideTooltip() {
  tooltip.classList.remove("is-visible");
  tooltip.setAttribute("aria-hidden", "true");
}

function handleKey(event) {
  if (event.key === "Escape" && chapter6ActiveCueId) {
    event.preventDefault();
    closeChapter6Cue(true);
    return;
  }
  if (event.key === "Escape" && contextPanel.classList.contains("is-open")) {
    event.preventDefault();
    closeContext();
    return;
  }
  if (startActive) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "Enter") {
      event.preventDefault();
      advanceStart();
    }
    return;
  }
  if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); goForwardDirect(); }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); goBackwardDirect(); }
}

function handleWheel(event) {
  const settings = MOTION_SETTINGS.narrativeText;
  if (startActive || epilogueActive || busy || contextPanel.contains(event.target) || Math.abs(event.deltaY) < settings.wheelThreshold) return;
  const now = Date.now();
  if (now - lastWheelAt < settings.wheelThrottle) return;
  lastWheelAt = now;
  event.preventDefault();
  event.deltaY > 0 ? goForward() : goBackward();
}

function handleNarrativePointerDown(event) {
  if (event.pointerType === "mouse" || startActive || busy || phase !== "text" || event.target.closest(".term-ref")) return;
  narrativePointerStart = { id:event.pointerId, x:event.clientX, y:event.clientY };
  narrative.setPointerCapture?.(event.pointerId);
}

function handleNarrativePointerUp(event) {
  if (!narrativePointerStart || narrativePointerStart.id !== event.pointerId) return;
  const deltaX = event.clientX - narrativePointerStart.x;
  const deltaY = event.clientY - narrativePointerStart.y;
  narrativePointerStart = null;
  if (Math.abs(deltaY) < 32 || Math.abs(deltaY) <= Math.abs(deltaX) * 1.15) return;
  event.preventDefault();
  deltaY < 0 ? goForward() : goBackward();
}

function cancelNarrativePointer() {
  narrativePointerStart = null;
}

function delay(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)); }
function isFullscreen() { return document.fullscreenElement || document.webkitFullscreenElement; }

function updateFullscreenState() {
  const active = !!isFullscreen();
  document.body.classList.toggle("is-fullscreen", active);
  fullscreenButtons.forEach(button => {
    button.setAttribute("aria-label", active ? "退出全屏" : "进入全屏观看");
    button.setAttribute("aria-pressed", String(active));
  });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    positionHotspots();
    positionChapterMotionPatches();
  }));
  updateRotateOverlay();
}

// 竖屏提示遮罩:只在真手机(is-small-device)+ 竖屏 + 还没进全屏时显示。
// 横屏、进入全屏、或不是手机,都会自动隐藏。
const rotateOverlay = document.getElementById("rotate-overlay");
function updateRotateOverlay() {
  if (!rotateOverlay) return;
  const isSmallDevice = document.documentElement.classList.contains("is-small-device");
  const isPortrait = window.matchMedia("(orientation:portrait)").matches;
  const shouldShow = isSmallDevice && isPortrait && !isFullscreen();
  rotateOverlay.classList.toggle("is-visible", shouldShow);
  rotateOverlay.setAttribute("aria-hidden", String(!shouldShow));
}
window.addEventListener("orientationchange", () => setTimeout(updateRotateOverlay, 80));
window.addEventListener("resize", updateRotateOverlay);
// 遮罩本身现在就是可点击的进入全屏入口(不再依赖点到它下面、被完全遮挡的角落按钮)。
rotateOverlay?.addEventListener("click", toggleFullscreen);

function getFontSizePreset(presetId = fontSizePreference) {
  return FONT_SIZE_PRESETS.find(preset => preset.id === presetId) || FONT_SIZE_PRESETS[0];
}

function applyFontSizePreference() {
  const preset = getFontSizePreset();
  document.documentElement.style.setProperty("--content-font-scale", String(preset.scale));
  document.documentElement.dataset.contentFontSize = preset.id;
  fontSizeToggle?.setAttribute("aria-label", preset.nextLabel);
  fontSizeToggle?.setAttribute("aria-checked", String(preset.id !== "standard"));
  if (fontSizeModeLabel) fontSizeModeLabel.textContent = preset.label;
  requestEpilogueSafetyLayout();
}

function cycleFontSizePreference() {
  const currentIndex = FONT_SIZE_PRESETS.findIndex(preset => preset.id === getFontSizePreset().id);
  const nextPreset = FONT_SIZE_PRESETS[(currentIndex + 1) % FONT_SIZE_PRESETS.length];
  fontSizePreference = nextPreset.id;
  try { localStorage.setItem("1970-font-size-preference", fontSizePreference); } catch (_) {}
  applyFontSizePreference();
}

function updateMotionState() {
  const reduced = prefersReducedMotion();
  const full = !reduced;
  document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  motionToggle?.setAttribute("aria-checked", String(full));
  motionToggle?.setAttribute("aria-label", reduced ? "开启动效" : "关闭动效");
  if (motionModeLabel) motionModeLabel.textContent = full ? "ON" : "OFF";
  if (reduced) stopIntroParticles();
  else if (startActive || epilogueActive) startIntroParticles();
  if (epilogueActive && reduced) fastForwardEpilogue();
}

function toggleMotionPreference() {
  motionPreference = prefersReducedMotion() ? "full" : "reduced";
  try { localStorage.setItem("1970-motion-preference", motionPreference); } catch (_) {}
  updateMotionState();
}

async function toggleFullscreen(event) {
  event.preventDefault();
  event.stopPropagation();
  try {
    if (isFullscreen()) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) await exit.call(document);
    } else {
      const enter = experience.requestFullscreen || experience.webkitRequestFullscreen;
      if (enter) await enter.call(experience);
    }
  } catch (error) {
    console.warn("Fullscreen could not be changed.", error);
  }
}

document.addEventListener("keydown", handleKey);
document.addEventListener("wheel", handleWheel, { passive:false });
narrative.addEventListener("pointerdown", handleNarrativePointerDown);
narrative.addEventListener("pointerup", handleNarrativePointerUp);
narrative.addEventListener("pointercancel", cancelNarrativePointer);
startScreen.addEventListener("pointermove", scatterIntroParticles);
startScreen.addEventListener("pointerleave", () => { introParticlePointer.active = false; });
epilogueScreen.addEventListener("pointermove", scatterIntroParticles);
epilogueScreen.addEventListener("pointerleave", () => { introParticlePointer.active = false; });
if (window.ResizeObserver) {
  new ResizeObserver(positionHotspots).observe(hotspotsEl);
  // experience 在进入／退出全屏时通过 CSS 过渡改变大小；window resize 不一定会触发。
  // 直接观察真实画布，保证裁切 patch 始终以完整底图的 cover 比例重新定位。
  new ResizeObserver(positionChapterMotionPatches).observe(experience);
}
window.addEventListener("resize", () => {
  positionHotspots();
  positionChapterMotionPatches();
  if (phase === "text" && chapterIndex === MOTION_SETTINGS.portalNeon.chapterIndex) {
    updateTextBackground(visualStep);
  }
  requestEpilogueSafetyLayout();
  if (!introParticleRunning) return;
  if (introParticleResizeTimer) clearTimeout(introParticleResizeTimer);
  introParticleResizeTimer = setTimeout(() => {
    if (introParticleRunning) resizeIntroParticles();
  }, MOTION_SETTINGS.introParticles.resizeDebounce);
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopIntroParticles();
  else if (startActive || epilogueActive) startIntroParticles();
});
reducedMotionQuery?.addEventListener?.("change", () => {
  if (motionPreference === "system") updateMotionState();
});
document.addEventListener("fullscreenchange", updateFullscreenState);
document.addEventListener("webkitfullscreenchange", updateFullscreenState);
document.addEventListener("click", event => {
  if (isChapter6ImageMode() && !event.target.closest(".memory-cue") && !event.target.closest("#sound-toggle")) {
    if (chapter6Visited.has("opening-glance-complete")) {
      if (chapter6ActiveCueId) dismissChapter6Cue();
      else cancelChapter6Glance("click");
    }
  }
  const termButton = event.target.closest(".term-ref");
  if (termButton) openContext(termButton.dataset.term);
});
fullscreenButtons.forEach(button => button.addEventListener("click", toggleFullscreen));
fontSizeToggle?.addEventListener("click", cycleFontSizePreference);
motionToggle?.addEventListener("click", toggleMotionPreference);
soundToggle?.addEventListener("click", toggleSound);
navButtonPrev.addEventListener("click", () => { if (!startActive) goBackwardDirect(); });
navButtonNext.addEventListener("click", () => { startActive ? advanceStart() : goForwardDirect(); });
contextToggle.addEventListener("click", () => {
  const target = startActive ? "start" : epilogueActive ? "epilogue" : chapterIndex;
  contextPanel.classList.contains("is-open") ? closeContext() : openContext(target);
});
contextClose.addEventListener("click", closeContext);
contextCollapse.addEventListener("click", closeContext);
contextLanguageButtons.forEach(button => button.addEventListener("click", () => setContextLanguage(button.dataset.contextLanguage)));
timelineStops.forEach(stop => stop.addEventListener("click", () => {
  cancelChapter6Glance("timeline");
  const scene = stop.dataset.scene;
  if (scene === "start") showStart();
  else {
    startTimers.forEach(clearTimeout);
    cancelStartAnimations();
    stopIntroParticles();
    startScreen.classList.add("is-hidden");
    startScreen.setAttribute("aria-hidden", "true");
    startActive = false;
    closeContext();
    if (scene === "epilogue") enterEpilogue();
    else enterChapter(Number(scene), 0);
  }
}));

applyFontSizePreference();
updateMotionState();
updateSoundToggle();
attachChapter6AudioContextUnlock();
updateFullscreenState();
updateRotateOverlay();
initBackgrounds();
initIntroParticles();
renderContext("start");
updateContextLocaleChrome();
updateNav();
startSequence();

// 手机控制栏展开/收起(collapse toggle)
if (controlsCollapseToggle && screenControls) {
  controlsCollapseToggle.addEventListener("click", () => {
    const expanded = screenControls.classList.toggle("is-expanded");
    controlsCollapseToggle.setAttribute("aria-expanded", String(expanded));
  });
}
