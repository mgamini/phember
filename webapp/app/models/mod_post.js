App.Post = DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  author: DS.belongsTo('author', {async: true}),

  formattedBody: function() {
    return this.get('body').replace(/\n\r?/g, '<br /><br />');
  }.property('body').cacheable()
})