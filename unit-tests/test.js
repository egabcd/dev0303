describe("search_word_in_example", function() {
    it("Ищет слово в предложении", function() {
      assert.isTrue((search_word_in_example("application", "The research has many practical applications.")[0] == "applications") &&
      (search_word_in_example("application", "The research has many practical applications.")[1] == "The research has many practical ______."));
    });

    it("Ищет слово в предложении", function() {
      assert.isTrue((search_word_in_example("abruptly", "At the temperature of 4.2 K, he observed that the resistance abruptly disappeared.")[0] == "abruptly") && 
      (search_word_in_example("abruptly", "At the temperature of 4.2 K, he observed that the resistance abruptly disappeared.")[1] == "At the temperature of 4.2 K, he observed that the resistance ______ disappeared."));
    });

    it("Ищет слово в предложении", function() {
      assert.isTrue((search_word_in_example("apart from", "Apart from mercury, the original super conductor, you can find the effect in about 25 other elements though it's also been discovered in thousands of compounds and alloys.")[0] == "apart from") &&
      (search_word_in_example("apart from", "Apart from mercury, the original super conductor, you can find the effect in about 25 other elements though it's also been discovered in thousands of compounds and alloys.")[1] == "______ mercury, the original super conductor, you can find the effect in about 25 other elements though it's also been discovered in thousands of compounds and alloys."));
    });

    it("Ищет слово в предложении", function() {
      assert.isTrue((search_word_in_example("assume", "For many years, scientists assumed superconductivity could happen only at very low temperatures.")[0] == "assumed") &&
      (search_word_in_example("assume", "For many years, scientists assumed superconductivity could happen only at very low temperatures.")[1] == "For many years, scientists ______ superconductivity could happen only at very low temperatures."));
    });

    it("Ищет слово в предложении", function() {
      assert.isTrue((search_word_in_example("Ada programming language", "In 1980, the US Department of Defense settled on (in honour of Ada Lovelace) the name Ada for a new standardized programming language.")[0] == "Ada programming language") &&
      (search_word_in_example("Ada programming language", "In 1980, the US Department of Defense settled on (in honour of Ada Lovelace) the name Ada for a new standardized programming language.")[1] == "In 1980, the US Department of Defense settled on (in honour of Ada Lovelace) the name ______ for a new standardized ______."));
    });
  });

  describe("parse", function() {
    it("Разделяет перевод на слова", function() {
      assert.isTrue(parse("сокращать, ограничивать").indexOf("сокращать") != -1);
    });
    it("Разделяет перевод на слова", function() {
      assert.isTrue(parse("клавиша/ключ доступа").indexOf("ключ доступа") != -1);
    });
    it("Разделяет перевод на слова", function() {
      assert.isTrue(parse("(по)следствие, результат").indexOf("последствие") != -1);
    });
    it("Разделяет перевод на слова", function() {
      assert.isTrue(parse("(по)следствие, результат").indexOf("следствие") != -1);
    });
    it("Разделяет перевод на слова", function() {
      assert.isTrue(parse("изменять(ся), менять(ся)").indexOf("менять") != -1);
    });
    it("Разделяет перевод на слова", function() {
      assert.isTrue(parse("изменять(ся), менять(ся)").indexOf("меняться") != -1);
    });
  });