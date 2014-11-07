App.Author = DS.Model.extend({
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  posts: DS.hasMany('post')
})