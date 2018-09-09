import Utils from "./utils";

export default class todoModel {
  constructor(db, key) {
    this.db = db;
    this.key = key;
    this.todos = [];
    this.onChanges = [];
    this.ready = false;
    this.status = {
      loaded: 0,
      total: 0
    };

    // When the database was loaded and is ready to use,
    // refresh our data model and set the state to ready
    this.db.events.on("ready", () => {
      this.ready = true;
      this.inform();
    });
    // When a remote peer updated the todos, refresh our data model
    this.db.events.on("replicated", () => this.inform());
    // Watch for load progress and update the model state with the progress
    this.db.events.on(
      "load.progress",
      (address, hash, entry, progress, total) => {
        this.status.loaded = progress;
        this.status.total = total;
        this.onChanges.forEach(function(cb) {
          cb();
        });
      }
    );
  }

  subscribe = onChange => {
    this.onChanges.push(onChange);
  };

  inform = async () => {
    this.todos = await Utils.store(this.db, this.key);
    this.onChanges.forEach(cb => {
      cb();
    });
  };

  addTodo = async title => {
    const newTodo = {
      id: Utils.uuid(),
      title: title,
      completed: false
    };
    await Utils.store(this.db, this.key, newTodo);
    this.inform();
  };

  toggleAll = async checked => {
    for (let todo of this.todos) {
      const updatedTodo = Utils.extend({}, todo, { completed: checked });
      await Utils.store(this.db, this.key, updatedTodo);
    }
    this.inform();
  };

  toggle = async todoToToggle => {
    const updatedTodo = Utils.extend({}, todoToToggle, {
      completed: !todoToToggle.completed
    });
    await Utils.store(this.db, this.key, updatedTodo);
    this.inform();
  };

  destroy = async todo => {
    await Utils.store(this.db, this.key, null, todo);
    this.inform();
  };

  save = async (todoToSave, text) => {
    const updatedTodo = Utils.extend({}, todoToSave, { title: text });
    await Utils.store(this.db, this.key, updatedTodo);
    this.inform();
  };

  clearCompleted = async () => {
    this.todos = this.todos.filter(todo => {
      return todo.completed;
    });
    this.todos.forEach(todo => {
      this.destroy(todo);
    });
  };
}
