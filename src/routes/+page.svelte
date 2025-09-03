<script lang="ts">
	import Card from '../lib/components/Card.svelte';
	import StatBox from '../lib/components/StatBox.svelte';
	import LastGame from '../lib/components/LastGame.svelte';
	import { games } from '$lib';
	import {
		getAmountPlayedFor,
		getAmountWon,
		getMostPlayedGameType,
		getNumberOfGamesWithScore,
		getBiggestWin,
		getPlayerWithHighestTotalWins,
		getPlayerWithBestScoreAverage,
		getPlayerWithMostScore,
		getPlayerWithWorstScoreAverage,
		getPlayerWithMostLosses,
		getLongestLosingStreak,
		getPlayerWithMostInvestedNoWin,
		getLongestDryPeriod,
		getGameTypeDistribution,
		getGameTypePerformance
	} from '$lib/functions/games';
	import { GameType } from '$lib/data/games';
</script>

<main class="h-full w-full max-w-screen-lg space-y-8">
	<header class="flex items-center justify-center">
		<h1 class="py-4 text-6xl font-bold text-gray-800">Skinkbolaget 2025</h1>
	</header>
	<section class="w-full">
		<Card title="Senast lagda spel">
			<LastGame />
		</Card>
	</section>
	<section class="w-full">
		<Card title="Lagstatistik 🐷">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatBox title="Totalt antal spel ">
					<span class="text-3xl">{games.length}</span>
				</StatBox>
				<StatBox title="Totalt investerat">
					<span class="text-3xl">{getAmountPlayedFor()} kr</span>
				</StatBox>
				<StatBox title="Totalt vunnit">
					<span class="text-3xl">{getAmountWon()} kr</span>
				</StatBox>
				<StatBox title="Summa">
					<span
						class="text-3xl {getAmountWon() - getAmountPlayedFor() > 0
							? 'text-green-700'
							: 'text-red-600'}"
					>
						{getAmountWon() - getAmountPlayedFor()} kr
					</span>
				</StatBox>
				<StatBox title="10 rätt">
					{@html getNumberOfGamesWithScore(10)}
				</StatBox>
				<StatBox title="11 rätt">
					{@html getNumberOfGamesWithScore(11)}
				</StatBox>
				<StatBox title="12 rätt">
					{@html getNumberOfGamesWithScore(12)}
				</StatBox>
				<StatBox title="13 rätt">
					{@html getNumberOfGamesWithScore(13)}
				</StatBox>
			</div>
		</Card>
	</section>
	<section class="w-full">
		<Card title="Speltyper 📊">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<StatBox title="Fördelning">
					{@html getGameTypeDistribution()}
				</StatBox>
				<StatBox title="Matematiskt resultat">
					{@html getGameTypePerformance(GameType.MATHEMATIC)}
				</StatBox>
				<StatBox title="Reducerat resultat">
					{@html getGameTypePerformance(GameType.REDUCED)}
				</StatBox>
			</div>
		</Card>
	</section>

	<section class="w-full">
		<Card title="Enskilda prestationer 🏆">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				<StatBox title="Största enskilda vinst">
					{@html getBiggestWin()}
				</StatBox>
				<StatBox title="Bästa balans">
					{@html getPlayerWithHighestTotalWins()}
				</StatBox>
				<StatBox title="Bästa rättsnitt">
					{@html getPlayerWithBestScoreAverage()}
				</StatBox>
				<StatBox title="Flest 10 rätt">
					{@html getPlayerWithMostScore(10)}
				</StatBox>
				<StatBox title="Flest 11 rätt">
					{@html getPlayerWithMostScore(11)}
				</StatBox>
				<StatBox title="Flest 12 rätt">
					{@html getPlayerWithMostScore(12)}
				</StatBox>
				<StatBox title="Flest 13 rätt">
					{@html getPlayerWithMostScore(13)}
				</StatBox>
			</div></Card
		>
	</section>
	<section class="w-full">
		<Card title="Roast 🔥">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
				<StatBox title="Sämsta rättsnitt">
					{@html getPlayerWithWorstScoreAverage()}
				</StatBox>
				<StatBox title="Sämsta balans">
					{@html getPlayerWithMostLosses()}
				</StatBox>
				<StatBox title="Längsta förlustserie">
					{@html getLongestLosingStreak()}
				</StatBox>
				<StatBox title="Längsta torrperiod">
					{@html getLongestDryPeriod()}
				</StatBox>
			</div></Card
		>
	</section>
</main>
