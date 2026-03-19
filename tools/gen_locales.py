#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate index-zh-hant.html (OpenCC) and index-en.html from index.html."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "index.html"


def build_zh_hant(html: str) -> str:
    import opencc

    conv = opencc.OpenCC("s2tw")
    out = conv.convert(html)
    out = out.replace('lang="zh-Hans"', 'lang="zh-Hant"', 1)
    out = out.replace('data-lang="zh-Hans"', 'data-lang="zh-Hant"', 1)
    out = out.replace(
        "family=Noto+Sans+SC:wght@300;400;500;600;700",
        "family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;600;700",
        1,
    )
    out = out.replace(
        '<a href="index.html" class="site-header__mark">',
        '<a href="index-zh-hant.html" class="site-header__mark">',
        1,
    )
    out = out.replace('href="index.html#pricing"', 'href="index-zh-hant.html#pricing"')
    out = out.replace('href="index.html#team"', 'href="index-zh-hant.html#team"')
    out = re.sub(
        r'<nav class="lang-switch"[^>]*>.*?</nav>',
        '<nav class="lang-switch" aria-label="語言版本">\n'
        '          <a href="index.html" class="lang-switch__btn" hreflang="zh-Hans">簡體</a>\n'
        '          <a href="index-zh-hant.html" class="lang-switch__btn is-active" hreflang="zh-Hant" aria-current="page">繁體</a>\n'
        '          <a href="index-en.html" class="lang-switch__btn" hreflang="en">English</a>\n'
        "        </nav>",
        out,
        count=1,
        flags=re.DOTALL,
    )
    return out


