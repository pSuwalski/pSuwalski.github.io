// Calculator

  var notChanged = 1;
  var curF, curT;

  $('#from').change(function() {
    notChanged = 0;
    curF = curs[this.value]
    console.log(3);
    var inValue = $('#inVal').val();
    $('#outVal').html((inValue*curF/curT).toFixed(2));

  });

  $('#to').change(function() {
    notChanged = 0;
    curT = curs[this.value];
    console.log(4);
    var inValue = $('#inVal').val();
    $('#outVal').html((inValue*curF/curT).toFixed(2));
  });

  $('#inVal').bind('keydown keyup keypress', function() {
    if(notChanged == 1){
        console.log(1);
        $('#outVal').html((this.value*euro/1).toFixed(2) );
    }else{
        $('#outVal').html((this.value*curF/curT).toFixed(2) );
    }
  });