# OneCrew Pro FAQ

Product behavior: Pro 0.1.21. External documentation checked on October 29, 2026.

## Account connections

### Which connection does each feature use?

| Feature | Connection | Setup location |
| --- | --- | --- |
| OneCrew workspace and MCP | OneCrew sign-in | The `login_url` returned by `account` |
| X, Instagram, Facebook, TikTok | A signed-in browser session, imported as Cookie-Editor JSON or read from a browser profile | Accounts → platform → Connect / Add account |
| YouTube public creator search | YouTube Data API v3 API Key | Accounts → YouTube → Connect / Add key |
| Sending email and synchronizing replies | A supported mailbox connection | Email → Manage mailboxes |

These connections are separate. Signing in to OneCrew does not connect a social account or mailbox. A YouTube search Key does not connect Gmail or grant access to private YouTube data.

`platform_connection_list` returns the Accounts panel's `connect_url`, masked account details, last check time and last known status. It does not perform a new provider check. The local service address can use a custom port; use the returned URL.

### How do I connect a Cookie account?

Open Accounts, choose the platform, select Connect or Add account, then Manual import. The first account for a platform shows an account usage reminder; Continue connecting becomes available after three seconds.

1. **Install.** Open the desktop Chrome or Edge profile already signed in to the intended account, or the profile you plan to use. Install Cookie-Editor there: [Chrome Web Store](https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm) or [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/cookieeditor/neaplmfkghagebokkhpjpoebhdledlfi). OneCrew's Copy store URL button lets you paste the address into that browser. The extension runs in Chrome or Edge, outside the AI client's embedded browser.
2. **Open.** Visit the platform's main website in the same profile and check the active account. Sign in only if needed. At the top right of the browser, open Extensions (the puzzle icon) → Cookie-Editor. If it asks for access, select This site and approve. If the cookie list is already visible, continue directly to Export.
3. **Export.** The extension's bottom toolbar has Add, Delete, Import and Export. Select the rightmost Export button → JSON. The exported JSON is copied to the clipboard.
4. **Paste.** Return to OneCrew, paste the complete export into Cookie JSON, select Verify account, review the returned account identity, then Confirm connection. Have cookies? Paste now opens this final step directly.

