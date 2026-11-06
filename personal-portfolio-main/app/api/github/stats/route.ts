import { NextResponse } from "next/server";

export const revalidate = 21600;

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

interface GitHubProfile {
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  fork: boolean;
  stargazers_count: number;
  languages_url: string;
}

export async function GET() {
  try {
    const [profileResponse, firstReposResponse] = await Promise.all([
      fetch("https://api.github.com/users/GabeSimanjuntak", {
        headers: GITHUB_HEADERS,
        next: { revalidate },
      }),
      fetch("https://api.github.com/users/GabeSimanjuntak/repos?per_page=100&sort=updated", {
        headers: GITHUB_HEADERS,
        next: { revalidate },
      }),
    ]);

    if (!profileResponse.ok || !firstReposResponse.ok) {
      return NextResponse.json({ error: "GitHub profile is temporarily unavailable." }, { status: 502 });
    }

    const [profile, firstRepos] = await Promise.all([
      profileResponse.json() as Promise<GitHubProfile>,
      firstReposResponse.json() as Promise<GitHubRepo[]>,
    ]);

    const allRepos = [...firstRepos];
    let nextPage = firstReposResponse.headers.get("link")?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
    while (nextPage) {
      const response = await fetch(nextPage, { headers: GITHUB_HEADERS, next: { revalidate } });
      if (!response.ok) throw new Error("Could not load all public repositories.");
      allRepos.push(...(await response.json() as GitHubRepo[]));
      nextPage = response.headers.get("link")?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
    }
    const repos = allRepos.filter((repo) => !repo.fork);

    const languageResults = await Promise.allSettled(
      repos.map((repo) => fetch(repo.languages_url, {
        headers: GITHUB_HEADERS,
        next: { revalidate },
      }).then((response) => {
        if (!response.ok) throw new Error("Could not load repository language data.");
        return response.json() as Promise<Record<string, number>>;
      }))
    );

    const languages: Record<string, number> = {};
    let successfulLanguageRepos = 0;
    for (const result of languageResults) {
      if (result.status !== "fulfilled") continue;
      successfulLanguageRepos += 1;
      for (const [language, bytes] of Object.entries(result.value)) {
        languages[language] = (languages[language] ?? 0) + bytes;
      }
    }

    return NextResponse.json({
      profile: {
        public_repos: profile.public_repos,
        followers: profile.followers,
      },
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      languages,
      languagesComplete: successfulLanguageRepos === repos.length,
    });
  } catch {
    return NextResponse.json({ error: "GitHub profile is temporarily unavailable." }, { status: 502 });
  }
}
