// ============================================================
// MOTION SETTINGS · 所有主要动效参数集中在这里
// 时间单位为 ms；比例通常使用 0–1；位置与遮罩使用百分比数值。
// ============================================================
const MOTION_SETTINGS = {
  // 首次观看默认开启完整动效；访客仍可用页面控制切换为 Reduced。
  // 保留 system 状态兼容旧偏好，展览设备也可用 forceFullMotion 强制完整动效。
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
    neighborOpacity:.38,
    unfocusedScale:.91,
    focusedScale:1,
    blurPerStepRem:.04,
    maxBlurRem:.3,
    zhBaseOpacity:.68,
    zhFocusGain:.32,
    enBaseOpacity:.5,
    enFocusGain:.3,
    activeThreshold:.02,
    neighborRange:1.02,
    wheelThreshold:12,
    wheelThrottle:800,
    idleHintDelay:4000
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

// 第一章 BGM（1-loop-bgm）：主管线与 Ch4/Ch6 相同（decodeAudioData → AudioBufferSourceNode），
// 但刻意不做首尾裁剪——素材本身已在轨道里手工做过淡出到低电平，循环时保留这段自然的
// 「接缝」（不追求 sample-accurate 无缝循环，与 Ch2/Ch4/Ch6 的处理方式相反，是有意为之）。
// 先导文阶段不出声；先导文切换到画面的一刻（showImage）开始播放。
const CHAPTER_1_SOUND = {
  srcOgg:"assets/sound/ch1-loop-bgm.ogg",
  srcM4a:"assets/sound/ch1-loop-bgm.m4a",
  revealVolume:1,
  revealFadeDuration:1800,
  exitFadeDuration:1200,
  unmuteFadeDuration:500,
  // 不裁剪首尾：素材自带的淡出低电平段落本身就是循环接缝，保留即可。
  loopStartSeconds:0,
  loopEndTrimSeconds:0,
  loopTailSeconds:0
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

// 第二章 BGM（ch2-loop）：与 Ch4/Ch6 相同的 sample-accurate 无缝循环方案。
// 先导文阶段不出声；画面出现的一刻（showImage）才开始播放，与 ch2-once-shatter 同时触发。
const CHAPTER_2_LOOP_SOUND = {
  srcOgg:"assets/sound/ch2-loop.ogg",
  srcM4a:"assets/sound/ch2-loop.m4a",
  // 循环声部音量 —— 后期在这里调节（0 = 静音，1 = 满音量）。
  revealVolume:1,
  revealFadeDuration:1800,
  exitFadeDuration:1200,
  unmuteFadeDuration:500,
  // 实测两个源文件的编码器 padding 并不一样，因此分开裁剪（浏览器 decodeAudioData 不会
  // 自动读取 m4a 的 gapless 元数据，会把 AAC 编码器加的静音一起解码出来）：
  // - ch2-loop.ogg（Vorbis）：开头无可裁静音，内容从第 0 秒开始；结尾约 21ms 真静音。
  // - ch2-loop.m4a（AAC）：开头约 47.9ms 真静音（标准 2112-sample 编码器 priming delay）；
  //   结尾约 21ms 真静音，与 ogg 版本一致。
  loopStartSecondsOgg:0,
  loopEndTrimSecondsOgg:.025,
  loopStartSecondsM4a:.05,
  loopEndTrimSecondsM4a:.025,
  loopTailSeconds:.3
};

// 第二章一次性音效（ch2-once-shatter）：单次播放，不循环，与 ch2-loop 同时触发。
// 走与第五章开门音效相同的 decodeAudioData → AudioBufferSourceNode 管线（共用同一个
// AudioContext），使用独立的 GainNode，音量与 ch2-loop 互不影响。
const CHAPTER_2_ONCE_SOUND = {
  srcOgg:"assets/sound/ch2-once-shatter.ogg",
  srcM4a:"assets/sound/ch2-once-shatter.m4a",
  // 一次性音效音量 —— 后期在这里调节。
  volume:.6
};

// 第三章循环声部（ch3-loop）：与 Ch2 相同的 sample-accurate 无缝循环方案
// （decodeAudioData → AudioBufferSourceNode，<audio> 元素兜底）。
// 先导文阶段不出声；画面出现的一刻（showImage）才开始播放，与第四/六章逻辑一致，
// 不像第一章那样保留人为接缝。
// 调音量：改下面的 revealVolume 值即可（0 = 静音，1 = 满音量）。
// 首尾裁剪值为实测（ffprobe + silencedetect）：
// - ch3-loop.ogg（Vorbis）：开头无编码器 padding，内容从第 0 秒开始；结尾约 1.589s 为真静音/衰
//   尾，裁掉后循环点落在实际内容结束处。
// - ch3-loop.m4a（AAC）：开头 66ms 为标准 2112-sample 编码器 priming delay（ffprobe start_time /
//   iTunSMPB 已确认）；结尾同理裁掉约 1.611s 真静音。
const CHAPTER_3_SOUND = {
  srcOgg:"assets/sound/ch3-loop.ogg",
  srcM4a:"assets/sound/ch3-loop.m4a",
  revealVolume:1,
  revealFadeDuration:1800,
  exitFadeDuration:1200,
  unmuteFadeDuration:500,
  loopStartSecondsOgg:0,
  loopEndTrimSecondsOgg:1.589,
  loopStartSecondsM4a:.066,
  loopEndTrimSecondsM4a:1.611,
  loopTailSeconds:1.6
};

// 第五章开门音效：单次播放（不循环），与门开启动效同时触发。
// 走与第六章环境声相同的 decodeAudioData → AudioBufferSourceNode 管线（共用同一个 AudioContext），
// 但使用独立的 GainNode，音量与 Ch6 环境声互不影响。
// 调音量：改下面的 volume 值即可（0 = 静音，1 = 满音量）。
const CHAPTER_5_DOOR_SOUND = {
  srcOgg:"assets/sound/ch5-door.ogg",
  srcM4a:"assets/sound/ch5-door.m4a",
  // 门声音量 —— 后期在这里调节。
  volume:.2
};

// 第五章环境循环声：直接复用第三章的音频素材（ch3-loop.ogg / .m4a），无缝循环方案与裁剪值
// 与第三章完全一致（同一份文件，同样的编码器 padding，因此裁剪参数照抄即可）。
// 先导文阶段不出声；画面出现的一刻（showImage）才开始播放，逻辑与第三章相同。
// 额外行为：鼠标悬停在门的可点击区域（door-trigger）时，或点击开门那一刻起，音量瞬间
// （非渐变式的缓慢淡出）降到 duckVolume；鼠标移开且尚未点击开门时，瞬间恢复满音量。
// 这个「瞬间」的观感刻意对齐 timeline 跳转切章节时的 exitFadeDuration 观感（快而不突兀），
// 因此 duckFadeDuration 取一个比 revealFadeDuration（1800ms）短很多的值。
// 调音量：改下面的 revealVolume（常态音量）或 duckVolume（悬停/开门后的降低音量）即可。
const CHAPTER_5_LOOP_SOUND = {
  srcOgg:"assets/sound/ch3-loop.ogg",
  srcM4a:"assets/sound/ch3-loop.m4a",
  revealVolume:1,
  revealFadeDuration:1800,
  exitFadeDuration:1200,
  unmuteFadeDuration:500,
  // 悬停门 / 开门后的目标音量：之前 0.5 的 40%，即常态音量的 20%。
  duckVolume:.2,
  // 「瞬间」降低/恢复的时长——刻意短，制造类似 timeline 切章节时的突然感，而非缓慢淡出。
  duckFadeDuration:220,
  loopStartSecondsOgg:0,
  loopEndTrimSecondsOgg:1.589,
  loopStartSecondsM4a:.066,
  loopEndTrimSecondsM4a:1.611,
  loopTailSeconds:1.6
};

const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
let motionPreference = "full"; // 每次打开网页都默认开启动效，不记住上一次的切换结果。

const UI_TEXT = {
  "zh-hans": {
    standard:"标准", large:"较大", increaseFont:"调大内容字体", resetFont:"恢复标准内容字体",
    enableMotion:"开启动效", reduceMotion:"精简动效", enableSound:"打开声音", disableSound:"关闭声音",
    context:"历史背景", closeContext:"收起历史背景", closeSidebar:"收起侧栏", language:"全站语言",
    viewingControls:"观看控制", enterFullscreen:"进入全屏观看", exitFullscreen:"退出全屏",
    imageNotes:"图像注释", memoryCues:"蕙兰的回忆线索", closeImage:"关闭大图", zoomImage:"放大查看",
    timeline:"故事时间线", previousScene:"上一幕", nextScene:"下一幕", prologue:"返回序言", epilogue:"前往跋", imageSource:"图片来源",
    expandControls:"展开控制栏", collapseControls:"收起控制栏"
  },
  "zh-hant": {
    standard:"標準", large:"較大", increaseFont:"放大內文字級", resetFont:"恢復標準內文字級",
    enableMotion:"開啟動態效果", reduceMotion:"精簡動態效果", enableSound:"開啟聲音", disableSound:"關閉聲音",
    context:"歷史脈絡", closeContext:"收起歷史脈絡", closeSidebar:"收起側欄", language:"全站語言",
    viewingControls:"觀看控制", enterFullscreen:"進入全螢幕觀看", exitFullscreen:"退出全螢幕",
    imageNotes:"圖像註解", memoryCues:"蕙蘭的回憶線索", closeImage:"關閉大圖", zoomImage:"放大查看",
    timeline:"故事時間線", previousScene:"上一幕", nextScene:"下一幕", prologue:"返回序言", epilogue:"前往跋", imageSource:"圖片來源",
    expandControls:"展開控制列", collapseControls:"收起控制列"
  },
  en: {
    standard:"Standard", large:"Large", increaseFont:"Increase text size", resetFont:"Reset text size",
    enableMotion:"Enable motion", reduceMotion:"Reduce motion", enableSound:"Enable sound", disableSound:"Disable sound",
    context:"Historical context", closeContext:"Close historical context", closeSidebar:"Close sidebar", language:"Site language",
    viewingControls:"Viewing controls", enterFullscreen:"Enter fullscreen", exitFullscreen:"Exit fullscreen",
    imageNotes:"Image annotations", memoryCues:"Huilan's memory cues", closeImage:"Close image", zoomImage:"Enlarge image",
    timeline:"Story timeline", previousScene:"Previous scene", nextScene:"Next scene", prologue:"Return to prologue", epilogue:"Go to epilogue", imageSource:"Image source",
    expandControls:"Expand controls", collapseControls:"Collapse controls"
  }
};

function getUIText(key) {
  return (UI_TEXT[mainLanguage] || UI_TEXT["zh-hans"])[key];
}

const FONT_SIZE_PRESETS = [
  { id:"standard", labelKey:"standard", nextLabelKey:"increaseFont", scale:1 },
  { id:"large", labelKey:"large", nextLabelKey:"resetFont", scale:1.18 }
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

// 先导文（prologue lead text，即开场 .start-en）英文字号：原先是 .79rem（桌面）/ .63rem（移动端），
// 比中文小太多，此处按约 20% 放大后取整。想手动微调就直接改这两个数字。
const START_EN_FONT_SIZE_DESKTOP_REM = 0.95; // 原 0.79rem
const START_EN_FONT_SIZE_MOBILE_REM = 0.76;  // 原 0.63rem
document.documentElement.style.setProperty("--start-en-font-size", `${START_EN_FONT_SIZE_DESKTOP_REM}rem`);
document.documentElement.style.setProperty("--start-en-font-size-mobile", `${START_EN_FONT_SIZE_MOBILE_REM}rem`);

// 全局语言状态：不再只作用于侧栏，主屏叙事正文 / hotspot 提示 / 控制栏文案都读这一个值。
// 三个状态：zh-hans、zh-hant、en。默认值跟随浏览器语言（navigator.language），不再固定简体，
// 也不写 localStorage——每次重新打开网页都按当前浏览器语言重新判断，不记住上一次手动切换的结果。
function detectBrowserMainLanguage() {
  const tags = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]);
  const primary = (tags[0] || "").toLowerCase();
  if (!primary.startsWith("zh")) return "en";
  // zh-Hant / zh-TW / zh-HK / zh-MO 视为繁体，其余（zh-Hans / zh-CN / zh-SG / 裸的 "zh"）视为简体。
  if (/hant|-tw|-hk|-mo/.test(primary)) return "zh-hant";
  return "zh-hans";
}
let mainLanguage = detectBrowserMainLanguage();

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
    bodyZh: "通过学习、劳动、自我批评和集体监督来改变个人思想的政治要求。长期处于审查和表态压力之下，人们往往需要调整自己的言辞，以避免受到进一步批判。",
    bodyEn: "A political demand to reshape thought through study, labor, self-criticism, and collective supervision. Under sustained pressure to account for their views and declare a political position, people often adjusted what they said to avoid further criticism."
  }
};

