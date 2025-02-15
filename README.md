# Playwright Cucumber Framework

## 📌 Overview

This framework integrates **Playwright** with **Cucumber** for **BDD-style** automated testing. It enables writing **Gherkin-based feature files** and executing them using **Playwright** for web automation.

---

## 📦 Installation

### 1️⃣ **Clone the Repository**

```sh
git clone "https://github.com/prudhvigv/kaleidoscope-sdet.git"
```

### 2️⃣ **Install Dependencies**

Ensure you have **Node.js (>=20)** installed, then run:

```sh
npm install
```

### 3️⃣ **Install Playwright Browsers**

```sh
npx playwright install
```

---

## 🚀 Running Tests

### **Run Tests in Head Mode by providing tags in test:headmode script in package.json**

```sh
npm run test:headmode
```
### **Run Tests in Headless Mode by providing tags in CLI**

```sh
npm run test:headless -- --tags "@CreateApplication" 
```

---

## 📂 Project Structure

```
├─src
├─── conf/                     # Conf files including BaseClass
|
├─── Features/                 # Gherkin feature files
│
├─── StepDefinitions/          # Step definitions for feature files
│
├─── Pages/                    # Page Object Model (POM)
│     ├── HomePage.ts          # Page class for login
├─── util/                     # Helper utilities
│     ├── Log.ts               # Logger utility
│
├── reports/                   # Test reports
├── cucumber.js                # Cucumber configuration file
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
├── test.setup.ts              # Hooks for headmode execution
├── test.setup.regression.ts   # Hooks for headless execution
```

---

## ⚙️ Configuration

### **Cucumber Configuration (`cucumber.js`)**

```json
{
  "default": "--require step-definitions/*.ts --format json:reports/cucumber_report.json"
}
```

---

## 📝 Writing Tests

### **Example Feature File (`Features/Registration.feature`)**

```gherkin
Feature: sample Functionality

    Scenario Outline: Validate the functionality of Register new user
        Given User navigated to scholarship landing page
        And user clicks on Login button
        And user enters "<EMAIL_ID>" in email id field
        And user clicks on Next button
```

### **Step Definitions (`src/StepDefinitions/steps.ts`)**

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
```

---

## 📊 Generating Reports

To generate an **HTML report**, use:

```sh
npm run report
```

---

## 🎯 Best Practices

- Use **Page Object Model (POM)** for maintainability.
- Organize test cases using **tags** (`@CreateApplication`).
- Implement **logging** for debugging.

---

## 📬 Support

For issues, open a GitHub issue or reach out to directly. 🚀
