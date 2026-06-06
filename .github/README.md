# .github Folder — Structure & Purpose Guide

This folder configures **GitHub Copilot**, **GitHub Actions CI**, and **repository automation** for the ActualMetrics QA Agentic Solution. Below is a description of every component and what belongs here.

---

## 📁 Folder Map

```
.github/
├── copilot-instructions.md          # Repository-wide Copilot instructions
├── instructions/                    # Path-specific Copilot instructions
│   ├── playwright.instructions.md   # Rules for test files (tests/**)
│   └── pom.instructions.md          # Rules for Page Object Models (pages/**)
├── workflows/                       # GitHub Actions CI/CD pipelines
│   └── playwright.yml               # Main test runner workflow
└── README.md                        # This file
```

---

## 🤖 Agents

**What they are:** AI agents are autonomous Copilot instances that can read the repo, create branches, write code, run tests, and open pull requests.

**Where they're configured:**
- `AGENTS.md` (repo root) — primary instruction file for all AI agents working in this repo.
- `.github/copilot-instructions.md` — agent-accessible repository context.

**What to include in `AGENTS.md`:**
- The agent's mission and scope (what it should and should not do)
- Step-by-step workflows for common tasks (write a test, add a page object, fix a failing test)
- Decision trees for ambiguous situations
- List of forbidden actions (e.g., don't modify `playwright.config.ts` without approval)
- Verification steps the agent must perform before committing

**Reference:** [GitHub Docs — Copilot Agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)

---

## 🛠️ Skills

**What they are:** Skills extend Copilot's capabilities with custom, reusable tools — e.g., a skill to scaffold a new Page Object, generate test data, or run a lint check.

**Where they're configured:**
- `Skills.md` (repo root) — describes available skills and their usage.
- Skills are invoked via `/skills` in the Copilot CLI or declared in MCP server configs.

**What to include in `Skills.md`:**
- Name and purpose of each skill
- Input parameters and expected output
- Example invocations
- Which tasks the skill is designed to accelerate

**Reference:** [GitHub Copilot CLI `/skills` command](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)

---

## 🪝 Hooks

**What they are:** Hooks are automated triggers that run at specific points in a workflow — commit hooks, PR hooks, or CI pipeline hooks.

**Where they live:**
- **GitHub Actions hooks** → `.github/workflows/*.yml`
- **Git client hooks** → `.husky/` (if Husky is configured) — e.g., pre-commit type-check + lint
- **Copilot PR hooks** → Configured via the Copilot code review settings on GitHub

**What to include for this repo:**
| Hook | Trigger | Purpose |
|------|---------|---------|
| `playwright.yml` | Push / PR to `main` or `develop` | Run full Playwright test suite in CI |
| Pre-commit (Husky) | `git commit` | Run `tsc --noEmit` + ESLint |
| Copilot Code Review | PR opened | Auto-review using `.github/copilot-instructions.md` |

**Adding a new workflow:**
1. Create a `.yml` file in `.github/workflows/`.
2. Follow the existing `playwright.yml` as a template.
3. Document the new workflow in this README.

---

## 📏 Rules

**What they are:** Rules are coding standards and constraints that Copilot enforces when generating or reviewing code in this repo.

**Where they live:**
- `.github/copilot-instructions.md` — global rules applied to every Copilot interaction.
- `.github/instructions/*.instructions.md` — path-scoped rules applied only when working on matching files.

**Path-specific instruction files:**

| File | `applyTo` glob | Purpose |
|------|---------------|---------|
| `playwright.instructions.md` | `tests/**/*.spec.ts` | Enforce test structure, naming, and assertion conventions |
| `pom.instructions.md` | `pages/**/*.ts` | Enforce POM class structure, locator strategy, and OOP rules |

**Adding a new rule file:**
1. Create `NAME.instructions.md` in `.github/instructions/`.
2. Add a frontmatter `applyTo:` glob at the top of the file.
3. Document the rule set in this README table.

---

## 📚 Docs

**What they are:** Documentation that helps both human contributors and AI agents understand the repo.

**Recommended docs for this repo:**

| File | Location | Purpose |
|------|----------|---------|
| `README.md` | Repo root | Repo overview, setup guide, contributor rules |
| `AGENTS.md` | Repo root | AI agent task instructions and workflows |
| `Skills.md` | Repo root | Available Copilot skills and usage examples |
| `copilot-instructions.md` | `.github/` | Copilot coding standards and build commands |
| `playwright.instructions.md` | `.github/instructions/` | Test-file-specific Copilot rules |
| `pom.instructions.md` | `.github/instructions/` | Page-object-specific Copilot rules |
| `CONTRIBUTING.md` *(optional)* | Repo root | Detailed contribution guidelines |
| `CHANGELOG.md` *(optional)* | Repo root | Version history |

---

## ✅ Checklist — New Contributor Setup

Before contributing, verify these files are in place:

- [ ] `.github/copilot-instructions.md` — Copilot context is loaded
- [ ] `AGENTS.md` — Agent workflows are documented
- [ ] `Skills.md` — Available skills are listed
- [ ] `.github/instructions/playwright.instructions.md` — Test rules active
- [ ] `.github/instructions/pom.instructions.md` — POM rules active
- [ ] `.github/workflows/playwright.yml` — CI pipeline is running
- [ ] `.env.example` exists and `.env` is in `.gitignore`
