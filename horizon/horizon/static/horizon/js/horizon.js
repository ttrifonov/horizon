/* This is the base Horizon JavaScript object. There is only ever one of these
 * loaded (referenced as horizon with a lower-case h) which happens immediately
 * after the definition below.
 *
 * Scripts that are dependent on functionality defined in the Horizon object
 * must be included after this script in templates/base.html.
 */
var Horizon = function() {
  var horizon = {};
  var initFunctions = [];

  /* Use the addInitFunction() function to add initialization code which must
   * be called on DOM ready. This is useful for adding things like event
   * handlers or any other initialization functions which should preceed user
   * interaction but rely on DOM readiness.
   */
  horizon.addInitFunction = function(fn) {
    initFunctions.push(fn);
  };

  /* Call all initialization functions and clear the queue. */
  horizon.init = function() {
    $.each(initFunctions, function(ind, fn) {
      fn();
    });

    // Prevent multiple executions, just in case.
    initFunctions = [];
  };

  horizon.datatables = {
    update: function () {
      var rows_to_update = $('tr.status_unknown');
      if (rows_to_update.length) {
        // Trigger the update handler.
        var $updaters = rows_to_update.find('.ajax-update');
        $updaters.click();
        // Poll until there are no rows in an "unknown" state on the page.
        setTimeout(horizon.datatables.update, $updaters.attr('data-update-interval'));
      }
    }
  };

  return horizon;
};

// Create the one and only horizon object.
var horizon = Horizon();

// Call init on DOM ready.
$(document).ready(horizon.init);
