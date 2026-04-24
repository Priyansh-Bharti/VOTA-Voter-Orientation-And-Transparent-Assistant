# SECURITY.md - VOTA Security Policy

## Overview
VOTA (Voter Orientation And Transparent Assistant) is committed to providing a secure and trusted platform for civic engagement. This document outlines our security architecture and the measures taken to protect user data and service integrity.

## Attack Vectors Considered
- **Unauthorized Access**: Mitigated via Firebase Authentication.
- **Denial of Service (DoS)**: Mitigated via tiered rate limiting.
- **Prompt Injection**: Mitigated via pattern matching and strict system instructions in `AIEngine`.
- **Cross-Site Scripting (XSS)**: Mitigated via HTML stripping and `Helmet` security headers.
- **Information Leakage**: Mitigated via structured error handling that suppresses stack traces in production.

## Middleware Protections
- **`verifyAuth`**: Enforces valid Firebase ID tokens on protected routes.
- **`globalRateLimiter`**: Caps general API usage at 60 requests per minute per IP.
- **`chatRateLimiter`**: Caps AI chat usage at 10 requests per minute to prevent resource exhaustion.
- **`sanitizeInput`**: Blocks known prompt injection patterns (e.g., "DAN", "jailbreak") and strips HTML tags.
- **`errorHandler`**: Ensures all errors return a consistent JSON format without leaking internal system details.

## Firebase Security Strategy
- All client-side requests must include a `Bearer` token.
- Firebase Security Rules are configured to restrict data access to the authenticated owner only.
- Admin SDK is used in the backend with restricted service account permissions.

## Input Sanitization Approach
- All request bodies are processed to remove HTML tags.
- Deterministic pattern matching is used to identify and block LLM-specific exploits before they reach the `AIEngine`.

## Secret Management
- **Rule**: Secrets (API Keys, Private Keys) are NEVER committed to version control.
- **Implementation**: Managed via environment variables (`.env`) and injected at runtime.

## Reporting Vulnerabilities
If you discover a security vulnerability, please do not disclose it publicly. Contact the development team directly at security@vota-assistant.org.
