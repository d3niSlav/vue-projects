new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    gameLog: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameLog = [];
    },
    attack: function () {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.gameLog.unshift({
        isPlayer: true,
        message: 'Player attacks Monster for ' + damage + ' damage.'
      });

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    useSpecialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.gameLog.unshift({
        isPlayer: true,
        message: 'Player attacks Monster for ' + damage + ' damage.'
      });

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    heal: function () {
      this.playerHealth = this.playerHealth <= 90 ? this.playerHealth += 10 : 100;
      this.gameLog.unshift({
        isPlayer: true,
        message: 'Player heals and restores 10 health points.'
      });
      this.monsterAttack();
    },
    giveUp: function () {
      if (confirm('Do you really want to give up?')) {
        this.gameIsRunning = false;
        this.gameLog = [];
      }
    },
    monsterAttack: function () {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.gameLog.unshift({
        isPlayer: false,
        message: 'Monster attacks Player for ' + damage + ' damage.'
      });
      this.checkWin();
    },
    calculateDamage: function (minimumDamage, maximumDamage) {
      return Math.max(Math.floor(Math.random() * maximumDamage) + 1, minimumDamage);
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        this.gameLog.unshift({
          isPlayer: true,
          message: 'Player won!'
        });
        this.promptMessage('You won!');
        return true;
      } else if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        this.gameLog.unshift({
          isPlayer: false,
          message: 'Monster won!'
        });
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
