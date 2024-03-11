# Github Action For Validating Firebase Function Hosting Configs

Firebase provides a [convenient method](https://firebase.google.com/docs/hosting/full-config#rewrite-functions) for managing your Cloud Functions' hosted domain through the `firebase.json` file, but ensuring there's a config for every deployed function lacks automation.

This tool's goal is to provide a workflow action that ensures there are no discrepancies between your exported functions and your hosting config.

## Why Use It? 🤔

- **Prevent Deployment Issues:** Catch config drifts early in the CI/CD process.
- **Enhance Team Collaboration:** Automate checks for pull requests to maintain project standards.
- **Streamline Maintenance:** Quickly identify added or missing functions in your Firebase setup.

## Getting Started 🌟

1. **Set Up the Workflow:** In `.github/workflows`, create a `function_hosting_validation.yml` with:

```yaml
name: Firebase Functions Validation

on: pull_request

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: "14"
      - uses: your-username/firebase-functions-validation-action@main
        with:
          index-path: "./src/index.ts"
          firebase-config-path: "./firebase.json"
```

2. **Customize Paths**: Adjust index-path and firebase-config-path as needed.

## Contributing 🤝

If you notice an issue or want to help extend this action to work with more projects, feel free to open an issue, submit a PR, or suggest improvements.

## License 🪪

This project is under the [MIT License](https://github.com/jacogrande/firebase-hosting-gh-action/blob/main/LICENSE). Use it as you please.
