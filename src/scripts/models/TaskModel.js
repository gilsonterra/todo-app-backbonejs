Backbone.Model.prototype.idAttribute = "_id";

const TaskModel = Backbone.Model.extend({
  defaults: {
    title: "",
    description: "",
  },
});

export default TaskModel;