const CONTEXTS = [
  {
    title: "儿时父母的书房", titleEn: "My Parents’ Study · 1953",
    leadZh: "1953–1966年 · 旧藏与新政", leadEn: "1953–1966 · Old Collections, New Politics",
    leadNoteZh: "1953年，中国开始执行第一个五年计划，大规模工业与基础设施建设随之展开。新时期的政治图像进入学校、单位和家庭，常与字典、古画等旧藏共处。1966年开始的“破四旧”运动把“旧思想、旧文化、旧风俗、旧习惯”列为清除对象，旧书、旧画和家庭收藏由此面临查抄与毁损。\n\n来源：<a class=\"context-lead-note-source\" href=\"http://paper.people.com.cn/rmzk/html/2020-12/23/content_2025418.htm\" target=\"_blank\" rel=\"noopener noreferrer\">人民日报：《新中国第一个五年计划诞生记》</a>",
    leadNoteEn: "China began its First Five-Year Plan in 1953, followed by large-scale industrial and infrastructure development. New political imagery entered schools, workplaces, and homes, where it could appear alongside dictionaries, paintings, and other older possessions. The Destroy the Four Olds campaign, launched in 1966 against “old ideas, old culture, old customs, and old habits,” exposed old books, paintings, and family collections to confiscation and destruction.\n\nSource: <a class=\"context-lead-note-source\" href=\"http://paper.people.com.cn/rmzk/html/2020-12/23/content_2025418.htm\" target=\"_blank\" rel=\"noopener noreferrer\">People's Daily: \u201cThe Birth of New China's First Five-Year Plan\u201d</a>",
    zh: "1950年代，教师和读书人家里的书房常兼作读书、备课、藏书和待客的地方。字典、古典小说、画报、家庭照片和宣传画可以放在同一间屋里。新中国早期的政治图像已经进入学校、单位和家庭，旧书与新宣传也会在日常空间中同时存在。\n\n1966年以后，旧书、旧画、月份牌和家族照片可能在“破四旧”[2][3]与抄家中被查抄、封存、涂污或烧毁。私人书房也因此成为家庭成分、社会关系和思想倾向受到审查的空间。\n\n背景音乐：《夜来香》由黎锦光作曲、作词，唱片署名“金玉谷”，1944年首度发表，最初由李香兰（山口淑子）演唱。此后，这首歌因演唱者身份与曲风，在不同历史时期数次被禁。[1] 在本章的人物设定中，沈家五十年代只在家中低声播放这张唱片，文革开始后不再播放。",
    en: "In the 1950s, the study in a teacher's or reader's home often served several purposes: reading, lesson preparation, book storage, and receiving visitors. Dictionaries, classical fiction, illustrated magazines, family photographs, and propaganda posters could occupy the same room. In early PRC domestic life, older books and new political imagery often existed side by side.\n\nAfter 1966, old books, paintings, yuefenpai calendar posters, and family photographs could be confiscated, sealed away, defaced, or burned during house searches and the Destroy the Four Olds campaign.[2][3] Private studies could therefore become places where a family's class background, social ties, and political views were examined.\n\nBackground music: “Yeh Lai Hsiang” (“Fragrance of the Night”) was written and composed by Li Jinguang, credited on the record as Jin Yugu, and first released in 1944 in a recording by Li Xianglan (Yamaguchi Yoshiko). The song was banned more than once in different periods because of its singer's identity and musical style.[1] In this chapter's fictional history, the Shen family played the record quietly at home during the 1950s and stopped playing it after the Cultural Revolution began.",
    material: "合成记忆图像｜书房、家庭照片、宣传画与古典仕女图层",
    sources: [
      { zh:"[1] 中文维基百科：《夜来香》（歌曲）词条", en:"[1] Chinese Wikipedia: “Yeh Lai Hsiang” (song) entry", href:"https://zh.wikipedia.org/zh-tw/夜来香_(歌曲)" },
      { zh:"[2] 中国研究服务中心（CUHK）论文数据库：破四旧运动相关研究（存档）", en:"[2] Universities Service Centre for China Studies (CUHK) paper database: research on the Destroy the Four Olds campaign (archived)", href:"https://web.archive.org/web/20211210040309/http://ww2.usc.cuhk.edu.hk/PaperCollection/Details.aspx?id=70" },
      { zh:"[3] 炎黄春秋网：破四旧运动相关文章（存档）", en:"[3] Yanhuang Chunqiu: article on the Destroy the Four Olds campaign (archived)", href:"https://web.archive.org/web/20201124135840/http://www.yhcqw.com/33/8055.html" }
    ]
  },
  {
    title: "学校与公开批判", titleEn: "Schools and Public Denunciation · 1966",
    leadZh: "1966–1967年 · 大字报与批判会", leadEn: "1966–1967 · Big-Character Posters and Denunciation Meetings",
    leadNoteZh: "1966年8月，“破四旧”运动在“红八月”期间达到高潮。红卫兵参加抄家、焚书和针对所谓“牛鬼蛇神”的公开批斗，并造成广泛的暴力与迫害。学校走廊和教室也在这一时期被用于张贴大字报、公开指控个人和组织批判会。1967年官方文件开始限制部分行动后，这类活动才逐渐减少。\n\n来源：<a class=\"context-lead-note-source\" href=\"https://zh.wikipedia.org/wiki/%E7%A0%B4%E5%9B%9B%E8%88%8A\" target=\"_blank\" rel=\"noopener noreferrer\">维基百科：《破四旧》</a>",
    leadNoteEn: "The Destroy the Four Olds campaign reached its height during the “Red August” of 1966. Red Guards took part in house searches, book burnings, and public struggle sessions against people labeled “cow demons and snake spirits,” contributing to widespread violence and persecution. School corridors and classrooms were also used to post big-character posters, accuse individuals in public, and organize denunciation meetings. These activities began to decline after official directives restricted some actions in 1967.\n\nSource: <a class=\"context-lead-note-source\" href=\"https://zh.wikipedia.org/wiki/%E7%A0%B4%E5%9B%9B%E8%88%8A\" target=\"_blank\" rel=\"noopener noreferrer\">Chinese Wikipedia: \u201cDestroy the Four Olds\u201d</a>",
    zh: "这类高校教学楼和机关楼在1950至60年代较为常见。长走廊、成排房门、厚墙、裸露灯泡和较少装饰，反映了重视秩序、集体通行和机构功能的建筑方式，也受到苏联规划与建筑教育的影响。\n\n1966年学校停课后，许多校园被用于政治动员。走廊、办公室门口和公告墙成为张贴大字报、公开指控个人和组织批判的场所。原本用于教学和行政的公共空间，使针对个人的政治指控能够迅速被观看、转抄和传播。",
    en: "This type of university or government building was common in the 1950s and 1960s. Long corridors, repeated doors, thick walls, exposed bulbs, and limited decoration reflected an architectural approach centered on order, collective circulation, and institutional function. Soviet planning and architectural education also influenced these spaces.\n\nAfter schools closed in 1966, many campuses were used for political mobilization. Corridors, office entrances, and notice boards became places for posting big-character posters, publicly accusing individuals, and organizing denunciation meetings. Public spaces originally intended for teaching and administration allowed political accusations against individuals to be seen, copied, and circulated quickly.",
    material: "合成记忆图像｜学校走廊、手写大字报、红色宣传碎片"
  },
  {
    title: "下乡与人民公社", titleEn: "Sent-down Youth and the Commune · 1968–1969",
    leadZh: "1968–1969年 · 公社与工分", leadEn: "1968–1969 · The Commune and Work Points",
    leadNoteZh: "上山下乡并非始于文革，1950年代中期已有有限规模的实践。1968年12月22日，《人民日报》传达毛泽东关于知识青年到农村接受贫下中农“再教育”的指示后，运动迅速扩大。1956年至1966年约有120万城市青年下乡，1968年至1975年约1200万人被送往农村、农场和边疆；广义统计中的总人数约为1600万至近2000万。官方把扎根农村、缩小城乡及脑力与体力劳动差别列为目标；在学校停课和城市就业停滞的背景下，这项政策也承担了安置城市青年和减少红卫兵派性冲突的功能。\n\n来源：<a class=\"context-lead-note-source\" href=\"https://cpc.people.com.cn/BIG5/64162/64165/74856/75006/5194420.html\" target=\"_blank\" rel=\"noopener noreferrer\">人民网资料：1968年12月22日毛泽东发号召</a>；<a class=\"context-lead-note-source\" href=\"https://chineseposters.net/themes/up-to-the-mountains\" target=\"_blank\" rel=\"noopener noreferrer\">Chineseposters.net：上山下乡主题</a>",
    leadNoteEn: "The sent-down youth program did not begin with the Cultural Revolution; limited forms existed from the mid-1950s. The movement expanded rapidly after People's Daily publicized Mao Zedong's directive on 22 December 1968 calling for educated youth to receive “re-education” from poor and lower-middle peasants in the countryside. About 1.2 million urban young people were sent down between 1956 and 1966, and about 12 million between 1968 and 1975; broad estimates for the entire movement range from more than 16 million to nearly 20 million. Official goals included rural settlement and reducing differences between urban and rural areas and between mental and manual labor. With schools closed and urban employment stalled, the policy also served to relocate urban youth and reduce Red Guard factional conflict.\n\nSources: <a class=\"context-lead-note-source\" href=\"https://cpc.people.com.cn/BIG5/64162/64165/74856/75006/5194420.html\" target=\"_blank\" rel=\"noopener noreferrer\">People's Daily Online archive: Mao's 22 December 1968 directive</a>; <a class=\"context-lead-note-source\" href=\"https://chineseposters.net/themes/up-to-the-mountains\" target=\"_blank\" rel=\"noopener noreferrer\">Chineseposters.net: Up to the Mountains and Down to the Countryside</a>",
    zh: "1968年12月以后，大批城市青年在政策安排下被送到农村、农场和边疆地区接受“再教育”，个人通常难以自行选择去向。到达公社后，日常生活被纳入生产队和生产大队的安排：天亮出工、按工分记录劳动、由集体分配口粮，夜间还要参加政治学习和会议。\n\n1960年代末至1970年代初的皖南农村，插秧、拔秧、补苗、薅草、挑担和排灌等水田劳动需要长时间弯腰或赤脚站在泥水中。夏季湿热，蚊虫、蚂蟥和皮肤感染也会增加劳动负担。对许多被下放者而言，“劳动改造”具体落实为每日的劳动安排、工分、口粮分配和政治学习。",
    en: "After December 1968, large numbers of urban young people were sent by state policy to farms, villages, and frontier regions for “re-education,” usually with little control over their destination. At the commune, daily life was organized through production teams and brigades: people began work at daybreak, earned work points, received grain through collective distribution, and attended political study and meetings at night.\n\nIn the rice-growing areas of southern Anhui in the late 1960s and early 1970s, transplanting and pulling seedlings, replacing missing plants, weeding, carrying loads, and managing irrigation required people to bend for long periods or stand barefoot in muddy water. Summer heat, humidity, mosquitoes, leeches, and skin infections added to the physical burden. For many people who were sent down, “labor reform” took concrete form in daily work assignments, work points, grain distribution, and political study.",
    material: "合成记忆图像｜宣传画、稻田倒影与公社劳动场景"
  },
  {
    title: "会议室里的自我审查", titleEn: "Self-surveillance in the Meeting Room · 1969",
    leadZh: "1969–1970年 · 忆苦思甜与批斗会", leadEn: "1969–1970 · Speak-Bitterness Meetings and Struggle Sessions",
    leadNoteZh: "“斗私批修”是毛泽东1967年提出、此后长期推行的政治方针，要求个人检查并批判自己的“私心”。忆苦思甜、思想汇报、自我批评与批斗会，使这种政治要求进入生产队的日常会议和集体生活。\n\n来源：<a class=\"context-lead-note-source\" href=\"https://zh.wikipedia.org/zh-hans/%E6%96%97%E7%A7%81%E6%89%B9%E4%BF%AE\" target=\"_blank\" rel=\"noopener noreferrer\">维基百科：《斗私批修》</a>",
    leadNoteEn: "“Fighting self-interest, criticizing revisionism” was a political directive introduced by Mao Zedong in 1967 and promoted for years afterward. It required individuals to examine and denounce their own “selfish thoughts.” Speak-bitterness meetings, ideological reports, self-criticism, and struggle sessions brought this political demand into the routine meetings and collective life of production teams.\n\nSource: <a class=\"context-lead-note-source\" href=\"https://zh.wikipedia.org/zh-hans/%E6%96%97%E7%A7%81%E6%89%B9%E4%BF%AE\" target=\"_blank\" rel=\"noopener noreferrer\">Chinese Wikipedia: \u201cDou Si Pi Xiu\u201d</a>",
    zh: "生产大队会议室是公社日常政治生活的重要空间。这里可以安排劳动、传达通知，也可以进行政治学习、忆苦思甜、思想汇报和批斗。毛泽东画像、政治口号和黑板通常位于会议室的正面或醒目位置，与会议程序共同规定人们应当使用的政治语言和表态方式。\n\n参加者不仅接收通知，也可能被要求公开检讨自己的想法、批判他人或表明政治立场。长期处于这种审查与表态压力之下，调整言辞和进行自我审查成为许多人日常生活的一部分。",
    en: "The production brigade meeting room was an important space of everyday political life in a commune. It could be used for work assignments and announcements, as well as political study, speak-bitterness meetings, ideological reports, and struggle sessions. Portraits of Mao Zedong, political slogans, and blackboards were usually placed at the front or in prominent positions; together with meeting procedures, they defined the political language and declarations expected from participants.\n\nParticipants did more than receive notices. They could be required to criticize their own thoughts in public, denounce others, or declare a political position. Under sustained pressure to account for their views, adjusting one's words and practicing self-censorship became part of daily life for many people.",
    material: "合成记忆图像｜大队会议室、政治标语、黑板与毛泽东画像"
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
    zh: "1970年前后的格林尼治村，是曼哈顿一个以住宅为主，同时分布着书店、咖啡馆和小型演出场所的街区。红砖公寓底层常有临街商铺。到了晚上，居民、学生、店员、乐手和来看演出的人会出现在同一片街道上。[1]\n\n独立书店不仅出售书籍，也会张贴公告，供人碰面和交换信息。1967年开业的奥斯卡·王尔德纪念书店出售讨论同性恋生活的书籍和期刊，并为社群提供活动信息和聚会空间。[2] 咖啡馆和小型演出场所则把民谣、蓝调、诗歌朗诵和实验戏剧带入街区日常。Gerde's Folk City是当时重要的民谣演出场所，鲍勃·迪伦早期曾在这里演出；整个1960年代，当地民谣活动也与民权运动及和平运动相互联系。[4][5][6]\n\n石墙事件之后，警方对同性恋社群的骚扰和突袭仍在继续；1970年8月，一场要求停止警方骚扰的抗议在格林尼治村演变为与警方的冲突。[3] 这些冲突没有消除书店、演出场所和社群组织所提供的表达、交往与组织空间。对于同时期身处文革、个人言论和社会关系受到政治审查的普通人而言，这类公共空间所允许的活动范围明显更大。\n\n本章画面组合了这些同时期的街区元素，并非复原某一条具体街道。",
    en: "Around 1970, Greenwich Village was a primarily residential Manhattan neighborhood with bookshops, coffeehouses, and small performance venues. Street-level shops often occupied the ground floors of red-brick apartment buildings. At night, residents, students, shop workers, musicians, and people arriving for performances shared the same streets.[1]\n\nIndependent bookshops sold books, posted notices, and gave people places to meet and exchange information. The Oscar Wilde Memorial Bookshop, which opened in 1967, carried books and periodicals about gay and lesbian life and provided community information and meeting space.[2] Coffeehouses and small performance venues brought folk music, blues, poetry readings, and experimental theater into everyday neighborhood life. Gerde's Folk City was an important folk venue where Bob Dylan played early engagements; throughout the 1960s, the local folk scene also intersected with the civil rights and peace movements.[4][5][6]\n\nPolice harassment and raids against gay and lesbian communities continued after Stonewall. In August 1970, a protest calling for an end to police harassment led to a confrontation with police in Greenwich Village.[3] These conflicts did not erase the opportunities for expression, association, and collective organization provided by bookshops, performance venues, and community groups. For ordinary people in China whose speech and social relationships were subject to political scrutiny during the Cultural Revolution, the range of activity permitted in such public spaces was markedly broader.\n\nThis chapter combines elements documented in the neighborhood around 1970 rather than reconstructing a specific street.",
    material: "合成场景｜格林尼治村夜间街道、书店、咖啡馆与1970年代车辆",
    galleryIntroZh: "以下是本章画面所参考的同时期格林尼治村街区影像：书店、咖啡馆演出空间与1970年游行现场，用于确认场景元素，并非画面本身的直接出处。",
    galleryIntroEn: "These period photographs of Greenwich Village — including a bookshop, coffeehouse performance spaces, and a 1970 march — were used to verify elements of the chapter's setting. They are visual references rather than direct sources for the composited image.",
    gallery: [
      {
        image:"https://www.warhol.org/wp-content/uploads/2014/08/2.jpg",
        zh:"1966年，Velvet Underground 与 Nico 在 The Dom 演出，舞台配有灯光与影像投影",
        en:"The Velvet Underground and Nico performing at The Dom, 1966, with stage lighting and film projections",
        credit:"The Andy Warhol Museum",
        href:"https://www.warhol.org/"
      },
      {
        image:"https://www.nyclgbtsites.org/wp-content/uploads/2021/06/Craig-Rodwell-2-NYPL-1.jpeg",
        zh:"克雷格·罗德韦尔（Craig Rodwell）与梅梅·桑福德（Mei-Mei Sanford）在奥斯卡·王尔德纪念书店，1970年",
        en:"Craig Rodwell and Mei-Mei Sanford at the Oscar Wilde Memorial Bookshop, 1970",
        credit:"Diana Davies / The New York Public Library",
        href:"https://www.nyclgbtsites.org/site/oscar-wilde-memorial-bookshop/"
      },
      {
        image:"https://www.nyclgbtsites.org/wp-content/uploads/2021/06/Caffe-Cino-3-1.jpeg",
        zh:"Caffe Cino，格林尼治村一家咖啡馆兼外外百老汇（Off-Off-Broadway）演出场地",
        en:"Caffe Cino, a coffeehouse and Off-Off-Broadway performance space in Greenwich Village",
        credit:"NYC LGBTQ Historic Sites Project",
        href:"https://www.nyclgbtsites.org/site/caffe-cino/"
      },
      {
        image:"https://www.nyclgbtsites.org/wp-content/uploads/2021/06/Christopher-Street-Liberation-Day-March-June-1970.-Photo-by-Fred-W.-McDarrah.jpg",
        zh:"Christopher Street Liberation Day 游行，1970年6月",
        en:"Christopher Street Liberation Day march, June 1970",
        credit:"Fred W. McDarrah / NYC LGBTQ Historic Sites Project",
        href:"https://www.nyclgbtsites.org/"
      }
    ],
    sources: [
      { zh:"[1] Village Preservation：格林尼治村的街区、画廊、剧场与社会运动史", en:"[1] Village Preservation: Greenwich Village neighborhood, gallery, theater, and social-movement history", href:"https://villagepreservation.org/resources/neighborhood-history/" },
      { zh:"[2] NYC LGBTQ Historic Sites Project：Oscar Wilde Memorial Bookshop 史料页", en:"[2] NYC LGBTQ Historic Sites Project: Oscar Wilde Memorial Bookshop", href:"https://www.nyclgbtsites.org/site/oscar-wilde-memorial-bookshop/" },
      { zh:"[3] NYC LGBTQ Historic Sites Project：1970年反对警方骚扰的抗议", en:"[3] NYC LGBTQ Historic Sites Project: 1970 demonstration against police harassment", href:"https://www.nyclgbtsites.org/site/gay-activists-alliance-gay-liberation-front-and-radicalesbians-demonstration-against-police-harassment/" },
      { zh:"[4] Village Preservation：1961–1970年的格林尼治村民谣与咖啡馆文化", en:"[4] Village Preservation: Folk Music in Greenwich Village, 1961–1970", href:"https://villagepreservation.org/2015/01/06/folk-music-in-greenwich-village-1961-1970s/" },
      { zh:"[5] Village Preservation：Gerde's Folk City及其演出者", en:"[5] Village Preservation: Gerde's Folk City and its performers", href:"https://villagepreservation.org/2018/03/28/gerdes-folk-city-the-end-of-a-greenwich-village-icon/" },
      { zh:"[6] Village Preservation：格林尼治村民谣的历史与遗产", en:"[6] Village Preservation: Talkin' Greenwich Village — Folk Music's Legacy", href:"https://www.villagepreservation.org/2024/11/12/talkin-greenwich-village-folk-musics-legacy-in-the-village/" }
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
      note:"《康熙字典》按部首和笔画检索汉字，是阅读旧书时常用的工具书。",
      noteEn:"The Kangxi Dictionary indexes Chinese characters by radicals and stroke counts, making it a standard reference for reading older texts.",
      learnMoreZh:"《康熙字典》成书于清代康熙五十五年（1716年），是大型官修字书。正文按部首和笔画组织汉字，分装十二集，对应地支子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥，每集再分上、中、下三册，全书共三十六册。查一个字，先辨其部首，在《部首目录》中按部首笔画数找到该部首所属的地支卷册；再扣除部首、按古法计算剩余笔画数，在对应卷册的《检字表》中定位正文页码；最后翻至正文，依反切注音查读音，并参看所引古籍释义。它不像20世纪面向现代读者的《新华字典》那样小型、白话、便携，而是一部需要按地支分册、逐层翻检的古典字书。\n\n在本章的人物设定中，蕙兰小时候在父亲书房里依次查找自己姓名中的“沈”“蕙”“兰／蘭”。下面三张图对应这三个字在《康熙字典》中各自所在的检字页，图注标出的“巳集上”“申集中”等即为其所属的地支卷册。",
      learnMoreEn:"Compiled in the fifty-fifth year of the Kangxi reign (1716), the Kangxi Dictionary is a large Qing court-sponsored character dictionary. Its main text organizes characters by radical and stroke count across twelve fascicle groups named for the twelve Earthly Branches — zi, chou, yin, mao, chen, si, wu, wei, shen, you, xu, hai — each further divided into upper, middle, and lower volumes, thirty-six volumes in total. To look up a character, a reader first identifies its radical and consults the Radical Index by stroke count to find which Earthly-Branch group and volume it belongs to; counts the remaining strokes after the radical to locate the page in that volume's Character Index; then turns to the main text to read the pronunciation via fanqie notation and the meanings cited from classical sources. Unlike the compact, vernacular Xinhua Dictionary produced for modern readers in the twentieth century, it is a classical reference work consulted by working through Earthly-Branch volumes in sequence.\n\nIn this chapter's fictional history, Huilan uses this method in her father's study to look up the three characters in her name: Shen (沈), Hui (蕙), and Lan (兰 / 蘭). The images below show the dictionary pages on which those characters appear; captions such as “Sì fascicle, upper” or “Shēn fascicle, middle” name the Earthly-Branch volume each page belongs to.",
      sourceZh:"清康熙五十五年（1716年）内府刊本 · 哈佛大学图书馆 HOLLIS",
      sourceEn:"Imperial edition, Kangxi 55 (1716) · Harvard Library HOLLIS",
      sourceUrl:"https://hollis.harvard.edu/discovery/fulldisplay?context=L&vid=01HVD_INST:HVD2&lang=en&search_scope=MyInst_and_CI&adaptor=Local%20Search%20Engine&tab=Everything&docid=alma990032703120203941",
      galleryIntroZh:"以下三页对应“沈”“蕙”“兰”三字在《康熙字典》中各自所在的检字页。",
      galleryIntroEn:"The three pages below correspond to where each character of “Shen”, “Hui”, and “Lan” appears in the Kangxi Dictionary.",
      gallery:[
        {
          image:"assets/references/ch1-gallery/kangxi-shen.jpeg",
          zh:"“沈”字所在检字页：巳集上",
          en:"The page where “Shen” (沈) appears — Sì fascicle, upper"
        },
        {
          image:"assets/references/ch1-gallery/kangxi-hui.jpeg",
          zh:"“蕙”字所在检字页：申集中",
          en:"The page where “Hui” (蕙) appears — Shēn fascicle, middle"
        },
        {
          image:"assets/references/ch1-gallery/kangxi-lan.jpeg",
          zh:"“兰（蘭）”字所在检字页：申集上",
          en:"The page where “Lan” (兰 / 蘭) appears — Shēn fascicle, upper"
        }
      ]
    },
    {
      id:"ch01-china-soviet-friendship", xPx:514, yPx:228,
      zh:"中苏友好宣传画", en:"Chinese-Soviet Friendship Poster",
      note:"1950年代的中苏友好宣传画常以红旗、并肩人物和建设场景表现两国结盟。",
      noteEn:"Chinese-Soviet friendship posters of the 1950s often used red flags, paired figures, and construction scenes to present the alliance.",
      learnMoreZh:"20世纪50年代的中苏友好宣传常用并肩人物、红旗、工业建设和集体劳动表现两国结盟、苏联援助与社会主义现代化。[1]\n\n在本章场景中，这类政治宣传画与书籍、备课用品和家庭旧藏同时出现在父亲的书房里。\n\n图像说明：本章中的宣传画依据同期海报的常见构图绘制，并非某件原作的复原。",
      learnMoreEn:"Chinese-Soviet friendship posters of the 1950s often used paired figures, red flags, industrial construction, and collective labor to represent the alliance, Soviet assistance, and socialist modernization.[1]\n\nIn this chapter's scene, this type of political poster appears in the father's study alongside books, teaching materials, and older family possessions.\n\nImage note: The poster in the scene was designed from visual conventions found in period examples and is not a reproduction of a specific original.",
      sourceZh:"[1] Chineseposters.net · 中苏友好主题海报系列（视觉参考）",
      sourceEn:"[1] Chineseposters.net · Sino-Soviet friendship poster collection (visual reference)",
      sourceUrl:"https://chineseposters.net/themes/soviet-union",
      galleryIntroZh:"以下海报用于辨认1950年代中苏友好宣传常见的构图与主题，供比对参考，并非本画面所用海报的出处。",
      galleryIntroEn:"These posters are visual references for common compositions and themes in 1950s Sino-Soviet friendship propaganda, shown for comparison only and not the source of the poster used in this scene.",
      gallery:[
        {
          image:"assets/references/ch1-gallery/soviet-1.jpg",
          zh:"中苏友好同盟互助促进世界持久和平",
          en:"The Sino-Soviet Alliance for Friendship and Mutual Assistance promotes enduring world peace",
          metaZh:"黎冰鸿 绘｜约1950年｜私人收藏",
          metaEn:"By Li Binghong · ca. 1950 · Private collection",
          credit:"PC-1950-s-002 · Chineseposters.net · Private collection",
          href:"https://chineseposters.net/posters/pc-1950-s-002"
        },
        {
          image:"assets/references/ch1-gallery/soviet-2.jpg",
          zh:"在苏联伟大的援助下，我们将尽最大的努力，逐步地实现国家工业化！",
          en:"With the great support of the Soviet Union, and our own greatest strength, we will realize the industrialization of our nation step by step!",
          metaZh:"蔡振华 绘｜1953年12月｜华东人民美术出版社",
          metaEn:"By Cai Zhenhua · December 1953 · Huadong renmin meishu chubanshe",
          credit:"BG E15/590 · Chineseposters.net · Landsberger collection",
          href:"https://chineseposters.net/posters/e15-590"
        },
        {
          image:"assets/references/ch1-gallery/soviet-3.jpg",
          zh:"学习苏联现今经济建设我们的国家",
          en:"Study the Soviet Union's advanced economy to build up our nation",
          metaZh:"丁浩 绘｜1953年6月｜华东人民美术出版社",
          metaEn:"By Ding Hao · June 1953 · Huadong renmin meishu chubanshe",
          credit:"BG E15/334 · Chineseposters.net · Landsberger collection",
          href:"https://chineseposters.net/posters/e15-334"
        }
      ]
    },
    {
      id:"ch01-calendar-family", xPx:321, yPx:833,
      zh:"月份牌《合家欢》", en:"Yuefenpai Calendar Poster: A Happy Family",
      note:"月份牌把商品广告、月历和理想化的家庭图像放在同一张画上，常被挂在家中。",
      noteEn:"Yuefenpai combined product advertising, a calendar, and idealized domestic scenes in images people often hung at home.",
      learnMoreZh:"月份牌是清末在上海兴起的商业广告画，通常把商品广告、月份日历和理想化人物或家庭图像放在同一画面里。它既用于广告，也可作为家庭装饰，后来成为近代城市商业视觉文化的一部分，并被列入上海市非物质文化遗产。\n\n《合家欢》由杭稺英绘制于1930年代，是奉天太阳烟公司的广告月份牌。在本章场景中，它说明沈家书房的旧藏除书籍外，也包括曾进入家庭日常生活的商业图像。",
      learnMoreEn:"Yuefenpai emerged as commercial advertising posters in late-Qing Shanghai. They commonly combined product advertising, a calendar, and idealized figures or domestic scenes in a single image. Used both as advertisements and as household decoration, they became part of modern urban commercial visual culture and have since been included in Shanghai's intangible cultural heritage register.\n\nA Happy Family was painted by Hang Zhiying in the 1930s as an advertising calendar for the Mukden Sun Tobacco Company. In this chapter's scene, it shows that the Shen family study contains not only books but also commercial images that once formed part of domestic life.",
      image:"assets/references/ch1-gallery/3.jpg",
      sourceZh:"[1][2] 中文维基百科“月份牌”词条 · Openmuseum 开放博物馆",
      sourceEn:"[1][2] Chinese Wikipedia: “Yuefenpai” · Openmuseum",
      sourceUrl:"https://plaza.openmuseum.tw/muse/exhibition/81fbcee965c82f35d00cd1e343feb449#front"
    },
    {
      id:"ch01-young-companion", xPx:993, yPx:780,
      zh:"《良友》画报封面女郎", en:"Cover Girl of The Young Companion",
      note:"《良友》是1926年至1945年出版的大型画报，封面女郎常用来呈现都市女性的摩登形象。",
      noteEn:"The Young Companion was a major illustrated magazine published from 1926 to 1945; its cover women often presented a modern urban ideal.",
      learnMoreZh:"《良友》1926年创刊、1945年停刊，是中国早期的大型综合性摄影图文画报。它的封面多用知名女性、影星或社会名流，内容涵盖战争、政治、文娱与社会生活。[1]\n\n这一画面参照《良友》1937年4月15日第127期封面。在本章的人物设定中，生于1918年的母亲年轻时订阅《良友》，并把合订本留在家中。这本刊物于1945年停刊，当时蕙兰一岁。",
      learnMoreEn:"The Young Companion was founded in 1926 and ceased publication in 1945. It was an early large-format illustrated photographic magazine in China. Its covers often featured well-known women, film stars, or public figures, while its contents included war, politics, entertainment, and social life.[1]\n\nThis image references the cover of issue 127, dated 15 April 1937. In this chapter's fictional history, Huilan's mother, born in 1918, subscribed to the magazine as a young woman and kept the bound volumes at home. The magazine ceased publication in 1945, one year after Huilan was born.",
      image:"assets/references/ch1-gallery/5.jpeg",
      sourceZh:"[1] 《良友》1937年4月15日第127期 · Internet Archive",
      sourceEn:"[1] The Young Companion, issue 127, 15 April 1937 · Internet Archive",
      sourceUrl:"https://archive.org/details/liangyou-1937.04.15"
    },
    {
      id:"ch01-gu-huichuntang", xPx:1176, yPx:539,
      zh:"月份牌《谷回春堂广告》", en:"Yuefenpai Advertisement for Gu Huichun Tang",
      note:"药品广告也常采用月份牌形式，把商品、时装人物和洋派室内组合成理想的都市生活画面。",
      noteEn:"Pharmaceutical advertisements also used the yuefenpai format, combining a product, fashionable figures, and Western-style interiors into an ideal urban scene.",
      learnMoreZh:"月份牌是清末在上海兴起的商业广告画，通常把商品广告、月份日历和理想化人物或家庭图像放在同一画面里。它既用于广告，也可作为家庭装饰，后来成为近代城市商业视觉文化的一部分，并被列入上海市非物质文化遗产。\n\n《谷回春堂广告》由谢之光绘制于1931年，是谷回春堂“健胃固肠丸”的广告月份牌。画面把时装女性、洋派室内和商品宣传组合成当时的现代生活图景。在“破四旧”期间，这类商业图像、摩登女性形象和西式陈设可能被归入受到批判和清除的“旧生活方式”。",
      learnMoreEn:"Yuefenpai emerged as commercial advertising posters in late-Qing Shanghai. They commonly combined product advertising, a calendar, and idealized figures or domestic scenes in a single image. Used both as advertisements and as household decoration, they became part of modern urban commercial visual culture and have since been included in Shanghai's intangible cultural heritage register.\n\nThe Gu Huichun Tang Advertisement was painted by Xie Zhiguang in 1931 to advertise the company's digestive tonic pills. The image combines a fashionable woman, a Western-style interior, and commercial promotion in a contemporary scene of modern life. During the Destroy the Four Olds campaign, commercial images of this kind, fashionable female figures, and Western-style furnishings could be classified as “old ways of life” subject to criticism and removal.",
      image:"assets/references/ch1-gallery/4.jpg",
      sourceZh:"[1] Openmuseum 开放博物馆",
      sourceEn:"[1] Openmuseum",
      sourceUrl:"https://plaza.openmuseum.tw/muse/exhibition/81fbcee965c82f35d00cd1e343feb449#front"
    },
    {
      id:"ch01-dipper-scripture", xPx:819, yPx:173,
      zh:"《太上玄灵北斗本命延生真经》彩绘本", en:"Illustrated Scripture of the Northern Dipper",
      note:"泥金彩绘道教经卷把经文、神仙谱系和仪式图像放在同一书页，既供诵读，也供观看。",
      noteEn:"Gold-pigment Daoist scriptures place text, divine lineages, and ritual images on one page, made to be read as well as viewed.",
      learnMoreZh:"明代泥金彩绘道教经卷把道教文字、神仙谱系和仪式图像放在同一书页。金彩、人物和云气不仅辅助诵读，也把星辰信仰和神仙谱系转化为可观看的图像。\n\n这件《太上玄灵北斗本命延生真经》为1542年（明嘉靖二十一年）纸本泥金彩绘本，原件见于苏富比拍卖记录，画面所用扫描件由书格整理发布。[1] 在本章的人物设定中，沈家书房收藏同类彩绘经卷，蕙兰小时候曾翻看其中的仙人和云气。",
      learnMoreEn:"Ming-dynasty Daoist scriptures painted with gold pigment brought religious text, divine lineages, and ritual images together on the page. Gold, figures, and clouds supported recitation while also giving visual form to astral beliefs and hierarchies of immortals.\n\nThis Illustrated Scripture of the Northern Dipper is a 1542 (Jiajing 21) manuscript on paper. The original appears in a Sotheby's auction record, and the scan used here was compiled and published by Shuge.[1] In this chapter's fictional history, the Shen family keeps a similar illustrated scripture, which Huilan looks through as a child.",
      image:"assets/references/ch1-gallery/2.jpeg",
      sourceZh:"[1] 书格（镜像）· 原件苏富比拍卖记录",
      sourceEn:"[1] Shuge mirror · original Sotheby's auction record",
      sourceUrl:"https://shuge.hanjihebi.com/书格网站资源/明内府彩绘本系列/太上玄灵北斗本命延生真经.明嘉靖二十一年纸本泥金彩绘本.苏富比拍卖.pdf"
    },
    {
      id:"ch01-dream-red-chamber", xPx:1555, yPx:344,
      zh:"《红楼梦赋图册》", en:"Illustrated Album of Rhapsodies on Dream of the Red Chamber",
      note:"《红楼梦》除了小说文本，也常以人物册页和绣像流传，让读者从画面进入大观园的世界。",
      noteEn:"Dream of the Red Chamber also circulated through portrait albums and illustrations, allowing readers to enter its world through images.",
      learnMoreZh:"《红楼梦》是清代曹雪芹所著的长篇小说，也通过绣像、人物册页与连环图画等形式流传。人物服饰、室内陈设和园林空间由此成为读者理解和想象小说世界的一部分。[1]\n\n《红楼梦赋图册》属于这类图文读本：清代沈谦作二十首题咏《红楼梦》的赋文，盛昱录写并配以插图，内容包括葬花赋、芦雪亭赏雪赋等篇目。[2] 在本章的人物设定中，这类图册是沈家书房的日常读物，蕙兰小时候曾观看其中的人物、服饰和陈设。",
      learnMoreEn:"Dream of the Red Chamber is a Qing-dynasty novel by Cao Xueqin that also circulated through portraits, album leaves, and sequential illustrations. Clothing, interiors, and garden spaces therefore became part of how readers understood and imagined the novel's world.[1]\n\nThe Illustrated Album of Rhapsodies on Dream of the Red Chamber belongs to this illustrated reading culture. It pairs illustrations with twenty rhapsodies on the novel composed by the Qing scholar Shen Qian and transcribed by Sheng Yu, including pieces on burying flowers and viewing snow at the Lu Xue Pavilion.[2] In this chapter's fictional history, books of this kind form part of the Shen family's everyday reading, and Huilan looks at their figures, clothing, and interiors as a child.",
      image:"assets/references/ch1-gallery/1.jpg",
      sourceZh:"[2] 书格：《红楼梦赋图册》",
      sourceEn:"[2] Shuge: Illustrated Album of Rhapsodies on Dream of the Red Chamber",
      sourceUrl:"https://www.shuge.org/view/hong_lou_meng_fu_tu_ce/"
    }
  ],
  [
    {
      id:"ch02-dazibao", xPx:1107, yPx:292,
      zh:"大字报", en:"Dàzìbào (“Big-character Poster”)",
      note:"大字报把政治指控写成公开文字，张贴在学校、单位和街头，供人围观、转抄和表态。",
      noteEn:"Dàzìbào made political accusations public in schools, workplaces, and streets, where people were expected to read, copy, and take a position on them.",
      learnMoreZh:"大字报把政治指控写成可供公开张贴、围观和传播的文字。左侧“宣扬封建糟粕，毒害革命青年”不是司法罪名，而是文革语境中的政治定性：古代文学、旧书和传统学问可被指称为将学生引向“封建”或“资产阶级”立场的有害思想。教师可能因讲授古典作品、保护旧书，或被认为同情传统文化、影响青年思想而受到此类指控。\n\n右侧口号把针对个人的批判纳入更大的运动语言。“资产阶级反动路线”指被认定背离毛泽东路线、压制群众运动的政治路线；“牛鬼蛇神”是文革中广泛用于所谓反动学术权威、地富反坏右、走资派和其他被打击对象的侮辱性标签。这类政治定性把教师从原有的职业和社会关系中剥离出来，转变为需要公开批判的对象。\n\n在本章场景中，大字报写有沈鸿礼的姓名、任教情况和相关指控；蕙兰在学校走廊里看到这张大字报。",
      learnMoreEn:"Dàzìbào turned political accusations into texts that could be posted, viewed, and circulated in public. The accusation on the left, “promoting feudal dross and poisoning revolutionary youth,” was not a legal charge but a Cultural Revolution political designation. Classical literature, old books, and traditional scholarship could be described as harmful ideas leading students toward “feudal” or “bourgeois” positions. Teachers could face such accusations for teaching classical works, protecting old books, or being considered sympathetic to traditional culture.\n\nThe slogans on the right place an accusation against an individual within the movement's broader political language. “Bourgeois reactionary line” referred to a political line judged to oppose Mao's line and suppress mass mobilization. “Cow demons and snake spirits” was an abusive label applied to so-called reactionary academic authorities, designated class enemies, capitalist-roaders, and other targets. Such designations stripped teachers of their former professional and social identities and recast them as objects of public denunciation.\n\nIn this chapter's scene, the poster names Shen Hongli, identifies his teaching work, and lists the accusations against him; Huilan encounters it in a school corridor.",
      image:"https://upload.wikimedia.org/wikipedia/commons/1/17/1967-04_1967%E5%B9%B4%E5%A4%A7%E5%AD%97%E6%8A%A5.jpg",
      sourceZh:"《人民画报》1967年 · 公有领域，经 Wikimedia Commons",
      sourceEn:"China Pictorial, 1967 · Public domain, via Wikimedia Commons",
      sourceUrl:"https://commons.wikimedia.org/wiki/File:1967-04_1967%E5%B9%B4%E5%A4%A7%E5%AD%97%E6%8A%A5.jpg",
    },
    {
      id:"ch02-red-guard-poster", xPx:1027, yPx:596,
      zh:"红卫兵", en:"Red Guards",
      note:"红卫兵宣传画把青年塑造成警惕、服从毛泽东著作并随时准备投入斗争的集体形象。",
      noteEn:"Red Guard posters presented young people as a collective force: vigilant, loyal to Mao Zedong’s writings, and ready for struggle.",
      learnMoreZh:"红卫兵是文革初期由学生和青年组成的群众组织，1966年迅速扩张。他们以“破四旧”、批判所谓资产阶级和旧文化为名，参加抄家、游行、贴大字报、批斗教师和干部等行动；运动很快发展出派性冲突和暴力，后来由军队和各级革委会逐步接管秩序。\n\n这张《早已森严壁垒 更加众志成城》约制于1969年。红、黑、白的高对比便于快速印刷和远距离识读；举枪、持望远镜、举《毛泽东选集》和集体前进的姿态，把青年群众塑造成高度警惕、服从毛泽东著作、准备斗争的政治形象。",
      learnMoreEn:"The Red Guards were mass organizations made up largely of students and young people in the early Cultural Revolution, expanding rapidly in 1966. In the name of destroying the Four Olds and criticizing bourgeois or old culture, they took part in house searches, marches, big-character posters, and struggle sessions against teachers and officials. The movement soon developed factional conflict and violence, and order was gradually taken over by the army and revolutionary committees.\n\nThis poster, Already Heavily Fortified, Our Wills Unite Like a Fortress, dates to around 1969. The red-black-white contrast supports quick printing and legibility at a distance; rifles, binoculars, a raised Selected Works of Mao Zedong, and forward collective movement present young masses as vigilant, loyal to Mao Zedong’s writings, and ready for struggle.",
      image:"assets/references/ch2-gallery/1.jpg",
      captionZh:"早已森严壁垒，更加众志成城",
      captionEn:"Already Heavily Fortified, Our Wills Unite Like a Fortress",
      sourceZh:"《早已森严壁垒 更加众志成城》宣传画复制品 · C004186 · The Collector's Guild",
      sourceEn:"Reproduction of Already Heavily Fortified, Our Wills Unite Like a Fortress · C004186 · The Collector's Guild",
      sourceUrl:"https://www.germanmilitaria.com/OtherNations/photos/C004186.html",
      gallery:[
        {
          image:"assets/references/ch2-gallery/e15-569.jpg",
          zh:"坚决打倒党内头号走资本主义道路的当权派！彻底粉碎资本主义复辟的反革命逆流！",
          en:"Resolutely smash the number one power holders in the Party that follow the capitalist road! Thoroughly crush the counterrevolutionary adverse current of capitalist restoration!",
          metaZh:"1966年｜太原区大专中院校革命红卫兵代表政治工作会议筹备处｜右下角人物包括被作为“走资派”表现的刘少奇和邓小平",
          metaEn:"1966 · Preparatory Office for a political work conference of Red Guard representatives in the Taiyuan region · Liu Shaoqi and Deng Xiaoping appear among the “capitalist-roaders” in the lower-right corner",
          credit:"BG E15/569 · Chineseposters.net · Landsberger collection",
          href:"https://chineseposters.net/posters/e15-569"
        },
        {
          image:"assets/references/ch2-gallery/e39-557.jpg",
          zh:"毛主席万岁，红卫兵万岁",
          en:"Long live Chairman Mao, long live the Red Guards",
          metaZh:"1967年｜上海多个红卫兵组织｜画面文字“我支持你们！”",
          metaEn:"1967 · several Red Guard groups in Shanghai · the poster reads “I support you!”",
          credit:"BG E39/557 · Chineseposters.net · IISH collection",
          href:"https://chineseposters.net/posters/e39-557"
        },
        {
          image:"assets/references/ch2-gallery/pc-1968-009.jpg",
          zh:"红卫兵杀向美帝苏修——世界打倒美帝苏修",
          en:"Red Guards Charge at U.S. Imperialism and Soviet Revisionism — People of the World, Down with U.S. Imperialism and Soviet Revisionism",
          metaZh:"1968年｜“红卫兵万岁”大会筹备处设计｜出版单位不详",
          metaEn:"1968 · designed by the Preparatory Committee for the “Long Live the Red Guards” meeting · publisher unknown",
          credit:"PC-1968-009 · Chineseposters.net · Private collection",
          href:"https://chineseposters.net/posters/pc-1968-009"
        },
        {
          image:"assets/references/ch2-gallery/beat-the-whites-red-wedge.png",
          zh:"《用红楔子击打白军！》（Klinom krasnym bey belykh!）",
          en:"Beat the Whites with the Red Wedge (Klinom krasnym bey belykh!)",
          metaZh:"1919–1920年｜埃尔·利西茨基（El Lissitzky）｜跨时空视觉致意，并非红卫兵宣传画",
          metaEn:"1919–1920 · El Lissitzky · a transhistorical visual homage, not a Red Guard poster",
          descriptionZh:"这幅俄国内战时期的布尔什维克宣传画以至上主义的抽象语言传达政治冲突：红色楔形代表红军，刺入象征反布尔什维克白军的白色圆形；斜向文字、尖锐几何形与红、白、黑三色把阅读方向变成一次进攻动作。第二章画面借鉴的是这种以极少形状制造冲击、对立和革命动势的构图方法，而不是它的具体历史事件。它与上方1960年代中国红卫兵宣传画并非同一时期、同一运动或同一类型的历史材料。",
          descriptionEn:"This Russian Civil War Bolshevik poster turns Suprematist abstraction into political narrative: a red wedge representing the Red Army pierces a white circle associated with the anti-Bolshevik White forces. Diagonal lettering, sharp geometry, and a red-white-black palette make reading itself follow the direction of attack. Chapter 2 pays homage to this economy of form and its sense of collision and revolutionary momentum, not to the poster's specific historical event. It is not from the same period, movement, or category as the 1960s Chinese Red Guard posters above.",
          creditZh:"来源：Wikimedia Commons · El Lissitzky，1919年 · 公有领域",
          creditEn:"Source: Wikimedia Commons · El Lissitzky, 1919 · Public domain",
          href:"https://commons.wikimedia.org/wiki/File:Beat_the_Whites_with_the_Red_Wedge.png",
          kind:"homage"
        }
      ],
    },
    {
      id:"ch02-fractured-childhood-memory", xPx:389, yPx:265,
      zh:"破四旧", en:"Destroy the Four Olds",
      note:"“破四旧”把旧思想、旧文化、旧风俗和旧习惯列为批判对象，旧书和家庭旧藏常因此受冲击。",
      noteEn:"The “Destroy the Four Olds” campaign targeted old ideas, culture, customs, and habits, putting old books and family possessions at risk.",
      learnMoreZh:"“抄家”是红卫兵以搜查“四旧”和所谓“不义之财”为名，闯入私人住宅，查找、没收或毁坏书籍、字画、古董和日用品；行动常伴随殴打、羞辱与强制驱逐。1966年8月18日毛泽东首次接见红卫兵后，抄家在北京急剧升级，并在8月下旬迅速扩展到上海等城市。北京在一个多月内至少有33,695户被抄、85,196人被驱逐；上海仅8月23日至9月8日就有84,222户被抄。运动高峰集中在1966年8至9月，之后查抄与没收仍有延续。[1][2][3]\n\n被查抄的并不只是所谓“反革命证据”。书籍、字画、古董、钟表、钢琴、地毯、首饰和日用品也可能被归为“封建”或“资产阶级”物品。查抄所得被装车送往工厂、学校、政府机关或临时仓库，经过登记、封存和分类，再进入保管、调拨、转售、出口或发还程序。研究显示，天津的查抄物资一度占用52座仓库、约6万平方米；保存不善又使部分衣物、书画遭雨水和霉变损毁。[4]\n\n马传德的回忆显示，上海一些资本家和小业主家庭的书籍、字画、钱币与印章被抄走。为了避免财物落入抄家者手中，有人事先转移或自行毁坏贵重物品；到20世纪80年代办理发还时，许多藏品已经散失、损坏或无法认领。[5] 各地对象、范围和做法不同，并带有很大任意性。旧书、月份牌和家庭旧藏可能被查抄、停售、封存或毁损；现有材料不支持“所有《康熙字典》均被销毁”的说法。[6][7]\n\n在本章的人物设定中，沈家的月份牌被撕碎，《康熙字典》被泼墨焚烧。两件物品分别与家庭日常图像和蕙兰学习自己姓名的记忆相连，又一同被运动归入需要清除的“旧”。\n\n注释：[1] Barbara Mittler梳理“破四旧”的时间与范围，并列出北京33,695户被抄等统计。[2] 丁大华记载上海1966年8月23日至9月8日被抄84,222户。[3] Sciences Po年表记录1966年8月下旬北京红卫兵向全国主要城市传播暴力行动。[4] UC Berkeley Social Science Matrix对Puck Engman的访谈梳理了查抄物资的登记、仓储、处置和发还。[5] 马传德《文革抄家见闻录》回忆上海的查抄与发还。[6] 中发〔67〕158号及新华书店记录反映查抄、封存与停售。[7] 1970年9月17日，周恩来在辞书会议上谈到《新华字典》与《康熙字典》的继承关系。沈家所藏字典的具体遭遇属于人物设定。",
      learnMoreEn:"House raids were carried out by Red Guards in the name of searching for the Four Olds and so-called ill-gotten wealth. They entered private homes and searched for, confiscated, or destroyed books, paintings, antiques, and everyday possessions; raids were often accompanied by beatings, humiliation, and forced expulsion. After Mao Zedong's first mass reception of Red Guards on 18 August 1966, raids escalated sharply in Beijing and spread rapidly to Shanghai and other cities later that month. In just over a month, at least 33,695 Beijing households were raided and 85,196 people were expelled. In Shanghai, 84,222 households were raided between 23 August and 8 September. The peak came in August and September 1966, although searches and confiscations continued afterward.[1][2][3]\n\nWhat was taken was not limited to supposed evidence of counterrevolution. Books, paintings, antiques, watches, pianos, rugs, jewelry, and everyday goods could be classified as “feudal” or “bourgeois.” Confiscated property was trucked to factories, schools, government offices, and improvised warehouses, where it was inventoried, sealed, sorted, stored, reassigned, resold, exported, or eventually returned. In Tianjin, the seized goods once occupied 52 warehouses covering roughly 60,000 square metres; poor storage exposed some clothing, books, and paintings to rain and mildew.[4]\n\nMa Chuande's recollections describe books, paintings, coins, and seals being removed from the homes of capitalists and small business owners in Shanghai. Some families moved or destroyed valuables before a raid; when restitution was organized in the 1980s, many collections had already been dispersed, damaged, or rendered impossible to identify.[5] Targets and methods varied by place and were often arbitrary. Old books, yuefenpai, and family collections could be confiscated, withdrawn from sale, sealed away, or destroyed; available evidence does not support the claim that every copy of the Kangxi Dictionary was destroyed.[6][7]\n\nIn this chapter's fictional history, the Shen family's yuefenpai is torn apart and its Kangxi Dictionary is splashed with ink and burned. The two objects are connected respectively to domestic imagery and to Huilan's memory of learning the characters in her name, but both are classified by the campaign as “old” objects to be removed.\n\nNotes: [1] Barbara Mittler surveys the timing and scope of the campaign and cites the figure of 33,695 Beijing households raided. [2] Ding Dahua records 84,222 Shanghai households raided from 23 August to 8 September 1966. [3] The Sciences Po chronology documents the spread of Red Guard violence from Beijing to major cities in late August 1966. [4] UC Berkeley Social Science Matrix's interview with Puck Engman traces the inventorying, storage, disposal, and restitution of confiscated objects. [5] Ma Chuande's “Recollections of Cultural Revolution House Raids” describes confiscation and later restitution in Shanghai. [6] Central Document No. 158 and Xinhua Bookstore records document confiscation, sequestration, and withdrawal. [7] On 17 September 1970, Zhou Enlai discussed the relationship between the Xinhua Dictionary and the Kangxi Dictionary. The fate of the Shen family's copy is fictional.",
      galleryIntroZh:"以下图像并置公开焚烧、查抄清单与封存物证：抄家不仅发生在住宅现场，也通过登记、封条、仓库和后续处置形成一套物品流转过程。",
      galleryIntroEn:"These images pair scenes of public destruction with inventories and sealed evidence. House raids extended beyond the home into documentation, storage, and the later disposal or restitution of property.",
      gallery:[
        {
          image:"https://static01.nyt.com/images/2016/09/29/world/29CHINAWOESER03/29CHINAWOESER03-jumbo-v3.jpg?quality=75&auto=webp",
          zh:"拉萨焚烧佛教经文",
          en:"Burning Buddhist scriptures in Lhasa",
          metaZh:"1966年8月24日",
          metaEn:"24 August 1966",
          creditZh:"摄影：Tsering Dorje；来源：《纽约时报》",
          creditEn:"Photograph by Tsering Dorje; source: The New York Times",
          href:"https://www.nytimes.com/2016/10/04/world/asia/tibet-china-cultural-revolution-photographs.html"
        },
        {
          image:"https://static01.nyt.com/images/2008/09/04/arts/24772075.JPG?quality=75&auto=webp&disable=upscale",
          zh:"文化大革命中的破坏行动",
          en:"Destruction during the Cultural Revolution",
          metaZh:"原图说明与署名见《纽约时报》图集第5张",
          metaEn:"See slide 5 of the New York Times gallery for the original caption and credit",
          creditZh:"来源：《纽约时报》“Art and China's Revolution”图集",
          creditEn:"Source: The New York Times, Art and China's Revolution gallery",
          href:"https://www.nytimes.com/slideshow/2008/09/05/arts/20080905-REVO_index/s/20080905-REVO_slide5.html"
        },
        {
          image:"assets/references/ch2-gallery/house-raid-evidence-01.jpg",
          zh:"把查抄所得统计为“辉煌战果”",
          en:"A newspaper tally presents confiscated property as “battle achievements”",
          metaZh:"上海红卫兵查抄物资统计；原转载页未注明报刊与日期",
          metaEn:"A Shanghai Red Guard tally; the republished source does not identify the newspaper or date",
          descriptionZh:"材料把武器、证件、收音机、金银首饰、外币和古玩玉器等不同物品并列统计，显示私人财物如何被政治化并计入运动“战果”。",
          descriptionEn:"Weapons, documents, radios, precious metals, foreign currency, jewelry, antiques, and jade are counted together, showing how private possessions were politicized and recorded as campaign “achievements.”",
          creditZh:"来源：马传德《文革抄家见闻录》，禁闻网转载",
          creditEn:"Source: Ma Chuande, “Recollections of Cultural Revolution House Raids,” republished by Bannedbook.org",
          href:"https://www.bannedbook.org/bnews/lifebaike/20240210/1999437.html"
        },
        {
          image:"assets/references/ch2-gallery/house-raid-evidence-02.jpg",
          zh:"红卫兵《查抄物资清单》封面",
          en:"Red Guard inventory covers for confiscated property",
          metaZh:"“北京革命造反联合委员会”查抄清单与另一册《抄家物品清单》",
          metaEn:"An inventory from the Beijing Revolutionary Rebel Joint Committee and another “House-Raid Property List”",
          descriptionZh:"清单封面留下组织名称、物品类别与盖章痕迹，说明抄家除现场搜掠与毁坏外，还伴随登记、分类和后续处置。",
          descriptionEn:"Organization names, property categories, and seals show that raids involved not only searching and destruction but also documentation, classification, and later disposition.",
          creditZh:"来源：马传德《文革抄家见闻录》，禁闻网转载",
          creditEn:"Source: Ma Chuande, “Recollections of Cultural Revolution House Raids,” republished by Bannedbook.org",
          href:"https://www.bannedbook.org/bnews/lifebaike/20240210/1999437.html"
        },
        {
          image:"assets/references/ch2-gallery/tianjin-confiscated-possessions.jpg",
          zh:"天津封存的查抄物资箱",
          en:"A sealed suitcase containing confiscated possessions in Tianjin",
          metaZh:"箱面附有“抄家清单”，列出字画、玉器、瓷器及被抄对象",
          metaEn:"The attached inventory lists paintings and calligraphy, jade, porcelain, and the targeted household",
          descriptionZh:"封条和清单把住宅中的私人物品转成可搬运、入库和追踪的“查抄物资”。研究显示，天津的查抄物资一度占用52座仓库、约6万平方米。",
          descriptionEn:"Seals and an inventory transformed household possessions into movable, storable, and trackable “confiscated property.” Research indicates that such goods once occupied 52 warehouses—about 60,000 square metres—in Tianjin.",
          creditZh:"来源：UC Berkeley Social Science Matrix；Puck Engman访谈",
          creditEn:"Source: UC Berkeley Social Science Matrix; interview with Puck Engman",
          href:"https://live-ssmatrix.pantheon.berkeley.edu/research-article/confiscated-objects-of-the-cultural-revolution-a-visual-interview-with-puck-engman/"
        }
      ],
    }
  ],
  [
    {
      id:"ch03-commune-poster", x:50, y:62, zh:"上山下乡的宣传海报", en:"Up to the Mountains Propaganda Poster",
      note:"上山下乡宣传画把农村描绘成青年接受再教育、扎根成长并带去知识技术的理想去处。", noteEn:"Up to the Mountains posters pictured the countryside as an ideal place for young people to be re-educated, take root, and bring knowledge and skills.",
      learnMoreZh:"“上山下乡”宣传画通常采用明亮色彩、集体劳动和青年出发的姿态，把下乡表现为主动接受“再教育”、扎根农村并支援农业建设。画面中的知青携带行李和农具，在贫下中农的引导下劳动、学习，并被塑造成“有文化的新型农民”。列车、红旗、日出、春景、笑容与昂扬的身体姿态共同制造一种充满希望的启程叙事。\n\n宣传图像与实际经验之间存在明显距离。1968年以后，大批城市青年在政策安排下离开城市，个人通常难以选择去向。各地生活条件不同；高强度劳动、口粮和住房压力、疾病、城乡关系中的摩擦、家庭分离，以及漫长而不确定的返城过程，是许多知青经历中的具体问题。宣传画很少呈现这些困难，也不呈现青年对去留缺乏决定权。\n\n本章的水田场景有意把宣传画省略的部分放回日常：湿冷的田地、重复的体力劳动、工分、口粮分配和政治学习。下列图片是理解政策如何描述自身的视觉材料，不是知青生活状况的直接记录。",
      learnMoreEn:"Up to the Mountains and Down to the Countryside posters typically used bright colors, collective labor, and images of young people setting out to present relocation as a voluntary commitment to “re-education,” rural settlement, and agricultural development. Educated youth appeared with luggage and farm tools, working and studying under the guidance of poor and lower-middle peasants and becoming “new-style educated peasants.” Trains, red flags, sunrises, spring scenery, smiles, and confident poses combined to create a hopeful story of departure.\n\nThere was a clear distance between this imagery and lived experience. After 1968, large numbers of urban young people left the cities under state policy and usually had little control over their destination. Conditions differed by region, but intensive labor, pressure on food and housing, illness, friction with rural communities, family separation, and a long and uncertain path back to the cities shaped many sent-down youths' lives. The posters rarely showed these hardships or the limited power young people had over whether they left or stayed.\n\nThis chapter's rice-field scene deliberately restores what the posters omit: wet and cold fields, repetitive physical labor, work points, grain distribution, and political study. The images below document how the policy represented itself; they are not direct records of everyday life in the countryside.",
      galleryIntroZh:"以下五幅宣传画以红旗、日出、春色、笑容和集体劳动构成充满希望的农村图景。逐图阅读时，也要留意画面没有呈现的艰苦劳动、物资压力、城乡摩擦与返城困难。",
      galleryIntroEn:"These five posters use red flags, sunrises, spring color, smiles, and collective labor to construct a hopeful rural world. Read them alongside what they leave out: exhausting work, material scarcity, rural-urban friction, and difficulty returning home.",
      gallery:[
        {
          image:"assets/references/ch3-gallery/上山下乡.jpg",
          zh:"上山下乡运动主题宣传画",
          en:"Up to the Mountains and Down to the Countryside propaganda poster",
          descriptionZh:"青年、贫下中农、地图、红旗和语录共同构成团结而自信的集体形象。画面把“再教育”表现为主动扎根农村的革命使命。",
          descriptionEn:"Educated youth, peasants, a map, a red flag, and political texts form a confident collective. Re-education is presented as a voluntary revolutionary mission to take root in the countryside.",
          creditZh:"来源：百度百科“插队”；Chineseposters.net 上山下乡主题说明",
          creditEn:"Sources: Baidu Baike, “Chadui”; Chineseposters.net, Up to the Mountains and Down to the Countryside",
          href:"https://baike.baidu.com/item/%E6%8F%92%E9%98%9F/2912986"
        },
        {
          image:"assets/references/ch3-gallery/e39-184.jpg",
          zh:"《立志做一辈子农民》",
          en:"Determined to Be a Peasant for Life",
          metaZh:"约1968年，设计者不详，北京出版者不详",
          metaEn:"Circa 1968, designer unknown, unidentified Beijing publisher",
          descriptionZh:"女知青牵牛扶犁，面带笑容，人物从低视点显得强健而坚定。标题把下乡描述为终身志愿，却没有呈现政策安排下个人选择的有限性。",
          descriptionEn:"A smiling young woman grips a plow beside an ox, viewed from below to appear strong and resolute. The title frames rural settlement as a lifelong aspiration while omitting how little choice many young people had.",
          creditZh:"来源：Chineseposters.net，IISH馆藏，编号BG E39/184",
          creditEn:"Source: Chineseposters.net, IISH collection, BG E39/184",
          href:"https://chineseposters.net/posters/e39-184"
        },
        {
          image:"assets/references/ch3-gallery/e15-35.jpg",
          zh:"《知识青年到农村去，接受贫下中农的再教育！》",
          en:"Educated Youth Must Go to the Countryside to Receive Re-education",
          metaZh:"1969年4月，四川美术学院革命委员会，四川人民出版社",
          metaEn:"April 1969, Sichuan Fine Arts College Revolutionary Committee, Sichuan People's Publishing House",
          descriptionZh:"知青与贫下中农并肩站在日出和群众队伍前，人物手持语录、农具和书本。画面把政治学习、农业劳动与光明未来合并为同一个愿景。",
          descriptionEn:"Educated youth and a peasant stand before a sunrise and a mass procession, holding political texts, tools, and books. Political study, farm labor, and a radiant future are compressed into one vision.",
          creditZh:"来源：Chineseposters.net，Landsberger馆藏，编号BG E15/35",
          creditEn:"Source: Chineseposters.net, Landsberger collection, BG E15/35",
          href:"https://chineseposters.net/posters/e15-35"
        },
        {
          image:"assets/references/ch3-gallery/e16-331.jpg",
          zh:"《到农村去，到边疆去，到祖国最需要的地方去》",
          en:"Go to the Countryside, the Border Areas, Where the Motherland Needs You Most",
          metaZh:"1970年2月，设计者不详，上海市革命组",
          metaEn:"February 1970, designer unknown, Shanghai Municipal Revolutionary Group",
          descriptionZh:"青年从驶离上海的列车窗口挥手，红旗、语录和延伸的车厢把离开城市塑造成热烈而自愿的集体奔赴。家庭分离、未知去向和长期安置并未进入画面。",
          descriptionEn:"Young people wave from a train departing Shanghai. Red flags, Mao quotations, and receding carriages turn departure into an enthusiastic collective journey, leaving family separation and uncertain long-term resettlement outside the frame.",
          creditZh:"来源：Chineseposters.net，IISH馆藏，编号BG E16/331",
          creditEn:"Source: Chineseposters.net, IISH collection, BG E16/331",
          href:"https://chineseposters.net/posters/e16-331"
        },
        {
          image:"assets/references/ch3-gallery/e15-178.jpg",
          zh:"《春风杨柳》",
          en:"Willows in the Spring Breeze",
          metaZh:"1975年7月，周树桥，人民美术出版社",
          metaEn:"July 1975, Zhou Shuqiao, People's Fine Arts Publishing House",
          descriptionZh:"刚到农村的城市青年围坐进餐，行李、草帽与热水瓶暗示旅途和安置，人物神情轻松，室内充满欢迎气氛。“春风”把迁移比作充满生机的新开始。",
          descriptionEn:"Newly arrived urban youth eat together beside luggage, straw hats, and thermos flasks. Relaxed faces and a welcoming room turn resettlement into a lively new beginning, captured by the title's image of a spring breeze.",
          creditZh:"来源：Chineseposters.net，Landsberger馆藏，编号BG E15/178",
          creditEn:"Source: Chineseposters.net, Landsberger collection, BG E15/178",
          href:"https://chineseposters.net/posters/e15-178"
        }
      ]
    }
  ],
  [
    { x:51, y:13, zh:"政治标语", en:"Political Slogans",
      note:"政治口号长期悬挂在会议室，使政策语言成为集体生活的固定环境。", noteEn:"Political slogans remained on meeting-room walls, making official language a permanent part of collective life.",
      id:"ch04-slogans",
      learnMoreZh:"文革期间，机关、学校、商店和生产队等集体场所普遍悬挂政治标语和语录牌。内容随运动阶段更换，版式与悬挂位置则相对固定，长期占据公共空间中的醒目位置。\n\n“早请示、晚汇报”是1966年至1971年间多地流行的日常政治仪式：开工、开会或出工前，集体面对毛泽东画像诵读语录，表示按“最高指示”行动；收工或会议结束时，再汇报一天的思想和工作。政治表态由此进入早晚作息，并持续规定人们在会议室、生产队和单位中应当怎样说话、怎样表明立场。\n\n在本章场景中，批判和检讨在这些长期悬挂的标语下反复进行；墙面陈设较少改变，每一轮被点名的人却可能不同。\n\n注释：“早请示、晚汇报”的流行时段及仪式内容可参见<a class=\"context-lead-note-source\" href=\"https://zh.wikipedia.org/wiki/%E6%97%A9%E8%AF%B7%E7%A4%BA%E3%80%81%E6%99%9A%E6%B1%87%E6%8A%A5\" target=\"_blank\" rel=\"noopener noreferrer\">中文维基百科相应词条</a>。",
      learnMoreEn:"During the Cultural Revolution, political slogans and quotation boards were widely displayed in offices, schools, shops, and production teams. Their wording changed with different phases of the movement, while their format and placement remained relatively fixed in prominent parts of public space.\n\nBetween 1966 and 1971, many workplaces practiced “morning request, evening report” (zǎo qǐngshì, wǎn huìbào). Before work or meetings, groups faced a portrait of Mao, recited quotations, and declared that they would follow the “highest directives.” After work, they reported on the day's labor and their political thinking. Political declarations were thus built into daily routines and helped define how people were expected to speak and state their position in workplaces and production teams.\n\nIn this chapter's scene, criticism and self-criticism take place repeatedly beneath the same slogans. The wall display changes little, while the person singled out may change from one meeting to the next.\n\nNote: For the period and content of this ritual, see the Chinese Wikipedia entry “Zǎo Qǐngshì Wǎn Huìbào” (“Morning Request, Evening Report”)."
    },
    { x:50, y:40, zh:"领袖像", en:"Portrait of Mao Zedong",
      note:"毛泽东画像在机关、学校和公社会议室中通常占据正面或中心位置。", noteEn:"Portraits of Mao Zedong commonly occupied the front wall or visual center in offices, schools, and commune meeting spaces.",
      id:"ch04-mao-portrait",
      learnMoreZh:"毛泽东的形象并不只悬挂在会议室。文革时期，它进入机关、学校、工厂、公社、商店、街道和家庭，也被印在课本、证件、书刊与日用品上。大幅画像通常占据正面墙或视觉中心；在普通物件上，同一张脸又以更小、更频繁的尺度反复出现。\n\n头像之外，还有一整套彼此呼应的视觉和文字物件：《毛主席语录》、毛泽东选集、语录牌、政治标语、像章、塑像，以及印有语录或革命歌曲的日记本和文具。报刊、学习笔记、日记等书写也常以毛语录或“最高指示”开头。\n\n“早请示、晚汇报”把这些物件组织成日常仪式。开工、开会或出工前，人们面对画像诵读语录并“请示”；收工后再汇报思想和工作。画像不只是墙面装饰，也成为每日政治表态的对象。\n\n本章中的画像位于会议室中心。下列材料进一步显示，同一张脸也进入公共教育、婚姻登记、家庭陈设与私人书写。",
      learnMoreEn:"Mao Zedong's image was not confined to meeting rooms. During the Cultural Revolution it entered government offices, schools, factories, communes, shops, streets, and homes. It was also printed on textbooks, certificates, publications, and everyday objects. Large portraits occupied front walls or visual centers; on ordinary documents, the same face reappeared at a smaller and more frequent scale.\n\nThe portrait belonged to a wider system of images and texts: Quotations from Chairman Mao, the Selected Works, quotation boards, political slogans, badges, statues, and notebooks or stationery printed with quotations and revolutionary songs. Newspapers, study notes, and diaries also often opened with a Mao quotation or a “latest instruction.”\n\nThe “morning request, evening report” ritual organized these objects into daily practice. Before work or meetings, groups faced a portrait and recited quotations; afterward they reported on their thoughts and labor. The portrait was not merely decoration but an object of repeated political declaration.\n\nIn this chapter the portrait occupies the meeting room's center. The materials below show the same face entering public education, marriage registration, domestic display, and personal writing.",
      galleryIntroZh:"<strong>无处不在：公共教育、婚姻登记、家庭墙面与私人书写。</strong> 这些普通物件让毛泽东的形象出现在学习、结婚与记录生活的具体时刻。",
      galleryIntroEn:"<strong>Everywhere: public education, marriage registration, domestic walls, and personal writing.</strong> These ordinary objects place Mao Zedong's image inside studying, marrying, and recording daily life.",
      galleryIntroVariant:"ubiquity",
      gallery:[
        {
          image:"assets/references/ch4-mao-gallery/home-revolutionary-commitment.jpg",
          zh:"家庭墙面：画像进入私人生活空间",
          en:"Domestic wall: the portrait enters private life",
          metaZh:"《忆苦思甜》，1965年5月，盛水福，上海人民美术出版社",
          metaEn:"Remembering the Bitter, Thinking about the Sweet, May 1965, Sheng Shuifu, Shanghai People's Fine Arts Publishing House",
          descriptionZh:"毛泽东画像占据家庭正墙中央，政治形象由公共空间进入日常家居。",
          descriptionEn:"Mao's portrait occupies the central wall, carrying political imagery from public space into the home.",
          creditZh:"来源：Mao Era in Objects，伦敦国王学院数字人文部",
          creditEn:"Source: Mao Era in Objects, King's College London Department of Digital Humanities",
          href:"https://mao-static.kdl.kcl.ac.uk/sources/mao-posters-expression-revolutionary-commitment-household-members/index.html"
        },
        {
          images:[
            { src:"assets/references/ch4-mao-gallery/textbook-arithmetic.jpg", altZh:"《小学暂用课本 算术》第五册封面上的毛泽东头像", altEn:"Mao's portrait on the cover of a provisional primary-school arithmetic textbook" },
            { src:"assets/references/ch4-mao-gallery/textbook-english.jpg", altZh:"英语课文与书写练习中的毛泽东头像", altEn:"Mao's portrait in an English lesson and handwriting exercise" }
          ],
          zh:"公共教育：算术封面与英语练习中的毛泽东头像",
          en:"Public education: Mao's portrait in arithmetic and English textbooks",
          metaZh:"《小学暂用课本 算术》第五册与英语课本第八课，版次未详",
          metaEn:"Provisional Primary-School Arithmetic Textbook, Volume 5, and English textbook, Lesson Eight; editions unknown",
          descriptionZh:"一个让头像先于算术内容出现，另一个把头像与政治表达编入英语阅读、词汇和抄写练习。",
          descriptionEn:"One places the portrait before the arithmetic; the other builds the portrait and political language into English reading, vocabulary, and handwriting exercises.",
          creditZh:"来源：每日头条原图页面，用户提供藏图",
          creditEn:"Source: KK News image page; local image provided by the user",
          href:"https://kknews.cc/zh-my/history/eorj3o4.html"
        },
        {
          image:"assets/references/ch4-mao-gallery/marriage-cert.jpg",
          zh:"婚姻登记：结婚证上的毛泽东头像",
          en:"Marriage registration: Mao's portrait on a marriage certificate",
          metaZh:"1971年结婚证，德清县档案馆藏",
          metaEn:"Marriage certificate, 1971, Deqing County Archives",
          descriptionZh:"头像与“最高指示”进入证明夫妻关系的法律文书，使政治权威出现在个人生活的重要节点。",
          descriptionEn:"The portrait and a “highest instruction” enter the legal document certifying a marriage, placing political authority inside a major event in private life.",
          creditZh:"来源：德清新闻网，资料与图片来自德清县档案馆",
          creditEn:"Source: Deqing News; material and image from Deqing County Archives",
          href:"https://dqnews.zjol.com.cn/dqnews/system/2021/04/16/032987957.shtml"
        },
        {
          images:[
            { src:"assets/references/ch4-mao-gallery/liu-ping-diary-mao-quotation.jpg", altZh:"刘平日记中清晰印刷的毛主席语录页", altEn:"Clearly printed Mao quotation page in Liu Ping's diary" },
            { src:"assets/references/ch4-mao-gallery/liu-ping-diary-handwriting.jpg", altZh:"刘平日记中清晰可见的手写内页", altEn:"Clearly visible handwritten page from Liu Ping's diary" }
          ],
          zh:"私人书写：毛语录在前，日记正文在后",
          en:"Personal writing: Mao's quotation before the diary entries",
          metaZh:"刘平第二册日记，1971年至1972年",
          metaEn:"Liu Ping's second diary, 1971-1972",
          descriptionZh:"扉页预印毛主席语录“一不怕苦，二不怕死”，随后才进入清晰可见的个人手写记录。",
          descriptionEn:"A printed Mao quotation, “fear neither hardship nor death,” precedes the clearly visible handwritten entries.",
          creditZh:"来源：达特茅斯数字图书馆",
          creditEn:"Source: Dartmouth Digital Library",
          href:"https://collections.dartmouth.edu/archive/text/rusticated-youth-tei/diplomatic/Liu_Ping_2nd_Diary-diplomatic.html"
        }
      ]
    },
    {
      id:"ch04-inner-thoughts", xPx:420, yPx:640,
      variant:"text-group",
      zh:"心里的念头", en:"Thoughts Kept Inside",
      note:"沈蕙兰在上山下乡生活中没有说出口的心里话。",
      noteEn:"The thoughts she does not say aloud.",
      learnMoreZh:"原文：爹的信上個月沒來。\n我的手指又泡白了。\n我記得，小時候——\n我聽說，有人家裡……\n我今年二十六歲。\n我讀過五年大學！！\n娘上封信說家裡都好，「都好」兩個字写得很重。\n我記得《詩經》裡有一句——\n惠國今年要高中畢業了，我們不知道他會被分到哪。\n不明白。\n我不知道這樣的年头还有幾個。\n\n注释：《诗经》属于旧文学传统，与其他古典典籍一样，在“破四旧”期间可能被视为需要批判或搁置的对象；具体处境因地区、单位和个人而异。\n\n繁简夹写：这段文字以繁体为主，其中“写”“还”保留简体写法，是有意为之，并非笔误。沈蕙兰生于1944年，最初的识字和书写习惯形成于1956年《汉字简化方案》公布之前；简化字自1956年2月起分批推行，1964年《简化字总表》完成修订。一个在变革前学会写字、之后又长期在简化字环境中生活书写的人，笔下出现繁简混用，是这一代人可能有的书写经验。",
      learnMoreEn:"Original text (translated): Father’s letter didn’t come last month.\nMy fingers have gone soft and white again.\nI remember, when I was young——\nI heard, someone’s family……\nI am twenty-six this year.\nI studied five years at university!!\nMother’s last letter said everything at home was fine — the words “all fine” were written heavy on the page.\nI remember a line from the Book of Songs——\nHuiguo graduates high school this year; we don’t know where he’ll be assigned.\nI don’t understand.\nI don’t know how many more years like this there will be.\n\nNote: The Book of Songs belonged to the classical literary tradition and, like other classical texts, could be criticized or set aside during the Destroy the Four Olds campaign. Circumstances differed by place, work unit, and individual.\n\nMixed traditional and simplified characters: this text is written mostly in traditional characters, but two characters — “写” (write) and “还” (still) — appear in their simplified forms. This is intentional, not an error. Shen Huilan was born in 1944, and her literacy and early handwriting habits formed before the 1956 Chinese Character Simplification Scheme was issued. Simplified characters were introduced in stages starting February 1956, with the revised Complete List of Simplified Characters finalized in 1964. For someone who learned to write before that shift and then lived and wrote for years under simplified characters, a mix of both forms reflects the lived experience of her generation.",
      hideChapterContext:true
    },
    {
      id:"ch04-struggle-session-speech", xPx:1280, yPx:640,
      variant:"text-group",
      zh:"批判会发言", en:"Speech at the Struggle Session",
      note:"沈蕙兰在公社例行批判会上进行自我批评时的发言。",
      noteEn:"What Shen Huilan says during self-criticism at a routine struggle session in the commune.",
      learnMoreZh:"原文：思想改造是长期的任务。\n灵魂深处爆发革命，狠斗“私”字一闪念。\n知识分子必须与工农相结合。\n个人服从组织，局部服从整体。\n广阔天地，大有作为。\n接受贫下中农再教育是光荣的。\n\n注释：这些说法都是文革及上山下乡时期的常见政治用语，不指向某一次具体讲话。",
      learnMoreEn:"Original text (translated): Ideological remolding is a long-term task.\nRevolution must erupt in the depths of the soul — fight fiercely against every flicker of the word “self.”\nIntellectuals must integrate with workers and peasants.\nThe individual obeys the organization; the part obeys the whole.\nA vast world offers great opportunity.\nAccepting re-education from the poor and lower-middle peasants is an honor.\n\nNote: These phrases were common political language during the Cultural Revolution and the Up to the Mountains and Down to the Countryside movement; they are not quotations from one specific speech.",
      hideChapterContext:true
    }
  ],
  [],
  []
];

