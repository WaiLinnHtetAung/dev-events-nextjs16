# PostHog post-wizard report

The wizard has completed a deep integration of your DevEvent Next.js application with PostHog analytics. The integration uses the modern `instrumentation-client.ts` approach recommended for Next.js 15.3+, which provides automatic client-side initialization without the need for a React provider component. A reverse proxy has been configured through Next.js rewrites to improve tracking reliability by routing PostHog requests through your domain.

## Integration Summary

The following files were created or modified:

| File | Changes |
|------|---------|
| `instrumentation-client.ts` | Created - PostHog client-side initialization with exception capture and debug mode |
| `next.config.ts` | Modified - Added reverse proxy rewrites for `/ingest` routes |
| `.env.local` | Created - Environment variables for PostHog API key and host |
| `components/ExploreBtn.tsx` | Modified - Added `explore_events_clicked` event capture |
| `components/EventCard.tsx` | Modified - Added `event_card_clicked` event capture with properties |
| `components/Navbar.tsx` | Modified - Added `navbar_logo_clicked` and `navbar_link_clicked` event captures |

## Events Instrumented

| Event Name | Description | File |
|------------|-------------|------|
| `explore_events_clicked` | User clicked the 'Explore Events' button on the homepage to navigate to the events section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details. Captures event title, slug, location, and date. | `components/EventCard.tsx` |
| `navbar_logo_clicked` | User clicked the DevEvent logo in the navbar to navigate to the homepage | `components/Navbar.tsx` |
| `navbar_link_clicked` | User clicked a navigation link (Home, Events, or Create Event) in the navbar. Captures the destination. | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/299719/dashboard/1143145)

### Insights
- [Event Card Clicks Over Time](https://us.posthog.com/project/299719/insights/MRgzqV5B) - Track how many times users click on event cards
- [Explore Events Button Clicks](https://us.posthog.com/project/299719/insights/MlgTsSkC) - Track engagement with the Explore Events CTA
- [Navigation Link Clicks by Destination](https://us.posthog.com/project/299719/insights/4EqOR9er) - Track which nav links are most popular
- [Event Discovery Funnel](https://us.posthog.com/project/299719/insights/RXR3P6iG) - Track conversion from exploring to clicking events
- [Popular Events by Location](https://us.posthog.com/project/299719/insights/9wptuwrx) - Track which event locations generate the most interest

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
