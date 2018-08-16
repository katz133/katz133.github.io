// valor padrao de 2 dias 6 horas 30 minutos 0 segundos
var day     = parseInt(2),
    hour    = parseInt(6),
    minute  = parseInt(30),
    seconds = parseInt(0);

// sem espacos
var nomeProduto = "Revital";

// para não usar o cookie, mude para 0
var status = '1';

window.onload = function () 
{
  if (status == '1')
  { 
    // busca o cookie se existir
    var search = "c"+nomeProduto+"P=";
    if(document.cookie.length > 0)
    { 
      //busca a posicao do 'c"+nomeProduto+"P'
      offset = document.cookie.indexOf(search);
      if (offset != -1)
      { 
        //se existir, seta a pocisao depois do =
        offset += search.length;
        //seta a posicao final do valor
        end = document.cookie.indexOf(";", offset);
        if (end == -1) end = document.cookie.length;
        //recebe o array com os valores
        value = unescape(document.cookie.substring(offset, end));
        data = value.split('-');

        day = !isNaN(data[0]) ? parseInt(data[0]) : day;
        hour = !isNaN(data[1]) ? parseInt(data[1]) : hour;
        minute = !isNaN(data[2]) ? parseInt(data[2]) : minute;
        seconds = !isNaN(data[3]) ? parseInt(data[3]) : seconds;
      }
    }
  }

  // campo com o numero
  var fildDay = document.getElementById('counterDay'),
      fildHour = document.getElementById('counterHour'),
      fildMinute = document.getElementById('counterMinute'),
      fildSeconds = document.getElementById('counterSecond');

  // campo com a descricao
  var sDay = document.getElementById('sDay'),
      sHour = document.getElementById('sHour'),
      sMinute = document.getElementById('sMinute'),
      sSeconds = document.getElementById('sSecond');

  // li geral com numero e descricao
  var liDay = document.getElementById('liDay'),
      liHour = document.getElementById('liHour'),
      liMinute = document.getElementById('liMinute');

  var stringDay = '';
  var stringHour = '';
  var stringMinute = '';
  var stringSeconds = '';

  if(day == 0){liDay.style.display = 'none';}
  if(day == 0 && hour == 0){liHour.style.display = 'none';}
  if(day == 0 && hour == 0 && minute == 0){liMinute.style.display = 'none';}

  var inter = setInterval(function()
  {
    // add '0' se for menor que 10
    // stringDay = day < 10 ? '0'+day : stringDay = day;
    // stringHour = hour < 10 ? '0'+hour : stringHour = hour;
    // stringMinute = minute < 10 ? '0'+minute : stringMinute = minute;
    // stringSeconds = seconds < 10 ? '0'+seconds : stringSeconds = seconds;

    stringDay = day;
    stringHour = hour;
    stringMinute = minute;
    stringSeconds = seconds;

    fildDay.innerHTML = stringDay;
    fildHour.innerHTML = stringHour;
    fildMinute.innerHTML = stringMinute;
    fildSeconds.innerHTML = stringSeconds;

    // verica se for 1, retira o s
    if (seconds == 1) {sSecond.innerHTML = 'Segundo';} 
    else 
    {
      sSecond.innerHTML = 'Segundos';
      if (minute == 1) {sMinute.innerHTML = 'Minuto';} 
      else 
      {
        sMinute.innerHTML = 'Minutos';
        if (hour == 1) {sHour.innerHTML = 'Hora';} 
        else 
        {
          sHour.innerHTML = 'Horas';
          if (day == 1) {sDay.innerHTML = 'Dia';} else {sDay.innerHTML = 'Dias';}
        }
      }
    }

    // se chegar a 0, remove
    if(day == 0){liDay.style.display = 'none';}
    if(day == 0 && hour == 0){liHour.style.display = 'none';}
    if(day == 0 && hour == 0 && minute == 0){liMinute.style.display = 'none';}

    seconds--;    

    if (seconds < 0)
    {
      
      minute--;      
      seconds = 59;

      if (minute < 0) 
      {
        hour--;
        minute = 59;

        if (hour < 0) 
        {
          day--;
          hour = 23;

          if (day < 0)
          {
            day = 0;
            hour = 0;
            minute = 0;
            seconds = 0;
            clearInterval(inter);
            document.getElementById('countdown').style.display = 'none';
            document.getElementById('expired').style.display = 'block';
          }
        }
      }

    }

  }, 1000);

} 

window.onbeforeunload = function()
{
  var expires = new Date();
  // 7 dias para expirar
  expires.setDate(expires.getDate() +7);
  var data = day+'-'+hour+'-'+minute+'-'+seconds;
  document.cookie = "c"+nomeProduto+"P=" + data + "; expires=" + expires.toGMTString()
};