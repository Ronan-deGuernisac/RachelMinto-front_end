var App = {
  templates: JST,
  $el: $('main'),
  indexView: function() {
    this.user = new User();    
    new HeaderView({ model: App.user });
    this.createBoardMenu();
    new BoardView({ model: App.board});
    this.board.lists.each(this.renderListView);
    this.addList = new AddListView();
    this.bindEvents();
  },
  getNextCardID: function() {
    this.lastCardID++
    return this.lastCardID; 
  },
  getNextListID: function() {
    this.lastListID++
    return this.lastListID; 
  },  
  createBoardMenu: function() {
    var model = new Backbone.Model();
    model.set({user: App.user.attributes, board: App.board.attributes});
    this.boardMenu = new BoardMenuView({ model: model });    
  },
  renderListView: function(list) {
    new ListView({ model: list });

    _.each(list.cards.models, function(card) {
      new CardView({ model: card });
    }, this);
  },
  addCardToList: function(listID, model) {
    var list = this.board.getListByID(listID);
    list.cards.create(model);
  },
  updateCardPosition: function([oldListID, newListID, cardID, position]) {
    var oldList = this.board.getListByID(oldListID);
    var newList = this.board.getListByID(newListID);
    var model = oldList.getCardByID(cardID);

    oldList.cards.remove(model);    
    newList.cards.add(model, {at: position});
    newList.cards.syncServer();
    oldList.cards.syncServer();
  },
  openCardEditMenu: function(model) {
    new EditCardView({ model: model });
  },
  openBoardMenu: function(model) {
    this.boardMenu.show();
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on("openCardEditMenu", this.openCardEditMenu);
    this.on("openBoardMenu", this.openBoardMenu);
    this.on("updateListPositions", this.board.lists.updateListPositions.bind(this.board.lists));
    this.on('updateCardPosition', this.updateCardPosition);
    // this.listenTo(this.addList, "add_list", this.newList);
  },
};


// App.board.lists.models[0].cards.models[0].attributes.comments !! :)