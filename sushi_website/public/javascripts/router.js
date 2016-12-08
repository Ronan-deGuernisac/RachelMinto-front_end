var router = new (Backbone.Router.extend({
  routes: {
    "menu/:id": App.renderMenuItem
  },
  index: function() { App.indexView(); },
  initialize: function() {
    this.route(/^\/?$/, "index", this.index);
  }
}))();

Backbone.history.start({
  pushState: true
});

$(document).on("click", "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true }); //changes url bar
});
