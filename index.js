var game = false; // запущена ли игра
var star_count,fuel_count,asteroids_count; // счетчики
var current_minites,current_seconds,time; //временные счетчики
var initialDate; // обновленная дата
var speed =10; // скорость движения корабля
var name; //имя игрока
var px =1; //положение поля

//функция при загрузке игры
 async function onload()
{ 
    $("#counters").animate({opacity:"hide"},"slow"); 
    LoadResults(); 
    window.setInterval(MovePole,5);    
}  
 
 //движение игрового поля
function MovePole()
{
    $("#pole").css('background-position',(px--)+"px");   
}


//начало игры
async function StartGame()
{
    initialDate     = new Date;
    game            = true;
    asteroids_count = 0;
    star_count      = 0;
    fuel_count      = 100;
    current_seconds = 0;
    current_minites = 0;
    last_seconds    = 0;
    name            = $('#name').val();
    Events();
    $("#buttons").animate({opacity:"hide"},"slow");
    $("#center").hide();
    $("#counters").show();
    await AddElement("ship","id",10,300);
    Game();
}

// Игровой цикл
async function Game()
{
    
        window.setInterval(Timer,1000);
        while(game==true)
        {
            if(current_seconds%5==0)
                AddElement("asteroid","class",900,getRandomInt(100,600));
            if(current_seconds%30==0)            
                AddElement("star","class",getRandomInt(100,1000),55);
            if(current_seconds%15==0)
                AddElement("fuel","class",getRandomInt(100,1000),55);
            await MoveElements("star");
            await MoveElements("fuel");
            await MoveElements("asteroid");
        }

}


//Рандом для вычисления позиции
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//конец игры
function EndGame()
{
    
    game = false;
    SaveResults();
    $("#buttons").show();
    $("#ship").animate({opacity:"hide"},"fast");
    $("#counters").animate({opacity:"hide"},"fast");
    $("#center").show("slow");
    DestroyAllObjects();
}

//Сохранение результатов после окончания игры
function SaveResults()
{    
    time="0:"+time;
    $.ajax({
        type:'POST',
        url:'save.php',
        data:{'Name':name,'Stars':star_count,'Time':time},
        response:'text',
        success:function(results){alert(results);}
    });
}


//Загрузка результатов во время загрузки игры
function LoadResults()
{
    $.ajax({
        type:'POST',
        url:"load.php",
        data:{},
        success:function(results)
        {
            $("#records").append(results);
        }
    });
}

//Отображение игровой инструкции
function HowToPlay()
{
    $("#records").hide();
    $("#how-to-play").show();
    $("#hp").hide();
    $("#rc").show();
}

//Отображение рекордов
function Records()
{
    $("#records").show();
    $("#how-to-play").hide();
    $("#hp").show();
    $("#rc").hide();
}

//Добавление элемента на игровое поле
//name:имя объекта
//type:class или id
//left_pos:позиция элемента слева
//top_pos: позиция элемента сверху
function AddElement(name,type,left_pos,top_pos)
{

    isCreated = false;
    if(name == "asteroid")
    {
        if(asteroids_count<5)
        {
            for(var i=0;i<10;i++)
            {
                
                if($("#a"+i).length<1)
                {
                    $("#pole").append("<div "+type+"=\""+name+"\" id =a"+i+"></div>");
                    $("#a"+i).css('left',left_pos);
                    $("#a"+i).css("top",top_pos);
                    asteroids_count++;
                    break;
                }
            }
            
        }
    }
    else if(name == "star")
    {
        if($(".star").length<1)
        {
           $("#pole").append("<div id=star1 class=\"star\"></div>") ;
           isCreated = true;
        }
    }
    else if(name =="fuel")
    {
        if($(".fuel").length<1)
        {
            $("#pole").append("<div id=fuel1 class=\"fuel\"></div>");
            isCreated = true;
        }
    }
    else if(name == "ship")
    {
        $("#pole").append("<div id=\"ship\"></div>");
        isCreated = true;
    }
    if(isCreated ==true && name !="asteroid")
    {
        if(type == "id")
            type ="#";
        else 
            type = ".";
        $(type+name).css("left",left_pos);
        $(type+name).css("top",top_pos);
    }
}



