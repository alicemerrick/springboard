/* popovers */

$(function () {
  $('[data-toggle="popover"]').popover()
});

/* text-to-speech button */

var speak = false;

$('#speakeasy').click(function() {
  speak = !speak;
  $('#speakeasy').toggleClass('active');
  if (!speak) {
    synth.cancel();
    $('.spoken').removeClass('spoken');
  }
});


var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

$('body *').click(function () {
  
  if (speak === true) {
    if ($(this).parent('button').attr("id") != 'speakeasy') {
      event.stopPropagation();
    }
    $('.spoken').removeClass('spoken');
    if ($(this).parent('button').attr("id") != 'speakeasy' && $(this).attr("id") != 'speakeasy') {
      
      event.preventDefault();
      synth.cancel();
      var text = "";
  
      
      $(this).addClass('spoken');
  
      if ($(this).prop("tagName") === "input") {
        text = $(this).val();
      } else {
        text = $(this).text();
      }
      
      console.log(text);
  
      var utterThis = new SpeechSynthesisUtterance(text);
      // var selectedOption = "Google US English";
      var selectedOption = voices[0].name; // selects default
      for (i = 0; i < voices.length; i++) {
        // console.log(voices[i].name);
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
        }
      }
      utterThis.pitch = 1;
      utterThis.rate = 1;
      synth.speak(utterThis);
  
    }
  }

});

/* CRUD for cards */

var emptyCard = $('.card')[0].outerHTML;

/* create */

$('.addemptycard').click(function() {
  if (!speak) {
    $(this).before(emptyCard);
    functionalizeCard();
    functionalizeSlot();
  }
});

function functionalizeCard() {

  /* read */

  $('.card-block button').click(function() {
    event.stopPropagation();
  })

  $('.card-block').click(function() {
    $('.card').removeClass('card-active');
    $(this).parents('.card').addClass('card-active');
  })

  /* update */

  $('.dropdown-item').mousedown(function() {
    $(this).parent().siblings('input').val($(this).text());
  });

  $('.savecard').click(function() {
    if (!speak) {
      $(this).parents('.card').removeClass('card-active');
    }
  });

  /* delete */

  $('.removecard').click(function() {
    if (!speak) {
      $(this).parents('.card').remove();
    }
  });

  /* prompts and auto-suggestions */

  $('input[type=text]').focus(function() {
    if (!speak) {
      if ($(this).val().length > 0) {
        $(this).siblings('.dropdown-menu.filled').show();
      } else {
        $(this).siblings('.dropdown-menu.empty').show();
      }
      $('.card').removeClass('card-active');
      $(this).parents('.card').addClass('card-active');
    }
  });
  $('input[type=text]').keyup(function() {
    if ($(this).val().length > 0) {
      $(this).siblings('.dropdown-menu.empty').hide();
      $(this).siblings('.dropdown-menu.filled').show();
      
    } else {
      $(this).siblings('.dropdown-menu.filled').hide();
      $(this).siblings('.dropdown-menu.empty').show();
    }
    if ($(this).hasClass('contact')) {
      var input = $(this).val();
      if (input.indexOf('@') === -1) {
        var value = input.replace(/\D/g,'');
        if (value.length === 10) {
          $(this).addClass('is-phonenumber');
        } else {
          $(this).removeClass('is-phonenumber');
        }
      }
    }
  });
  $('input[type=text]').blur(function() {
    $(this).siblings('.dropdown-menu').hide();
  });

  /* button group checkbox */

  $('btn-group-week label').click(function() {
    console.log($(this).text());
  });


}

functionalizeCard();

/* CRUD for slots */

var emptySlot = $('.slot')[0].outerHTML;

function functionalizeSlot() {

  /* create */

  $('.addemptyslot').click(function() {
    $(this).parent().before(emptySlot);
    functionalizeSlot();
  });
  
  /* update */

  $('.saveslot').click(function() {
    $(this).parents('.slot').removeClass('slot-active');
  });

  /* delete */

  $('.removeslot').click(function() {
    $(this).parents('.slot').remove();
  });

}

functionalizeSlot();