const CHAPTER_1_INDEX = 0;
const CHAPTER_2_INDEX = 1;
const CHAPTER_3_INDEX = 2;
const CHAPTER_4_INDEX = 3;
const CHAPTER_5_INDEX = 4;
const CHAPTER_6_INDEX = 5;
const CHAPTER_6_MEMORY_CUES = [
  {
    id:"books", order:0, xPx:260, yPx:445, widthPx:500, heightPx:400, radiusPx:255, thoughtPosition:"center",
    openingHold:5000,
    thoughtZh:"书一排一排立在橱窗里，展示着……我们家那些，是烧掉的。",
    thoughtEn:"The books stand in rows in the window, on display...\nOurs were burned."
  },
  {
    id:"hair", order:1, xPx:583, yPx:564, widthPx:208, heightPx:268, radiusPx:138, thoughtPosition:"center",
    openingHold:10000,
    thoughtZh:"风把她的头发吹起来……我的长发，在下乡的第一个月剪了，没法打理。辫梢的蝴蝶，飞走了。",
    thoughtEn:"The wind lifts her hair... Mine was cut short in my first month at the farm. There was no way to keep it. The butterflies at the end of my braids flew away."
  },
  {
    id:"conversation", order:2, xPx:1257, yPx:555, widthPx:312, heightPx:216, radiusPx:176, thoughtPosition:"center",
    openingHold:7000,
    thoughtZh:"他们轻轻松松，说说笑笑……话到嘴边，不必先在脑子里转一圈。",
    thoughtEn:"They are chatting with such ease, as if words can reach the mouth\nwithout turning circles in the mind first."
  },
  {
    id:"cat", order:3, xPx:1490, yPx:790, widthPx:350, heightPx:270, radiusXPx:190, radiusYPx:155, thoughtPosition:"center",
    openingHold:7000,
    thoughtZh:"猫慢悠悠地走过去，像是在巡自己的地盘……一拐，就没进树影里了。",
    thoughtEn:"The cat strolls past, as if the ground already belongs to it.\nThen it turns and slips into the shadow of a tree."
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
        reducedMotionStill:"assets/chapters/motion/ch4-mao-glow-still.png",
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
const epilogueCta = epilogueScreen?.querySelector(".epilogue-cta");
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
const isTouchDevice = document.documentElement.classList.contains("is-touch-device");
const navButtonPrev = document.querySelector(".timeline-arrow-prev");
const navButtonNext = document.querySelector(".timeline-arrow-next");
const timelineStops = [...document.querySelectorAll(".timeline-stop")];
const contextToggle = document.getElementById("context-toggle");
const contextPanel = document.getElementById("context-panel");
const contextCollapse = document.getElementById("context-collapse");
const contextContent = document.getElementById("context-content");
const imageLightbox = document.getElementById("image-lightbox");
const imageLightboxImg = imageLightbox?.querySelector(".image-lightbox-img");
const imageLightboxCaption = imageLightbox?.querySelector(".image-lightbox-caption");
const imageLightboxBackdrop = imageLightbox?.querySelector(".image-lightbox-backdrop");

// 全文阅读期间背景音效和动态图层都不该继续播放——进全文阅读前统一暂停，
// 退出时再按当前章节把它们唤醒，不写死某一章。
function stopAllChapterAmbient() {
  stopChapter1Ambient();
  stopChapter2Loop();
  stopChapter3Loop();
  stopChapter4Ambient();
  stopChapter5Loop();
  stopChapter6Ambient();
}
function resumeCurrentChapterAmbient() {
  if (!soundEnabled) return;
  if (chapterIndex === CHAPTER_1_INDEX) revealChapter1Ambient();
  if (chapterIndex === CHAPTER_2_INDEX) revealChapter2Loop();
  if (chapterIndex === CHAPTER_3_INDEX) revealChapter3Loop();
  if (chapterIndex === CHAPTER_4_INDEX) revealChapter4Ambient();
  if (chapterIndex === CHAPTER_5_INDEX) revealChapter5Loop();
  if (chapterIndex === CHAPTER_6_INDEX) revealChapter6Ambient();
}
let fullStoryPausedMotion = [];
function pauseAllChapterMotionForFullStory() {
  fullStoryPausedMotion = [...document.querySelectorAll(".chapter-motion-layer.is-playing")]
    .filter(media => !media.paused);
  fullStoryPausedMotion.forEach(media => media.pause());
}
function resumeChapterMotionAfterFullStory() {
  fullStoryPausedMotion.forEach(media => { media.play().catch(() => {}); });
  fullStoryPausedMotion = [];
}

// 全文阅读——原来是独立的 full-story.html，现在合并成主体验里的一层全屏覆盖，靠 .is-active 显隐。
const fullStoryScreen = document.getElementById("full-story-screen");
function openFullStoryScreen() {
  if (!fullStoryScreen) return;
  closeContext(); // 全文阅读跟跋的历史背景侧栏没关系，打开前先把它关掉
  stopAllChapterAmbient();
  pauseAllChapterMotionForFullStory();
  document.body.classList.add("is-full-story-open"); // 靠这个类隐藏侧栏按钮和时间线，避免跟正文抢地方、抢注意力
  fullStoryScreen.classList.add("is-active");
  fullStoryScreen.setAttribute("aria-hidden", "false");
  fullStoryScreen.scrollTop = 0;
}
function closeFullStoryScreen() {
  if (!fullStoryScreen) return;
  fullStoryScreen.classList.remove("is-active");
  fullStoryScreen.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-full-story-open");
  resumeChapterMotionAfterFullStory();
  resumeCurrentChapterAmbient();
}
// 全文阅读的繁体是脚本一次性转换出来的（跟侧栏 buildTraditionalContextBodies 是同一个思路），
// 正文是静态的，不会重新渲染，所以只需要在页面初始化时转一次。
function buildTraditionalStoryBody() {
  if (!fullStoryScreen) return;
  buildTraditionalStaticVariant("story-zh", "story-hant", fullStoryScreen);
}

// 参考图片右下角的放大镜：弹出居中大图 + 75% 黑色背景遮罩，点遮罩关闭。
// 图片是动态渲染进侧栏的，所以放大镜按钮用事件委托，绑一次即可。
let lightboxCaptionZh = "";
let lightboxCaptionEn = "";
function updateImageLightboxCaption() {
  if (!imageLightboxCaption) return;
  if (mainLanguage === "en") {
    imageLightboxCaption.textContent = lightboxCaptionEn || lightboxCaptionZh || "";
  } else if (mainLanguage === "zh-hant") {
    imageLightboxCaption.textContent = traditionalConverter(lightboxCaptionZh || "");
  } else {
    imageLightboxCaption.textContent = lightboxCaptionZh || "";
  }
}
function openImageLightbox(src, alt, captionZh, captionEn) {
  if (!imageLightbox || !imageLightboxImg) return;
  imageLightboxImg.src = src;
  imageLightboxImg.alt = alt || "";
  lightboxCaptionZh = captionZh || "";
  lightboxCaptionEn = captionEn || captionZh || "";
  updateImageLightboxCaption();
  document.body.classList.add("is-image-lightbox-open");
  imageLightbox.classList.add("is-open");
  imageLightbox.setAttribute("aria-hidden", "false");
}
function closeImageLightbox() {
  if (!imageLightbox) return;
  document.body.classList.remove("is-image-lightbox-open");
  imageLightbox.classList.remove("is-open");
  imageLightbox.setAttribute("aria-hidden", "true");
  if (imageLightboxImg) imageLightboxImg.src = "";
}
  document.addEventListener("click", event => {
  const zoomButton = event.target.closest(".context-reference-zoom");
  if (zoomButton) {
    openImageLightbox(zoomButton.dataset.zoomSrc, zoomButton.dataset.zoomAlt, zoomButton.dataset.zoomCaptionZh, zoomButton.dataset.zoomCaptionEn);
    return;
  }
  // 侧栏里的"小说原文阅读"不再是本地展开/收起一段可能是空的摘录，
  // 而是直接跳到全文阅读覆盖层——章节侧栏从来没有真正填过 novelZh，
  // 之前点了只会展开一句"本章小说原文尚未导入"，等于没反应。
  if (event.target.closest("#open-full-story") || event.target.closest("[data-open-full-story]")) {
    openFullStoryScreen();
    return;
  }
  if (event.target.closest("[data-full-story-close]")) {
    closeFullStoryScreen();
    return;
  }
});
imageLightboxBackdrop?.addEventListener("click", closeImageLightbox);
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (imageLightbox?.classList.contains("is-open")) { closeImageLightbox(); return; }
  if (fullStoryScreen?.classList.contains("is-active")) closeFullStoryScreen();
});
const mainLanguageButtons = [...document.querySelectorAll("[data-main-language]")];
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
let activeTooltipHotspot = null;
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
let chapter6OpeningCueActive = false;
let chapter6OpeningAdvanceRequested = false;
let soundEnabled = true; // 首次访问默认开启；浏览器会在第一次用户手势后解锁播放。
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
let chapter1AmbientAudioEl = null;
let chapter1AmbientGainNode = null;
let chapter1AmbientFadeFrame = null;
let chapter1AmbientBuffer = null;
let chapter1AmbientBufferPromise = null;
let chapter1AmbientBufferSource = null;
let chapter1AmbientUseFallbackElement = false;
let chapter1AmbientRevealed = false;

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

