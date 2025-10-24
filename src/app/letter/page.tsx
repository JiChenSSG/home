"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import {
	LetterTemplate,
	PaperSvg,
	EnvelopeSvg,
	LetterPagination,
} from "@/components";
import "../../styles/letter.css";

function LetterContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const contentRef = useRef<HTMLDivElement>(null);
	const letterRef = useRef<HTMLDivElement>(null);
	const envelopeRef = useRef<HTMLDivElement>(null);
	const paperRef = useRef<HTMLDivElement>(null);

	// 获取信件点击时的位置参数，提供默认值
	const clickX = parseFloat(searchParams.get("clickX") || "0");
	const clickY = parseFloat(searchParams.get("clickY") || "0");

	// 安全地获取屏幕中心位置
	const getScreenCenter = () => {
		if (typeof window !== "undefined") {
			return {
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
			};
		}
		return { x: 0, y: 0 };
	};

	useEffect(() => {
		if (
			!contentRef.current ||
			!letterRef.current ||
			!envelopeRef.current ||
			!paperRef.current
		)
			return;

		// 安全地获取屏幕中心位置
		const screenCenter = getScreenCenter();

		// 创建完整的信件打开动画序列
		const tl = gsap.timeline();

		// 设置初始状态
		gsap.set(contentRef.current, {
			opacity: 0,
		});

		// 如果有传入位置参数，从该位置开始；否则从屏幕中心开始
		gsap.set(letterRef.current, {
			scale: 1,
			x: clickX || screenCenter.x,
			y: clickY || screenCenter.y,
			xPercent: -50,
			yPercent: -50,
		});

		gsap.set(paperRef.current, {
			y: 0,
			opacity: 0,
			scale: 1,
		});

		gsap.set(envelopeRef.current, {
			y: 0,
			opacity: 1,
		});

		// 动画序列
		tl
			// 1. 从传入位置移动到屏幕中心并放大
			.to(letterRef.current, {
				x: screenCenter.x,
				y: screenCenter.y,
				scale: 1.5,
				duration: 0.6,
				ease: "power2.out",
			})

			// 2. 暂停展示信件
			.to({}, { duration: 0.3 })

			// 2. 信纸从信封中抽出
			.to(paperRef.current, {
				y: -40,
				opacity: 1,
				duration: 0.8,
				ease: "power2.out",
			})

			// 3. 信封向下移动
			.to(
				envelopeRef.current,
				{
					y: 60,
					opacity: 0.6,
					duration: 0.6,
					ease: "power2.out",
				},
				"-=0.4"
			)

			// 4. 信纸继续向上移动并放大
			.to(paperRef.current, {
				y: -100,
				scale: 1.5,
				duration: 0.6,
				ease: "power2.out",
			})

			// 5. 信纸变换为页面内容
			.to(paperRef.current, {
				scale: 8,
				y: -150,
				opacity: 0.3,
				duration: 0.8,
				ease: "power2.inOut",
			})

			// 6. 同时淡入真实页面内容
			.to(
				contentRef.current,
				{
					opacity: 1,
					duration: 0.6,
					ease: "power2.out",
				},
				"-=0.6"
			)

			// 7. 隐藏信件动画
			.to(
				letterRef.current,
				{
					opacity: 0,
					duration: 0.3,
					ease: "power2.out",
				},
				"-=0.3"
			);
	}, [clickX, clickY]);

	const handleBackClick = () => {
		if (!contentRef.current) return;

		const tl = gsap.timeline({
			onComplete: () => router.push("/"),
		});

		tl.to(contentRef.current, {
			opacity: 0,
			y: -10,
			duration: 0.3,
			ease: "power1.in",
		});
	};

	return (
		<div className="relative">
			{/* 信件动画层 */}
			<div
				ref={letterRef}
				className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
			>
				{/* 信封 */}
				<div ref={envelopeRef} className="absolute">
					<EnvelopeSvg width={140} height={100} className="drop-shadow-2xl" />
				</div>

				{/* 信纸 */}
				<div ref={paperRef} className="absolute">
					<PaperSvg width={140} height={180} className="drop-shadow-2xl" />
				</div>
			</div>

			<div ref={contentRef}>
				<LetterTemplate
					title="祝我宝宝生日快乐"
					date="2025年9月19日"
					sender="朱亦宇"
					onBackClick={handleBackClick}
					end="(ꈍᴗꈍ)ε｀*)~"
				>
					{/* 使用分页组件 */}
					<LetterPagination
						pages={[
							// 第一页
							<>
								<p className="letter-header">早上好苏天译，</p>

								<div className="letter-text">
									<p>
										想了很久这里写什么，如果光是一些生日祝福的话感觉写不了多少，白费我写了这么多代码，那就把我想对你说的话都写在这里吧。
									</p>

									<p>首先来看一段故事吧。</p>
								</div>
							</>,

							// 第二页
							<>
								<div className="letter-text">
									<p>
										有个小男孩，出生的时候就和爷爷奶奶住一起。幼儿园的时候，因为父母都要上班，所以只有周末可以和父母一起住。
									</p>
									<p>
										那会大家过的很开心，虽然赚不到多少钱，但是每周末都会出去玩。三个人挤在一个小房子里，时而会做一锅木瓜炖奶，让他至今仍然很怀念这个味道。
									</p>
									<p>
										爷爷奶奶很宠他，几乎将所有时间都花在了他身上。但是爷爷奶奶住的地方只有一栋房子，见不到别的小朋友，他自己和自己玩的也挺开心，但是不知不觉间总是缺少了一些能力。
									</p>
								</div>
							</>,

							// 第三页
							<>
								<div className="letter-text">
									<p className="letter-quote">结果导向的童年铸就的性格</p>
									<p>
										和其他小朋友一样，进入小学之后，上了一些补习班，游过泳，也画过画，但最后还是选择了围棋。对于小学生来说，一盘棋一个小时无疑是极其枯燥的，但他似乎有着过人的天赋，或者说是从小培养的习惯，让他就不是一个喜欢动的小孩，一个习惯于自娱自乐的小孩，自然是可以静得下心。他在短短几年，来到了业余二段，对手也从和他一样大的小孩，变成了成年人。而他对这些都没有概念，他只知道自己打赢了对手，母亲就会奖励自己一些钱来买玩具。
									</p>
									<p>
										在高中前，即使是不怎么学的情况下，他的成绩在班里还是上游。母亲对他的要求就是，成绩是最重要的，结果是最重要的。考得差的时候挨过板子，考得好的时候拿到过
										psp。这让他及其坚信，做出的结果才是最重要的，只有结果才是有价值的。
									</p>
									<p>
										到了高中，随便学学没法再保证自己的成绩了，但是还有别的办法。他当了团支书，他参加了算法竞赛，但是成绩还是一坨。今天代表学校出去打比赛，明天位比
										70%
										被一顿臭骂，他的自我价值在动摇，但是小学初中他最大的问题就是成绩不稳定，但是每次大考试总能碰上好运气，所以结果出来之前，他都有侥幸心理。但高中这次没有给他好运气了。
									</p>
									<p>
										他喜欢计算机，喜欢这种能带给他实际价值的东西，喜欢这种能立马知道结果的东西，喜欢这种他人能认可自己的东西。他嘴上说着看的很开，但是很需要别人的认可，他需要证明自己的价值。
									</p>
								</div>
							</>,

							<>
								<div className="letter-text">
									<p className="letter-quote">父亲缺位的童年</p>
									<p className="letter-text">
										童年的时光确实很幸福，但父亲似乎不愿意一辈子住在小房子里，在他小学时，就尝试去和别人一起创业。
									</p>

									<p className="letter-text">
										创业初期虽然磕磕碰碰，但也稍有起色，三个人住进了大房子。虽然喝得起饮料，但再也没喝到过记忆里那个木瓜炖奶了。父亲很少出现在家中，变得嗜睡，易怒。因为他嫌弃父亲的面太烫，被大骂一顿；又或是筷子掉地上就被劈头盖脸的职责。现在想想应该是压力使然，但对于小时候的他来说，就是父亲变坏了，家里只有母亲可以好好相处。
									</p>

									<p className="letter-text">
										周末很少再有出游，也很少见到父亲在家中吃饭。初中之后搬回去和母亲一起住后，父亲不回家吃饭也是常态。每年临近过年的时候，父母都会大吵一架。一度很害怕父母会离婚，但又觉得这对我母亲是件好事，但不管如何，他们是熬了过来，但这段时光对孩子并不是什么好事。
									</p>

									<p>父亲长期的缺位，导致他性格过于软弱，没有什么抱负。</p>
								</div>
							</>,

							<>
								<div className="letter-text">
									<p className="letter-quote">不善社交的人</p>
									<p>
										小时候因为很少和其它小朋友接触，所以刚进入幼儿园时，是不太会和别人打交道的。但他很快领悟了一个技能，就是顺着别人的话说。在大人看来，他是一个很会交朋友的人，因为他总能和新的小朋友很快玩到一起，但其实是讨好型人格作祟。很多时候他不需要自己交朋友，在小区里有自己妹妹带着自己一起玩；在学校里只要认识一个人，自然就会认识很多人。
									</p>

									<p>
										不会表达自己的观点，对他的影响越来越大。初中，大家都有自己的小团体，不再和小学一样，这让他无所适从。他的性格十分平庸，但平庸在初中这个需要个性的阶段显得格格不入。他是父母老师眼里的“乖孩子”，是同学眼中“无趣”的人。他想要去融入大家，但是却不知道该怎么办，他想学着大家放学后在车站滞留聊天，他想学着大家去网吧，他想学着大家谈恋爱……但是效果都很差，他愿意给同学花钱，但却只会被大家当成冤大头。他没有意识到事情的本质，那就是他本身性格的软弱就是容易被人欺负；没有主见的人就是没法在人群中获得话语权。
									</p>

									<p>
										他不想当个没价值的人，好的成绩可以得到父母的夸奖，但是父母在他生活中的占比并不大，他渴望得到更多人的关注，于是他高中当选了团支书。这是他这么多年来最风光的日子，同学会听他安排，老师也会和他说很多事情。每当自习他要出去帮老师做事时，他心里其实暗爽，因为同学都在看着他，他是不一样的，他是大家羡慕的对象。
									</p>

									<p>
										高中他看到一个人，生物竞赛拿了省一，那一刻他仿佛是整个班上最闪耀的人，晨会上有表彰，签约会他也可以去参加，这让他暗自下决定，他也要去试试竞赛。
									</p>

									<p>
										他选择了计算机，他上课看竞赛相关的书，放学后留在计算机教室练习，他幻想自己拿金牌之后，会如众星捧月般。但是时间实在是太短，区区两个月怎么比得过人家日积月累的训练？最后选拔赛都没通过就遗憾离场。但是即使是这样，相较于数学、生物，愿意参加计算机竞赛的人在他们学校也是寥寥无几，后面学校老师还是会让他去代表学校参加一些其他竞赛，这也让他又感觉自己与众不同了。
									</p>

									<p>
										这些让他在本科成为了人上人，不是因为他能力有多强，而是因为本科考的太烂了。大家会问他要作业抄，会让他指导代码。但当他得不到回报的时候，他开始厌倦了，这种被人需要的感觉太容易获得了，这种感觉不再特殊了。
									</p>

									<p>
										于是，他学会了一个很重要的特质，那就是拒绝。他不再给予没有收益的帮助，他不再过多浪费自己的时间。他发现人是很贱的，只有自己拒绝了空手上门的人，下次人才会带着奶茶来请教。现在轮到他筛选自己身边的人了，而不是自己去融入他人。他发现了一件事，只要自己足够优秀，那就自然会有人需要自己。他的重心慢慢从别人移向了自己，提升自己的技术，提升自己的眼界，才能让别人需要自己。
									</p>
								</div>
							</>,

							<>
								<div className="letter-text">
									<p>
										以上故事有杜撰成分，有一些夸张的成分在里面，看个乐就行。
									</p>

									<p>
										本来呢还想讲讲恋爱史的，但是感觉把握不好那个度，所以就在这简单说说吧。上面这些你应该是可以看出我是一个比较慕强的人，如果一个人没有我欣赏的点，那即使对我再好，我也不会喜欢；相对的，当闪光点足够多时，我就会主动去追求。这个闪光点不是性格有多温柔，而是对生活的态度，对未来的期待，以及对自身的要求。
									</p>

									<p>
										我不喜欢平庸的人，因为平庸的人是过去的我自己。而你恰恰在这个时候出现在了我生活中。一个有自己想法的女生，一个对生活充满热情的女生。
									</p>

									<p>
										有时候我在想是不是命运总喜欢和我开玩笑，因为本科我也当过一个有男朋友的女生的舔狗，这次又是同样的场景。我不想再重蹈之前的覆辙，理智告诉我，不要纠缠这个女孩了，看人家朋友圈关系那么好，自己就不要异想天开了。
									</p>

									<p>
										但是不甘心啊，既然这样为什么要和我聊天呢？身边的朋友都叫我试试，那试试就试试吧！怎么说也要把承诺的大餐给吃到。
									</p>

									<p>
										你猜怎么着，还真成了。她经常问我，会不会太快了，无缝衔接会不会不好。但对我来说，晚一秒都是我对你喜欢的不尊重，只想快点与你在一起，只要我们两个过的开心就好，无缝衔接不是正说明喜欢我嘛。
									</p>

									<p>518次的晚安还不够，我会给你5180次，51800次……</p>

									<p>下面一页查重率百分之百</p>
								</div>
							</>,
							<>
								<div className="letter-text">
									<p>愿你的每一天都充满阳光与笑容，愿你的梦想都能一一实现。</p>

									<p>愿你永远保持对生活的热情，永远保持那份独特的性格。</p>

									<p>愿我们的每一天都能一起经历，一起成长，一起变老</p>

									<p>
										生日快乐，我的宝宝！
										<br />
										爱你的每一天，从今天到永远。
									</p>
								</div>
							</>,
						]}
					/>
				</LetterTemplate>
			</div>
		</div>
	);
}

export default function LetterPage() {
	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center min-h-screen">
					加载中...
				</div>
			}
		>
			<LetterContent />
		</Suspense>
	);
}
