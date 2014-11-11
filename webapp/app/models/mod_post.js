App.Post = DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  author: DS.belongsTo('author', {async: true})
})