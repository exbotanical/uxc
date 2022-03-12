# TODOs

## @uxc/client

- [-] convert sidebar to collapsible side drawer
- [x] tabs animation
- [ ] page transition
- [x] chat messages
- [x] nav
- [ ] unit tests
- [x] integration tests
- [x] move svgs to icons dir
- [x] accessibility tests
- [-] component <- tailwind class seq's
- [x] restructure components dir
- [ ] slash commands
- [-] resizable sidebar
- [ ] progressive image load a la gatsby
- [ ] i18n
- [ ] optimize perf
- [ ] skeleton loaders
  - [ ] thread messages
  - [ ] threads
  - [ ] friends
- [ ] electron!!!
- [ ] logger

### Testing

- [x] signin
- [x] registration
- [ ] chat simulation
- [ ] error state (no/slow connection)

## @uxc/api

- [ ] logger
- [x] dev env for raw / non-containerized modes
- [x] tls
- [ ] use gzip for graphql JSON compression
- [x] impl feed for popup messages
  - [ ] enable user to only allow popups from specific users
  (use id to filter feed subscription)
- [ ] impl CTA / landing page (prior to signin) w/ https://github.com/stephane-monnot/react-vertical-timeline
- [ ] replace express-session with raw redis store and cookie-parser
- [ ] slash commands
- [ ] user typing state
