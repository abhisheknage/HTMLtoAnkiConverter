# HTML to Anki Converter

The aim of this program will be to convert from HTML to Anki cards using JavaScript. The program will be able to parse through two types of Note types: Basic (Front/Back) and Cloze deletions. The aim of the program is to display a webpage and/or pdf for viewing, but through the use of classes to parse through and generate Anki cards programmatically.

In essence it becomes a Cornell system of note taking, whereby you're taking notes, reviewing it and making questions for yourself. There is also opportunity for summarizing that occurs. In essence, this becomes a digitized method of Cornell Note taking system, and leverages spaced repetition through the use of Anki cards.

The basic workflow of making notes and eventually making cards is as follows:

1. Make Notes
2. Summarize the notes
3. Review and add cues

When it comes to adding cues, there is a specific syntax that needs to be followed, and for the purposes of this program, the following Anki note types will be supported:

1. Basic
2. Cloze

All notes will be put into the "Notes" deck from where a user can then decide to put them into other decks and tag cards accordingly.

## Parse Basic File

To make a note, you need to figure out what the Front and Back of the card is going to look like.
Structure of html should follow the following class names:

```html
<div class="anki-basic">
  <div class="front"></div>
  <div class="back"></div>
</div>
```

Note: it does not matter if the tag is a div or any other tag, as long as the class matches.

## Parse Cloze Deletions

The structure of the file should be as follows:

```html
<div class="anki-cloze">
  <div class="cloze-text">
    This is an example of how to hide <span class="c1">this</span> and
    <span class="c2">that</span> using span and class names of c1 and c2.
  </div>
  // Will go into the text area

  <div class="extra"></div>
  // Will go into the extra area
</div>
```

Note: it does not matter if the tag is a div or any other tag, as long as the class matches.
