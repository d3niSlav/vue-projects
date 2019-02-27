new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function () {
      this.monsterHealth -= this.calculateDamage(3, 10);
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    useSpecialAttack: function () {
      this.monsterHealth -= this.calculateDamage(10, 20);
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    heal: function () {
      this.playerHealth = this.playerHealth <= 90 ? this.playerHealth += 10 : 100;
      this.monsterAttack();
    },
    giveUp: function () {
      if (confirm('Do you really want to give up?')) {
        this.gameIsRunning = false;
      }
    },
    monsterAttack: function () {
      this.playerHealth -= this.calculateDamage(5, 12);
      this.checkWin();
    },
    calculateDamage: function (minimumDamage, maximumDamage) {
      return Math.max(Math.floor(Math.random() * maximumDamage) + 1, minimumDamage);
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        this.promptMessage('You won!');
        return true;
      } else if (this.playerHealth <= 0) {
        this.promptMessage('You lost!');
        return true;
      }

      return false;
    },
    promptMessage: function (message) {
      if (confirm(message + ' Do you want to start a new game?')) {
        this.startGame();
      } else {
        this.gameIsRunning = false;
      }
    }
  }
});
