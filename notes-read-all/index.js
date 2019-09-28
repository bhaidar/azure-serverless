const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({ secret: 'fnADZPpx4EACAGpcBmat4T-ZHYRIdX607Upcve3x' });

module.exports = async function (context, req) {
    context.log('Function `notes-read-all` is invoked');

    try {
        const dbs = await client.query(
            q.Map(
                // iterate each note document
                q.Paginate(
                    // make paginatable
                    q.Match(
                        // query index
                        q.Index("all_notes")
                    )
                ),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        );

        context.res = {
            status: 200,
            body: JSON.stringify(dbs.data)
        };
    } catch (error) {
        context.res = {
            status: 400,
            body: JSON.stringify(error.message)
        }
    }
};