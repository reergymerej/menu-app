$(function(){

	//	router for page
	var AppRouter = Backbone.Router.extend({
		routes: {
			'list/:model': 'showList'
		}
	});

	// --------------------------------------------------------------

	var Item = Backbone.Model.extend({});

	var Items = Backbone.Collection.extend({
		model: Item,
		url: '/items'
	});

	var ItemsView = Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function(){
			var template = _.template( $('#items-list').html(), {items: this.options.collection.toJSON()} );
			this.$el.html(template);
		}
	});

	var Meal = Backbone.Model.extend({});

	var Meals = Backbone.Collection.extend({
		model: Meal,
		url: '/meals'
	});

	var MealsView = Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function(){
			var template = _.template( $('#meals-list').html(), {meals: this.options.collection.toJSON()} );
			this.$el.html(template);
		}
	});

	var Menu = Backbone.Model.extend({});

	var Menus = Backbone.Collection.extend({
		model: Menu,
		url: '/menus'
	});

	var MenusView = Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function(){
			var template = _.template( $('#menus-list').html(), {menus: this.options.collection.toJSON()} );
			this.$el.html( template );
		}
	});



	var collection;
	var view;


	var router = new AppRouter();
	router.on('route:showList', function(model){

		var content = $('#content');

		//	remove the previous view
		content.empty();
		
		//	change the active tab
		$('ul.nav li').removeClass('active');
		$('ul.nav a[href$="' + model + '"]').parent().addClass('active');

		//	load a collection
		switch(model){
			case 'items':
				collection = new Items();
				collection.fetch({
					success: function(collection, models){
						view = new ItemsView({
							el: content,
							collection: collection
						});
					},
					error: function(){
						console.error('error fetching collection');
					}
				});
				break;

			case 'meals':
				collection = new Meals();
				collection.fetch({
					success: function(collection, models){
						view = new MealsView({
							el: content,
							collection: collection
						});
					},
					error: function(){
						console.error('error fetching collection');
					}
				});
				break;

			case 'menus':
				collection = new Menus();
				collection.fetch({
					success: function(collection, models){
						view = new MenusView({
							el: content,
							collection: collection
						});
					},
					error: function(){
						console.error('error fetching collection');
					}
				})
				break;

			default:
				console.error('do not know what to do with ' + model);
				content.html('whoops...');
		};
		
		
	});

	Backbone.history.start();
});