// 第二章循环声部（ch2-loop）状态，实现方式与第四章环境声完全一致。
let chapter2LoopAudioEl = null;
let chapter2LoopGainNode = null;
let chapter2LoopFadeFrame = null;
let chapter2LoopBuffer = null;
let chapter2LoopBufferPromise = null;
let chapter2LoopBufferIsM4a = false;
let chapter2LoopBufferSource = null;
let chapter2LoopUseFallbackElement = false;
let chapter2LoopRevealed = false;

// 第二章一次性音效（ch2-once-shatter）状态，实现方式与第五章开门音效完全一致。
let chapter2OnceGainNode = null;
let chapter2OnceBuffer = null;
let chapter2OnceBufferPromise = null;
let chapter2OnceUseFallbackElement = false;
let chapter2OnceAudioEl = null;
let chapter2OnceBufferSource = null;

// 第三章循环声部（ch3-loop）状态，实现方式与第二章循环声完全一致（ogg/m4a 分开裁剪）。
let chapter3LoopAudioEl = null;
let chapter3LoopGainNode = null;
let chapter3LoopFadeFrame = null;
let chapter3LoopBuffer = null;
let chapter3LoopBufferPromise = null;
let chapter3LoopBufferIsM4a = false;
let chapter3LoopBufferSource = null;
let chapter3LoopUseFallbackElement = false;
let chapter3LoopRevealed = false;

