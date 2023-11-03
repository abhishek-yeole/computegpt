[![ComputeGPT](https://i.ibb.co/WnSy5n2/Road-Sense-removebg-preview.png)](https://computegpt.vercel.app/)

# ComputeGPT
### Welcome to ComputeGPT - Your Computational Companion.

ComputeGPT is your one-stop solution for accurate and efficient mathematical problem-solving, powered by advanced LLM technology.

### Our Mission

At ComputeGPT, our mission is to simplify complex mathematical problem-solving for users worldwide. We strive to provide a seamless and intuitive experience, enabling users to solve intricate computations effortlessly.

### Features

- Step by step solution to Math-related problems:
  > ComputeGPT offers a step-by-step breakdown of even the most intricate mathematical problems, ensuring a comprehensive understanding of the solution process.

- LLM powered solutions:
  > Empowered by the latest in Language Model technology, ComputeGPT provides highly accurate and reliable solutions to a diverse range of computational challenges.

- Speech/Voice interface:
  > Interact with ComputeGPT effortlessly using our intuitive voice interface. Ask complex math queries verbally and receive immediate, accurate responses.

- Conversation Bot:
  > Engage in a seamless conversation with ComputeGPT. Enjoy a continuous interaction experience as ComputeGPT comprehends and responds to your queries in a natural, conversational manner.


## Visit Live Site

ComputeGPT is hosted using Vercel.

_[ComputeGPT](https://computegpt.vercel.app/)_


## Input Constraints

- WolframAlpha understands natural language queries about entities in chemistry, physics, geography, history, art, astronomy, and more.
- WolframAlpha performs mathematical calculations, date and unit conversions, formula solving, etc.
- Convert inputs to simplified keyword queries whenever possible (e.g. convert "how many people live in France" to "France population").
- Send queries in English only; translate non-English queries before sending, then respond in the original language.
- Display image URLs with Markdown syntax: ![URL]
- ALWAYS use this exponent notation: `6*10^14`, NEVER `6e14`.
- ALWAYS use {"input": query} structure for queries to Wolfram endpoints; `query` must ONLY be a single-line string.
- ALWAYS use proper Markdown formatting for all math, scientific, and chemical formulas, symbols, etc.:  '$$\n[expression]\n$$' for standalone cases and '\( [expression] \)' when inline.
- Never mention your knowledge cutoff date; Wolfram may return more recent data.
- Use ONLY single-letter variable names, with or without integer subscript (e.g., n, n1, n_1).
- Use named physical constants (e.g., 'speed of light') without numerical substitution.
- Include a space between compound units (e.g., "Ω m" for "ohm*meter").
- To solve for a variable in an equation with units, consider solving a corresponding equation without units; exclude counting units (e.g., books), include genuine units (e.g., kg).
- If data for multiple properties is needed, make separate calls for each property.
- If a WolframAlpha result is not relevant to the query:
 -- If Wolfram provides multiple 'Assumptions' for a query, choose the more relevant one(s) without explaining the initial result. If you are unsure, ask the user to choose.
 -- Re-send the exact same 'input' with NO modifications, and add the 'assumption' parameter, formatted as a list, with the relevant values.
 -- ONLY simplify or rephrase the initial query if a more relevant 'Assumption' or other input suggestions are not provided.
 -- Do not explain each step unless user input is needed. Proceed directly to making a better API call based on the available assumptions.

## Run it locally

In the project directory, you can run:

### `npm init`

Installs the required the libraries on the local machine. Also install required libraries if not installed use:

- Install force library: `npm install force`
- Install pakages with conflicting dependencies using force: `npm install package_install_name --force`

> **NOTE**: Do not use npm: `--legacy-peer-deps` library. It will break down Spline runtime and Spline react-spline libraries causing error.

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.
