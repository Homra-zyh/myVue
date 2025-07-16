//插件形式，全局响应

const colorArray = ["#FF5252", "#FF4081", "#E040FB", "#7C4DFF", "#536DFE", "#448AFF", "#40C4FF", "#18FFFF", "#64FFDA", "#69F0AE", "#B2FF59", "#EEFF41", "#FFFF00", "#FFD740", "#FFAB40", "#FF6E40"]
const TextArray = ["OωO", "(๑•́ ∀ •̀๑)", "❤", "❤", "❤", "❤", "❤", "❤", "(╯°口°)╯(┴—┴", "(๑•́ ₃ •̀๑)",
	"(๑•̀_•́๑)", "（￣へ￣）", "૮( ᵒ̌皿ᵒ̌ )ა", "╮(｡>口<｡)╭", "( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃", "(ꐦ°᷄д°᷅)", "∪ω∪", "∪△∪",
	"∪▽∪", "≧▂≦", "≧０≦", "≧︿≦", "≧ω≦", "≧﹏≦", "≧△≦", "≧▽≦", "＞▂＜", "＞︿＜", "＞ω＜",
	"＞△＜", "＞▽＜", "╯▂╰", "╯０╰", "╯︿╰", "╯ω╰", "╯﹏╰", "╯△╰", "╯▽╰", "＋▂＋", "＋︿＋", "＋ω＋",
	"＋△＋", "＋▽＋", "ˋ▂ˊ", "ˋ︿ˊ", "ˋωˊ", "ˋ△ˊ", "ˋ▽ˊ", "ˇ▂ˇ", "ˇ０ˇ", "ˇ︿ˇ", "ˇωˇ", "ˇ﹏ˇ",
	"ˇ△ˇ", "ˇ▽ˇ", "˙▂˙", "˙０˙", "˙︿˙", "˙ω˙", "˙﹏˙", "˙△˙", "˙▽˙", "≡(▔﹏▔)≡", "⊙﹏⊙",
	"( > c < )", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴",
	"(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴",
	"❤", "❤", "❤", "❤", "💩"];


const MouseClickEffectsPlugin = {
	install(app) {
		const handleClick = (e) => {
			const $elem = document.createElement("b");//创建一个b标签
			$elem.style.zIndex = 9999;
			$elem.style.position = "absolute";

			const x = e.pageX;
			const y = e.pageY;
			$elem.style.left = (x - 10) + "px";
			$elem.style.top = (y - 20) + "px";

			$elem.innerText = TextArray[Math.floor(Math.random() * TextArray.length)];
			$elem.style.color = colorArray[Math.floor(Math.random() * colorArray.length)];
			$elem.style.fontSize = Math.random() * 10 + 8 + "px";

			let increase = 0;
			const anim = setInterval(() => {//上移距离
				if (++increase === 150) {//150*8ms的存在时长
					clearInterval(anim);
					$elem.remove();
				}
				$elem.style.top = (y - 10 - increase) + "px";//元素产生于鼠标指针上10px，再逐渐上移150px
				$elem.style.opacity = (150 - increase) / 120;//透明度减小
			}, 8);

			document.body.appendChild($elem);
		};

		//绑定点击事件到document
		document.documentElement.addEventListener("click", handleClick);

		// //卸载功能
		app.config.globalProperties.$clickEffectCleanup = () => {
			document.documentElement.removeEventListener("click", handleClick);
		};
	}
};

export default MouseClickEffectsPlugin;