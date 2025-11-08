interface Game {
	player: Player;
	type: GameType;
	score: number;
	invested: number;
	win: number;
	date: string;
}

export enum Player {
	WALLIN = 'Wallin',
	ERIKSSON = 'Eriksson',
	HELLSTROM = 'Hellström'
}

export enum GameType {
	REDUCED = 'Reducerat',
	MATHEMATIC = 'Matematiskt'
}

export const games: Game[] = [
	{
		player: Player.ERIKSSON,
		type: GameType.MATHEMATIC,
		score: 9,
		invested: 864,
		win: 0,
		date: '2025-10-25'
	},
	{
		player: Player.HELLSTROM,
		type: GameType.MATHEMATIC,
		score: 11,
		invested: 864,
		win: 0,
		date: '2025-10-18'
	},
	{
		player: Player.WALLIN,
		type: GameType.REDUCED,
		score: 8,
		invested: 912,
		win: 0,
		date: '2025-10-04'
	},
	{
		player: Player.HELLSTROM,
		type: GameType.MATHEMATIC,
		score: 8,
		invested: 768,
		win: 0,
		date: '2025-09-27'
	},
	{
		player: Player.ERIKSSON,
		type: GameType.MATHEMATIC,
		score: 6,
		invested: 768,
		win: 0,
		date: '2025-09-21'
	},
	{
		player: Player.WALLIN,
		type: GameType.MATHEMATIC,
		score: 9,
		invested: 864,
		win: 0,
		date: '2025-09-13'
	},
	{
		player: Player.HELLSTROM,
		type: GameType.MATHEMATIC,
		score: 6,
		invested: 768,
		win: 0,
		date: '2025-08-30'
	},
	{
		player: Player.ERIKSSON,
		type: GameType.REDUCED,
		score: 9,
		invested: 912,
		win: 0,
		date: '2025-08-23'
	},
	{
		player: Player.WALLIN,
		type: GameType.REDUCED,
		score: 8,
		invested: 864,
		win: 0,
		date: '2025-08-16'
	}
];
