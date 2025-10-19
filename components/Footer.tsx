import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-3 text-sm">References</h4>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
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
            <h4 className="font-bold mb-3 text-sm">Resources</h4>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  Calculators
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-sm">Company</h4>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
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
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  Contact
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
              <li>
                <Link
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-sm">Connect</h4>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black dark:hover:text-white"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 SpecFoundry. Professional engineering tools and reference.</p>
        </div>
      </div>
    </footer>
  );
}
