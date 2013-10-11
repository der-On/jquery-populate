;(function($) {
  $.fn.populate = function(object)
  {
    var TYPE_STRING = 'string';
    var TYPE_INTEGER = 'int';
    var TYPE_FLOAT = 'float';
    var TYPE_NORMALIZED = 'normalized';
    var TYPE_BOOLEAN = 'bool';

    if (this.get(0).tagName.toLowerCase() === 'form') {
      // empty form first
      this.find('input[type!="submit"],input[type!="button"],textarea').val('');

      // set initial values from object
      this.find('input,textarea,select').each(function(i,input){
        input = $(input);

        // exit if input is disabled
        if (input.attr('disabled')) {
          return;
        }

        setInputFromProperty(object, input);
      });
    }

    function setInputFromProperty(object, input)
    {
      input = $(input);
      var name = input.attr('name');

      if (!exists(name)) return; // if input has no name, we do not need to continue

      var value = object;
      var type = TYPE_STRING; // default data type

      if (inArray(input.data('type'),[TYPE_STRING,TYPE_INTEGER,TYPE_FLOAT,TYPE_NORMALIZED,TYPE_BOOLEAN])) {
        type = input.data('type');
      }

      value = getPropertyByName(object,name);

      if (type == TYPE_NORMALIZED) {
        var min = parseFloat(input.data('min'));
        var max = parseFloat(input.data('max'));

        value = min + (value * (max - min));
      }

      if (inArray(input.attr('type'),['checkbox','radio'])) {
        var was_checked = input.get(0).checked;

        if (input.attr('value')) {
          if (input.val() == value+'') {
            input.get(0).checked = true;
          } else {
            input.get(0).checked = false;
          }
        } else {
          input.get(0).checked = value;
        }

        if (was_checked != true) {
          input.trigger('change');
        }
      } else {
        if (input.val() != value+'') {
          input.val(value);
          input.trigger('change');
        } else {
          input.val(value);
        }
      }
    }

    function getPropertyByName(object, name)
    {
      var props = name.split('.');
      var value = object;

      for (var i = 0; i < props.length; i++) {
        value = value[props[i]];
      }

      return value;
    }
  }

  function exists(val)
  {
    var exist = false;

    try {
      return (typeof val != 'undefined' && val !== null);
    } catch(err) {
      return false;
    }

    return false;
  }

  function inArray(value,arr,strict)
  {
    if(strict=="undefined") strict = false;
    for(var i=0;i<arr.length;i++) {
      if(strict && value===arr[i]) return true;
      if(!strict && value==arr[i]) return true;
    }
    return false;
  }
})(jQuery);