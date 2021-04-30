let canvas = document.getElementById("snake");//Criação da tela o jogo pelo canvas.
let context = canvas.getContext("2d");//Definindo jogo em formato '2d' pelo canvas.
let box = 32;
let snake = [];//Criar cobrinha como lista, será uma série de coordenadas, que pintadas são quadradinhos.
snake[0] = { //Definindo tamanho do array na posição 'x' e 'y'.
    x: 8 * box,
    y: 8 * box
}
let direction = "rigth"; //Variável da direção.
let food = { //Criação de quadrados em posições aleatórias que serão as comidas.
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box  
}

//Função de criação da tela do jogo, defindo cor e tamanho.
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Função de criar a cobra na cor preta
function criarCobrinha(){
    // Para cobra de tamanho maior que a variável 'i', pinte-a de preto (com bordas).
    for(i=0; i < snake.length; i++){ 
        context.fillStyle="black";
        context.fillRect(snake[i].x, snake[i].y, box-1, box-1);
    }
}

//Função de criar a comida, pintando-a de vermelha e preenchendo-a.
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Inicializando evento de clique do teclado para chamar a função 'update()'.
document.addEventListener('keydown', update);

//Função para definir a variável direção a partir das teclas "up, down, left e rigth".
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "rigth";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

//Função para inicializar o jogo.
function iniciarJogo(){
    //Criação de métodos para cobra retornar no lado oposto ao que ela saiu da tela.
    if(snake[0].x > 15 * box && direction == "rigth") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //Método que finaliza o jogo e alerta o player caso a cobra morda seu próprio rabo.
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("GAME OVER ;-;");
        }
    }

    //Invocação da funções.
    criarBG();
    criarCobrinha();
    drawFood();

    //Definindo novas variáveis.
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Método para movimento da cobra, adicionando ou retirando um valor na array.
    if(direction == "rigth") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    /* Método para cobra comer a comida se ambas estiverem na mesma posição,
       além de adicionar um valor na array para aumentar o tamanho da cobra e
       fazer com que a comida aparece em uma posição aleatória na tela.
    */
    if(snakeX == food.x && snakeY == food.y){
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }else{
        snake.pop();
    }

    //Criação de um valor na array da cobra.
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //Adicionando novo valor no tamanho da array afim de aumentar o comprimento da cobra.
    snake.unshift(newHead);
}

//Intervalo com que o jogo se inicia, atribuindo ao método um valor de 100ms para invocar a função iniciarJogo().
let jogo = setInterval(iniciarJogo, 100);