// 第五章环境循环声（复用 ch3-loop 素材）状态，管线与第三章完全一致；
// 额外多一个 chapter5LoopDucked 记录当前是否处于「悬停门/已开门」的降音状态。
let chapter5LoopAudioEl = null;
let chapter5LoopGainNode = null;
let chapter5LoopFadeFrame = null;
let chapter5LoopBuffer = null;
let chapter5LoopBufferPromise = null;
let chapter5LoopBufferIsM4a = false;
let chapter5LoopBufferSource = null;
let chapter5LoopUseFallbackElement = false;
let chapter5LoopRevealed = false;
let chapter5LoopDucked = false;
let chapter5DoorOpening = false;
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

// 通用小工具：给一段简体字符串，按当前全局语言状态决定要不要转成繁体。
// mainLanguage 是 "zh-hans" 或 "en" 时原样返回（en 状态下中文行本来就会被 CSS 隐藏，转不转不影响观感，
// 但仍转换一次以保持逻辑单一来源，避免以后有人在 en 状态下不小心又把中文行显示出来时，看到没转换的简体）。
function convertZh(value) {
  if (mainLanguage !== "zh-hant") return value;
  return localizeTraditionalChinese(traditionalConverter(value));
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

// 通用版：给一批"简体是写死在 HTML 里的静态节点"生成繁体镜像，思路跟上面 buildTraditionalContextBodies
// 一样（克隆 + convertElementToTraditional），但可以传任意 zh/hant 类名对，序言、跋、跋的按钮、
// 全文阅读的"返回"都用这一个函数处理，不用每处各写一遍。静态内容只用转一次，不用每次语言切换都重转。
function buildTraditionalStaticVariant(zhClass, hantClass, root = document) {
  root.querySelectorAll("." + hantClass).forEach(node => node.remove());
  root.querySelectorAll("." + zhClass).forEach(source => {
    const traditional = source.cloneNode(true);
    traditional.classList.remove(zhClass);
    traditional.classList.add(hantClass);
    traditional.setAttribute("lang", "zh-Hant");
    convertElementToTraditional(traditional);
    source.after(traditional);
  });
}

// 这个函数现在管全站（不再只管侧栏）：任何带 data-context-chinese 的中文标签，
// 不管长在主屏控制栏、开门按钮，还是侧栏里，都会在这里被统一切换简繁。
function updateContextChineseLabels() {
  const traditional = mainLanguage === "zh-hant";
  document.querySelectorAll("[data-context-chinese]").forEach(label => {
    const simplified = label.dataset.hans || label.textContent;
    label.textContent = traditional
      ? localizeTraditionalChinese(traditionalConverter(simplified))
      : simplified;
  });
}

function updateContextLocaleChrome() {
  contextPanel.setAttribute("aria-label", getUIText("context"));
  contextToggle?.setAttribute("aria-label", getUIText("context"));
  contextCollapse?.setAttribute("aria-label", getUIText("closeContext"));
  contextCollapse?.setAttribute("title", getUIText("closeSidebar"));
  document.querySelector(".main-language-toggle")?.setAttribute("aria-label", getUIText("language"));
  screenControls?.setAttribute("aria-label", getUIText("viewingControls"));
  document.getElementById("hotspots")?.setAttribute("aria-label", getUIText("imageNotes"));
  memoryCuesEl?.setAttribute("aria-label", getUIText("memoryCues"));
  imageLightboxBackdrop?.setAttribute("aria-label", getUIText("closeImage"));
  contextContent?.querySelectorAll(".context-reference-zoom").forEach(button => {
    button.setAttribute("aria-label", getUIText("zoomImage"));
  });
  document.getElementById("timeline")?.setAttribute("aria-label", getUIText("timeline"));
  navButtonPrev?.setAttribute("aria-label", getUIText("previousScene"));
  navButtonNext?.setAttribute("aria-label", getUIText("nextScene"));
  timelineStops.find(stop => stop.dataset.scene === "start")?.setAttribute("aria-label", getUIText("prologue"));
  timelineStops.find(stop => stop.dataset.scene === "epilogue")?.setAttribute("aria-label", getUIText("epilogue"));
  const expanded = controlsCollapseToggle?.getAttribute("aria-expanded") === "true";
  controlsCollapseToggle?.setAttribute("aria-label", getUIText(expanded ? "collapseControls" : "expandControls"));
  updateFullscreenState();
  applyFontSizePreference();
  const reduced = prefersReducedMotion();
  motionToggle?.setAttribute("aria-label", getUIText(reduced ? "enableMotion" : "reduceMotion"));
  if (motionModeLabel) motionModeLabel.textContent = reduced ? "REDUCED" : "ON";
  updateSoundToggle();
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
  const sections = text.split(/\n\n+/).reduce((merged, section) => {
    const pipeDivider = section.indexOf("｜");
    const colonHeading = section.match(/^(原文|注释|繁简夹写)：\s*|^(Original text(?: \(translated\))?|Note|Mixed traditional and simplified characters):\s*/);
    const label = pipeDivider !== -1
      ? section.slice(0, pipeDivider)
      : (colonHeading?.[1] || colonHeading?.[2] || "");
    const body = pipeDivider !== -1
      ? section.slice(pipeDivider + 1)
      : (colonHeading ? section.slice(colonHeading[0].length) : section);
    const supporting = ["脚注", "Notes", "注释", "Note", "繁简夹写", "Mixed traditional and simplified characters"].includes(label);
    const previous = merged[merged.length - 1];
    if (supporting && previous?.label === label) {
      previous.body += `\n\n${body}`;
    } else {
      merged.push({ label, body });
    }
    return merged;
  }, []);
  return sections.map(({ label, body: rawBody }) => {
    if (!label) return `<p>${rawBody.replaceAll("\n", "<br>")}</p>`;
    const supporting = ["脚注", "Notes", "注释", "Note", "繁简夹写", "Mixed traditional and simplified characters"].includes(label);
    const original = ["原文", "Original text", "Original text (translated)"].includes(label);
    const historical = label === "历史核心" || label === "History core";
    const personal = label === "与沈蕙兰的关系" || label === "Shen Huilan";
    const linkedBody = rawBody.includes("<a") ? rawBody : rawBody.replace(/https:\/\/[^\s<]+/g, url => `<a class="context-lead-note-source" href="${url}" target="_blank" rel="noopener noreferrer">${language === "zh" ? "相关词条" : "Source entry"}</a>`);
    const body = supporting ? linkedBody : linkedBody.replace(/\[(\d+)\]/g, '<sup class="context-citation">[$1]</sup>');
    const classes = ["context-reading-section", supporting ? "is-supporting" : "", original ? "is-original" : "", personal ? "is-personal" : ""].filter(Boolean).join(" ");
    const visibleLabel = historical || personal ? "" : `<span class="context-reading-label">${label}</span>`;
    return `<p class="${classes}" lang="${language === "zh" ? "zh-CN" : "en"}">${visibleLabel}${body.replaceAll("\n", "<br>")}</p>`;
  }).join("");
}

// 所有"视觉参考"手风琴里的图，不管是章节级的 gallery（比如第六章）还是某个 hotspot 自己的
// gallery（比如第一章"沈蕙兰"三字的检字页、第二章红卫兵海报），都用同一种卡片渲染——跟单张
// referenceItems/hotspotImage 视觉上完全一致，不再各自起一个"同类海报视觉语言"之类的小标题，
// 全部平铺在"视觉参考"这一个标题下面。
function renderGalleryFigures(items = []) {
  return items.map(item => {
    const captionZh = [item.zh, item.metaZh].filter(Boolean).join(" · ");
    const captionEn = [item.en, item.metaEn].filter(Boolean).join(" · ") || captionZh;
    const altText = mainLanguage === "en" ? (item.en || item.zh || "Reference image") : (item.zh || item.en || "参考图片");
    const creditZh = item.creditZh || item.credit || "";
    const creditEn = item.creditEn || item.credit || creditZh;
    const sourceHtml = creditZh || creditEn
      ? (item.href
          ? `<small><a class="context-reference-credit" href="${item.href}" target="_blank" rel="noopener noreferrer"><span class="context-body-zh">${creditZh}</span><span class="context-en context-body-en">${creditEn}</span></a></small>`
          : `<small><span class="context-body-zh">${creditZh}</span><span class="context-en context-body-en">${creditEn}</span></small>`)
      : "";
    const descriptionHtml = item.descriptionZh || item.descriptionEn
      ? `<p class="context-reference-description context-body-zh">${item.descriptionZh || ""}</p><p class="context-reference-description context-en context-body-en">${item.descriptionEn || ""}</p>`
      : "";
    const figureClass = ["context-reference", item.kind === "homage" ? "is-homage" : "", item.fit === "contain" ? "is-contain" : ""].filter(Boolean).join(" ");
    const homageLabel = item.kind === "homage"
      ? `<p class="context-reference-kind"><span class="context-body-zh">跨时空视觉致意</span><span class="context-en context-body-en">Transhistorical homage</span></p>`
      : "";
    const zoomCaptionZh = escapeHTML([captionZh, creditZh].filter(Boolean).join(" · "));
    const zoomCaptionEn = escapeHTML([captionEn, creditEn].filter(Boolean).join(" · "));
    const mediaItems = item.images?.length ? item.images : [{ src:item.image, altZh:altText, altEn:altText }];
    const mediaClass = mediaItems.length > 1 ? "context-reference-media is-pair" : "context-reference-media";
    const mediaHtml = mediaItems.map(media => {
      const mediaAlt = mainLanguage === "en" ? (media.altEn || media.altZh || altText) : (media.altZh || media.altEn || altText);
      return `<div class="context-reference-media-item"><img src="${media.src}" alt="${escapeHTML(mediaAlt)}" loading="lazy"><button class="context-reference-zoom" type="button" data-zoom-src="${media.src}" data-zoom-alt="${escapeHTML(mediaAlt)}" data-zoom-caption-zh="${zoomCaptionZh}" data-zoom-caption-en="${zoomCaptionEn}" aria-label="${getUIText("zoomImage")}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.4" y2="16.4"></line></svg></button></div>`;
    }).join("");
    return `<figure class="${figureClass}">${homageLabel}<div class="${mediaClass}">${mediaHtml}</div><figcaption><span class="context-body-zh">${captionZh}</span><span class="context-en context-body-en">${captionEn}</span>${descriptionHtml}${sourceHtml}</figcaption></figure>`;
  }).join("");
}

function renderGalleryIntro(source) {
  if (!source?.galleryIntroZh && !source?.galleryIntroEn) return "";
  const variantClass = source.galleryIntroVariant === "ubiquity" ? " is-ubiquity" : "";
  return `<p class="context-gallery-intro${variantClass} context-body-zh">${source.galleryIntroZh || ""}</p><p class="context-gallery-intro${variantClass} context-en context-body-en">${source.galleryIntroEn || ""}</p>`;
}

// 缩略图点了直接打开全站统一的居中大图弹窗（image-lightbox），跟其它参考图片同一套看图方式，
// 不再是侧栏里单独一套"点了在原地展开一张大图"的机制。
function bindReferenceGallery(source) {
  if (!source?.gallery?.length) return;
  const buttons = [...contextContent.querySelectorAll(".reference-gallery-thumb")];
  buttons.forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.galleryIndex);
    const item = source.gallery[index];
    if (!item) return;
    const captionZh = [item.zh, item.metaZh, item.creditZh || item.credit].filter(Boolean).join(" · ");
    const captionEn = [item.en, item.metaEn, item.creditEn || item.credit || item.creditZh].filter(Boolean).join(" · ");
    openImageLightbox(item.image, item.zh, captionZh, captionEn);
  }));
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
      const criticalLoop = overlay.loop ? "true" : "false";
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
        data-critical-loop="${criticalLoop}"
        data-initial-time="${overlay.initialTime ?? ""}"
        data-hide-on-end="${overlay.hideOnEnd ? "true" : "false"}"
        data-fade-in-before-play="${overlay.fadeInBeforePlay || 0}"
        data-duration="${overlay.duration || 0}"
        data-playback-rate="${overlay.playbackRate ?? MOTION_SETTINGS.chapterMotion.playbackRate}"
        style="z-index:${overlay.layer || 2};--motion-opacity:${overlay.opacity ?? 1};--motion-blend:${overlay.blendMode || "normal"};--motion-fade-in:${overlay.fadeInDuration ?? overlay.fadeInBeforePlay ?? 0}ms"></video>`;
    }).join("");
    const reducedMotionStills = motionOverlays
      .filter(overlay => overlay.reducedMotionStill)
      .map(overlay => `<img class="chapter-motion-still" src="${overlay.reducedMotionStill}" alt="" aria-hidden="true" decoding="async"
        style="z-index:${overlay.layer || 2};--motion-opacity:${overlay.opacity ?? 1};--motion-blend:${overlay.blendMode || "normal"}">`)
      .join("");
    visual.innerHTML = `
      <img class="chapter-bg chapter-bg-base" src="${chapter.baseImage || chapter.image}" alt="${chapter.title}：底图">
      ${compositeImage}
      ${!chapter.baseOnly && chapter.reveal === "dissolve" ? '<canvas class="chapter-bg chapter-dissolve-canvas" aria-hidden="true"></canvas>' : ''}
      ${reducedMotionStills}
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
  if (media.dataset.criticalLoop !== "true" || !prefersReducedMotion()) {
    media.src = media.dataset.source;
  }
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

function syncCriticalLoopMotion(reduced) {
  document.querySelectorAll('.chapter-motion-layer[data-critical-loop="true"]').forEach(media => {
    const visual = media.closest(".chapter-visual");
    clearTimeout(chapterMotionTimers.get(media));
    chapterMotionTimers.delete(media);

    if (reduced) {
      media.pause();
      media.classList.remove("is-playing");
      media.removeAttribute("src");
      media.load();
      return;
    }

    if (!media.getAttribute("src") && media.dataset.source) {
      media.removeAttribute("data-motion-unavailable");
      media.src = media.dataset.source;
      media.load();
    }
    const previousMotionId = media.dataset.afterMotion;
    const previousMedia = previousMotionId
      ? visual?.querySelector(`.chapter-motion-layer[data-motion-id="${previousMotionId}"]`)
      : null;
    const predecessorComplete = !previousMedia || previousMedia.ended;
    if (visual?.classList.contains("is-active") && phase === "image" && predecessorComplete) {
      playChapterMotion(media);
    }
  });
}

function playChapterMotion(media) {
  if (media.dataset.criticalLoop === "true" && prefersReducedMotion()) return;
  if (!media.getAttribute("src") && media.dataset.source) media.src = media.dataset.source;
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
  if (!media || media.dataset.motionUnavailable || prefersReducedMotion()) return Promise.resolve();
  if (!media.getAttribute("src") && media.dataset.source) media.src = media.dataset.source;

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
  epilogueCta?.classList.add("is-visible");
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
  epilogueCta?.classList.remove("is-visible");
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
  // "阅读完整故事"按钮不再跟屏幕一起提前淡入——等最后一段文字动效走完，
  // 按钮才跟着出现，读完文字再看见入口，顺序上更合理。
  const lastParagraphIndex = Math.max(0, epilogueParagraphs.length - 1);
  const lastParagraphDoneAt = settings.textInitialDelay
    + lastParagraphIndex * (settings.focusDuration + settings.paragraphGap)
    + settings.focusDuration;
  epilogueTimers.push(setTimeout(() => {
    epilogueCta?.classList.add("is-visible");
  }, lastParagraphDoneAt));
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
  epilogueCta?.classList.remove("is-visible");
  busy = false;
}

