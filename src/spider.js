import axios from "axios";
import IMDbController from "./controllers/IMDbController";

axios
  .all([axios.get("http://www.imdb.com/chart/moviemeter")])
  .then(
    axios.spread((imdbResponse, reposResponse) => {
      IMDbController.catch(imdbResponse.data);
    })
  )
  .catch((error) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
