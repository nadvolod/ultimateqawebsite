# Practice Pages are copied verbatim, never redesigned

Pages such as `/simple-html-elements-for-automation/` and `/filling-out-forms/` are targets that students' and other people's test-automation scripts run against, so their URLs, element IDs, classes and page structure are a public contract. They are served as static HTML copied from the Legacy Site, outside the site's design system, and an automated check fails the build if their structure changes, even though the result looks inconsistent with the rest of the site.
