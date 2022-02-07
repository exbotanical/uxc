# TODOs

## @uxc/client

- [ ] convert sidebar to collapsible side drawer
- [x] tabs animation
- [ ] page transition
- [ ] chat messages
- [x] nav
- [ ] unit tests
- [ ] integration tests
- [ ] move svgs to icons dir
- [ ] accessibility tests
- [ ] component <- tailwind class seq's
- [ ] restructure components dir
- [ ] slash commands
- [ ] resizable sidebar
- [ ] progressive image load a la gatsby

### Testing

- [ ] login
- [ ] registration
- [ ] chat simulation
- [ ] error state (no/slow connection)

## @uxc/api

- [ ] logger
- [ ] dev env for raw / non-containerized modes
- [x] tls
- [ ] use gzip for graphql JSON compression
- [ ] impl feed for popup messages
  - [ ] enable user to only allow popups from specific users
  (use id to filter feed subscription)
- [ ] impl CTA / landing page (prior to login) w/ https://github.com/stephane-monnot/react-vertical-timeline
- [ ] replace express-session with raw redis store and cookie-parser
- [ ] slash commands
- [ ] discrete tsconfig for jest test files (avoid namespace pollution)
- [ ] user typing state

## Miscellaneous

- [ ] build two servers - one proxies the connection to the other
  - [ ] REST API behind a gql server
