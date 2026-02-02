# Digitalcheck Digital Touchpoint (DiTo)

[![Pipeline](https://github.com/digitalservicebund/digitalcheck-dito/actions/workflows/pipeline.yml/badge.svg)](https://github.com/digitalservicebund/digitalcheck-dito/actions/workflows/pipeline.yml)
[![Scan](https://github.com/digitalservicebund/digitalcheck-dito/actions/workflows/scan.yml/badge.svg)](https://github.com/digitalservicebund/digitalcheck-dito/actions/workflows/scan.yml)

A digital touchpoint for _Digitalcheck: Digitaltaugliche Regelung erarbeiten_.

## Setup

### 1. Environment

The application requires a `.env` file for environment variables. You can copy the example file to get started:

```bash
cp .env.example .env
```

To test features hidden behind feature flags, you also need a `feature-flags.json` file. You can copy the test configuration for this:

```bash
cp ./tests/feature-flags.json ./feature-flags.json
```

### 2. Node.js & Dependencies

We aim to use the current active [LTS version of nodejs](https://nodejs.dev/en/about/releases/) (>=20.19.0). The `.node-version` file simplifies setup when using a version manager like [nodenv](https://github.com/nodenv/nodenv).

Install the dependencies using `npm`.

```bash
npm ci --ignore-scripts
```

### 3. Git Hooks

The project uses [Lefthook](https://github.com/evilmartians/lefthook) to manage Git hooks. These hooks help ensure code quality and security before you commit and push.

First, install the required command-line tools:

```bash
brew install lefthook talisman gitleaks
```

Then, activate the hooks:

```bash
./run.sh init
```

The following hooks are configured in `lefthook.yml`:

- **On `git commit`**:
  - `commitlint`: Enforces [conventional commit messages](https://chris.beams.io/posts/git-commit/).
  - `lint`: Fixes and checks for linting errors in staged files.
  - `format`: Formats staged files using Prettier.
  - `talisman` & `gitleaks`: Scan for secrets and sensitive information in your commit.
- **On `git push`**:
  - `licenses-audit`: Verifies that dependency licenses comply with the project's policy.

### 4. Playwright Browsers

For end-to-end (E2E) and accessibility (a11y) testing with [Playwright](https://playwright.dev/docs/intro), you need to install the required browser binaries:

```bash
npx playwright install
```

## Feature Flags

Feature flags allow you to toggle functionality in the application without changing the code. This is useful for developing new features, A/B testing, or gradually rolling out changes.

The feature flag system relies on three main parts:

- `feature-flags.json`: A file in the root directory that defines the state of each flag (either `true` or `false`).
- `app/utils/featureFlags.ts`: A file that exports a type-safe list of all available feature flags.
- `app/contexts/FeatureFlagContext.ts`: A React context that provides a `useFeatureFlag` hook to access the value of a flag within any component.

### How to Add a New Feature Flag

Here is a step-by-step guide to adding a new feature flag called `myNewFeature`.

**1. Define the flag:**

Add the new flag to the `features` object in `app/utils/featureFlags.ts`. This makes the flag available to the type system.

```ts
// app/utils/featureFlags.ts
export const features = {
  myNewFeature: "myNewFeature", // Add your new flag here
} as const;

export type FeatureFlag = keyof typeof features;
export type FeatureFlags = Record<FeatureFlag, boolean>;
```

**2. Set the flag's value:**

Add the flag to your local `feature-flags.json` file and set its initial value. Remember to also add it to `tests/feature-flags.json` for testing.

```json
// feature-flags.json
{
  "myNewFeature": false
}
```

**3. Use the flag in a component:**

Import the `useFeatureFlag` hook and use it to conditionally render a component or change behavior. The hook is type-safe and will only accept valid flag names.

```tsx
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { NewComponent } from "./NewComponent";
import { OldComponent } from "./OldComponent";

export default function MyComponent() {
  const myNewFeatureEnabled = useFeatureFlag("myNewFeature");

  return myNewFeatureEnabled ? <NewComponent /> : <OldComponent />;
}
```

Now you can toggle `myNewFeature` in `feature-flags.json` to switch between the `NewComponent` and `OldComponent` without needing to restart the development server.

**4. Enable the feature flag for the staging environment:**

Switch to the [infrastructure repo](https://github.com/digitalservicebund/digitalcheck-dito-infra) and enable the feature flag in `manifests/overlays/staging-stackit/feature-flags.json` like this:

```json
// manifests/overlays/staging-stackit/feature-flags.json
{
  "myNewFeature": true
}
```

Commit your changes and push them. Our pipeline automatically applies the new feature flag after a few moments.

## Development

### Run Locally

Start the app in development mode. It will automatically rebuild assets when you change a file.

```sh
npm run dev
```

> **Note**: If you use an adblocker, you may need to whitelist `localhost`. Some adblockers can block local assets based on their names, which can cause runtime errors and break the UI.

### Testing

The project includes unit, end-to-end, and accessibility tests.

- Run unit tests (with [Vitest](https://vitest.dev/)): `npm run test`
- Run end-to-end tests (with [Playwright](https://playwright.dev/)): `npm run test:e2e`
- Run accessibility tests (with [Playwright](https://playwright.dev/docs/intro) & [Axe](https://www.deque.com/axe/)): `npm run test:a11y`
- Run all tests sequentially: `npm run tests`

#### Snapshot Testing

This package supports snapshot testing via [Playwright](https://playwright.dev/docs/test-snapshots) and [Vitest](https://vitest.dev/guide/snapshot.html). Snapshots are useful for verifying that UI components and layouts have not changed unexpectedly.

##### Playwright Snapshot Testing

The snapshot tests capture screenshots of static routes across different devices, as defined in `tests/playwright-snapshot.config.ts`.

- **Create initial snapshots**: On the first run, this command will generate the baseline snapshots.
  ```bash
  npm run test:snapshots
  ```
- **Update snapshots**: If you've made intentional changes and need to update the snapshots, run:
  ```bash
  npm run test:update-snapshots
  ```

###### Considerations

- Snapshots currently only cover static routes, not dynamic ones.
- Snapshot tests can sometimes be flaky, especially for Webkit/Safari, due to minor rendering differences.
- Tablet-sized viewports are not currently included in the snapshot configuration.

##### Vitest Snapshot Testing

To create a component snapshot with Vitest, use `toMatchSnapshot()` in your test file. For example:

```ts
// In a test like app/components/Footer.spec.tsx
const { container } = render(<RouterStubFooter />);
expect(container).toMatchSnapshot();
```

To update failing snapshots, run all tests and press `u` in the interactive prompt, or use the update flag directly:

```sh
npm test -- -u
```

For more details, see the [Vitest Snapshot documentation](https://vitest.dev/guide/snapshot.html#updating-snapshots).

### Code Quality (Linting & Formatting)

The project uses [ESLint](https://eslint.org/docs/latest/) for linting and [Prettier](https://prettier.io/docs/en/) for formatting. It's recommended to set up the [Git Hooks](#3-git-hooks) to automate this process.

- Check formatting: `npm run format:check`
- Autofix formatting issues: `npm run format:fix`
- Check for linting errors: `npm run lint:check`
- Autofix linting issues: `npm run lint:fix`
- Run all style checks: `npm run style:check`
- Autofix all style issues: `npm run style:fix`

## Build for Production

To build the application for production:

```sh
npm run build
```

This will create optimized assets in the `build/` and `public/build/` directories.

To preview the production build locally:

```sh
npm run start
```

## Deployment

### Docker

You can build and run the application in a Docker container to simulate the production environment.

```sh
npm run docker
```

### DIY

The built-in server is production-ready. If you are deploying manually, make sure to deploy the output of `npm run build`:

- `build/`
- `public/build/`

## Contributing

🇬🇧
Everyone is welcome to contribute to the development of the Digitalcheck applications. You can contribute by opening a pull request,
providing documentation, answering questions, or giving feedback. Please always follow the guidelines and our
[Code of Conduct](CODE_OF_CONDUCT.md).

🇩🇪
Jede:r ist herzlich eingeladen, die Entwicklung der Digitalcheck Applikationen mitzugestalten. Du kannst einen Beitrag leisten,
indem du Pull-Requests eröffnest, die Dokumentation erweiterst, Fragen beantwortest oder Feedback gibst.
Bitte befolge immer die Richtlinien und unseren [Verhaltenskodex](CODE_OF_CONDUCT_DE.md).

## Contributing Code

🇬🇧
Open a pull request with your changes and it will be reviewed by someone from the team. When you submit a pull request,
you declare that you have the right to license your contribution to the DigitalService and the community.
By submitting the patch, you agree that your contributions are licensed under the MIT license.

Please make sure that your changes have been tested before submitting a pull request.

🇩🇪
Nach dem Erstellen eines Pull Requests wird dieser von einer Person aus dem Team überprüft. Wenn du einen Pull-Request
einreichst, erklärst du dich damit einverstanden, deinen Beitrag an den DigitalService und die Community zu
lizenzieren. Durch das Einreichen des Patches erklärst du dich damit einverstanden, dass deine Beiträge unter der
MIT-Lizenz lizenziert sind.

Bitte stelle sicher, dass deine Änderungen getestet wurden, bevor du einen Pull-Request sendest.
