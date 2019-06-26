import WinnersStorage from '../winnersStorage'

const winnersStorage = new WinnersStorage();

const Gamer = function() {
    this.getName = function getName() {
        const name = prompt('Enter player name', 'player ') || getName();
        return name;
    }

    this.setScore = function(score) {
        this.score = score;
    }

    this.getScore = function() {
        return this.score;
    }

    this.resetScore = function() {
        this.setScore(0);
    }

    this.getPrevWins = function() {
        const winners = winnersStorage.get();
        const matchedPlayer = winners.find(winner => winner.name === this.name);
        if (!matchedPlayer) return 0;
        return confirm(`We found player with the same name "${matchedPlayer.name}" and ${matchedPlayer.wins} wins. Is it You?`) ? matchedPlayer.wins : 0;
    }
}
export default Gamer;