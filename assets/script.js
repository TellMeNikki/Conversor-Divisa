$(document).ready(function () {
  $.getJSON('https://mindicador.cl/api', function(data) {
    var today = data;

    //Muestra los indicadores económicos del día
    $(".uf").append('$'+today.uf.valor)
    $(".usd").append('$'+today.dolar.valor)
    $(".utm").append('$'+today.utm.valor)
    $(".eur").append('$'+today.euro.valor)
    
    //solo permite ingresar números
    $('.amount').on('input', function () { 
      this.value = this.value.replace(/[^0-9]/g,'');
    });

   //Convierte de peso a dólar y euro
    $('#clp').on('change',function(){
      val= document.getElementById("clp").value;
      $('#usd').val((val/today.dolar.valor).toFixed(3));
      $('#eur').val((val/today.euro.valor).toFixed(3));
      console.log ('USD '+(val/today.dolar.valor).toFixed(3));
      console.log ('EUR '+(val/today.euro.valor).toFixed(3));
    });

    //Convierte de dólar a peso y euro
    $('#usd').on('change',function(){
      val= document.getElementById("usd").value;
      $('#clp').val(today.dolar.valor*val);
      $('#eur').val((val*(today.dolar.valor/today.euro.valor)).toFixed(2));
      console.log ('CLP '+today.dolar.valor*val);
      console.log ('EUR '+(val*(today.dolar.valor/today.euro.valor)).toFixed(2));
    });

    //Convierte de euro a dólar y peso
    $('#eur').on('change',function(){
      val= document.getElementById("eur").value;
      $('#clp').val(today.euro.valor*val);
      $('#usd').val((val*(today.euro.valor/today.dolar.valor)).toFixed(2));
      console.log ('CLP '+today.euro.valor*val);
      console.log ('USD '+(val*(today.euro.valor/today.dolar.valor)).toFixed(2));
    });

  }).fail(function() {
    //si existe problemas con la API, se muestra mensaje de error
    console.log('Error al consumir la API!');
    $('.aviso').val('Error al consumir la API!');
  });
});
