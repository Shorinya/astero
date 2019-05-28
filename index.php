<!DOCTYPE HTML>

<html>
    <head>
        <title>SkyHunter</title>
        <link href="index.css" rel="stylesheet"/>
        <script src="JQuery/jquery-3.2.1.js"></script>
        <script src="index.js"></script>
        <meta charset="utf-8"/>
    </head>
    <body onload="onload()">
        <div id="pole">
            <div id="counters">
                <div id="fuel" class="counter">
                    <p id="data-fuel" class="data">100</p>
                </div>
                <div id="star" class="counter">
                    <p id="data-star" class="data">0</p>
                </div>
                <div id="timer" class="counter">
                    <p id="data-timer" class="data">0:0</p>
                </div>
            </div>
            <div id="center" >
                <p id="game-name">SkyHunter</p>
                <table id="records"  >
                    <tr>
                        <td>№</td>
                        <td>Имя</td>
                        <td>Звезды</td>
                        <td>Время</td>
                    </tr>

                </table>
                <div id="how-to-play" style="display:none;">
                    <h2>Как играть</h2>
                    <p>Стрелки - движение</p>
                    <p>Пробел - пауза\продолжить</p>
                    <p>Звезда - (+1 еденица звезд)</p>
                    <p>1 сек - минус 1 ед. топлива</p>
                    <p>Топливо - (+15 едениц топлива)</p>
                    <p>0 топлива - конец игры </p>
                    <p>Столкновение с метеоритом - конец игры</p>
                </div>
            </div>
            <div id="buttons">
                <button id="hp" onclick="HowToPlay()" >Как играть</button>
                <button id="rc" onclick="Records()" style="display:none;">Рекорды</button>
                <button  onclick="StartGame()" >Начать игру</button>
                <p>Введите имя</p>
                <input id="name" type="text" value="Аноним"/>
            </div>
             <button id="sound-button" onclick ="Sound()" >Звук: Вкл</button>
             <button id="pause-button" onclick ="Pause()" >Пауза</button>
        </div>
        
    </body>
</html>