// src/logger.js

const VALID_STACKS = ["backend", "frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES = [
  "cache", "controller", "cron_job", "db", "domain", 
  "handler", "repository", "route", "service", // Backend only
  "api", // Frontend only
  "component", "hook", "page", "state", "style", // Frontend only
  "auth", "config", "middleware", "utils" // Both
];

export async function logEvent({ stack, level, package: pkg, message, token }) {
  if (!VALID_STACKS.includes(stack.toLowerCase())) {
    throw new Error(`Invalid stack value '${stack}'. Must be 'backend' or 'frontend'.`);
  }
  if (!VALID_LEVELS.includes(level.toLowerCase())) {
    throw new Error(`Invalid level value '${level}'. Must be one of ${VALID_LEVELS.join(", ")}.`);
  }
  if (!VALID_PACKAGES.includes(pkg.toLowerCase())) {
    throw new Error(`Invalid package value '${pkg}'. Must be one of ${VALID_PACKAGES.join(", ")}.`);
  }
  if (!token) {
    throw new Error("Authorization token is required.");
  }

  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message
  };

  try {
    console.log("LogEvent token:", token);
    console.log("LogEvent payload:", payload);
    const response = await fetch("/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`Log API error: ${response.status} - ${errorText}`);
      if (response.status === 401) {
        console.warn("401 Unauthorized: Check if your token is valid, has correct permissions, and the payload matches API requirements.");
      }
    }
  } catch (error) {
    console.error("Log API request failed:", error);
  }
}
