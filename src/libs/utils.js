export const getTypeIcon = (tipo) => {
	switch (tipo) {
		case "familia":
			return "👨‍👩‍👦";
		case "trabajo":
			return "💼";
		case "social":
			return "🎉";
		default:
			return "👤";
	}
};