function enterEpilogue() {
  if (epilogueActive) return;
  if (chapterIndex === CHAPTER_1_INDEX) stopChapter1Ambient();
  if (chapterIndex === CHAPTER_6_INDEX) stopChapter6Ambient();
  if (chapterIndex === CHAPTER_4_INDEX) stopChapter4Ambient();
  if (chapterIndex === CHAPTER_2_INDEX) stopChapter2Loop();
  if (chapterIndex === CHAPTER_2_INDEX) stopChapter2OnceSound();
  if (chapterIndex === CHAPTER_3_INDEX) stopChapter3Loop();
  if (chapterIndex === CHAPTER_5_INDEX) stopChapter5Loop();
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
  if (chapterIndex === CHAPTER_1_INDEX) stopChapter1Ambient();
  if (chapterIndex === CHAPTER_6_INDEX) stopChapter6Ambient();
  if (chapterIndex === CHAPTER_4_INDEX) stopChapter4Ambient();
  if (chapterIndex === CHAPTER_2_INDEX) stopChapter2Loop();
  if (chapterIndex === CHAPTER_2_INDEX) stopChapter2OnceSound();
  if (chapterIndex === CHAPTER_3_INDEX) stopChapter3Loop();
  if (chapterIndex === CHAPTER_5_INDEX) stopChapter5Loop();
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
      <div class="step-zh">${convertZh(renderRichText(step.zh, step.refs, "zh"))}</div>
      <div class="step-en">${renderRichText(step.en, step.refs, "en")}</div>
    </div>`).join("")}</div>
    <div class="narrative-gesture-hint" aria-hidden="true">
      <span class="narrative-hint-zh">滚动或上滑继续</span>
      <span class="narrative-hint-hant">滾動或上滑繼續</span>
      <span class="narrative-hint-en">Scroll or swipe up to continue</span>
    </div>`;
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

let narrativeHintTimer = 0;

function dismissNarrativeGestureHint() {
  clearTimeout(narrativeHintTimer);
  narrativeHintTimer = 0;
  const hint = narrative.querySelector(".narrative-gesture-hint");
  hint?.classList.remove("is-visible");
  hint?.setAttribute("aria-hidden", "true");
}

function scheduleNarrativeGestureHint() {
  dismissNarrativeGestureHint();
  narrativeHintTimer = window.setTimeout(() => {
    if (startActive || epilogueActive || busy || phase !== "text") return;
    const hint = narrative.querySelector(".narrative-gesture-hint");
    hint?.classList.add("is-visible");
    hint?.setAttribute("aria-hidden", "false");
  }, MOTION_SETTINGS.narrativeText.idleHintDelay);
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
  titleZhEl.textContent = convertZh(chapter.title);
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
  if (target === CHAPTER_6_INDEX && phase === "text") return false;
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
  if (chapterIndex === CHAPTER_1_INDEX && index !== CHAPTER_1_INDEX) stopChapter1Ambient();
  if (chapterIndex === CHAPTER_6_INDEX && index !== CHAPTER_6_INDEX) stopChapter6Ambient();
  if (chapterIndex === CHAPTER_4_INDEX && index !== CHAPTER_4_INDEX) stopChapter4Ambient();
  if (chapterIndex === CHAPTER_2_INDEX && index !== CHAPTER_2_INDEX) stopChapter2Loop();
  if (chapterIndex === CHAPTER_2_INDEX && index !== CHAPTER_2_INDEX) stopChapter2OnceSound();
  if (chapterIndex === CHAPTER_3_INDEX && index !== CHAPTER_3_INDEX) stopChapter3Loop();
  if (chapterIndex === CHAPTER_5_INDEX && index !== CHAPTER_5_INDEX) stopChapter5Loop();
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
  scheduleNarrativeGestureHint();
}

async function showImage() {
  dismissNarrativeGestureHint();
  busy = true;
  phase = "image";
  const chapter = CHAPTERS[chapterIndex];
  const visual = document.querySelector(`.chapter-visual[data-index="${chapterIndex}"]`);
  teardownChapter6Memory();
  setLightNarrativeMode(false);
  app.className = "app is-image-mode is-transitioning is-js-fading";
  if (chapter.baseOnly) startChapterMotion(visual, "image-entry");
  if (chapterIndex === CHAPTER_1_INDEX) revealChapter1Ambient();
  if (chapterIndex === CHAPTER_4_INDEX) revealChapter4Ambient();
  if (chapterIndex === CHAPTER_2_INDEX) { revealChapter2Loop(); playChapter2OnceSound(); }
  if (chapterIndex === CHAPTER_3_INDEX) revealChapter3Loop();
  if (chapterIndex === CHAPTER_5_INDEX) revealChapter5Loop();
  let hotspotMotion = Promise.resolve();
  renderHotspots();
  renderContext(chapterIndex);
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
  renderContext(chapterIndex);
  narrative.classList.add("is-visible");
  updateNav();
  await delay(MOTION_SETTINGS.chapterReveal.imageToTextDelay);
  busy = false;
  scheduleNarrativeGestureHint();
}

function goForward() {
  if (busy) return;
  dismissNarrativeGestureHint();
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
  dismissNarrativeGestureHint();
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
  dismissNarrativeGestureHint();
  if (epilogueActive) return;
  const chapter = CHAPTERS[chapterIndex];
  if (phase === "text") showImage();
  else if (phase === "image" && chapter.isFinal) enterEpilogue();
  else if (phase === "image") enterChapter(chapterIndex + 1, 0);
  updateNav();
}

function goBackwardDirect() {
  if (busy) return;
  dismissNarrativeGestureHint();
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

// 术语手风琴：扫描指定容器（序言文本 / 当前先导文段落）里出现过的上标术语按钮，去重、按编号
// 排序，生成默认展开、点了才收起的 <details> 列表——不再是一个只显示词名、点了就跳走的按钮，
// 也不再挂圆圈编号：编号只是内部排序用，不是要给读者看的标签。
function buildTermAccordion(rootSelector) {
  const seenTermIds = new Set();
  const ids = [...document.querySelectorAll(`${rootSelector} .term-ref`)]
    .map(button => button.dataset.term)
    .filter(id => {
      if (!id || !TERMS[id] || seenTermIds.has(id)) return false;
      seenTermIds.add(id);
      return true;
    })
    .sort((a, b) => TERMS[a].number - TERMS[b].number);
  if (!ids.length) return "";
  const items = ids.map(id => {
    const term = TERMS[id];
    return `<details class="context-term-item" data-term-id="${id}" open>
      <summary class="context-term-item-summary">
        <span class="context-term-item-label"><span class="context-term-item-number">[${term.number}]</span>${renderContextChineseLabel(term.zh)}<span class="context-term-item-en">${term.en}</span></span>
      </summary>
      <div class="context-term-item-body">
        <p class="context-body-zh">${term.bodyZh}</p>
        <p class="context-en context-body-en">${term.bodyEn}</p>
      </div>
    </details>`;
  }).join("");
  return `<div class="context-term-list">${items}</div>`;
}

// 正文里点一个上标数字，效果是"在当前这页（序言/先导文）里展开并滚到对应术语"，
// 不再是"跳到一个只剩这一条术语的空页面"——侧栏内容和术语解释永远在同一页上。
function focusTermInContext(termId) {
  const item = contextContent.querySelector(`.context-term-item[data-term-id="${termId}"]`);
  if (!item) return;
  item.open = true;
  item.scrollIntoView({ block: "center", behavior: "smooth" });
  item.classList.add("is-highlighted");
  setTimeout(() => item.classList.remove("is-highlighted"), 1400);
}

function renderContext(target, hotspot = null) {
  if (typeof target === "string" && TERMS[target]) {
    const term = TERMS[target];
    contextContent.innerHTML = `
      <h2 class="context-title-zh">${renderContextChineseLabel(term.zh)}</h2><p class="context-title-en">${term.en}</p>
      <p class="context-body-zh">${term.bodyZh}</p><p class="context-en context-body-en">${term.bodyEn}</p>
      <p class="context-material">${renderContextChineseLabel("术语说明")}<span class="context-en-label">TERM NOTE</span> ${term.number}</p>`;
    buildTraditionalContextBodies();
    updateContextChineseLabels();
    return;
  }
  if (target === "start") {
    // 标题不再只写"1966"：序言本身横跨1944年（蕙兰出生）到下放，只写单一年份会让人误以为
    // 序言讲的就是1966年这一件事。文革的起止年代放进正文一句话里，不放title。
    // 正文也不再重复术语①"文化大革命"已经讲过的内容（起止年代、冲击范围）——两边写的是同一件事，
    // 这里只留序言自己的、术语条目里没有的信息：故事人物和这十年的关系。
    contextContent.innerHTML = `
      <h2 class="context-title-zh">${renderContextChineseLabel("序言")}</h2><p class="context-title-en">Prologue</p>
      <p class="context-body-zh">沈蕙兰的家庭背景，与她即将经历的、持续十年的政治动荡（1966–1976）。</p>
      <p class="context-en context-body-en">Shen Huilan's family background, and the decade of political upheaval (1966–1976) she was about to live through.</p>
      ${buildTermAccordion(".start-text")}`;
    buildTraditionalContextBodies();
    updateContextChineseLabels();
    return;
  }
  if (target === "epilogue") {
    contextContent.innerHTML = `
      <h2 class="context-title-zh">${renderContextChineseLabel("跋")}</h2><p class="context-title-en">Epilogue</p>
      <div class="context-primary">
        <section class="epilogue-context-section">
          <h3>${renderContextChineseLabel("七十年代末：平反与返城")}<small class="context-en-label">Late 1970s: Rehabilitation and Return</small></h3>
          <p class="context-body-zh">1976年以后，教育秩序、知识分子政策和此前的政治结论陆续调整。平反、恢复工作与知青返城并非在同一天完成，各地、各单位和每个人的进程也不相同。1978至1979年，知青返城形成大规模潮流；安徽的下乡知青也通过招工、招生、征兵、病困退等途径分批离开农村。沈蕙兰下放前已经大学毕业并任教，不属于典型的城市中学毕业知青；她重返学校更接近受冲击教师与知识分子恢复工作。两条变化发生在相近的历史转折中，但制度路径不同。具体返校年份属于人物设定。[1][2]</p>
          <p class="context-en context-body-en">After 1976, earlier political judgments were reviewed and schools began to rebuild. Rehabilitation and the return of sent-down youth happened unevenly. The return gathered pace in 1978 and 1979; in Anhui, people left the countryside through job placements, education, military service, and hardship provisions. Shen Huilan had already graduated from university and taught before she was sent down, so she is not a typical urban school leaver. Her return belongs more closely to the reinstatement of teachers and intellectuals. The two shifts overlapped but followed different paths. Her exact return date is fictional.[1][2]</p>
        </section>
        <section class="epilogue-context-section">
          <h3>${renderContextChineseLabel("古典文学重新回到课堂")}<small class="context-en-label">Classical Literature Returns to the Classroom</small></h3>
          <p class="context-body-zh">文革期间，学校教育中断，语文课高度政治化，古典文学教学受到严重压缩。不同地区和年份的教材并不完全一致，不能笼统说所有古文都被统一禁止。1978年以后，全国教材体系重建；1979年的中学语文教材已经增加中国古典诗文。《孔雀东南飞》和屈原作品后来成为中学语文常见篇目。蕙兰后来每年讲这些作品。这写的是她回到课堂后的日常，不指向某一册真实教材。[3][4]</p>
          <p class="context-en context-body-en">During the Cultural Revolution, schooling was disrupted, Chinese classes became heavily politicized, and classical literature was sharply reduced. Textbooks still varied by place and year, so it would be inaccurate to say every classical text was uniformly banned. A national curriculum was rebuilt after 1978, and the 1979 Chinese textbooks included more classical poetry and prose. <i>The Peacock Flies Southeast</i> and works by Qu Yuan later became familiar school texts. Huilan teaches them each year after returning to the classroom. This describes her daily work, not one documented textbook edition.[3][4]</p>
        </section>
        <section class="epilogue-context-section">
          <h3>${renderContextChineseLabel("君子兰与她的名字")}<small class="context-en-label">Clivia and Her Name</small></h3>
          <p class="context-body-zh">君子兰原产非洲南部，植物学上不属于兰科。它的中文名取“君子”之意，常让人联想到端正、克制与高洁；传统兰花在中国文化中也长期与君子品格相连。对沈蕙兰而言，这份退休礼物还有一层私人联系：“兰”是她名字的最后一个字。[5][6]</p>
          <p class="context-en context-body-en">Clivia comes from southern Africa and is not a true orchid. Its Chinese name invokes the <i>junzi</i>, a person of cultivated character, while orchids have long carried similar associations in Chinese culture. The retirement gift is also personal: <i>lan</i>, meaning orchid, is the final character of Shen Huilan's name.[5][6]</p>
        </section>
      </div>
      <details class="context-section">
        <summary>${renderContextChineseLabel("参考资料")} <span class="context-en-label">References</span></summary>
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
  // 章节先导文阶段（phase === "text"，场景/hotspot 还没出场）打开侧栏，
  // 不该直接把整章的场景背景（比如"父母的书房"这种属于后面画面阶段的信息）端出来——
  // 这时候侧栏该做的只是先导文本身的术语表：把这段文字里所有带上标数字的词汇列成清单，
  // 数字对应正文里的上标，点哪条效果等同于点正文里对应的上标数字。
  if (!hotspot && phase === "text" && typeof target === "number" && target !== CHAPTER_6_INDEX) {
    // "先导文"是开发内部对这个阶段的分类名，不该端给读者看；这里只给一个纯历史、纯年代的标题
    // （见每章 CONTEXTS 条目的 leadZh/leadEn），画面出现后才切到那章真正的场景标题。
    const leadNote = context?.leadNoteZh
      ? `<p class="context-lead-note context-body-zh">${context.leadNoteZh.replace(/\n/g, "<br>")}</p><p class="context-lead-note context-en context-body-en">${(context?.leadNoteEn || "").replace(/\n/g, "<br>")}</p>`
      : "";
    contextContent.innerHTML = `
      <h2 class="context-title-zh">${renderContextChineseLabel(context?.leadZh || context?.title || "")}</h2><p class="context-title-en">${context?.leadEn || context?.titleEn || ""}</p>
      ${leadNote}
      ${buildTermAccordion("#narrative")}`;
    buildTraditionalContextBodies();
    updateContextChineseLabels();
    return;
  }
  const referenceItems = (context.references || []).map(reference => {
    const captionZh = reference.captionZh || reference.caption || "";
    const captionEn = reference.captionEn || reference.caption || "";
    const altText = reference.alt || (mainLanguage === "en" ? captionEn : captionZh) || captionZh || captionEn || (mainLanguage === "en" ? "Reference image" : "参考图片");
    const image = `<img src="${reference.image}" alt="${escapeHTML(altText)}" loading="lazy">`;
    // 图片本身不再包一层 <a> 跳转链接——点图片会打断沉浸感，且用户并没有点"打开新标签页"的明确意图。
    // 只有下面这行来源/credit 文字带下划线可点，点它是清楚的、有意为之的动作。
    const referenceSourceZh = reference.sourceZh || reference.source || "";
    const referenceSourceEn = reference.sourceEn || reference.source || referenceSourceZh;
    const sourceHtml = referenceSourceZh || referenceSourceEn
      ? (reference.href
          ? `<small><a class="context-reference-credit" href="${reference.href}" target="_blank" rel="noopener noreferrer"><span class="context-body-zh">${referenceSourceZh}</span><span class="context-en context-body-en">${referenceSourceEn}</span></a></small>`
          : `<small><span class="context-body-zh">${referenceSourceZh}</span><span class="context-en context-body-en">${referenceSourceEn}</span></small>`)
      : "";
    const zoomCaptionZh = escapeHTML([captionZh, referenceSourceZh].filter(Boolean).join(" · "));
    const zoomCaptionEn = escapeHTML([captionEn, referenceSourceEn].filter(Boolean).join(" · "));
    const zoomButton = `<button class="context-reference-zoom" type="button" data-zoom-src="${reference.image}" data-zoom-alt="${escapeHTML(altText)}" data-zoom-caption-zh="${zoomCaptionZh}" data-zoom-caption-en="${zoomCaptionEn}" aria-label="${getUIText("zoomImage")}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.4" y2="16.4"></line></svg></button>`;
    return `<figure class="context-reference">${image}${zoomButton}<figcaption><span class="context-body-zh">${captionZh}</span><span class="context-en context-body-en">${captionEn}</span>${sourceHtml}</figcaption></figure>`;
  }).join("");
  const contextSources = (context.sources || []).length ? `
    <ul class="context-sources">
      ${(context.sources || []).map(source => `<li><a href="${source.href}" target="_blank" rel="noopener noreferrer"><span class="context-body-zh">${source.zh}</span><span class="context-en context-body-en">${source.en}</span></a></li>`).join("")}
    </ul>` : "";
  const hotspotSourceZh = hotspot?.sourceZh || hotspot?.source || "";
  const hotspotSourceEn = hotspot?.sourceEn || hotspot?.source || hotspotSourceZh;
  const hotspotCaptionZh = hotspot?.captionZh || "";
  const hotspotCaptionEn = hotspot?.captionEn || hotspotCaptionZh;
  const hotspotSourceHtml = hotspotSourceZh || hotspotSourceEn
    ? (hotspot.sourceUrl
        ? `<small><a class="context-reference-credit" href="${hotspot.sourceUrl}" target="_blank" rel="noopener noreferrer"><span class="context-body-zh">${hotspotSourceZh}</span><span class="context-en context-body-en">${hotspotSourceEn}</span></a></small>`
        : `<small><span class="context-body-zh">${hotspotSourceZh}</span><span class="context-en context-body-en">${hotspotSourceEn}</span></small>`)
    : "";
  const hotspotAlt = mainLanguage === "en" ? (hotspot?.en || hotspot?.zh || "Reference image") : (hotspot?.zh || hotspot?.en || "参考图片");
  const hotspotCaptionHtml = hotspotCaptionZh || hotspotCaptionEn
    ? `<span class="context-body-zh">${hotspotCaptionZh}</span><span class="context-en context-body-en">${hotspotCaptionEn}</span>`
    : "";
  const hotspotImageCaption = hotspotCaptionHtml || hotspotSourceHtml
    ? `<figcaption>${hotspotCaptionHtml}${hotspotSourceHtml}</figcaption>`
    : "";
  const hotspotZoomCaptionZh = escapeHTML([hotspotCaptionZh, hotspotSourceZh].filter(Boolean).join(" · "));
  const hotspotZoomCaptionEn = escapeHTML([hotspotCaptionEn, hotspotSourceEn].filter(Boolean).join(" · "));
  const hotspotImage = hotspot?.image ? `<figure class="context-reference"><img src="${hotspot.image}" alt="${escapeHTML(hotspotAlt)}"><button class="context-reference-zoom" type="button" data-zoom-src="${hotspot.image}" data-zoom-alt="${escapeHTML(hotspotAlt)}" data-zoom-caption-zh="${hotspotZoomCaptionZh}" data-zoom-caption-en="${hotspotZoomCaptionEn}" aria-label="${getUIText("zoomImage")}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.4" y2="16.4"></line></svg></button>${hotspotImageCaption}</figure>` : "";
  const hotspotSourceLabel = `${renderContextChineseLabel("图片来源")}<span class="context-en-label">Image source</span>`;
  const hotspotSource = (hotspotSourceZh || hotspotSourceEn) && !hotspot?.image ? `<p class="hotspot-source">${hotspotSourceLabel}: ${hotspot.sourceUrl ? `<a href="${hotspot.sourceUrl}" target="_blank" rel="noopener noreferrer"><span class="context-body-zh">${hotspotSourceZh}</span><span class="context-en context-body-en">${hotspotSourceEn}</span></a>` : `<span class="context-body-zh">${hotspotSourceZh}</span><span class="context-en context-body-en">${hotspotSourceEn}</span>`}</p>` : "";
  const hotspotReading = hotspot?.learnMoreZh ? `
    <div class="hotspot-reading">
      <div class="hotspot-reading-zh context-body-zh">${renderLayeredReading(hotspot.learnMoreZh, "zh")}</div>
      ${hotspot.learnMoreEn ? `<div class="context-en hotspot-reading-en context-body-en">${renderLayeredReading(hotspot.learnMoreEn, "en")}</div>` : ""}
    </div>` : "";
  // 所有 gallery（章节级的，比如第六章；或某个 hotspot 自己的，比如第一章检字页、第二章
  // 红卫兵海报）统一摊平成跟单张参考图一样的卡片，不再各起一个子标题，全部并入"视觉参考"。
  const hotspotGalleryIntro = hotspot ? renderGalleryIntro(hotspot) : "";
  const hotspotGallery = hotspot?.gallery?.length ? renderGalleryFigures(hotspot.gallery) : "";
  const contextGalleryIntro = !hotspot ? renderGalleryIntro(context) : "";
  const contextGallery = !hotspot && context?.gallery?.length ? renderGalleryFigures(context.gallery) : "";
  const hotspotReferences = `${hotspotImage}${hotspotGalleryIntro}${hotspotGallery}${hotspotSource}`;
  // 章节级的"参考图片"（context.references）和脚注列表（context.sources）只属于默认场景侧栏，
  // 不该跟着漏进某个具体 hotspot 的侧栏里——点开一个具体的点，就只该看到这个点自己的图片/来源，
  // 不该把整章的背景音乐脚注、整章的参考图片一起搭进来。
  // 有图片内容（hotspotReferences / referenceItems）才叫"视觉参考"；如果这一章只有文字脚注
  // （context.sources），标题要换成"参考资料"，不能挂着"参考图片"的名字却什么图都没有。
  // 两者都没有时，整个手风琴直接不渲染，不留一个空标题。
  const hasImageReferences = Boolean(hotspot ? hotspotReferences : (hotspotReferences || referenceItems || contextGallery));
  const hasTextSources = Boolean(!hotspot && contextSources);
  const imagesAccordion = hasImageReferences ? `<details class="context-section" open>
      <summary>${renderContextChineseLabel("视觉参考")} <span class="context-en-label">Visual references</span></summary>
      ${hotspot ? hotspotReferences : `${hotspotReferences}${referenceItems}${contextGalleryIntro}${contextGallery}`}
    </details>` : "";
  const sourcesAccordion = hasTextSources ? `<details class="context-section">
      <summary>${renderContextChineseLabel("参考资料")} <span class="context-en-label">References</span></summary>
      ${contextSources}
    </details>` : "";
  const chapterContext = hotspot?.hideChapterContext ? "" : `
    ${hotspot ? "" : `<div class="context-primary">
      ${renderContextParagraphs(context.zh, "context-body-zh")}
      ${renderContextParagraphs(context.en, "context-en context-body-en")}
    </div>`}
    ${imagesAccordion}
    ${sourcesAccordion}
    <div class="context-novel-section">
      <button class="context-novel-toggle fullscreen-button" type="button" data-open-full-story>
        ${renderContextChineseLabel("小说原文阅读")} <span class="context-en-label">Read the novel</span>
      </button>
    </div>`;
  contextContent.innerHTML = `
    <h2 class="context-title-zh">${renderContextChineseLabel(hotspot ? hotspot.zh : context.title)}</h2>
    <p class="context-title-en">${hotspot ? hotspot.en : context.titleEn}</p>
    ${hotspot ? hotspotReading : ""}
    ${chapterContext}`;
  buildTraditionalContextBodies();
  updateContextChineseLabels();
  bindReferenceGallery(hotspot);
  if (!hotspot) bindReferenceGallery(context);
}

// 全局唯一入口：不管是主屏按钮还是侧栏，语言切换都走这一个函数。
// 三件事：①记住选择 ②重新渲染当前正在显示的内容 ③告诉 CSS 现在是哪个语言状态。
function setMainLanguage(language) {
  const nextLanguage = ["zh-hans", "zh-hant", "en"].includes(language) ? language : "zh-hans";
  mainLanguage = nextLanguage;

  document.documentElement.dataset.mainLanguage = nextLanguage; // 给 CSS 用，比如 en 状态下隐藏中文行
  contextPanel.dataset.language = nextLanguage; // 侧栏原有的簡/繁/EN 单字段显示逻辑继续复用，不用改 CSS

  mainLanguageButtons.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.mainLanguage === nextLanguage));
  });

  updateContextChineseLabels();
  updateContextLocaleChrome();
  updateImageLightboxCaption();
  if (yearEl && titleZhEl && titleEnEl) setChapterInfo();

  // 侧栏内容如果已经渲染过（比如面板正开着），跟着重新生成一次繁体镜像
  if (contextContent && contextContent.children.length) buildTraditionalContextBodies();

  // 主线叙事正文是整章一起生成的（不是逐句生成），语言变了就整章重画一次，
  // 阅读进度（当前停在第几句）不会跟着重置，因为 renderChapterText 只负责重新拼字，
  // 真正记录"现在读到哪"的 stepIndex / visualStep 是另外两个变量，不会被这次重画动到。
  if (narrative && narrative.querySelector(".poem")) renderChapterText();

  // hotspot 提示框是鼠标悬停才出现的短生命周期元素，切换语言这一刻它多半没在显示；
  // 就不额外加状态去刷新它了，下次悬停触发时会自动用最新的 mainLanguage 生成文字。
  if (tooltip) hideTooltip();
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
  chapter6OpeningCueActive = false;
  chapter6OpeningAdvanceRequested = false;
  chapter6GlanceTimer = null;
  chapter6HintTimer = null;
  chapter6PassiveCloseTimer = null;
  chapter6SpotlightFrame = null;
}

function waitForChapter6Sequence(duration, runId, { preserveReadingTime = false } = {}) {
  const actualDuration = prefersReducedMotion() && !preserveReadingTime
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

function advanceChapter6OpeningGlance() {
  if (
    !isChapter6ImageMode()
    || !memoryLayer.classList.contains("is-glancing")
    || !chapter6OpeningCueActive
  ) return false;
  chapter6OpeningAdvanceRequested = true;
  chapter6SequenceWaits.forEach((resolve, timer) => {
    clearTimeout(timer);
    chapter6SequenceWaits.delete(timer);
    resolve(true);
  });
  return true;
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
      <p class="memory-thought-zh" lang="zh-CN">${convertZh(zh)}</p>
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
  if (timing.advanceOnClick) {
    chapter6OpeningCueActive = true;
    chapter6OpeningAdvanceRequested = false;
  }
  showMemoryThought(cue.thoughtZh, cue.thoughtEn, timing.interactive);
  if (!await waitForChapter6Sequence(timing.enter, runId)) {
    chapter6OpeningCueActive = false;
    chapter6OpeningAdvanceRequested = false;
    return false;
  }
  if (timing.persist) return true;
  if (
    !chapter6OpeningAdvanceRequested
    && !await waitForChapter6Sequence(timing.hold, runId, { preserveReadingTime:true })
  ) {
    chapter6OpeningCueActive = false;
    chapter6OpeningAdvanceRequested = false;
    return false;
  }
  chapter6OpeningCueActive = false;
  chapter6OpeningAdvanceRequested = false;
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
        hold:cue.openingHold ?? CHAPTER_6_MEMORY_TIMING.openingThoughtHold,
        exit:CHAPTER_6_MEMORY_TIMING.openingThoughtExit,
        advanceOnClick:true
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
  // 第一章 BGM 的独立 GainNode，共用同一个 AudioContext。
  chapter1AmbientGainNode = chapter6AudioContext.createGain();
  chapter1AmbientGainNode.gain.value = 0;
  chapter1AmbientGainNode.connect(chapter6AudioContext.destination);
  // 第五章开门音效的独立 GainNode，共用同一个 AudioContext 但音量与 Ch6 环境声互不干扰。
  doorSoundGainNode = chapter6AudioContext.createGain();
  doorSoundGainNode.gain.value = CHAPTER_5_DOOR_SOUND.volume;
  doorSoundGainNode.connect(chapter6AudioContext.destination);
  // 第四章环境声的独立 GainNode，共用同一个 AudioContext。
  chapter4AmbientGainNode = chapter6AudioContext.createGain();
  chapter4AmbientGainNode.gain.value = 0;
  chapter4AmbientGainNode.connect(chapter6AudioContext.destination);
  // 第二章循环声部的独立 GainNode，共用同一个 AudioContext。
  chapter2LoopGainNode = chapter6AudioContext.createGain();
  chapter2LoopGainNode.gain.value = 0;
  chapter2LoopGainNode.connect(chapter6AudioContext.destination);
  // 第二章一次性音效的独立 GainNode，音量与 ch2-loop 互不影响。
  chapter2OnceGainNode = chapter6AudioContext.createGain();
  chapter2OnceGainNode.gain.value = CHAPTER_2_ONCE_SOUND.volume;
  chapter2OnceGainNode.connect(chapter6AudioContext.destination);
  // 第三章循环声部的独立 GainNode，共用同一个 AudioContext。
  chapter3LoopGainNode = chapter6AudioContext.createGain();
  chapter3LoopGainNode.gain.value = 0;
  chapter3LoopGainNode.connect(chapter6AudioContext.destination);
  // 第五章环境循环声（复用 ch3-loop 素材）的独立 GainNode，与 doorSoundGainNode（开门音效）互不影响。
  chapter5LoopGainNode = chapter6AudioContext.createGain();
  chapter5LoopGainNode.gain.value = 0;
  chapter5LoopGainNode.connect(chapter6AudioContext.destination);
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
  if (duration <= 0) {
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
  if (!soundEnabled) {
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
// 第一章 BGM（1-loop-bgm）：与 Ch4/Ch6 相同的主管线（decodeAudioData →
// AudioBufferSourceNode），但刻意不裁剪首尾——素材本身已在轨道里手工做过淡出到低电平，
// 循环时保留这段自然的「接缝」（stitch/gap），不追求 sample-accurate 无缝循环。
// 先导文阶段不出声；先导文切换到画面的一刻（showImage）开始播放，逻辑与 Ch4 环境声一致。
// ============================================================
function loadChapter1AmbientBuffer() {
  if (chapter1AmbientBuffer) return Promise.resolve(chapter1AmbientBuffer);
  if (chapter1AmbientBufferPromise) return chapter1AmbientBufferPromise;
  const context = ensureChapter6AudioContext();
  if (!context) return Promise.resolve(null);
  const probe = new Audio();
  const canPlayM4a = probe.canPlayType("audio/mp4; codecs=mp4a.40.2");
  const src = canPlayM4a ? CHAPTER_1_SOUND.srcM4a : CHAPTER_1_SOUND.srcOgg;
  chapter1AmbientBufferPromise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
      return response.arrayBuffer();
    })
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(buffer => {
      chapter1AmbientBuffer = buffer;
      return buffer;
    })
    .catch(fetchError => {
      console.warn("[ch1-sound] decodeAudioData pipeline unavailable, falling back to <audio> element:", fetchError);
      chapter1AmbientUseFallbackElement = true;
      return null;
    });
  return chapter1AmbientBufferPromise;
}

function stopChapter1AmbientBufferSource() {
  if (!chapter1AmbientBufferSource) return;
  try { chapter1AmbientBufferSource.onended = null; chapter1AmbientBufferSource.stop(); } catch (_) {}
  chapter1AmbientBufferSource = null;
}

function startChapter1AmbientBufferSource(buffer) {
  const context = ensureChapter6AudioContext();
  if (!context || !buffer || !chapter1AmbientGainNode) return false;
  stopChapter1AmbientBufferSource();
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const loopStart = Math.max(0, Math.min(buffer.duration, CHAPTER_1_SOUND.loopStartSeconds || 0));
  const loopEnd = Math.max(loopStart, buffer.duration - Math.max(0, CHAPTER_1_SOUND.loopEndTrimSeconds || 0));
  source.loopStart = loopStart;
  source.loopEnd = loopEnd;
  source.connect(chapter1AmbientGainNode);
  source.start(0, loopStart);
  chapter1AmbientBufferSource = source;
  return true;
}

function ensureChapter1AmbientElement() {
  if (chapter1AmbientAudioEl) return chapter1AmbientAudioEl;
  const context = ensureChapter6AudioContext();
  if (!context) { console.warn("[ch1-sound] AudioContext unavailable"); return null; }
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false;
  audio.crossOrigin = "anonymous";
  const canPlayM4a = audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
  audio.src = canPlayM4a ? CHAPTER_1_SOUND.srcM4a : CHAPTER_1_SOUND.srcOgg;
  audio.addEventListener("error", () => {
    if (audio.dataset.fallbackTried) {
      console.warn("[ch1-sound] could not load ambient audio (both sources failed)");
      return;
    }
    audio.dataset.fallbackTried = "1";
    const fallbackSrc = audio.src.includes(encodeURI(CHAPTER_1_SOUND.srcM4a).split("/").pop())
      ? CHAPTER_1_SOUND.srcOgg
      : CHAPTER_1_SOUND.srcM4a;
    console.warn("[ch1-sound] primary source failed, falling back to:", fallbackSrc);
    audio.src = fallbackSrc;
    audio.load();
  });
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    if (audio.currentTime >= audio.duration - CHAPTER_1_SOUND.loopTailSeconds) audio.currentTime = 0;
  });
  audio.addEventListener("ended", () => {
    if (!chapter1AmbientGainNode) return;
    try { audio.currentTime = 0; } catch (_) {}
    audio.play().catch(() => {});
  });
  const source = context.createMediaElementSource(audio);
  source.connect(chapter1AmbientGainNode);
  chapter1AmbientAudioEl = audio;
  return audio;
}

function startChapter1AmbientFallbackElement() {
  const context = ensureChapter6AudioContext();
  const audio = ensureChapter1AmbientElement();
  if (!context || !audio) return;
  audio.currentTime = 0;
  audio.play()?.catch(playbackError => console.warn("[ch1-sound] play() failed:", playbackError));
}

function startChapter1AmbientSource() {
  if (chapter1AmbientUseFallbackElement) {
    startChapter1AmbientFallbackElement();
    return;
  }
  loadChapter1AmbientBuffer().then(buffer => {
    if (buffer) {
      if (!startChapter1AmbientBufferSource(buffer)) startChapter1AmbientFallbackElement();
    } else {
      startChapter1AmbientFallbackElement();
    }
  });
}

function stopChapter1AmbientSource() {
  stopChapter1AmbientBufferSource();
  if (chapter1AmbientAudioEl) chapter1AmbientAudioEl.pause();
}

function isChapter1AmbientSourcePlaying() {
  return Boolean(chapter1AmbientBufferSource) || (chapter1AmbientAudioEl && !chapter1AmbientAudioEl.paused);
}

function cancelChapter1AmbientFade() {
  if (chapter1AmbientFadeFrame) cancelAnimationFrame(chapter1AmbientFadeFrame);
  chapter1AmbientFadeFrame = null;
}

function setChapter1AmbientGain(value) {
  if (chapter1AmbientGainNode) chapter1AmbientGainNode.gain.value = value;
}

function getChapter1AmbientGain() {
  return chapter1AmbientGainNode ? chapter1AmbientGainNode.gain.value : 0;
}

function fadeChapter1Ambient(targetVolume, duration) {
  if (!chapter1AmbientGainNode) return;
  cancelChapter1AmbientFade();
  const clampedTarget = Math.max(0, Math.min(1, targetVolume));
  if (!soundEnabled) {
    setChapter1AmbientGain(0);
    stopChapter1AmbientSource();
    return;
  }
  if (duration <= 0) {
    setChapter1AmbientGain(clampedTarget);
    return;
  }
  const startVolume = getChapter1AmbientGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter1AmbientGain(startVolume + (clampedTarget - startVolume) * progress);
    if (progress < 1) chapter1AmbientFadeFrame = requestAnimationFrame(step);
    else chapter1AmbientFadeFrame = null;
  };
  chapter1AmbientFadeFrame = requestAnimationFrame(step);
}

function ensureChapter1AmbientPlaying() {
  if (!soundEnabled) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  if (isChapter1AmbientSourcePlaying()) return;
  startChapter1AmbientSource();
}

// 由 showImage() 在先导文切换到画面的一刻调用：先导文阶段始终静音，
// 淡入到满音量。
function revealChapter1Ambient() {
  if (chapterIndex !== CHAPTER_1_INDEX) return;
  chapter1AmbientRevealed = true;
  if (!soundEnabled) { setChapter1AmbientGain(0); return; }
  ensureChapter1AmbientPlaying();
  fadeChapter1Ambient(CHAPTER_1_SOUND.revealVolume, CHAPTER_1_SOUND.revealFadeDuration);
}

// 离开第一章（跳转其他章节、时间线）时调用：淡出并停止。
function stopChapter1Ambient() {
  if (!chapter1AmbientGainNode) return;
  chapter1AmbientRevealed = false;
  if (!soundEnabled) {
    cancelChapter1AmbientFade();
    setChapter1AmbientGain(0);
    stopChapter1AmbientSource();
    return;
  }
  cancelChapter1AmbientFade();
  const duration = CHAPTER_1_SOUND.exitFadeDuration;
  const startVolume = getChapter1AmbientGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter1AmbientGain(startVolume * (1 - progress));
    if (progress < 1) chapter1AmbientFadeFrame = requestAnimationFrame(step);
    else {
      chapter1AmbientFadeFrame = null;
      stopChapter1AmbientSource();
    }
  };
  chapter1AmbientFadeFrame = requestAnimationFrame(step);
}

// 用户在静音状态下打开「声音」开关，且当前正处于第一章：音频从头播放并淡入。
function unmuteChapter1AmbientIfActive() {
  if (chapterIndex !== CHAPTER_1_INDEX) return;
  cancelChapter1AmbientFade();
  setChapter1AmbientGain(0);
  const target = chapter1AmbientRevealed ? CHAPTER_1_SOUND.revealVolume : 0;
  if (target <= 0) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  startChapter1AmbientSource();
  fadeChapter1Ambient(target, CHAPTER_1_SOUND.unmuteFadeDuration);
}

// ============================================================
// 第二章循环声部（ch2-loop）：实现方式与第四章环境声完全一致（decodeAudioData →
// AudioBufferSourceNode，sample-accurate 无缝循环，<audio> 元素兜底）。
// 先导文阶段不出声；画面出现的一刻（showImage）才开始播放，与 ch2-once-shatter 同时触发。
// ============================================================
function loadChapter2LoopBuffer() {
  if (chapter2LoopBuffer) return Promise.resolve(chapter2LoopBuffer);
  if (chapter2LoopBufferPromise) return chapter2LoopBufferPromise;
  const context = ensureChapter6AudioContext();
  if (!context) return Promise.resolve(null);
  const probe = new Audio();
  const canPlayM4a = probe.canPlayType("audio/mp4; codecs=mp4a.40.2");
  chapter2LoopBufferIsM4a = Boolean(canPlayM4a);
  const src = canPlayM4a ? CHAPTER_2_LOOP_SOUND.srcM4a : CHAPTER_2_LOOP_SOUND.srcOgg;
  chapter2LoopBufferPromise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
      return response.arrayBuffer();
    })
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(buffer => {
      chapter2LoopBuffer = buffer;
      return buffer;
    })
    .catch(fetchError => {
      console.warn("[ch2-loop-sound] decodeAudioData pipeline unavailable, falling back to <audio> element:", fetchError);
      chapter2LoopUseFallbackElement = true;
      return null;
    });
  return chapter2LoopBufferPromise;
}

function stopChapter2LoopBufferSource() {
  if (!chapter2LoopBufferSource) return;
  try { chapter2LoopBufferSource.onended = null; chapter2LoopBufferSource.stop(); } catch (_) {}
  chapter2LoopBufferSource = null;
}

function startChapter2LoopBufferSource(buffer) {
  const context = ensureChapter6AudioContext();
  if (!context || !buffer || !chapter2LoopGainNode) return false;
  stopChapter2LoopBufferSource();
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const loopStartSeconds = chapter2LoopBufferIsM4a ? CHAPTER_2_LOOP_SOUND.loopStartSecondsM4a : CHAPTER_2_LOOP_SOUND.loopStartSecondsOgg;
  const loopEndTrimSeconds = chapter2LoopBufferIsM4a ? CHAPTER_2_LOOP_SOUND.loopEndTrimSecondsM4a : CHAPTER_2_LOOP_SOUND.loopEndTrimSecondsOgg;
  const loopStart = Math.max(0, Math.min(buffer.duration, loopStartSeconds || 0));
  const loopEnd = Math.max(loopStart, buffer.duration - Math.max(0, loopEndTrimSeconds || 0));
  source.loopStart = loopStart;
  source.loopEnd = loopEnd;
  source.connect(chapter2LoopGainNode);
  source.start(0, loopStart);
  chapter2LoopBufferSource = source;
  return true;
}

function ensureChapter2LoopElement() {
  if (chapter2LoopAudioEl) return chapter2LoopAudioEl;
  const context = ensureChapter6AudioContext();
  if (!context) { console.warn("[ch2-loop-sound] AudioContext unavailable"); return null; }
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false;
  audio.crossOrigin = "anonymous";
  const canPlayM4a = audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
  audio.src = canPlayM4a ? CHAPTER_2_LOOP_SOUND.srcM4a : CHAPTER_2_LOOP_SOUND.srcOgg;
  audio.addEventListener("error", () => {
    if (audio.dataset.fallbackTried) {
      console.warn("[ch2-loop-sound] could not load ambient audio (both sources failed)");
      return;
    }
    audio.dataset.fallbackTried = "1";
    const fallbackSrc = audio.src.includes(encodeURI(CHAPTER_2_LOOP_SOUND.srcM4a).split("/").pop())
      ? CHAPTER_2_LOOP_SOUND.srcOgg
      : CHAPTER_2_LOOP_SOUND.srcM4a;
    console.warn("[ch2-loop-sound] primary source failed, falling back to:", fallbackSrc);
    audio.src = fallbackSrc;
    audio.load();
  });
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    if (audio.currentTime >= audio.duration - CHAPTER_2_LOOP_SOUND.loopTailSeconds) audio.currentTime = 0;
  });
  audio.addEventListener("ended", () => {
    if (!chapter2LoopGainNode) return;
    try { audio.currentTime = 0; } catch (_) {}
    audio.play().catch(() => {});
  });
  const source = context.createMediaElementSource(audio);
  source.connect(chapter2LoopGainNode);
  chapter2LoopAudioEl = audio;
  return audio;
}

function startChapter2LoopFallbackElement() {
  const context = ensureChapter6AudioContext();
  const audio = ensureChapter2LoopElement();
  if (!context || !audio) return;
  audio.currentTime = 0;
  audio.play()?.catch(playbackError => console.warn("[ch2-loop-sound] play() failed:", playbackError));
}

function startChapter2LoopSource() {
  if (chapter2LoopUseFallbackElement) {
    startChapter2LoopFallbackElement();
    return;
  }
  loadChapter2LoopBuffer().then(buffer => {
    if (buffer) {
      if (!startChapter2LoopBufferSource(buffer)) startChapter2LoopFallbackElement();
    } else {
      startChapter2LoopFallbackElement();
    }
  });
}

function stopChapter2LoopSourceOnly() {
  stopChapter2LoopBufferSource();
  if (chapter2LoopAudioEl) chapter2LoopAudioEl.pause();
}

function isChapter2LoopSourcePlaying() {
  return Boolean(chapter2LoopBufferSource) || (chapter2LoopAudioEl && !chapter2LoopAudioEl.paused);
}

function cancelChapter2LoopFade() {
  if (chapter2LoopFadeFrame) cancelAnimationFrame(chapter2LoopFadeFrame);
  chapter2LoopFadeFrame = null;
}

function setChapter2LoopGain(value) {
  if (chapter2LoopGainNode) chapter2LoopGainNode.gain.value = value;
}

function getChapter2LoopGain() {
  return chapter2LoopGainNode ? chapter2LoopGainNode.gain.value : 0;
}

function fadeChapter2Loop(targetVolume, duration) {
  if (!chapter2LoopGainNode) return;
  cancelChapter2LoopFade();
  const clampedTarget = Math.max(0, Math.min(1, targetVolume));
  if (!soundEnabled) {
    setChapter2LoopGain(0);
    stopChapter2LoopSourceOnly();
    return;
  }
  if (duration <= 0) {
    setChapter2LoopGain(clampedTarget);
    return;
  }
  const startVolume = getChapter2LoopGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter2LoopGain(startVolume + (clampedTarget - startVolume) * progress);
    if (progress < 1) chapter2LoopFadeFrame = requestAnimationFrame(step);
    else chapter2LoopFadeFrame = null;
  };
  chapter2LoopFadeFrame = requestAnimationFrame(step);
}

function ensureChapter2LoopPlaying() {
  if (!soundEnabled) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  if (isChapter2LoopSourcePlaying()) return;
  startChapter2LoopSource();
}

// 由 showImage() 在第二章画面出现的一刻调用：先导文阶段始终静音，
// 淡入到满音量，与 playChapter2OnceSound() 同时触发。
function revealChapter2Loop() {
  if (chapterIndex !== CHAPTER_2_INDEX) return;
  chapter2LoopRevealed = true;
  if (!soundEnabled) { setChapter2LoopGain(0); return; }
  ensureChapter2LoopPlaying();
  fadeChapter2Loop(CHAPTER_2_LOOP_SOUND.revealVolume, CHAPTER_2_LOOP_SOUND.revealFadeDuration);
}

// 离开第二章（跳转其他章节、时间线）时调用：淡出并停止。
function stopChapter2Loop() {
  if (!chapter2LoopGainNode) return;
  chapter2LoopRevealed = false;
  if (!soundEnabled) {
    cancelChapter2LoopFade();
    setChapter2LoopGain(0);
    stopChapter2LoopSourceOnly();
    return;
  }
  cancelChapter2LoopFade();
  const duration = CHAPTER_2_LOOP_SOUND.exitFadeDuration;
  const startVolume = getChapter2LoopGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter2LoopGain(startVolume * (1 - progress));
    if (progress < 1) chapter2LoopFadeFrame = requestAnimationFrame(step);
    else {
      chapter2LoopFadeFrame = null;
      stopChapter2LoopSourceOnly();
    }
  };
  chapter2LoopFadeFrame = requestAnimationFrame(step);
}

// 用户在静音状态下打开「声音」开关，且当前正处于第二章：音频从头播放并淡入。
function unmuteChapter2LoopIfActive() {
  if (chapterIndex !== CHAPTER_2_INDEX) return;
  cancelChapter2LoopFade();
  setChapter2LoopGain(0);
  const target = chapter2LoopRevealed ? CHAPTER_2_LOOP_SOUND.revealVolume : 0;
  if (target <= 0) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  startChapter2LoopSource();
  fadeChapter2Loop(target, CHAPTER_2_LOOP_SOUND.unmuteFadeDuration);
}

// ============================================================
// 第二章一次性音效（ch2-once-shatter）：单次播放，不循环，与 ch2-loop 同时触发。
// 实现方式与第五章开门音效完全一致（decodeAudioData → AudioBufferSourceNode 主管线，
// <audio> 元素兜底）。音量由独立的 chapter2OnceGainNode 控制，
// 见 CHAPTER_2_ONCE_SOUND.volume（后期调音量改那里即可）。
// ============================================================
function loadChapter2OnceBuffer() {
  if (chapter2OnceBuffer) return Promise.resolve(chapter2OnceBuffer);
  if (chapter2OnceBufferPromise) return chapter2OnceBufferPromise;
  const context = ensureChapter6AudioContext();
  if (!context) return Promise.resolve(null);
  const probe = new Audio();
  const canPlayM4a = probe.canPlayType("audio/mp4; codecs=mp4a.40.2");
  const src = canPlayM4a ? CHAPTER_2_ONCE_SOUND.srcM4a : CHAPTER_2_ONCE_SOUND.srcOgg;
  chapter2OnceBufferPromise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
      return response.arrayBuffer();
    })
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(buffer => {
      chapter2OnceBuffer = buffer;
      return buffer;
    })
    .catch(fetchError => {
      console.warn("[ch2-once-sound] decodeAudioData pipeline unavailable, falling back to <audio> element:", fetchError);
      chapter2OnceUseFallbackElement = true;
      return null;
    });
  return chapter2OnceBufferPromise;
}

function playChapter2OnceBuffer(buffer) {
  const context = ensureChapter6AudioContext();
  if (!context || !buffer || !chapter2OnceGainNode) return false;
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = false; // 单次播放，不重复
  source.connect(chapter2OnceGainNode);
  source.onended = () => {
    if (chapter2OnceBufferSource === source) chapter2OnceBufferSource = null;
  };
  source.start(0);
  chapter2OnceBufferSource = source;
  return true;
}

function ensureChapter2OnceElement() {
  if (chapter2OnceAudioEl) return chapter2OnceAudioEl;
  const context = ensureChapter6AudioContext();
  if (!context) { console.warn("[ch2-once-sound] AudioContext unavailable"); return null; }
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false; // 单次播放，不重复
  audio.crossOrigin = "anonymous";
  const canPlayM4a = audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
  audio.src = canPlayM4a ? CHAPTER_2_ONCE_SOUND.srcM4a : CHAPTER_2_ONCE_SOUND.srcOgg;
  audio.addEventListener("error", () => {
    if (audio.dataset.fallbackTried) {
      console.warn("[ch2-once-sound] could not load one-shot sound (both sources failed)");
      return;
    }
    audio.dataset.fallbackTried = "1";
    const fallbackSrc = audio.src.includes(encodeURI(CHAPTER_2_ONCE_SOUND.srcM4a).split("/").pop())
      ? CHAPTER_2_ONCE_SOUND.srcOgg
      : CHAPTER_2_ONCE_SOUND.srcM4a;
    console.warn("[ch2-once-sound] primary source failed, falling back to:", fallbackSrc);
    audio.src = fallbackSrc;
    audio.load();
  });
  const source = context.createMediaElementSource(audio);
  source.connect(chapter2OnceGainNode);
  chapter2OnceAudioEl = audio;
  return audio;
}

function playChapter2OnceFallbackElement() {
  const context = ensureChapter6AudioContext();
  const audio = ensureChapter2OnceElement();
  if (!context || !audio) return;
  audio.currentTime = 0;
  audio.play()?.catch(playbackError => console.warn("[ch2-once-sound] play() failed:", playbackError));
}

// 离开第二章（跳转其他章节、时间线、回到开场页）时调用：不管播放到哪个进度，
// 立即打断——不淡出、不等播完，这是「一次性音效」而非环境声，没有淡出的必要。
function stopChapter2OnceSound() {
  if (chapter2OnceBufferSource) {
    try { chapter2OnceBufferSource.onended = null; chapter2OnceBufferSource.stop(); } catch (_) {}
    chapter2OnceBufferSource = null;
  }
  if (chapter2OnceAudioEl && !chapter2OnceAudioEl.paused) {
    chapter2OnceAudioEl.pause();
    try { chapter2OnceAudioEl.currentTime = 0; } catch (_) {}
  }
}

// 统一入口：优先主管线（AudioBufferSourceNode，单次播放），回退兜底 <audio> 元素。
// 若声音已被静音（soundEnabled === false）则不播放。由 showImage() 在第二章
// 画面出现的一刻调用，与 revealChapter2Loop() 同时触发。
function playChapter2OnceSound() {
  if (!soundEnabled) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  if (chapter2OnceUseFallbackElement) {
    playChapter2OnceFallbackElement();
    return;
  }
  loadChapter2OnceBuffer().then(buffer => {
    if (buffer) {
      if (!playChapter2OnceBuffer(buffer)) playChapter2OnceFallbackElement();
    } else {
      playChapter2OnceFallbackElement();
    }
  });
}

// ============================================================
// 第三章循环声部（ch3-loop）：实现方式与第四章环境声完全一致（decodeAudioData →
// AudioBufferSourceNode，sample-accurate 无缝循环，<audio> 元素兜底）。
// 先导文阶段不出声；画面出现的一刻（showImage）才开始播放。
// ============================================================
function loadChapter3LoopBuffer() {
  if (chapter3LoopBuffer) return Promise.resolve(chapter3LoopBuffer);
  if (chapter3LoopBufferPromise) return chapter3LoopBufferPromise;
  const context = ensureChapter6AudioContext();
  if (!context) return Promise.resolve(null);
  const probe = new Audio();
  const canPlayM4a = probe.canPlayType("audio/mp4; codecs=mp4a.40.2");
  chapter3LoopBufferIsM4a = Boolean(canPlayM4a);
  const src = canPlayM4a ? CHAPTER_3_SOUND.srcM4a : CHAPTER_3_SOUND.srcOgg;
  chapter3LoopBufferPromise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
      return response.arrayBuffer();
    })
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(buffer => {
      chapter3LoopBuffer = buffer;
      return buffer;
    })
    .catch(fetchError => {
      console.warn("[ch3-loop-sound] decodeAudioData pipeline unavailable, falling back to <audio> element:", fetchError);
      chapter3LoopUseFallbackElement = true;
      return null;
    });
  return chapter3LoopBufferPromise;
}

function stopChapter3LoopBufferSource() {
  if (!chapter3LoopBufferSource) return;
  try { chapter3LoopBufferSource.onended = null; chapter3LoopBufferSource.stop(); } catch (_) {}
  chapter3LoopBufferSource = null;
}

function startChapter3LoopBufferSource(buffer) {
  const context = ensureChapter6AudioContext();
  if (!context || !buffer || !chapter3LoopGainNode) return false;
  stopChapter3LoopBufferSource();
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const loopStartSeconds = chapter3LoopBufferIsM4a ? CHAPTER_3_SOUND.loopStartSecondsM4a : CHAPTER_3_SOUND.loopStartSecondsOgg;
  const loopEndTrimSeconds = chapter3LoopBufferIsM4a ? CHAPTER_3_SOUND.loopEndTrimSecondsM4a : CHAPTER_3_SOUND.loopEndTrimSecondsOgg;
  const loopStart = Math.max(0, Math.min(buffer.duration, loopStartSeconds || 0));
  const loopEnd = Math.max(loopStart, buffer.duration - Math.max(0, loopEndTrimSeconds || 0));
  source.loopStart = loopStart;
  source.loopEnd = loopEnd;
  source.connect(chapter3LoopGainNode);
  source.start(0, loopStart);
  chapter3LoopBufferSource = source;
  return true;
}

function ensureChapter3LoopElement() {
  if (chapter3LoopAudioEl) return chapter3LoopAudioEl;
  const context = ensureChapter6AudioContext();
  if (!context) { console.warn("[ch3-loop-sound] AudioContext unavailable"); return null; }
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false;
  audio.crossOrigin = "anonymous";
  const canPlayM4a = audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
  audio.src = canPlayM4a ? CHAPTER_3_SOUND.srcM4a : CHAPTER_3_SOUND.srcOgg;
  audio.addEventListener("error", () => {
    if (audio.dataset.fallbackTried) {
      console.warn("[ch3-loop-sound] could not load ambient audio (both sources failed)");
      return;
    }
    audio.dataset.fallbackTried = "1";
    const fallbackSrc = audio.src.includes(encodeURI(CHAPTER_3_SOUND.srcM4a).split("/").pop())
      ? CHAPTER_3_SOUND.srcOgg
      : CHAPTER_3_SOUND.srcM4a;
    console.warn("[ch3-loop-sound] primary source failed, falling back to:", fallbackSrc);
    audio.src = fallbackSrc;
    audio.load();
  });
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    if (audio.currentTime >= audio.duration - CHAPTER_3_SOUND.loopTailSeconds) audio.currentTime = 0;
  });
  audio.addEventListener("ended", () => {
    if (!chapter3LoopGainNode) return;
    try { audio.currentTime = 0; } catch (_) {}
    audio.play().catch(() => {});
  });
  const source = context.createMediaElementSource(audio);
  source.connect(chapter3LoopGainNode);
  chapter3LoopAudioEl = audio;
  return audio;
}

function startChapter3LoopFallbackElement() {
  const context = ensureChapter6AudioContext();
  const audio = ensureChapter3LoopElement();
  if (!context || !audio) return;
  audio.currentTime = 0;
  audio.play()?.catch(playbackError => console.warn("[ch3-loop-sound] play() failed:", playbackError));
}

function startChapter3LoopSource() {
  if (chapter3LoopUseFallbackElement) {
    startChapter3LoopFallbackElement();
    return;
  }
  loadChapter3LoopBuffer().then(buffer => {
    if (buffer) {
      if (!startChapter3LoopBufferSource(buffer)) startChapter3LoopFallbackElement();
    } else {
      startChapter3LoopFallbackElement();
    }
  });
}

function stopChapter3LoopSourceOnly() {
  stopChapter3LoopBufferSource();
  if (chapter3LoopAudioEl) chapter3LoopAudioEl.pause();
}

function isChapter3LoopSourcePlaying() {
  return Boolean(chapter3LoopBufferSource) || (chapter3LoopAudioEl && !chapter3LoopAudioEl.paused);
}

function cancelChapter3LoopFade() {
  if (chapter3LoopFadeFrame) cancelAnimationFrame(chapter3LoopFadeFrame);
  chapter3LoopFadeFrame = null;
}

// 音量读写：调音量最终生效的地方——setChapter3LoopGain 直接改这个 GainNode 的 gain.value，
// fadeChapter3Loop() 的淡入淡出目标值来自 CHAPTER_3_SOUND.revealVolume（后期手动调音量改那里）。
function setChapter3LoopGain(value) {
  if (chapter3LoopGainNode) chapter3LoopGainNode.gain.value = value;
}

function getChapter3LoopGain() {
  return chapter3LoopGainNode ? chapter3LoopGainNode.gain.value : 0;
}

function fadeChapter3Loop(targetVolume, duration) {
  if (!chapter3LoopGainNode) return;
  cancelChapter3LoopFade();
  const clampedTarget = Math.max(0, Math.min(1, targetVolume));
  if (!soundEnabled) {
    setChapter3LoopGain(0);
    stopChapter3LoopSourceOnly();
    return;
  }
  if (duration <= 0) {
    setChapter3LoopGain(clampedTarget);
    return;
  }
  const startVolume = getChapter3LoopGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter3LoopGain(startVolume + (clampedTarget - startVolume) * progress);
    if (progress < 1) chapter3LoopFadeFrame = requestAnimationFrame(step);
    else chapter3LoopFadeFrame = null;
  };
  chapter3LoopFadeFrame = requestAnimationFrame(step);
}

function ensureChapter3LoopPlaying() {
  if (!soundEnabled) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  if (isChapter3LoopSourcePlaying()) return;
  startChapter3LoopSource();
}

// 由 showImage() 在第三章画面出现的一刻调用：先导文阶段始终静音，淡入到满音量。
function revealChapter3Loop() {
  if (chapterIndex !== CHAPTER_3_INDEX) return;
  chapter3LoopRevealed = true;
  if (!soundEnabled) { setChapter3LoopGain(0); return; }
  ensureChapter3LoopPlaying();
  fadeChapter3Loop(CHAPTER_3_SOUND.revealVolume, CHAPTER_3_SOUND.revealFadeDuration);
}

// 离开第三章（跳转其他章节、时间线）时调用：淡出并停止。
function stopChapter3Loop() {
  if (!chapter3LoopGainNode) return;
  chapter3LoopRevealed = false;
  if (!soundEnabled) {
    cancelChapter3LoopFade();
    setChapter3LoopGain(0);
    stopChapter3LoopSourceOnly();
    return;
  }
  cancelChapter3LoopFade();
  const duration = CHAPTER_3_SOUND.exitFadeDuration;
  const startVolume = getChapter3LoopGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter3LoopGain(startVolume * (1 - progress));
    if (progress < 1) chapter3LoopFadeFrame = requestAnimationFrame(step);
    else {
      chapter3LoopFadeFrame = null;
      stopChapter3LoopSourceOnly();
    }
  };
  chapter3LoopFadeFrame = requestAnimationFrame(step);
}

// 用户在静音状态下打开「声音」开关，且当前正处于第三章：音频从头播放并淡入。
function unmuteChapter3LoopIfActive() {
  if (chapterIndex !== CHAPTER_3_INDEX) return;
  cancelChapter3LoopFade();
  setChapter3LoopGain(0);
  const target = chapter3LoopRevealed ? CHAPTER_3_SOUND.revealVolume : 0;
  if (target <= 0) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  startChapter3LoopSource();
  fadeChapter3Loop(target, CHAPTER_3_SOUND.unmuteFadeDuration);
}

// ============================================================
// 第五章环境循环声：复用第三章素材（ch3-loop），实现方式与第三章完全一致
// （decodeAudioData → AudioBufferSourceNode，sample-accurate 无缝循环，<audio> 元素兜底）。
// 先导文阶段不出声；画面出现的一刻（showImage）才开始播放。
// 额外多了 duck / undock 一对函数：悬停门 / 点击开门时瞬间降到 50%，移开鼠标且未开门时
// 瞬间恢复满音量——见 duckChapter5Loop() / undoDuckChapter5Loop()，调用点在 door-trigger
// 的 pointerenter/pointerleave 事件绑定处。
// ============================================================
function loadChapter5LoopBuffer() {
  if (chapter5LoopBuffer) return Promise.resolve(chapter5LoopBuffer);
  if (chapter5LoopBufferPromise) return chapter5LoopBufferPromise;
  const context = ensureChapter6AudioContext();
  if (!context) return Promise.resolve(null);
  const probe = new Audio();
  const canPlayM4a = probe.canPlayType("audio/mp4; codecs=mp4a.40.2");
  chapter5LoopBufferIsM4a = Boolean(canPlayM4a);
  const src = canPlayM4a ? CHAPTER_5_LOOP_SOUND.srcM4a : CHAPTER_5_LOOP_SOUND.srcOgg;
  chapter5LoopBufferPromise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
      return response.arrayBuffer();
    })
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(buffer => {
      chapter5LoopBuffer = buffer;
      return buffer;
    })
    .catch(fetchError => {
      console.warn("[ch5-loop-sound] decodeAudioData pipeline unavailable, falling back to <audio> element:", fetchError);
      chapter5LoopUseFallbackElement = true;
      return null;
    });
  return chapter5LoopBufferPromise;
}

function stopChapter5LoopBufferSource() {
  if (!chapter5LoopBufferSource) return;
  try { chapter5LoopBufferSource.onended = null; chapter5LoopBufferSource.stop(); } catch (_) {}
  chapter5LoopBufferSource = null;
}

function startChapter5LoopBufferSource(buffer) {
  const context = ensureChapter6AudioContext();
  if (!context || !buffer || !chapter5LoopGainNode) return false;
  stopChapter5LoopBufferSource();
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const loopStartSeconds = chapter5LoopBufferIsM4a ? CHAPTER_5_LOOP_SOUND.loopStartSecondsM4a : CHAPTER_5_LOOP_SOUND.loopStartSecondsOgg;
  const loopEndTrimSeconds = chapter5LoopBufferIsM4a ? CHAPTER_5_LOOP_SOUND.loopEndTrimSecondsM4a : CHAPTER_5_LOOP_SOUND.loopEndTrimSecondsOgg;
  const loopStart = Math.max(0, Math.min(buffer.duration, loopStartSeconds || 0));
  const loopEnd = Math.max(loopStart, buffer.duration - Math.max(0, loopEndTrimSeconds || 0));
  source.loopStart = loopStart;
  source.loopEnd = loopEnd;
  source.connect(chapter5LoopGainNode);
  source.start(0, loopStart);
  chapter5LoopBufferSource = source;
  return true;
}

function ensureChapter5LoopElement() {
  if (chapter5LoopAudioEl) return chapter5LoopAudioEl;
  const context = ensureChapter6AudioContext();
  if (!context) { console.warn("[ch5-loop-sound] AudioContext unavailable"); return null; }
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false;
  audio.crossOrigin = "anonymous";
  const canPlayM4a = audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
  audio.src = canPlayM4a ? CHAPTER_5_LOOP_SOUND.srcM4a : CHAPTER_5_LOOP_SOUND.srcOgg;
  audio.addEventListener("error", () => {
    if (audio.dataset.fallbackTried) {
      console.warn("[ch5-loop-sound] could not load ambient audio (both sources failed)");
      return;
    }
    audio.dataset.fallbackTried = "1";
    const fallbackSrc = audio.src.includes(encodeURI(CHAPTER_5_LOOP_SOUND.srcM4a).split("/").pop())
      ? CHAPTER_5_LOOP_SOUND.srcOgg
      : CHAPTER_5_LOOP_SOUND.srcM4a;
    console.warn("[ch5-loop-sound] primary source failed, falling back to:", fallbackSrc);
    audio.src = fallbackSrc;
    audio.load();
  });
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    if (audio.currentTime >= audio.duration - CHAPTER_5_LOOP_SOUND.loopTailSeconds) audio.currentTime = 0;
  });
  audio.addEventListener("ended", () => {
    if (!chapter5LoopGainNode) return;
    try { audio.currentTime = 0; } catch (_) {}
    audio.play().catch(() => {});
  });
  const source = context.createMediaElementSource(audio);
  source.connect(chapter5LoopGainNode);
  chapter5LoopAudioEl = audio;
  return audio;
}

function startChapter5LoopFallbackElement() {
  const context = ensureChapter6AudioContext();
  const audio = ensureChapter5LoopElement();
  if (!context || !audio) return;
  audio.currentTime = 0;
  audio.play()?.catch(playbackError => console.warn("[ch5-loop-sound] play() failed:", playbackError));
}

function startChapter5LoopSource() {
  if (chapter5LoopUseFallbackElement) {
    startChapter5LoopFallbackElement();
    return;
  }
  loadChapter5LoopBuffer().then(buffer => {
    if (buffer) {
      if (!startChapter5LoopBufferSource(buffer)) startChapter5LoopFallbackElement();
    } else {
      startChapter5LoopFallbackElement();
    }
  });
}

function stopChapter5LoopSourceOnly() {
  stopChapter5LoopBufferSource();
  if (chapter5LoopAudioEl) chapter5LoopAudioEl.pause();
}

function isChapter5LoopSourcePlaying() {
  return Boolean(chapter5LoopBufferSource) || (chapter5LoopAudioEl && !chapter5LoopAudioEl.paused);
}

function cancelChapter5LoopFade() {
  if (chapter5LoopFadeFrame) cancelAnimationFrame(chapter5LoopFadeFrame);
  chapter5LoopFadeFrame = null;
}

// 音量读写：调音量最终生效的地方。常态音量改 CHAPTER_5_LOOP_SOUND.revealVolume，
// 悬停/开门后的降低音量改 CHAPTER_5_LOOP_SOUND.duckVolume。
function setChapter5LoopGain(value) {
  if (chapter5LoopGainNode) chapter5LoopGainNode.gain.value = value;
}

function getChapter5LoopGain() {
  return chapter5LoopGainNode ? chapter5LoopGainNode.gain.value : 0;
}

function fadeChapter5Loop(targetVolume, duration) {
  if (!chapter5LoopGainNode) return;
  cancelChapter5LoopFade();
  const clampedTarget = Math.max(0, Math.min(1, targetVolume));
  if (!soundEnabled) {
    setChapter5LoopGain(0);
    stopChapter5LoopSourceOnly();
    return;
  }
  if (duration <= 0) {
    setChapter5LoopGain(clampedTarget);
    return;
  }
  const startVolume = getChapter5LoopGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter5LoopGain(startVolume + (clampedTarget - startVolume) * progress);
    if (progress < 1) chapter5LoopFadeFrame = requestAnimationFrame(step);
    else chapter5LoopFadeFrame = null;
  };
  chapter5LoopFadeFrame = requestAnimationFrame(step);
}

function ensureChapter5LoopPlaying() {
  if (!soundEnabled) return;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  if (isChapter5LoopSourcePlaying()) return;
  startChapter5LoopSource();
}

// 由 showImage() 在第五章画面出现的一刻调用：先导文阶段始终静音，淡入到满音量。
function revealChapter5Loop() {
  if (chapterIndex !== CHAPTER_5_INDEX) return;
  chapter5LoopRevealed = true;
  chapter5LoopDucked = false;
  chapter5DoorOpening = false;
  if (!soundEnabled) { setChapter5LoopGain(0); return; }
  ensureChapter5LoopPlaying();
  fadeChapter5Loop(CHAPTER_5_LOOP_SOUND.revealVolume, CHAPTER_5_LOOP_SOUND.revealFadeDuration);
}

// 离开第五章（跳转其他章节、时间线）时调用：淡出并停止。
function stopChapter5Loop() {
  if (!chapter5LoopGainNode) return;
  chapter5LoopRevealed = false;
  chapter5LoopDucked = false;
  if (!soundEnabled) {
    cancelChapter5LoopFade();
    setChapter5LoopGain(0);
    stopChapter5LoopSourceOnly();
    return;
  }
  cancelChapter5LoopFade();
  const duration = CHAPTER_5_LOOP_SOUND.exitFadeDuration;
  const startVolume = getChapter5LoopGain();
  const startedAt = performance.now();
  const step = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    setChapter5LoopGain(startVolume * (1 - progress));
    if (progress < 1) chapter5LoopFadeFrame = requestAnimationFrame(step);
    else {
      chapter5LoopFadeFrame = null;
      stopChapter5LoopSourceOnly();
    }
  };
  chapter5LoopFadeFrame = requestAnimationFrame(step);
}

// 用户在静音状态下打开「声音」开关，且当前正处于第五章：音频从头播放并淡入，
// 恢复到静音前的 duck 状态（若当时正悬停在门上，就淡入到 duckVolume 而不是满音量）。
function unmuteChapter5LoopIfActive() {
  if (chapterIndex !== CHAPTER_5_INDEX) return;
  cancelChapter5LoopFade();
  setChapter5LoopGain(0);
  if (!chapter5LoopRevealed) return;
  const target = chapter5LoopDucked ? CHAPTER_5_LOOP_SOUND.duckVolume : CHAPTER_5_LOOP_SOUND.revealVolume;
  const context = ensureChapter6AudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  startChapter5LoopSource();
  fadeChapter5Loop(target, CHAPTER_5_LOOP_SOUND.unmuteFadeDuration);
}

// 悬停在门的可点击区域，或点击开门那一刻调用：瞬间（duckFadeDuration，非缓慢淡出）
// 降到 duckVolume。只在第五章画面已经在播放环境声时生效。
function duckChapter5Loop() {
  if (chapterIndex !== CHAPTER_5_INDEX || !chapter5LoopRevealed) return;
  chapter5LoopDucked = true;
  fadeChapter5Loop(CHAPTER_5_LOOP_SOUND.duckVolume, CHAPTER_5_LOOP_SOUND.duckFadeDuration);
}

// 鼠标移开门的可点击区域、且尚未点击开门时调用：瞬间恢复满音量。
function undoDuckChapter5Loop() {
  if (chapterIndex !== CHAPTER_5_INDEX || !chapter5LoopRevealed || chapter5DoorOpening) return;
  chapter5LoopDucked = false;
  fadeChapter5Loop(CHAPTER_5_LOOP_SOUND.revealVolume, CHAPTER_5_LOOP_SOUND.duckFadeDuration);
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
  if (duration <= 0) {
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
  if (!soundEnabled) {
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
  soundToggle?.setAttribute("aria-label", getUIText(soundEnabled ? "disableSound" : "enableSound"));
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
    loadChapter1AmbientBuffer();
    loadChapter6AmbientBuffer();
    loadChapter4AmbientBuffer();
    loadDoorSoundBuffer();
    loadChapter2LoopBuffer();
    loadChapter2OnceBuffer();
    loadChapter3LoopBuffer();
    loadChapter5LoopBuffer();
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
    loadChapter1AmbientBuffer();
    unmuteChapter1AmbientIfActive();
    loadChapter6AmbientBuffer();
    unmuteChapter6AmbientIfActive();
    loadChapter4AmbientBuffer();
    unmuteChapter4AmbientIfActive();
    loadDoorSoundBuffer();
    loadChapter2LoopBuffer();
    unmuteChapter2LoopIfActive();
    loadChapter2OnceBuffer();
    loadChapter3LoopBuffer();
    unmuteChapter3LoopIfActive();
    loadChapter5LoopBuffer();
    unmuteChapter5LoopIfActive();
  } else {
    cancelChapter1AmbientFade();
    setChapter1AmbientGain(0);
    stopChapter1AmbientSource();
    cancelChapter6AmbientFade();
    setChapter6AmbientGain(0);
    stopChapter6AmbientSource();
    cancelChapter4AmbientFade();
    setChapter4AmbientGain(0);
    stopChapter4AmbientSource();
    cancelChapter2LoopFade();
    setChapter2LoopGain(0);
    stopChapter2LoopSourceOnly();
    stopChapter2OnceSound();
    cancelChapter3LoopFade();
    setChapter3LoopGain(0);
    stopChapter3LoopSourceOnly();
    cancelChapter5LoopFade();
    setChapter5LoopGain(0);
    stopChapter5LoopSourceOnly();
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
  const fit = getComputedStyle(image).objectFit;
  const scale = fit === "contain"
    ? Math.min(containerWidth / image.naturalWidth, containerHeight / image.naturalHeight)
    : Math.max(containerWidth / image.naturalWidth, containerHeight / image.naturalHeight);
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
    if (hotspot.id) button.classList.add(`hotspot--${hotspot.id}`);
    button.dataset.hotspotIndex = String(index);
    if (hotspot.id) button.dataset.hotspotId = hotspot.id;
    button.setAttribute("aria-label", `${hotspot.zh} — ${hotspot.en}`);
    if (!isTouchDevice) {
      button.addEventListener("mouseenter", () => showTooltip(button, hotspot));
      button.addEventListener("mouseleave", hideTooltip);
      button.addEventListener("focus", () => showTooltip(button, hotspot));
      button.addEventListener("blur", hideTooltip);
    }
    button.addEventListener("click", event => {
      if (isTouchDevice) {
        event.stopPropagation();
        showTooltip(button, hotspot);
        return;
      }
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
    doorTrigger.addEventListener("pointerenter", duckChapter5Loop);
    doorTrigger.addEventListener("pointerleave", undoDuckChapter5Loop);
    doorTrigger.addEventListener("focus", duckChapter5Loop);
    doorTrigger.addEventListener("blur", undoDuckChapter5Loop);
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
  chapter5DoorOpening = true;
  duckChapter5Loop();

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
  await delay(1350);
  doorWash.classList.remove("is-active", "is-releasing", "is-solid");
  doorWashCanvas.width = 1;
  doorWashCanvas.height = 1;
  busy = false;
}

function showTooltip(button, hotspot) {
  activeTooltipHotspot = hotspot;
  const moreLabel = mainLanguage === "en" ? "Learn more" : convertZh("查看背景");
  tooltip.innerHTML = `<strong class="tooltip-zh">${convertZh(hotspot.zh)}</strong><span class="tooltip-translation">${hotspot.en}</span><p class="tooltip-zh">${convertZh(hotspot.note)}</p>${hotspot.noteEn ? `<p class="tooltip-note-en">${hotspot.noteEn}</p>` : ""}${isTouchDevice ? `<button class="tooltip-more" type="button">${moreLabel} →</button>` : `<p class="tooltip-more">${moreLabel} →</p>`}`;
  const experienceRect = experience.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  // Tooltip coordinates are relative to .experience, while getBoundingClientRect()
  // returns viewport coordinates. Keeping both in the same coordinate space prevents
  // right-edge hotspots from being shifted outside the framed experience.
  const x = buttonRect.left - experienceRect.left + buttonRect.width / 2;
  const y = buttonRect.top - experienceRect.top + buttonRect.height / 2;
  const tooltipWidth = tooltip.offsetWidth;
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
  activeTooltipHotspot = null;
}

tooltip.addEventListener("click", event => {
  const moreButton = event.target.closest("button.tooltip-more");
  if (!moreButton || !activeTooltipHotspot) return;
  event.preventDefault();
  event.stopPropagation();
  const hotspot = activeTooltipHotspot;
  hideTooltip();
  openContext(hotspot.term || chapterIndex, hotspot.term ? null : hotspot);
});

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
    button.setAttribute("aria-label", getUIText(active ? "exitFullscreen" : "enterFullscreen"));
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
  fontSizeToggle?.setAttribute("aria-label", getUIText(preset.nextLabelKey));
  fontSizeToggle?.setAttribute("aria-checked", String(preset.id !== "standard"));
  if (fontSizeModeLabel) fontSizeModeLabel.textContent = getUIText(preset.labelKey);
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
  motionToggle?.setAttribute("aria-label", getUIText(reduced ? "enableMotion" : "reduceMotion"));
  if (motionModeLabel) motionModeLabel.textContent = full ? "ON" : "REDUCED";
  syncCriticalLoopMotion(reduced);
  if (reduced) stopIntroParticles();
  else if (startActive || epilogueActive) startIntroParticles();
  if (epilogueActive && reduced) fastForwardEpilogue();
}

function toggleMotionPreference() {
  motionPreference = prefersReducedMotion() ? "full" : "reduced";
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
startScreen.addEventListener("click", event => {
  if (!event.target.closest("a, button, .term-ref") && startActive) advanceStart();
});
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
  // 放大状态把整个屏幕视为同一个“缩小”操作面：点图片、说明、遮罩或画框外都只退回侧栏。
  // 放大镜本身是打开这层的点击，必须排除，否则同一次冒泡会立即把刚打开的大图关掉。
  if (imageLightbox?.classList.contains("is-open") && !event.target.closest(".context-reference-zoom")) {
    closeImageLightbox();
    return;
  }
  if (isTouchDevice && tooltip.classList.contains("is-visible") &&
      !event.target.closest(".hotspot-tooltip") && !event.target.closest(".hotspot")) {
    hideTooltip();
  }
  // 侧栏打开时，点击面板外、且不是 hotspot／开关按钮本身，收回侧栏。
  // 大图是侧栏之上的第二层状态：点遮罩只退回侧栏，不能同一次点击把侧栏也收起。
  if (
    contextPanel.classList.contains("is-open") &&
    !contextPanel.contains(event.target) &&
    !event.target.closest("#image-lightbox") &&
    !event.target.closest("#context-toggle") &&
    !event.target.closest("#context-collapse") &&
    !event.target.closest(".hotspot")
  ) {
    closeContext();
  }
  if (isChapter6ImageMode() && !event.target.closest(".memory-cue") && !event.target.closest("#sound-toggle")) {
    if (!chapter6Visited.has("opening-glance-complete")) {
      const clickedControl = event.target.closest("button, a, input, select, textarea, summary, [role='button']");
      if (!clickedControl) advanceChapter6OpeningGlance();
    } else {
      if (chapter6ActiveCueId) dismissChapter6Cue();
      else cancelChapter6Glance("click");
    }
  }
  const termButton = event.target.closest(".term-ref");
  if (termButton) {
    const termId = termButton.dataset.term;
    // 序言阶段、或章节先导文阶段（画面还没出现）点上标：留在同一页，展开对应术语；
    // 其它情况（比如画面阶段的 hotspot 直接挂了 term）维持原来的单独术语页。
    const stayOnPage = TERMS[termId] && !epilogueActive && (startActive || phase === "text");
    if (stayOnPage) {
      openContext(startActive ? "start" : chapterIndex);
      requestAnimationFrame(() => focusTermInContext(termId));
    } else {
      openContext(termId);
    }
  }
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
contextCollapse.addEventListener("click", closeContext);
mainLanguageButtons.forEach(button => button.addEventListener("click", () => setMainLanguage(button.dataset.mainLanguage)));
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
// 用浏览器语言判断出的默认状态（detectBrowserMainLanguage）点亮控制栏按钮、贴好 html[data-main-language]，
// 这样第一屏渲染出来的时候，简繁 / 中英 就已经是对的，不会先闪一下再跳一次。
document.documentElement.dataset.mainLanguage = mainLanguage;
// 侧栏自己的 data-language 也要在这里同步一次——contextPanel 的简/繁/英显示逻辑单独读它自己的
// data-language 属性，HTML 里写死的初始值是 zh-hans，只在点击语言切换按钮时同步是不够的，
// 首屏如果检测出来的默认语言不是简体，侧栏这个属性也要一起补上，否则侧栏内容会一直显示简体。
contextPanel.dataset.language = mainLanguage;
mainLanguageButtons.forEach(button => {
  button.setAttribute("aria-pressed", String(button.dataset.mainLanguage === mainLanguage));
});
renderContext("start");
updateContextChineseLabels();
buildTraditionalStaticVariant("start-zh", "start-hant");
buildTraditionalStaticVariant("epilogue-zh", "epilogue-hant");
buildTraditionalStaticVariant("epilogue-fullstory-zh", "epilogue-fullstory-hant");
buildTraditionalStaticVariant("start-credit-zh", "start-credit-hant");
buildTraditionalStaticVariant("epilogue-credit-zh", "epilogue-credit-hant");
buildTraditionalStaticVariant("story-back-zh", "story-back-hant");
// 序言"进入/退出全屏"大按钮、按钮下方的邀请文案、时间线上"序/跋"两个站点的年份标签、
// 六章时间线的场景标题——之前中英一直是拼在同一段字符串/同一节点里显示，现在拆成
// 简/繁/英三个独立节点，繁体同样靠这个通用克隆函数生成。
buildTraditionalStaticVariant("start-fullscreen-zh", "start-fullscreen-hant");
buildTraditionalStaticVariant("fullscreen-invitation-zh", "fullscreen-invitation-hant");
buildTraditionalStaticVariant("timeline-year-zh", "timeline-year-hant");
buildTraditionalStaticVariant("timeline-title-zh", "timeline-title-hant");
buildTraditionalStoryBody();
updateContextLocaleChrome();
updateNav();
startSequence();

// 手机控制栏展开/收起(collapse toggle)
if (controlsCollapseToggle && screenControls) {
  controlsCollapseToggle.addEventListener("click", () => {
    const expanded = screenControls.classList.toggle("is-expanded");
    controlsCollapseToggle.setAttribute("aria-expanded", String(expanded));
    controlsCollapseToggle.setAttribute("aria-label", getUIText(expanded ? "collapseControls" : "expandControls"));
  });
}
