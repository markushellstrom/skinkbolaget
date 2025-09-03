import { games, GameType, Player } from '../data/games';

export const getAmountPlayedFor = () => {
	return games.reduce((acc, game) => acc + game.invested, 0);
};

export const getAmountWon = () => {
	return games.reduce((acc, game) => acc + game.win, 0);
};

export const getMostPlayedGameType = () => {
	if (games.length === 0) return 'Inga spel';

	const gameTypes = games.map((game) => game.type);
	const gameTypeCounts = gameTypes.reduce(
		(acc, gameType) => {
			acc[gameType] = (acc[gameType] || 0) + 1;
			return acc;
		},
		{} as Record<GameType, number>
	);

	// Find the most played game type
	const mostPlayedType = Object.entries(gameTypeCounts).reduce((a, b) =>
		gameTypeCounts[a[0] as GameType] > gameTypeCounts[b[0] as GameType] ? a : b
	);

	const typeName = mostPlayedType[0];
	const count = mostPlayedType[1];
	const percentage = Math.round((count / games.length) * 100);

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${typeName}</span>
		<span class="text-sm">(${percentage}%)</span>
	</div>`;
};

export const getNumberOfGamesWithScore = (score: number) => {
	const gamesWithScore = games.filter((game) => game.score === score);
	const totalSum = gamesWithScore.reduce((sum, game) => sum + game.win, 0);

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${gamesWithScore.length}</span>
		<span>${totalSum} kr</span>
	</div>`;
};

export const getBiggestWin = () => {
	if (games.length === 0) {
		return `<div class="flex flex-col items-center justify-center">
			<span class="text-3xl">0 kr</span>
			<span>Ingen</span>
		</div>`;
	}

	const biggestWin = games.reduce((max, game) => (game.win > max.win ? game : max), games[0]);

	if (biggestWin.win === 0) {
		return `<div class="flex flex-col items-center justify-center">
			<span class="text-3xl">0 kr</span>
			<span>Ingen</span>
		</div>`;
	}

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${biggestWin.win} kr</span>
		<span>${biggestWin.player}</span>
		<span class="text-xs">${biggestWin.date}</span>
	</div>`;
};

export const getPlayerWithHighestTotalWins = () => {
	// Calculate net result (win - invested) for each player
	const playerNetResults = games.reduce(
		(acc, game) => {
			if (!acc[game.player]) {
				acc[game.player] = { totalWin: 0, totalInvested: 0 };
			}
			acc[game.player].totalWin += game.win;
			acc[game.player].totalInvested += game.invested;
			return acc;
		},
		{} as Record<Player, { totalWin: number; totalInvested: number }>
	);

	// Calculate net result for each player and find the highest
	const playerNetResultsArray = Object.entries(playerNetResults).map(([player, stats]) => ({
		player,
		netResult: stats.totalWin - stats.totalInvested
	}));

	const highestNetResult = playerNetResultsArray.reduce((a, b) =>
		a.netResult > b.netResult ? a : b
	);

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${highestNetResult.netResult} kr</span>
		<span>${highestNetResult.player}</span>
	</div>`;
};

export const getPlayerWithBestScoreAverage = () => {
	// Group games by player and calculate their total scores and game counts
	const playerStats = games.reduce(
		(acc, game) => {
			if (!acc[game.player]) {
				acc[game.player] = { totalScore: 0, gameCount: 0 };
			}
			acc[game.player].totalScore += game.score;
			acc[game.player].gameCount += 1;
			return acc;
		},
		{} as Record<Player, { totalScore: number; gameCount: number }>
	);

	// Calculate average for each player and find the best
	const bestPlayer = Object.entries(playerStats).reduce((a, b) => {
		const avgA = a[1].totalScore / a[1].gameCount;
		const avgB = b[1].totalScore / b[1].gameCount;
		return avgA > avgB ? a : b;
	});

	const playerName = bestPlayer[0];
	const averageScore = bestPlayer[1].totalScore / bestPlayer[1].gameCount;

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${averageScore.toFixed(1)}</span>
		<span>${playerName}</span>
	</div>`;
};

export const getPlayerWithMostScore = (score: number) => {
	// Count how many times each player has achieved this score
	const playerScoreCounts = games.reduce(
		(acc, game) => {
			if (game.score === score) {
				acc[game.player] = (acc[game.player] || 0) + 1;
			}
			return acc;
		},
		{} as Record<Player, number>
	);

	// Check if any player has achieved this score
	const entries = Object.entries(playerScoreCounts);
	if (entries.length === 0) {
		return `<div class="flex flex-col items-center justify-center">
			<span class="text-3xl">0</span>
			<span>Ingen</span>
		</div>`;
	}

	// Find the player with the most occurrences of this score
	const bestPlayer = entries.reduce((a, b) =>
		playerScoreCounts[a[0] as Player] > playerScoreCounts[b[0] as Player] ? a : b
	);

	const playerName = bestPlayer[0];
	const count = bestPlayer[1];

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${count}</span>
		<span>${playerName}</span>
	</div>`;
};

