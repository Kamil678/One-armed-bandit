class Statistics {
    constructor(){
        this.gameResults = [{ win:true, bid: 2}, {win: false, bid: -10}];
    }

    addGameToStatistics(win, bid){
        let gameResult= {
            win: win,
            bid: bid
        }
        this.gameResults.push(gameResult);
    }

    showGameStatistics() {
        let games = this.gameResults.length;
        let wins = this.gameResults.filter(result => result.win).length;
        console.log(wins);
        let looses = this.gameResults.filter(result => !result.win).length ;//games - wins;
        console.log(looses)
        return [games, wins, looses];
    }
}

const stats= new Statistics()
