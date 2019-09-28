const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({ secret: 'fnADZPpx4EACAGpcBmat4T-ZHYRIdX607Upcve3x' });

module.exports = async function (context, req) {
    const data = {
        title: req.body.title,
        body: req.body.body
    };

    context.log('Function `notes-create` is invoked', data);

    const notesDocument = { data };

    /* create and execute a faundb query to create a new note */
    return client.query(q.Create(q.Collection("Notes"), notesDocument))
        .then(response => {
            context.log('Note document created', response);
            context.res = {
                status: 200,
                body: JSON.stringify(response)
            };
        })
        .catch(error => {
            context.log('Note document cannot be created', error);
            context.res = {
                status: 400,
                body: JSON.stringify(response)
            }
        });
};