| Platform | Page to open before exporting |
| --- | --- |
| X | [x.com](https://x.com/) |
| Instagram | [instagram.com](https://www.instagram.com/) |
| Facebook | [facebook.com](https://www.facebook.com/) |
| TikTok | [tiktok.com](https://www.tiktok.com/) |

Cookie-Editor's [official website](https://cookie-editor.com/) documents its toolbar access, clipboard export and browser downloads. Chrome's official guides cover [switching profiles](https://support.google.com/chrome/answer/2364824?hl=en) and [installing extensions](https://support.google.com/chrome/answer/2664769?hl=en). Cookie-Editor is a third-party extension, not a social platform's OAuth authorization flow.

### Where should I paste cookies and API Keys?

Cookie JSON and API Keys go into their fields in the local OneCrew Web panel. MCP shows masked connection information and provides the panel link; it does not accept these credentials for account setup. Cookies, keys, passwords and proxy credentials should stay out of chat and screenshots.

### Can OneCrew read my browser profile directly?

Read from browser supports detected Chrome and Edge profiles. Select the profile containing the intended platform session, read and verify its identity, then confirm the connection. macOS may display a system Keychain permission prompt.

Cookie file locks, access permissions and unsupported browser encryption can prevent automatic reading. Manual import uses the browser extension's export and remains the available connection method in those cases. Closing a browser does not resolve unsupported encryption. Browser protection settings do not need to be disabled for manual import.

### Why did importing cookies fail?

| Reported error | Meaning and next step |
| --- | --- |
| Invalid JSON or invalid cookie format | OneCrew requires the complete JSON array exported by Cookie-Editor. Export again as JSON; Header String and Netscape exports do not match this input. |
| No valid login cookies | Check the selected profile and platform page. Confirm that the intended account is signed in, then export again. |
| Conflicting sessions or a different identity | Check which account is active in that profile. Re-export that account's session. Reconnecting a different identity does not replace the original account. |
| Login expired | Restore the platform login in the browser and import the current session. |
| Verification challenge | Complete the platform's verification in the browser, then import again. |
| Unsupported partitioned cookies | Open the platform's main page directly and export its login session again. |

Importing cookies does not extend the platform session's lifetime. The platform can expire or revoke it later.

### Why does account verification succeed while search fails?

Account verification checks identity or credential access. Search uses a different provider operation. A successful check does not prove that search is available for every query or that search quota remains.

For TikTok, `social.browser_session_incomplete` means the user should open TikTok search in the selected browser profile before importing again. A generic 403 alone does not identify a header, proxy or Cookie problem. The task's error code, affected account and provider response determine the next step.

### Does a timeout mean I need new cookies or a proxy?

A verification timeout means the named platform did not finish verification within the deadline. It does not establish that the credentials are invalid. The useful checks are the affected platform, the current browser login and network access from the computer running Pro.

Cookie accounts have a Configure proxy action in their account menu. Its check verifies the proxy's network access and shows its exit location; it does not replace account identity verification. When a tool returns `next_action: "check_proxy_in_web"`, the returned `connect_url` identifies the panel for that account. A canceled operation and a timed-out operation have separate error messages.

## YouTube API Key

### How do I get a YouTube API Key?

Google's [YouTube setup guide](https://developers.google.com/youtube/data/getting-started) and [credential guide](https://developers.google.com/youtube/registering_an_application) describe the required project, API and credentials.

1. Sign in to [Google Cloud Console](https://console.cloud.google.com/). Select an existing project you can manage, or create one from the project selector.
2. In that project, open APIs & Services → Library, find **YouTube Data API v3**, and select Enable. The API and the Key must belong to the same project.
3. Open [APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials). Select Create credentials → API key. Create a standard Key; leave service-account authentication unselected if that option is shown.
4. In API restrictions, select Restrict key → YouTube Data API v3 and save. Depending on the Console screen, restrictions are entered during creation or by editing the new Key. Google's [API Key guide](https://docs.cloud.google.com/docs/authentication/api-keys) describes both creation and restrictions.
5. Copy the **key string** shown by Google. In OneCrew, open Accounts → YouTube → Connect / Add key, paste it into API Key, select Continue, review the masked Key and select Connect.

Pro's YouTube creator search reads public data. It uses an API Key rather than YouTube cookies, an OAuth client secret, a service-account JSON file or a YouTube account login. Google sign-in is needed to manage the Cloud project and Key.

### Which application restriction fits Pro?

Pro calls YouTube from its local service. Website/HTTP-referrer restrictions do not match those requests. For a stable public outbound IP, an IP-address restriction can allow that address. The address Google sees can be a proxy's exit IP; `127.0.0.1` is not that public address. An IP restriction must be updated when the outbound IP changes. The API restriction should include YouTube Data API v3. See Google's [application restrictions](https://docs.cloud.google.com/docs/authentication/api-keys#add_application_restrictions).

### Why is my YouTube Key rejected or paused?

| OneCrew error | Meaning and next step |
| --- | --- |
| `youtube.invalid_key` | The key string is invalid. Check the Key in its Google Cloud project and replace it in OneCrew if needed. |
| `youtube.api_disabled` | Enable YouTube Data API v3 in the project that owns the Key. |
| `youtube.key_restricted` | Google denied access. Check API restrictions and application restrictions for Pro's actual request origin. |
| `youtube.quota_exceeded` | The project has exhausted an applicable quota. Check YouTube Data API v3 → Quotas & System Limits in Google Cloud; wait for recovery or request an extension. |
| `youtube.rate_limited` | Google throttled requests. Respect the returned `retry_at`, then check the connection after the restriction lifts. |
| `youtube.validation_timeout` / `youtube.unavailable` | Verification timed out or the API could not be reached. Check network access before retrying. |

Google documents its [API errors](https://developers.google.com/youtube/data/reference/rest/v3/errors) and [quota extension process](https://developers.google.com/youtube/data/guides/quota_and_compliance_audits). Actual quota allocations appear in the project's Console. Additional Keys in the same project share its quotas; they do not create additional project allowance.

OneCrew verifies a Key with a public channel lookup. That check does not test the separate search quota, so verification can pass while search is quota-limited.

## Multiple accounts and recovery

### Does Primary mean every search uses that account?

Pro supports up to 20 Cookie accounts per platform and 20 YouTube Keys. Primary has a higher selection weight. Other connected, available accounts or Keys can still be selected. Cookie accounts also have a participation setting; paused accounts are excluded from automatic selection.

On credential, quota or rate-limit errors, Pro marks the affected connection Needs attention and excludes it from new searches. Before a new search has obtained source data, the service can switch internally to another available connection, without repeating the same failed connection. After source data has been obtained, that search and its continuations keep their original connection so pagination state is not mixed.

### How does a connection become available again?

After resolving the reported cause, use the connection menu in Accounts:

- YouTube: **Check connection**. A successful check clears Needs attention.
- Cookie account: **Verify identity**, or import a fresh session when it has expired. A successful verification or reconnection clears Needs attention. An account with participation manually paused also needs participation enabled.

Waiting for `retry_at` alone does not clear the saved Needs attention state.

## Other Pro questions

### Why does the login window not open in my AI client?

The `account` tool returns a `login_url`. Copy that exact URL into a browser on the computer running Pro and complete OneCrew sign-in there. Local URLs point to that computer, so opening the same address on another device reaches a different service.

### What can I ask the AI to do after connecting?

The connected MCP tools support creator discovery, profile/contact lookup where the platform provides it, workspace tables, lead records, drafts, sending authorized email and synchronizing replies. Available platforms and operations come from the live tool schemas and `platform_connection_list`. A missing contact address or unavailable platform field remains unknown.

[Creator discovery](creator-discovery.md), [contact enrichment](platform-enrich.md), [dynamic tables](dynamic-tables.md) and [email workflows](email.md) describe these operations.

### Why does Email not show my entire inbox?

OneCrew lists conversations it initiated and replies matched to them. It does not import unrelated inbox mail. Received replies selects conversations with incoming replies; Unread replies and Read replies filter their read state. Conversations with no reply appear in All conversations. Refresh synchronizes connected receiving mailboxes; an incomplete sync cannot establish that no reply exists.

### Can I edit or delete drafts through the Web panel and AI?

Both interfaces support draft editing and deletion. MCP provides `mail_draft_save` and `mail_draft_delete`. A draft can be saved before sender or recipient selection; sending requires a valid sender and current lead email selections. Recipient choices come from saved leads, including additional creators selected in the composer. Saving a draft does not send it.

### Why is Start outreach disabled for a creator without an email?

That lead has no usable email candidate. The AI can check the creator's public profile or linked sources for an address, then save a verified address to the source row. See [contact enrichment](platform-enrich.md). An inferred address is not a verified contact.

### Why do application and plugin versions differ?

The application supplies the service and MCP tools; the plugin supplies client configuration and Skills. They are released independently. [Installation and versions](installation-and-versions.md) explains how to locate each installed version, update standalone Skills and use the installation prompt when an automatic application update fails.
