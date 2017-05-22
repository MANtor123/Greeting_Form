module.exports = function(){

var nameList = [];

var names = function(req, res){
res.send('Added names')
};

var add = function(req, res){
// var list = req.query.list
res.send('Added name');
// nameList.push(list);
 };

return {
  names
}
};
