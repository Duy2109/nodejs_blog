const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;
const route = require("./routes");
const db = require("./config/db");
const SortMiddleware = require("./app/middlewares/SortMiddleware");

db.connect();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));

//custom middleware
app.use(SortMiddleware);

route(app);
app.use(express.static(path.join(__dirname, "public")));
//HTTP logger
// app.use(morgan("combined"));

//template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: "oi oi-elevator",
          asc:"oi oi-sort-ascending",
          desc:"oi oi-sort-descending",
        }
        

        const types={
            default:'desc',
            asc:'desc',
            desc:'asc',
        }

        const icon = icons[sortType]
        const type = types[sortType]



        return `<a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}"></span>
    </a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