export const getPlayerWithWorstScoreAverage = () => {
	// Group games by player and calculate their total scores and game counts
	const playerStats = games.reduce(
		(acc, game) => {
			if (!acc[game.player]) {
				acc[game.player] = { totalScore: 0, gameCount: 0 };
			}
			acc[game.player].totalScore += game.score;
			acc[game.player].gameCount += 1;
			return acc;
		},
		{} as Record<Player, { totalScore: number; gameCount: number }>
	);

	// Calculate average for each player and find the worst
	const worstPlayer = Object.entries(playerStats).reduce((a, b) => {
		const avgA = a[1].totalScore / a[1].gameCount;
		const avgB = b[1].totalScore / b[1].gameCount;
		return avgA < avgB ? a : b;
	});

	const playerName = worstPlayer[0];
	const averageScore = worstPlayer[1].totalScore / worstPlayer[1].gameCount;

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${averageScore.toFixed(1)}</span>
		<span>${playerName}</span>
	</div>`;
};

export const getPlayerWithMostLosses = () => {
	// Calculate net result (win - invested) for each player
	const playerNetResults = games.reduce(
		(acc, game) => {
			if (!acc[game.player]) {
				acc[game.player] = { totalWin: 0, totalInvested: 0 };
			}
			acc[game.player].totalWin += game.win;
			acc[game.player].totalInvested += game.invested;
			return acc;
		},
		{} as Record<Player, { totalWin: number; totalInvested: number }>
	);

	// Calculate net result for each player and find the worst (most negative)
	const playerNetResultsArray = Object.entries(playerNetResults).map(([player, stats]) => ({
		player,
		netResult: stats.totalWin - stats.totalInvested
	}));

	const worstNetResult = playerNetResultsArray.reduce((a, b) =>
		a.netResult < b.netResult ? a : b
	);

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${worstNetResult.netResult} kr</span>
		<span>${worstNetResult.player}</span>
	</div>`;
};

export const getLongestLosingStreak = () => {
	// Group games by player and sort by date
	const playerGames = games.reduce(
		(acc, game) => {
			if (!acc[game.player]) {
				acc[game.player] = [];
			}
			acc[game.player].push(game);
			return acc;
		},
		{} as Record<Player, typeof games>
	);

	let maxStreak = 0;
	let playerWithMaxStreak = '';

	// Calculate longest losing streak for each player
	Object.entries(playerGames).forEach(([player, playerGameList]) => {
		const sortedGames = playerGameList.sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);

		let currentStreak = 0;
		let maxPlayerStreak = 0;

		sortedGames.forEach((game) => {
			if (game.win === 0) {
				currentStreak++;
				maxPlayerStreak = Math.max(maxPlayerStreak, currentStreak);
			} else {
				currentStreak = 0;
			}
		});

		if (maxPlayerStreak > maxStreak) {
			maxStreak = maxPlayerStreak;
			playerWithMaxStreak = player;
		}
	});

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${maxStreak}</span>
		<span>${playerWithMaxStreak || 'Ingen'}</span>
	</div>`;
};

export const getPlayerWithMostInvestedNoWin = () => {
	// Find players who have invested but never won
	const playerStats = games.reduce(
		(acc, game) => {
			if (!acc[game.player]) {
				acc[game.player] = { totalInvested: 0, hasWon: false };
			}
			acc[game.player].totalInvested += game.invested;
			if (game.win > 0) {
				acc[game.player].hasWon = true;
			}
			return acc;
		},
		{} as Record<Player, { totalInvested: number; hasWon: boolean }>
	);

	// Find player with most invested who has never won
	const playersWithNoWin = Object.entries(playerStats)
		.filter(([_, stats]) => !stats.hasWon)
		.map(([player, stats]) => ({ player, totalInvested: stats.totalInvested }));

	if (playersWithNoWin.length === 0) {
		return `<div class="flex flex-col items-center justify-center">
			<span class="text-3xl">0 kr</span>
			<span>Ingen</span>
		</div>`;
	}

	const worstPlayer = playersWithNoWin.reduce((a, b) =>
		a.totalInvested > b.totalInvested ? a : b
	);

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${worstPlayer.totalInvested} kr</span>
		<span>${worstPlayer.player}</span>
	</div>`;
};

