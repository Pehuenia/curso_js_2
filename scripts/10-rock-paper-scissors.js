const winMsg = 'You win';
      const loseMsg = 'You lose';
      const tieMsg = 'It is a tie';

      /*Obtenemos de localStorage el objeto  score que almacenamos. Para eso, se envía por parámetro el string 'score', que es la clave del elemento almacenado en localStorage. Para eso lo convertimos a objeto js nuevamente. 
    
      */
     // A continuación hay un shortcut el condicional  ACLARAR CÓMO FUNCIONA 🐴 
      let score = JSON.parse(localStorage.getItem('score')) || { 
        wins: 0,
        losses: 0,
        ties: 0
        //¿Acá,si local storage es === null lo crea?
        };

        updateScoreElement();

        
//!score es lo mismo que score === null
/*       
if (!score) {
        score = { 
          wins: 0,
          losses: 0,
          ties: 0
        };
        */
      

      //Atención: en el video, el profe las declara como constantes en cada atributo onclick, pero eso da on error que quiero evitar. Por ahora, prefiero declararlas acá, hasta ver bien cómo es.

      function pickComputerMove() {
        let randomNumber = Math.random();
        let computerMove = '';

        if(randomNumber >= 0 && randomNumber <1/3) {
          computerMove = 'rock';
        } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
          computerMove ='paper'; 
        } else if (randomNumber >= 2/3 && randomNumber < 1) {
          computerMove ='scissors';
        }
        return computerMove; 
      }

      function playGame (playerMove) {
        let result = '';
        computerMove = pickComputerMove();

        if (playerMove === computerMove) {
          result = tieMsg;
        } else if (playerMove === 'rock') {
          result = playRock(computerMove);
        } else if (playerMove === 'paper') {
          result = playPaper(computerMove); 
        } else if (playerMove === 'scissors') {
          result = playScissors(computerMove);
        }

        updateScore(result);
      /*CONVERSIÓN A STRING DEL OBJETO score (tabla de puntaje) 
      Luego de actualizar la tabla de puntajes (score) con updateScore, a continuación almacenamos score en localStorage. Como localStorage solo SOLO SOPORTA STRINGS, invocamos a la función stringity del objeto JSON, para que convierta al objeto score de JS en un string:
      */

        localStorage.setItem('score', JSON.stringify(score));

        document.querySelector('.js-result').innerHTML = result;

        document.querySelector('.js-movements').innerHTML = 
        `You <img src="images/${playerMove}-emoji.png" 
        class="move-icon"> 
        <img src="images/${computerMove}-emoji.png" 
        class="move-icon"> Computer`;

        //<img src="images/${playerMove}-emoji.png" class="move-icon">
      //<img src="images/${computerMove}-emoji.png" class="move-icon">

        updateScoreElement();

      }

      function playRock (computerMove) {
        msg = '';
        if (computerMove === 'paper') {
          msg = loseMsg;
        } else if (computerMove === 'scissors') {
          msg = winMsg;
        }
        return msg;
      }

      function playScissors (computerMove) {
        msg = '';
        if (computerMove === 'paper') {
          msg = winMsg;
        } else if (computerMove === 'rock') {
          msg = loseMsg;
        }
        return msg;
      }

      function playPaper (computerMove) {
        msg = '';
        if(computerMove === 'rock') {
          msg = winMsg;
        } else if (computerMove === 'scissors') {
          msg = loseMsg;
        }
        return msg;
      }

      function updateScore(resultMsg) {
        if (resultMsg === winMsg) {
          score.wins++;
        } else if (resultMsg === loseMsg) {
          score.losses++;
        } else if (resultMsg === tieMsg) {
          score.ties++;
        }
      }

      function  updateScoreElement() {
        const resume = document.querySelector('.js-score');
        resume.innerHTML = ` Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      }

      function resetScore() {

        //Se igualan a cero las propiedades de score, porque, si bien luego se remueve el item score del localStorage, no se remueve la variable del proyecto. 
        //Se remueve el item score de localStorage, en lugar de resetear sus valores a 0 únicamente, porque se correría el riesgo de perder consistencia (ver en chat gpt: localStorage, resetear).
        score.wins = 0
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score'); 

        updateScoreElement();

    
        //alert(`wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`);
        
      }