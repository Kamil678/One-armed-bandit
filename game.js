class Game {
    constructor(start) {
        this.stats = new Statistics();
        this.wallet = new Wallet(start);
        
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.inputBid = document.getElementById('bid');
        this.spanWallet = document.querySelector(".panel span.wallet");
        this.boards = [...document.querySelectorAll('div.color')];
        this.spanResult = document.querySelector('.result');
        this.spanGames = document.querySelector('.number');
        this.spanWins = document.querySelector('.win');
        this.spanLosses = document.querySelector('.loss');

        this.render()
    }

    render(colors = ["white","white","white"],money = this.wallet.getWalletValue(), result= "", stats = [0,0,0], bid = 0, wonMoney = 0) {
        this.boards.forEach((board,index) => {board.style.backgroundColor = colors[index]});
        this.spanWallet.textContent = money;
        if(result){
            result = `Wygrałeś ${wonMoney}$`;
            this.spanResult.style.color = "green";
        } else if(!result && result !==""){
            result = `Przegrałeś ${bid}$`;
            this.spanResult.style.color = "red";
        }
        this.spanResult.textContent = result;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];
        this.inputBid.value = "";
    }

    startGame() {
        if(this.inputBid.value < 1) return alert("Za mało postawiłeś!!!");
        const bid = Math.floor(this.inputBid.value);

        if(!this.wallet.checkCanPlay(bid)){
            return alert("Masz za mało środków, lub została podana nieprawidłowa wartość!!");
        }

        this.wallet.changeWallet(bid, "-");

        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        
        const win = Result.checkWinner(colors);
       

        const wonMoney = Result.moneyWinInGame(win, bid);

        this.wallet.changeWallet(wonMoney);

        this.stats.addGameToStatistics(win, bid);

        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics() , bid, wonMoney)


    }
}

