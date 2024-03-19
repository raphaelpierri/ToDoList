import app from './app';
import database from './db'
import taskModel from './models/task.model';

const port = parseInt(`${process.env.PORT}`);

app.listen(3333, () => {
  console.log(`Running on port ${port}`);
});

database.sync().then(() => {
    console.log(console.log(`Running database ${process.env.DB_NAME}`));
 });


