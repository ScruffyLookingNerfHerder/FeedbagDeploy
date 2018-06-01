
import request from "request"
import cheerio from "cheerio"




export default {

  getIngredients: function(f2f_url) {
    request(f2f_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var ingredients = [];
      $(".span5 li").each(function(i, element) {
        var ingredient = $(element).text();
        ingredients.push(ingredient)
      })
      return ingredients
    })

  },

  ClosetCooking: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      // An empty array to save the data that we'll scrape
      var results = [];
      $(".instructions li").each(function(i, element) {
        var instruction = $(element).text();
        results.push({
          instructions: instruction,
        });
      });


    });
  },

  OneZeroOneCookbooks: function(params) {
    (params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var cookbooksI = []
      var cookbooksR = [];

      $("#recipe blockquote p").each(function(i, element) {
        var ingredient = $(element).text();
        cookbooksI.push(ingredient)

      })

      $("#recipe p").not("blockquote p").each(function(i, element) {
        var step = $(element).text()
        cookbooksR.push(step)
      })

    })
  },

  BBCGoodfood: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var method = []
      $(".method__list li").each(function(i, element) {
        var step = $(element).text()
        method.push(step)

      })

    })
  },

  AllRecipes: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var recipesteps = []
      $(".recipe-directions__list--item").each(function(i, element) {
        var step = $(element).text()
        recipesteps.push(step)
      })

    })
  },

  PioneerWoman: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var steps = [];
      var step;
      var stuff = $("[id|=recipe-instructions-]").text();


      $("[id^=recipe-instructions]").each(function(i, element) {
        if ($(element).children().hasClass('panel-body') === true) {
          step = $(element).text();
        }
      })
      steps.push(step)

    })

  },

  BonAppetit: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var preperation = []
      $(".step").each(function(i, element) {
        var prep = $(element).text();
        preperation.push(prep)

      })

    })
  },

  JamieOliver: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var method = []
      $(".method-p li").each(function(i, element) {
        var methodstep = $(element).text();
        method.push(methodstep)
      })

    })
  },

  BBCFood: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var method = []
      $(".recipe-method__list li").each(function(i, element) {
        var methodstep = $(element).text()
        method.push(methodstep)
      })

    })
  },

  Epicurious: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var prep = []
      $(".preparation-step").each(function(i, element) {
        var prepstep = $(element).text()
        prep.push(prepstep)
      })

    })
  },

  TastyKitchen: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html);
      var preparation = []
      $(".prep-instructions.nested-two-thirds p").each(function(i, element) {
        var preparationstep = $(element).text()
        preparation.push(preparationstep)
      })

    })
  },

  Cookstr: function(params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html)
      var instrux = []
      $(".cells p").each(function(i, element) {
        var instruxstep = $(element).text();
        instrux.push(instruxstep)
      })

    })
  },

  SimplyRecipes: function (params) {
    request(params.source_url, function(error, response, html) {
      var $ = cheerio.load(html)
      var method = []
      $("#sr-recipe-method p").each(function(i, element) {
        var methodli = $(element).text()
        method.push(methodli)
      })
      console.log(method);
    })
  }
}
