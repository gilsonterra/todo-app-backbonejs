'use strict';

Backbone.Model.prototype.idAttribute = "_id";

const TaskModel = Backbone.Model.extend({
  defaults: {
    title: "",
    description: "",
  },
});

const TasksCollection = Backbone.Collection.extend({});

const TaskView = Backbone.View.extend({
	model: new TaskModel(),
	tagName: 'tr',
	initialize: function() {
		const title = this.$('.label-title').html();
		const description = this.$('.label-description').html();

		this.data = {
			title,
			description,
		};

		this.template = _.template($('.tasks-list-template').html());
	},
	events: {
		'click .edit-task': 'edit',
		'click .update-task': 'update',
		'click .cancel': 'cancel',
		'click .delete-task': 'delete'
	},
	edit: function() {
		$('.edit-task').hide();
		$('.delete-task').hide();
		this.$('.update-task').show();
		this.$('.cancel').show();

		this.$('.label-title').html(`<input type="text" class="form-control title-update" value="${this.model.get('title')}">`);
 		this.$('.label-description').html(`<input type="text"" class="form-control description-update" value="${this.model.get('description')}">`);
	},
	update: function() {
		this.model.set('title', $('.title-update').val());
		this.model.set('description', $('.description-update').val());
	},
	cancel: function() {
		$('.edit-task').show();
		$('.delete-task').show();
		this.$('.update-task').hide();
		this.$('.cancel').hide();

		this.$('.label-title').html(this.model.get('title'));
 		this.$('.label-description').html(this.model.get('description'));
	},
	delete: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

const TasksView = Backbone.View.extend({
  model: new TasksCollection(),
  el: $(".tasks-list"),
  initialize: function () {
    var self = this;
    this.model.on("add", this.render, this);
    this.model.on(
      "change",
      function () {
        setTimeout(function () {
          self.render();
        }, 30);
      },
      this
    );
    this.model.on("remove", this.render, this);
    this.render();
  },
  render: function () {
    var self = this;
    this.$el.html("");
    _.each(this.model.toArray(), function (task) {
      self.$el.append(new TaskView({ model: task }).render().$el);
    });
    return this;
  },
});

Backbone.Model.prototype.idAttribute = "_id";

const task1 = new TaskModel({
  title: "Tarefa 1",
  description: "Lorem ipsum",
});

const task2 = new TaskModel({
  title: "Tarefa 2",
  description: "Description ipsums",
});

const tasksCollection = new TasksCollection([task1, task2]);
new TasksView({ model: tasksCollection });

$(document).ready(function () {
  $(".add-task").on("click", function () {
    const task = new TaskModel({
      title: $(".title-input").val(),
      description: $(".description-input").val(),
    });
    $(".title-input").val("");
    $(".description-input").val("");
   
    tasksCollection.add(task);
  });
});
