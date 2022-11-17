import TaskModel from '../models/TaskModel';

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

export default TaskView;