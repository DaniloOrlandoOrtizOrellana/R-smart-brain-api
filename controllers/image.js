const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '36ab60cf644946999bffa65dee335c92'
});

const handleApliCall = (req, res) => {
	app.models
	   .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	   .then(data => {
	   		res.json(data);
	   })
	   .catch(err => res.status(400).json('unable to work in api'))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
  	 .increment('entries',1)
  	 .returning('entries')
  	 .then(entries => {
  	 	res.json(entries[0]);
  	 	})
  	 .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApliCall
}