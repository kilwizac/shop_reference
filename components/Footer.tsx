import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4 text-sm">References</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/tolerances"
                  className="hover:text-black dark:hover:text-white"
                >
                  Tolerances
                </Link>
              </li>
              <li>
                <Link
                  href="/materials"
                  className="hover:text-black dark:hover:text-white"
                >
                  Materials
                </Link>
              </li>
              <li>
                <Link
                  href="/processes"
                  className="hover:text-black dark:hover:text-white"
                >
                  Processes
                </Link>
              </li>
              <li>
                <Link
                  href="/standards"
                  className="hover:text-black dark:hover:text-white"
                >
                  Standards
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Calculators</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/thread-calculator"
                  className="hover:text-black dark:hover:text-white"
                >
                  Thread Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tolerance-calculator"
                  className="hover:text-black dark:hover:text-white"
                >
                  Tolerance Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/material-calculator"
                  className="hover:text-black dark:hover:text-white"
                >
                  Material Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/material-compare"
                  className="hover:text-black dark:hover:text-white"
                >
                  Material Compare
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-black dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-black dark:hover:text-white"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="https://github.com/kilwizac/shop_reference"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} SpecFoundry. Professional engineering tools and reference.</p>
        </div>
      </div>
    </footer>
  );
}
