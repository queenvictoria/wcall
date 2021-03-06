// @FIX This must load after jQuery surely.
// @FIX Whitespace.
var RemoteDataWidget = function(options) {
  var opts = {
    initargs: null,
    widgetid: null,
    url:      null,
    testing:  true,
  };

  this.getData = function(remote_args, callback) {
    jQuery.ajax({
        method: "POST",
        url: opts.url,
        data: {
          remote_args: remote_args,
          widgetid: opts.widgetid
        }
      })
      .done(function(obj) {
        callback(obj);
      });
  }

  /*
   * Create the initial view.
   */
  this.createView = function() {
    this.updateView();
  }

  /*
   * Update the data and then update the contents.
   */
  this.updateView = function() {
    var self = this;

    var container = jQuery("#" + opts.widgetid);
    self.getData({}, function(data) {
      jQuery("textarea", container).val(JSON.stringify(data, null, 2));
    });
  }

  /*
   * TESTING
   * Create an update button.
   */
  this.test = function() {
    var self = this;

    var container = jQuery("#" + opts.widgetid);
    jQuery(container).append("<button>Update</button>");
    jQuery("button", container).on("click", function(e) {
      jQuery("textarea", container).val("");
      self.updateView();
    });
  }

  /*
   * Constructor
   */
  this.construct = function(options){
    jQuery.extend(opts, options);

    // Do any preflight items while in testing.
    if ( opts.testing )
      this.test();

    this.createView();
  };

  /*
   * Pass options when class instantiated
   */
  this.construct(options);
}
