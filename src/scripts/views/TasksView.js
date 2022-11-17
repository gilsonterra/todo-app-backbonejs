import TasksCollection from "../collections/TasksCollection";
import TaskView from './TaskView';

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

export default TasksView;
