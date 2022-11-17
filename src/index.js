import "./css/style.css";
import "./css/style.css";
import TaskModel from "./scripts/models/TaskModel";
import TasksCollection from "./scripts/collections/TasksCollection";
import TasksView from "./scripts/views/TasksView";

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
const tasksView = new TasksView({ model: tasksCollection });

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
