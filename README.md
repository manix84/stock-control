# stock-control [![Deploy](https://github.com/manix84/stock-control/actions/workflows/pages.yml/badge.svg)](https://github.com/manix84/stock-control/actions/workflows/pages.yml)

## Setup

- Clone repo: `git clone https://github.com/manix84/stock-control.git`
- Install dependencies: `npm i`
- Dev Mode:
  - Run `npm run dev`
  - Open http://localhost:3000
- Prod Mode:
  - run `npm run build`
  - run `npm run start`
  - Open http://localhost:3000

## Notes

GHPages build works, and deploys. However, GHPages doesn't support server side (/api) routing. In essence, you can view the page, but the Database API returns a 404.

If you're really curious, you can see it at https://manix84.github.io/stock-control
