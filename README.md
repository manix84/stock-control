# stock-control [![Deploy](https://github.com/manix84/stock-control/actions/workflows/pages.yml/badge.svg)](https://github.com/manix84/stock-control/actions/workflows/pages.yml)

This is a technical test, written in a little over 10 hours (broken up by housework), so some of it might be a little rushed compared to my normal work. If you've any questions, feel free to contact me.

## Basic Setup

- Clone repo: `git clone https://github.com/manix84/stock-control.git`
- Install dependencies: `npm i`

### Development

- Run `npm run dev`
- Open http://localhost:3000

### Production

- Run `npm run build`
- Run `npm run start`
- Open http://localhost:3000

## Testing

### Watch

- Run `jest --watch`

### Single Run

- Run `jest --ci`

## Notes

GHPages build works, and deploys. However, GHPages doesn't support server side (/api) routing. In essence, you can view the page, but the Database API returns a 404.

If you're really curious, you can see it at https://manix84.github.io/stock-control

## Design Decisions

- Next.JS (framework)
  > I'm fairly familiar with this product, having worked with it for the last year in my last role. It's fairly versatile, incorporating both a front end, and a backend API into the same package.
- React.JS (UI library builder)
  > React.JS is just a great tool for building user interfaces in HTML and JavaScript.
- TypeScript (base language)
  > My preferred programming language of the last 8 years. I don't know if I'd want to build a project outside of this language any more. I even write Node in TypeScript. It has a steep learning curve, but if you take the time to add the input and output types, it'll save you so much hassle.
- Styled-Components (styles)
  > I started off using SASS in this project, but ended up switching to Styled-Components mid-way through, as, honestly I wanted to give it another go. I've been comparing the two, and so far, it's annoyingly even.
- LowDB (database)
  > I wanted some kind of backend database, that I could install quickly, and locally, without needing to employ some kind of external service. My goal was a completely localised and simple installation process.
- Jest (testing)
  > Probably the test framework I'm most familiar with. So it was relatively easy to pickup again for this task. I split up components, library, and util files in order to make things more testable.
- Misc. (anything else...)
  - Background
    > This was something I've been playing with on my own site recently. I thought it would be a nice little thing to add. I did have to convert it from SASS to Style-Components, but it looks nice now, so... Yay!
  - Table (old school)
    > Tables are out of date when it comes to page structure and layouts, but they have their place. Namely; tabular data. If you've got a database table to display, the best tool is a table. I think it looks nice and pretty.
  - Material Design Icons (or MDI)
    > Great little icons, originally developed by Google, but open source, and super handy.
  - Adding from a Row vs Editing in a Modal
    > I wanted to show a couple of ways of adding data from a table. Semantically, it wasn't that easy, as a `form` isn't allowed inside any of the table elements except `td`, so my solution was a visual trick, creating a flush table & form to act like they're a single table.
