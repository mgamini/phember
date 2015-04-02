'use strict';

var fs        = require('fs')
,   path      = require('path')
,   tasksPath = path.join(__dirname, 'tasks')
,   tasks     = fs.readdirSync(tasksPath)
,   config    = require('config');

tasks.forEach(function(task) {
  require(path.join(tasksPath, task))(config);
});