def build_en(html: str) -> str:
    out = html
    out = out.replace('lang="zh-Hans"', 'lang="en"', 1)
    out = out.replace('data-lang="zh-Hans"', 'data-lang="en"', 1)
    out = out.replace(
        '<a href="index.html" class="site-header__mark">',
        '<a href="index-en.html" class="site-header__mark">',
        1,
    )
    out = out.replace('href="index.html#pricing"', 'href="index-en.html#pricing"')
    out = out.replace('href="index.html#team"', 'href="index-en.html#team"')
    out = re.sub(
        r'<nav class="lang-switch"[^>]*>.*?</nav>',
        '<nav class="lang-switch" aria-label="Language">\n'
        '          <a href="index.html" class="lang-switch__btn" hreflang="zh-Hans">简体</a>\n'
        '          <a href="index-zh-hant.html" class="lang-switch__btn" hreflang="zh-Hant">繁體</a>\n'
        '          <a href="index-en.html" class="lang-switch__btn is-active" hreflang="en" aria-current="page">English</a>\n'
        "        </nav>",
        out,
        count=1,
        flags=re.DOTALL,
    )

    pairs: list[tuple[str, str]] = [
        ("视<span>未</span>", "Shì <span>Wèi</span>"),
        ("<span class=\"sub\">未来观测 · 独家服务</span>", '<span class="sub">Future observation · exclusive</span>'),
        ("视未 — 未来观测服务", "Shì Wèi — Future Observation"),
        (
            "独家未来观测服务：看见属于你的未来轨迹，合规、私密、可复盘。",
            "An exclusive future-observation experience: see your own trajectory—compliant, private, reviewable.",
        ),
        ("aria-label=\"主导航\"", 'aria-label="Primary"'),
        ("aria-label=\"页面章节\"", 'aria-label="Sections"'),
        ("你的下一程，尚未对焦。", "Your next chapter is still out of focus."),
        ("+10 年", "+10 yrs"),
        ("FutureNow 播客", "FutureNow podcast"),
        ("时间 →", "Time →"),
        ("1 次观测（10–20 分钟）", "1 session (10–20 min)"),
        ("<small>/ 次</small>", "<small>/ session</small>"),
        ("2 次观测（间隔 ≥ 90 天）", "2 sessions (≥ 90 days apart)"),
        ("<small>/ 套</small>", "<small>/ package</small>"),
        ("面议", "Custom quote"),
        ("PATH · 优化分支概率", "PATH · branch likelihood"),
        ("独家未来观测服务。看见属于你的下一程，而非他人的剧本。", "Exclusive future observation. Your next act—not someone else’s script."),
        ("<h4>服务</h4>", "<h4>Services</h4>"),
        ("<h4>公司</h4>", "<h4>Company</h4>"),
        ("<h4>法律</h4>", "<h4>Legal</h4>"),
        ("<span id=\"y\"></span> 视未</span>", '<span id="y"></span> Shì Wèi</span>'),
        ("时间轴", "Timeline"),
        ("流程", "Flow"),
        ("规则", "Rules"),
        ("口碑", "Proof"),
        ("方案", "Plans"),
        ("交付物", "Deliverable"),
        ("交付", "Deliverable"),
        ("团队", "Team"),
        ("使命", "Mission"),
        ("常见问题", "FAQ"),
        ("问答", "FAQ"),
        ("立即预约", "Book now"),
        ("看见未来的你", "See the future you"),
        (
            "我们提供一项独家服务，让人们<strong>看见未来</strong>——而非任何实体器械或产品。透过服务，你将清晰地看见属于自己的那条轨迹上的「未来的自己」。回到现实之后，你可以依据所见调整当下的选择，让未来的生活更贴近心中所想。",
            'We offer an exclusive service that lets people <strong>see the future</strong>—not a gadget or device. You glimpse your “future self” along <em>your</em> path only. Back in the present, you adjust choices so life moves closer to what you want.',
        ),
        ("预约观测时段", "Book a session"),
        ("了解如何开始", "How it works"),
        ("单次体验", "Single session"),
        ("私密引导", "Private guidance"),
        ("合规档案留存", "Compliant records"),
        ("观测视界 · 仅映你一人", "Observation field · only you"),
        ("从「此刻」拖向 +10 年", 'Drag from “now” toward +10 years'),
        (
            "沿时间轴推进时，噪点沉降、可读性上升——这是我们在模型里对「个人轨迹置信度」的隐喻，而非预言。",
            "As you move along the axis, noise falls and legibility rises—a metaphor for confidence in <em>your</em> trajectory, not a prophecy.",
        ),
        ("此刻", "Now"),
        ("时间轴位置", "Timeline position"),
        ("四步完成一次观测", "Four steps to one session"),
        (
            "从咨询到复盘，全程由持证引导师陪同。你只需带着问题来，带着路径图离开。",
            "From consult to debrief, a certified guide stays with you. Bring a question; leave with a path map.",
        ),
        ("预约咨询", "Book consult"),
        (
            "提交意向与合规问卷，顾问确认你的观测目标是否在「个人轨迹」允许范围内。",
            "Submit intent and compliance forms; we confirm your goal fits the allowed “personal trajectory” scope.",
        ),
        ("校准与策略", "Calibration & strategy"),
        ("会前沟通时间窗口、心理预期与禁忌项；签署知情同意与隐私协议。", "Pre-session: window, expectations, prohibitions; informed consent & privacy."),
        ("观测会话", "Observation session"),
        (
            "在受控环境中进行 10–20 分钟观测。仅观看、不触碰、不改变所见之象。",
            "10–20 minutes in a controlled setting. Look only—no touch, no changing what you see.",
        ),
        ("复盘与规划", "Debrief & plan"),
        (
            "结构化复盘所见要点，输出可执行的当下调整建议（非医疗或投资建议）。",
            "Structured debrief and actionable present-moment moves (not medical or investment advice).",
        ),
        ("规则与边界", "Rules & boundaries"),
        ("以下条款保障服务伦理与每位使用者的安全。预约即视为已阅读并理解。", "These terms protect ethics and safety. Booking means you have read and understood."),
        ("仅观测，不干预", "Observe only—no intervention"),
        (
            "本服务只支持<strong>观看</strong>未来；无法触摸所见之境，也无法在观测中直接改变未来。所见为象，非手可及。",
            "This service only supports <strong>viewing</strong> the future—you cannot touch it or change it during the session. Images only.",
        ),
        ("只关于你的轨迹", "Only your path"),
        (
            "未来观测严格限定于你<strong>个人的发展路径</strong>——例如能否进入心仪的学校、职业与自我成长的走向。严禁亦<strong>无法</strong>用于窥探或干预他人的生活与命运（如打听未来伴侣、预见他人生死等）。",
            "Observation is limited to <strong>your personal development</strong>—schools, career, self-growth. It is forbidden and <strong>impossible</strong> to probe others (partners, others’ life/death, etc.).",
        ),
        ("时间与时长", "Time & duration"),
        (
            "可观测的未来场景<strong>最远不超过距今十年</strong>。每一次服务体验时长<strong>严格限定在 10 至 20 分钟</strong>之间。",
            "You may view at most <strong>ten years ahead</strong>. Each session is <strong>strictly 10–20 minutes</strong>.",
        ),
        ("从此刻重新规划", "Re-plan from now"),
        (
            "体验结束后，你带着清晰的参照回到当下：用合理规划把路径调向更理想的版本——这是本服务的设计初衷。",
            "Afterward you return with a clear reference and steer toward a better version—that is the point of the service.",
        ),
        ("口碑与见证", "Trust & testimonials"),
        (
            "我们与高校生涯中心、创新孵化器与多家品牌人力资源伙伴保持匿名案例合作（以下为合成化叙述，用于展示服务形态）。",
            "We collaborate anonymously with schools, incubators, and HR partners (composite stories below for illustration).",
        ),
        ("合作与报道", "Partners & press"),
        ("星云教育科技", "Nebula EdTech"),
        ("城脉创投", "UrbanPulse VC"),
        ("东方人物周刊", "Orient Profiles"),
        ("客户见证滑动浏览", "Swipe testimonials"),
        ("团队成员滑动浏览", "Swipe team"),
        (
            "「我只问了升学路径，却第一次看清自己真正在意的是什么。回到现实后我改了志愿排序——那是我做过最清醒的决定。」",
            "“I only asked about school—and finally saw what I actually cared about. I re-ranked my choices. Clearest decision I ever made.”",
        ),
        ("应届生", "Graduate"),
        (
            "「十分钟里像看了一部关于自己的纪录片。不能干预反而让我更专注在『现在能做什么』。」",
            "“Ten minutes felt like a documentary about me. Not being able to intervene made me focus on what I can do now.”",
        ),
        ("产品经理", "PM"),
        (
            "「合规流程很严，反而安心。团队对『不能看他人』的解释非常清楚，没有灰色地带。」",
            "“Strict compliance felt reassuring. ‘You can’t view others’ was explained with no grey zone.”",
        ),
        ("法务背景", "Legal"),
        ("案例 A｜职业转折 · 轨迹分歧", "Case A · Career pivot · path divergence"),
        ("基线概率与观测后优化路径对比示意图", "Baseline vs post-observation path (illustrative)"),
        ("累积行动指数", "Cumulative action index"),
        ("犹豫期 6 个月", "6 mo hesitation"),
        ("4 周内首动", "First move in 4 wk"),
        (
            "灰色：基线主观概率下的行动曲线；青色：观测复盘后的优化路径（合成指标，仅供叙事）。",
            "Grey: baseline; cyan: post-debrief path (composite, narrative only).",
        ),
        ("案例 B｜焦虑分布迁移", "Case B · Anxiety shift"),
        ("自评焦虑量表前后对比", "Self-reported anxiety before/after"),
        ("前测", "Pre"),
        ("6 周后", "6 wk later"),
        ("分布均值 μ 偏高", "Mean μ high"),
        ("方差 σ² 收敛", "Variance σ² tightens"),
        (
            "条形为自陈量表可视化；并非临床诊断。配合里程碑拆解后，随访依从性提升。",
            "Bars are self-report visuals—not clinical. Milestones improved follow-through.",
        ),
        ("方案与定价", "Plans & pricing"),
        (
            "三档套餐覆盖首次体验到深度随访。企业或学校团体请走定制报价，便于我们配置合规与驻场引导师。",
            "Three tiers from first taste to deep follow-up. Enterprise/schools: custom quotes and on-site guides.",
        ),
        ("入门 · 初见", "Entry · First light"),
        ("首次体验，适合想验证服务是否与自己契合的你。", "First session if you want to test fit."),
        ("会前问卷与合规审查", "Pre forms & compliance"),
        ("标准化复盘摘要", "Standard debrief summary"),
        ("预约此方案", "Choose plan"),
        ("进阶 · 轨迹", "Advanced · Trajectory"),
        ("含随访与规划对齐，适合面临重大节点的人群。", "Follow-ups + planning for major life nodes."),
        ("专属引导师与加密档案", "Dedicated guide & encrypted file"),
        ("90 天异步问答（非即时）", "90-day async Q&A (not live)"),
        ("个性化路径图模板", "Personal path template"),
        ("定制 · 机构", "Custom · Org"),
        ("HR、高校、孵化器批量采购与工作坊形式。", "HR, schools, incubators—bulk & workshops."),
        ("合规框架与法务对接", "Compliance & legal"),
        ("驻场或线上专场", "On-site or virtual"),
        ("匿名汇总报告（不含个人可识别信息）", "Aggregate report (non-identifying)"),
        ("获取报价", "Request quote"),
        ("你会收到的「交付物」长什么样", "What you actually receive"),
        (
            "标准化复盘摘要与路径图模板并非玄学纸条，而是加密档案中的结构化记录——可离线、可脱敏涂黑、可审计。",
            "Summaries and path templates are structured, encrypted records—offline, redactable, auditable.",
        ),
        ("两种载体", "Two formats"),
        (
            "加密数字舱",
            "Encrypted digital vault",
        ),
        (
            "：仅你持有密钥的离线包，内含时间戳与完整性校验。",
            ": offline bundle, your keys, timestamps & integrity checks.",
        ),
        ("密封摘要册", "Sealed digest"),
        ("：实体脱敏版本，适合需要物理存档的机构客户。", ": physical redacted copy for archives."),
        ("已脱敏", "REDACTED"),
        ("核心团队", "Core team"),
        (
            "视未由认知科学、伦理委员会与体验设计背景的成员共同创立——我们相信「看见」必须伴随边界与责任。",
            "Founded by cognitive science, ethics, and service-design voices—we believe seeing requires boundaries.",
        ),
        ("联合创始人 · 首席伦理官", "Co-founder · Chief ethics"),
        (
            "前高校应用伦理研究中心顾问，主导「个人轨迹」算法红线与合规流程设计。",
            "Former applied-ethics advisor; shaped trajectory “red lines” and compliance.",
        ),
        ("联合创始人 · 体验架构", "Co-founder · Experience"),
        (
            "资深服务设计师，负责观测环境与复盘框架，让抽象体验可被安全地言说与记录。",
            "Service designer for session space and debrief frames—safe to speak and record.",
        ),
        ("科学顾问", "Science advisor"),
        ("认知神经科学方向，确保所有对外表述与预期管理建立在可解释模型之上。", "Cognitive neuroscience; keeps claims grounded in explainable models."),
        ("我们的使命", "Our mission"),
        (
            "帮助每一个人在最大程度上拓展<strong>个人成功</strong>的可能；并以理性、可执行的规划，引导大家走向心中最理想、最美好的生活。",
            "Expand each person’s odds of <strong>success</strong> with rational, executable planning toward the life you want.",
        ),
        ("若你的问题未列出，欢迎通过联络页留言，我们将在两个工作日内回复。", "Not listed? Message us; we reply within two business days."),
        ("观测结果能保证应验吗？", "Will it come true?"),
        (
            "不能。你看到的是在现有模型下对「个人轨迹」的前瞻性呈现，用于辅助反思与规划，不构成预测或承诺。",
            "No. It is a forward-looking view under our model—for reflection and planning, not a guarantee.",
        ),
        ("从预约到正式观测大概要多久？", "How long from booking to session?"),
        (
            "合规审核通常 3–5 个工作日；排期视城市与引导师负载而定，旺季可能延长。加急通道仅向进阶与定制客户开放。",
            "Compliance 3–5 business days; scheduling varies by city/load. Rush: advanced/custom only.",
        ),
        ("是否可以退款？", "Refunds?"),
        (
            "观测开始前 48 小时可全额退款；已开始会话或已签署最终知情文件后，仅可按协议中的例外条款协商。",
            "Full refund if more than 48h before start; after session or final consent, per contract only.",
        ),
        ("会保留或上传我的观测内容吗？", "Do you keep or upload my session?"),
        (
            "默认仅保留脱敏后的合规审计日志。若你需要个人复盘摘要，可选择加密离线交付，详见隐私政策。",
            "By default, redacted audit logs only. Personal summaries: optional encrypted offline delivery—see privacy.",
        ),
        ("未成年人可以预约吗？", "Minors?"),
        (
            "未满 18 岁须在监护人陪同下完成全套合规流程，且观测主题仍须严格限定于本人发展轨迹。",
            "Under 18 requires guardian through all compliance; topics still limited to the minor’s own path.",
        ),
        (
            "「视未」页面为概念呈现。未来观测不构成医学、法律或投资建议。实际服务以正式协议与监管要求为准。",
            "Illustration only. Not medical, legal, or investment advice. Real services follow contracts and regulation.",
        ),
        ("服务详情", "Services"),
        ("方案定价", "Pricing"),
        ("联络我们", "Contact"),
        ("关于视未", "About"),
        ("服务条款", "Terms"),
        ("隐私政策", "Privacy"),
        ("概念站点 · 仅供展示", "Concept site · demo"),
        ("已记录意向", "Request logged"),
        (
            "你的预约请求已进入队列。顾问将在一个工作日内与你对齐时段、知情同意与合规说明。",
            "You’re in the queue. A coordinator will align time, consent, and compliance within one business day.",
        ),
        ("知道了", "OK"),
        ("沈岚", "Shen Lan"),
        ("周澈", "Zhou Che"),
        ("赵衡", "Zhao Heng"),
        ('aria-hidden="true">岚</div>', 'aria-hidden="true">L.</div>'),
        ('aria-hidden="true">澈</div>', 'aria-hidden="true">C.</div>'),
        ('aria-hidden="true">衡</div>', 'aria-hidden="true">H.</div>'),
    ]

    pairs.sort(key=lambda x: len(x[0]), reverse=True)
    for zh, en in pairs:
        out = out.replace(zh, en)

    out = out.replace("&gt;", ">")  # fix if any
    return out


def main() -> None:
    html = SRC.read_text(encoding="utf-8")
    (ROOT / "index-zh-hant.html").write_text(build_zh_hant(html), encoding="utf-8")
    (ROOT / "index-en.html").write_text(build_en(html), encoding="utf-8")
    print("Wrote index-zh-hant.html and index-en.html")


if __name__ == "__main__":
    main()
