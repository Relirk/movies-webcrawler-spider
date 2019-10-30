import cheerio from "cheerio";
import fs from "fs";

class IMDbController {
  catch(body) {
    const $ = cheerio.load(body);
    const imdbData = [];

    $(".lister-list tr").each(function() {
      imdbData.push(`{
          title: "${$(this)
            .find(".titleColumn a")
            .text()
            .trim()}",
          year:"${$(this)
            .find(".titleColumn .secondaryInfo")
            .text()}",
          rating: "${$(this)
            .find(".imdbRating strong")
            .text()
            .trim()}",
          rating_description: "${$(this)
            .find(".imdbRating strong")
            .attr("title")}",
          poster_img: "${$(this)
            .find(".posterColumn a img")
            .attr("src")}",
          poster_link: "${"https://www.imdb.com" +
            $(this)
              .find(".posterColumn a")
              .attr("href")}"
        }`);
    });

    fs.unlinkSync("files/imdb.txt");
    return fs.appendFileSync("files/imdb.txt", imdbData.toString());
  }
}

export default new IMDbController();
