import LS from '../helpers/localStorage';
import {LS_KEY_WINNERS} from '../constants';

const WinnersStorage = function() {
    this.save = function (players) {
        const winnersFromLS = this.get();
        const winners = players.filter(player => player.wins > 0);
        // combine winners from localStorage [a,b] with current winners [b',c]  => [a,b',c]
        const winnersFromLSWithoutCurrentWinners = winnersFromLS.filter(winnerFromLS => {
            return !winners.some(winner => winnerFromLS.name === winner.name);
        });
        const updatedWinnersFromLS = [...winnersFromLSWithoutCurrentWinners, ...winners];
        LS.set(LS_KEY_WINNERS, updatedWinnersFromLS);
    }
    
    this.get = function () {
        console.log(LS.get(LS_KEY_WINNERS));
        return LS.get(LS_KEY_WINNERS) || [];
    }

    this.reset = function () {
        LS.remove(LS_KEY_WINNERS)
    }
}

export default WinnersStorage;
