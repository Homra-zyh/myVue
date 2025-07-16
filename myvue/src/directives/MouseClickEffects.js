//自定义指令形式，需要页面中有一个元素绑定

const colorArray = ["#FF5252", "#FF4081", "#E040FB", "#7C4DFF", "#536DFE", "#448AFF", "#40C4FF", "#18FFFF", "#64FFDA", "#69F0AE", "#B2FF59", "#EEFF41", "#FFFF00", "#FFD740", "#FFAB40", "#FF6E40"]
const TextArray = ["OωO", "(๑•́ ∀ •̀๑)", "❤", "❤", "❤", "❤", "❤", "❤", "(╯°口°)╯(┴—┴", "(๑•́ ₃ •̀๑)",
	"(๑•̀_•́๑)", "（￣へ￣）", "૮( ᵒ̌皿ᵒ̌ )ა", "╮(｡>口<｡)╭", "( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃", "(ꐦ°᷄д°᷅)", "∪ω∪", "∪△∪",
	"∪▽∪", "≧▂≦", "≧０≦", "≧︿≦", "≧ω≦", "≧﹏≦", "≧△≦", "≧▽≦", "＞▂＜", "＞︿＜", "＞ω＜",
	"＞△＜", "＞▽＜", "╯▂╰", "╯０╰", "╯︿╰", "╯ω╰", "╯﹏╰", "╯△╰", "╯▽╰", "＋▂＋", "＋︿＋", "＋ω＋",
	"＋△＋", "＋▽＋", "ˋ▂ˊ", "ˋ︿ˊ", "ˋωˊ", "ˋ△ˊ", "ˋ▽ˊ", "ˇ▂ˇ", "ˇ０ˇ", "ˇ︿ˇ", "ˇωˇ", "ˇ﹏ˇ",
	"ˇ△ˇ", "ˇ▽ˇ", "˙▂˙", "˙０˙", "˙︿˙", "˙ω˙", "˙﹏˙", "˙△˙", "˙▽˙", "≡(▔﹏▔)≡", "⊙﹏⊙",
	"( > c < )", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴",
	"(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴",
	"❤", "❤", "❤", "❤", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩", "💩"];


export default {
	mounted(el, binding) {
		const handleClick = (e) => {
			const $elem = document.createElement("b");//创建一个b标签
			$elem.style.zIndex = 9999;
			$elem.style.position = "absolute";//绝对定位

			const x = e.pageX;
			const y = e.pageY;
			$elem.style.left = (x - 10) + "px";
			$elem.style.top = (y - 20) + "px";

			$elem.innerText = TextArray[Math.floor(Math.random() * TextArray.length)];
			$elem.style.color = colorArray[Math.floor(Math.random() * colorArray.length)];

			$elem.style.fontSize = Math.random() * 10 + 8 + "px";//随机字体大小8-18px

			let increase = 0;//上移距离
			const anim = setInterval(() => {
				if (++increase === 150) {//150*8ms的存在时长
					clearInterval(anim);
					$elem.remove();
				}
				$elem.style.top = (y - 10 - increase) + "px";//元素产生于鼠标指针上10px，再逐渐上移150px
				$elem.style.opacity = (150 - increase) / 120;//透明度减小
			}, 8);

			document.body.appendChild($elem);//添加到body中
		};

		// 绑定点击事件到document
		document.documentElement.addEventListener("click", handleClick);

		//保存清理函数，避免内存泄漏
		el._clickEffectCleanup = () => {
			document.documentElement.removeEventListener("click", handleClick);
		};
	},
	unmounted(el) {
		// 组件卸载时移除事件监听
		el._clickEffectCleanup?.();
	}
};