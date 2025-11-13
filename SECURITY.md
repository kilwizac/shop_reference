# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

The SpecFoundry team takes security issues seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

If you discover a security vulnerability, please report it by:

1. **Email:** Send details to privacy@specfoundry.com
2. **Subject:** Include "[SECURITY]" in the subject line
3. **Details:** Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### What to Expect

- **Initial Response:** Within 48 hours
- **Status Updates:** Every 7 days until resolution
- **Resolution Timeline:** Critical issues within 7 days, others within 30 days
- **Credit:** We will credit you in our security advisories (if desired)

### Security Measures

SpecFoundry implements the following security measures:

#### Code Security
- Input sanitization and HTML escaping for XSS prevention
- Regular dependency security audits with `npm audit`
- CodeQL static analysis for vulnerability detection
- Comprehensive test coverage for security-critical functions

#### Data Protection
- Client-side only application (no backend data storage)
- No collection of personally identifiable information (PII)
- Privacy-first design approach
- See [Privacy Policy](https://specfoundry.com/privacy/) for details

#### Development Practices
- Security code reviews for all changes
- Automated security scanning in CI/CD pipeline
- Regular security updates for dependencies
- TypeScript for type safety

## Security Best Practices for Users

While using SpecFoundry:

1. **Keep Your Browser Updated:** Use the latest version of your browser
2. **Use HTTPS:** Always access SpecFoundry via HTTPS
3. **Report Issues:** If you notice suspicious behavior, report it immediately
4. **Local Data:** Calculator settings are stored locally in your browser

## Known Security Considerations

### Static Export
SpecFoundry is deployed as a static site (GitHub Pages), which means:
- No server-side vulnerabilities (SQL injection, etc.)
- Limited ability to set security headers at the application level
- Security headers must be configured at the CDN/hosting level

### Client-Side Storage
- User preferences are stored in browser localStorage
- No sensitive data is stored
- Data remains on your device only

### Third-Party Services
- **Google Analytics:** Anonymous usage statistics only (can be disabled)
- **Google Fonts:** Font delivery (self-hosted fonts in development)

## Security Update Policy

- **Critical vulnerabilities:** Patched within 24-48 hours
- **High severity:** Patched within 7 days
- **Medium severity:** Patched within 30 days
- **Low severity:** Included in next regular release

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported versions
4. Release patches and notify users

We follow responsible disclosure practices and will not publicly disclose issues until a fix is available.

## Security Hall of Fame

We maintain a security hall of fame to recognize researchers who help keep SpecFoundry secure. If you'd like to be included, let us know when you report a vulnerability.

*No vulnerabilities have been reported by external researchers yet.*

## Contact

- **Security Issues:** privacy@specfoundry.com
- **General Inquiries:** https://github.com/kilwizac/shop_reference/issues
- **Website:** https://specfoundry.com

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [React Security Best Practices](https://react.dev/learn/react-security)

---

**Last Updated:** November 13, 2025  
**Policy Version:** 1.0
