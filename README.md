# jQuery Populate

Populates a form with an object.

## Usage

    $('#myForm').populate({ name: 'Pete', email: 'pete@example.com' });


Also works with nested properties:

    <form id="myForm">
      <input type="text" name="address.country" />
    </form>

    $('#myForm').populate({ address: { country: 'Germany' } });


Allows some special data attributes on form elements:

**data-type**: (default="string") one of "float", "int", "normalized", "bool"

"normalized" will transform a normalized value form 0..1 into a value range from **data-min** to **data-max**.
