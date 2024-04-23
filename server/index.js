const express = 'express';
const bodyParser = 'body-parser';
const mongoose = 'mongoose';
const cors = 'cors';
const  Comment = './models/Comment.js';
const  VotingRoutes = './VotingRoutes.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(VotingRoutes);

await mongoose.connect('mongodb://localhost:27017/reddit', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('ok');
});

app.get('/comments', (req, res) => {
  const search = req.query.search;
  const filters = search ? { body: { $regex: '.*' + search + '.*' } } : { rootId: null };
  Comment.find(filters).sort({ postedAt: -1 }).then(comments => {
    res.json(comments);
  });
});

app.get('/comments/root/:rootId', (req, res) => {
  Comment.find({ rootId: req.params.rootId }).sort({ postedAt: -1 }).then(comments => {
    res.json(comments);
  });
});

app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id).then(comment => {
    res.json(comment);
  });
});

app.post('/comments', (req, res) => {
  const { title, body, parentId, rootId } = req.body;
  const comment = new Comment({
    title,
    body,
    postedAt: new Date(),
    parentId,
    rootId,
  });
  comment.save().then(savedComment => {
    res.json(savedComment);
  }).catch(error => {
    console.error(error);
    res.sendStatus(500);
  });
});

app.listen(4000);
