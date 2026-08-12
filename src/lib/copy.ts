// ---------------------------------------------------------------------------
// the shape of every user-facing string on the site.
//
// the words themselves live in the `copy` block of site.config.ts, so the whole
// site can be reworded from that one file. this module is the contract: the
// annotation below is what turns a mistyped or missing key into a compile
// error instead of a blank space on the page.
// ---------------------------------------------------------------------------

import { config } from '../../site.config'

export interface SiteCopy {
  // <head> — what search engines, social cards and no-script visitors see
  meta: {
    title: string
    description: string
    socialDescription: string
    noscript: string
  }
  theme: {
    groupLabel: string
    lightLabel: string
    lightTitle: string
    autoLabel: string
    autoTitle: string
    darkLabel: string
    darkTitle: string
  }
  landing: {
    navLabel: string
    repoCountLabel: string
    emailLink: string
    githubLink: string
    linkedinLink: string
    privacyLink: string
  }
  // shared by both showcase pages
  showcase: {
    back: string
  }
  openSource: {
    barLabel: string
    title: string
    subtitleSuffix: string
    gridLabel: string
    starsLabel: string
  }
  apps: {
    barLabel: string
    title: string
    subtitle: string
    gridLabel: string
    ghostLabel: string
    ghostTitle: string
    ghostBody: string
  }
  privacy: {
    title: string
    updated: string
    intro: string
    advertisingHeading: string
    advertisingBody: string
    cookiesBullet: string
    // the opt-out bullet wraps two links, so it is stored as the run of text
    // either side of each one
    optOutBefore: string
    optOutGoogleLabel: string
    optOutBetween: string
    optOutAboutAdsLabel: string
    optOutAfter: string
    consentHeading: string
    consentBody: string
    rightsHeading: string
    rightsBody: string
    contactHeading: string
    contactBefore: string
    contactAfter: string
    back: string
  }
}

export const copy: SiteCopy = config.copy