export const getLongestDryPeriod = () => {
	// Group games by player and sort by date
	const playerGames = games.reduce(
		(acc, game) => {
			if (!acc[game.player]) {
				acc[game.player] = [];
			}
			acc[game.player].push(game);
			return acc;
		},
		{} as Record<Player, typeof games>
	);

	let maxDays = 0;
	let playerWithMaxDays = '';

	// Calculate days since last win for each player
	Object.entries(playerGames).forEach(([player, playerGameList]) => {
		const sortedGames = playerGameList.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);

		// Find last winning game
		const lastWinGame = sortedGames.find((game) => game.win > 0);

		if (lastWinGame) {
			const lastWinDate = new Date(lastWinGame.date);
			const today = new Date();
			const daysSince = Math.floor(
				(today.getTime() - lastWinDate.getTime()) / (1000 * 60 * 60 * 24)
			);

			if (daysSince > maxDays) {
				maxDays = daysSince;
				playerWithMaxDays = player;
			}
		} else {
			// If player has never won, calculate days since their first game
			const firstGame = sortedGames[sortedGames.length - 1]; // Oldest game
			if (firstGame) {
				const firstGameDate = new Date(firstGame.date);
				const today = new Date();
				const daysSince = Math.floor(
					(today.getTime() - firstGameDate.getTime()) / (1000 * 60 * 60 * 24)
				);

				if (daysSince > maxDays) {
					maxDays = daysSince;
					playerWithMaxDays = player;
				}
			}
		}
	});

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${maxDays} dagar</span>
		<span>${playerWithMaxDays || 'Ingen'}</span>
	</div>`;
};

export const getGameTypeStats = () => {
	// Calculate stats for each game type
	const gameTypeStats = games.reduce(
		(acc, game) => {
			if (!acc[game.type]) {
				acc[game.type] = {
					count: 0,
					totalInvested: 0,
					totalWin: 0,
					totalScore: 0
				};
			}
			acc[game.type].count += 1;
			acc[game.type].totalInvested += game.invested;
			acc[game.type].totalWin += game.win;
			acc[game.type].totalScore += game.score;
			return acc;
		},
		{} as Record<
			GameType,
			{ count: number; totalInvested: number; totalWin: number; totalScore: number }
		>
	);

	return gameTypeStats;
};

export const getGameTypeDistribution = () => {
	const stats = getGameTypeStats();
	const totalGames = games.length;

	const mathematical = stats[GameType.MATHEMATIC] || {
		count: 0,
		totalInvested: 0,
		totalWin: 0,
		totalScore: 0
	};
	const reduced = stats[GameType.REDUCED] || {
		count: 0,
		totalInvested: 0,
		totalWin: 0,
		totalScore: 0
	};

	return `<div class="flex flex-col items-center justify-center space-y-4 w-full">
		<div class="text-center w-full">

			<div class="text-sm">Matematiskt</div>
			<div class="text-xs">(${totalGames > 0 ? Math.round((mathematical.count / totalGames) * 100) : 0}%)</div>
		</div>
		<div class="text-center w-full">

			<div class="text-sm">Reducerat</div>
			<div class="text-xs">(${totalGames > 0 ? Math.round((reduced.count / totalGames) * 100) : 0}%)</div>
		</div>
	</div>`;
};

export const getGameTypePerformance = (gameType: GameType) => {
	const stats = getGameTypeStats();
	const typeStats = stats[gameType] || { count: 0, totalInvested: 0, totalWin: 0, totalScore: 0 };

	if (typeStats.count === 0) {
		return `<div class="flex flex-col items-center justify-center">
			<span class="text-3xl">0</span>
			<span>Inga spel</span>
		</div>`;
	}

	const netResult = typeStats.totalWin - typeStats.totalInvested;
	const avgScore = typeStats.totalScore / typeStats.count;

	return `<div class="flex flex-col items-center justify-center">
		<span class="text-3xl">${netResult} kr</span>
		<span class="text-sm">${avgScore.toFixed(1)} rätt</span>
	</div>`;
};
