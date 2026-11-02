# UltimateQA Content Migration

The vocabulary for moving ultimateqa.com's content off the old WordPress site onto the new site, so that nothing is lost and old addresses keep working.

## Sites and sources

**Legacy Site**:
The WordPress install of ultimateqa.com hosted on WPMUDev that is being replaced.
_Avoid_: old site, WP site

**Archive**:
A complete, owner-held copy of everything on the Legacy Site (export, database, media), kept whether or not any of it is published.
_Avoid_: backup, dump

**Cutover**:
The single moment ultimateqa.com stops being served by the Legacy Site and starts being served by the new site.
_Avoid_: go-live, launch, migration day

**Fallback Period**:
The 30 days after Cutover during which the Legacy Site stays reachable privately, then is shut down.

## Content triage

**Post**:
A dated article from the Legacy Site's blog.
_Avoid_: article, blog entry

**Page**:
An undated, standalone Legacy Site page (about, sales, contact); triaged the same way as Posts.

**Practice Page**:
A Page that exists as a target for people's test-automation scripts; its URL and markup must never change.
_Avoid_: demo page, sandbox

**Goal**:
The business outcome a business-owner Post helps with (get more customers, save time, sell more, choose the right tools); how the Blog is organised.
_Avoid_: category, topic

**Blog**:
The section of the site written for business owners who want to make more money with AI.

**Engineering Library**:
The section that holds the Legacy Site's technical Posts (test automation, Selenium, engineering), written for developers and QA teams, organised by Topic.
_Avoid_: archive, old blog

**Topic**:
One of a small set of technical subject groupings (e.g. Selenium, test automation) that organises the Engineering Library, replacing the Legacy Site's categories and tags.
_Avoid_: category, tag

**Bridge Post**:
A Legacy Site Post that lives in the Engineering Library but is also useful to business owners, so it is listed under a Goal in the Blog as well.

**Triage**:
Deciding, from search and traffic data, what happens to each Legacy URL.

**Keep**:
A Triage verdict: the Post is published on the new site at its original Legacy URL.

**Merge**:
A Triage verdict: the Post's useful content is folded into a stronger Post, and its Legacy URL redirects there.

**Retire**:
A Triage verdict: the Post is not published; it lives only in the Archive and its Legacy URL redirects to the closest relevant page.
_Avoid_: delete, drop

**Launch Set**:
The highest-traffic Keep Posts that are published at Cutover; the remaining Keep Posts follow in batches.

## Audience and conversion

**Newsletter**:
The email publication subscribers receive; it points readers back to Posts rather than replacing them.
_Avoid_: mailing list, ConvertKit

**Offer**:
Something a reader can pay for, such as consulting or a speaking engagement.
_Avoid_: service, product

**CTA**:
A placed invitation inside a Post that sends the reader toward the Newsletter or an Offer.
_Avoid_: banner, ad, promo

## Links

**Legacy URL**:
Any address on the Legacy Site that people or search engines may already link to.
_Avoid_: old link, permalink

**Redirect Map**:
The full mapping of every Legacy URL that is not kept as-is to its permanent destination on the new site.

**Outbound Link**:
A hyperlink inside a Post's body that points somewhere else; checked and fixed or removed during migration.
_Avoid_: link (unqualified)
