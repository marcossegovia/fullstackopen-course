require('dotenv').config();
const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Contact = require('./models/contact');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', (request, response) => {
  Contact.find({}).then((contacts) => {
    response.send(`Phonebook has info for ${contacts.length} people<br/>${new Date().toUTCString()}`);
  });
});
app.get('/api/persons', (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
});
app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});
app.post('/api/persons', (request, response, next) => {
  const { name } = request.body;
  const { number } = request.body;

  const contact = new Contact({
    name,
    number,
  });

  contact.save()
    .then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      return response.status(200).json(result);
    })
    .catch((error) => next(error));
});
app.put('/api/persons/:id', (request, response, next) => {
  const { name } = request.body;
  const { number } = request.body;

  Contact.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then((updatedContact) => {
      console.log(`updated ${name} with number ${number}`);
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  return next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
