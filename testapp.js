if (Meteor.isClient) {
  Session.set("date",new Date());
  Template.hello.helpers({
    key: function () {
      var date = Session.get("date");
      return new RelativeFormatter(date).relativeKeyAndCount.key;
    },
    translation: function () {
      var date = Session.get("date");
      var formatter = new RelativeFormatter(date).relativeKeyAndCount;
      return TAPi18n.__(formatter.key, {count:formatter.count},"en");
    },
    key_idiomatic: function () {
      var date = Session.get("date");
      return new RelativeFormatter(date,{idiomatic:true}).relativeKeyAndCount.key;
    },
    translation_idiomatic: function () {
      var date = Session.get("date");
      var formatter = new RelativeFormatter(date,{idiomatic:true}).relativeKeyAndCount;
      return TAPi18n.__(formatter.key, {count:formatter.count},"en");
    }
  });

  Template.hello.events({
    'input #dateInput':function(e,t){
      var date = parseDate(e.currentTarget.value);
      if (!isNaN( date.getTime() )){
        Session.set("date",date);
      }
    }
  })
}

var parseDate = function(input) {
  var parts = input.split('-');
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}