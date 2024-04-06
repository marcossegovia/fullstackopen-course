const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://user123:${password}@cluster0.oxkbvq7.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
  Contact.find({}).then((contacts) => {
    console.log('phonebook: ');
    contacts.map((c) => console.log(`${c.name} ${c.number}`));
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const contact = new Contact({
    name,
    number,
  });

  contact.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
