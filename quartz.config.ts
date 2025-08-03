import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Worldweaver's Journal",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "theworldweaversjournal.netlify.app",
    ignorePatterns: ["private", "_settings", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Playfair Display",
        body: "Spectral",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f4f0f9",           // soft lavender-gray background
          lightgray: "#e0d5eb",       // muted violet-gray
          gray: "#9b7fb4",            // medium purple-gray
          darkgray: "#5e4a72",        // deep plum
          dark: "#2d1e40",            // twilight purple (header/footer)
          secondary: "#a67c52",       // harp wood tone
          tertiary: "#d6b95e",        // feather gold
          highlight: "rgba(198, 160, 255, 0.15)", // soft starry accent
          textHighlight: "#fff23688", // same bright yellow highlight
        },
        darkMode: {
          light: "#1c1327",           // deep violet background
          lightgray: "#3a2a4e",       // shadowed plum
          gray: "#7c6590",            // muted lilac-gray
          darkgray: "#cdbfdb",        // desaturated lavender
          dark: "#f2eaff",            // pale parchment white
          secondary: "#d4a86a",       // warm golden wood
          tertiary: "#ebd47f",        // feather highlight gold
          highlight: "rgba(255, 255, 255, 0.08)", // faint light sparkles
          textHighlight: "#fff23688", // consistent for readability
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