//события нажатия кнопок
function Events()
{
    addEventListener("keydown",function(event)
    {
        if(event.keyCode == 37)
            Move(speed,"left","ship");
        if(event.keyCode == 38)
            Move(speed,"top","ship");
        if(event.keyCode == 39)
            Move(speed,"right","ship");
        if(event.keyCode == 40)
            Move(speed,"bottom","ship");
    });
}


//логика уменьшения топлива
 function Fuel()
{
    if(game!=true)
        return;
    fuel_count= fuel_count-1;
    document.getElementById("data-fuel").innerHTML = fuel_count;
    if(fuel_count<1)
        EndGame();
}

//логика таймера
function Timer()
{
    if(game!=true)
        return;
    current_seconds++;
    if(current_seconds == 60)
    {
        current_seconds=0;
        current_minites ++;
    }
    time = current_minites+":" + current_seconds;
    Fuel();
    $('#data-timer').html(time);
}

//функция асинхронизации
async function sleep(ms)
{
    return await new Promise(resolve => setTimeout(resolve,ms));
}

//движение всех элементов
//type: class элемента
async function MoveElements(type)
{
    await sleep(1);
    var elements = document.getElementsByClassName(type);
    
    for(var i =0;i<elements.length;i++)
    {
        var id = elements[i].id;
        var ship_left =$("#ship").position().left;
        var ship_top =$("#ship").position().top;
        var elem_left =$('#'+id).position().left;
        var elem_top =$('#'+id).position().top;
        
        if(type =="asteroid")
        {
            await sleep(1);
            await Move(5,"left",id);
        }
        if(type == "star" || type == "fuel")
		{
            await sleep(1);
            await Move(5,"bottom",id);
		}
        if((ship_left<elem_left+20  && ship_left+100>elem_left+20 && elem_top+20  > ship_top && elem_top+20 <ship_top+100))   
        {
            if(type=="asteroid")
                    EndGame();
            else if(type == "star")
                AddStar();
            else if (type=="fuel")
                AddFuel();
            $("#"+id).remove();
        }
    }
}


//движение одного элемента
async function Move(distance,line,id)
{
     await sleep(1);
    var element = $("#"+id);
    if(element.length<0)
        return;
    if(line == "right" || line == "left")
        var line_count = element.position().left; 
    else if (line == "bottom"|| line == "top")
        var line_count = element.position().top; 
    if(line == "left" || line == "top")
        line_count = parseInt(line_count) - distance;
    else
        line_count = parseInt(line_count) + distance;
            
    
	if(line_count<0)
		if(id=="ship")
			line_count=0;
		else
        {
            cl = $("#"+id).attr("class");
            if(cl =="asteroid")
                asteroids_count--;
			$("#"+id).remove();
        }
		
	if(line=="right")
		if(line_count>1000)
			if(id=="ship")
				line_count =1000;
			else
				$("#"+id).remove();
			
	if(line=="bottom")
		if(line_count > 668)
			if(id=="ship")
				line_count=668;
			else
				$("#"+id).remove();

	if(line == "top" || line =="bottom")
		$("#"+id).css('top',line_count);
	else if (line == "left" || line == "right")
		$("#"+id).css('left',line_count);
	
}

//Плюс звезда
function AddStar()
{
    star_count ++;
    document.getElementById("data-star").innerHTML = star_count;
}

//плюс топливо
function AddFuel()
{
    fuel_count+=15;
    document.getElementById("data-fuel").innerHTML = fuel_count;

}

//уничтожение всех элементов
function DestroyAllObjects()
{
   $(".asteroid").remove().animate("slow");
   $("#ship").remove();
   $(".star").remove();
   $(".fuel").remove();
}
